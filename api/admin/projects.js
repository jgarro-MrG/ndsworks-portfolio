const { verifyToken } = require('../../lib/auth.js');
const { ProjectConfig } = require('../../lib/models/projectConfig.model.js');

module.exports = async function handler(req, res) {
  try {
    verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const projects = await ProjectConfig.findAll({ order: [['displayOrder', 'ASC']] });
    return res.status(200).json(projects);
  }

  if (req.method === 'POST') {
    const { repoName, imageUrl, active, displayOrder } = req.body || {};
    if (!repoName) return res.status(400).json({ error: 'repoName is required' });
    const project = await ProjectConfig.create({ repoName, imageUrl, active: active !== false, displayOrder: displayOrder || 0 });
    return res.status(201).json(project);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
