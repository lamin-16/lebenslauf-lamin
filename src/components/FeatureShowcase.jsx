import React from 'react';
import { Wand2, Moon, Maximize, Download, Upload, Sparkles, FileText } from 'lucide-react';

export default function FeatureShowcase({ onToggleDark, onFullscreen, onExport, onImport, onWordExport, darkMode }) {
  return (
    <div className="royal-card p-5 rounded-2xl space-y-3">
      <h3 className="font-semibold text-lg text-royal-navy flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-royal-gold" />
        Zauberfunktionen
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => alert('Automatische Verbesserung aktiviert!')} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-royal-navy/5 hover:bg-royal-navy/10 transition-colors">
          <Wand2 className="h-6 w-6 text-royal-gold" />
          <span className="text-xs font-medium">Verbessern</span>
        </button>
        <button onClick={onToggleDark} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-royal-navy/5 hover:bg-royal-navy/10 transition-colors">
          <Moon className="h-6 w-6 text-royal-gold" />
          <span className="text-xs font-medium">{darkMode ? 'Hell' : 'Dunkel'}</span>
        </button>
        <button onClick={onFullscreen} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-royal-navy/5 hover:bg-royal-navy/10 transition-colors">
          <Maximize className="h-6 w-6 text-royal-gold" />
          <span className="text-xs font-medium">Vollbild</span>
        </button>
        <button onClick={onExport} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-royal-navy/5 hover:bg-royal-navy/10 transition-colors">
          <Download className="h-6 w-6 text-royal-gold" />
          <span className="text-xs font-medium">Export</span>
        </button>
        <button onClick={onImport} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-royal-navy/5 hover:bg-royal-navy/10 transition-colors">
          <Upload className="h-6 w-6 text-royal-gold" />
          <span className="text-xs font-medium">Import</span>
        </button>
        <button onClick={onWordExport} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-royal-navy/5 hover:bg-royal-navy/10 transition-colors">
          <FileText className="h-6 w-6 text-royal-gold" />
          <span className="text-xs font-medium">Word</span>
        </button>
      </div>
    </div>
  );
}
