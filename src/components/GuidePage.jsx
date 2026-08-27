import React from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function GuidePage({ t, onBack }) {
  const g = t.guide;
  const sections = g.sections;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button onClick={onBack} className="flex items-center gap-2 text-royal-navy hover:text-royal-gold transition-colors mb-8 no-print">
        <ArrowLeft className="h-5 w-5" />
        <span className="font-medium">{g.backToEditor}</span>
      </button>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-royal-navy mb-4">{g.title}</h1>
        <p className="text-lg text-gray-600">{g.subtitle}</p>
      </div>

      <div className="royal-card p-6 rounded-2xl mb-10">
        <p className="text-gray-700 leading-relaxed">{g.intro}</p>
      </div>

      <div className="space-y-8">
        {Object.entries(sections).map(([key, section]) => (
          <div key={key} className="royal-card p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-royal-navy mb-4">{section.title}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
            <div className="space-y-2">
              {section.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-royal-gold mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="royal-card p-6 rounded-2xl mt-10 text-center">
        <p className="text-gray-700">{g.conclusion}</p>
      </div>
    </div>
  );
}
