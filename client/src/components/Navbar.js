import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const linkStyles = "text-slate-500 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkStyles = "text-slate-900 font-semibold px-3 py-2 text-sm";

  return (
    <header className="bg-slate-50/80 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-slate-900 font-bold text-lg">NDSWorks</NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/about" className={({ isActive }) => isActive ? activeLinkStyles : linkStyles}>About</NavLink>
              <NavLink to="/blog" className={({ isActive }) => isActive ? activeLinkStyles : linkStyles}>Blog</NavLink>
              <NavLink to="/projects" className={({ isActive }) => isActive ? activeLinkStyles : linkStyles}>Projects</NavLink>
              <NavLink to="/resume" className={({ isActive }) => isActive ? activeLinkStyles : linkStyles}>Resume</NavLink>
              <NavLink to="/site-diagram" className={({ isActive }) => isActive ? activeLinkStyles : linkStyles}>Diagram</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? activeLinkStyles : linkStyles}>Contact</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;