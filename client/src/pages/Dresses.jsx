import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getContent } from '../lib/api';

export default function Dresses() {
  const { t } = useTranslation();
  const [content, setContent] = useState(null);

  useEffect(() => {
    getContent().then(setContent).catch(console.error);
  }, []);

  const dresses = content?.dresses || [];

  return (
    <div className="container section">
      <h1 className="page-title">{t('dresses.title')}</h1>
      <div className="grid gallery">
        {dresses.map((d) => (
          <div key={d.id} className="tile">
            <img src={d.image} alt={d.title} loading="lazy" />
            <div className="tile-label">{d.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
