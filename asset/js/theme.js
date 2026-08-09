const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\GemilangKatonOutboond';

const allOverrides = `
        /* --- LIGHT MAROON THEME OVERRIDES --- */
        .text-white, .text-light { color: var(--text-light) !important; }
        .text-grey { color: var(--text-dim) !important; }
        
        .btn-outline-light { border-color: var(--accent-blue) !important; color: var(--text-light) !important; }
        .btn-outline-light:hover { background-color: var(--accent-blue) !important; color: #ffffff !important; }
        
        /* Stats Section Fixes */
        .stats-section .stat-label { color: #ffffff !important; }
        .stats-section .stat-number { color: #ff4d4d !important; text-shadow: 1px 1px 3px rgba(0,0,0,0.5); }
        
        /* Page Header fixes */
        .page-header p.text-light { color: var(--text-dim) !important; }
        
        /* Flexbox for equal height cards in paket.html */
        .pricing-card { display: flex !important; flex-direction: column !important; height: 100% !important; }
        .pricing-card .mt-auto { margin-top: auto !important; width: 100%; }
        
        :root { --text-grey: #6c757d; }
`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Convert btn-outline-light to btn-outline-custom
    content = content.replace(/btn-outline-light/g, 'btn-outline-custom');
    
    // Ensure all pricing row containers have align-items-stretch
    content = content.replace(/class="row g-4 justify-content-center"/g, 'class="row g-4 justify-content-center align-items-stretch"');
    content = content.replace(/class="row g-4"/g, 'class="row g-4 align-items-stretch"');
    
    // Also in index.html, pricing cards
    content = content.replace(/class="pricing-card h-100/g, 'class="pricing-card h-100 d-flex flex-column');
    content = content.replace(/class="p-4 d-flex flex-column flex-grow-1"/g, 'class="p-4 d-flex flex-column flex-grow-1" style="flex: 1;"');

    // Force specific fix for text-light on specific elements
    content = content.replace(/class="lead text-light"/g, 'class="lead text-dim"');
    content = content.replace(/class="text-light lead"/g, 'class="text-dim lead"');
    content = content.replace(/class="text-light mb-0"/g, 'class="text-dim mb-0"');
    content = content.replace(/class="text-light mb-0 ps-3"/g, 'class="text-dim mb-0 ps-3"');
    
    // For blog.html, add JS for search (only if not already there)
    if (filePath.endsWith('blog.html') && !content.includes('performSearch')) {
        const searchScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
    const searchInputs = document.querySelectorAll('.search-input, .search-input-field');
    const searchBtns = document.querySelectorAll('.search-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    function performSearch(query) {
        query = query.toLowerCase().trim();
        blogCards.forEach(card => {
            const title = card.getAttribute('data-title') ? card.getAttribute('data-title').toLowerCase() : '';
            const excerptElem = card.querySelector('.blog-excerpt');
            const excerpt = excerptElem ? excerptElem.textContent.toLowerCase() : '';
            const titleElem = card.querySelector('.blog-title');
            const titleText = titleElem ? titleElem.textContent.toLowerCase() : '';
            
            if (title.includes(query) || excerpt.includes(query) || titleText.includes(query)) {
                card.style.display = ''; 
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => performSearch(e.target.value));
        input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') performSearch(e.target.value);
        });
    });

    searchBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            if(input) performSearch(input.value);
        });
    });
});
</script>
</body>`;
        content = content.replace('</body>', searchScript);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
}

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        processFile(path.join(dir, file));
        console.log("Processed:", file);
    }
});
console.log("Done");
