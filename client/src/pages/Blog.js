import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts/')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log("Error fetching blog posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-8">
        {posts.map(post => (
          <div key={post._id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-4">By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;