import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function ReferencesForm({ t, items, addItem, removeItem, updateField }) {
  const handleAdd = () => {
    const newItem = { id: Date.now().toString(), name: '', position: '', company: '', contact: '' };
    addItem('references', newItem);
  };
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
            <button onClick={() => removeItem('references', item.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.referenceName}</label>
              <input type="text" value={item.name} onChange={(e) => updateField('references', item.id, 'name', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.referencePosition}</label>
              <input type="text" value={item.position} onChange={(e) => updateField('references', item.id, 'position', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.referenceCompany}</label>
              <input type="text" value={item.company} onChange={(e) => updateField('references', item.id, 'company', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.form.referenceContact}</label>
              <input type="text" value={item.contact} onChange={(e) => updateField('references', item.id, 'contact', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleAdd} className="w-full py-2.5 border-2 border-dashed border-brand-300 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors font-medium flex items-center justify-center gap-2">
        <Plus className="h-5 w-5" /> {t.form.add} {t.form.references}
      </button>
    </div>
  );
}
