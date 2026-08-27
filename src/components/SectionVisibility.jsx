import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SectionVisibility({ visibility, toggleSection, t }) {
  const sections = [
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
    <div className="royal-card p-5 rounded-2xl space-y-3">
      <h3 className="font-semibold text-lg text-royal-navy">Sichtbarkeit</h3>
      <p className="text-xs text-gray-500">Abschnitte ein- oder ausblenden</p>
      <div className="space-y-2">
        {sections.map(section => (
          <button
            key={section.key}
            onClick={() => toggleSection(section.key)}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-royal-navy/5 transition-colors"
          >
            <span className="text-sm text-gray-700">{section.label}</span>
            {visibility[section.key] ? (
              <Eye className="h-4 w-4 text-green-600" />
            ) : (
              <EyeOff className="h-4 w-4 text-gray-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
