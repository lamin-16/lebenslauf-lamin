import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function InterestsForm({ t, items, addItem, removeItem, updateField }) {
  const handleAdd = () => {
    const newItem = { id: Date.now().toString(), name: '' };
    addItem('interests', newItem);
  };
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.id} className="flex gap-2 items-center">
          <input
            type="text"
            value={item.name}
            onChange={(e) => updateField('interests', item.id, 'name', e.target.value)}
            placeholder={t.form.interestName}
            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button onClick={() => removeItem('interests', item.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="h-4 w-4" /></button>
        </div>
      ))}
      <button onClick={handleAdd} className="w-full py-2 border-2 border-dashed border-brand-300 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors font-medium flex items-center justify-center gap-2 text-sm">
        <Plus className="h-4 w-4" /> {t.form.add}
      </button>
    </div>
  );
}
