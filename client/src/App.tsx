import { Switch, Route, useLocation, Router as WouterRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import Games from "@/pages/games";
import CareerPage from "@/pages/CareerPage"; 
import NotFound from "@/pages/not-found";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/ui/cursor";
import AnimatedBackground from "@/components/animated-background";
import Particles from "@/components/particles";
import { SpeedInsights } from "@vercel/speed-insights/react"

function Router() {
  // Get current route for AnimatePresence
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/games" component={Games} />
        <Route path="/career" component={CareerPage} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
      <QueryClientProvider client={queryClient}>
      <WouterRouter base="/">  {/* ✅ Add base here */}
        <div className="app relative overflow-x-hidden">
          <AnimatedBackground />
          <Particles />
          <CustomCursor />
          <Router />
          <Toaster />
          <SpeedInsights />
        </div>
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
