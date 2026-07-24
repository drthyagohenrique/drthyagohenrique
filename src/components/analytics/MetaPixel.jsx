import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { initPixel, trackPageView } from '../../lib/meta-pixel.js';

// Inicializa o Pixel uma vez e dispara PageView a cada troca de rota do SPA
// (o site inteiro passa por aqui, já que index.html e mindup.html montam o
// mesmo router). Renderiza null — é só efeito colateral.
export default function MetaPixel() {
  const { pathname, search } = useLocation();
  const lastKey = useRef(null);

  useEffect(() => {
    initPixel();
  }, []);

  useEffect(() => {
    const key = pathname + search;
    // React StrictMode monta duas vezes em dev; o guard evita PageView dobrado.
    if (lastKey.current === key) return;
    lastKey.current = key;
    trackPageView();
  }, [pathname, search]);

  return null;
}
