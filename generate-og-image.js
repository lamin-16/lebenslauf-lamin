import sharp from 'sharp';

const input = 'public/pwa-icon.png';
const output = 'public/og-image.png';

sharp(input)
  .resize(400, 400) // تصغير الصورة الأصلية
  .toBuffer()
  .then(iconBuffer => {
    return sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 3,
        background: '#0f1b3d' // خلفية كحلية
      }
    })
    .composite([
      {
        input: iconBuffer,
        gravity: 'center' // توسيط الصورة
      }
    ])
    .png()
    .toFile(output);
  })
  .then(() => console.log('OG Image created: ' + output))
  .catch(err => console.error('Fehler:', err));
