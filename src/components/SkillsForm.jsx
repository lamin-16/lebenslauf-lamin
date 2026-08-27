import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function SkillsForm({ t, items, addItem, removeItem, updateField }) {
  const handleAdd = () => {
    const newItem = {
      id: Date.now().toString(),
      category: '',
      name: '',
      level: '',
    };
    addItem('skills', newItem);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center border border-gray-200 rounded-xl p-3">
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              value={item.category}
              onChange={(e) => updateField('skills', item.id, 'category', e.target.value)}
              placeholder="Kategorie"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateField('skills', item.id, 'name', e.target.value)}
              placeholder="Skill"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <select
              value={item.level}
              onChange={(e) => updateField('skills', item.id, 'level', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">{t.form.proficiency}</option>
              <option value="Anfänger">Anfänger</option>
              <option value="Fortgeschritten">Fortgeschritten</option>
              <option value="Experte">Experte</option>
            </select>
          </div>
          <button
            onClick={() => removeItem('skills', item.id)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="w-full py-2.5 border-2 border-dashed border-brand-300 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors font-medium flex items-center justify-center gap-2"
      >
        <Plus className="h-5 w-5" /> {t.form.add} {t.form.skills}
      </button>
    </div>
  );
}
