import React from 'react';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';

export default function BlogPage({ posts, onReadPost, language, t }) {
  const blog = t.blog || {};
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-royal-navy mb-8 flex items-center gap-2">
        <BookOpen className="h-8 w-8 text-royal-gold" />
        {blog.title || 'Blog'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => {
          const title = post.title[language] || post.title.de;
          const excerpt = post.excerpt[language] || post.excerpt.de;
          const category = post.category[language] || post.category.de;
          return (
            <button
              key={post.id}
              onClick={() => onReadPost(post)}
              className="text-left royal-card p-5 rounded-2xl hover:shadow-xl transition-all group"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-royal-navy/5 text-xs font-medium text-royal-gold mb-3">
                {category}
              </span>
              <h2 className="text-xl font-semibold text-royal-navy mb-2 group-hover:text-royal-gold transition-colors">
                {title}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-royal-gold">
                {blog.readMore || 'Weiterlesen'}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
