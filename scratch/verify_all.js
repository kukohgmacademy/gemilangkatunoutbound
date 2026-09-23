const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

console.log('--- VERIFICATION CHECKS ---');

// 1. External CDN checks
const externalCdns = [
  'cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css',
  'cdnjs.cloudflare.com/ajax/libs/font-awesome',
  'fonts.googleapis.com',
  'unpkg.com/aos'
];
externalCdns.forEach(cdn => {
  const present = html.includes(cdn);
  console.log(`[CDN] ${cdn}: ${present ? 'FAILED (still present)' : 'PASSED (removed)'}`);
});

// 2. Local CSS & Font files
const localAssets = [
  'asset/css/fonts.css',
  'asset/css/bootstrap-purged.min.css',
  'asset/css/fontawesome-subset.css',
  'asset/css/aos-local.css',
  'asset/js/bootstrap.bundle.min.js',
  'kebijakan-privasi.html',
  'syarat-ketentuan.html',
  'kebijakan-cookie.html'
];
localAssets.forEach(a => {
  console.log(`[FILE] ${a}: ${fs.existsSync(a) ? 'PASSED (exists)' : 'FAILED (missing)'}`);
});

// 3. Landmark <main>
const hasMain = html.includes('<main id="main-content">') && html.includes('</main>');
console.log(`[LANDMARK] <main id="main-content">: ${hasMain ? 'PASSED' : 'FAILED'}`);

// 4. Logo Link & Dimensions
const logoNavPass = html.includes('href="/" aria-label="Homepage Gemilang Katun"') && html.includes('width="100" height="48"');
console.log(`[LOGO] navbar logo href="/" and dimensions: ${logoNavPass ? 'PASSED' : 'FAILED'}`);

// 5. LCP Image
const lcpPass = html.includes('fun-games-lapangan.webp') && html.includes('fetchpriority="high"') && !html.includes('fun-games-lapangan.webp" alt="Gemilang Katun Action" width="600" height="450" loading="lazy"');
console.log(`[LCP] fun-games-lapangan fetchpriority="high" without lazy: ${lcpPass ? 'PASSED' : 'FAILED'}`);

// 6. Newsletter Button
const buttonPass = html.includes('aria-label="Kirim email"');
console.log(`[ACCESSIBILITY] newsletter button aria-label: ${buttonPass ? 'PASSED' : 'FAILED'}`);

// 7. Policy Links in Footer
const policyPass = html.includes('href="kebijakan-privasi.html"') && html.includes('href="syarat-ketentuan.html"') && html.includes('href="kebijakan-cookie.html"');
console.log(`[SEO] Footer policy links: ${policyPass ? 'PASSED' : 'FAILED'}`);

// 8. Node modules existence
const nodeModulesPass = !fs.existsSync('node_modules');
console.log(`[CLEANUP] node_modules removed: ${nodeModulesPass ? 'PASSED' : 'FAILED'}`);

// 9. Heading structure
console.log('\n--- HEADING CHECK ---');
const regex = /<(h[1-6])\b([^>]*)>([\s\S]*?)<\/\1>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  const tag = match[1].toUpperCase();
  const text = match[3].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  const cls = (match[2].match(/class="([^"]*)"/) || [])[1] || '';
  console.log(`${tag} : ${text.substring(0, 45)} | class: ${cls}`);
}
