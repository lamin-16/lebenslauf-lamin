import React from 'react';
import { FileText, ArrowRight, CheckCircle2, Globe2, LayoutTemplate } from 'lucide-react';
import AdBanner from './AdBanner';

const content = {
  de: {
    title: 'Kostenloser tabellarischer Lebenslauf',
    subtitle: 'In 3 Schritten zu einem professionellen Lebenslauf nach deutschem Standard.',
    cta: 'Lebenslauf erstellen',
    feature1: 'Über 20 Vorlagen',
    feature2: 'Live-Vorschau',
    feature3: 'Deutsch, Englisch, Arabisch',
  },
  en: {
    title: 'Free Tabular CV',
    subtitle: 'Create a professional CV according to German standards in 3 steps.',
    cta: 'Create CV',
    feature1: 'Over 20 templates',
    feature2: 'Live preview',
    feature3: 'German, English, Arabic',
  },
  ar: {
    title: 'سيرة ذاتية جدولية مجانية',
    subtitle: 'أنشئ سيرة ذاتية احترافية وفق المعايير الألمانية في 3 خطوات.',
    cta: 'أنشئ السيرة الذاتية',
    feature1: 'أكثر من 20 قالبًا',
    feature2: 'معاينة حية',
    feature3: 'الألمانية، الإنجليزية، العربية',
  },
};

export default function LandingPage({ language = 'de', onStart }) {
  const t = content[language] || content.de;
  return (
    <div className="min-h-screen bg-gradient-to-b from-royal-navy to-royal-navy/95 flex flex-col items-center justify-center px-4 py-10 text-white relative overflow-hidden">
      {/* زخرفة خفيفة */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-royal-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-royal-gold/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-3xl w-full text-center">
        {/* شعار صغير */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-royal-gold/20 flex items-center justify-center">
            <FileText className="h-5 w-5 text-royal-gold" />
          </div>
          <span className="text-lg font-bold text-royal-goldLight tracking-wide">Lebenslauf LAMIN</span>
        </div>

        {/* العنوان */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          {t.title}
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
          {t.subtitle}
        </p>

        {/* زر رئيسي */}
        <button
          onClick={onStart}
          className="group inline-flex items-center gap-3 bg-royal-gold hover:bg-royal-goldLight text-royal-navy font-bold py-4 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-2xl"
        >
          {t.cta}
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* مميزات صغيرة */}
        <div className="flex flex-wrap justify-center gap-4 mt-10 text-sm text-gray-300">
          <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <CheckCircle2 className="h-4 w-4 text-royal-gold" /> {t.feature1}
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <LayoutTemplate className="h-4 w-4 text-royal-gold" /> {t.feature2}
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <Globe2 className="h-4 w-4 text-royal-gold" /> {t.feature3}
          </span>
        </div>

        {/* إعلان واحد في الأعلى فقط */}
        <div className="mt-12 max-w-[320px] mx-auto">
          <AdBanner type="top" />
        </div>
      </div>
    </div>
  );
}
