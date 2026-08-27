import React, { useMemo } from 'react';

export default function ProgressBar({ cvData }) {
  const completion = useMemo(() => {
    let filled = 0;
    let total = 0;
    const check = (value) => {
      total++;
      if (value && value.toString().trim().length > 0) filled++;
    };
    check(cvData.personalInfo.fullName);
    check(cvData.personalInfo.email);
    check(cvData.personalInfo.phone);
    check(cvData.personalInfo.address);
    check(cvData.summary);
    if (cvData.workExperience.length > 0) filled++, total++;
    if (cvData.education.length > 0) filled++, total++;
    if (cvData.skills.length > 0) filled++, total++;
    if (cvData.languages.length > 0) filled++, total++;
    if (cvData.certifications.length > 0) filled++, total++;
    if (cvData.projects.length > 0) filled++, total++;
    if (cvData.volunteer.length > 0) filled++, total++;
    if (cvData.awards.length > 0) filled++, total++;
    if (cvData.interests.length > 0) filled++, total++;
    if (cvData.references.length > 0) filled++, total++;
    return Math.round((filled / total) * 100);
  }, [cvData]);

  return (
    <div className="royal-card p-4 rounded-2xl animate-glow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-royal-navy">Vollständigkeit</span>
        <span className="text-sm font-bold text-royal-gold">{completion}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full bg-gold-gradient transition-all duration-700"
          style={{ width: `${completion}%` }}
        ></div>
      </div>
    </div>
  );
}
