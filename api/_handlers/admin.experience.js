const { verifyToken } = require('../../lib/auth.js');
const { Experience } = require('../../lib/models/experience.model.js');
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
    const { role, role_es, company, location, period, details, details_es } = req.body || {};
    const exp = await Experience.create({ role, role_es, company, location, period, details, details_es, resumeId: resume.id });
    return res.status(201).json(exp);
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
