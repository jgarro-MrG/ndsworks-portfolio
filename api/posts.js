const { Post } = require('../lib/models/post.model.js');

// The exported function is the handler
module.exports = async function handler(request, response) {
  // You can check the HTTP method to handle different request types
  if (request.method === 'GET') {
    try {
      // Use findAll() to get all post entries, ordered by creation date descending
      const posts = await Post.findAll({
        order: [['createdAt', 'DESC']],
      });
      response.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      response.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else {
    // If any other HTTP method is used, return a 405 Method Not Allowed error
    response.setHeader('Allow', ['GET']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
