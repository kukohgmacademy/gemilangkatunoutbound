const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchText(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching AOS CSS...');
  const aosCss = await fetchText('https://unpkg.com/aos@2.3.1/dist/aos.css');
  fs.writeFileSync(path.join('asset', 'css', 'aos-local.css'), aosCss, 'utf8');
  console.log('Saved asset/css/aos-local.css (' + aosCss.length + ' bytes)');

  console.log('Fetching Bootstrap CSS...');
  const bsCss = await fetchText('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
  fs.writeFileSync(path.join('asset', 'css', 'bootstrap.min.css'), bsCss, 'utf8');
  console.log('Saved asset/css/bootstrap.min.css (' + bsCss.length + ' bytes)');
}

main().catch(console.error);
