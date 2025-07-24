// client/src/pages/Projects.js
import React from 'react';
import useFetchData from '../hooks/useFetchData';

function Projects() {
  const { data: projects, loading, error } = useFetchData('/api/projects/');

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!projects) return null;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-slate-900">Projects</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map(project => (
          <div key={project._id} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col">
            <h2 className="text-xl font-bold text-slate-800">{project.title}</h2>
            <p className="text-slate-600 mt-2 flex-grow">{project.description}</p>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Projects;