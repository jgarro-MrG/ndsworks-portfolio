import React from 'react';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center text-slate-900">{t('about.heading')}</h1>
      <div className="space-y-4 text-slate-700 text-justify">
        <p>{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <p>{t('about.p3')}</p>
        <p>{t('about.p4')}</p>
        <p>{t('about.p5')}</p>
        <p>{t('about.p6')}</p>
      </div>
    </div>
  );
}

export default About;
