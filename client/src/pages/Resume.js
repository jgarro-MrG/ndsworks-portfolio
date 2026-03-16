import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useFetchData from '../hooks/useFetchData';

function Resume() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'es' ? 'es' : undefined;
  const { data: resume, loading, error } = useFetchData('/api/resume/', lang);

  if (loading) return <div className="text-center p-10">{t('common.loading')}</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!resume) return <div className="text-center p-10">Could not load resume.</div>;

  return (
    <div>
      <div className="flex justify-end mb-6 gap-3">
        <Link
          to="/resume/ats"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-800 font-semibold rounded-lg border border-slate-300 shadow-sm hover:bg-slate-100 transition-colors text-sm"
        >
          {t('resume.downloadATS')}
        </Link>
        <a
          href={lang ? `/api/resume/pdf?lang=${lang}` : '/api/resume/pdf'}
          download={lang ? `Jorge_Garro_Resume_${lang}.pdf` : 'Jorge_Garro_Resume_en.pdf'}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 transition-colors text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {t('resume.downloadPDF')}
        </a>
      </div>

      <div className="space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">{resume.name}</h1>
          <h2 className="text-xl text-slate-600 mt-2">{resume.title}</h2>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-slate-800 border-b pb-2 mb-4">{t('resume.summary')}</h3>
          <p className="text-slate-700">{resume.summary}</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-slate-800 border-b pb-2 mb-4">{t('resume.skills')}</h3>
          <div className="space-y-2">
            {resume.skills.map(skill => (
              <div key={skill.id} className="skill-entry flex flex-col sm:flex-row">
                <p className="font-semibold w-full sm:w-1/4">{skill.category}:</p>
                <p className="text-slate-600 w-full sm:w-3/4">{skill.details}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-slate-800 border-b pb-2 mb-4">{t('resume.experience')}</h3>
          <div className="space-y-8">
            {resume.experience.map(job => (
              <div key={job.id} className="job-entry">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-lg font-bold">{job.role}</h4>
                  <p className="text-sm text-slate-500">{job.period}</p>
                </div>
                <p className="font-semibold text-slate-700">{job.company} | {job.location}</p>
                {job.details && job.details.length > 0 && (
                  <p className="mt-2 text-slate-600">{job.details[0]}</p>
                )}
                {job.details && job.details.length > 1 && (
                  <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600">
                    {job.details.slice(1).map((detail, index) => (
                      <li key={`${job.id}-detail-${index + 1}`}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-slate-800 border-b pb-2 mb-4">{t('resume.education')}</h3>
          {resume.education.map(edu => (
            <div key={edu.id} className="education-entry">
              <div className="flex justify-between items-baseline">
                <h4 className="text-lg font-bold">{edu.institution}</h4>
                <p className="text-sm text-slate-500">{edu.period}</p>
              </div>
              <p className="font-semibold text-slate-700">{edu.degree}</p>
              <p className="text-sm text-slate-600 italic">{edu.notes}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Resume;
