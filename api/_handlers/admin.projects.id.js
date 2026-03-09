const { verifyToken } = require('../../lib/auth.js');
const { ProjectConfig } = require('../../lib/models/projectConfig.model.js');

module.exports = async function handler(req, res) {
  try {
    verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const project = await ProjectConfig.findByPk(id);
  if (!project) return res.status(404).json({ error: 'Project not found' });

  if (req.method === 'PUT') {
    const { repoName, imageUrl, active, displayOrder } = req.body || {};
    await project.update({ repoName, imageUrl, active, displayOrder });
    return res.status(200).json(project);
  }

  if (req.method === 'DELETE') {
    await project.destroy();
    return res.status(204).end();
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
