const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const regex = /<(h[1-6])\b([^>]*)>([\s\S]*?)<\/\1>/gi;
let match;
while ((match = regex.exec(content)) !== null) {
  const tag = match[1];
  const attrs = match[2];
  const text = match[3].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  const classMatch = attrs.match(/class="([^"]*)"/);
  console.log(tag.toUpperCase() + ' : ' + text.substring(0, 50) + ' | class: ' + (classMatch ? classMatch[1] : ''));
}
