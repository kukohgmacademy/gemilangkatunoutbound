import{r as I,a as $,b as C,i as L}from"./shared-Br8G7115.js";import{b as m}from"./blogs-BSRlMwSz.js";document.addEventListener("DOMContentLoaded",()=>{I("blog"),$(),C();let i=new URLSearchParams(window.location.search).get("id");if(!i){const t=window.location.pathname.split("/").filter(Boolean);if(t.length>0){const s=t[t.length-1].replace(".html","");s&&s!=="blog"&&s!=="blog-detail"&&(i=s)}}i||(i=m[0].id);const n=m.find(t=>t.id===i)||m[0],d=(t,s="/assets/images/hero_outbound_malang_1784793004431.webp")=>{if(!t||t.includes("photo_.webp"))return s;if(t.startsWith("http://")||t.startsWith("https://"))return t;let e=t;return e.includes("/assets/images/")?e="/assets/images/"+e.split("/assets/images/")[1]:e.startsWith("/")||(e="/"+e),encodeURI(e)};document.getElementById("blog-meta-title").textContent=`${n.title} | GemilangKatunOutbond`,document.getElementById("blog-title").textContent=n.title,document.getElementById("blog-category").textContent=n.category,document.getElementById("blog-author").textContent=n.author;const h=document.getElementById("blog-author-avatar");h&&(h.src=d(n.authorAvatar,"/assets/images/author.webp"),h.setAttribute("referrerpolicy","no-referrer"),h.onerror=function(){this.onerror=null,this.src="/assets/images/author.webp"}),document.getElementById("blog-date").textContent=n.date,document.getElementById("blog-read-time").textContent=n.readTime;const u=document.getElementById("blog-image");u&&(u.src=d(n.image,"/assets/images/hero_outbound_malang_1784793004431.webp"),u.setAttribute("referrerpolicy","no-referrer"),u.onerror=function(){this.onerror=null,this.src="/assets/images/hero_outbound_malang_1784793004431.webp"});const p=document.getElementById("blog-author-bio-avatar");p&&(p.src=d(n.authorAvatar,"/assets/images/author.webp"),p.setAttribute("referrerpolicy","no-referrer"),p.onerror=function(){this.onerror=null,this.src="/assets/images/author.webp"}),document.getElementById("blog-author-bio-name").textContent=n.author,document.getElementById("blog-author-bio-desc").textContent=n.authorBio||"Praktisi & Tim Expert Outbound Malang. Berpengalaman lebih dari 8 tahun memandu kegiatan Team Building, Rafting, Gathering, dan Outbound Training.";const b=document.getElementById("blog-body");b.innerHTML=n.content;const r=m.findIndex(t=>t.id===n.id),a=m.filter(t=>t.id!==n.id),A=b.querySelectorAll("h1, h2, h3");if(A.length>0){const t=[];A.forEach((l,v)=>{const c=`heading-toc-${v}`;l.id=c;const g=l.tagName.toLowerCase(),E=g==="h3"?"pl-6 text-xs":g==="h2"?"pl-3 text-xs font-semibold":"text-xs font-bold";t.push(`
            <li class="${E}">
              <a href="#${c}" data-heading-id="${c}" class="toc-link text-[#3A5A40] hover:text-[#5A5A40] hover:underline flex items-center space-x-2 py-0.5">
                <span class="text-[#3A5A40] font-bold">•</span>
                <span>${l.textContent}</span>
              </a>
            </li>
          `)});const s=`
          <div id="toc-container" class="my-6 p-4 sm:p-5 rounded-2xl bg-[#F9F9F4] border border-[#E0E0D6] shadow-sm">
            <div class="flex items-center justify-between pb-2 border-b border-[#E0E0D6] cursor-pointer select-none" id="toc-toggle-header">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-[#3A5A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                <span class="text-xs font-bold uppercase tracking-wider text-[#3A5A40]">Daftar Isi Artikel</span>
              </div>
              <button type="button" class="text-[11px] font-bold text-[#3A5A40] hover:underline flex items-center space-x-1 focus:outline-none">
                <span id="toc-toggle-text">[Sembunyikan]</span>
                <svg id="toc-toggle-icon" class="w-3.5 h-3.5 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
            </div>
            <ul id="toc-list" class="mt-3 space-y-1.5">
              ${t.join("")}
            </ul>
          </div>
        `;b.insertAdjacentHTML("afterbegin",s);const e=document.getElementById("toc-toggle-header"),o=document.getElementById("toc-list"),f=document.getElementById("toc-toggle-text"),B=document.getElementById("toc-toggle-icon");e&&o&&e.addEventListener("click",()=>{o.classList.contains("hidden")?(o.classList.remove("hidden"),f.textContent="[Sembunyikan]",B.classList.remove("rotate-180")):(o.classList.add("hidden"),f.textContent="[Tampilkan]",B.classList.add("rotate-180"))}),document.querySelectorAll(".toc-link").forEach(l=>{l.addEventListener("click",v=>{v.preventDefault();const c=l.getAttribute("data-heading-id"),g=document.getElementById(c);g&&g.scrollIntoView({behavior:"smooth",block:"start"})})})}const w=b.querySelectorAll("p"),x=a.length>0?a[(r>=0?r:0)%a.length]:null;if(w.length>=2&&x){const t=`
          <div class="my-6 p-4 rounded-xl bg-[#3A5A40]/10 border-l-4 border-[#3A5A40] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
            <div class="flex items-center space-x-2">
              <span class="text-xs font-bold text-[#3A5A40] uppercase tracking-wider shrink-0">Baca Juga:</span>
              <a href="/blog/${x.id}.html" class="text-xs font-bold text-[#3A5A40] hover:underline line-clamp-1">
                ${x.title}
              </a>
            </div>
            <a href="/blog/${x.id}.html" class="text-[11px] font-bold text-[#3A5A40] hover:text-[#2C4530] inline-flex items-center space-x-1 shrink-0 self-end sm:self-auto">
              <span>Baca Artikel</span>
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        `;w[1].insertAdjacentHTML("afterend",t)}const y=document.getElementById("recommended-blogs-container");if(y&&a.length>0){const t=[],s=r>=0?r:0;for(let e=0;e<Math.min(3,a.length);e++){const o=(s+e)%a.length;t.push(a[o])}y.innerHTML=t.map(e=>`
          <a href="/blog/${e.id}.html" class="flex items-center space-x-3 group border-b border-[#E0E0D6] pb-3 last:border-0 last:pb-0">
            <img src="${d(e.image)}" alt="${e.title}" onerror="this.onerror=null; this.src='/assets/images/hero_outbound_malang_1784793004431.webp'" class="w-14 h-14 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform" />
            <div class="space-y-0.5">
              <span class="text-[10px] text-[#3A5A40] font-bold uppercase block tracking-wider">${e.category}</span>
              <h4 class="text-xs font-bold text-[#3A5A40] group-hover:text-[#5A5A40] transition-colors line-clamp-2 leading-snug">${e.title}</h4>
              <span class="text-[10px] text-[#5A5A40] block">${e.date}</span>
            </div>
          </a>
        `).join("")}const k=document.getElementById("bottom-related-blogs-container");if(k&&a.length>0){const t=[],s=r>=0?r:0,e=3;for(let o=0;o<Math.min(3,a.length);o++){const f=(s+e+o)%a.length;t.push(a[f])}k.innerHTML=t.map(o=>`
          <article class="rounded-2xl bg-white border border-[#E0E0D6] shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
            <div>
              <div class="relative h-44 overflow-hidden">
                <img src="${d(o.image)}" alt="${o.title}" onerror="this.onerror=null; this.src='/assets/images/hero_outbound_malang_1784793004431.webp'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#3A5A40] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  ${o.category}
                </span>
              </div>
              <div class="p-5 space-y-2.5">
                <div class="flex items-center space-x-2 text-[11px] text-[#5A5A40]">
                  <span>${o.date}</span>
                  <span>•</span>
                  <span>${o.readTime}</span>
                </div>
                <h3 class="text-sm font-bold text-[#3A5A40] group-hover:text-[#5A5A40] transition-colors line-clamp-2 leading-snug">${o.title}</h3>
                <p class="text-xs text-[#5A5A40] line-clamp-2 leading-relaxed font-light">${o.excerpt}</p>
              </div>
            </div>
            <div class="px-5 pb-5 pt-1">
              <a href="/blog/${o.id}.html" class="text-xs font-bold text-[#3A5A40] hover:underline inline-flex items-center space-x-1">
                <span>Baca Artikel</span>
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
            </div>
          </article>
        `).join("")}L()});
