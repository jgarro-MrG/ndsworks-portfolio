const express = require('express');

// public
const postsHandler       = require('./_handlers/posts.js');
const projectsHandler    = require('./_handlers/projects.js');
const resumeHandler      = require('./_handlers/resume.js');
const resumeAtsHandler   = require('./_handlers/resume.ats.js');
const resumePdfHandler   = require('./_handlers/resume.pdf.js');

// admin auth
const adminLoginHandler   = require('./_handlers/admin.login.js');
const adminLogoutHandler  = require('./_handlers/admin.logout.js');
const adminMeHandler      = require('./_handlers/admin.me.js');

// admin CRUD
const adminResumeHandler  = require('./_handlers/admin.resume.js');
const adminPostsHandler        = require('./_handlers/admin.posts.js');
const adminPostByIdHandler     = require('./_handlers/admin.posts.id.js');
const adminProjectsHandler     = require('./_handlers/admin.projects.js');
const adminProjectByIdHandler  = require('./_handlers/admin.projects.id.js');
const adminExpHandler          = require('./_handlers/admin.experience.js');
const adminExpByIdHandler      = require('./_handlers/admin.experience.id.js');
const adminEduHandler          = require('./_handlers/admin.education.js');
const adminEduByIdHandler      = require('./_handlers/admin.education.id.js');
const adminSkillsHandler       = require('./_handlers/admin.skills.js');
const adminSkillByIdHandler    = require('./_handlers/admin.skills.id.js');
const adminVariantsHandler     = require('./_handlers/admin.variants.js');
const adminVariantByIdHandler  = require('./_handlers/admin.variants.id.js');
const adminAiGenerateVariantHandler = require('./_handlers/admin.ai.generate-variant.js');

const app = express();
app.use(express.json());

const wrap = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(err => {
    console.error(`Error in handler for ${req.originalUrl}:`, err);
    if (!res.headersSent) res.status(500).json({ error: 'An internal server error occurred.' });
  });

const withId = handler => (req, res, next) => {
  req.query.id = req.params.id;
  return wrap(handler)(req, res, next);
};

// Public routes
app.get('/api/posts',        wrap(postsHandler));
app.get('/api/resume',       wrap(resumeHandler));
app.get('/api/resume/ats',   wrap(resumeAtsHandler));
app.get('/api/resume/pdf',   wrap(resumePdfHandler));
app.get('/api/projects',     wrap(projectsHandler));

// Admin auth
app.post('/api/admin/login',   wrap(adminLoginHandler));
app.post('/api/admin/logout',  wrap(adminLogoutHandler));
app.get('/api/admin/me',       wrap(adminMeHandler));

// Admin resume
app.get('/api/admin/resume',   wrap(adminResumeHandler));
app.put('/api/admin/resume',   wrap(adminResumeHandler));

// Admin posts
app.get('/api/admin/posts',          wrap(adminPostsHandler));
app.post('/api/admin/posts',         wrap(adminPostsHandler));
app.put('/api/admin/posts/:id',      withId(adminPostByIdHandler));
app.delete('/api/admin/posts/:id',   withId(adminPostByIdHandler));

// Admin projects
app.get('/api/admin/projects',         wrap(adminProjectsHandler));
app.post('/api/admin/projects',        wrap(adminProjectsHandler));
app.put('/api/admin/projects/:id',     withId(adminProjectByIdHandler));
app.delete('/api/admin/projects/:id',  withId(adminProjectByIdHandler));

// Admin experience
app.post('/api/admin/experience',        wrap(adminExpHandler));
app.put('/api/admin/experience/:id',     withId(adminExpByIdHandler));
app.delete('/api/admin/experience/:id',  withId(adminExpByIdHandler));

// Admin education
app.post('/api/admin/education',        wrap(adminEduHandler));
app.put('/api/admin/education/:id',     withId(adminEduByIdHandler));
app.delete('/api/admin/education/:id',  withId(adminEduByIdHandler));

// Admin skills
app.post('/api/admin/skills',        wrap(adminSkillsHandler));
app.put('/api/admin/skills/:id',     withId(adminSkillByIdHandler));
app.delete('/api/admin/skills/:id',  withId(adminSkillByIdHandler));

// Admin variants
app.get('/api/admin/variants',         wrap(adminVariantsHandler));
app.post('/api/admin/variants',        wrap(adminVariantsHandler));
app.get('/api/admin/variants/:id',     withId(adminVariantByIdHandler));
app.put('/api/admin/variants/:id',     withId(adminVariantByIdHandler));
app.delete('/api/admin/variants/:id',  withId(adminVariantByIdHandler));

// Admin AI
app.post('/api/admin/ai/generate-variant', wrap(adminAiGenerateVariantHandler));

module.exports = app;
