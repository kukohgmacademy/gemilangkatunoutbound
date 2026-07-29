import{r as l,a as d,b as c,i as p,c as x}from"./shared-Br8G7115.js";import{p as n}from"./packages-8e9STAyZ.js";document.addEventListener("DOMContentLoaded",()=>{l("paket"),d(),c();let a=new URLSearchParams(window.location.search).get("id");if(!a){const t=window.location.pathname.split("/").filter(Boolean);if(t.length>0){const o=t[t.length-1].replace(".html","");o&&o!=="paket"&&o!=="paket-detail"&&(a=o)}}a||(a=n[0].id);const i=(t,o="/assets/images/hero_outbound_malang_1784793004431.webp")=>{if(!t||t.includes("photo_.webp"))return o;if(t.startsWith("http://")||t.startsWith("https://"))return t;let s=t;return s.includes("/assets/images/")?s="/assets/images/"+s.split("/assets/images/")[1]:s.startsWith("/")||(s="/"+s),encodeURI(s)},e=n.find(t=>t.id===a)||n[0];document.getElementById("page-title").textContent=`${e.title} | GemilangKatunOutbond`,document.getElementById("breadcrumb-title").textContent=e.categoryLabel||e.title;const r=document.getElementById("detail-card-mount");r&&(r.innerHTML=`
          <!-- Top Hero Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start reveal">
            
            <!-- Large Image -->
            <div class="lg:col-span-7">
              <div class="rounded-3xl overflow-hidden border border-[#E0E0D6] shadow-md relative">
                <img src="${i(e.image)}" alt="${e.title}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='/assets/images/paket_team_building_1784793017845.webp'" class="w-full h-[380px] sm:h-[450px] object-cover" />
                <span class="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-[#3A5A40] text-white font-bold text-xs uppercase tracking-wider shadow-sm">
                  ${e.badge}
                </span>
                <span class="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 text-[#3A5A40] text-xs font-semibold backdrop-blur-md border border-[#E0E0D6] flex items-center space-x-1">
                  <svg class="w-4 h-4 text-[#3A5A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                  <span>${e.location}</span>
                </span>
              </div>
            </div>

            <!-- Right Key Info Box -->
            <div class="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-[#E0E0D6] shadow-sm space-y-6">
              
              <div class="space-y-1.5">
                <span class="text-xs font-bold text-[#3A5A40] uppercase tracking-widest block">${e.categoryLabel}</span>
                <h1 class="text-2xl sm:text-3xl font-serif font-bold text-[#3A5A40] leading-tight">${e.title}</h1>
              </div>

              <!-- Price Box -->
              <div class="p-4 rounded-2xl bg-[#F5F5F0] border border-[#E0E0D6] space-y-1">
                <span class="text-xs text-[#5A5A40] block">Biaya Investasi Program:</span>
                <div class="text-2xl sm:text-3xl font-bold text-[#3A5A40]">
                  ${e.price} <small class="text-xs font-normal text-[#5A5A40]">${e.priceUnit}</small>
                </div>
                <div class="text-[11px] text-[#5A5A40] pt-1 flex items-center space-x-1">
                  <svg class="w-3.5 h-3.5 text-[#3A5A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <span>Durasi: <strong class="text-[#3A5A40] font-semibold">${e.duration}</strong></span>
                </div>
              </div>

              <p class="text-xs sm:text-sm text-[#5A5A40] leading-relaxed font-light">${e.description}</p>

              <!-- Action Buttons -->
              <div class="space-y-3 pt-2">
                <button onclick="window.bookingTrigger('${e.id}')" class="w-full py-3.5 rounded-full bg-[#3A5A40] hover:bg-[#2C4530] text-white font-bold uppercase text-xs tracking-wider flex items-center justify-center space-x-2 shadow-md transition-colors">
                  <span>Pesan Sekarang via WA Admin</span>
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>

                <a href="https://wa.me/6283115542771?text=Halo%20Admin%20GemilangKatunOutbond,%20mohon%20kirimkan%20PDF%20Proposal%20untuk%20${encodeURIComponent(e.title)}" target="_blank" class="w-full py-3 rounded-full bg-[#F5F5F0] hover:bg-[#E0E0D6] text-[#3A5A40] border border-[#E0E0D6] text-center font-bold text-xs flex items-center justify-center space-x-2 transition-colors">
                  <svg class="w-4 h-4 text-[#3A5A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  <span>Minta Proposal PDF Resmi</span>
                </a>
              </div>

            </div>

          </div>

          <!-- Bottom Grid: Fasilitas & Rundown -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-[#E0E0D6] reveal">
            
            <!-- Fasilitas Included -->
            <div class="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-[#E0E0D6] shadow-sm space-y-4">
              <h3 class="text-lg font-serif font-bold text-[#3A5A40] flex items-center space-x-2">
                <span class="w-6 h-6 rounded-full bg-[#3A5A40]/10 text-[#3A5A40] flex items-center justify-center text-xs font-bold">✓</span>
                <span>Fasilitas Terhitung (ALL-IN)</span>
              </h3>
              <ul class="space-y-2.5 text-xs sm:text-sm text-[#5A5A40]">
                ${e.facilities.map(t=>`
                  <li class="flex items-start space-x-2.5">
                    <svg class="w-4 h-4 text-[#3A5A40] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                    <span>${t}</span>
                  </li>
                `).join("")}
              </ul>
            </div>

            <!-- Rundown / Itinerary -->
            <div class="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-[#E0E0D6] shadow-sm space-y-4">
              <h3 class="text-lg font-serif font-bold text-[#3A5A40] flex items-center space-x-2">
                <span class="w-3.5 h-3.5 text-[#3A5A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </span>
                <span>Estimasi Rundown Acara</span>
              </h3>
              <div class="space-y-2.5 text-xs sm:text-sm text-[#5A5A40]">
                ${e.itinerary.map(t=>`
                  <div class="p-3 rounded-xl bg-[#F5F5F0] border border-[#E0E0D6] flex items-center space-x-3">
                    <span class="w-2 h-2 rounded-full bg-[#3A5A40] flex-shrink-0"></span>
                    <span>${t}</span>
                  </div>
                `).join("")}
              </div>
            </div>

          </div>
        `,p()),window.bookingTrigger=t=>{x(e)}});
