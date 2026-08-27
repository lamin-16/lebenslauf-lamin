import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function SpellCheck({ cvData }) {
  // جمع كل النصوص من السيرة
  const allText = [
    cvData.summary,
    ...cvData.workExperience.map(e => `${e.role} ${e.company} ${e.bullets?.join(' ')}`),
    ...cvData.skills.map(s => s.name),
    ...cvData.languages.map(l => l.language),
    ...cvData.certifications.map(c => c.name),
    ...cvData.projects.map(p => p.description),
    ...cvData.volunteer.map(v => v.description),
    ...cvData.awards.map(a => a.description),
    ...cvData.references.map(r => `${r.name} ${r.position} ${r.contact}`),
  ].join(' ');

  const checkResults = [];
  // نستدعي دالة الفحص يدويًا هنا لتجنب مشاكل import
  const mistakes = [
    { pattern: /\bdass\b/gi, suggestion: 'dass korrekt verwendet?', type: 'grammar' },
    { pattern: /\bseit\b/gi, suggestion: 'seit/seid prüfen', type: 'grammar' },
    { pattern: /\bwider\b/gi, suggestion: 'wider/wieder prüfen', type: 'spelling' },
    { pattern: /\bgehte\b/gi, suggestion: 'geht (Rechtschreibung)', type: 'spelling' },
  ];

  for (const m of mistakes) {
    const matches = allText.match(m.pattern);
    if (matches && matches.length > 0) {
      checkResults.push({
        word: matches[0],
        suggestion: m.suggestion,
        count: matches.length,
        type: m.type,
      });
    }
  }

  if (checkResults.length === 0) return null;

  return (
    <div className="royal-card p-5 rounded-2xl space-y-3">
      <h3 className="font-semibold text-royal-navy flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
        Sprachprüfung
      </h3>
      <div className="space-y-2">
        {checkResults.map((res, idx) => (
          <div key={idx} className="flex items-start gap-2 text-sm">
            <span className="text-yellow-500 font-medium">"{res.word}"</span>
            <span className="text-gray-600">→ {res.suggestion}</span>
            <span className="text-xs text-gray-400">({res.count}x)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
