export const commonMistakes = [
  { pattern: /\bdas\b/gi, correct: 'dass (wenn es eine Konjunktion ist)', type: 'grammar' },
  { pattern: /\bseit\b/gi, correct: 'seid (wenn es 2. Person Plural ist)', type: 'grammar' },
  { pattern: /\bwider\b/gi, correct: 'wieder (wenn es "erneut" bedeutet)', type: 'spelling' },
  { pattern: /\bihr\b/gi, correct: 'ihren (Possessivpronomen)', type: 'grammar' },
  { pattern: /\bihnen\b/gi, correct: 'Ihnen (Höflichkeitsform)', type: 'capitalization' },
  { pattern: /\bschreibt\b/gi, correct: 'schreiben (Infinitiv)', type: 'conjugation' },
  { pattern: /\bgehte\b/gi, correct: 'geht', type: 'spelling' },
  { pattern: /\bwürde\b/gi, correct: 'wurde (Vergangenheit)', type: 'tense' },
  { pattern: /\bdenn\b/gi, correct: 'den (Artikel)', type: 'grammar' },
  { pattern: /\bals\b/gi, correct: 'wie (Vergleich)', type: 'comparison' },
];

export function checkText(text) {
  if (!text) return [];
  const results = [];
  for (const mistake of commonMistakes) {
    const matches = text.match(mistake.pattern);
    if (matches && matches.length > 0) {
      results.push({
        word: matches[0],
        suggestion: mistake.correct,
        type: mistake.type,
        count: matches.length,
      });
    }
  }
  return results;
}
