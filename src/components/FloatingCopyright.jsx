import React from 'react';

export default function FloatingCopyright({ language }) {
  // نصوص حقوق مترجمة
  const footers = {
    de: '© 2026 Mohamed Chadli. Alle Rechte vorbehalten.',
    en: '© 2026 Mohamed Chadli. All rights reserved.',
    ar: '© 2026 محمد شاذلي. جميع الحقوق محفوظة.',
  };
  const text = footers[language] || footers.de;

  return (
    <div className="floating-copyright no-print" dir="ltr">
      <span>{text}</span>
    </div>
  );
}
