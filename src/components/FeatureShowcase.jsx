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
        <button
          type="button"
          onClick={() => alert('Automatische Verbesserung aktiviert!')}
          aria-label="Text verbessern"
          title="Text verbessern"
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-royal-navy/5 hover:bg-royal-navy/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold"
        >
          <Wand2 className="h-6 w-6 text-royal-gold" aria-hidden="true" />
          <span className="text-xs font-medium">Verbessern</span>
        </button>
        <button
          type="button"
          onClick={onToggleDark}
          aria-label={darkMode ? 'Zur hellen Ansicht wechseln' : 'Zur dunklen Ansicht wechseln'}
          title={darkMode ? 'Helle Ansicht' : 'Dunkle Ansicht'}
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-royal-navy/5 hover:bg-royal-navy/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold"
        >
          <Moon className="h-6 w-6 text-royal-gold" aria-hidden="true" />
          <span className="text-xs font-medium">{darkMode ? 'Hell' : 'Dunkel'}</span>
        </button>
        <button
          type="button"
          onClick={onFullscreen}
          aria-label="Vollbildmodus umschalten"
          title="Vollbild"
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-royal-navy/5 hover:bg-royal-navy/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold"
        >
          <Maximize className="h-6 w-6 text-royal-gold" aria-hidden="true" />
          <span className="text-xs font-medium">Vollbild</span>
        </button>
        <button
          type="button"
          onClick={onExport}
          aria-label="Daten exportieren"
          title="Export"
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-royal-navy/5 hover:bg-royal-navy/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold"
        >
          <Download className="h-6 w-6 text-royal-gold" aria-hidden="true" />
          <span className="text-xs font-medium">Export</span>
        </button>
        <button
          type="button"
          onClick={onImport}
          aria-label="Daten importieren"
          title="Import"
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-royal-navy/5 hover:bg-royal-navy/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold"
        >
          <Upload className="h-6 w-6 text-royal-gold" aria-hidden="true" />
          <span className="text-xs font-medium">Import</span>
        </button>
        <button
          type="button"
          onClick={onWordExport}
          aria-label="Word-Datei herunterladen"
          title="Word"
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-royal-navy/5 hover:bg-royal-navy/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold"
        >
          <FileText className="h-6 w-6 text-royal-gold" aria-hidden="true" />
          <span className="text-xs font-medium">Word</span>
        </button>
      </div>
    </div>
  );
}
