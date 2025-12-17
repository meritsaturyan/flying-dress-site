import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getContent } from '../lib/api';

export default function Reviews() {
  const { t } = useTranslation();
  const [content, setContent] = useState(null);

  useEffect(() => {
    getContent().then(setContent).catch(console.error);
  }, []);

  const reviews = content?.reviews || [];

  return (
    <div className="container section">
      <h1 className="page-title">{t('reviews.title')}</h1>

      <div className="grid reviews">
        {reviews.map((r) => (
          <div key={r.id} className="review">
            <div className="review-name">{r.name}</div>
            <div className="review-text">{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
