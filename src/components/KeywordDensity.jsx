import React, { useMemo } from 'react';

export default function KeywordDensity({ cvData }) {
  const keywords = useMemo(() => {
    const text = [
      cvData.summary,
      ...cvData.workExperience.map(e => `${e.role} ${e.company} ${e.bullets?.join(' ')}`),
      ...cvData.skills.map(s => s.name),
      ...cvData.languages.map(l => l.language),
      ...cvData.certifications.map(c => c.name),
    ].join(' ').toLowerCase();

    // قائمة كلمات مفتاحية شائعة في السير الذاتية
    const commonWords = [
      'entwickelt', 'geleitet', 'optimiert', 'analysiert', 'team', 'projekt',
      'management', 'strategie', 'kommunikation', 'erfahrung', 'leiter',
      'verantwortlich', 'erfolgreich', 'umgesetzt', 'verbessert', 'erstellt',
    ];

    const density = commonWords.map(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = text.match(regex);
      return { word, count: matches ? matches.length : 0 };
    });

    return density.filter(d => d.count > 0).sort((a, b) => b.count - a.count).slice(0, 6);
  }, [cvData]);

  if (keywords.length === 0) return null;

  const maxCount = Math.max(...keywords.map(k => k.count));

  return (
    <div className="royal-card p-5 rounded-2xl">
      <h3 className="font-semibold text-royal-navy mb-4">Keyword-Häufigkeit</h3>
      <div className="space-y-3">
        {keywords.map((kw, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{kw.word}</span>
              <span className="text-royal-gold font-medium">{kw.count}x</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gold-gradient"
                style={{ width: `${(kw.count / maxCount) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
