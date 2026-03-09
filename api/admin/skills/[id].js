const { verifyToken } = require('../../../lib/auth.js');
const { Skill } = require('../../../lib/models/skill.model.js');

module.exports = async function handler(req, res) {
  try {
    verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const skill = await Skill.findByPk(id);
  if (!skill) return res.status(404).json({ error: 'Skill not found' });

  if (req.method === 'PUT') {
    const { category, details, details_es } = req.body || {};
    await skill.update({ category, details, details_es });
    return res.status(200).json(skill);
  }

  if (req.method === 'DELETE') {
    await skill.destroy();
    return res.status(204).end();
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
