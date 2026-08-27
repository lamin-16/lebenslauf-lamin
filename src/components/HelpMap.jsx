import React from 'react';

export default function HelpMap() {
  return (
    <div className="royal-card p-5 rounded-2xl space-y-4">
      <h3 className="font-semibold text-lg text-royal-navy">So funktioniert's</h3>
      <svg viewBox="0 0 800 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* خلفية */}
        <rect x="0" y="0" width="800" height="300" fill="#fafbfe" rx="12" />

        {/* المحرر */}
        <rect x="30" y="40" width="300" height="220" rx="10" fill="#ffffff" stroke="#d4af37" strokeWidth="1.5" />
        <text x="180" y="65" textAnchor="middle" fill="#0f1b3d" fontSize="16" fontWeight="bold">Editor</text>
        <rect x="50" y="80" width="260" height="30" rx="6" fill="#f0f4ff" />
        <text x="180" y="100" textAnchor="middle" fill="#333" fontSize="11">Persönliche Daten</text>
        <rect x="50" y="120" width="260" height="30" rx="6" fill="#f0f4ff" />
        <text x="180" y="140" textAnchor="middle" fill="#333" fontSize="11">Berufserfahrung</text>
        <rect x="50" y="160" width="260" height="30" rx="6" fill="#f0f4ff" />
        <text x="180" y="180" textAnchor="middle" fill="#333" fontSize="11">Ausbildung</text>
        <rect x="50" y="200" width="260" height="30" rx="6" fill="#f0f4ff" />
        <text x="180" y="220" textAnchor="middle" fill="#333" fontSize="11">Fähigkeiten</text>

        {/* سهم */}
        <path d="M340 150 L400 150" stroke="#d4af37" strokeWidth="2" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#d4af37" />
          </marker>
        </defs>

        {/* المعاينة */}
        <rect x="470" y="40" width="300" height="220" rx="10" fill="#ffffff" stroke="#0f1b3d" strokeWidth="1.5" />
        <text x="620" y="65" textAnchor="middle" fill="#0f1b3d" fontSize="16" fontWeight="bold">Live-Vorschau</text>
        <rect x="490" y="80" width="260" height="30" rx="6" fill="#eef2ff" />
        <text x="620" y="100" textAnchor="middle" fill="#333" fontSize="11">Maximilian Schmidt</text>
        <rect x="490" y="120" width="260" height="60" rx="6" fill="#f9fafb" stroke="#ddd" strokeDasharray="4" />
        <text x="620" y="150" textAnchor="middle" fill="#666" fontSize="10">Berufserfahrung</text>
        <rect x="490" y="190" width="260" height="50" rx="6" fill="#f9fafb" stroke="#ddd" strokeDasharray="4" />
        <text x="620" y="215" textAnchor="middle" fill="#666" fontSize="10">Ausbildung</text>

        {/* أزرار تحت */}
        <rect x="280" y="275" width="120" height="20" rx="10" fill="#d4af37" />
        <text x="340" y="289" textAnchor="middle" fill="#0f1b3d" fontSize="10">Drucken / PDF</text>
        <rect x="420" y="275" width="120" height="20" rx="10" fill="#0f1b3d" />
        <text x="480" y="289" textAnchor="middle" fill="#fff" fontSize="10">Vorlagen</text>
      </svg>
      <p className="text-xs text-gray-500 text-center">Klicke auf die Bereiche, um sie zu erkunden.</p>
    </div>
  );
}
