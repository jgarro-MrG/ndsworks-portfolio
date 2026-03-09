const express = require('express');
const path = require('path');

// Import your existing API handlers
const postsHandler = require('./api/posts.js');
const resumeHandler = require('./api/resume.js');
const resumeAtsHandler = require('./api/resume/ats.js');
const resumePdfHandler = require('./api/resume/pdf.js');
const projectsHandler = require('./api/projects.js');
const adminVariantsHandler = require('./api/admin/variants.js');
const adminVariantByIdHandler = require('./api/admin/variants/[id].js');

const app = express();
const PORT = process.env.PORT || 5000;
const buildPath = path.join(__dirname, 'client/build');

app.use(express.json());

// A simple wrapper to adapt Vercel-style handlers for Express
const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(err => {
    console.error(`Error in handler for ${req.originalUrl}:`, err);
    if (!res.headersSent) {
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

// API Routes
app.get('/api/posts', wrap(postsHandler));
app.get('/api/resume', wrap(resumeHandler));
app.get('/api/resume/ats', wrap(resumeAtsHandler));
app.get('/api/resume/pdf', wrap(resumePdfHandler));
app.get('/api/projects', wrap(projectsHandler));

// Admin variant routes
app.get('/api/admin/variants', wrap(adminVariantsHandler));
app.post('/api/admin/variants', wrap(adminVariantsHandler));
app.get('/api/admin/variants/:id', (req, res, next) => { req.query.id = req.params.id; return wrap(adminVariantByIdHandler)(req, res, next); });
app.put('/api/admin/variants/:id', (req, res, next) => { req.query.id = req.params.id; return wrap(adminVariantByIdHandler)(req, res, next); });
app.delete('/api/admin/variants/:id', (req, res, next) => { req.query.id = req.params.id; return wrap(adminVariantByIdHandler)(req, res, next); });

// --- Static File Serving ---
// Serve the static files from the React app build directory
app.use(express.static(buildPath));

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
