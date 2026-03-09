import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';

function PostsManager() {
  const [posts, setPosts] = useState([]);

  const load = () => axios.get('/api/admin/posts').then(r => setPosts(r.data));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await axios.delete(`/api/admin/posts/${id}`);
    load();
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link
          to="/admin/posts/new"
          className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-sm font-medium transition-colors"
        >
          New Post
        </Link>
      </div>
      <div className="space-y-2">
        {posts.map(post => (
          <div key={post.id} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium">{post.title}</p>
              <p className="text-sm text-slate-400">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/admin/posts/${post.id}/edit`}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-3 py-1 bg-red-800 hover:bg-red-700 rounded text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default PostsManager;
