import React from 'react';

const ArchitectureDiagram = () => {
  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-center mb-6 text-slate-800">User Request Flow</h3>
      <div className="flex flex-col md:flex-row justify-around items-center gap-4 text-center text-sm">

        {/* Client */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 flex items-center justify-center bg-blue-100 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-md border border-slate-200">
            <p className="font-bold">Vercel Edge</p>
            <p className="text-slate-600">React UI</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-slate-400 font-mono transform md:rotate-0 rotate-90">
          <p className="mb-1 text-xs">API Request</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <p className="mt-1 text-xs">API Response</p>
        </div>

        {/* Backend */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 flex items-center justify-center bg-purple-100 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-md border border-slate-200">
            <p className="font-bold">Vercel Serverless</p>
            <p className="text-slate-600">Express/Node.js API</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-slate-400 font-mono transform md:rotate-0 rotate-90">
          <p className="mb-1 text-xs">DB Query</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <p className="mt-1 text-xs">DB Response</p>
        </div>

        {/* Database */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 flex items-center justify-center bg-green-100 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-md border border-slate-200">
            <p className="font-bold">PostgreSQL DB</p>
            <p className="text-slate-600">Sequelize ORM</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ArchitectureDiagram;