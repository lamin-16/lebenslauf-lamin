import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function LanguagesForm({ t, languages, certifications, addItem, removeItem, updateField }) {
  const handleAddLanguage = () => {
    const newItem = {
      id: Date.now().toString(),
      language: '',
      level: '',
    };
    addItem('languages', newItem);
  };

  const handleAddCertification = () => {
    const newItem = {
      id: Date.now().toString(),
      name: '',
      date: '',
    };
    addItem('certifications', newItem);
  };

  return (
    <div className="space-y-6">
      {/* اللغات */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">{t.form.languages}</h4>
        <div className="space-y-2">
          {languages.map((item, index) => (
            <div key={item.id} className="flex gap-2 items-center">
              <input
                type="text"
                value={item.language}
                onChange={(e) => updateField('languages', item.id, 'language', e.target.value)}
                placeholder={t.form.language}
                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <input
                type="text"
                value={item.level}
                onChange={(e) => updateField('languages', item.id, 'level', e.target.value)}
                placeholder={t.form.proficiency}
                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                onClick={() => removeItem('languages', item.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddLanguage}
            className="w-full py-2 border-2 border-dashed border-brand-300 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors font-medium flex items-center justify-center gap-2 text-sm"
          >
            <Plus className="h-4 w-4" /> {t.form.add}
          </button>
        </div>
      </div>

      {/* الشهادات */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">{t.form.certificate}</h4>
        <div className="space-y-2">
          {certifications.map((item, index) => (
            <div key={item.id} className="flex gap-2 items-center">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateField('certifications', item.id, 'name', e.target.value)}
                placeholder={t.form.certificate}
                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <input
                type="text"
                value={item.date}
                onChange={(e) => updateField('certifications', item.id, 'date', e.target.value)}
                placeholder="YYYY"
                className="w-24 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                onClick={() => removeItem('certifications', item.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddCertification}
            className="w-full py-2 border-2 border-dashed border-brand-300 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors font-medium flex items-center justify-center gap-2 text-sm"
          >
            <Plus className="h-4 w-4" /> {t.form.add}
          </button>
        </div>
      </div>
    </div>
  );
}
