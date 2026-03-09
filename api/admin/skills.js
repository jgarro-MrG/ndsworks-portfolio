const { verifyToken } = require('../../lib/auth.js');
const { Skill } = require('../../lib/models/skill.model.js');
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
    const { category, details, details_es } = req.body || {};
    const skill = await Skill.create({ category, details, details_es, resumeId: resume.id });
    return res.status(201).json(skill);
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
