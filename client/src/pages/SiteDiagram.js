import React from 'react';
import { useTranslation } from 'react-i18next';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

function SiteDiagram() {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">{t('architecture.heading')}</h1>
      <p className="mb-4">{t('architecture.intro')}</p>

      <div className="space-y-4 text-left p-4 border rounded-lg bg-gray-50">
        <p><strong>{t('architecture.frontend.title')}</strong> {t('architecture.frontend.body')}</p>
        <p><strong>{t('architecture.backend.title')}</strong> {t('architecture.backend.body')}</p>
        <p><strong>{t('architecture.database.title')}</strong> {t('architecture.database.body')}</p>
        <p><strong>{t('architecture.admin.title')}</strong> {t('architecture.admin.body')}</p>
      </div>

      <ArchitectureDiagram />
    </div>
  );
}

export default SiteDiagram;
