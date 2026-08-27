import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function ProjectsForm({ t, items, addItem, removeItem, updateField }) {
  const handleAdd = () => {
    const newItem = { id: Date.now().toString(), name: '', description: '', link: '', startDate: '', endDate: '' };
    addItem('projects', newItem);
  };
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
            <button onClick={() => removeItem('projects', item.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.projectName}</label>
              <input type="text" value={item.name} onChange={(e) => updateField('projects', item.id, 'name', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.projectLink}</label>
              <input type="text" value={item.link} onChange={(e) => updateField('projects', item.id, 'link', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.startDate}</label>
                <input type="text" value={item.startDate} onChange={(e) => updateField('projects', item.id, 'startDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.endDate}</label>
                <input type="text" value={item.endDate} onChange={(e) => updateField('projects', item.id, 'endDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.projectDescription}</label>
              <textarea value={item.description} onChange={(e) => updateField('projects', item.id, 'description', e.target.value)} rows={2} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleAdd} className="w-full py-2.5 border-2 border-dashed border-brand-300 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors font-medium flex items-center justify-center gap-2">
        <Plus className="h-5 w-5" /> {t.form.add} {t.form.projects}
      </button>
    </div>
  );
}
