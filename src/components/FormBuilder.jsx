import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import WorkExperienceForm from './WorkExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import LanguagesForm from './LanguagesForm';
import ProjectsForm from './ProjectsForm';
import VolunteerForm from './VolunteerForm';
import AwardsForm from './AwardsForm';
import InterestsForm from './InterestsForm';
import ReferencesForm from './ReferencesForm';
import { User, FileText, Briefcase, GraduationCap, Wrench, Globe2, FolderGit2, Heart, Award, BookOpen, UserCheck, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, LayoutGrid, ListOrdered } from 'lucide-react';

const sections = [
  { id: 'personal', icon: User, labelKey: 'personalInfo' },
  { id: 'summary', icon: FileText, labelKey: 'summary' },
  { id: 'workExperience', icon: Briefcase, labelKey: 'workExperience' },
  { id: 'education', icon: GraduationCap, labelKey: 'education' },
  { id: 'skills', icon: Wrench, labelKey: 'skills' },
  { id: 'languages', icon: Globe2, labelKey: 'languages' },
  { id: 'projects', icon: FolderGit2, labelKey: 'projects' },
  { id: 'volunteer', icon: Heart, labelKey: 'volunteer' },
  { id: 'awards', icon: Award, labelKey: 'awards' },
  { id: 'interests', icon: BookOpen, labelKey: 'interests' },
  { id: 'references', icon: UserCheck, labelKey: 'references' },
];

export default function FormBuilder({
  t,
  cvData,
  customization,
  updateField,
  addItem,
  removeItem,
  updateBullet,
  addBullet,
  removeBullet,
  activeSection,
  setActiveSection,
  darkMode,
  formMode,
  setFormMode,
}) {
  const [openSections, setOpenSections] = React.useState(['personal']);

  const toggleSection = (id) => {
    setOpenSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const currentIndex = sections.findIndex(s => s.id === activeSection);
  const goNext = () => {
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };
  const goBack = () => {
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  const renderSectionForm = (sectionId) => {
    switch (sectionId) {
      case 'personal':
        return <PersonalInfoForm t={t} data={cvData.personalInfo} updateField={updateField} />;
      case 'summary':
        return <SummaryForm t={t} value={cvData.summary} updateField={updateField} />;
      case 'workExperience':
        return (
          <WorkExperienceForm
            t={t}
            items={cvData.workExperience}
            addItem={addItem}
            removeItem={removeItem}
            updateField={updateField}
            updateBullet={updateBullet}
            addBullet={addBullet}
            removeBullet={removeBullet}
          />
        );
      case 'education':
        return <EducationForm t={t} items={cvData.education} addItem={addItem} removeItem={removeItem} updateField={updateField} />;
      case 'skills':
        return <SkillsForm t={t} items={cvData.skills} addItem={addItem} removeItem={removeItem} updateField={updateField} />;
      case 'languages':
        return (
          <LanguagesForm
            t={t}
            languages={cvData.languages}
            certifications={cvData.certifications}
            addItem={addItem}
            removeItem={removeItem}
            updateField={updateField}
          />
        );
      case 'projects':
        return <ProjectsForm t={t} items={cvData.projects} addItem={addItem} removeItem={removeItem} updateField={updateField} />;
      case 'volunteer':
        return <VolunteerForm t={t} items={cvData.volunteer} addItem={addItem} removeItem={removeItem} updateField={updateField} />;
      case 'awards':
        return <AwardsForm t={t} items={cvData.awards} addItem={addItem} removeItem={removeItem} updateField={updateField} />;
      case 'interests':
        return <InterestsForm t={t} items={cvData.interests} addItem={addItem} removeItem={removeItem} updateField={updateField} />;
      case 'references':
        return <ReferencesForm t={t} items={cvData.references} addItem={addItem} removeItem={removeItem} updateField={updateField} />;
      default:
        return null;
    }
  };

  // وضع المعالج
  if (formMode === 'wizard') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-royal-navy">Schritt {currentIndex + 1} von {sections.length}</h3>
          <button
            onClick={() => setFormMode('all')}
            className="text-xs text-gray-500 hover:text-royal-gold flex items-center gap-1"
          >
            <ListOrdered className="h-4 w-4" /> Alle anzeigen
          </button>
        </div>

        {/* شريط تقدم الخطوات */}
        <div className="flex gap-1">
          {sections.map((sec, idx) => (
            <div
              key={sec.id}
              className={`h-1 flex-1 rounded-full ${idx <= currentIndex ? 'bg-royal-gold' : 'bg-gray-200'}`}
            ></div>
          ))}
        </div>

        {/* البطاقة الحالية */}
        <div className="royal-card p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            {React.createElement(sections[currentIndex].icon, { className: 'h-5 w-5 text-royal-gold' })}
            <h4 className="font-semibold text-royal-navy">{t.form[sections[currentIndex].labelKey]}</h4>
          </div>
          {renderSectionForm(activeSection)}
        </div>

        {/* أزرار التنقل */}
        <div className="flex justify-between">
          <button
            onClick={goBack}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" /> Zurück
          </button>
          {currentIndex < sections.length - 1 ? (
            <button
              onClick={goNext}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-royal-navy text-white text-sm font-medium hover:bg-royal-navy/90"
            >
              Weiter <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setFormMode('all')}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-royal-gold text-royal-navy text-sm font-medium"
            >
              Fertig <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // وضع جميع الأقسام
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-royal-navy">Alle Abschnitte</h3>
        <button
          onClick={() => setFormMode('wizard')}
          className="text-xs text-gray-500 hover:text-royal-gold flex items-center gap-1"
        >
          <LayoutGrid className="h-4 w-4" /> Schritte
        </button>
      </div>
      {sections.map(section => {
        const Icon = section.icon;
        const isOpen = openSections.includes(section.id);
        return (
          <div key={section.id} className="royal-card rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-royal-navy/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-royal-gold" />
                <h3 className="font-semibold text-royal-navy">{t.form[section.labelKey]}</h3>
              </div>
              {isOpen ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </button>
            {isOpen && (
              <div className="p-4 border-t border-gray-100">
                {renderSectionForm(section.id)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
