import React from 'react';
import { adConfig } from '../data/ads';

export default function AdBanner({ type = 'sidebar' }) {
  if (!adConfig.enabled) return null;
  const banner = adConfig[type + 'Banner'];
  if (!banner || !banner.enabled) return null;

  // إذا وُجد كود إعلاني حقيقي، نعرضه
  if (banner.code) {
    return <div dangerouslySetInnerHTML={{ __html: banner.code }} />;
  }

  // عرض بديل مؤقت
  return (
    <div className="no-print bg-gray-50 border border-dashed border-gray-300 rounded-xl p-3 text-center text-xs text-gray-400">
      <p>{banner.fallbackText || 'Werbung'}</p>
    </div>
  );
}
