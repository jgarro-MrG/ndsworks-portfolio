const { verifyToken } = require('../../lib/auth.js');
const { Resume } = require('../../lib/models/resume.model.js');
const { Experience } = require('../../lib/models/experience.model.js');
const { Education } = require('../../lib/models/education.model.js');
const { Skill } = require('../../lib/models/skill.model.js');

module.exports = async function handler(req, res) {
  try {
    verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const resume = await Resume.findOne({
      include: [
        { model: Experience, as: 'experience' },
        { model: Education, as: 'education' },
        { model: Skill, as: 'skills' }
      ]
    });
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    return res.status(200).json(resume);
  }

  if (req.method === 'PUT') {
    const resume = await Resume.findOne();
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    const { name, title, title_es, summary, summary_es, contact } = req.body || {};
    await resume.update({ name, title, title_es, summary, summary_es, contact });
    return res.status(200).json(resume);
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
