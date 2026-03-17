import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HamburgerIcon = () => (
  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const next = i18n.language?.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(next);
    localStorage.setItem('language', next);
  };

  const navLinks = [
    { to: '/', text: t('nav.home') },
    { to: '/about', text: t('nav.about') },
    { to: '/resume', text: t('nav.resume') },
    { to: '/projects', text: t('nav.projects') },
    { to: '/blog', text: t('nav.blog') },
    { to: '/site-diagram', text: t('nav.architecture') },
    { to: '/contact', text: t('nav.contact') },
  ];

  const linkClasses = "px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-200 hover:text-slate-900";
  const activeLinkClasses = "bg-slate-800 text-white hover:bg-slate-800 hover:text-white";

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink to="/" className="text-xl font-bold text-slate-900">ndsworks</NavLink>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map(link => (
                  <NavLink key={link.to} to={link.to} className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
                    {link.text}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="hidden md:block px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-full hover:bg-slate-100 transition-colors"
            >
              {i18n.language?.startsWith('es') ? 'EN' : 'ES'}
            </button>
            <NavLink
              to="/admin"
              className="hidden md:block px-2 py-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              ⚙
            </NavLink>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-slate-100 inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-slate-500"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <CloseIcon /> : <HamburgerIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`transition-all duration-300 ease-in-out md:hidden ${isOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} onClick={() => setIsOpen(false)} className={({ isActive }) => `block ${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
              {link.text}
            </NavLink>
          ))}
          <button
            onClick={() => { toggleLang(); setIsOpen(false); }}
            className={`block w-full text-left ${linkClasses}`}
          >
            {i18n.language?.startsWith('es') ? 'EN — English' : 'ES — Español'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
