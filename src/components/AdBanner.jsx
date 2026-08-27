import React, { useRef, useEffect } from 'react';
import { adConfig } from '../data/ads';

export default function AdBanner({ type = 'sidebar' }) {
  const iframeRef = useRef(null);
  const banner = adConfig[type + 'Banner'] || adConfig.sidebarBanner;

  useEffect(() => {
    if (!banner || !banner.enabled || !banner.code || !iframeRef.current) return;
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(banner.code);
    doc.close();
  }, [banner]);

  if (!adConfig.enabled || !banner || !banner.enabled) return null;

  const sizeMap = {
    top: { width: 320, height: 50, margin: '0 auto 12px auto' },
    sidebar: { width: 300, height: 250, margin: '16px auto' },
    footer: { width: 728, height: 90, margin: '24px auto 0 auto' },
  };
  const size = sizeMap[type] || sizeMap.sidebar;

  return (
    <div
      className="no-print"
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: size.margin,
        overflow: 'hidden',
      }}
    >
      <iframe
        ref={iframeRef}
        title={`ad-${type}`}
        style={{
          width: size.width,
          height: size.height,
          border: 'none',
          maxWidth: '100%',
          display: 'block',
        }}
        sandbox="allow-scripts allow-popups allow-same-origin"
      />
    </div>
  );
}
