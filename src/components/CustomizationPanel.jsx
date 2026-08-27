import React from 'react';
import { Palette, Layout, Image as ImageIcon, Type } from 'lucide-react';
import { templateList } from '../data/templates';

export default function CustomizationPanel({ customization, setCustomization, t }) {
  const handleChange = (field, value) => setCustomization(prev => ({ ...prev, [field]: value }));
  const handleTitleChange = (key, value) => {
    setCustomization(prev => ({
      ...prev,
      sectionTitles: { ...prev.sectionTitles, [key]: value },
    }));
  };

  const titleFields = [
    { key: 'summary', label: t.preview.professionalSummary },
    { key: 'workExperience', label: t.preview.workExperience },
    { key: 'education', label: t.preview.education },
    { key: 'skills', label: t.preview.skills },
    { key: 'languages', label: t.preview.languages },
    { key: 'certifications', label: t.preview.certifications },
    { key: 'projects', label: t.preview.projects },
    { key: 'volunteer', label: t.preview.volunteer },
    { key: 'awards', label: t.preview.awards },
    { key: 'interests', label: t.preview.interests },
    { key: 'references', label: t.preview.references },
  ];

  return (
    <div className="royal-card p-5 rounded-2xl space-y-6">
      <h3 className="font-semibold text-lg text-royal-navy flex items-center gap-2">
        <Palette className="h-5 w-5 text-royal-gold" />
        {t.form.customization}
      </h3>

      {/* اختيار القالب */}
      <div>
        <label className="block text-sm font-medium text-royal-navy mb-3 flex items-center gap-2">
          <Layout className="h-4 w-4 text-royal-gold" />
          {t.preview.chooseTemplate}
        </label>
        <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
          {templateList.map(template => (
            <button
              key={template.id}
              onClick={() => handleChange('template', template.id)}
              className={`relative p-2 rounded-xl border-2 text-left transition-all group ${customization.template === template.id ? 'border-royal-gold bg-royal-navy/5 ring-2 ring-royal-gold/30' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <div className="w-full h-20 rounded-lg mb-2 overflow-hidden" style={{ backgroundColor: template.bgColor || '#ffffff' }}>
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: template.accentColor }}></div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-700 rounded w-2/3 mb-1"></div>
                      <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="h-1.5 bg-gray-300 rounded w-full"></div>
                    <div className="h-1.5 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium text-royal-navy">{template.name}</p>
              <p className="text-xs text-gray-500">{template.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* اللون */}
      <div>
        <label className="block text-sm font-medium text-royal-navy mb-2">{t.preview.color}</label>
        <div className="flex items-center gap-3">
          <input type="color" value={customization.color} onChange={(e) => handleChange('color', e.target.value)} className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer" />
          <span className="text-sm text-gray-600">{customization.color}</span>
        </div>
      </div>

      {/* موضع الصورة */}
      <div>
        <label className="block text-sm font-medium text-royal-navy mb-2 flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-royal-gold" />
          {t.preview.photoPosition}
        </label>
        <div className="grid grid-cols-4 gap-2">
          {['left', 'right', 'top', 'none'].map(pos => (
            <button key={pos} onClick={() => handleChange('photoPosition', pos)} className={`p-2 rounded-lg border text-xs font-medium transition-all ${customization.photoPosition === pos ? 'bg-royal-gold text-royal-navy border-royal-gold' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
              {t.preview[pos]}
            </button>
          ))}
        </div>
      </div>

      {/* الخط */}
      <div>
        <label className="block text-sm font-medium text-royal-navy mb-2">{t.preview.font}</label>
        <select value={customization.font} onChange={(e) => handleChange('font', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal-gold">
          <option value="Inter">Inter</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>

      {/* حجم الخط */}
      <div>
        <label className="block text-sm font-medium text-royal-navy mb-2">{t.preview.font} (px)</label>
        <input type="range" min="10" max="16" value={customization.fontSize} onChange={(e) => handleChange('fontSize', parseInt(e.target.value))} className="w-full" />
        <span className="text-xs text-gray-500">{customization.fontSize}px</span>
      </div>

      {/* تحكم بعناوين الأقسام */}
      <div>
        <h4 className="font-semibold text-sm text-royal-navy flex items-center gap-2 mb-3">
          <Type className="h-4 w-4 text-royal-gold" />
          Abschnittstitel
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {titleFields.map(field => (
            <div key={field.key} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-24 truncate">{field.label}</span>
              <input
                type="text"
                value={customization.sectionTitles?.[field.key] || ''}
                onChange={(e) => handleTitleChange(field.key, e.target.value)}
                className="flex-1 p-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-royal-gold"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
