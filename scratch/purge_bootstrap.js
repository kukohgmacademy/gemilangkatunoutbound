const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const bsCss = fs.readFileSync('asset/css/bootstrap.min.css', 'utf8');

// Extract all class names from index.html
const classMatches = html.match(/class=["']([^"']+)["']/g) || [];
const usedClasses = new Set(['show', 'fade', 'collapse', 'collapsing', 'active', 'collapsed', 'carousel-item-start', 'carousel-item-end', 'carousel-item-next', 'carousel-item-prev', 'carousel-fade']);
classMatches.forEach(m => {
  const classes = m.replace(/class=["']/, '').replace(/["']$/, '').trim().split(/\s+/);
  classes.forEach(c => {
    if (c) usedClasses.add(c);
  });
});

console.log('Total used classes in index.html:', usedClasses.size);

// Simple CSS parser for minified CSS
// We want to keep:
// 1. :root and CSS variables
// 2. Base element styles (html, body, *, etc.)
// 3. Grid system classes used (container, row, col-*, etc.)
// 4. Utility classes used (d-flex, py-*, px-*, text-*, etc.)
// 5. Media queries containing kept rules
// Or we can safely keep all rules whose selectors only reference used classes or base elements.

function selectorMatches(sel) {
  // If it's a root or universal or base element
  if (sel.startsWith(':root') || sel.startsWith('*') || sel === 'html' || sel === 'body') return true;
  // If sel has a class
  const classInSel = sel.match(/\.([a-zA-Z0-9_-]+)/g);
  if (!classInSel) {
    // tag-only selector like h1, p, a, table, img, etc.
    const tags = ['h1','h2','h3','h4','h5','h6','p','a','img','button','input','svg','small','strong','ul','li','b','i','section','nav','footer','span','div'];
    const selTag = sel.split(/[\s>+~:]/)[0];
    return tags.includes(selTag);
  }
  // If it has classes, AT LEAST ONE or ALL must be used?
  // In Bootstrap, compound selectors like .col-lg-6, .d-flex.align-items-center:
  // Every class part in the selector should be in usedClasses for it to be relevant
  return classInSel.some(cls => usedClasses.has(cls.slice(1)));
}

// Alternatively, let's test if PurgeCSS package can be run or if we do standard regex rule filtering:
// Let's split by rule
let purged = [];
let idx = 0;
while (idx < bsCss.length) {
  if (bsCss.startsWith('@media', idx) || bsCss.startsWith('@supports', idx) || bsCss.startsWith('@keyframes', idx)) {
    // find opening brace
    const openBrace = bsCss.indexOf('{', idx);
    if (openBrace === -1) break;
    // find matching closing brace
    let depth = 1;
    let curr = openBrace + 1;
    while (curr < bsCss.length && depth > 0) {
      if (bsCss[curr] === '{') depth++;
      else if (bsCss[curr] === '}') depth--;
      curr++;
    }
    const mediaBlock = bsCss.substring(idx, curr);
    const mediaHeader = bsCss.substring(idx, openBrace).trim();
    if (mediaHeader.startsWith('@keyframes')) {
      purged.push(mediaBlock);
    } else {
      // filter rules inside media block
      const innerContent = bsCss.substring(openBrace + 1, curr - 1);
      const innerRules = innerContent.split('}');
      let keptInner = [];
      for (const ir of innerRules) {
        if (!ir.trim()) continue;
        const parts = ir.split('{');
        if (parts.length === 2) {
          const sels = parts[0].split(',');
          const matchingSels = sels.filter(selectorMatches);
          if (matchingSels.length > 0) {
            keptInner.push(matchingSels.join(',') + '{' + parts[1] + '}');
          }
        }
      }
      if (keptInner.length > 0) {
        purged.push(mediaHeader + '{' + keptInner.join('') + '}');
      }
    }
    idx = curr;
  } else {
    // Normal rule
    const closeBrace = bsCss.indexOf('}', idx);
    if (closeBrace === -1) break;
    const rule = bsCss.substring(idx, closeBrace + 1);
    const parts = rule.split('{');
    if (parts.length === 2) {
      const sels = parts[0].split(',');
      const matchingSels = sels.filter(selectorMatches);
      if (matchingSels.length > 0) {
        purged.push(matchingSels.join(',') + '{' + parts[1]);
      }
    }
    idx = closeBrace + 1;
  }
}

const resultCss = purged.join('');
console.log('Original Bootstrap size:', bsCss.length, 'bytes');
console.log('Purged Bootstrap size:', resultCss.length, 'bytes');

fs.writeFileSync('asset/css/bootstrap-purged.min.css', resultCss, 'utf8');
console.log('Saved asset/css/bootstrap-purged.min.css');
