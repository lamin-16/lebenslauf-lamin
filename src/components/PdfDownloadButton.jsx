import React, { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.vfs;

export default function PdfDownloadButton({ cvData, customization, sectionVisibility, sectionOrder, t }) {
  const [loading, setLoading] = useState(false);

  const buildContent = () => {
    const content = [];

    content.push({ text: cvData.personalInfo?.fullName || '', style: 'header' });
    content.push({ text: t.preview.title || 'Lebenslauf', style: 'subheader' });

    const contactLines = [];
    if (cvData.personalInfo?.email) contactLines.push(cvData.personalInfo.email);
    if (cvData.personalInfo?.phone) contactLines.push(cvData.personalInfo.phone);
    if (cvData.personalInfo?.address) contactLines.push(cvData.personalInfo.address);
    if (contactLines.length) {
      content.push({ text: contactLines.join(' | '), style: 'contact' });
    }

    const sectionRenderers = {
      summary: () => {
        if (cvData.summary && sectionVisibility.summary !== false) {
          content.push({ text: t.preview.professionalSummary, style: 'sectionTitle' });
          content.push({ text: cvData.summary, style: 'body' });
        }
      },
      workExperience: () => {
        if (cvData.workExperience?.length && sectionVisibility.workExperience !== false) {
          content.push({ text: t.preview.workExperience, style: 'sectionTitle' });
          cvData.workExperience.forEach(exp => {
            content.push({ text: `${exp.role || ''} – ${exp.company || ''}`, style: 'jobTitle' });
            if (exp.location) content.push({ text: `Ort: ${exp.location}`, style: 'body' });
            content.push({ text: `${exp.startDate || ''} - ${exp.endDate || ''}`, style: 'dates' });
            if (exp.bullets?.length) {
              exp.bullets.forEach(b => {
                content.push({ text: b, style: 'bullet' });
              });
            }
            content.push({ text: '', margin: [0, 0, 0, 5] });
          });
        }
      },
      education: () => {
        if (cvData.education?.length && sectionVisibility.education !== false) {
          content.push({ text: t.preview.education, style: 'sectionTitle' });
          cvData.education.forEach(edu => {
            content.push({ text: `${edu.degree || ''} – ${edu.institution || ''}`, style: 'jobTitle' });
            if (edu.location) content.push({ text: `Ort: ${edu.location}`, style: 'body' });
            content.push({ text: `${edu.startDate || ''} - ${edu.endDate || ''}`, style: 'dates' });
            content.push({ text: '', margin: [0, 0, 0, 5] });
          });
        }
      },
      skills: () => {
        if (cvData.skills?.length && sectionVisibility.skills !== false) {
          content.push({ text: t.preview.skills, style: 'sectionTitle' });
          const cats = {};
          cvData.skills.forEach(s => {
            if (!cats[s.category]) cats[s.category] = [];
            cats[s.category].push(s.name);
          });
          Object.entries(cats).forEach(([cat, names]) => {
            content.push({ text: `${cat}: ${names.join(', ')}`, style: 'body' });
          });
        }
      },
      languages: () => {
        if (cvData.languages?.length && sectionVisibility.languages !== false) {
          content.push({ text: t.preview.languages, style: 'sectionTitle' });
          cvData.languages.forEach(lang => {
            content.push({ text: `${lang.language} – ${lang.level}`, style: 'body' });
          });
        }
      },
      certifications: () => {
        if (cvData.certifications?.length && sectionVisibility.certifications !== false) {
          content.push({ text: t.preview.certifications, style: 'sectionTitle' });
          cvData.certifications.forEach(cert => {
            content.push({ text: `${cert.name} (${cert.date})`, style: 'body' });
          });
        }
      },
      projects: () => {
        if (cvData.projects?.length && sectionVisibility.projects !== false) {
          content.push({ text: t.preview.projects, style: 'sectionTitle' });
          cvData.projects.forEach(proj => {
            content.push({ text: `${proj.name || ''}`, style: 'jobTitle' });
            if (proj.link) content.push({ text: `Link: ${proj.link}`, style: 'body' });
            if (proj.description) content.push({ text: proj.description, style: 'body' });
            content.push({ text: '', margin: [0, 0, 0, 5] });
          });
        }
      },
      volunteer: () => {
        if (cvData.volunteer?.length && sectionVisibility.volunteer !== false) {
          content.push({ text: t.preview.volunteer, style: 'sectionTitle' });
          cvData.volunteer.forEach(vol => {
            content.push({ text: `${vol.role || ''} – ${vol.organization || ''}`, style: 'jobTitle' });
            if (vol.description) content.push({ text: vol.description, style: 'body' });
            content.push({ text: '', margin: [0, 0, 0, 5] });
          });
        }
      },
      awards: () => {
        if (cvData.awards?.length && sectionVisibility.awards !== false) {
          content.push({ text: t.preview.awards, style: 'sectionTitle' });
          cvData.awards.forEach(award => {
            content.push({ text: `${award.title || ''} – ${award.issuer || ''}`, style: 'jobTitle' });
            if (award.date) content.push({ text: award.date, style: 'dates' });
            if (award.description) content.push({ text: award.description, style: 'body' });
            content.push({ text: '', margin: [0, 0, 0, 5] });
          });
        }
      },
      interests: () => {
        if (cvData.interests?.length && sectionVisibility.interests !== false) {
          content.push({ text: t.preview.interests, style: 'sectionTitle' });
          content.push({ text: cvData.interests.map(i => i.name).join(', '), style: 'body' });
        }
      },
      references: () => {
        if (cvData.references?.length && sectionVisibility.references !== false) {
          content.push({ text: t.preview.references, style: 'sectionTitle' });
          cvData.references.forEach(ref => {
            content.push({ text: `${ref.name || ''}, ${ref.position || ''}, ${ref.company || ''}`, style: 'body' });
            if (ref.contact) content.push({ text: `Kontakt: ${ref.contact}`, style: 'body' });
          });
        }
      }
    };

    (sectionOrder || ['summary', 'workExperience', 'education', 'skills', 'languages', 'certifications', 'projects', 'volunteer', 'awards', 'interests', 'references']).forEach(key => {
      if (sectionRenderers[key]) sectionRenderers[key]();
    });

    return content;
  };

  const downloadPdf = () => {
    setLoading(true);
    const docDefinition = {
      content: buildContent(),
      styles: {
        header: { fontSize: 24, bold: true, color: customization.color || '#0f1b3d', margin: [0, 0, 0, 5] },
        subheader: { fontSize: 14, color: '#475569', margin: [0, 0, 0, 10] },
        contact: { fontSize: 10, color: '#475569', margin: [0, 0, 0, 10] },
        sectionTitle: { fontSize: 13, bold: true, color: customization.color || '#0f1b3d', margin: [0, 15, 0, 5], decoration: 'underline' },
        jobTitle: { fontSize: 11, bold: true, color: '#1e293b', margin: [0, 0, 0, 2] },
        dates: { fontSize: 10, color: '#64748b', margin: [0, 0, 0, 5] },
        bullet: { fontSize: 10, color: '#1e293b', margin: [5, 0, 0, 2] },
        body: { fontSize: 10, color: '#1e293b', margin: [0, 0, 0, 2] }
      },
      pageSize: 'A4',
      pageMargins: [15, 15, 15, 15],
      defaultStyle: { font: 'Roboto' }
    };

    pdfMake.createPdf(docDefinition).download('Lebenslauf.pdf');
    setLoading(false);
  };

  return (
    <button
      onClick={downloadPdf}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-royal-navy text-white font-medium py-2 px-4 rounded-lg transition-colors hover:bg-royal-navy/90 disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileText className="h-5 w-5" />}
      {loading ? 'Erstelle PDF...' : 'PDF direkt herunterladen'}
    </button>
  );
}
