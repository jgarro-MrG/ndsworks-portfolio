const { verifyToken } = require('../../lib/auth.js');
const { Experience } = require('../../lib/models/experience.model.js');

module.exports = async function handler(req, res) {
  try {
    verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const exp = await Experience.findByPk(id);
  if (!exp) return res.status(404).json({ error: 'Experience not found' });

  if (req.method === 'PUT') {
    const { role, role_es, company, location, period, details, details_es } = req.body || {};
    await exp.update({ role, role_es, company, location, period, details, details_es });
    return res.status(200).json(exp);
  }

  if (req.method === 'DELETE') {
    await exp.destroy();
    return res.status(204).end();
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
