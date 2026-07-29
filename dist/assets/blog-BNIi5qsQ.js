import{r as a,a as s,b as r,i as o}from"./shared-Br8G7115.js";import{b as n}from"./blogs-BSRlMwSz.js";document.addEventListener("DOMContentLoaded",()=>{a("blog"),s(),r();const t=document.getElementById("blog-grid");t&&(t.innerHTML=n.map(e=>`
          <article class="rounded-2xl bg-white border border-[#E0E0D6] shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300 reveal">
            <div>
              <div class="relative h-48 overflow-hidden">
                <img src="${e.image}" alt="${e.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[#3A5A40] text-[10px] font-bold border border-[#E0E0D6] backdrop-blur-sm">
                  ${e.category}
                </span>
              </div>
              
              <div class="p-5 space-y-2.5">
                <div class="text-[10px] text-[#5A5A40] flex items-center space-x-3">
                  <span class="flex items-center space-x-1">
                    <svg class="w-3.3 h-3 text-[#3A5A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <span>${e.date}</span>
                  </span>
                  <span>•</span>
                  <span class="flex items-center space-x-1">
                    <svg class="w-3 h-3 text-[#3A5A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    <span>${e.author}</span>
                  </span>
                </div>
                <h2 class="text-base font-bold text-[#3A5A40] group-hover:text-[#5A5A40] transition-colors leading-snug">${e.title}</h2>
                <p class="text-xs text-[#5A5A40] line-clamp-3 leading-relaxed font-light">${e.excerpt}</p>
              </div>
            </div>

            <div class="p-5 pt-0">
              <a href="/blog/${e.id}.html" class="py-2.5 rounded-full bg-[#3A5A40] hover:bg-[#2C4530] text-white text-center text-xs font-bold block transition-all shadow-sm">
                Selengkapnya
              </a>
            </div>
          </article>
        `).join("")),o()});
