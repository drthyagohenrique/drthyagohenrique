import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import '../../../styles.css';
import Nav from '../../../components/Hero.jsx';
import { Hero } from '../../../components/Hero.jsx';
import Authority from '../../../components/Authority.jsx';
import Audience from '../../../components/Comparison.jsx';
import Doctor from '../../../components/Doctor.jsx';
import CareModel from '../../../components/Products.jsx';
import CareFlow from '../../../components/Guarantee.jsx';
import Proof from '../../../components/Cases.jsx';
import NeuralSaturation from '../../../components/Mechanism.jsx';
import FAQ from '../../../components/FAQ.jsx';
import ClosingCTA from '../../../components/ClosingCTA.jsx';
import Footer from '../../../components/Footer.jsx';
import StickyCTA from '../../../components/StickyCTA.jsx';
import RouteSEO from '../../components/seo/RouteSEO.jsx';

const institutionalJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: 'Dr. Thyago Henrique',
  url: 'https://drthyagohenrique.com/',
  image: 'https://drthyagohenrique.com/assets/dr-thyago.png',
  description: 'Atendimento médico em saúde mental, neurociências e performance humana para pessoas que vivem sob alta pressão.',
  telephone: '+55-62-3413-6085',
  email: 'dr.thyago.henrique@gmail.com',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'CRM-GO',
    value: '30.392',
  },
  sameAs: ['https://instagram.com/drthyagohenrique'],
  knowsAbout: ['Saúde mental', 'Neurociências', 'Performance humana', 'Medicina do estilo de vida'],
  alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'Universidade José do Rosário Vellano (UNIFENAS)' }],
};
const InstitutionalPage = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

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

    return () => lenis.destroy();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <RouteSEO
        title="Dr. Thyago Henrique — Saúde Mental para Pessoas sob Alta Pressão"
        description="Atendimento médico em saúde mental, neurociências e performance humana para quem vive sob alta pressão. Dr. Thyago Henrique · Médico · CRM-GO 30.392."
        path="/"
        image="/assets/og-image.jpg"
        imageAlt="Dr. Thyago Henrique — Saúde mental para pessoas que vivem sob alta pressão"
        jsonLd={institutionalJsonLd}
      />
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Nav />
      <main id="conteudo">
        <Hero />
        <Authority />
        <Audience />
        <Doctor />
        <CareModel />
        <CareFlow />
        <Proof />
        <NeuralSaturation />
        <FAQ />
        <ClosingCTA />
      </main>
      <Footer />
      <StickyCTA />
    </MotionConfig>
  );
};

export default InstitutionalPage;
