const { verifyToken } = require('../../lib/auth.js');
const { ResumeVariant } = require('../../lib/models/resumeVariant.model.js');

module.exports = async function handler(req, res) {
  try {
    verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const variants = await ResumeVariant.findAll({ order: [['createdAt', 'DESC']] });
    return res.status(200).json(variants);
  }

  if (req.method === 'POST') {
    const { name, targetRole, customSummary, customSummary_es, config } = req.body || {};
    if (!name) return res.status(400).json({ error: 'name is required' });
    const variant = await ResumeVariant.create({ name, targetRole, customSummary, customSummary_es, config: config || {} });
    return res.status(201).json(variant);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
