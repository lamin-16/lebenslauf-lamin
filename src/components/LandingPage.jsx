import React from 'react';
import { FileText, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Globe2, LayoutTemplate } from 'lucide-react';
import FloatingCopyright from './FloatingCopyright';

const texts = {
  de: {
    heroTitle: 'Kostenloser tabellarischer Lebenslauf',
    heroSubtitle: 'Erstellen Sie in 3 Schritten einen professionellen Lebenslauf nach deutschen Standards.',
    cta: 'Lebenslauf erstellen',
    templatesTitle: 'Über 20 professionelle Vorlagen',
    templatesSubtitle: 'Klassisch, modern oder elegant – wählen Sie das Design, das zu Ihnen passt.',
    featuresTitle: 'Warum Lebenslauf LAMIN?',
    features: [
      { icon: ShieldCheck, title: 'ATS-geprüft', desc: 'Ihre Bewerbung wird von deutschen Personalabteilungen erkannt.' },
      { icon: Globe2, title: '3 Sprachen', desc: 'Deutsch, Englisch und Arabisch – alles in einer Oberfläche.' },
      { icon: LayoutTemplate, title: 'Live-Vorschau', desc: 'Sehen Sie sofort, wie Ihr Lebenslauf aussehen wird.' },
    ],
    footerNote: '© 2026 Mohamed Chadli. Alle Rechte vorbehalten.',
  },
  en: {
    heroTitle: 'Free Tabular CV',
    heroSubtitle: 'Create a professional CV according to German standards in 3 steps.',
    cta: 'Create CV',
    templatesTitle: 'Over 20 professional templates',
    templatesSubtitle: 'Classic, modern or elegant – choose the design that suits you.',
    featuresTitle: 'Why Lebenslauf LAMIN?',
    features: [
      { icon: ShieldCheck, title: 'ATS-checked', desc: 'Recognized by German HR departments.' },
      { icon: Globe2, title: '3 languages', desc: 'German, English and Arabic in one interface.' },
      { icon: LayoutTemplate, title: 'Live preview', desc: 'See immediately how your CV will look.' },
    ],
    footerNote: '© 2026 Mohamed Chadli. All rights reserved.',
  },
  ar: {
    heroTitle: 'سيرة ذاتية جدولية مجانية',
    heroSubtitle: 'أنشئ سيرة ذاتية احترافية وفق المعايير الألمانية في 3 خطوات.',
    cta: 'أنشئ السيرة الذاتية',
    templatesTitle: 'أكثر من 20 قالبًا احترافيًا',
    templatesSubtitle: 'كلاسيكي أو حديث أو أنيق – اختر التصميم الذي يناسبك.',
    featuresTitle: 'لماذا Lebenslauf LAMIN؟',
    features: [
      { icon: ShieldCheck, title: 'متوافق مع ATS', desc: 'تتعرف عليه أقسام الموارد البشرية الألمانية.' },
      { icon: Globe2, title: '3 لغات', desc: 'الألمانية والإنجليزية والعربية في واجهة واحدة.' },
      { icon: LayoutTemplate, title: 'معاينة حية', desc: 'شاهد فورًا كيف ستبدو سيرتك الذاتية.' },
    ],
    footerNote: '© 2026 محمد شاذلي. جميع الحقوق محفوظة.',
  },
};

export default function LandingPage({ language = 'de', onStart }) {
  const t = texts[language] || texts.de;
  const templateColors = ['#1e3a8a', '#0ea5e9', '#7c3aed', '#dc2626', '#f59e0b', '#059669'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-navy via-royal-navy/95 to-royal-navy/90 text-white relative overflow-hidden">
      {/* زخارف خلفية */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-royal-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-royal-gold/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-royal-gold/30 px-4 py-2 rounded-full text-sm mb-6">
            <Sparkles className="h-4 w-4 text-royal-gold" />
            <span className="text-royal-goldLight">Kostenlos & ohne Anmeldung</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
          <button
            onClick={onStart}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-royal-gold to-royal-goldLight text-royal-navy font-bold py-4 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-2xl"
          >
            {t.cta}
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Template preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">{t.templatesTitle}</h2>
          <p className="text-center text-gray-300 mb-8">{t.templatesSubtitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {templateColors.map((color, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors">
                <div className="h-24 rounded-lg mb-3" style={{ backgroundColor: color }}></div>
                <div className="h-2 bg-white/30 rounded w-2/3 mb-1"></div>
                <div className="h-2 bg-white/20 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t.featuresTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors">
                  <div className="w-14 h-14 bg-royal-gold/20 rounded-xl flex items-center justify-center text-royal-gold mx-auto mb-4">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA ثانية */}
        <div className="text-center">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-3 bg-white text-royal-navy font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-all"
          >
            <FileText className="h-5 w-5" />
            {t.cta}
          </button>
        </div>

        <footer className="mt-16 text-center text-sm text-gray-400 border-t border-white/10 pt-6">
          {t.footerNote}
        </footer>
      </div>
          <FloatingCopyright language={language} />
    </div>
  );
}
