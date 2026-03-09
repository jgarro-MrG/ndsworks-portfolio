const { verifyToken } = require('../../../lib/auth.js');
const { Education } = require('../../../lib/models/education.model.js');

module.exports = async function handler(req, res) {
  try {
    verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const edu = await Education.findByPk(id);
  if (!edu) return res.status(404).json({ error: 'Education not found' });

  if (req.method === 'PUT') {
    const { institution, degree, degree_es, period, notes, notes_es } = req.body || {};
    await edu.update({ institution, degree, degree_es, period, notes, notes_es });
    return res.status(200).json(edu);
  }

  if (req.method === 'DELETE') {
    await edu.destroy();
    return res.status(204).end();
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
