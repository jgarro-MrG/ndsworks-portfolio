// client/src/pages/Resume.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Resume() {
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/resume/')
            .then(response => {
                setResume(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching resume data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center p-10">Loading Resume...</div>;
    if (!resume) return <div className="text-center p-10">Could not load resume.</div>;

    return (
        <div className="space-y-12">
            <header className="text-center">
                <h1 className="text-4xl font-bold text-slate-900">{resume.name}</h1>
                <h2 className="text-xl text-slate-600 mt-2">{resume.title}</h2>
            </header>

            <section>
                <h3 className="text-2xl font-bold text-slate-800 border-b pb-2 mb-4">Professional Summary</h3>
                <p className="text-slate-700">{resume.summary}</p>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-slate-800 border-b pb-2 mb-4">Technical Skills</h3>
                <div className="space-y-2">
                    {resume.skills.map(skill => (
                        <div key={skill.category} className="flex flex-col sm:flex-row">
                            <p className="font-semibold w-full sm:w-1/4">{skill.category}:</p>
                            <p className="text-slate-600 w-full sm:w-3/4">{skill.details}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-slate-800 border-b pb-2 mb-4">Work Experience</h3>
                <div className="space-y-8">
                    {resume.experience.map(job => (
                        <div key={job.company}>
                            <div className="flex justify-between items-baseline">
                                <h4 className="text-lg font-bold">{job.role}</h4>
                                <p className="text-sm text-slate-500">{job.period}</p>
                            </div>
                            <p className="font-semibold text-slate-700">{job.company} | {job.location}</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600">
                                {job.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-slate-800 border-b pb-2 mb-4">Education</h3>
                {resume.education.map(edu => (
                    <div key={edu.institution}>
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
    );
}
export default Resume;