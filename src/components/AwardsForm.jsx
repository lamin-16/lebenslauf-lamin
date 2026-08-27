import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function AwardsForm({ t, items, addItem, removeItem, updateField }) {
  const handleAdd = () => {
    const newItem = { id: Date.now().toString(), title: '', issuer: '', date: '', description: '' };
    addItem('awards', newItem);
  };
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
            <button onClick={() => removeItem('awards', item.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.awardTitle}</label>
              <input type="text" value={item.title} onChange={(e) => updateField('awards', item.id, 'title', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.awardIssuer}</label>
              <input type="text" value={item.issuer} onChange={(e) => updateField('awards', item.id, 'issuer', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.awardDate}</label>
              <input type="text" value={item.date} onChange={(e) => updateField('awards', item.id, 'date', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.awardDescription}</label>
              <textarea value={item.description} onChange={(e) => updateField('awards', item.id, 'description', e.target.value)} rows={2} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleAdd} className="w-full py-2.5 border-2 border-dashed border-brand-300 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors font-medium flex items-center justify-center gap-2">
        <Plus className="h-5 w-5" /> {t.form.add} {t.form.awards}
      </button>
    </div>
  );
}
