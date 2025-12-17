import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getContent, sendLead } from '../lib/api';

function LanguageOverlay() {
  const { t } = useTranslation();
  const pick = (lng) => {
    localStorage.setItem('lang', lng);
    window.location.href = `/${lng}`;
  };
  return (
    <div className="overlay">
      <div className="overlay-card">
        <div className="overlay-title">{t('lang.choose')}</div>
        <div className="overlay-actions">
          <button className="btn" onClick={() => pick('ru')}>RU</button>
          <button className="btn" onClick={() => pick('en')}>EN</button>
          <button className="btn" onClick={() => pick('ar')}>AR</button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();

  const [content, setContent] = useState(null);
  const [shootType, setShootType] = useState(null);
  const [pkg, setPkg] = useState(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', date: '', whatsapp: '', comment: '' });

  useEffect(() => {
    let mounted = true;
    getContent().then((d) => mounted && setContent(d)).catch(console.error);
    return () => (mounted = false);
  }, []);

  const shootTypes = content?.shootTypes || [];
  const packages = content?.packages || [];
  const gallery = content?.gallery || {};
  const whatsappNumber = content?.whatsappNumber || '971000000000';

  const filteredPackages = useMemo(() => {
    if (!shootType) return [];
    return packages.filter((p) => p.typeId === shootType.id);
  }, [packages, shootType]);

  const filteredGallery = useMemo(() => {
    if (!shootType) return [];
    return gallery?.[shootType.id] || [];
  }, [gallery, shootType]);

  const whatsappHref = useMemo(() => {
    const msg = t('whatsapp.message');
    const text = encodeURIComponent(msg);
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  }, [whatsappNumber, i18n.language, t]);

  const onSend = async (e) => {
    e.preventDefault();
    setSent(false);
    try {
      await sendLead({
        ...form,
        lang,
        shootType: shootType?.id || null,
        packageId: pkg?.id || null
      });
      setSent(true);
      setForm({ name: '', date: '', whatsapp: '', comment: '' });
    } catch (err) {
      alert(String(err?.message || err));
    }
  };

  // Hero background image (placeholder)
  const heroBg =
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=80';

  // Если пользователь открыл / (без языка) — редирект уже есть, но на всякий случай оставим оверлей
  if (!lang) return <LanguageOverlay />;

  return (
    <div>
      <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay" />
        <div className="container hero-inner">
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>

          <div className="hero-lang">
            <span className="muted">{t('lang.choose')}:</span>
            <div className="chips">
              <button className={i18n.language === 'ru' ? 'chip active' : 'chip'} onClick={() => (window.location.href = '/ru')}>RU</button>
              <button className={i18n.language === 'en' ? 'chip active' : 'chip'} onClick={() => (window.location.href = '/en')}>EN</button>
              <button className={i18n.language === 'ar' ? 'chip active' : 'chip'} onClick={() => (window.location.href = '/ar')}>AR</button>
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">{t('step.format')}</h2>
        <div className="grid cards">
          {shootTypes.map((s) => (
            <button
              key={s.id}
              className={shootType?.id === s.id ? 'card active' : 'card'}
              onClick={() => {
                setShootType(s);
                setPkg(null);
                setSent(false);
              }}
            >
              <div className="card-icon">{s.icon}</div>
              <div className="card-title">{t(s.labelKey)}</div>
            </button>
          ))}
        </div>
      </section>

      {shootType && (
        <section className="container section">
          <h2 className="section-title">{t('step.packages')}</h2>
          <div className="grid packages">
            {filteredPackages.map((p) => (
              <div key={p.id} className={pkg?.id === p.id ? 'pkg active' : 'pkg'}>
                <div className="pkg-top">
                  <div className="pkg-tier">{p.tier}</div>
                  <div className="pkg-price">{p.price}</div>
                </div>

                <div className="pkg-row"><span className="muted">{t('package.duration')}:</span> <b>{p.duration}</b></div>
                <div className="pkg-row"><span className="muted">{t('package.locations')}:</span> <b>{p.locations}</b></div>
                <div className="pkg-row"><span className="muted">{t('package.outfits')}:</span> <b>{p.outfits}</b></div>
                <div className="pkg-row"><span className="muted">{t('package.media')}:</span> <b>{p.media}</b></div>
                <div className="pkg-row"><span className="muted">{t('package.edited')}:</span> <b>{p.edited}</b></div>

                <button className="btn btn-wide" onClick={() => setPkg(p)}>
                  {t('package.select')}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {shootType && (
        <section className="container section">
          <h2 className="section-title">{t('step.gallery')}</h2>
          <div className="grid gallery">
            {filteredGallery.map((src, idx) => (
              <a key={src} className="photo" href={src} target="_blank" rel="noreferrer">
                <img src={src} alt={`example-${idx}`} loading="lazy" />
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="container section">
        <div className="cta">
          <div>
            <div className="cta-title">{t('cta.questions')}</div>
            <div className="cta-sub muted">WhatsApp / Instagram</div>
          </div>
          <div className="cta-actions">
            <a className="btn" href={whatsappHref} target="_blank" rel="noreferrer">
              {t('cta.whatsapp')}
            </a>
            <a className="btn btn-ghost" href="https://instagram.com/" target="_blank" rel="noreferrer">
              {t('cta.instagram')}
            </a>
          </div>
        </div>

        <div className="form-wrap">
          <div className="section-title">{t('form.title')}</div>

          <form className="form" onSubmit={onSend}>
            <div className="form-grid">
              <label className="field">
                <span className="muted">{t('form.name')}</span>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Elissa" />
              </label>

              <label className="field">
                <span className="muted">{t('form.date')}</span>
                <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="2026-01-10" />
              </label>

              <label className="field">
                <span className="muted">{t('form.whatsapp')}</span>
                <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="+971..." />
              </label>

              <label className="field field-full">
                <span className="muted">{t('form.comment')}</span>
                <textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="..." rows={4} />
              </label>
            </div>

            <div className="form-actions">
              <button className="btn" type="submit">{t('form.send')}</button>
              {sent && <span className="ok">{t('form.sent')}</span>}
              {pkg && <span className="muted">Selected: <b>{pkg.tier}</b></span>}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
