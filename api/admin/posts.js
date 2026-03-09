const { verifyToken } = require('../../lib/auth.js');
const { Post } = require('../../lib/models/post.model.js');

module.exports = async function handler(req, res) {
  try {
    verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const { title, content, title_es, content_es, author } = req.body || {};
    if (!title || !content) return res.status(400).json({ error: 'title and content are required' });
    const post = await Post.create({ title, content, title_es, content_es, author: author || 'Jorge Garro' });
    return res.status(201).json(post);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
