import React, { useState } from 'react';
import { FileText, Globe, Printer, Menu, X, ChevronDown, BookOpen, Home, Layout, Gauge, Lightbulb } from 'lucide-react';
import { languages } from '../i18n';

export default function Navbar({ language, setLanguage, onPrint, t, darkMode, onShowGuide, onNavigate, onShowBlog }) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentLang = languages.find(l => l.code === language);

  const handleGuideClick = (e) => {
    e.preventDefault();
    onShowGuide();
    setIsMobileMenuOpen(false);
  };

  const handleBlogClick = (e) => {
    e.preventDefault();
    onShowBlog();
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (e, item) => {
    if (item.blog) {
      handleBlogClick(e);
    } else if (item.guide) {
      handleGuideClick(e);
    } else {
      e.preventDefault();
      onNavigate();
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'Guide', href: '#guide', guide: true, icon: BookOpen },
    { label: 'Blog', href: '#blog', blog: true, icon: BookOpen },
    { label: 'Vorlagen', href: '#templates', icon: Layout },
    { label: 'ATS-Check', href: '#ats', icon: Gauge },
    { label: 'Tipps', href: '#tips', icon: Lightbulb },
  ];

  return (
    <nav className="glass sticky top-0 z-30 no-print shadow-royal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-royal-gradient flex items-center justify-center shadow-glow">
              <FileText className="h-5 w-5 text-royal-gold" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-royal-navy leading-tight">{t.appTitle}</h1>
              <p className="text-xs text-gray-500 hidden sm:block">{t.appSubtitle}</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-sm font-medium text-gray-700 hover:text-royal-gold transition-colors relative group flex items-center gap-1.5"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-royal-gold transition-all group-hover:w-full"></span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:border-royal-gold transition-colors"
              >
                <Globe className="h-4 w-4 text-royal-navy" />
                <span className="hidden sm:inline">{currentLang?.label}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === lang.code ? 'text-royal-gold font-semibold' : 'text-gray-700'}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onPrint}
              className="inline-flex items-center gap-2 btn-gold py-2 px-4 rounded-lg text-sm shadow-royal"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">{t.preview.downloadPDF}</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 text-royal-navy" /> : <Menu className="h-6 w-6 text-royal-navy" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="flex items-center gap-3 py-3 text-sm font-medium text-gray-700 hover:text-royal-gold transition-colors border-b border-gray-50 last:border-b-0"
              >
                <Icon className="h-5 w-5 text-royal-navy" />
                {item.label}
              </a>
            );
          })}
          <button
            onClick={onPrint}
            className="w-full flex items-center justify-center gap-2 btn-gold font-medium py-3 rounded-lg mt-3"
          >
            <Printer className="h-4 w-4" />
            {t.preview.downloadPDF}
          </button>
        </div>
      )}
    </nav>
  );
}
