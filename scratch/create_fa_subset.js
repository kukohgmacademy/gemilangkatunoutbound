const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching FontAwesome CSS...');
  const faCss = await fetchText('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

  const icons = [
    'arrow-up', 'whatsapp', 'bars', 'shield-alt', 'tags', 'images', 'crosshairs',
    'list-alt', 'calendar-check', 'gamepad', 'search-plus', 'check', 'calendar-alt',
    'arrow-right', 'star', 'star-half-alt', 'parking', 'shower', 'mosque',
    'utensils', 'map-marker-alt', 'paper-plane', 'chevron-right', 'phone-alt',
    'envelope', 'facebook-f', 'instagram', 'tiktok', 'youtube'
  ];

  // Base rules
  let subsetCss = `/* FontAwesome Subset - Gemilang Katun */
@font-face {
  font-family: 'Font Awesome 6 Free';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url('../fonts/fa-solid-900.woff2') format('woff2');
}
@font-face {
  font-family: 'Font Awesome 6 Brands';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('../fonts/fa-brands-400.woff2') format('woff2');
}
.fa,.fas,.fab{
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: var(--fa-display,inline-block);
  font-style: normal;
  font-variant: normal;
  line-height: 1;
  text-rendering: auto;
}
.fas,.fa-solid{
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
}
.fab,.fa-brands{
  font-family: 'Font Awesome 6 Brands';
  font-weight: 400;
}
`;

  // Extract icon rules from original CSS
  icons.forEach(name => {
    // Look for .fa-name:before{content:"..."}
    const regex = new RegExp(`\\.fa-${name}(?::before|::after)?{[^}]+}`, 'g');
    let m;
    while ((m = regex.exec(faCss)) !== null) {
      subsetCss += m[0] + '\n';
    }
  });

  fs.writeFileSync(path.join('asset', 'css', 'fontawesome-subset.css'), subsetCss, 'utf8');
  console.log('Saved asset/css/fontawesome-subset.css, length:', subsetCss.length);
}

main().catch(console.error);
