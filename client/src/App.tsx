import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ToastContainer, toast } from "react-toastify";  // ✅ Using react-toastify
import "react-toastify/dist/ReactToastify.css"; // ✅ Import default styles
import Home from "@/pages/home";
import Games from "@/pages/games";
import NotFound from "@/pages/not-found";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/ui/cursor";
import AnimatedBackground from "@/components/animated-background";
import Particles from "@/components/particles";

function Router() {
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
        <AnimatedBackground />
        <Particles />
        <CustomCursor />
        <Router />
        
        {/* ✅ ToastContainer for react-toastify */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        {/* ✅ Example Toast Button (Remove this in production if not needed) */}
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => toast.success("Toaster is working! 🎉")}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow-lg"
          >
            Show Toast
          </button>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
