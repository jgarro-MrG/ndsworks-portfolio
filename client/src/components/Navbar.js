import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const linkStyles = "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkStyles = "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium";

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-white font-bold text-xl">ndsworks.com</NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/blog" className={({ isActive }) => isActive ? activeLinkStyles : linkStyles}>Blog</NavLink>
              <NavLink to="/projects" className={({ isActive }) => isActive ? activeLinkStyles : linkStyles}>Projects</NavLink>
              <NavLink to="/resume" className={({ isActive }) => isActive ? activeLinkStyles : linkStyles}>Resume</NavLink>
              <NavLink to="/site-diagram" className={({ isActive }) => isActive ? activeLinkStyles : linkStyles}>Site Diagram</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? activeLinkStyles : linkStyles}>Contact</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;