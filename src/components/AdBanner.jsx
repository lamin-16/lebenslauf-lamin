import React, { useEffect, useRef } from 'react';
import { adConfig } from '../data/ads';

export default function AdBanner({ type = 'sidebar' }) {
  const containerRef = useRef(null);
  const banner = adConfig[type + 'Banner'] || adConfig.sidebarBanner;

  useEffect(() => {
    if (!banner || !banner.enabled || !banner.code || !containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = '';

    // إنشاء عناصر من كود HTML
    const temp = document.createElement('div');
    temp.innerHTML = banner.code;

    // نسخ العناصر غير السكربتية
    const nodes = temp.childNodes;
    nodes.forEach(node => {
      if (node.tagName === 'SCRIPT') {
        const newScript = document.createElement('script');
        Array.from(node.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = node.textContent;
        container.appendChild(newScript);
      } else {
        container.appendChild(node.cloneNode(true));
      }
    });
  }, [banner]);

  if (!adConfig.enabled || !banner || !banner.enabled) return null;

  return (
    <div
      ref={containerRef}
      className="no-print ad-banner-container"
      style={{ minWidth: 300, minHeight: 250, display: 'flex', justifyContent: 'center' }}
    >
      {!banner.code && (
        <div className="bg-gradient-to-r from-royal-navy/5 to-royal-gold/10 border border-royal-gold/30 rounded-xl p-4 text-center w-full">
          <p className="text-sm font-medium text-royal-navy">{banner.fallbackText}</p>
          <p className="text-xs text-gray-500 mt-1">Premium-Werbung – Kontaktieren Sie uns</p>
        </div>
      )}
    </div>
  );
}
