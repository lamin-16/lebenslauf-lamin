import sharp from 'sharp';

const input = 'public/pwa-icon.png';

Promise.all([
  sharp(input).resize(192, 192).toFile('public/icon-192.png'),
  sharp(input).resize(512, 512).toFile('public/icon-512.png'),
]).then(() => console.log('Icons created!')).catch(err => console.error(err));
