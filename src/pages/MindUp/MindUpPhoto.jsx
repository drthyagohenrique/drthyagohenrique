import React from 'react';
import { Icon } from './icons.jsx';

// Fotos reais de pessoas em cenas de rotina, ligadas às missões do aplicativo.
//
// Enquanto nenhuma foto tiver `src`, a seção inteira não é renderizada em produção —
// a página continua íntegra e nada quebra. Em desenvolvimento os slots aparecem como
// placeholders com o briefing de cada cena, para servir de guia de produção.
//
// Para publicar: salve os arquivos em /public/assets/mindup/fotos/ e preencha
// `src`, `alt`, `width` e `height` em content.js (bloco `photos.items`).
// Briefing completo: public/assets/mindup/fotos/README.md

const isReady = (item) => Boolean(item?.src);

const PhotoCard = ({ item }) => (
  <figure className="mu-photo">
    <div className="mu-photo__frame">
      <img
        src={item.src}
        alt={item.alt || item.mission}
        width={item.width || undefined}
        height={item.height || undefined}
        loading="lazy"
        decoding="async"
      />
    </div>
    <figcaption>
      <span className="mu-photo__icon" aria-hidden={true}>
        <Icon name="check" size={11} strokeWidth={2.6} />
      </span>
      {item.mission}
    </figcaption>
  </figure>
);

const PhotoPlaceholder = ({ item }) => (
  <figure className="mu-photo is-pending">
    <div className="mu-photo__frame">
      <span className="mu-photo__pending">
        <b>{item.mission}</b>
        <em>{item.brief}</em>
        <small>
          Slot aguardando foto · id <code>{item.id}</code>
        </small>
      </span>
    </div>
  </figure>
);

export const MindUpPhotoBand = ({ photos }) => {
  const items = photos?.items || [];
  const ready = items.filter(isReady);

  // Produção: sem nenhuma foto entregue, a seção simplesmente não existe.
  if (!ready.length && !import.meta.env.DEV) return null;

  const visible = ready.length ? ready : items;

  return (
    <section className="mu-section mu-orbs mu-photos" id={photos.id}>
      <div className="mu-container mu-reveal">
        <p className="mu-tag">
          <span className="mu-tag__dot" aria-hidden={true} />
          {photos.tag}
        </p>
        <h2>{photos.title}</h2>
        <p className="mu-lead">{photos.text}</p>
        {import.meta.env.DEV && !ready.length && (
          <p className="mu-photos__devnote">
            Somente em desenvolvimento: {items.length} slots aguardando fotos reais. Em produção esta seção
            não é renderizada até que ao menos uma foto tenha <code>src</code> preenchido em <code>content.js</code>.
          </p>
        )}
        <div className="mu-photo-band">
          {visible.map((item) =>
            isReady(item) ? <PhotoCard key={item.id} item={item} /> : <PhotoPlaceholder key={item.id} item={item} />,
          )}
        </div>
      </div>
    </section>
  );
};

export default MindUpPhotoBand;
