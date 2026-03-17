const { verifyToken } = require('../../lib/auth.js');
const { ResumeVariant } = require('../../lib/models/resumeVariant.model.js');

module.exports = async function handler(req, res) {
  try {
    verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const variant = await ResumeVariant.findByPk(id);
  if (!variant) return res.status(404).json({ error: 'Variant not found' });

  if (req.method === 'GET') {
    return res.status(200).json(variant);
  }

  if (req.method === 'PUT') {
    const { name, targetRole, targetCompany, customSummary, customSummary_es, config } = req.body || {};
    await variant.update({ name, targetRole, targetCompany, customSummary, customSummary_es, config });
    return res.status(200).json(variant);
  }

  if (req.method === 'DELETE') {
    await variant.destroy();
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
