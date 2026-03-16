import React from 'react';
import { useTranslation } from 'react-i18next';
import useFetchData from '../hooks/useFetchData';

function Blog() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('es') ? 'es' : undefined;
  const { data: posts, loading, error } = useFetchData('/api/posts/', lang);

  if (loading) return <div className="text-center p-10">{t('common.loading')}</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!posts) return null;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-slate-900">{t('blog.heading')}</h1>
      <div className="space-y-10">
        {posts.map(post => (
          <article key={post.id}>
            <h2 className="text-2xl font-bold text-slate-800">{post.title}</h2>
            <p className="text-sm text-slate-500 mt-1 mb-4">
              {t('blog.byLine', { author: post.author, date: new Date(post.createdAt).toLocaleString() })}
            </p>
            <div className="prose max-w-none text-slate-700 whitespace-pre-wrap">{post.content}</div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog;
