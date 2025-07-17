import React from 'react';

function Resume() {
  // You can fetch this data from an API or keep it static
  const resumeData = {
    name: 'Jorge Garro',
    title: 'Information Systems Engineer',
    summary: 'Results-oriented Information Systems Engineer...',
    // ...etc
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Resume</h1>
      {/* A full resume layout would go here. For simplicity, we'll just show a download link. */}
      <p>My professional experience and skills are detailed on this site. For a traditional format, you can download my resume below.</p>
      <a href="/CV.JorgeGarro.InformationSystemsEngineer.Full.pdf" download className="mt-6 inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
        Download Resume (PDF)
      </a>
      {/* Make sure to place your PDF file in the `client/public` directory */}
    </div>
  );
}

export default Resume;