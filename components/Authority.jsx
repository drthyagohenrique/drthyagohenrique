import React from 'react';

const Authority = () => {
  const items = [
    'Médico · CRM-GO 30.392',
    'Pós-graduação em Psiquiatria · Hospital Israelita Albert Einstein',
    'Mestrando em Neurociências',
    'Professor Universitário',
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
            <span><strong>{it.split(' · ')[0]}</strong>{it.includes(' · ') ? ' · ' + it.split(' · ').slice(1).join(' · ') : ''}</span>
            <span className="dot"></span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Authority;