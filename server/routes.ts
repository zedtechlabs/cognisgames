import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post('/api/contact', async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const result = await storage.createContactSubmission(contactData);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          error: validationError.message
        });
      } else {
        console.error('Contact submission error:', error);
        res.status(500).json({ 
          success: false, 
          error: 'An unexpected error occurred' 
        });
      }
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
