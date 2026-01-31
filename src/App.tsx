import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
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
