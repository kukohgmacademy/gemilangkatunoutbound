const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function fetchText(url) {
  return fetchBuffer(url).then(b => b.toString('utf8'));
}

async function main() {
  console.log('Downloading Google Fonts CSS...');
  const googleFontsUrl = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Inter:wght@300;400;600&display=swap';
  let css = await fetchText(googleFontsUrl);

  // Extract all font URLs
  const urlRegex = /url\((https:[^)]+)\)/g;
  let match;
  const urls = new Set();
  while ((match = urlRegex.exec(css)) !== null) {
    urls.add(match[1]);
  }

  console.log('Found ' + urls.size + ' font files in Google Fonts CSS.');

  // Download each font file
  let fontIndex = 0;
  for (const fontUrl of urls) {
    fontIndex++;
    const filename = path.basename(new URL(fontUrl).pathname);
    const localPath = path.join('asset', 'fonts', filename);
    if (!fs.existsSync(localPath)) {
      console.log(`Downloading ${fontIndex}/${urls.size}: ${filename}`);
      const buf = await fetchBuffer(fontUrl);
      fs.writeFileSync(localPath, buf);
    }
    // Replace URL in CSS with relative local path
    css = css.replace(new RegExp(fontUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), `../fonts/${filename}`);
  }

  // Ensure font-display: swap is on all @font-face rules
  css = css.replace(/@font-face\s*{([^}]+)}/g, (m, content) => {
    if (!content.includes('font-display')) {
      return `@font-face {\n  font-display: swap;${content}}`;
    }
    return m;
  });

  fs.writeFileSync(path.join('asset', 'css', 'fonts.css'), css, 'utf8');
  console.log('Saved asset/css/fonts.css');

  // Now FontAwesome woff2 files
  console.log('Downloading FontAwesome font files...');
  const faSolidUrl = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2';
  const faBrandsUrl = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2';

  const solidBuf = await fetchBuffer(faSolidUrl);
  fs.writeFileSync(path.join('asset', 'fonts', 'fa-solid-900.woff2'), solidBuf);
  console.log('Saved asset/fonts/fa-solid-900.woff2 (' + solidBuf.length + ' bytes)');

  const brandsBuf = await fetchBuffer(faBrandsUrl);
  fs.writeFileSync(path.join('asset', 'fonts', 'fa-brands-400.woff2'), brandsBuf);
  console.log('Saved asset/fonts/fa-brands-400.woff2 (' + brandsBuf.length + ' bytes)');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
