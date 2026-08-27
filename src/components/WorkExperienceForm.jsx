import React from 'react';
import { Plus, Trash2, GripVertical, Wand2 } from 'lucide-react';
import { enhancePhrase } from '../data/phrases';

export default function WorkExperienceForm({
  t,
  items,
  addItem,
  removeItem,
  updateField,
  updateBullet,
  addBullet,
  removeBullet,
}) {
  const handleAdd = () => {
    const newItem = {
      id: Date.now().toString(),
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      bullets: [''],
    };
    addItem('workExperience', newItem);
  };

  const enhanceBullet = (itemId, bulletIndex) => {
    const current = items.find(i => i.id === itemId)?.bullets?.[bulletIndex];
    if (current && current.trim()) {
      const enhanced = enhancePhrase(current);
      updateBullet('workExperience', itemId, bulletIndex, enhanced);
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
            <button onClick={() => removeItem('workExperience', item.id)} className="text-red-500 hover:text-red-700 p-1">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.company}</label>
              <input type="text" value={item.company} onChange={(e) => updateField('workExperience', item.id, 'company', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal-gold" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.role}</label>
              <input type="text" value={item.role} onChange={(e) => updateField('workExperience', item.id, 'role', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal-gold" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.location}</label>
              <input type="text" value={item.location} onChange={(e) => updateField('workExperience', item.id, 'location', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal-gold" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.startDate}</label>
                <input type="text" value={item.startDate} onChange={(e) => updateField('workExperience', item.id, 'startDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal-gold" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.endDate}</label>
                <input type="text" value={item.endDate} onChange={(e) => updateField('workExperience', item.id, 'endDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal-gold" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-600">{t.form.bulletPoint}</label>
            {item.bullets.map((bullet, bulletIndex) => (
              <div key={bulletIndex} className="flex gap-2 items-start">
                <GripVertical className="h-5 w-5 text-gray-300 mt-1" />
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => updateBullet('workExperience', item.id, bulletIndex, e.target.value)}
                  placeholder={t.form.bulletPlaceholder}
                  className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal-gold"
                />
                <button
                  onClick={() => enhanceBullet(item.id, bulletIndex)}
                  className="text-royal-gold hover:text-royal-navy p-1 transition-colors"
                  title="Verbessern"
                >
                  <Wand2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeBullet('workExperience', item.id, bulletIndex)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addBullet('workExperience', item.id)}
              className="text-royal-gold hover:text-royal-navy text-sm font-medium flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> {t.form.add}
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="w-full py-2.5 border-2 border-dashed border-royal-gold/40 text-royal-gold rounded-xl hover:bg-royal-navy/5 transition-colors font-medium flex items-center justify-center gap-2"
      >
        <Plus className="h-5 w-5" /> {t.form.add} {t.form.workExperience}
      </button>
    </div>
  );
}
