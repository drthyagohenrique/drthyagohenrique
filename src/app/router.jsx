import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { routeConfig } from './route-config.js';
import RouteSEO from '../components/seo/RouteSEO.jsx';
import TechnicalPlaceholderPage from '../pages/TechnicalPlaceholder/TechnicalPlaceholderPage.jsx';
import NotFoundPage from '../pages/NotFound/NotFoundPage.jsx';

const InstitutionalPage = lazy(() => import('../pages/Institutional/InstitutionalPage.jsx'));
const NeuroCalmaPage = lazy(() => import('../pages/NeuroCalma/NeuroCalmaPage.jsx'));

const ScrollRestoration = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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

const AppRoutes = () => (
  <>
    <ScrollRestoration />
    <Suspense fallback={<div className="route-loading">Carregando...</div>}>
      <Routes>
        <Route path={routeConfig.home.path} element={<InstitutionalPage />} />
        <Route path={routeConfig.neurocalma.path} element={<NeuroCalmaPage />} />
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
  </HelmetProvider>
);

export default AppRouter;
