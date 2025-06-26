
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import LiveStream from "./pages/LiveStream";
import Explorar from "./pages/Explorar";
import SubirEnVivo from "./pages/SubirEnVivo";
import Notificaciones from "./pages/Notificaciones";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
// Category pages
import Cartas from "./pages/categories/Cartas";
import Sneakers from "./pages/categories/Sneakers";
import Moda from "./pages/categories/Moda";
import Juguetes from "./pages/categories/Juguetes";
import Electronicos from "./pages/categories/Electronicos";
import Coleccionables from "./pages/categories/Coleccionables";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explorar" element={<Explorar />} />
              <Route path="/subir-en-vivo" element={<SubirEnVivo />} />
              <Route path="/notificaciones" element={<Notificaciones />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/live/:sellerId" element={<LiveStream />} />
              {/* Category routes */}
              <Route path="/categoria/cartas" element={<Cartas />} />
              <Route path="/categoria/sneakers" element={<Sneakers />} />
              <Route path="/categoria/moda" element={<Moda />} />
              <Route path="/categoria/juguetes" element={<Juguetes />} />
              <Route path="/categoria/electronicos" element={<Electronicos />} />
              <Route path="/categoria/coleccionables" element={<Coleccionables />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
