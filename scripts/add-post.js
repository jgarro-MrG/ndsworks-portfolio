require('dotenv').config();
const { sequelize } = require('../lib/db.js');
const { Post } = require('../lib/models/post.model.js');

const newPost = {
  title: 'My Newest Blog Post',
  content: 'This is the content of my new blog post. I can write about new technologies I am learning or projects I am working on.',
  author: 'Jorge Garro',
};

async function addPost() {
  console.log('Adding new post...');
  try {
    // Using findOrCreate to prevent creating duplicate posts if the script is run multiple times
    const [post, created] = await Post.findOrCreate({
      where: { title: newPost.title },
      defaults: newPost,
    });

    if (created) {
      console.log(`✅ Post "${post.title}" created successfully.`);
    } else {
      console.log(`ℹ️ Post "${post.title}" already exists. No action taken.`);
    }
  } catch (error) {
    console.error('❌ Error adding new post:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

addPost();

