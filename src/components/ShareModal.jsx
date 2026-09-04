import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

export default function ShareModal({ shareUrl, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          aria-label="Schließen"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>
        <h3 className="text-xl font-bold text-royal-navy mb-4">Lebenslauf teilen</h3>
        <p className="text-sm text-gray-600 mb-4">
          Der Link enthält komprimierte Daten. Jeder, der den Link hat, kann den Inhalt sehen.
        </p>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={shareUrl}
            readOnly
            aria-label="Freigabelink"
            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 btn-gold py-2 px-4 rounded-lg text-sm"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Kopiert!' : 'Kopieren'}
          </button>
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
