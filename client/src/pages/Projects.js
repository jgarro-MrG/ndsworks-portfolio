// client/src/pages/Projects.js
import React from 'react';
import useFetchData from '../hooks/useFetchData';

// SVG icons for GitHub stats
const StarIcon = () => (
  <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" className="w-4 h-4 inline-block mr-1 fill-current">
    <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 13.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.192L.646 6.364a.75.75 0 01.416-1.28l4.21-.612L7.327.668A.75.75 0 018 .25z"></path>
  </svg>
);

const ForkIcon = () => (
  <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" className="w-4 h-4 inline-block mr-1 fill-current">
    <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zM10.5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
  </svg>
);

function Projects() {
  const { data: projects, loading, error } = useFetchData('/api/projects/');

  if (loading) return <div className="text-center p-10">Loading Projects...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!projects || projects.length === 0) return <div className="text-center p-10">No public projects found on GitHub.</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-slate-900">My GitHub Projects</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map(project => (
          <a key={project.id} href={project.githubLink} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col group overflow-hidden">
            <div className="w-full h-48 bg-slate-200">
              <img src={project.imageUrl} alt={`Preview of ${project.title}`} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-slate-800 capitalize group-hover:text-blue-600 transition-colors">{project.title}</h2>
              <p className="text-slate-600 mt-2 flex-grow">{project.description}</p>
              <div className="mt-4 pt-4 border-t border-slate-200 text-sm text-slate-500 flex justify-between items-center">
                <div className="flex items-center">
                  {project.language && (
                    <>
                      <span className={`w-3 h-3 rounded-full mr-2 bg-blue-500`}></span>
                      <span>{project.language}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <StarIcon />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center">
                    <ForkIcon />
                    <span>{project.forks}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
export default Projects;