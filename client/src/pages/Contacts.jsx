import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getContent, sendLead } from '../lib/api';
import { useParams } from 'react-router-dom';

export default function Contacts() {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', date: '', whatsapp: '', comment: '' });

  useEffect(() => {
    getContent().then(setContent).catch(console.error);
  }, []);

  const whatsappNumber = content?.whatsappNumber || '971000000000';

  const whatsappHref = useMemo(() => {
    const msg = t('whatsapp.message');
    const text = encodeURIComponent(msg);
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  }, [whatsappNumber, i18n.language, t]);

  const onSend = async (e) => {
    e.preventDefault();
    setSent(false);
    try {
      await sendLead({ ...form, lang });
      setSent(true);
      setForm({ name: '', date: '', whatsapp: '', comment: '' });
    } catch (err) {
      alert(String(err?.message || err));
    }
  };

  return (
    <div className="container section">
      <h1 className="page-title">{t('contacts.title')}</h1>

      <div className="cta cta-page">
        <a className="btn" href={whatsappHref} target="_blank" rel="noreferrer">{t('cta.whatsapp')}</a>
        <a className="btn btn-ghost" href="https://instagram.com/" target="_blank" rel="noreferrer">{t('cta.instagram')}</a>
      </div>

      <div className="paper">
        <div className="section-title">{t('form.title')}</div>
        <form className="form" onSubmit={onSend}>
          <div className="form-grid">
            <label className="field">
              <span className="muted">{t('form.name')}</span>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>

            <label className="field">
              <span className="muted">{t('form.date')}</span>
              <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </label>

            <label className="field">
              <span className="muted">{t('form.whatsapp')}</span>
              <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
            </label>

            <label className="field field-full">
              <span className="muted">{t('form.comment')}</span>
              <textarea rows={4} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
            </label>
          </div>

          <div className="form-actions">
            <button className="btn" type="submit">{t('form.send')}</button>
            {sent && <span className="ok">{t('form.sent')}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
