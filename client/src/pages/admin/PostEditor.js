import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import AdminLayout from '../../components/admin/AdminLayout';

function PostEditor() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');
  const [previewMode, setPreviewMode] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', title_es: '', content_es: '' });

  useEffect(() => {
    if (!isNew) {
      axios.get('/api/admin/posts').then(r => {
        const post = r.data.find(p => String(p.id) === id);
        if (post) {
          setForm({
            title: post.title || '',
            content: post.content || '',
            title_es: post.title_es || '',
            content_es: post.content_es || '',
          });
        }
      });
    }
  }, [id, isNew]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNew) {
      await axios.post('/api/admin/posts', form);
    } else {
      await axios.put(`/api/admin/posts/${id}`, form);
    }
    navigate('/admin/posts');
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">{isNew ? 'New Post' : 'Edit Post'}</h1>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {lang === 'en' ? (
            <>
              <input
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="Title (EN)"
                required
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-slate-500"
              />
              <div>
                <div className="flex gap-1 mb-1">
                  {['Write', 'Preview'].map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPreviewMode(mode === 'Preview')}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        (previewMode ? 'Preview' : 'Write') === mode
                          ? 'bg-slate-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                {previewMode ? (
                  <div className="prose prose-invert max-w-none min-h-48 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-sm">
                    <ReactMarkdown>{form.content}</ReactMarkdown>
                  </div>
                ) : (
                  <textarea
                    value={form.content}
                    onChange={e => setForm({ ...form, content: e.target.value })}
                    placeholder="Content (EN) — markdown supported"
                    required
                    rows={12}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-slate-500"
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <input
                value={form.title_es}
                onChange={e => setForm({ ...form, title_es: e.target.value })}
                placeholder="Título (ES)"
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-slate-500"
              />
              <div>
                <div className="flex gap-1 mb-1">
                  {['Write', 'Preview'].map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPreviewMode(mode === 'Preview')}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        (previewMode ? 'Preview' : 'Write') === mode
                          ? 'bg-slate-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                {previewMode ? (
                  <div className="prose prose-invert max-w-none min-h-48 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-sm">
                    <ReactMarkdown>{form.content_es}</ReactMarkdown>
                  </div>
                ) : (
                  <textarea
                    value={form.content_es}
                    onChange={e => setForm({ ...form, content_es: e.target.value })}
                    placeholder="Contenido (ES) — markdown admitido"
                    rows={12}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-slate-500"
                  />
                )}
              </div>
            </>
          )}
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-sm font-medium transition-colors"
            >
              {isNew ? 'Create' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/posts')}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default PostEditor;
