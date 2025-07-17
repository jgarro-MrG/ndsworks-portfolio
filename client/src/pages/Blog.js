// client/src/pages/Blog.js
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

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-slate-900">Blog</h1>
      <div className="space-y-10">
        {posts.map(post => (
          <article key={post._id}>
            <h2 className="text-2xl font-bold text-slate-800">{post.title}</h2>
            <p className="text-sm text-slate-500 mt-1 mb-4">By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
            <div className="prose max-w-none text-slate-700 whitespace-pre-wrap">{post.content}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
export default Blog;