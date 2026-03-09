const { verifyToken } = require('../../lib/auth.js');
const { Education } = require('../../lib/models/education.model.js');
const { Resume } = require('../../lib/models/resume.model.js');

module.exports = async function handler(req, res) {
  try {
    verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const resume = await Resume.findOne();
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    const { institution, degree, degree_es, period, notes, notes_es } = req.body || {};
    const edu = await Education.create({ institution, degree, degree_es, period, notes, notes_es, resumeId: resume.id });
    return res.status(201).json(edu);
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
