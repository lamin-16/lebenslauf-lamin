import React from 'react';
import { Mail, Phone, MapPin, Link2, Code2, Calendar, MapPinned } from 'lucide-react';
import { templateList } from '../data/templates';
import { defaultSectionOrder } from '../data/defaults';

export default function CVPreview({ cvData, customization, t, sectionVisibility = {}, sectionOrder = defaultSectionOrder }) {
  const { personalInfo, summary, workExperience, education, skills, languages, certifications, projects, volunteer, awards, interests, references } = cvData;
  const { template, color, font, photoPosition, fontSize, lineSpacing } = customization;

  const currentTemplate = templateList.find(t => t.id === template) || templateList[0];
  const accentColor = currentTemplate.accentColor || color;
  const bgColor = currentTemplate.bgColor || '#ffffff';
  const isTwoColumn = currentTemplate.layout === 'two';
  const isSidebar = currentTemplate.layout === 'sidebar';
  const isCenterHeader = currentTemplate.headerStyle === 'center';
  const isCompact = currentTemplate.spacing === 'compact';
  const isMinimal = currentTemplate.spacing === 'minimal';
  const isTimeline = currentTemplate.timelineStyle;
  const isDark = currentTemplate.darkMode;
  const sidebarColor = currentTemplate.sidebarColor || '#f1f5f9';
  const hideLines = currentTemplate.hideLines;

  const textColor = isDark ? '#e5e7eb' : '#1e293b';
  const mutedColor = isDark ? '#9ca3af' : '#475569';
  const headingColor = isDark ? '#ffffff' : '#0f172a';
  const vis = sectionVisibility;

  const containerStyle = {
    fontFamily: font,
    fontSize: `${fontSize}px`,
    lineHeight: lineSpacing,
    color: textColor,
    backgroundColor: bgColor,
    width: '210mm',
    minHeight: '297mm',
    margin: '0 auto',
    padding: isCompact ? '8mm' : isMinimal ? '10mm' : '15mm',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    border: `1px solid ${isDark ? accentColor : accentColor + '30'}`,
  };

  const sectionTitleStyle = {
    color: accentColor,
    borderBottom: hideLines || isMinimal ? 'none' : `2px solid ${accentColor}`,
    paddingBottom: hideLines || isMinimal ? '0' : '4px',
    marginBottom: isMinimal ? '6px' : '12px',
    marginTop: isCompact || isMinimal ? '8px' : '18px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    fontSize: '1.1em',
  };

  const renderPersonalInfo = () => {
    const infoItems = [];
    if (personalInfo.email) infoItems.push({ icon: <Mail className="h-4 w-4" />, text: personalInfo.email });
    if (personalInfo.phone) infoItems.push({ icon: <Phone className="h-4 w-4" />, text: personalInfo.phone });
    if (personalInfo.address) infoItems.push({ icon: <MapPin className="h-4 w-4" />, text: personalInfo.address });
    if (personalInfo.linkedin) infoItems.push({ icon: <Link2 className="h-4 w-4" />, text: personalInfo.linkedin });
    if (personalInfo.github) infoItems.push({ icon: <Code2 className="h-4 w-4" />, text: personalInfo.github });
    if (personalInfo.dateOfBirth) infoItems.push({ icon: <Calendar className="h-4 w-4" />, text: personalInfo.dateOfBirth });
    if (personalInfo.placeOfBirth) infoItems.push({ icon: <MapPinned className="h-4 w-4" />, text: personalInfo.placeOfBirth });

    return (
      <div className={`flex flex-wrap gap-3 text-sm ${isCenterHeader ? 'justify-center' : ''}`} style={{ color: mutedColor }}>
        {infoItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span style={{ color: accentColor }}>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderPhoto = (position) => {
    if (photoPosition === 'none' || !personalInfo.photo) return null;
    const imgStyle = {
      width: isTwoColumn ? '100px' : '120px',
      height: isTwoColumn ? '130px' : '150px',
      objectFit: 'cover',
      borderRadius: currentTemplate.photoShape === 'circle' ? '50%' : currentTemplate.photoShape === 'rounded' ? '16px' : '4px',
      border: `2px solid ${accentColor}`,
    };
    if (position === 'top') {
      return (
        <div className={`flex ${isCenterHeader ? 'justify-center' : 'justify-start'} mb-4`}>
          <img src={personalInfo.photo} style={imgStyle} alt="Profile" />
        </div>
      );
    }
    if (position === 'left' || position === 'right') {
      return (
        <img src={personalInfo.photo} style={{ ...imgStyle, float: position, margin: position === 'left' ? '0 20px 10px 0' : '0 0 10px 20px' }} alt="Profile" />
      );
    }
    return null;
  };

  const renderSkillsByCategory = () => {
    const categories = {};
    skills.forEach(skill => {
      if (!categories[skill.category]) categories[skill.category] = [];
      categories[skill.category].push(skill);
    });
    return Object.entries(categories).map(([category, items]) => (
      <div key={category} className="mb-2">
        <span className="font-medium" style={{ color: accentColor }}>{category}: </span>
        <span style={{ color: textColor }}>{items.map(s => s.name).join(', ')}</span>
      </div>
    ));
  };

  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;
    return (
      <section>
        <h3 style={sectionTitleStyle}>{t.preview.projects}</h3>
        {projects.map((proj, idx) => (
          <div key={idx} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-base" style={{ color: headingColor }}>{proj.name}</h4>
                {proj.link && <p className="text-sm" style={{ color: accentColor }}>{proj.link}</p>}
                {proj.description && <p className="text-sm mt-1" style={{ color: mutedColor }}>{proj.description}</p>}
              </div>
              <div className="text-sm" style={{ color: mutedColor }}>
                {proj.startDate && proj.endDate ? `${proj.startDate} - ${proj.endDate}` : ''}
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  };

  const renderVolunteer = () => {
    if (!volunteer || volunteer.length === 0) return null;
    return (
      <section>
        <h3 style={sectionTitleStyle}>{t.preview.volunteer}</h3>
        {volunteer.map((vol, idx) => (
          <div key={idx} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-base" style={{ color: headingColor }}>{vol.role}</h4>
                <p className="text-sm font-medium" style={{ color: accentColor }}>{vol.organization}</p>
                {vol.description && <p className="text-sm mt-1" style={{ color: mutedColor }}>{vol.description}</p>}
              </div>
              <div className="text-sm" style={{ color: mutedColor }}>
                {vol.startDate && vol.endDate ? `${vol.startDate} - ${vol.endDate}` : ''}
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  };

  const renderAwards = () => {
    if (!awards || awards.length === 0) return null;
    return (
      <section>
        <h3 style={sectionTitleStyle}>{t.preview.awards}</h3>
        {awards.map((aw, idx) => (
          <div key={idx} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-base" style={{ color: headingColor }}>{aw.title}</h4>
                <p className="text-sm font-medium" style={{ color: accentColor }}>{aw.issuer}</p>
                {aw.description && <p className="text-sm mt-1" style={{ color: mutedColor }}>{aw.description}</p>}
              </div>
              {aw.date && <span className="text-sm" style={{ color: mutedColor }}>{aw.date}</span>}
            </div>
          </div>
        ))}
      </section>
    );
  };

  const renderInterests = () => {
    if (!interests || interests.length === 0) return null;
    return (
      <section>
        <h3 style={sectionTitleStyle}>{t.preview.interests}</h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((int, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: accentColor + '20', color: accentColor }}>
              {int.name}
            </span>
          ))}
        </div>
      </section>
    );
  };

  const renderReferences = () => {
    if (!references || references.length === 0) return null;
    return (
      <section>
        <h3 style={sectionTitleStyle}>{t.preview.references}</h3>
        <div className="space-y-2">
          {references.map((ref, idx) => (
            <div key={idx} className="text-sm">
              <p className="font-semibold" style={{ color: headingColor }}>{ref.name}</p>
              <p style={{ color: mutedColor }}>{ref.position}, {ref.company}</p>
              {ref.contact && <p style={{ color: accentColor }}>{ref.contact}</p>}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const sectionComponents = {
    summary: summary && vis.summary !== false ? (<section><h3 style={sectionTitleStyle}>{t.preview.professionalSummary}</h3><p className="text-sm" style={{ color: textColor }}>{summary}</p></section>) : null,
    workExperience: workExperience.length > 0 && vis.workExperience !== false ? (<section><h3 style={sectionTitleStyle}>{t.preview.workExperience}</h3>{workExperience.map((exp, idx) => (<div key={idx} className="mb-4"><div className="flex justify-between items-start"><div><h4 className="font-semibold text-base" style={{ color: headingColor }}>{exp.role}</h4><p className="text-sm font-medium" style={{ color: accentColor }}>{exp.company}</p>{exp.location && <p className="text-xs" style={{ color: mutedColor }}>{exp.location}</p>}</div><div className="text-right text-sm" style={{ color: mutedColor }}>{exp.startDate} - {exp.endDate}</div></div>{exp.bullets && exp.bullets.filter(b => b.trim() !== '').length > 0 && (<ul className="mt-1 list-disc list-inside text-sm space-y-1" style={{ color: textColor }}>{exp.bullets.filter(b => b.trim() !== '').map((bullet, i) => <li key={i}>{bullet}</li>)}</ul>)}</div>))}</section>) : null,
    education: education.length > 0 && vis.education !== false ? (<section><h3 style={sectionTitleStyle}>{t.preview.education}</h3>{education.map((edu, idx) => (<div key={idx} className="mb-3"><div className="flex justify-between items-start"><div><h4 className="font-semibold text-base" style={{ color: headingColor }}>{edu.degree}</h4><p className="text-sm font-medium" style={{ color: accentColor }}>{edu.institution}</p>{edu.location && <p className="text-xs" style={{ color: mutedColor }}>{edu.location}</p>}</div><div className="text-sm" style={{ color: mutedColor }}>{edu.startDate} - {edu.endDate}</div></div></div>))}</section>) : null,
    skills: skills.length > 0 && vis.skills !== false ? (<section><h3 style={sectionTitleStyle}>{t.preview.skills}</h3><div className="text-sm">{renderSkillsByCategory()}</div></section>) : null,
    languages: languages.length > 0 && vis.languages !== false ? (<section><h3 style={sectionTitleStyle}>{t.preview.languages}</h3><div className="grid grid-cols-2 gap-2 text-sm">{languages.map((lang, idx) => (<div key={idx} className="flex justify-between"><span>{lang.language}</span><span style={{ color: mutedColor }}>{lang.level}</span></div>))}</div></section>) : null,
    certifications: certifications.length > 0 && vis.certifications !== false ? (<section><h3 style={sectionTitleStyle}>{t.preview.certifications}</h3><div className="space-y-1 text-sm">{certifications.map((cert, idx) => (<div key={idx} className="flex justify-between"><span>{cert.name}</span><span style={{ color: mutedColor }}>{cert.date}</span></div>))}</div></section>) : null,
    projects: projects && projects.length > 0 && vis.projects !== false ? renderProjects() : null,
    volunteer: volunteer && volunteer.length > 0 && vis.volunteer !== false ? renderVolunteer() : null,
    awards: awards && awards.length > 0 && vis.awards !== false ? renderAwards() : null,
    interests: interests && interests.length > 0 && vis.interests !== false ? renderInterests() : null,
    references: references && references.length > 0 && vis.references !== false ? renderReferences() : null,
  };

  // Sidebar layout
  if (isSidebar) {
    return (
      <div id="cv-print-area" style={containerStyle}>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 p-4" style={{ backgroundColor: sidebarColor, borderRadius: '8px' }}>
            {renderPhoto('left')}
            <div className="mt-4">
              <h1 className="text-2xl font-bold mb-1" style={{ color: accentColor }}>{personalInfo.fullName}</h1>
              <p className="text-sm mb-3" style={{ color: mutedColor }}>{t.preview.title}</p>
              <div className="space-y-2 text-sm" style={{ color: mutedColor }}>
                {personalInfo.email && <div className="flex items-center gap-2"><Mail className="h-4 w-4" style={{ color: accentColor }} />{personalInfo.email}</div>}
                {personalInfo.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4" style={{ color: accentColor }} />{personalInfo.phone}</div>}
                {personalInfo.address && <div className="flex items-center gap-2"><MapPin className="h-4 w-4" style={{ color: accentColor }} />{personalInfo.address}</div>}
                {personalInfo.linkedin && <div className="flex items-center gap-2"><Link2 className="h-4 w-4" style={{ color: accentColor }} />{personalInfo.linkedin}</div>}
                {personalInfo.github && <div className="flex items-center gap-2"><Code2 className="h-4 w-4" style={{ color: accentColor }} />{personalInfo.github}</div>}
              </div>
            </div>
            {skills.length > 0 && vis.skills !== false && (<section className="mt-4"><h3 style={sectionTitleStyle}>{t.preview.skills}</h3>{renderSkillsByCategory()}</section>)}
            {languages.length > 0 && vis.languages !== false && (<section className="mt-4"><h3 style={sectionTitleStyle}>{t.preview.languages}</h3><div className="space-y-1 text-sm">{languages.map((lang, idx) => (<div key={idx} className="flex justify-between"><span>{lang.language}</span><span style={{ color: mutedColor }}>{lang.level}</span></div>))}</div></section>)}
          </div>
          <div className="col-span-2">
            {sectionOrder.map(key => sectionComponents[key]).filter(Boolean)}
          </div>
        </div>
      </div>
    );
  }

  // Two Column layout
  if (isTwoColumn) {
    return (
      <div id="cv-print-area" style={containerStyle}>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 space-y-6">
            {renderPhoto('left')}
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{ color: accentColor }}>{personalInfo.fullName}</h1>
              <p className="text-sm mb-3" style={{ color: mutedColor }}>{t.preview.title}</p>
              <div className="space-y-2 text-sm" style={{ color: mutedColor }}>
                {personalInfo.email && <div className="flex items-center gap-2"><Mail className="h-4 w-4" style={{ color: accentColor }} />{personalInfo.email}</div>}
                {personalInfo.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4" style={{ color: accentColor }} />{personalInfo.phone}</div>}
                {personalInfo.address && <div className="flex items-center gap-2"><MapPin className="h-4 w-4" style={{ color: accentColor }} />{personalInfo.address}</div>}
                {personalInfo.linkedin && <div className="flex items-center gap-2"><Link2 className="h-4 w-4" style={{ color: accentColor }} />{personalInfo.linkedin}</div>}
                {personalInfo.github && <div className="flex items-center gap-2"><Code2 className="h-4 w-4" style={{ color: accentColor }} />{personalInfo.github}</div>}
              </div>
            </div>
            {skills.length > 0 && vis.skills !== false && (<section><h3 style={sectionTitleStyle}>{t.preview.skills}</h3>{renderSkillsByCategory()}</section>)}
            {languages.length > 0 && vis.languages !== false && (<section><h3 style={sectionTitleStyle}>{t.preview.languages}</h3><div className="space-y-1 text-sm">{languages.map((lang, idx) => (<div key={idx} className="flex justify-between"><span>{lang.language}</span><span style={{ color: mutedColor }}>{lang.level}</span></div>))}</div></section>)}
          </div>
          <div className="col-span-2">
            {sectionOrder.map(key => sectionComponents[key]).filter(Boolean)}
          </div>
        </div>
      </div>
    );
  }

  // Single Column layout
  return (
    <div id="cv-print-area" style={containerStyle}>
      <div className={`mb-4 ${isCenterHeader ? 'text-center' : ''}`} style={{ display: 'flex', flexDirection: photoPosition === 'top' ? 'column' : 'row', alignItems: photoPosition === 'top' ? 'center' : 'flex-start', gap: '20px' }}>
        {photoPosition === 'left' && renderPhoto('left')}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-1" style={{ color: accentColor }}>{personalInfo.fullName}</h1>
          <p className="text-base mb-2" style={{ color: mutedColor }}>{t.preview.title}</p>
          {renderPersonalInfo()}
        </div>
        {photoPosition === 'right' && renderPhoto('right')}
      </div>
      {photoPosition === 'top' && renderPhoto('top')}
      {sectionOrder.map(key => sectionComponents[key]).filter(Boolean)}
    </div>
  );
}
