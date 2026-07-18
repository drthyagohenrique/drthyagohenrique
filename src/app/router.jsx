import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { routeConfig } from './route-config.js';
import RouteSEO from '../components/seo/RouteSEO.jsx';
import TechnicalPlaceholderPage from '../pages/TechnicalPlaceholder/TechnicalPlaceholderPage.jsx';
import NotFoundPage from '../pages/NotFound/NotFoundPage.jsx';
import LegalPage from '../pages/Legal/LegalPage.jsx';
import { ROUTES } from '../config/routes.js';

const InstitutionalPage = lazy(() => import('../pages/Institutional/InstitutionalPage.jsx'));
const LinksPage = lazy(() => import('../pages/Links/LinksPage.jsx'));
const NeuroCalmaPage = lazy(() => import('../pages/NeuroCalma/NeuroCalmaPage.jsx'));
const MindUpPage = lazy(() => import('../pages/MindUp/MindUpPage.jsx'));

const ScrollRestoration = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }

    let frameId;
    let attempts = 0;
    let cancelled = false;
    const targetId = decodeURIComponent(hash.slice(1));

    const scrollToHash = () => {
      if (cancelled) return;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'auto' });
        return;
      }
      attempts += 1;
      if (attempts < 60) frameId = window.requestAnimationFrame(scrollToHash);
    };

    frameId = window.requestAnimationFrame(scrollToHash);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname, hash]);

  return null;
};

const FutureRoute = ({ label }) => (
  <div>
    <RouteSEO
      title={`${label} | Dr. Thyago Henrique`}
      description="Página em preparação dentro do ecossistema Dr. Thyago Henrique."
      path={window.location.pathname}
      robots="noindex, nofollow"
    />
    <TechnicalPlaceholderPage label={label} />
  </div>
);

const VercelAnalytics = () => {
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') return null;
  return <Analytics />;
};

const AppRoutes = () => (
  <>
    <ScrollRestoration />
    <Suspense fallback={<div className="route-loading">Carregando...</div>}>
      <Routes>
        <Route path={routeConfig.home.path} element={<InstitutionalPage />} />
        <Route path={routeConfig.links.path} element={<LinksPage />} />
        <Route path={routeConfig.neurocalma.path} element={<NeuroCalmaPage />} />
        <Route path={routeConfig.mindup.path} element={<MindUpPage />} />
        <Route path={ROUTES.privacy} element={<LegalPage page="privacy" />} />
        <Route path={ROUTES.terms} element={<LegalPage page="terms" />} />
        {routeConfig.future.map((route) => (
          <Route key={route.path} path={route.path} element={<FutureRoute label={route.label} />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  </>
);

const AppRouter = () => (
  <HelmetProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <VercelAnalytics />
  </HelmetProvider>
);

export default AppRouter;
