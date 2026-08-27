import React from 'react';

export default function SummaryForm({ t, value, updateField }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{t.form.summary}</label>
      <textarea
        value={value || ''}
        onChange={(e) => updateField('summary', null, null, e.target.value)}
        rows={4}
        placeholder={t.form.summaryPlaceholder}
        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
      />
    </div>
  );
}
