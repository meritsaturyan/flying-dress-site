import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getContent } from '../lib/api';

export default function Locations() {
  const { t } = useTranslation();
  const [content, setContent] = useState(null);

  useEffect(() => {
    getContent().then(setContent).catch(console.error);
  }, []);

  const locations = content?.locations || [];

  return (
    <div className="container section">
      <h1 className="page-title">{t('locations.title')}</h1>
      <div className="grid gallery">
        {locations.map((l) => (
          <div key={l.id} className="tile">
            <img src={l.image} alt={l.title} loading="lazy" />
            <div className="tile-label">{l.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
