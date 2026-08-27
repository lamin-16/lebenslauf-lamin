import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';

export default function SectionOrder({ order, onReorder, t }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  const handleDragStart = (index) => setDragIndex(index);
  const handleDragOver = (e, index) => {
    e.preventDefault();
    setOverIndex(index);
  };
  const handleDrop = (index) => {
    if (dragIndex === null || dragIndex === index) return;
    const newOrder = [...order];
    const [moved] = newOrder.splice(dragIndex, 1);
    newOrder.splice(index, 0, moved);
    onReorder(newOrder);
    setDragIndex(null);
    setOverIndex(null);
  };

  const sectionLabels = {
    summary: t.preview.professionalSummary,
    workExperience: t.preview.workExperience,
    education: t.preview.education,
    skills: t.preview.skills,
    languages: t.preview.languages,
    certifications: t.preview.certifications,
    projects: t.preview.projects,
    volunteer: t.preview.volunteer,
    awards: t.preview.awards,
    interests: t.preview.interests,
    references: t.preview.references,
  };

  return (
    <div className="royal-card p-5 rounded-2xl space-y-2">
      <h3 className="font-semibold text-royal-navy mb-3">Abschnittsreihenfolge</h3>
      <p className="text-xs text-gray-500 mb-2">Ziehen Sie die Abschnitte, um die Reihenfolge zu ändern.</p>
      <div className="space-y-1">
        {order.map((key, index) => (
          <div
            key={key}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            className={`flex items-center gap-2 p-2 rounded-lg cursor-move transition-all ${
              overIndex === index ? 'bg-royal-navy/10 border-t-2 border-royal-gold' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-700">{sectionLabels[key] || key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
