export const professionalPhrases = [
  {
    trigger: ['geleitet', 'leitung', 'team geführt', 'geführt'],
    replacement: 'Leitung eines interdisziplinären Teams mit Budgetverantwortung',
  },
  {
    trigger: ['entwickelt', 'entwicklung', 'programmiert'],
    replacement: 'Konzeption und Entwicklung skalierbarer Softwarelösungen',
  },
  {
    trigger: ['optimiert', 'optimierung', 'verbessert'],
    replacement: 'Kontinuierliche Prozessoptimierung zur Effizienzsteigerung',
  },
  {
    trigger: ['analysiert', 'analyse'],
    replacement: 'Datenbasierte Analyse und Ableitung strategischer Handlungsempfehlungen',
  },
  {
    trigger: ['verkauft', 'verkauf', 'umsatz'],
    replacement: 'Umsatzsteigerung durch gezielte Vertriebsstrategien und Kundenbetreuung',
  },
  {
    trigger: ['koordiniert', 'koordination'],
    replacement: 'Schnittstellenkoordination zwischen internen und externen Partnern',
  },
  {
    trigger: ['präsentiert', 'präsentation'],
    replacement: 'Erstellung und Durchführung von Präsentationen vor Entscheidern',
  },
];

export function enhancePhrase(input) {
  const lower = input.toLowerCase();
  for (const phrase of professionalPhrases) {
    if (phrase.trigger.some(t => lower.includes(t))) {
      return phrase.replacement;
    }
  }
  // تحسين عام: صياغة قوية
  return 'Erfolgreiche Umsetzung von Projektzielen unter Einhaltung von Zeit- und Budgetvorgaben';
}
