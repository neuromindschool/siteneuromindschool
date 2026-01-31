import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBrandingStore } from './lib/store';

import Navigation from './sections/Navigation';
// ... rest of imports
import Hero from './sections/Hero';
import Proposition from './sections/Proposition';
import Vertentes from './sections/Vertentes';
import Fases from './sections/Fases';
import Services from './sections/Services';
import Founders from './sections/Founders';
import Testimonials from './sections/Testimonials';
import Results from './sections/Results';
import FinalCTA from './sections/FinalCTA';
import Location from './sections/Location';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Admin from './sections/Admin';
import ServiceDetail from './pages/ServiceDetail';

gsap.registerPlugin(ScrollTrigger);

function MainSite() {
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-neuromind-white min-h-screen">
      <Navigation />
      <main className="relative">
        <Hero />
        <Proposition />
        <Founders />
        <Vertentes />
        <Fases />
        <Services />
        <Testimonials />
        <Results />
        <FinalCTA />
        <Location />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

function App() {
  const { initialize, isLoading } = useBrandingStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neuromind-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-neuromind-yellow border-t-transparent rounded-full animate-spin"></div>
          <p className="text-neuromind-navy font-medium animate-pulse">Carregando experiência...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/servico/:id" element={<ServiceDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

