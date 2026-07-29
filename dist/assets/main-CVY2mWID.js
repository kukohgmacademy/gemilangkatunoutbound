import{r as d,a as c,b as p,o as u,c as g,i as m}from"./shared-Br8G7115.js";import{p as i}from"./packages-8e9STAyZ.js";import{b as x}from"./blogs-BSRlMwSz.js";document.addEventListener("DOMContentLoaded",()=>{d("home"),c(),p();const t=document.getElementById("best-seller-container");if(t){const e=i.slice(0,3);t.innerHTML=e.map(a=>`
          <div class="rounded-2xl bg-white border border-[#E0E0D6] shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300 reveal">
            <div>
              <div class="relative h-48 overflow-hidden">
                <img src="${a.image}" alt="${a.title}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#3A5A40] text-white font-bold text-[10px] uppercase tracking-wider shadow-sm">
                  ${a.badge}
                </span>
                <span class="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-white/90 text-[#3A5A40] text-xs font-semibold backdrop-blur-sm border border-[#E0E0D6] flex items-center space-x-1">
                  <svg class="w-3.5 h-3.5 text-[#3A5A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                  <span>${a.location}</span>
                </span>
              </div>

              <div class="p-5 space-y-2.5">
                <span class="text-[10px] font-bold text-[#3A5A40] uppercase tracking-widest block">${a.categoryLabel}</span>
                <h3 class="text-base font-bold text-[#3A5A40] line-clamp-2">${a.title}</h3>
                <p class="text-xs text-[#5A5A40] line-clamp-2 leading-relaxed">${a.shortDesc}</p>

                <div class="pt-3 border-t border-[#E0E0D6]">
                  <span class="text-[10px] text-[#5A5A40] block">Mulai Dari</span>
                  <div class="text-xl font-bold text-[#3A5A40]">
                    ${a.price} <small class="text-xs font-normal text-[#5A5A40]">${a.priceUnit}</small>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-5 pt-0 flex items-center space-x-2">
              <a href="/paket/${a.id}.html" class="flex-1 py-2.5 rounded-full bg-[#F5F5F0] hover:bg-[#E0E0D6] text-center text-xs font-bold text-[#3A5A40] transition-colors">
                Detail
              </a>
              <button onclick="window.bookingTrigger('${a.id}')" class="flex-1 py-2.5 rounded-full bg-[#3A5A40] hover:bg-[#2C4530] text-white text-center text-xs font-bold uppercase tracking-wider shadow-sm">
                Booking
              </button>
            </div>
          </div>
        `).join("")}const s=document.getElementById("home-gallery-preview"),n=[{src:"src/assets/images/photo (13).webp",title:"High Ropes & Flying Fox Challenge",cat:"Coban Rondo Batu",desc:"Tantangan keberanian dan simulasi ketangkasan di area ketinggian hutan pinus Coban Rondo Batu Malang bersama instruktur sertifikasi BNSP."},{src:"src/assets/images/photo (16).webp",title:"Corporate Team Building & Fun Games",cat:"Resort Batu Malang",desc:"Aktivitas sinergi tim, kepemimpinan, dan penyegaran karyawan perusahaan yang dikemas dengan simulasi games kreatif dan komunikatif."},{src:"src/assets/images/photo (20).webp",title:"Rafting 7 KM Arung Jeram Kaliwatu",cat:"Kaliwatu Batu",desc:"Pengalaman memacu adrenalin menyusuri arus sungai Kaliwatu Batu Malang lengkap dengan perlengkapan standar keamanan Internasional."},{src:"src/assets/images/photo (9).webp",title:"Outbound Edukasi & Karakter Siswa",cat:"Taman Selecta Batu",desc:"Program khusus pembentukan karakter, kedisiplinan, dan kekompakan siswa sekolah di alam terbuka lingkungan asri Kota Batu."},{src:"src/assets/images/photo (4).webp",title:"Paintball War Games Simulation",cat:"Hutan Pinus Malang",desc:"Simulasi perang strategi dan kepemimpinan taktis menggunakan senjata paintball lengkap dengan seragam perlindungan standar safety."},{src:"src/assets/images/photo (2).webp",title:"Family Gathering & Outbound Ceria",cat:"Agrowisata Batu",desc:"Momen keakraban keluarga besar dan instansi dengan rangkaian fun games interaktif, panggung hiburan, dan kebersamaan hangat."}];s&&(s.innerHTML=n.map((e,a)=>`
          <div class="relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer border border-[#E0E0D6] group shadow-sm hover:shadow-xl transition-all duration-300 reveal" onclick="openHomePhoto(${a})">
            <img src="${e.src}" alt="${e.title}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            
            <div class="absolute inset-0 bg-gradient-to-t from-[#3A5A40]/95 via-[#3A5A40]/40 to-transparent flex flex-col justify-between p-5 text-white">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-white/95 text-[#3A5A40] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  ${e.cat}
                </span>
                <span class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#3A5A40] group-hover:scale-110 transition-all">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                </span>
              </div>

              <div>
                <h3 class="text-base sm:text-lg font-bold text-white group-hover:text-[#DAD7CD] transition-colors leading-snug">${e.title}</h3>
                <p class="text-xs text-[#DAD7CD] line-clamp-2 mt-1 font-light">${e.desc}</p>
                <span class="text-[10px] font-bold text-[#A3B18A] uppercase tracking-wider mt-2 inline-flex items-center space-x-1 underline">
                  <span>Klik untuk perbesar & lihat deskripsi</span>
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </span>
              </div>
            </div>
          </div>
        `).join("")),window.openHomePhoto=e=>{u(e,n)};const o=document.getElementById("home-blog-preview");o&&(o.innerHTML=x.slice(0,6).map(e=>`
          <article class="rounded-2xl bg-white border border-[#E0E0D6] shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow reveal">
            <div>
              <div class="relative h-40 overflow-hidden">
                <img src="${e.image}" alt="${e.title}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[#3A5A40] text-[10px] font-bold border border-[#E0E0D6]">
                  ${e.category}
                </span>
              </div>
              <div class="p-5 space-y-2">
                <div class="text-[10px] text-[#5A5A40] flex items-center space-x-3">
                  <span class="flex items-center space-x-1">
                    <svg class="w-3 h-3 text-[#3A5A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <span>${e.date}</span>
                  </span>
                  <span>•</span>
                  <span class="flex items-center space-x-1">
                    <svg class="w-3 h-3 text-[#3A5A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>${e.readTime}</span>
                  </span>
                </div>
                <h3 class="text-sm font-bold text-[#3A5A40] group-hover:text-[#5A5A40] transition-colors line-clamp-2">${e.title}</h3>
                <p class="text-xs text-[#5A5A40] line-clamp-2 leading-relaxed">${e.excerpt}</p>
              </div>
            </div>
            <div class="p-5 pt-0">
              <a href="/blog/${e.id}.html" class="text-xs font-bold text-[#3A5A40] hover:underline inline-flex items-center space-x-1">
                <span>Selengkapnya</span>
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
            </div>
          </article>
        `).join(""));const r=document.querySelectorAll(".faq-item");r.forEach(e=>{e.addEventListener("click",()=>{r.forEach(a=>{a!==e&&a.classList.remove("active")}),e.classList.toggle("active")})}),window.bookingTrigger=e=>{const a=i.find(l=>l.id===e);g(a||{})},m()});
