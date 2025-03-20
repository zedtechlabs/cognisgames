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
import { SpeedInsights } from "@vercel/speed-insights/react";

// ❌ Remove this import if you’re using the local function
// import NumberRush from "@/pages/NumberRush"; 

function Router() {
  // Get current route for AnimatePresence
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/games" component={Games} />
        <Route path="/career" component={CareerPage} />

        {/* ✅ Use the locally defined NumberRushPage here */}
        <Route path="/games/NumberRush" component={NumberRushPage} />

        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

// ✅ Local component that displays the game via an <iframe>
function NumberRushPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <iframe
        src="/games/NumberRush/index.html"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base="/">
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
