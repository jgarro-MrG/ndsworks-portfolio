import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import ResumeATS from './pages/ResumeATS';
import SiteDiagram from './pages/SiteDiagram';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import PostsManager from './pages/admin/PostsManager';
import PostEditor from './pages/admin/PostEditor';
import ResumeEditor from './pages/admin/ResumeEditor';
import ProjectsManager from './pages/admin/ProjectsManager';
import ResumeVariants from './pages/admin/ResumeVariants';

function PublicLayout() {
  return (
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
            <Route path="/resume/ats" element={<ResumeATS />} />
            <Route path="/site-diagram" element={<SiteDiagram />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/posts" element={<ProtectedRoute><PostsManager /></ProtectedRoute>} />
          <Route path="/admin/posts/new" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
          <Route path="/admin/posts/:id/edit" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
          <Route path="/admin/resume" element={<ProtectedRoute><ResumeEditor /></ProtectedRoute>} />
          <Route path="/admin/resume/variants" element={<ProtectedRoute><ResumeVariants /></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><ProjectsManager /></ProtectedRoute>} />
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
