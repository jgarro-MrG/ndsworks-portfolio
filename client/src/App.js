import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import SiteDiagram from './pages/SiteDiagram';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen text-slate-800 font-sans">
        <Navbar />
        <main>
          <div className="max-w-4xl mx-auto my-12 p-8 sm:p-12 bg-white/60 backdrop-blur-md rounded-xl shadow-lg">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/site-diagram" element={<SiteDiagram />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;