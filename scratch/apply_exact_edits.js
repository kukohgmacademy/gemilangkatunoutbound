const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Navbar logo dimensions
html = html.replace(
  '<img src="asset/img/logo/logo.png" alt="Logo Gemilang Katun"\r\n                    style="height: 48px; width: auto; object-fit: contain;" class="me-2">',
  '<img src="asset/img/logo/logo.png" alt="Logo Gemilang Katun" width="100" height="48"\r\n                    style="height: 48px; width: auto; object-fit: contain;" class="me-2">'
);
html = html.replace(
  '<img src="asset/img/logo/logo.png" alt="Logo Gemilang Katun"\n                    style="height: 48px; width: auto; object-fit: contain;" class="me-2">',
  '<img src="asset/img/logo/logo.png" alt="Logo Gemilang Katun" width="100" height="48"\n                    style="height: 48px; width: auto; object-fit: contain;" class="me-2">'
);

// 2. Wrap <main id="main-content">
if (!html.includes('<main id="main-content">')) {
  html = html.replace('</nav>\r\n\r\n    <section class="hero-section', '</nav>\r\n\r\n    <main id="main-content">\r\n    <section class="hero-section');
  html = html.replace('</nav>\n\n    <section class="hero-section', '</nav>\n\n    <main id="main-content">\n    <section class="hero-section');
}
if (!html.includes('</main>')) {
  html = html.replace('</section>\r\n\r\n    <footer>', '</section>\r\n    </main>\r\n\r\n    <footer>');
  html = html.replace('</section>\n\n    <footer>', '</section>\n    </main>\n\n    <footer>');
}

// 3. LCP image fun-games-lapangan.webp
html = html.replace(
  '<img src="asset/img/kegiatan/home/fun-games-lapangan.webp"\r\n                                alt="Gemilang Katun Action" width="600" height="450" loading="lazy">',
  '<img src="asset/img/kegiatan/home/fun-games-lapangan.webp"\r\n                                srcset="asset/img/kegiatan/home/fun-games-lapangan-mobile.webp 480w, asset/img/kegiatan/home/fun-games-lapangan.webp 800w"\r\n                                sizes="(max-width: 576px) 100vw, (max-width: 992px) 500px, 800px"\r\n                                alt="Gemilang Katun Action" width="800" height="450" fetchpriority="high">'
);
html = html.replace(
  '<img src="asset/img/kegiatan/home/fun-games-lapangan.webp"\n                                alt="Gemilang Katun Action" width="600" height="450" loading="lazy">',
  '<img src="asset/img/kegiatan/home/fun-games-lapangan.webp"\n                                srcset="asset/img/kegiatan/home/fun-games-lapangan-mobile.webp 480w, asset/img/kegiatan/home/fun-games-lapangan.webp 800w"\n                                sizes="(max-width: 576px) 100vw, (max-width: 992px) 500px, 800px"\n                                alt="Gemilang Katun Action" width="800" height="450" fetchpriority="high">'
);

// 4. Step cards H4 -> H3
html = html.replace(
  '<h4 class="text-white mb-3 mt-2"><i class="fas fa-list-alt step-icon"\r\n                                aria-hidden="true"></i>PILIH PAKET</h4>',
  '<h3 class="h4 text-white mb-3 mt-2"><i class="fas fa-list-alt step-icon"\r\n                                aria-hidden="true"></i>PILIH PAKET</h3>'
);
html = html.replace(
  '<h4 class="text-white mb-3 mt-2"><i class="fas fa-list-alt step-icon"\n                                aria-hidden="true"></i>PILIH PAKET</h4>',
  '<h3 class="h4 text-white mb-3 mt-2"><i class="fas fa-list-alt step-icon"\n                                aria-hidden="true"></i>PILIH PAKET</h3>'
);

html = html.replace(
  '<h4 class="text-white mb-3 mt-2"><i class="fas fa-calendar-check step-icon"\r\n                                aria-hidden="true"></i>BOOKING TANGGAL</h4>',
  '<h3 class="h4 text-white mb-3 mt-2"><i class="fas fa-calendar-check step-icon"\r\n                                aria-hidden="true"></i>BOOKING TANGGAL</h3>'
);
html = html.replace(
  '<h4 class="text-white mb-3 mt-2"><i class="fas fa-calendar-check step-icon"\n                                aria-hidden="true"></i>BOOKING TANGGAL</h4>',
  '<h3 class="h4 text-white mb-3 mt-2"><i class="fas fa-calendar-check step-icon"\n                                aria-hidden="true"></i>BOOKING TANGGAL</h3>'
);

html = html.replace(
  '<h4 class="text-white mb-3 mt-2"><i class="fas fa-gamepad step-icon"\r\n                                aria-hidden="true"></i>DATANG & MAIN</h4>',
  '<h3 class="h4 text-white mb-3 mt-2"><i class="fas fa-gamepad step-icon"\r\n                                aria-hidden="true"></i>DATANG & MAIN</h3>'
);
html = html.replace(
  '<h4 class="text-white mb-3 mt-2"><i class="fas fa-gamepad step-icon"\n                                aria-hidden="true"></i>DATANG & MAIN</h4>',
  '<h3 class="h4 text-white mb-3 mt-2"><i class="fas fa-gamepad step-icon"\n                                aria-hidden="true"></i>DATANG & MAIN</h3>'
);

// 5. LOKASI BASECAMP H5 -> H3
html = html.replace(
  '<h5 class="text-dark"><i class="fas fa-map-marker-alt text-blue me-2"\r\n                                    aria-hidden="true"></i>LOKASI BASECAMP</h5>',
  '<h3 class="h5 text-dark"><i class="fas fa-map-marker-alt text-blue me-2"\r\n                                    aria-hidden="true"></i>LOKASI BASECAMP</h3>'
);
html = html.replace(
  '<h5 class="text-dark"><i class="fas fa-map-marker-alt text-blue me-2"\n                                    aria-hidden="true"></i>LOKASI BASECAMP</h5>',
  '<h3 class="h5 text-dark"><i class="fas fa-map-marker-alt text-blue me-2"\n                                    aria-hidden="true"></i>LOKASI BASECAMP</h3>'
);

// 6. Newsletter button aria-label
html = html.replace(
  '<button class="btn btn-primary-custom" type="button"\r\n                            onclick="const email = this.previousElementSibling.value;',
  '<button class="btn btn-primary-custom" type="button" aria-label="Kirim email"\r\n                            onclick="const email = this.previousElementSibling.value;'
);
html = html.replace(
  '<button class="btn btn-primary-custom" type="button"\n                            onclick="const email = this.previousElementSibling.value;',
  '<button class="btn btn-primary-custom" type="button" aria-label="Kirim email"\n                            onclick="const email = this.previousElementSibling.value;'
);

// 7. Footer logo and closing h3
html = html.replace(
  '<img src="asset/img/logo/logo.png" alt="Logo Gemilang Katun"\r\n                            style="height: 40px; width: auto; margin-right: 15px; object-fit: contain;">\r\n                        GEMILANG KATUN\r\n                    </h4>',
  '<img src="asset/img/logo/logo.png" alt="Logo Gemilang Katun" width="100" height="48"\r\n                            style="height: 40px; width: auto; margin-right: 15px; object-fit: contain;">\r\n                        GEMILANG KATUN\r\n                    </h3>'
);
html = html.replace(
  '<img src="asset/img/logo/logo.png" alt="Logo Gemilang Katun"\n                            style="height: 40px; width: auto; margin-right: 15px; object-fit: contain;">\n                        GEMILANG KATUN\n                    </h4>',
  '<img src="asset/img/logo/logo.png" alt="Logo Gemilang Katun" width="100" height="48"\n                            style="height: 40px; width: auto; margin-right: 15px; object-fit: contain;">\n                        GEMILANG KATUN\n                    </h3>'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Applied exact edits successfully!');
