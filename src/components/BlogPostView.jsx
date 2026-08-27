import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export default function BlogPostView({ post, onBack, language, t }) {
  const blog = t.blog || {};
  const title = post.title[language] || post.title.de;
  const content = post.content[language] || post.content.de;
  const category = post.category[language] || post.category.de;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-royal-navy hover:text-royal-gold transition-colors mb-6 no-print"
      >
        <ArrowLeft className="h-5 w-5" />
        {blog.back || 'Zurück zum Blog'}
      </button>

      <article className="royal-card p-6 rounded-2xl">
        <span className="inline-block px-3 py-1 rounded-full bg-royal-navy/5 text-xs font-medium text-royal-gold mb-3">
          {category}
        </span>
        <h1 className="text-3xl font-bold text-royal-navy mb-4">{title}</h1>
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </span>
        </div>
        <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
          {content}
        </div>
      </article>
    </div>
  );
}
