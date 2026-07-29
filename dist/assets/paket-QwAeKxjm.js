import{r as d,a as c,b as x,c as p,i}from"./shared-Br8G7115.js";import{p as o}from"./packages-8e9STAyZ.js";document.addEventListener("DOMContentLoaded",()=>{d("paket"),c(),x();const a=document.getElementById("packages-grid"),n=document.querySelectorAll(".filter-btn");function r(t){if(a){if(t.length===0){a.innerHTML='<p class="col-span-full text-center text-[#5A5A40] py-12 text-sm">Tidak ada paket ditemukan untuk kategori ini.</p>';return}a.innerHTML=t.map(e=>`
          <div class="rounded-2xl bg-white border border-[#E0E0D6] shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300 reveal">
            <div>
              <div class="relative h-48 overflow-hidden">
                <img src="${e.image}" alt="${e.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#3A5A40] text-white font-bold text-[10px] uppercase tracking-wider shadow-sm">
                  ${e.badge}
                </span>
                <span class="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-white/90 text-[#3A5A40] text-xs font-semibold backdrop-blur-sm border border-[#E0E0D6] flex items-center space-x-1">
                  <svg class="w-3.5 h-3.5 text-[#3A5A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                  <span>${e.location}</span>
                </span>
              </div>

              <div class="p-5 space-y-2.5">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold text-[#3A5A40] uppercase tracking-widest">${e.categoryLabel}</span>
                  <span class="text-[10px] text-[#5A5A40] font-medium flex items-center space-x-1">
                    <svg class="w-3 h-3 text-[#3A5A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>${e.duration}</span>
                  </span>
                </div>
                <h3 class="text-base font-bold text-[#3A5A40] leading-snug">${e.title}</h3>
                <p class="text-xs text-[#5A5A40] line-clamp-2 leading-relaxed">${e.shortDesc}</p>

                <div class="pt-3 border-t border-[#E0E0D6]">
                  <span class="text-[10px] text-[#5A5A40] block">Investasi Mulai</span>
                  <div class="text-xl font-bold text-[#3A5A40]">
                    ${e.price} <small class="text-xs font-normal text-[#5A5A40]">${e.priceUnit}</small>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-5 pt-0 flex items-center space-x-2">
              <a href="/paket/${e.id}.html" class="flex-1 py-2.5 rounded-full bg-[#F5F5F0] hover:bg-[#E0E0D6] text-center text-xs font-bold text-[#3A5A40] transition-colors">
                Detail Lengkap
              </a>
              <button onclick="window.bookingTrigger('${e.id}')" class="flex-1 py-2.5 rounded-full bg-[#3A5A40] hover:bg-[#2C4530] text-white text-center text-xs font-bold uppercase tracking-wider shadow-sm">
                Booking
              </button>
            </div>
          </div>
        `).join(""),i()}}r(o),n.forEach(t=>{t.addEventListener("click",()=>{n.forEach(s=>{s.classList.remove("bg-[#3A5A40]","text-white","shadow-sm"),s.classList.add("bg-white","text-[#5A5A40]","hover:bg-[#F5F5F0]","border","border-[#E0E0D6]")}),t.classList.remove("bg-white","text-[#5A5A40]","hover:bg-[#F5F5F0]","border","border-[#E0E0D6]"),t.classList.add("bg-[#3A5A40]","text-white","shadow-sm");const e=t.getAttribute("data-cat");if(e==="all")r(o);else{const s=o.filter(l=>l.category===e);r(s)}})}),window.bookingTrigger=t=>{const e=o.find(s=>s.id===t);p(e||{})},i()});
