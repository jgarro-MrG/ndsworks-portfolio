import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';

function LangTabs({ lang, setLang }) {
  return (
    <div className="flex gap-2 mb-4">
      {['en', 'es'].map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-4 py-1 rounded text-sm font-medium transition-colors ${
            lang === l ? 'bg-slate-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function ResumeEditor() {
  const [resume, setResume] = useState(null);
  const [lang, setLang] = useState('en');
  const [headerForm, setHeaderForm] = useState({ name: '', title: '', title_es: '', summary: '', summary_es: '', contact_phone: '', contact_location: '' });
  const [expForms, setExpForms] = useState([]);
  const [eduForms, setEduForms] = useState([]);
  const [skillForms, setSkillForms] = useState([]);

  const load = async () => {
    const r = await axios.get('/api/admin/resume');
    const d = r.data;
    setResume(d);
    setHeaderForm({
      name: d.name || '',
      title: d.title || '',
      title_es: d.title_es || '',
      summary: d.summary || '',
      summary_es: d.summary_es || '',
      contact_phone: (d.contact || {}).phone || '',
      contact_location: (d.contact || {}).location || '',
    });
    const parseStart = period => new Date((period || '').split(' - ')[0]);
    setExpForms((d.experience || [])
      .slice()
      .sort((a, b) => parseStart(b.period) - parseStart(a.period))
      .map(e => ({
        ...e,
        details: (e.details || []).join('\n'),
        details_es: (e.details_es || []).join('\n'),
      })));
    setEduForms(d.education || []);
    setSkillForms(d.skills || []);
  };

  useEffect(() => { load(); }, []);

  const saveHeader = async (e) => {
    e.preventDefault();
    const contact = {
      ...((resume && resume.contact) || {}),
      phone: headerForm.contact_phone,
      location: headerForm.contact_location,
    };
    await axios.put('/api/admin/resume', { ...headerForm, contact });
    alert('Header saved.');
  };

  const saveExp = async (exp) => {
    const payload = {
      ...exp,
      details: exp.details.split('\n').filter(Boolean),
      details_es: exp.details_es ? exp.details_es.split('\n').filter(Boolean) : [],
    };
    await axios.put(`/api/admin/experience/${exp.id}`, payload);
    alert('Experience saved.');
  };

  const deleteExp = async (id) => {
    if (!window.confirm('Delete this experience entry?')) return;
    await axios.delete(`/api/admin/experience/${id}`);
    load();
  };

  const saveEdu = async (edu) => {
    await axios.put(`/api/admin/education/${edu.id}`, edu);
    alert('Education saved.');
  };

  const deleteEdu = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;
    await axios.delete(`/api/admin/education/${id}`);
    load();
  };

  const saveSkill = async (skill) => {
    await axios.put(`/api/admin/skills/${skill.id}`, skill);
    alert('Skill saved.');
  };

  const deleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    await axios.delete(`/api/admin/skills/${id}`);
    load();
  };

  if (!resume) return <AdminLayout><p className="text-slate-400">Loading...</p></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-8">Resume Editor</h1>

      {/* Header & Summary */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-slate-300">Header &amp; Summary</h2>
        <LangTabs lang={lang} setLang={setLang} />
        <form onSubmit={saveHeader} className="space-y-3 max-w-2xl">
          <input
            value={headerForm.name}
            onChange={e => setHeaderForm({ ...headerForm, name: e.target.value })}
            placeholder="Name"
            className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none text-sm"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              value={headerForm.contact_phone}
              onChange={e => setHeaderForm({ ...headerForm, contact_phone: e.target.value })}
              placeholder="Phone (e.g. +506 7256 1637)"
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none text-sm"
            />
            <input
              value={headerForm.contact_location}
              onChange={e => setHeaderForm({ ...headerForm, contact_location: e.target.value })}
              placeholder="Location (e.g. San José, Costa Rica (Open to Remote))"
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none text-sm"
            />
          </div>
          {lang === 'en' ? (
            <>
              <input
                value={headerForm.title}
                onChange={e => setHeaderForm({ ...headerForm, title: e.target.value })}
                placeholder="Title (EN)"
                className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none text-sm"
              />
              <textarea
                value={headerForm.summary}
                onChange={e => setHeaderForm({ ...headerForm, summary: e.target.value })}
                placeholder="Summary (EN)"
                rows={4}
                className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none text-sm"
              />
            </>
          ) : (
            <>
              <input
                value={headerForm.title_es}
                onChange={e => setHeaderForm({ ...headerForm, title_es: e.target.value })}
                placeholder="Título (ES)"
                className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none text-sm"
              />
              <textarea
                value={headerForm.summary_es}
                onChange={e => setHeaderForm({ ...headerForm, summary_es: e.target.value })}
                placeholder="Resumen (ES)"
                rows={4}
                className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none text-sm"
              />
            </>
          )}
          <button type="submit" className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded text-sm font-medium transition-colors">
            Save Header
          </button>
        </form>
      </section>

      {/* Experience */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-slate-300">Experience</h2>
        <LangTabs lang={lang} setLang={setLang} />
        {expForms.map((exp, i) => (
          <div key={exp.id} className="bg-slate-800 p-4 rounded-lg mb-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400">{lang === 'en' ? 'Role' : 'Cargo'}</span>
                {lang === 'en' ? (
                  <input value={exp.role} onChange={e => { const a = [...expForms]; a[i] = { ...a[i], role: e.target.value }; setExpForms(a); }}
                    className="px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
                ) : (
                  <input value={exp.role_es || ''} onChange={e => { const a = [...expForms]; a[i] = { ...a[i], role_es: e.target.value }; setExpForms(a); }}
                    className="px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400">Company</span>
                <input value={exp.company} onChange={e => { const a = [...expForms]; a[i] = { ...a[i], company: e.target.value }; setExpForms(a); }}
                  className="px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400">Location</span>
                <input value={exp.location} onChange={e => { const a = [...expForms]; a[i] = { ...a[i], location: e.target.value }; setExpForms(a); }}
                  className="px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400">Period</span>
                <input value={exp.period} onChange={e => { const a = [...expForms]; a[i] = { ...a[i], period: e.target.value }; setExpForms(a); }}
                  className="px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-400">{lang === 'en' ? 'Details — one bullet per line' : 'Detalles — uno por línea'}</span>
              {lang === 'en' ? (
                <textarea value={exp.details} onChange={e => { const a = [...expForms]; a[i] = { ...a[i], details: e.target.value }; setExpForms(a); }}
                  rows={4} className="w-full px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
              ) : (
                <textarea value={exp.details_es} onChange={e => { const a = [...expForms]; a[i] = { ...a[i], details_es: e.target.value }; setExpForms(a); }}
                  rows={4} className="w-full px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => saveExp(exp)} className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs transition-colors">Save</button>
              <button onClick={() => deleteExp(exp.id)} className="px-3 py-1 bg-red-800 hover:bg-red-700 rounded text-xs transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-slate-300">Education</h2>
        <LangTabs lang={lang} setLang={setLang} />
        {eduForms.map((edu, i) => (
          <div key={edu.id} className="bg-slate-800 p-4 rounded-lg mb-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input value={edu.institution} onChange={e => { const a = [...eduForms]; a[i] = { ...a[i], institution: e.target.value }; setEduForms(a); }}
                placeholder="Institution" className="px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
              <input value={edu.period} onChange={e => { const a = [...eduForms]; a[i] = { ...a[i], period: e.target.value }; setEduForms(a); }}
                placeholder="Period" className="px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
            </div>
            {lang === 'en' ? (
              <>
                <input value={edu.degree} onChange={e => { const a = [...eduForms]; a[i] = { ...a[i], degree: e.target.value }; setEduForms(a); }}
                  placeholder="Degree (EN)" className="w-full px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
                <input value={edu.notes || ''} onChange={e => { const a = [...eduForms]; a[i] = { ...a[i], notes: e.target.value }; setEduForms(a); }}
                  placeholder="Notes (EN)" className="w-full px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
              </>
            ) : (
              <>
                <input value={edu.degree_es || ''} onChange={e => { const a = [...eduForms]; a[i] = { ...a[i], degree_es: e.target.value }; setEduForms(a); }}
                  placeholder="Título (ES)" className="w-full px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
                <input value={edu.notes_es || ''} onChange={e => { const a = [...eduForms]; a[i] = { ...a[i], notes_es: e.target.value }; setEduForms(a); }}
                  placeholder="Notas (ES)" className="w-full px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
              </>
            )}
            <div className="flex gap-2">
              <button onClick={() => saveEdu(edu)} className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs transition-colors">Save</button>
              <button onClick={() => deleteEdu(edu.id)} className="px-3 py-1 bg-red-800 hover:bg-red-700 rounded text-xs transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-slate-300">Skills</h2>
        <LangTabs lang={lang} setLang={setLang} />
        {skillForms.map((skill, i) => (
          <div key={skill.id} className="bg-slate-800 p-4 rounded-lg mb-2 flex gap-2 items-center">
            {lang === 'en' ? (
              <input value={skill.category} onChange={e => { const a = [...skillForms]; a[i] = { ...a[i], category: e.target.value }; setSkillForms(a); }}
                placeholder="Category (EN)" className="w-1/4 px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
            ) : (
              <input value={skill.category_es || ''} onChange={e => { const a = [...skillForms]; a[i] = { ...a[i], category_es: e.target.value }; setSkillForms(a); }}
                placeholder="Categoría (ES)" className="w-1/4 px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
            )}
            {lang === 'en' ? (
              <input value={skill.details} onChange={e => { const a = [...skillForms]; a[i] = { ...a[i], details: e.target.value }; setSkillForms(a); }}
                placeholder="Details (EN)" className="flex-1 px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
            ) : (
              <input value={skill.details_es || ''} onChange={e => { const a = [...skillForms]; a[i] = { ...a[i], details_es: e.target.value }; setSkillForms(a); }}
                placeholder="Detalles (ES)" className="flex-1 px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none" />
            )}
            <button onClick={() => saveSkill(skill)} className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs transition-colors shrink-0">Save</button>
            <button onClick={() => deleteSkill(skill.id)} className="px-3 py-1 bg-red-800 hover:bg-red-700 rounded text-xs transition-colors shrink-0">Delete</button>
          </div>
        ))}
      </section>
    </AdminLayout>
  );
}

export default ResumeEditor;
