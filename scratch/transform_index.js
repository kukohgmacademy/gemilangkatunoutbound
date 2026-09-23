const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace external Fonts & CSS with local async loading
const oldCssBlockRegex = /<!-- Preconnect & Fonts -->[\s\S]*?rel="stylesheet">\s*<!-- Schema\.org/;
const newCssBlock = `<!-- Local Fonts & Async CSS -->
    <link rel="stylesheet" href="asset/css/fonts.css">
    <link rel="preload" href="asset/css/bootstrap-purged.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="asset/css/bootstrap-purged.min.css"></noscript>
    <link rel="preload" href="asset/css/fontawesome-subset.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="asset/css/fontawesome-subset.css"></noscript>
    <link rel="preload" href="asset/css/aos-local.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="asset/css/aos-local.css"></noscript>

    <!-- Schema.org`;

html = html.replace(oldCssBlockRegex, newCssBlock);

// Remove the separate AOS CSS link if still present
html = html.replace(/<!-- AOS CSS -->\s*<link href="https:\/\/unpkg\.com\/aos@[^"]+" rel="stylesheet">/g, '');

// 2. Adjust CSS variables and Contrast Rules
html = html.replace(/--text-dim:\s*#6c757d;/g, '--text-dim: #495057;');
html = html.replace(/color:\s*rgba\(128,\s*0,\s*0,\s*0\.1\)\s*!important;\s*\/\*\s*mission-number\s*\*\//g, 'color: rgba(128, 0, 0, 0.75) !important;');
// In case it's in .mission-number rule:
html = html.replace(/\.mission-number\s*{\s*color:\s*rgba\(128,\s*0,\s*0,\s*0\.1\)\s*!important;/g, '.mission-number {\n            color: rgba(128, 0, 0, 0.75) !important;');

// Fix footer footer .text-dim typo and ensure high contrast in footer
html = html.replace(/footer footer \.text-dim/g, 'footer .text-dim');

// Add CLS & Contrast overrides to <style>
const styleAdditions = `
        /* CLS Reservations & Contrast Fixes */
        .text-hero-subtitle {
            min-height: 80px;
        }
        @media (min-width: 768px) {
            .text-hero-subtitle {
                min-height: 56px;
            }
        }
        .hero-btn-group {
            min-height: 56px;
        }
        .bg-grid {
            contain: paint layout;
            pointer-events: none;
        }
        .text-warning.fst-italic {
            color: #995c00 !important;
        }
        footer .text-dim {
            color: #e2e8f0 !important;
        }
`;

html = html.replace('</style>', styleAdditions + '\n    </style>');

// 3. Navbar Logo & Link
html = html.replace(
    '<a class="navbar-brand d-flex align-items-center" href="javascript:void(0)" style="cursor: default;" aria-label="Homepage Gemilang Katun">\n                <img src="asset/img/logo/logo.png" alt="Logo Gemilang Katun" style="height: 40px; width: auto; object-fit: contain;" class="me-2">',
    '<a class="navbar-brand d-flex align-items-center" href="/" aria-label="Homepage Gemilang Katun">\n                <img src="asset/img/logo/logo.png" alt="Logo Gemilang Katun" width="100" height="48" style="height: 40px; width: auto; object-fit: contain;" class="me-2">'
);
// Also fallback regex if spacing slightly differs
html = html.replace(/href="javascript:void\(0\)"\s+style="cursor:\s*default;"\s+aria-label="Homepage Gemilang Katun"/g, 'href="/" aria-label="Homepage Gemilang Katun"');

// 4. Wrap <main id="main-content">
html = html.replace('</nav>\n\n    <section class="hero-section', '</nav>\n\n    <main id="main-content">\n    <section class="hero-section');
html = html.replace('</section>\n\n    <footer>', '</section>\n    </main>\n\n    <footer>');

// Also add hero-btn-group class to hero buttons container
html = html.replace(
    '<div class="d-flex justify-content-center gap-3 flex-wrap">',
    '<div class="d-flex justify-content-center gap-3 flex-wrap hero-btn-group">'
);

// 5. LCP Image fun-games-lapangan.webp
html = html.replace(
    '<img src="asset/img/kegiatan/home/fun-games-lapangan.webp"\n                                alt="Gemilang Katun Action" width="600" height="450" loading="lazy">',
    '<img src="asset/img/kegiatan/home/fun-games-lapangan.webp"\n                                srcset="asset/img/kegiatan/home/fun-games-lapangan-mobile.webp 480w, asset/img/kegiatan/home/fun-games-lapangan.webp 800w"\n                                sizes="(max-width: 576px) 100vw, (max-width: 992px) 500px, 800px"\n                                alt="Gemilang Katun Action" width="800" height="450" fetchpriority="high">'
);

// Established badge contrast
html = html.replace(
    '<small class="d-block text-white-50" style="font-size: 0.7rem;">ESTABLISHED</small>',
    '<small class="d-block text-white" style="font-size: 0.7rem; opacity: 0.9;">ESTABLISHED</small>'
);

// 6. Gallery images with proper width/height
html = html.replace(
    '<img src="asset/img/kegiatan/kegiatan-outbound-diarea-terbuka.webp" alt="Arena Urban"',
    '<img src="asset/img/kegiatan/kegiatan-outbound-diarea-terbuka.webp" alt="Arena Urban" width="444" height="250"'
);
html = html.replace(
    '<img src="asset/img/kegiatan/diskusi-panitia-untuk-acara-gathering.webp" alt="Equipment"',
    '<img src="asset/img/kegiatan/diskusi-panitia-untuk-acara-gathering.webp" alt="Equipment" width="444" height="250"'
);
html = html.replace(
    '<img src="asset/img/kegiatan/kegiatan-outbound-bersama.webp" alt="Briefing" width="400" height="250"',
    '<img src="asset/img/kegiatan/kegiatan-outbound-bersama.webp" alt="Briefing" width="444" height="250"'
);
html = html.replace(
    '<img src="asset/img/kegiatan/suasana-gathering-instansi-pemerintah.webp" alt="Action Shot" width="400" height="250"',
    '<img src="asset/img/kegiatan/suasana-gathering-instansi-pemerintah.webp" alt="Action Shot" width="444" height="250"'
);
html = html.replace(
    '<img src="asset/img/kegiatan/lokasi-gathering-malang-pegungungan.webp" alt="Jungle" width="400" height="250"',
    '<img src="asset/img/kegiatan/lokasi-gathering-malang-pegungungan.webp" alt="Jungle" width="444" height="250"'
);

// Card package images
html = html.replace(
    '<img src="asset/img/kegiatan/home/fun-games.webp" class="card-img-top"',
    '<img src="asset/img/kegiatan/home/fun-games.webp" class="card-img-top" width="352" height="198"'
);
html = html.replace(
    '<img src="asset/img/kegiatan/home/rafting.webp" class="card-img-top"',
    '<img src="asset/img/kegiatan/home/rafting.webp" class="card-img-top" width="352" height="198"'
);
html = html.replace(
    '<img src="asset/img/kegiatan/home/corporate-outbound.webp" class="card-img-top"',
    '<img src="asset/img/kegiatan/home/corporate-outbound.webp" class="card-img-top" width="352" height="198"'
);

// 7. Heading semantics
// CARA RESERVASI JADWAL steps (H4 -> H3 with class h4)
html = html.replace(
    '<h4 class="text-white mb-3 mt-2"><i class="fas fa-list-alt step-icon"\n                                aria-hidden="true"></i>PILIH PAKET</h4>',
    '<h3 class="h4 text-white mb-3 mt-2"><i class="fas fa-list-alt step-icon"\n                                aria-hidden="true"></i>PILIH PAKET</h3>'
);
html = html.replace(
    '<h4 class="text-white mb-3 mt-2"><i class="fas fa-calendar-check step-icon"\n                                aria-hidden="true"></i>BOOKING TANGGAL</h4>',
    '<h3 class="h4 text-white mb-3 mt-2"><i class="fas fa-calendar-check step-icon"\n                                aria-hidden="true"></i>BOOKING TANGGAL</h3>'
);
html = html.replace(
    '<h4 class="text-white mb-3 mt-2"><i class="fas fa-gamepad step-icon"\n                                aria-hidden="true"></i>DATANG & MAIN</h4>',
    '<h3 class="h4 text-white mb-3 mt-2"><i class="fas fa-gamepad step-icon"\n                                aria-hidden="true"></i>DATANG & MAIN</h3>'
);

// Article card titles (H4 -> H3 with class h4)
html = html.replace(
    /<h4 class="card-title mb-3" style="font-size: 1\.25rem;">([\s\S]*?)<\/h4>/g,
    '<h3 class="h4 card-title mb-3" style="font-size: 1.25rem;">$1</h3>'
);

// Testimonial names (H5 -> H3 with class h5)
html = html.replace(
    /<h5 class="text-white mb-0" style="font-size: 1\.1rem;">([\s\S]*?)<\/h5>/g,
    '<h3 class="h5 text-white mb-0" style="font-size: 1.1rem;">$1</h3>'
);

// Basecamp (H5 -> H3 with class h5)
html = html.replace(
    '<h5 class="text-dark">LOKASI BASECAMP</h5>',
    '<h3 class="h5 text-dark">LOKASI BASECAMP</h3>'
);

// Footer headings (H4 -> H3, H5 -> H4)
html = html.replace(
    '<h4 class="text-white mb-4 d-flex align-items-center">',
    '<h3 class="h4 text-white mb-4 d-flex align-items-center">'
);
html = html.replace(
    '</h4>\n                    <p class="text-dim small mb-4 lh-lg">Gemilang Katun Outbound',
    '</h3>\n                    <p class="text-dim small mb-4 lh-lg">Gemilang Katun Outbound'
);
html = html.replace(
    /<h5 class="text-white mb-4">([\s\S]*?)<\/h5>/g,
    '<h4 class="h5 text-white mb-4">$1</h4>'
);

// 8. Newsletter Button Accessibility
html = html.replace(
    '<button class="btn btn-primary-custom" type="button"\n                            onclick="const email = this.previousElementSibling.value;',
    '<button class="btn btn-primary-custom" type="button" aria-label="Kirim email"\n                            onclick="const email = this.previousElementSibling.value;'
);

// 9. Footer Logo & Links
html = html.replace(
    '<img src="asset/img/logo/logo.png" alt="Logo Gemilang Katun"\n                            style="height: 40px; width: auto; margin-right: 15px; object-fit: contain;">',
    '<img src="asset/img/logo/logo.png" alt="Logo Gemilang Katun" width="100" height="48"\n                            style="height: 40px; width: auto; margin-right: 15px; object-fit: contain;">'
);

html = html.replace(
    '<a href="#" class="text-dim text-decoration-none">Kebijakan Privasi</a>',
    '<a href="kebijakan-privasi.html" class="text-dim text-decoration-none">Kebijakan Privasi</a>'
);
html = html.replace(
    '<a href="#" class="text-dim text-decoration-none">Syarat & Ketentuan</a>',
    '<a href="syarat-ketentuan.html" class="text-dim text-decoration-none">Syarat & Ketentuan</a>'
);
html = html.replace(
    '<a href="#" class="text-dim text-decoration-none">Kebijakan Cookie</a>',
    '<a href="kebijakan-cookie.html" class="text-dim text-decoration-none">Kebijakan Cookie</a>'
);

// 10. Bootstrap JS & AOS JS replacement
html = html.replace(
    '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" defer></script>',
    '<script src="asset/js/bootstrap.bundle.min.js" defer></script>'
);

const oldAosScriptRegex = /<!-- AOS JS -->\s*<script src="https:\/\/unpkg\.com\/aos@[^"]+"><\/script>\s*<script>\s*AOS\.init\([\s\S]*?\);\s*<\/script>/;
const newAosScript = `<!-- Modern Non-Reflow Scroll Animations (Replaces heavy AOS.js geometry reads) -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            if ('IntersectionObserver' in window) {
                const aosObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('aos-animate');
                            aosObserver.unobserve(entry.target);
                        }
                    });
                }, { rootMargin: '0px 0px -50px 0px' });
                document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));
            } else {
                document.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
            }
        });
    </script>`;

html = html.replace(oldAosScriptRegex, newAosScript);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html!');
