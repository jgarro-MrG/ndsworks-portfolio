// client/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center text-center py-12">
      <img
        src="/img/portrait03.png"
        alt="Portrait of Jorge Garro"
        className="w-40 rounded-full mb-6 shadow-lg border-4 border-white"
      />
      <h1 className="text-5xl font-bold text-slate-900">Jorge Garro</h1>
      <h2 className="mt-2 text-2xl text-slate-600">Information Systems Engineer</h2>

      <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-700">
        A creative problem-solver passionate about building reliable systems and exploring the intersection of the arts, technology, and philosophy.
      </p>

      <div className="mt-8 flex gap-4">
        <Link to="/projects" className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 transition-colors">
          View My Work
        </Link>
        <Link to="/resume" className="px-6 py-3 bg-white text-slate-800 font-semibold rounded-lg border border-slate-300 shadow-sm hover:bg-slate-100 transition-colors">
          View Resume
        </Link>
      </div>

      <div className="mt-12 border-t border-slate-200 pt-8">
        <p className="italic text-slate-500">"There is no dark side of the moon, really. As a matter of fact, it's all dark."</p>
        <p className="mt-2 text-sm text-slate-600"><strong>No Dark Side Works</strong> - Inspired by a sentiment from Pink Floyd's The Dark Side of the Moon.</p>
      </div>
    </div>
  );
}
export default Home;