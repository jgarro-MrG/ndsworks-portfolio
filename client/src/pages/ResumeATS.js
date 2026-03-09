import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function ResumeATS() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const langParam = lang === 'es' ? '?lang=es' : '';
    setLoading(true);
    axios.get(`/api/resume/ats${langParam}`)
      .then(r => setText(r.data))
      .catch(() => setError(t('common.error')))
      .finally(() => setLoading(false));
  }, [lang, t]);

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Jorge_Garro_Resume_ATS.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="text-center p-10">{t('ats.loading')}</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Link to="/resume" className="text-slate-600 hover:text-slate-900 text-sm">
          ← {t('ats.back')}
        </Link>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 transition-colors text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {t('ats.download')}
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-2 text-slate-900">{t('ats.heading')}</h1>
      <p className="text-sm text-slate-500 mb-4">
        This plain-text version is intended for <strong>copy-pasting</strong> into ATS application form fields that strip formatting.
        To submit your resume as a file, use the <a href="/api/resume/pdf" className="underline hover:text-slate-700" target="_blank" rel="noreferrer">PDF version</a> instead.
      </p>
      <pre className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-sm font-mono text-slate-700 whitespace-pre-wrap overflow-auto">
        {text}
      </pre>
    </div>
  );
}

export default ResumeATS;
