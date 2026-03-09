const { verifyToken } = require('../../../lib/auth.js');
const { Post } = require('../../../lib/models/post.model.js');

module.exports = async function handler(req, res) {
  try {
    verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const post = await Post.findByPk(id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  if (req.method === 'PUT') {
    const { title, content, title_es, content_es } = req.body || {};
    await post.update({ title, content, title_es, content_es });
    return res.status(200).json(post);
  }

  if (req.method === 'DELETE') {
    await post.destroy();
    return res.status(204).end();
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
