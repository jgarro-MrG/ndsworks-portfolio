// client/src/pages/Blog.js
import React from 'react';
import useFetchData from '../hooks/useFetchData';

function Blog() {
  const { data: posts, loading, error } = useFetchData('/api/posts/');

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!posts) return null;

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