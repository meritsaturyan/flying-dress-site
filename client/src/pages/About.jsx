import React from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="container section">
      <h1 className="page-title">{t('about.title')}</h1>
      <div className="paper">
        <p>{t('about.p1')}</p>
        <ul>
          <li>Dubai locations (desert / downtown / marina / beach)</li>
          <li>Styling + flying dress looks</li>
          <li>Fast delivery & retouching</li>
        </ul>
      </div>
    </div>
  );
}
