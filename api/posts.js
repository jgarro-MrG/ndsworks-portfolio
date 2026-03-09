const { Post } = require('../lib/models/post.model.js');

module.exports = async function handler(request, response) {
  if (request.method === 'GET') {
    try {
      const lang = request.query.lang === 'es' ? 'es' : 'en';
      const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
      const result = posts.map(p => {
        const d = p.toJSON();
        if (lang === 'es') {
          if (d.title_es) d.title = d.title_es;
          if (d.content_es) d.content = d.content_es;
        }
        return d;
      });
      response.status(200).json(result);
    } catch (error) {
      console.error('Error fetching posts:', error);
      response.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else {
    response.setHeader('Allow', ['GET']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
};
