import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Nav from './components/Hero.jsx';
import { Hero } from './components/Hero.jsx';
import Authority from './components/Authority.jsx';
import Audience from './components/Comparison.jsx';
import Doctor from './components/Doctor.jsx';
import CareModel from './components/Products.jsx';
import CareFlow from './components/Guarantee.jsx';
import Proof from './components/Cases.jsx';
import NeuralSaturation from './components/Mechanism.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';
import StickyCTA from './components/StickyCTA.jsx';

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Authority />
      <Audience />
      <Doctor />
      <CareModel />
      <CareFlow />
      <Proof />
      <NeuralSaturation />
      <FAQ />
      <Footer />
      <StickyCTA />
    </>
  );
};

export default App;