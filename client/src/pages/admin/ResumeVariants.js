import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';

const SKILL_CATEGORIES = [
  'Languages',
  'Frameworks & Libraries',
  'Databases',
  'APIs & Integrations',
  'AI Tools',
  'Cloud & DevOps',
  'Systems & Infrastructure',
  'Methodologies',
];

const emptyForm = {
  name: '',
  targetRole: '',
  targetCompany: '',
  customSummary: '',
  customSummary_es: '',
  skillCategoryOrder: [...SKILL_CATEGORIES],
  hiddenExperienceIds: [],
  jobDescription: '',
};

function VariantForm({ initial, experience, onSave, onCancel }) {
  const [form, setForm] = useState(initial);
  const [generating, setGenerating] = useState(false);

  const moveCategory = (index, dir) => {
    const order = [...form.skillCategoryOrder];
    const swap = index + dir;
    if (swap < 0 || swap >= order.length) return;
    [order[index], order[swap]] = [order[swap], order[index]];
    setForm(f => ({ ...f, skillCategoryOrder: order }));
  };

  const toggleExp = (id) => {
    setForm(f => {
      const hidden = f.hiddenExperienceIds.includes(id)
        ? f.hiddenExperienceIds.filter(x => x !== id)
        : [...f.hiddenExperienceIds, id];
      return { ...f, hiddenExperienceIds: hidden };
    });
  };

  const handleGenerate = async () => {
    if (!form.jobDescription?.trim()) return;
    setGenerating(true);
    try {
      const res = await axios.post('/api/admin/ai/generate-variant', { jobDescription: form.jobDescription });
      setForm(f => ({
        ...f,
        customSummary: res.data.customSummary,
        customSummary_es: res.data.customSummary_es,
        skillCategoryOrder: res.data.skillCategoryOrder,
      }));
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = () => {
    onSave({
      name: form.name,
      targetRole: form.targetRole,
      targetCompany: form.targetCompany,
      customSummary: form.customSummary,
      customSummary_es: form.customSummary_es,
      config: {
        skillCategoryOrder: form.skillCategoryOrder,
        hiddenExperienceIds: form.hiddenExperienceIds,
      },
    });
  };

  const inputClass = 'w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none text-sm';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="Variant name (e.g. Synnex Full-Stack Jan 2026)"
          className={inputClass}
        />
        <input
          value={form.targetRole}
          onChange={e => setForm(f => ({ ...f, targetRole: e.target.value }))}
          placeholder="Target role (e.g. Senior Full-Stack Developer)"
          className={inputClass}
        />
        <input
          value={form.targetCompany}
          onChange={e => setForm(f => ({ ...f, targetCompany: e.target.value }))}
          placeholder="Target company (e.g. Synnex)"
          className={inputClass}
        />
      </div>
      <textarea
        value={form.customSummary}
        onChange={e => setForm(f => ({ ...f, customSummary: e.target.value }))}
        placeholder="Custom summary (EN) — leave blank to use base summary"
        rows={3}
        className={inputClass}
      />
      <textarea
        value={form.customSummary_es}
        onChange={e => setForm(f => ({ ...f, customSummary_es: e.target.value }))}
        placeholder="Resumen personalizado (ES) — dejar en blanco para usar el original"
        rows={3}
        className={inputClass}
      />

      <div className="border border-slate-700 rounded-lg p-4 space-y-3">
        <p className="text-sm font-medium text-slate-300">AI Generate</p>
        <textarea
          value={form.jobDescription}
          onChange={e => setForm(f => ({ ...f, jobDescription: e.target.value }))}
          placeholder="Paste job description / posting here..."
          rows={5}
          className={inputClass}
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating || !form.jobDescription?.trim()}
          className="px-4 py-2 bg-slate-600 hover:bg-slate-500 disabled:opacity-40 rounded text-sm font-medium transition-colors"
        >
          {generating ? 'Generating...' : 'Generate with AI'}
        </button>
      </div>

      <div>
        <p className="text-sm text-slate-400 mb-2">Skill category order (drag to reorder via up/down)</p>
        <div className="space-y-1">
          {form.skillCategoryOrder.map((cat, i) => (
            <div key={cat} className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded">
              <span className="text-xs text-slate-500 w-5">{i + 1}.</span>
              <span className="flex-1 text-sm">{cat}</span>
              <button
                onClick={() => moveCategory(i, -1)}
                disabled={i === 0}
                className="text-slate-400 hover:text-white disabled:opacity-20 text-xs px-1"
              >▲</button>
              <button
                onClick={() => moveCategory(i, 1)}
                disabled={i === form.skillCategoryOrder.length - 1}
                className="text-slate-400 hover:text-white disabled:opacity-20 text-xs px-1"
              >▼</button>
            </div>
          ))}
        </div>
      </div>

      {experience.length > 0 && (
        <div>
          <p className="text-sm text-slate-400 mb-2">Hide experience entries</p>
          <div className="space-y-1">
            {experience.map(exp => (
              <label key={exp.id} className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.hiddenExperienceIds.includes(exp.id)}
                  onChange={() => toggleExp(exp.id)}
                  className="accent-slate-400"
                />
                <span className="text-sm">{exp.company} — {exp.role} ({exp.period})</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded text-sm font-medium transition-colors"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function ResumeVariants() {
  const [variants, setVariants] = useState([]);
  const [experience, setExperience] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [vRes, rRes] = await Promise.all([
      axios.get('/api/admin/variants'),
      axios.get('/api/admin/resume'),
    ]);
    setVariants(vRes.data);
    setExperience(rRes.data.experience || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (payload) => {
    await axios.post('/api/admin/variants', payload);
    setCreating(false);
    load();
  };

  const handleUpdate = async (id, payload) => {
    await axios.put(`/api/admin/variants/${id}`, payload);
    setEditingId(null);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this variant?')) return;
    await axios.delete(`/api/admin/variants/${id}`);
    load();
  };

  const initialFormFromVariant = (v) => ({
    name: v.name,
    targetRole: v.targetRole || '',
    targetCompany: v.targetCompany || '',
    customSummary: v.customSummary || '',
    customSummary_es: v.customSummary_es || '',
    skillCategoryOrder: v.config?.skillCategoryOrder?.length ? v.config.skillCategoryOrder : [...SKILL_CATEGORIES],
    hiddenExperienceIds: v.config?.hiddenExperienceIds || [],
    jobDescription: '',
  });

  if (loading) return <AdminLayout><p className="text-slate-400">Loading...</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Resume Variants</h1>
        {!creating && (
          <button
            onClick={() => { setCreating(true); setEditingId(null); }}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded text-sm font-medium transition-colors"
          >
            + New Variant
          </button>
        )}
      </div>

      {creating && (
        <section className="bg-slate-800 p-5 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-4 text-slate-300">New Variant</h2>
          <VariantForm
            initial={emptyForm}
            experience={experience}
            onSave={handleCreate}
            onCancel={() => setCreating(false)}
          />
        </section>
      )}

      {variants.length === 0 && !creating && (
        <p className="text-slate-400 text-sm">No variants yet. Create one to target specific job postings.</p>
      )}

      {variants.map(v => (
        <div key={v.id} className="bg-slate-800 p-5 rounded-lg mb-4">
          {editingId === v.id ? (
            <>
              <h2 className="text-lg font-semibold mb-4 text-slate-300">Editing: {v.name}</h2>
              <VariantForm
                initial={initialFormFromVariant(v)}
                experience={experience}
                onSave={payload => handleUpdate(v.id, payload)}
                onCancel={() => setEditingId(null)}
              />
            </>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{v.name}</p>
                {(v.targetRole || v.targetCompany) && (
                  <p className="text-sm text-slate-400">
                    {[v.targetRole, v.targetCompany].filter(Boolean).join(' @ ')}
                  </p>
                )}
                {v.config?.skillCategoryOrder?.length > 0 && (
                  <p className="text-xs text-slate-500 mt-1">
                    Skills: {v.config.skillCategoryOrder.join(' → ')}
                  </p>
                )}
                {v.config?.hiddenExperienceIds?.length > 0 && (
                  <p className="text-xs text-slate-500">
                    Hidden experience: {v.config.hiddenExperienceIds.length} entr{v.config.hiddenExperienceIds.length === 1 ? 'y' : 'ies'}
                  </p>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <a
                  href={`/api/resume/pdf?variant=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs transition-colors"
                >
                  PDF
                </a>
                <a
                  href={`/api/resume/ats?variant=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs transition-colors"
                >
                  ATS
                </a>
                <button
                  onClick={() => { setEditingId(v.id); setCreating(false); }}
                  className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(v.id)}
                  className="px-3 py-1 bg-red-800 hover:bg-red-700 rounded text-xs transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </AdminLayout>
  );
}

export default ResumeVariants;
