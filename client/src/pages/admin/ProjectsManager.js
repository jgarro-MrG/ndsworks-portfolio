import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';

function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [newRepo, setNewRepo] = useState({ repoName: '', imageUrl: '', displayOrder: 0 });

  const load = () => axios.get('/api/admin/projects').then(r => setProjects(r.data));
  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post('/api/admin/projects', { ...newRepo, active: true });
    setNewRepo({ repoName: '', imageUrl: '', displayOrder: 0 });
    load();
  };

  const toggleActive = async (p) => {
    await axios.put(`/api/admin/projects/${p.id}`, { ...p, active: !p.active });
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project config?')) return;
    await axios.delete(`/api/admin/projects/${id}`);
    load();
  };

  const updateOrder = async (p, order) => {
    await axios.put(`/api/admin/projects/${p.id}`, { ...p, displayOrder: Number(order) });
    load();
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      <form onSubmit={handleAdd} className="bg-slate-800 p-4 rounded-lg mb-6 flex gap-3 items-end flex-wrap">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400">Repo Name</label>
          <input
            value={newRepo.repoName}
            onChange={e => setNewRepo({ ...newRepo, repoName: e.target.value })}
            required
            className="px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400">Image URL</label>
          <input
            value={newRepo.imageUrl}
            onChange={e => setNewRepo({ ...newRepo, imageUrl: e.target.value })}
            className="px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400">Order</label>
          <input
            type="number"
            value={newRepo.displayOrder}
            onChange={e => setNewRepo({ ...newRepo, displayOrder: e.target.value })}
            className="w-20 px-3 py-1.5 rounded bg-slate-700 border border-slate-600 text-sm focus:outline-none"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded text-sm font-medium transition-colors">
          Add
        </button>
      </form>

      <div className="space-y-2">
        {projects.map(p => (
          <div key={p.id} className="bg-slate-800 p-4 rounded-lg flex items-center gap-4">
            <span className="font-mono text-sm flex-1">{p.repoName}</span>
            <span className="text-xs text-slate-400 flex-1 truncate">{p.imageUrl}</span>
            <input
              type="number"
              value={p.displayOrder}
              onChange={e => updateOrder(p, e.target.value)}
              className="w-16 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-xs text-center focus:outline-none"
            />
            <button
              onClick={() => toggleActive(p)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                p.active ? 'bg-green-800 hover:bg-green-700' : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {p.active ? 'Active' : 'Hidden'}
            </button>
            <button
              onClick={() => handleDelete(p.id)}
              className="px-3 py-1 bg-red-800 hover:bg-red-700 rounded text-xs transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default ProjectsManager;
