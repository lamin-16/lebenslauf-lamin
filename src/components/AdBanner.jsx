import React from 'react';

export default function AdBanner({ type = 'sidebar', fallbackText = 'Werbung' }) {
  return (
    <div className="no-print bg-gray-50 border border-dashed border-gray-300 rounded-xl p-3 text-center text-xs text-gray-400">
      <p>{fallbackText}</p>
    </div>
  );
}
