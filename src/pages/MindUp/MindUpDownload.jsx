import React from 'react';
import { mindUpContent } from './content.js';

const DownloadContext = React.createContext(null);

const storeEvent = {
  appStore: 'mindup_app_store_click',
  googlePlay: 'mindup_google_play_click',
};

const detectStore = () => {
  try {
    const userAgent = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const isIPadOS = platform === 'MacIntel' && Number(navigator.maxTouchPoints || 0) > 1;
    if (/android/i.test(userAgent)) return 'googlePlay';
    if (/iPad|iPhone|iPod/i.test(userAgent) || isIPadOS) return 'appStore';
  } catch {
    return null;
  }
  return null;
};

const metadata = (source, store) => {
  const params = new URLSearchParams(window.location.search);
  const detectedStore = detectStore();
  return {
    source,
    store: store || null,
    detected_os: detectedStore === 'appStore' ? 'ios' : detectedStore === 'googlePlay' ? 'android' : 'unknown',
    device: navigator.userAgent || 'unknown',
    viewport: String(window.innerWidth) + 'x' + String(window.innerHeight),
    pathname: window.location.pathname,
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
  };
};

const track = (event, properties) => {
  try {
    const payload = { event, ...properties };
    window.dataLayer?.push(payload);
    window.dispatchEvent(new CustomEvent('mindup:analytics', { detail: payload }));
  } catch {
    // Analytics must never stop a download.
  }
};

const StoreModal = ({ state, onClose, onStoreClick }) => {
  const dialogRef = React.useRef(null);
  const closeRef = React.useRef(null);

  React.useEffect(() => {
    if (!state) return undefined;
    const previousOverflow = document.body.style.overflow;
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const nodes = dialogRef.current?.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])');
      const focusable = nodes ? Array.from(nodes) : [];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [state, onClose]);

  if (!state) return null;

  const stores = [
    { key: 'appStore', label: 'Baixar na App Store' },
    { key: 'googlePlay', label: 'Baixar no Google Play' },
  ];

  return (
    <div className="mu-store-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="mu-store-modal__dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="mindup-store-title" aria-describedby="mindup-store-description">
        <button ref={closeRef} type="button" className="mu-store-modal__close" onClick={onClose} aria-label="Fechar seleção de loja">×</button>
        <p className="mu-store-modal__eyebrow">MindUp</p>
        <h2 id="mindup-store-title">Onde você quer baixar o MindUp?</h2>
        <p id="mindup-store-description">Escolha a loja do seu dispositivo.</p>
        <div className="mu-store-modal__actions">
          {stores.map((store) => {
            const available = Boolean(mindUpContent.product.storeUrls?.[store.key]);
            return (
              <button key={store.key} type="button" className="mu-store-modal__store" onClick={() => onStoreClick(store.key)} disabled={!available}>
                {store.label} <span aria-hidden={true}>→</span>
                {!available && <small>Link oficial pendente de configuração</small>}
              </button>
            );
          })}
        </div>
        {import.meta.env.DEV && <p className="mu-store-modal__dev">Defina as URLs oficiais em <code>src/config/products.js</code> para habilitar os downloads.</p>}
      </div>
    </div>
  );
};

export const MindUpDownloadProvider = ({ children }) => {
  const [modalState, setModalState] = React.useState(null);
  const previousFocusRef = React.useRef(null);

  const closeModal = React.useCallback(() => {
    setModalState(null);
    previousFocusRef.current?.focus?.();
  }, []);

  const openModal = React.useCallback((source, detectedStore) => {
    track('mindup_store_modal_open', metadata(source, detectedStore));
    setModalState({ source, detectedStore });
  }, []);

  const startDownload = React.useCallback((source, event) => {
    previousFocusRef.current = event.currentTarget;
    const store = detectStore();
    const url = store ? mindUpContent.product.storeUrls?.[store] : null;
    track('mindup_download_click', metadata(source, store));
    if (!url) {
      openModal(source, store);
      return;
    }
    track(storeEvent[store], metadata(source, store));
    window.location.assign(url);
  }, [openModal]);

  const selectStore = React.useCallback((store) => {
    const url = mindUpContent.product.storeUrls?.[store];
    if (!url) return;
    track(storeEvent[store], metadata('modal', store));
    window.location.assign(url);
  }, []);

  return (
    <DownloadContext.Provider value={{ startDownload }}>
      {children}
      <StoreModal state={modalState} onClose={closeModal} onStoreClick={selectStore} />
    </DownloadContext.Provider>
  );
};

export const MindUpDownloadCta = ({ source, className = 'mu-button', children }) => {
  const { startDownload } = React.useContext(DownloadContext);
  return <button type="button" className={className} onClick={(event) => startDownload(source, event)}>{children} <span aria-hidden={true}>→</span></button>;
};

export { detectStore };
