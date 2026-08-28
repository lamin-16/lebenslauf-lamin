import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export default function BlogPostView({ post, onBack, language, t, onBackToEditor }) {
  const blog = t.blog || {};
  const title = post.title[language] || post.title.de;
  const content = post.content[language] || post.content.de;
  const category = post.category[language] || post.category.de;

  const renderContent = () => {
    const blocks = content.split('\n').filter(line => line.trim() !== '');
    return blocks.map((block, index) => {
      if (block.trim().startsWith('**') && block.trim().endsWith('**')) {
        const heading = block.replace(/\*\*/g, '');
        return (
          <h2 key={index} className="text-xl font-semibold text-royal-navy mt-6 mb-3">
            {heading}
          </h2>
        );
      }
      if (block.trim().startsWith('- ')) {
        const item = block.replace('- ', '');
        return (
          <div key={index} className="flex items-start gap-2 ml-4 mb-2">
            <span className="text-royal-gold font-bold mt-0.5">•</span>
            <span className="text-gray-700">{item.replace(/\*\*/g, '')}</span>
          </div>
        );
      }
      return (
        <p key={index} className="text-gray-700 mb-4 leading-relaxed">
          {block.replace(/\*\*/g, '')}
        </p>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-royal-navy hover:text-royal-gold transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          {blog.back || 'Zurück zum Blog'}
        </button>
        <button
          onClick={onBackToEditor}
          className="flex items-center gap-2 text-gray-500 hover:text-royal-gold transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          {blog.backToEditor || 'Zurück zum Editor'}
        </button>
      </div>

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
        <div className="text-gray-700">
          {renderContent()}
        </div>
      </article>
    </div>
  );
}
