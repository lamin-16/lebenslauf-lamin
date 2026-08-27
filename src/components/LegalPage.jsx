import React from 'react';
import { ArrowLeft, FileText, ShieldCheck } from 'lucide-react';

export default function LegalPage({ type, language, onBack }) {
  const data = legalContent?.[type]?.[language] || legalContent?.[type]?.de;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-royal-navy hover:text-royal-gold transition-colors mb-6 no-print"
      >
        <ArrowLeft className="h-5 w-5" />
        Zurück
      </button>

      <div className="royal-card p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          {type === 'privacy' ? (
            <ShieldCheck className="h-8 w-8 text-royal-gold" />
          ) : (
            <FileText className="h-8 w-8 text-royal-gold" />
          )}
          <h1 className="text-3xl font-bold text-royal-navy">{data.title}</h1>
        </div>
        <p className="text-sm text-gray-500 mb-6">{data.updated}</p>
        <div className="space-y-6">
          {data.sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-lg font-semibold text-royal-navy mb-2">{section.heading}</h2>
              <p className="text-gray-700 whitespace-pre-line">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
