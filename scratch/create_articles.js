const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\gemilangkatunoutbound-main';
// We must use 'outbound-malang-berdasarkan-jenis-peserta.html' as the template since the user says that one has the correct layout!
// Wait, the user said "kamu bisa liat strukturnya pada halaman artikel @[c:\gemilangkatunoutbound-main\outbound-malang-berdasarkan-jenis-peserta.html]"
// Let's use THAT file as the template to ensure the layout is exactly what they want.
const templatePath = path.join(baseDir, 'outbound-malang-berdasarkan-jenis-peserta.html');
const template = fs.readFileSync(templatePath, 'utf8');

function createArticle({ title, h1, meta_title, slug, meta_desc, content_raw, img1, alt1, img2, alt2, popular, related, date_str, table_data }) {
    let html = template;

    // Meta tags
    html = html.replace(/<title>.*?<\/title>/s, `<title>${meta_title} | GEMILANG KATUN</title>`);
    html = html.replace(/<meta name="description"\s+content="[^"]*">/s, `<meta name="description"\n        content="${meta_desc}">`);
    html = html.replace(/<link rel="canonical"\s+href="[^"]*">/s, `<link rel="canonical"\n        href="https://gemilangkatunoutbound.web.id/${slug}.html">`);
    html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${meta_title}">`);
    html = html.replace(/<meta property="og:description"\s+content="[^"]*">/s, `<meta property="og:description"\n        content="${meta_desc}">`);
    html = html.replace(/<meta property="og:url"\s+content="[^"]*">/s, `<meta property="og:url"\n        content="https://gemilangkatunoutbound.web.id/${slug}.html">`);
    html = html.replace(/<meta property="og:image"\s+content="[^"]*">/s, `<meta property="og:image"\n        content="https://gemilangkatunoutbound.web.id/asset/img/kegiatan/${img1}">`);
    html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${meta_title}">`);
    html = html.replace(/<meta name="twitter:description"\s+content="[^"]*">/s, `<meta name="twitter:description"\n        content="${meta_desc}">`);
    html = html.replace(/<meta name="twitter:image"\s+content="[^"]*">/s, `<meta name="twitter:image"\n        content="https://gemilangkatunoutbound.web.id/asset/img/kegiatan/${img1}">`);

    // Schema
    const article_schema = `{
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://gemilangkatunoutbound.web.id/${slug}.html"
      },
      "headline": "${h1}",
      "description": "${meta_desc}",
      "image": "https://gemilangkatunoutbound.web.id/asset/img/kegiatan/${img1}",
      "author": {
        "@type": "Person",
        "name": "MEGA ANGGUN"
      },
      "publisher": {
        "@type": "Organization",
        "name": "GEMILANG KATUN",
        "logo": {
          "@type": "ImageObject",
          "url": "https://gemilangkatunoutbound.web.id/asset/img/logo/logo.png"
        }
      },
      "datePublished": "2026-09-19",
      "dateModified": "2026-09-19"
    }`;

    const breadcrumb_schema = `{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://gemilangkatunoutbound.web.id/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://gemilangkatunoutbound.web.id/blog.html"
      },{
        "@type": "ListItem",
        "position": 3,
        "name": "${meta_title}"
      }]
    }`;

    const lines = content_raw.split('\n'); // FIXED: split by actual newline
    const questions = [];
    let current_q = null;
    let current_a = [];

    for (const line of lines) {
        if (line.trim().endsWith('?')) {
            if (current_q) questions.push({ q: current_q, a: current_a.join(' ').trim() });
            current_q = line.trim();
            current_a = [];
        } else if (line.trim() && !line.trim().startsWith('[')) {
            if (current_q) current_a.push(line.trim());
        }
    }
    if (current_q) questions.push({ q: current_q, a: current_a.join(' ').trim() });

    let faq_schema = '';
    if (questions.length > 0) {
        const faq_items = questions.map(item => `{
            "@type": "Question",
            "name": "${item.q}",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "${item.a.replace(/<[^>]+>/g, '').replace(/"/g, '\\"')}"
            }
        }`);
        faq_schema = `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [${faq_items.join(',')}]
    }
    </script>`;
    }

    html = html.replace(/<script type="application\/ld\+json">.*?@type": "Article".*?<\/script>/s, `<script type="application/ld+json">\n    ${article_schema}\n    </script>`);
    html = html.replace(/<script type="application\/ld\+json">.*?@type": "BreadcrumbList".*?<\/script>/s, `<script type="application/ld+json">\n    ${breadcrumb_schema}\n    </script>\n    ${faq_schema}`);

    // Breadcrumb & Title
    html = html.replace(/<li class="breadcrumb-item active" aria-current="page">[^<]*<\/li>/, `<li class="breadcrumb-item active" aria-current="page">${title}</li>`);
    html = html.replace(/<h1 class="display-5 fw-bold text-white mb-4"[^>]*>.*?<\/h1>/, `<h1 class="display-5 fw-bold text-white mb-4" style="text-transform: uppercase;">${h1}</h1>`);
    html = html.replace(/<span class="me-3"><i class="fas fa-calendar-alt"><\/i>[^<]*<\/span>/, `<span class="me-3"><i class="fas fa-calendar-alt"></i> ${date_str}</span>`);
    
    // Replace the main image
    html = html.replace(/<img src="asset\/img\/kegiatan\/[^"]*"\s*alt="[^"]*"( class="article-img")?>/s, `<img src="asset/img/kegiatan/${img1}"\n                            alt="${alt1}" class="article-img">`);

    // Build Content
    let content_html = [];
    
    // TOC
    const toc_html = questions.map(item => {
        const q_id = item.q.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<li><a href="#${q_id}">${item.q}</a></li>`;
    });
    content_html.push(`<div class="toc-box mb-4">
                                <h4 class="toc-title"><i class="fas fa-list-ul me-2"></i>Daftar Isi</h4>
                                <ul class="toc-list">
                                    ${toc_html.join('\n')}
                                </ul>
                            </div>`);

    let img_inserted = false;
    let paragraphs = [];
    let current_p = [];

    function render_paragraphs() {
        let res = "";
        for (const p of paragraphs) {
            if (p.trim() === 'TABLE1_MARKER' || p.trim() === 'TABLE2_MARKER' || p.trim() === 'TABLE3_MARKER') {
                res += p.trim() + '\n';
            } else {
                res += `<p>${p}</p>\n`;
            }
        }
        paragraphs = [];
        return res;
    }

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        if (line.endsWith('?')) {
            content_html.push(render_paragraphs());
            const q_id = line.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            content_html.push(`<h3 id="${q_id}">${line}</h3>`);
            if (!img_inserted && content_html.length > 5) {
                content_html.push(`<img src="asset/img/kegiatan/${img2}" alt="${alt2}" class="content-img mt-3 mb-4" loading="lazy">`);
                img_inserted = true;
            }
        } else if (line.startsWith('[')) {
            content_html.push(render_paragraphs());
        } else if (line === 'TABLE1_MARKER' || line === 'TABLE2_MARKER' || line === 'TABLE3_MARKER') {
             paragraphs.push(line);
             content_html.push(render_paragraphs());
        } else {
            if (line.includes("baca harga outbound per pax Malang")) {
                line = line.replace("harga outbound per pax Malang", '<a href="harga-outbound-per-pax-malang.html" class="text-decoration-none fw-bold text-primary">harga outbound per pax Malang</a>');
            }
            current_p.push(line);
            if (current_p.length >= 3 || line.endsWith('.')) {
                paragraphs.push(current_p.join(' '));
                current_p = [];
            }
        }
    }
    if (current_p.length > 0) paragraphs.push(current_p.join(' '));
    content_html.push(render_paragraphs());

    let final_content_str = content_html.join('\n');
    
    // Replace tables
    if (table_data) {
        for (const { marker, html: t_html } of table_data) {
            final_content_str = final_content_str.replace(marker, t_html);
        }
    }

    html = html.replace(/<div class="article-content">.*?<div class="author-box">/s, `<div class="article-content">\n${final_content_str}\n                            </div>\n                            <div class="author-box">`);

    // Popular & Related
    const related_html = related.map(item => `                        <div class="col-md-4">
                            <div class="related-card" data-aos="fade-up">
                                <img src="asset/img/kegiatan/${item[3]}" class="related-thumb" alt="${item[1]}" loading="lazy">
                                <div class="related-content">
                                    <h6 class="related-title mb-2"><a href="${item[0]}">${item[1]}</a></h6>
                                    <small class="text-grey">${item[2]}</small>
                                </div>
                            </div>
                        </div>`).join('\n');
    html = html.replace(/<h3 class="mb-4">ARTIKEL TERKAIT<\/h3>\s*<div class="row g-4 mb-5">.*?<\/div>\s*<\/div>\s*<div class="col-lg-4">/s, `<h3 class="mb-4">ARTIKEL TERKAIT</h3>\n                    <div class="row g-4 mb-5">\n${related_html}\n                    </div>\n                </div>\n\n                <div class="col-lg-4">`);

    const popular_html = popular.map(item => `                            <div class="recent-post-item">
                                <img src="asset/img/kegiatan/${item[3]}" class="recent-thumb" alt="${item[1]}" loading="lazy">
                                <div class="recent-info">
                                    <h6><a href="${item[0]}">${item[1]}</a></h6>
                                    <span class="recent-date">${item[2]}</span>
                                </div>
                            </div>`).join('\n');
    html = html.replace(/<h4 class="widget-title">TERPOPULER<\/h4>.*?<\/section>/s, `<h4 class="widget-title">TERPOPULER</h4>\n${popular_html}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>`);


    fs.writeFileSync(path.join(baseDir, `${slug}.html`), html, 'utf8');
}

// ARTIKEL 1
const art1_content = `Harga outbound per pax Malang mulai dari sekitar Rp 150.000 per orang, tergantung paket, jumlah peserta, dan fasilitas yang dipilih.
Paket Fun Outbound estimasi Rp 150.000 per orang untuk durasi 3-4 jam.
Paket Fun Rafting estimasi Rp 225.000 per orang dengan pengarungan 8 KM.
Paket Corporate estimasi Rp 350.000 per orang untuk kegiatan full day 8 jam.
Gemilang Katun Outbound telah menangani lebih dari 500 event sejak 2018 dengan rekam jejak keselamatan 100 persen sepanjang periode tersebut.
Harga final per pax tetap perlu dikonfirmasi ke admin karena bisa menyesuaikan jumlah peserta dan kebutuhan tambahan.
Apa Itu Outbound per Pax dan Kenapa Harganya Bisa Berbeda-beda?
Outbound per pax adalah sistem perhitungan biaya kegiatan outbound berdasarkan jumlah kepala peserta yang ikut, bukan harga borongan satu paket utuh. 
Sistem ini umum dipakai penyedia jasa outbound di Malang, termasuk Gemilang Katun Outbound, karena setiap event punya kebutuhan konsumsi, instruktur, dan perlengkapan yang jumlahnya mengikuti banyaknya peserta.
Harga per pax bisa berbeda antara satu rombongan dengan rombongan lain sekalipun memilih paket yang sama. 
Penyebab utamanya adalah jumlah peserta akhir, tingkat kelengkapan fasilitas yang diminta, serta apakah ada penyesuaian di luar paket standar seperti tambahan konsumsi atau perlengkapan khusus. 
Karena itu, angka yang tercantum di daftar harga sifatnya estimasi awal sebelum dikonfirmasi lebih lanjut ke admin.
Berapa Kisaran Harga Outbound per Pax di Malang?
Kisaran harga outbound per pax di Malang saat ini berada di rentang Rp 150.000 hingga Rp 350.000 per orang, tergantung tiga jenis paket utama yang tersedia.
TABLE1_MARKER
Ketiga paket outbound Malang ini sudah termasuk instruktur dan fasilitas dasar sesuai jenis paketnya. 
Untuk kepastian angka final, panitia tetap disarankan mengonfirmasi jumlah peserta pasti melalui WhatsApp karena harga per pax bisa menyesuaikan skala rombongan.
Bagaimana Simulasi Biaya Outbound per Pax untuk Berbagai Jumlah Peserta?
Simulasi biaya outbound per pax dapat dihitung dengan mengalikan estimasi harga per orang dengan jumlah peserta rombongan, sebelum dikonfirmasi lebih lanjut ke admin.
TABLE2_MARKER
Angka di atas adalah simulasi perhitungan sederhana berdasarkan estimasi harga per pax yang berlaku, bukan harga final yang mengikat. 
Rombongan dengan kebutuhan tambahan seperti dokumentasi ekstra, transportasi, atau penyesuaian menu tetap perlu mengonfirmasi total akhir ke admin sebelum menetapkan anggaran resmi.
Apa Saja Faktor yang Membuat Harga Outbound per Orang Naik atau Turun?
Faktor utama yang membuat harga outbound per orang naik atau turun adalah jenis paket yang dipilih, jumlah peserta, durasi kegiatan, dan tambahan fasilitas di luar paket standar.
Jenis paket: Fun Outbound lebih terjangkau dibanding Corporate karena cakupan fasilitasnya lebih sederhana.
Jumlah peserta: rombongan besar umumnya membuat biaya operasional per kepala lebih efisien, namun tetap bergantung pada konfirmasi admin.
Durasi kegiatan: paket half day cenderung lebih murah dibanding paket full day yang mencakup lebih banyak sesi dan konsumsi.
Tambahan fasilitas: kebutuhan seperti sound system, spanduk, atau dokumentasi foto dan video menambah komponen biaya di paket Corporate.
Apakah Menambah Jumlah Peserta Selalu Membuat Harga per Orang Turun?
Tidak selalu, karena penurunan harga per orang untuk rombongan besar tetap tergantung konfirmasi admin dan bukan otomatis berlaku untuk semua kombinasi paket. 
Estimasi resmi di daftar harga berlaku sama untuk seluruh rentang peserta di atas syarat minimal 10 orang, sehingga penyesuaian harga hanya diberikan jika ada permintaan khusus dari rombongan, bukan otomatis dari sisi jumlah kepala saja.
Apakah Ada Syarat Minimal Peserta untuk Booking Outbound di Malang?
Ya, syarat minimal pemesanan untuk seluruh paket outbound di Gemilang Katun adalah 10 orang per rombongan. 
Ketentuan ini berlaku sama untuk paket Fun Outbound, Fun Rafting, maupun Corporate, dan menjadi dasar perhitungan estimasi harga per pax yang tercantum di atas. 
Rombongan dengan peserta kurang dari 10 orang disarankan menghubungi admin untuk mengecek opsi penyesuaian yang memungkinkan.
Paket Apa yang Cocok untuk Outbound Malang Anak SD dan Anak TK?
Paket yang paling sesuai untuk outbound Malang anak SD dan anak TK adalah paket Fun Outbound karena isinya berupa ice breaking, energizer, dan permainan tim ringan tanpa unsur simulasi tempur. 
Paket ini dirancang untuk kegiatan yang mengutamakan kekompakan dan kesenangan kelompok, sehingga cocok untuk kegiatan sekolah, study tour, maupun acara masa orientasi.
Perlu dicatat, permainan simulasi tempur seperti paintball atau airsoft memiliki batas usia minimal 10 tahun, dan anak di bawah 14 tahun tetap wajib didampingi orang tua atau instruktur khusus. 
Karena itu, untuk kelompok TK dan sebagian besar peserta SD kelas awal, paket Fun Outbound tanpa simulasi tempur menjadi pilihan yang lebih sesuai dibanding paket yang melibatkan simulasi tempur.
Di Mana Tempat Outbound yang Bagus di Malang?
Tempat outbound yang bagus di Malang sebaiknya memiliki basecamp lengkap, instruktur berpengalaman, dan rekam jejak keamanan yang jelas, seperti yang dimiliki Gemilang Katun Outbound di kawasan Batu.
Basecamp Gemilang Katun berlokasi di Jl. Wukir Gg Gor Perdamaian, Gedang Klutuk, Temas, Kecamatan Batu, Kota Malang, dengan fasilitas area parkir luas untuk bus maupun mobil pribadi, kamar mandi dan shower terpisah, musholla berkapasitas 20 orang, serta kantin yang menyediakan makanan berat dan ringan. 
Lokasi ini menjadikan opsi outbound di Batu Malang mudah diakses rombongan dari luar kota sekaligus nyaman untuk kegiatan seharian penuh.
Berapa Biaya Rafting di Malang?
Biaya rafting di Malang melalui paket Fun Rafting Gemilang Katun diestimasikan Rp 225.000 per orang untuk pengarungan sejauh 8 KM selama 2 jam.
Harga tersebut sudah mencakup perahu karet dan alat safety, pemandu profesional atau skipper, makan siang dan snack, kelapa muda di rest area, serta asuransi dan dokumentasi kegiatan. 
Komunitas pecinta alam yang pernah menggunakan layanan ini turut memuji tingkat tantangan rafting yang disajikan tetap terasa aman karena didukung peralatan berstandar internasional.
Apa Saja Pilihan Paket Wisata 1 Hari di Malang untuk Kegiatan Corporate?
Pilihan paket wisata 1 hari di Malang untuk kebutuhan corporate yang paling lengkap adalah paket Corporate dari Gemilang Katun, dengan estimasi Rp 350.000 per orang untuk kegiatan full day 8 jam.
Paket ini menggabungkan rafting dan outbound games dalam satu hari, dilengkapi makan siang prasmanan atau boks, dua kali coffee break dan snack, pemakaian aula atau ruang rapat, sound system dan spanduk, serta dokumentasi foto dan video. 
Format ini menjadikannya opsi populer untuk perusahaan yang ingin menggabungkan team building dan gathering dalam satu jadwal tanpa menginap.
Bagaimana Cara Memesan Paket Outbound per Pax di Malang?
Cara memesan paket outbound per pax di Malang dimulai dengan memilih paket sesuai budget dan jumlah rombongan, lalu mengonfirmasi jadwal ke admin sebelum hari pelaksanaan.
Pilih paket sesuai budget dan pastikan jumlah tim memenuhi syarat minimal 10 orang.
Hubungi admin melalui WhatsApp di 0822-1122-1909 atau email booking@gemilangkatun.com untuk mengecek ketersediaan tanggal.
Datang sesuai jadwal untuk mengikuti briefing, pemakaian perlengkapan, dan memulai kegiatan bersama instruktur.
Kesalahan Umum Saat Menghitung Budget Outbound per Pax
Kesalahan umum saat menghitung budget outbound per pax adalah menganggap harga di daftar paket sebagai angka final tanpa mengecek jumlah peserta pasti dan kebutuhan tambahan.
Tidak mengonfirmasi jumlah peserta final sebelum menetapkan anggaran ke atasan atau panitia.
Melupakan komponen tambahan di luar paket standar, seperti dokumentasi ekstra atau perlengkapan khusus.
Tidak mempertimbangkan durasi kegiatan yang memengaruhi kebutuhan konsumsi dan instruktur.
Membandingkan harga paket outbound Malang dari penyedia berbeda tanpa menyamakan cakupan fasilitasnya terlebih dahulu.
Mengabaikan simulasi total biaya per rombongan dan hanya berpatokan pada angka per pax saja.
Bagaimana Cara Menghindari Selisih Anggaran yang Tidak Terduga?
Cara menghindari selisih anggaran yang tidak terduga adalah menyusun simulasi total biaya berdasarkan jumlah peserta pasti sebelum mengajukan anggaran ke manajemen, lalu mengonfirmasi ulang ke admin paling lambat beberapa hari sebelum tanggal pelaksanaan agar ada waktu penyesuaian bila ada perubahan jumlah peserta.
Apa Kata Klien yang Sudah Menggunakan Layanan Outbound Malang Ini?
Klien yang sudah menggunakan layanan outbound Malang dari Gemilang Katun umumnya menyoroti koordinasi acara yang rapi dan instruktur yang profesional.
PT Jaya Abadi menyebut instruktur yang profesional turut membuat tim mereka menjadi lebih kompak, sementara Bank Z menyoroti koordinasi acara yang rapi serta lokasi yang bersih dan nyaman.
Di sisi lain, BEM Universitas Y menilai harga paket outbound Malang ini terjangkau namun tetap berkualitas dan lokasinya strategis untuk acara malam keakraban, dan komunitas pecinta alam memuji tantangan rafting yang tetap terasa aman.
Harga outbound per pax Malang bergantung pada tiga variabel utama: jenis paket, jumlah peserta, dan durasi kegiatan. 
Paket Fun Outbound cocok untuk kebutuhan ringan dan rombongan sekolah, Fun Rafting untuk kegiatan yang mengutamakan tantangan fisik, sementara Corporate menjadi pilihan lengkap untuk acara perusahaan satu hari penuh. 
Untuk kebutuhan yang lebih spesifik seperti biaya outbound 20 orang di Malang, biaya outbound half day di Malang, atau biaya outbound 2 hari 1 malam di Malang, setiap rombongan tetap disarankan mengonfirmasi harga final langsung ke admin melalui WhatsApp agar anggaran yang disusun sesuai kebutuhan sebenarnya.`;

const table1_html = `<div class="table-responsive my-4">
                <table class="table table-bordered table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr><th>Paket</th><th>Estimasi Harga per Pax</th><th>Durasi</th><th>Minimal Peserta</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Fun Outbound</td><td>Rp 150.000</td><td>3-4 jam</td><td>10 orang</td></tr>
                        <tr><td>Fun Rafting</td><td>Rp 225.000</td><td>2 jam pengarungan</td><td>10 orang</td></tr>
                        <tr><td>Corporate</td><td>Rp 350.000</td><td>Full day (8 jam)</td><td>10 orang</td></tr>
                    </tbody>
                </table>
            </div>`;

const table2_html = `<div class="table-responsive my-4">
                <table class="table table-bordered table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr><th>Jumlah Peserta</th><th>Fun Outbound (Rp 150.000)</th><th>Fun Rafting (Rp 225.000)</th><th>Corporate (Rp 350.000)</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>10 orang</td><td>Rp 1.500.000</td><td>Rp 2.250.000</td><td>Rp 3.500.000</td></tr>
                        <tr><td>15 orang</td><td>Rp 2.250.000</td><td>Rp 3.375.000</td><td>Rp 5.250.000</td></tr>
                        <tr><td>20 orang</td><td>Rp 3.000.000</td><td>Rp 4.500.000</td><td>Rp 7.000.000</td></tr>
                        <tr><td>30 orang</td><td>Rp 4.500.000</td><td>Rp 6.750.000</td><td>Rp 10.500.000</td></tr>
                    </tbody>
                </table>
            </div>`;

createArticle({
    title: "Harga Outbound per Pax Malang 2026: Cek Dulu Sebelum Booking",
    h1: "Harga Outbound per Pax Malang 2026, Cek Dulu Sebelum Booking",
    meta_title: "Harga Outbound per Pax Malang 2026: Cek Dulu Sebelum Booking",
    slug: "harga-outbound-per-pax-malang",
    meta_desc: "Simulasi lengkap harga outbound per pax Malang mulai Rp 150.000, rincian tiga paket, dan faktor penentu biaya. Konsultasi gratis via WhatsApp sekarang juga.",
    content_raw: art1_content,
    img1: "harga-outbound-per-pax-malang-hero.webp",
    alt1: "Peserta outbound di Malang mengikuti permainan tim di area basecamp Gemilang Katun",
    img2: "paket-outbound-malang.webp",
    alt2: "Ilustrasi perbandingan paket outbound per pax di Malang",
    popular: [
        ["rundown-acara-outbound.html", "Cara Menyusun Rundown Acara Outbound yang Efektif", "07 Sep 2026", "contoh-rundown-acara-outbound.webp"],
        ["outbound-vs-team-building.html", "Perbedaan Outbound dan Team Building", "14 Aug 2026", "outbound-diskusi-tim.webp"],
        ["game-outbound-10-menit.html", "Game Outbound 10 Menit 7 Pilihan untuk Menghidupkan Acara", "11 Sep 2026", "game-outbound-10-menit-1.webp"]
    ],
    related: [
        ["paket.html", "Pilihan Paket Outbound Terbaik di Malang", "12 Aug 2026", "kegiatan-outbound-diarea-terbuka.webp"],
        ["apa-itu-outbound.html", "Apa Itu Outbound? Pengertian dan Sejarahnya", "13 Aug 2026", "outbound-malang-hero.webp"],
        ["persiapan-outbound.html", "Persiapan Outbound: Langkah Strategis Acara Perusahaan", "04 Sep 2026", "persiapan-outbound-tim-perusahaan.webp"]
    ],
    date_str: "19 September 2026",
    table_data: [{marker: "TABLE1_MARKER", html: table1_html}, {marker: "TABLE2_MARKER", html: table2_html}]
});

// ARTIKEL 2
const art2_content = `Biaya outbound 20 orang di Malang bisa naik dari estimasi dasar apabila rombongan memilih upgrade ke paket yang lebih lengkap seperti paket Corporate.
Rombongan 20 orang sudah memenuhi syarat minimal pemesanan 10 orang di Gemilang Katun Outbound.
Total estimasi untuk paket dasar Fun Outbound sekitar Rp 3.000.000 untuk 20 orang.
Upgrade ke paket Corporate membuat total estimasi naik menjadi sekitar Rp 7.000.000 untuk 20 orang.
Kenaikan harga terutama didorong oleh durasi full day dan tambahan fasilitas pendukung acara.
Berapa Biaya Outbound 20 Orang di Malang?
Biaya outbound 20 orang di Malang mengikuti estimasi harga per pax yang sama dengan paket reguler, yaitu mulai Rp 150.000 per orang untuk paket dasar hingga Rp 350.000 per orang untuk paket lengkap.
TABLE3_MARKER
Karena syarat minimal pemesanan Gemilang Katun adalah 10 orang, rombongan berjumlah 20 orang sudah otomatis memenuhi ketentuan ini dan bisa memilih paket outbound Malang sesuai kebutuhan tanpa penyesuaian jumlah peserta. 
Angka total di atas tetap berupa simulasi awal, bukan tagihan final, karena kebutuhan tambahan tertentu masih perlu dikonfirmasi ke admin.
Apa Saja yang Membuat Harga per Peserta Naik untuk Rombongan 20 Orang?
Harga per peserta naik terutama ketika rombongan 20 orang memilih upgrade dari paket dasar ke paket Corporate yang mencakup lebih banyak fasilitas dan durasi lebih panjang.
Durasi bertambah menjadi full day 8 jam, dibanding paket dasar yang hanya 3-4 jam.
Konsumsi bertambah menjadi makan siang prasmanan atau boks ditambah dua kali coffee break dan snack.
Ada tambahan sewa aula atau ruang pertemuan untuk sesi indoor.
Ada tambahan sound system dan spanduk untuk kebutuhan acara formal.
Ada tambahan dokumentasi foto dan video sebagai bagian dari paket.
Apakah Rombongan Besar Otomatis Mendapat Harga Lebih Murah per Orang?
Tidak otomatis, karena estimasi harga per pax di Gemilang Katun berlaku rata untuk seluruh rombongan di atas syarat minimal 10 orang, sehingga jumlah peserta 20 orang tidak secara otomatis menurunkan harga per kepala kecuali ada penyesuaian khusus yang disetujui admin setelah konfirmasi kebutuhan rombongan.
Paket Apa yang Cocok untuk Rombongan 20 Orang di Malang?
Paket yang cocok untuk rombongan 20 orang di Malang tergantung tujuan acara: paket Fun Outbound untuk kegiatan santai satu hari singkat, atau paket Corporate untuk acara resmi perusahaan yang membutuhkan ruang rapat dan dokumentasi.
Jika tujuan utamanya sekadar mempererat kekompakan tim tanpa kebutuhan formal, paket Fun Outbound dengan estimasi Rp 150.000 per orang sudah mencakup ice breaking, energizer, permainan tim, instruktur, air mineral, snack, dan P3K standar. 
Namun jika acara melibatkan unsur formal seperti presentasi manajemen atau butuh dokumentasi resmi, paket Corporate menjadi pilihan yang lebih sesuai meski biayanya lebih tinggi.
Apakah Rombongan 20 Orang Bisa Menambah Aktivitas Rafting?
Bisa, rombongan 20 orang dapat menambahkan aktivitas rafting dengan memilih paket Fun Rafting atau paket Corporate yang sudah menggabungkan rafting dan outbound games sekaligus.
Paket Fun Rafting berdiri sendiri dengan estimasi Rp 225.000 per orang untuk pengarungan 8 KM selama 2 jam, lengkap dengan pemandu profesional dan alat safety. 
Sementara paket Corporate menggabungkan rafting dengan sesi outbound games dalam satu jadwal full day, sehingga rombongan tidak perlu memesan dua paket terpisah. 
Berdasarkan data resmi Gemilang Katun Outbound periode 2018 hingga 2026, layanan ini telah dipercaya menangani lebih dari 500 event dengan rekam jejak keselamatan 100 persen, termasuk rombongan dengan skala serupa 20 orang ke atas.
Apa Saja yang Perlu Dihindari Saat Booking Outbound untuk 20 Orang?
Hal yang perlu dihindari saat booking outbound untuk 20 orang adalah menetapkan anggaran hanya dari estimasi per pax tanpa mengecek total akhir dan kebutuhan tambahan rombongan.
Menganggap seluruh peserta pasti hadir tanpa ada cadangan untuk peserta yang batal mendadak.
Tidak mengecek apakah lokasi acara membutuhkan sewa aula tambahan di luar paket dasar.
Memesan terlalu mepet dengan tanggal acara sehingga sulit menyesuaikan kebutuhan khusus.
Tidak menyiapkan dana cadangan untuk penyesuaian dokumentasi atau perlengkapan tambahan.
Berapa Dana Cadangan yang Disarankan untuk Rombongan 20 Orang?
Dana cadangan yang disarankan untuk rombongan 20 orang umumnya berkisar 10 hingga 15 persen dari estimasi total paket, mengingat kemungkinan penyesuaian jumlah peserta atau kebutuhan tambahan menjelang hari pelaksanaan.
Dana cadangan ini berguna untuk menutup selisih apabila ada peserta yang bertambah dari perkiraan awal, ada permintaan dokumentasi ekstra, atau ada penyesuaian menu konsumsi untuk kebutuhan diet tertentu. 
Panitia yang menyiapkan dana cadangan sejak awal biasanya tidak perlu mengajukan tambahan anggaran mendadak ke manajemen menjelang acara.
Apakah Ada Perbedaan Harga Antara Hari Kerja dan Akhir Pekan?
Perbedaan harga antara hari kerja dan akhir pekan untuk rombongan 20 orang perlu dikonfirmasi langsung ke admin, karena daftar harga resmi Gemilang Katun tidak mencantumkan pembedaan tarif berdasarkan hari pelaksanaan.
Sebagian penyedia jasa outbound memang menerapkan tarif berbeda untuk akhir pekan karena permintaan yang lebih tinggi, sehingga penting bagi panitia untuk menanyakan hal ini di awal proses booking, terutama jika rombongan 20 orang berencana mengambil jadwal di hari Sabtu atau Minggu.
Untuk rombongan 20 orang, biaya outbound di Malang paling ditentukan oleh jenis paket yang dipilih, bukan semata jumlah peserta. 
Paket dasar tetap efisien untuk kegiatan santai, sementara paket Corporate lebih cocok untuk acara formal dengan kebutuhan ruang rapat dan dokumentasi. 
Gambaran biaya lengkap semua paket, baca harga outbound per pax Malang atau konfirmasi langsung ke admin melalui WhatsApp untuk mendapatkan estimasi paling akurat.`;

const table3_html = `<div class="table-responsive my-4">
                <table class="table table-bordered table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr><th>Paket</th><th>Estimasi per Pax</th><th>Total untuk 20 Orang</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Fun Outbound</td><td>Rp 150.000</td><td>Rp 3.000.000</td></tr>
                        <tr><td>Fun Rafting</td><td>Rp 225.000</td><td>Rp 4.500.000</td></tr>
                        <tr><td>Corporate</td><td>Rp 350.000</td><td>Rp 7.000.000</td></tr>
                    </tbody>
                </table>
            </div>`;

createArticle({
    title: "Biaya Outbound 20 Orang di Malang: Segini Rinciannya",
    h1: "Biaya Outbound 20 Orang di Malang, Segini Rinciannya",
    meta_title: "Biaya Outbound 20 Orang di Malang: Segini Rinciannya",
    slug: "biaya-outbound-20-orang-malang",
    meta_desc: "Simak rincian biaya outbound 20 orang di Malang untuk tiap paket dan komponen yang membuat harga per peserta naik. Konfirmasi jadwal via WhatsApp sekarang.",
    content_raw: art2_content,
    img1: "biaya-outbound-20-orang-malang.webp",
    alt1: "Rombongan 20 orang mengikuti outbound corporate di Malang",
    img2: "paket-corporate-outbound-malang.webp",
    alt2: "Fasilitas paket Corporate outbound Malang untuk rombongan besar",
    popular: [
        ["game-outbound-tanpa-alat-30-50-orang.html", "Game Outbound Tanpa Alat untuk 30-50 Orang", "10 Sep 2026", "game-tanpa-alat-kelompok-besar-1.webp"],
        ["game-outbound-untuk-komunikasi.html", "Game Outbound untuk Komunikasi Tim", "11 Sep 2026", "game-outbound-komunikasi-tim-1.webp"],
        ["games-outbound-berdasarkan-jumlah-peserta-dan-durasi.html", "Games Outbound Berdasarkan Peserta dan Durasi", "12 Sep 2026", "games-outbound-peserta-dan-durasi-1.webp"]
    ],
    related: [
        ["tempat-outbound-malang-cuaca-tak-pasti-cara-menilai-venue.html", "Menilai Venue Outbound Saat Cuaca Tak Pasti", "14 Sep 2026", "venue-outbound-malang-1.webp"],
        ["tempat-outbound-indoor-malang-kapan-lebih-masuk-akal.html", "Tempat Outbound Indoor Malang", "14 Sep 2026", "outbound-indoor-malang-1.webp"],
        ["tempat-outbound-malang-aula-fasilitas-wajib-dicek.html", "Tempat Outbound Malang Beraula", "15 Sep 2026", "aula-outbound-malang-1.webp"]
    ],
    date_str: "19 September 2026",
    table_data: [{marker: "TABLE3_MARKER", html: table3_html}]
});
console.log("Done");
