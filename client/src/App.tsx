import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import Games from "@/pages/games";
import NotFound from "@/pages/not-found";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/ui/cursor";

function Router() {
  // Get current route for AnimatePresence
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/games" component={Games} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app relative overflow-x-hidden">
        <CustomCursor />
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
