import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../config/routes.js';

// SPA navigation hands off to the original standalone document at the same URL.
export default function CodigosDaMentePage() {
  const { search, hash } = useLocation();

  useEffect(() => {
    window.location.replace(`${ROUTES.codigosDaMente}${search}${hash}`);
  }, [search, hash]);

  return null;
}
