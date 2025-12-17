import React from 'react';
import { Outlet, useParams, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Layout() {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();

  const switchLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
    // Переход сохраняет текущий "путь" внутри языка
    const current = window.location.pathname.split('/').slice(2).join('/');
    window.location.href = `/${lng}/${current ? current : ''}`.replace(/\/$/, '');
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container header-inner">
          <div className="brand">{t('brand')}</div>

          <nav className="nav">
            <NavLink end to={`/${lang}`} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('nav.home')}
            </NavLink>
            <NavLink to={`/${lang}/locations`} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('nav.locations')}
            </NavLink>
            <NavLink to={`/${lang}/dresses`} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('nav.dresses')}
            </NavLink>
            <NavLink to={`/${lang}/about`} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('nav.about')}
            </NavLink>
            <NavLink to={`/${lang}/reviews`} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('nav.reviews')}
            </NavLink>
            <NavLink to={`/${lang}/contacts`} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('nav.contacts')}
            </NavLink>
          </nav>

          <div className="lang">
            <button className={i18n.language === 'ru' ? 'chip active' : 'chip'} onClick={() => switchLang('ru')}>RU</button>
            <button className={i18n.language === 'en' ? 'chip active' : 'chip'} onClick={() => switchLang('en')}>EN</button>
            <button className={i18n.language === 'ar' ? 'chip active' : 'chip'} onClick={() => switchLang('ar')}>AR</button>
          </div>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>© {new Date().getFullYear()} Flying Dress Dubai</div>
          <div className="muted">Demo project (content editable in server/content/content.json)</div>
        </div>
      </footer>
    </div>
  );
}
