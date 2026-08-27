import React, { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function PdfDownloadButton({ cvData, customization, sectionVisibility, sectionOrder, t }) {
  const [loading, setLoading] = useState(false);

  const downloadPdf = async () => {
    const element = document.getElementById('cv-print-area');
    if (!element) {
      alert('Keine Vorschau gefunden');
      return;
    }
    setLoading(true);
    try {
      // التقاط المعاينة كصورة
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      pdf.save('Lebenslauf.pdf');
    } catch (error) {
      console.error('PDF-Erstellung fehlgeschlagen:', error);
      alert('PDF konnte nicht erstellt werden. Bitte nutze den Drucken-Button.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={downloadPdf}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-royal-navy text-white font-medium py-2 px-4 rounded-lg transition-colors hover:bg-royal-navy/90 disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileText className="h-5 w-5" />}
      {loading ? 'Erstelle PDF...' : 'PDF direkt herunterladen'}
    </button>
  );
}
