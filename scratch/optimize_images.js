const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const backupDir = 'scratch/backup_img';
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

const tasks = [
  { file: 'asset/img/kegiatan/lokasi-gathering-malang-pegungungan.webp', width: 444, height: 250 },
  { file: 'asset/img/kegiatan/home/fun-games.webp', width: 352, height: 198 },
  { file: 'asset/img/kegiatan/suasana-gathering-instansi-pemerintah.webp', width: 444, height: 250 },
  { file: 'asset/img/kegiatan/home/rafting.webp', width: 352, height: 198 },
  { file: 'asset/img/kegiatan/diskusi-panitia-untuk-acara-gathering.webp', width: 444, height: 250 },
  { file: 'asset/img/kegiatan/home/fun-games-lapangan.webp', width: 800, height: 450 },
  { file: 'asset/img/kegiatan/kegiatan-outbound-bersama.webp', width: 444, height: 250 },
  { file: 'asset/img/kegiatan/home/corporate-outbound.webp', width: 352, height: 198 },
  { file: 'asset/img/kegiatan/kegiatan-outbound-diarea-terbuka.webp', width: 444, height: 250 },
];

async function main() {
  let totalOrig = 0;
  let totalNew = 0;

  for (const t of tasks) {
    if (!fs.existsSync(t.file)) {
      console.warn('File not found:', t.file);
      continue;
    }

    const origStat = fs.statSync(t.file);
    totalOrig += origStat.size;

    // Backup
    const backupFile = path.join(backupDir, path.basename(t.file));
    if (!fs.existsSync(backupFile)) {
      fs.copyFileSync(t.file, backupFile);
    }

    // Resize & compress
    const buffer = await sharp(backupFile)
      .resize(t.width, t.height, { fit: 'cover', position: 'center' })
      .webp({ quality: 80, effort: 6 })
      .toBuffer();

    fs.writeFileSync(t.file, buffer);
    const newStat = fs.statSync(t.file);
    totalNew += newStat.size;

    console.log(`Optimized ${t.file}: ${origStat.size} -> ${newStat.size} bytes (saved ${(origStat.size - newStat.size)} bytes)`);
  }

  // Also create responsive mobile variant for LCP fun-games-lapangan
  const lcpBackup = path.join(backupDir, 'fun-games-lapangan.webp');
  const mobileBuffer = await sharp(lcpBackup)
    .resize(480, 270, { fit: 'cover', position: 'center' })
    .webp({ quality: 80, effort: 6 })
    .toBuffer();
  fs.writeFileSync('asset/img/kegiatan/home/fun-games-lapangan-mobile.webp', mobileBuffer);
  console.log(`Created asset/img/kegiatan/home/fun-games-lapangan-mobile.webp: ${mobileBuffer.length} bytes`);

  console.log(`TOTAL SAVINGS: ${totalOrig} -> ${totalNew} bytes (${Math.round((totalOrig - totalNew) / 1024)} KiB saved!)`);
}

main().catch(console.error);
