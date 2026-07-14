import React from 'react';

const Authority = () => {
  const items = [
    'Médico · CRM-GO 30.392',
    'Mestrando em Neurociências',
    'Professor Universitário',
    'Comunicador',
    'Palestras e treinamentos · Ambientes de alta exigência',
    'Mídia · O Globo · SBT · TV Globo',
    'Atuação · Artistas · Empresários · Atletas · Lideranças',
  ];
  const list = [...items, ...items];
  return (
    <div className="authority">
      <div className="auth-track">
        {list.map((it, i) => (
          <React.Fragment key={i}>
            {/* A segunda metade é um clone visual; escondida de leitores de tela. */}
            <span aria-hidden={i >= items.length || undefined}><strong>{it.split(' · ')[0]}</strong>{it.includes(' · ') ? ' · ' + it.split(' · ').slice(1).join(' · ') : ''}</span>
            <span className="dot" aria-hidden="true"></span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Authority;
