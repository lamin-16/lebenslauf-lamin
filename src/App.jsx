import React, { useState, useEffect, useCallback } from 'react';
import { translations, languages } from './i18n';
import { defaultCVData, defaultCustomization, defaultSectionVisibility, defaultSectionOrder } from './data/defaults';
import { sampleProfiles } from './data/samples';
import { blogPosts } from './data/blogPosts';
import FormBuilder from './components/FormBuilder';
import CVPreview from './preview/CVPreview';
import CustomizationPanel from './components/CustomizationPanel';
import ATSAssistant from './components/ATSAssistant';
import ProgressBar from './components/ProgressBar';
import Navbar from './components/Navbar';
import FeatureShowcase from './components/FeatureShowcase';
import SpellCheck from './components/SpellCheck';
import KeywordDensity from './components/KeywordDensity';
import SectionVisibility from './components/SectionVisibility';
import SectionOrder from './components/SectionOrder';
import ShareModal from './components/ShareModal';
import { ZoomIn, ZoomOut, RotateCcw, Printer, Trash2, Sparkles, Share2, Columns, ArrowLeft } from 'lucide-react';
import { lazy, Suspense } from 'react';
import AdBanner from './components/AdBanner';
import BlogPage from './components/BlogPage';
import BlogPostView from './components/BlogPostView';
import LandingPage from './components/LandingPage';

const GuidePage = lazy(() => import('./components/GuidePage'));
const HelpMap = lazy(() => import('./components/HelpMap'));

export default function App() {
  const [language, setLanguage] = useState('de');
  const [cvData, setCvData] = useState(defaultCVData);
  const [customization, setCustomization] = useState(defaultCustomization);
  const [sectionVisibility, setSectionVisibility] = useState(defaultSectionVisibility);
  const [sectionOrder, setSectionOrder] = useState(defaultSectionOrder);
  const [activeSection, setActiveSection] = useState('personal');
  const [zoom, setZoom] = useState(0.85);
  const [darkMode, setDarkMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showGuide, setShowGuide] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [compareMode, setCompareMode] = useState(false);
  const [formMode, setFormMode] = useState('wizard');
  const [showLanding, setShowLanding] = useState(true);

  const t = translations[language];
  const dir = languages.find(l => l.code === language)?.dir || 'ltr';

  useEffect(() => {
    // تنظيف البيانات التالفة من localStorage
    try {
      const storedCv = localStorage.getItem('cvData');
      if (storedCv) {
        const parsed = JSON.parse(storedCv);
        if (!parsed || typeof parsed !== 'object' || !parsed.personalInfo) {
          localStorage.removeItem('cvData');
        }
      }
      const storedCustom = localStorage.getItem('customization');
      if (storedCustom) {
        const parsed = JSON.parse(storedCustom);
        if (!parsed || typeof parsed !== 'object' || !parsed.template) {
          localStorage.removeItem('customization');
        }
      }
    } catch (e) {
      localStorage.clear();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
    localStorage.setItem('customization', JSON.stringify(customization));
    showToastMessage('Gespeichert');
  }, [cvData, customization]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('cv');
    if (encoded) {
      try {
        const decoded = decodeURIComponent(escape(atob(encoded)));
        const data = JSON.parse(decoded);
        if (data.cvData) setCvData(data.cvData);
        if (data.customization) setCustomization(data.customization);
      } catch (e) {
        console.error('Ungültiger Link');
      }
    }
  }, []);

  const showToastMessage = useCallback((msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, []);

  const updateField = useCallback((section, id, field, value) => {
    setCvData(prev => {
      const newData = { ...prev };
      if (section === 'personalInfo') newData.personalInfo = { ...newData.personalInfo, [field]: value };
      else if (section === 'summary') newData.summary = value;
      else if (['workExperience', 'education', 'skills', 'languages', 'certifications', 'projects', 'volunteer', 'awards', 'interests', 'references'].includes(section)) {
        newData[section] = newData[section].map(item => {
          if (item.id === id) return { ...item, [field]: value };
          return item;
        });
      }
      return newData;
    });
  }, []);

  const addItem = useCallback((section, item) => setCvData(prev => ({ ...prev, [section]: [...prev[section], item] })), []);
  const removeItem = useCallback((section, id) => setCvData(prev => ({ ...prev, [section]: prev[section].filter(item => item.id !== id) })), []);
  const updateBullet = useCallback((section, id, bulletIndex, value) => {
    setCvData(prev => {
      const updated = prev[section].map(item => {
        if (item.id === id) {
          const bullets = [...item.bullets];
          bullets[bulletIndex] = value;
          return { ...item, bullets };
        }
        return item;
      });
      return { ...prev, [section]: updated };
    });
  }, []);
  const addBullet = useCallback((section, id) => setCvData(prev => ({
    ...prev,
    [section]: prev[section].map(item => item.id === id ? { ...item, bullets: [...item.bullets, ''] } : item),
  })), []);
  const removeBullet = useCallback((section, id, bulletIndex) => setCvData(prev => ({
    ...prev,
    [section]: prev[section].map(item => item.id === id ? { ...item, bullets: item.bullets.filter((_, i) => i !== bulletIndex) } : item),
  })), []);

  const reorderSections = useCallback((newOrder) => setSectionOrder(newOrder), []);
  const toggleSectionVisibility = useCallback((key) => setSectionVisibility(prev => ({ ...prev, [key]: !prev[key] })), []);

  const zoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4));
  const resetZoom = () => setZoom(0.85);

  const handleExport = () => {
    const dataStr = JSON.stringify({ cvData, customization, sectionOrder }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lebenslauf-daten.json';
    a.click();
    URL.revokeObjectURL(url);
    showToastMessage('Exportiert');
  };

  const handleWordExport = () => {
    const content = generateRTF(cvData, customization, t);
    if (!content || content.length < 20) {
      showToastMessage('Keine Daten zum Exportieren');
      return;
    }
    const blob = new Blob([content], { type: 'application/rtf;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lebenslauf.rtf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToastMessage('Word exportiert');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.cvData) setCvData(data.cvData);
            if (data.customization) setCustomization(data.customization);
            if (data.sectionOrder) setSectionOrder(data.sectionOrder);
            showToastMessage('Daten importiert');
          } catch (err) {
            showToastMessage('Ungültige Datei');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleReset = () => {
    if (confirm('Alle Daten zurücksetzen?')) {
      setCvData(defaultCVData);
      setCustomization(defaultCustomization);
      setSectionVisibility(defaultSectionVisibility);
      setSectionOrder(defaultSectionOrder);
      showToastMessage('Zurückgesetzt');
    }
  };

  const handleQuickDraft = () => {
    const randomIndex = Math.floor(Math.random() * sampleProfiles.length);
    const profile = sampleProfiles[randomIndex];
    const merged = {
      ...defaultCVData,
      ...profile,
      personalInfo: { ...defaultCVData.personalInfo, ...profile.personalInfo },
      workExperience: profile.workExperience?.length ? profile.workExperience : defaultCVData.workExperience,
      education: profile.education?.length ? profile.education : defaultCVData.education,
      skills: profile.skills?.length ? profile.skills : defaultCVData.skills,
      languages: profile.languages?.length ? profile.languages : defaultCVData.languages,
      certifications: profile.certifications?.length ? profile.certifications : defaultCVData.certifications,
      projects: profile.projects?.length ? profile.projects : [],
      volunteer: profile.volunteer?.length ? profile.volunteer : [],
      awards: profile.awards?.length ? profile.awards : [],
      interests: profile.interests?.length ? profile.interests : [],
      references: profile.references?.length ? profile.references : [],
    };
    setCvData(merged);
    showToastMessage('Schnellentwurf geladen');
  };

  const handleShare = () => {
    const data = JSON.stringify({ cvData, customization, sectionOrder });
    const encoded = btoa(unescape(encodeURIComponent(data)));
    setShareUrl(`${window.location.origin}${window.location.pathname}?cv=${encoded}`);
    setShowShare(true);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  if (showLanding) {
    return (
      <div dir={dir} className="min-h-screen font-sans">
        <LandingPage language={language} onStart={() => setShowLanding(false)} />
      </div>
    );
  }

  return (
    <div dir={dir} className={`min-h-screen ${darkMode ? 'bg-royal-navy text-white' : 'bg-gray-100 text-gray-900'} font-sans transition-colors`}>
      <Navbar language={language} setLanguage={setLanguage} onPrint={() => window.print()} t={t} darkMode={darkMode} onShowGuide={() => { setShowGuide(true); setShowBlog(false); setCurrentPost(null); }} onNavigate={() => { setShowGuide(false); setShowBlog(false); setCurrentPost(null); }} onShowBlog={() => { setShowBlog(true); setShowGuide(false); setCurrentPost(null); }} />

      {showBlog && !currentPost ? (
        <BlogPage posts={blogPosts} onReadPost={(post) => setCurrentPost(post)} language={language} t={t} />
      ) : showBlog && currentPost ? (
        <BlogPostView post={currentPost} onBack={() => setCurrentPost(null)} language={language} t={t} />
      ) : showGuide ? (
        <Suspense fallback={<div>Lädt...</div>}>
          <GuidePage t={t} onBack={() => setShowGuide(false)} />
        </Suspense>
      ) : (
        <>
          <main id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6 no-print">
              <button onClick={handleQuickDraft} className="w-full flex items-center justify-center gap-2 bg-royal-navy/10 hover:bg-royal-navy/20 text-royal-navy font-medium py-2 px-4 rounded-lg transition-colors">
                <Sparkles className="h-5 w-5 text-royal-gold" />
                Schnellentwurf
              </button>
              <button onClick={handleShare} className="w-full flex items-center justify-center gap-2 bg-royal-navy/10 hover:bg-royal-navy/20 text-royal-navy font-medium py-2 px-4 rounded-lg transition-colors">
                <Share2 className="h-5 w-5 text-royal-gold" />
                Teilen
              </button>
              <AdBanner type="sidebar" />
              <div id="ats"><ATSAssistant cvData={cvData} customization={customization} t={t} darkMode={darkMode} /></div>
              <ProgressBar cvData={cvData} darkMode={darkMode} />
              <CustomizationPanel customization={customization} setCustomization={setCustomization} t={t} darkMode={darkMode} />
              <SectionVisibility visibility={sectionVisibility} toggleSection={toggleSectionVisibility} t={t} />
              <SectionOrder order={sectionOrder} onReorder={reorderSections} t={t} />
              <FeatureShowcase
                onToggleDark={() => setDarkMode(!darkMode)}
                onFullscreen={toggleFullscreen}
                onExport={handleExport}
                onImport={handleImport}
                onWordExport={handleWordExport}
                darkMode={darkMode}
              />
              <SpellCheck cvData={cvData} />
              <KeywordDensity cvData={cvData} />
              <Suspense fallback={<div>Lädt...</div>}><HelpMap /></Suspense>
              <button onClick={() => { setShowBlog(false); setCurrentPost(null); }} className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors mb-2">
                <ArrowLeft className="h-5 w-5" />
                Zurück zum Editor
              </button>
              <button onClick={handleReset} className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-4 rounded-lg transition-colors">
                <Trash2 className="h-5 w-5" />
                Zurücksetzen
              </button>
              <FormBuilder
                t={t}
                cvData={cvData}
                customization={customization}
                updateField={updateField}
                addItem={addItem}
                removeItem={removeItem}
                updateBullet={updateBullet}
                addBullet={addBullet}
                removeBullet={removeBullet}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                darkMode={darkMode}
                formMode={formMode}
                setFormMode={setFormMode}
              />
            </div>

            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4 no-print">
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-royal-navy'}`}>Vorschau</h2>
                <div className="flex items-center gap-2">
                  <button onClick={zoomOut} className="p-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50" title="Verkleinern"><ZoomOut className="h-4 w-4" /></button>
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-600'} w-12 text-center`}>{Math.round(zoom * 100)}%</span>
                  <button onClick={zoomIn} className="p-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50" title="Vergrößern"><ZoomIn className="h-4 w-4" /></button>
                  <button onClick={resetZoom} className="p-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50" title="Zurücksetzen"><RotateCcw className="h-4 w-4" /></button>
                  <button onClick={() => setCompareMode(!compareMode)} className="ml-2 p-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50" title="Vergleichsmodus">
                    <Columns className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="preview-scroll" style={{ overflow: 'auto', maxHeight: '80vh', border: '1px solid #e5e7eb', borderRadius: '12px', backgroundColor: darkMode ? '#1e2a5e' : '#f9fafb' }}>
                <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.2s ease', width: 'fit-content', margin: '0 auto' }}>
                  {compareMode ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div><CVPreview cvData={cvData} customization={customization} t={t} sectionVisibility={sectionVisibility} sectionOrder={sectionOrder} /></div>
                      <div><CVPreview cvData={cvData} customization={{ ...customization, template: 'classic' }} t={t} sectionVisibility={sectionVisibility} sectionOrder={sectionOrder} /></div>
                    </div>
                  ) : (
                    <CVPreview cvData={cvData} customization={customization} t={t} sectionVisibility={sectionVisibility} sectionOrder={sectionOrder} />
                  )}
                </div>
              </div>
            </div>
          </main>

          <AdBanner type="footer" />
          <footer id="tips" className={`${darkMode ? 'bg-royal-navy border-t border-white/10 text-gray-300' : 'bg-white border-t border-gray-200 text-gray-500'} py-4 text-center text-sm no-print`}>
            {t.footer}
          </footer>

          <button onClick={() => window.print()} className="fixed bottom-6 right-6 z-50 flex items-center gap-2 btn-gold px-5 py-3 rounded-full shadow-2xl no-print">
            <Printer className="h-5 w-5" />
            <span className="font-semibold">{t.preview.downloadPDF}</span>
          </button>

          {showToast && <div className="toast-message">{toastMessage}</div>}
          {showShare && <ShareModal shareUrl={shareUrl} onClose={() => setShowShare(false)} />}

          <div className="print-only" style={{ display: 'none' }}>
            <CVPreview cvData={cvData} customization={customization} t={t} sectionVisibility={sectionVisibility} sectionOrder={sectionOrder} />
          </div>
        </>
      )}
    </div>
  );
}

function generateRTF(cvData, customization, t) {
  if (!cvData || !cvData.personalInfo) return '';
  const { personalInfo, summary, workExperience, education, skills, languages, certifications, projects, volunteer, awards, interests, references } = cvData;
  const title = t.preview.title;
  const sections = t.preview;
  const esc = (str) => {
    if (!str) return '';
    return String(str).replace(/\\/g, '\\\\').replace(/\{/g, '\{').replace(/}/g, '\}').replace(/\n/g, '\line ');
  };
  const rtf = ['{\\rtf1\\ansi\\deff0'];
  rtf.push('{\\fonttbl{\\f0 Arial;}}');
  rtf.push('\\f0\\fs24');
  rtf.push(`{\\b\\fs32 ${esc(personalInfo.fullName || '')}}`);
  rtf.push('\\line');
  rtf.push(`${esc(title)}`);
  rtf.push('\\line');
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.address].filter(Boolean).join(' | ');
  if (contacts) rtf.push(`${esc(contacts)}\\line`);
  if (personalInfo.linkedin) rtf.push(`LinkedIn: ${esc(personalInfo.linkedin)}\\line`);
  if (personalInfo.github) rtf.push(`GitHub: ${esc(personalInfo.github)}\\line`);
  rtf.push('\\line');

  const addSection = (heading, lines) => {
    if (!heading || lines.length === 0) return;
    rtf.push(`{\\b\\fs28 ${esc(heading)}}`);
    rtf.push('\\line');
    lines.forEach(line => { rtf.push(`${esc(line)}\\line`); });
    rtf.push('\\line');
  };

  if (summary && summary.trim()) addSection(sections.professionalSummary, [summary]);

  if (workExperience && workExperience.length > 0) {
    const lines = [];
    workExperience.forEach(exp => {
      lines.push(`${exp.role || ''} – ${exp.company || ''} (${exp.startDate || ''} - ${exp.endDate || ''})`);
      if (exp.location) lines.push(`Ort: ${exp.location}`);
      if (exp.bullets && exp.bullets.length) exp.bullets.forEach(b => lines.push(`- ${b}`));
      lines.push('');
    });
    addSection(sections.workExperience, lines);
  }

  if (education && education.length > 0) {
    const lines = [];
    education.forEach(edu => {
      lines.push(`${edu.degree || ''} – ${edu.institution || ''} (${edu.startDate || ''} - ${edu.endDate || ''})`);
      if (edu.location) lines.push(`Ort: ${edu.location}`);
      lines.push('');
    });
    addSection(sections.education, lines);
  }

  if (skills && skills.length > 0) {
    const cats = {};
    skills.forEach(skill => {
      if (!cats[skill.category]) cats[skill.category] = [];
      cats[skill.category].push(skill.name);
    });
    const lines = Object.entries(cats).map(([cat, names]) => `${cat}: ${names.join(', ')}`);
    addSection(sections.skills, lines);
  }

  if (languages && languages.length > 0) {
    const lines = languages.map(lang => `${lang.language} – ${lang.level}`);
    addSection(sections.languages, lines);
  }

  if (certifications && certifications.length > 0) {
    const lines = certifications.map(cert => `${cert.name} (${cert.date})`);
    addSection(sections.certifications, lines);
  }

  if (projects && projects.length > 0) {
    const lines = [];
    projects.forEach(proj => {
      lines.push(`${proj.name || ''} (${proj.startDate || ''} - ${proj.endDate || ''})`);
      if (proj.link) lines.push(`Link: ${proj.link}`);
      if (proj.description) lines.push(proj.description);
      lines.push('');
    });
    addSection(sections.projects, lines);
  }

  if (volunteer && volunteer.length > 0) {
    const lines = [];
    volunteer.forEach(vol => {
      lines.push(`${vol.role || ''} – ${vol.organization || ''} (${vol.startDate || ''} - ${vol.endDate || ''})`);
      if (vol.description) lines.push(vol.description);
      lines.push('');
    });
    addSection(sections.volunteer, lines);
  }

  if (awards && awards.length > 0) {
    const lines = [];
    awards.forEach(award => {
      lines.push(`${award.title || ''} – ${award.issuer || ''} (${award.date || ''})`);
      if (award.description) lines.push(award.description);
      lines.push('');
    });
    addSection(sections.awards, lines);
  }

  if (interests && interests.length > 0) {
    const lines = [interests.map(i => i.name).join(', ')];
    addSection(sections.interests, lines);
  }

  if (references && references.length > 0) {
    const lines = [];
    references.forEach(ref => {
      lines.push(`${ref.name || ''}, ${ref.position || ''}, ${ref.company || ''}`);
      if (ref.contact) lines.push(`Kontakt: ${ref.contact}`);
      lines.push('');
    });
    addSection(sections.references, lines);
  }

  rtf.push('}');
  return rtf.join('\\n');
}
