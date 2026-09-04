import React, { useMemo, useState } from 'react';
import { GaugeCircle, Lightbulb, ClipboardList } from 'lucide-react';

export default function ATSAssistant({ cvData, customization, t }) {
  const [jobDescription, setJobDescription] = useState('');

  const analysis = useMemo(() => {
    const scoreParts = [];
    const tips = [];
    let keywordMatches = [];
    let missingKeywords = [];

    // 1. الأقسام الأساسية
    if (cvData.summary && cvData.summary.trim().length > 20) scoreParts.push(10);
    else tips.push('Füge ein aussagekräftiges Kurzprofil hinzu.');

    if (cvData.workExperience?.length > 0) scoreParts.push(15);
    else tips.push('Füge Berufserfahrung hinzu.');

    if (cvData.education?.length > 0) scoreParts.push(10);
    else tips.push('Füge Ausbildung hinzu.');

    if (cvData.skills?.length >= 5) scoreParts.push(10);
    else tips.push('Füge mehr Fähigkeiten hinzu.');

    if (cvData.languages?.length > 0) scoreParts.push(5);
    else tips.push('Füge Sprachkenntnisse hinzu.');

    if (cvData.certifications?.length > 0) scoreParts.push(5);
    else tips.push('Füge Zertifikate hinzu.');

    // 2. بيانات الاتصال
    const hasEmail = !!cvData.personalInfo?.email;
    const hasPhone = !!cvData.personalInfo?.phone;
    if (hasEmail && hasPhone) scoreParts.push(10);
    else tips.push('Vollständige Kontaktdaten sind wichtig.');

    // 3. تواريخ
    const hasDates = cvData.workExperience?.some(e => e.startDate || e.endDate) ||
                     cvData.education?.some(e => e.startDate || e.endDate);
    if (hasDates) scoreParts.push(5);
    else tips.push('Gib Zeiträume für Erfahrungen und Ausbildung an.');

    // 4. صورة/رسومات
    if (customization.atsMode || !cvData.personalInfo?.photo || customization.photoPosition === 'none') scoreParts.push(5);
    else tips.push(t.ats.tip3);

    // 5. أحرف غير عادية أو تنسيق مشكل
    const allText = JSON.stringify(cvData).toLowerCase();
    const unusualChars = allText.match(/[#*_^~<>|\\]/g);
    if (unusualChars && unusualChars.length > 5) {
      tips.push('Entferne Sonderzeichen wie *, #, _ aus dem Text. ATS-Systeme mögen klaren Text.');
    } else {
      scoreParts.push(5);
    }

    // 6. طول النص
    const totalWords = (cvData.summary?.split(' ').length || 0) +
      cvData.workExperience?.reduce((acc, exp) => acc + (exp.bullets?.join(' ').split(' ').length || 0), 0);
    if (totalWords > 50 && totalWords < 600) scoreParts.push(5);
    else tips.push(t.ats.tip6);

    // 7. تحليل الوصف الوظيفي
    if (jobDescription.trim().length > 0) {
      const keywords = [...new Set(jobDescription.toLowerCase().match(/\b[a-zA-ZäöüÄÖÜß]{4,}\b/g) || [])];
      const cvText = [
        cvData.summary,
        ...(cvData.workExperience || []).map(e => `${e.role} ${e.company} ${e.bullets?.join(' ')}`),
        ...(cvData.skills || []).map(s => s.name),
        ...(cvData.languages || []).map(l => l.language),
        ...(cvData.certifications || []).map(c => c.name),
      ].join(' ').toLowerCase();

      keywordMatches = keywords.filter(kw => cvText.includes(kw));
      missingKeywords = keywords.filter(kw => !cvText.includes(kw)).slice(0, 8);

      const matchRate = keywords.length > 0 ? (keywordMatches.length / keywords.length) * 100 : 0;
      scoreParts.push(Math.round(matchRate / 10));
      if (missingKeywords.length > 0) {
        tips.push(`Füge diese Schlüsselwörter hinzu: ${missingKeywords.join(', ')}`);
      }
    }

    const score = Math.min(100, scoreParts.reduce((a, b) => a + b, 0));
    return { score, tips, keywordMatches, missingKeywords };
  }, [cvData, customization, t, jobDescription]);

  const getScoreLabel = () => {
    if (analysis.score >= 90) return 'Sehr gut';
    if (analysis.score >= 70) return 'Gut';
    if (analysis.score >= 50) return 'Mittel';
    return 'Schwach';
  };

  return (
    <div className="royal-card p-5 rounded-2xl space-y-4">
      <div className="flex items-center gap-3">
        <GaugeCircle className="h-6 w-6 text-royal-gold" />
        <div>
          <h3 className="font-semibold text-lg text-royal-navy">ATS-Kompatibilitätsanalyse</h3>
          <p className="text-xs text-gray-500">Heuristische Analyse – keine Garantie für ATS-Erfolg</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-3xl font-bold text-royal-navy">{analysis.score}%</div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          analysis.score >= 90 ? 'bg-green-100 text-green-700' :
          analysis.score >= 70 ? 'bg-yellow-100 text-yellow-700' :
          analysis.score >= 50 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
        }`}>
          {getScoreLabel()}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-royal-navy mb-1">
          <ClipboardList className="h-4 w-4 text-royal-gold" />
          Stellenanzeige einfügen
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={3}
          placeholder="Füge hier den Text der Stellenanzeige ein..."
          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal-gold resize-none"
        />
      </div>

      {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-orange-700 mb-1">Fehlende Keywords:</p>
          <div className="flex flex-wrap gap-1">
            {analysis.missingKeywords.map((kw, i) => (
              <span key={i} className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-xs">{kw}</span>
            ))}
          </div>
        </div>
      )}

      {analysis.tips.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-royal-navy mb-2 flex items-center gap-1">
            <Lightbulb className="h-4 w-4 text-royal-gold" /> {t.ats.tips}
          </h4>
          <ul className="space-y-1">
            {analysis.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-royal-gold font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
