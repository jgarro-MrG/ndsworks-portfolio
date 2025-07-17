import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects/')
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map(project => (
          <div key={project._id} className="bg-white p-6 rounded-lg shadow flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
            <p className="text-gray-700 mt-2 flex-grow">{project.description}</p>
            <div className="mt-4">
              <h3 className="font-semibold">Technologies Used:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{tech}</span>
                ))}
              </div>
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-4 self-start">
                View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
