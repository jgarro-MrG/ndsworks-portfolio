import React from 'react';
import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">{t('contact.heading')}</h1>
      <p className="text-lg text-slate-700">{t('contact.body')}</p>
      <div className="mt-6">
        <a href="mailto:jgarro@ndsworks.com" className="text-xl text-blue-600 hover:underline">
          jgarro@ndsworks.com
        </a>
      </div>
    </div>
  );
}

export default Contact;
