import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Router } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Landing from "@/pages/Landing";
import CoachingZone from "@/pages/CoachingZone";
import WorksZone from "@/pages/WorksZone";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Route path="/" component={Landing} />
        <Route path="/coaching" component={CoachingZone} />
        <Route path="/works" component={WorksZone} />
        <Route path="*" component={NotFound} />
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
