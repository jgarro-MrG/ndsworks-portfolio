import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminLayout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-slate-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <aside className="w-48 bg-slate-800 p-4 flex flex-col gap-2 shrink-0">
        <h2 className="text-white font-bold text-lg mb-4">Admin</h2>
        <NavLink to="/admin/posts" className={linkClass}>Posts</NavLink>
        <NavLink to="/admin/resume" className={linkClass} end>Resume</NavLink>
        <NavLink to="/admin/resume/variants" className={linkClass}>Variants</NavLink>
        <NavLink to="/admin/projects" className={linkClass}>Projects</NavLink>
        <button
          onClick={handleLogout}
          className="mt-auto px-4 py-2 text-left text-slate-300 hover:text-white text-sm rounded-lg hover:bg-slate-700 transition-colors"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8 text-slate-100 overflow-auto">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
