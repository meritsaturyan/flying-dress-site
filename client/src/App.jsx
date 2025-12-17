import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Layout from './components/Layout';
import Home from './pages/Home';
import Locations from './pages/Locations';
import Dresses from './pages/Dresses';
import About from './pages/About';
import Reviews from './pages/Reviews';
import Contacts from './pages/Contacts';

function LangGuard({ children }) {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const lng = lang || 'en';
    if (!['ru', 'en', 'ar'].includes(lng)) return;
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);

    const isRTL = lng === 'ar';
    document.documentElement.lang = lng;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', isRTL);
  }, [lang, i18n]);

  // Если язык не указан — перекидываем на сохранённый или en
  if (!lang) {
    const saved = localStorage.getItem('lang') || 'en';
    return <Navigate to={`/${saved}`} replace />;
  }

  if (!['ru', 'en', 'ar'].includes(lang)) {
    return <Navigate to="/en" replace />;
  }

  // Нормализуем двойные слэши и т.п.
  if (location.pathname.includes('//')) {
    return <Navigate to={location.pathname.replaceAll('//', '/')} replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${localStorage.getItem('lang') || 'en'}`} replace />} />
      <Route
        path="/:lang"
        element={
          <LangGuard>
            <Layout />
          </LangGuard>
        }
      >
        <Route index element={<Home />} />
        <Route path="locations" element={<Locations />} />
        <Route path="dresses" element={<Dresses />} />
        <Route path="about" element={<About />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>

      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}
