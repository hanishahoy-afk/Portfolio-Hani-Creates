/**
 * =====================================================================
 * HANI CREATES - ULTRA RESPONSIVE APP SCRIPT
 * Multi-Language (EN, UR, AR, TR, ZH, FA), Strict Order Validation,
 * Dynamic Custom Quantity & Delivery Days, Guaranteed Email & WhatsApp
 * Delivery, VIP Client Gatekeeper Auth, Cosmic Canvas & Counter Animations
 * =====================================================================
 */

let currentLang = localStorage.getItem("hani_lang") || "en";
let currentFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  if (!PORTFOLIO_CONFIG.translations[currentLang]) {
    currentLang = "en";
  }

  initAmbientCanvas();
  initLanguageSwitcher();
  initCustomToggles();
  initContactForm();
  initDialogFallback();
  initMobileMenu();
  applyLanguage(currentLang);
  initCounterAnimations();
});

// =====================================================================
// 1. LANGUAGE SWITCHER ENGINE
// =====================================================================
function initLanguageSwitcher() {
  document.querySelectorAll(".lang-switch-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const selected = btn.getAttribute("data-lang");
      if (selected && PORTFOLIO_CONFIG.translations[selected]) {
        currentLang = selected;
        localStorage.setItem("hani_lang", selected);
        applyLanguage(selected);

        const dropdownMenu = document.getElementById("langDropdownMenu");
        if (dropdownMenu) dropdownMenu.classList.add("hidden");
      }
    });
  });

  const langToggleBtn = document.getElementById("langDropdownToggle");
  const langDropdownMenu = document.getElementById("langDropdownMenu");

  if (langToggleBtn && langDropdownMenu) {
    langToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdownMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", () => {
      langDropdownMenu.classList.add("hidden");
    });
  }
}

function applyLanguage(lang) {
  const t = PORTFOLIO_CONFIG.translations[lang] || PORTFOLIO_CONFIG.translations.en;
  const d = PORTFOLIO_CONFIG.designer;

  document.documentElement.lang = lang;
  document.documentElement.dir = t.dir || "ltr";

  // Language buttons active state
  document.querySelectorAll(".lang-switch-btn").forEach(btn => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Current language indicator
  const currentLangLabel = document.getElementById("currentLangLabel");
  const currentLangFlag = document.getElementById("currentLangFlag");
  if (currentLangLabel) currentLangLabel.textContent = t.langName;
  if (currentLangFlag) currentLangFlag.textContent = t.flag;

  // Designer profile images
  document.querySelectorAll(".designer-profile-img").forEach(img => {
    img.src = d.profileImage || "images/profile.jpg";
    img.onerror = () => {
      img.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
    };
  });

  // Designer name, phone, email
  document.querySelectorAll(".designer-name").forEach(el => el.textContent = d.name);

  const phoneEl = document.getElementById("designerPhone");
  if (phoneEl) phoneEl.textContent = d.whatsappDisplay;

  const emailEl = document.getElementById("designerEmail");
  if (emailEl) {
    emailEl.textContent = d.email;
    emailEl.href = `mailto:${d.email}`;
  }

  // Navigation
  updateText("navPortfolio", t.nav.portfolio);
  updateText("navReviews", t.nav.reviews);
  updateText("navFaq", t.nav.faq);
  updateText("navOrderPortal", t.nav.orderPortal);
  updateText("navWhatsAppText", t.nav.chatWhatsApp);

  updateText("mNavPortfolio", t.nav.portfolio);
  updateText("mNavReviews", t.nav.reviews);
  updateText("mNavFaq", t.nav.faq);
  updateText("mNavOrderPortal", t.nav.orderPortal);
  updateText("mNavWhatsAppText", t.nav.chatWhatsApp);

  // Hero Section
  updateText("heroBadgeText", t.hero.badge);
  updateText("heroTitlePrefix", t.hero.titlePrefix);
  updateText("heroTitleHighlight", t.hero.titleHighlight);
  updateText("heroTitleSuffix", t.hero.titleSuffix);
  updateText("heroTagline", t.hero.tagline);
  updateText("heroBtnPortfolioText", t.hero.btnPortfolio);
  updateText("heroBtnWhatsAppText", t.hero.btnWhatsApp);
  updateText("heroBtnOrderText", t.hero.btnOrder);
  updateText("heroVerifiedBadge", t.hero.verifiedDesigner);

  // Dynamic WhatsApp Greeting
  const greetings = {
    ur: "السلام علیکم ہانی بھائی! میں نے آپ کا پورٹ فولیو دیکھا ہے اور مجھے ڈیزائن پروجیکٹ کے لیے بات کرنی ہے۔",
    ar: "السلام عليكم هاني كرييتس، اطلعت على معرض أعمالك وأرغب في مناقشة طلب تصميم جديد.",
    tr: "Selamün Aleyküm Hani Creates! Portföyünüzü inceledim ve bir tasarım projesi hakkında görüşmek istiyorum.",
    zh: "您好 Hani Creates！我查看了您的作品集，想咨询设计项目合作。",
    fa: "سلام علیکم هانی عزیز! من نمونه کارهای شما را دیدم و می‌خواهم درباره یک پروژه طراحی گفتگو کنم.",
    en: "Assalam u Alaikum Hani Creates! I checked your portfolio and want to discuss a design project."
  };
  const waHeroMsg = greetings[lang] || greetings.en;

  const heroWa = document.getElementById("heroWhatsAppBtn");
  if (heroWa) heroWa.href = `https://wa.me/${d.whatsappNumber}?text=${encodeURIComponent(waHeroMsg)}`;

  const navWa = document.getElementById("navWhatsAppBtn");
  if (navWa) navWa.href = `https://wa.me/${d.whatsappNumber}?text=${encodeURIComponent(waHeroMsg)}`;

  const mNavWa = document.getElementById("mNavWhatsAppBtn");
  if (mNavWa) mNavWa.href = `https://wa.me/${d.whatsappNumber}?text=${encodeURIComponent(waHeroMsg)}`;

  const floatWa = document.getElementById("floatingWhatsApp");
  if (floatWa) floatWa.href = `https://wa.me/${d.whatsappNumber}?text=${encodeURIComponent(waHeroMsg)}`;

  // Render Sections
  renderStats(t.stats);
  renderCategories(t.categories);
  renderGallery(currentFilter, lang);

  updateText("reviewsTag", t.reviewsSection.tag);
  updateText("reviewsTitle", t.reviewsSection.title);
  updateText("reviewsSubtitle", t.reviewsSection.subtitle);
  renderTestimonials(lang);

  updateText("faqTag", t.faqSection.tag);
  updateText("faqTitle", t.faqSection.title);
  updateText("faqSubtitle", t.faqSection.subtitle);
  renderFaqs(lang);

  updateOrderPortalTexts(t.orderPortal);

  updateText("footerRights", t.footer.rights);
  updateText("footerCrafted", t.footer.crafted);

  lucide.createIcons();
}

function updateText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) {
    el.textContent = text;
  }
}

// =====================================================================
// 3. RENDER STATS & COUNTER ANIMATIONS
// =====================================================================
function renderStats(stats) {
  const container = document.getElementById("statsGrid");
  if (!container || !stats) return;

  container.innerHTML = stats.map((s, idx) => `
    <div class="glass-card p-4 sm:p-5 rounded-2xl text-center group flex flex-col items-center justify-center border border-white/[0.08] hover:border-rose-500/40 transition-all bg-[#131219]">
      <div class="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(225,29,72,0.15)]">
        <i data-lucide="${s.icon}" class="w-5 h-5 sm:w-6 sm:h-6"></i>
      </div>
      <div class="stat-counter text-2xl sm:text-3xl font-black text-white tracking-tight mb-0.5 leading-tight" data-target="${s.value}">
        ${s.value}
      </div>
      <div class="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">${s.label}</div>
    </div>
  `).join("");
}

function initCounterAnimations() {
  const counters = document.querySelectorAll(".stat-counter");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetStr = el.getAttribute("data-target") || el.textContent;
        const num = parseInt(targetStr.replace(/\D/g, ""), 10);
        const suffix = targetStr.includes("+") ? "+" : "";

        if (!isNaN(num)) {
          let start = 0;
          const duration = 1200;
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = num / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= num) {
              el.textContent = num + suffix;
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(start) + suffix;
            }
          }, stepTime);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// =====================================================================
// 4. CATEGORIES FILTER TABS & GALLERY
// =====================================================================
function renderCategories(categories) {
  const catContainer = document.getElementById("categoriesContainer");
  if (!catContainer || !categories) return;

  catContainer.innerHTML = categories.map(c => `
    <button 
      class="filter-btn px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${c.id === currentFilter ? 'active' : ''}"
      data-category="${c.id}"
      onclick="filterProjects('${c.id}')"
    >
      <i data-lucide="${c.icon || 'folder'}" class="w-4 h-4 text-rose-400"></i>
      <span>${c.name}</span>
    </button>
  `).join("");
}

window.filterProjects = function(catId) {
  currentFilter = catId;
  document.querySelectorAll(".filter-btn").forEach(btn => {
    if (btn.getAttribute("data-category") === catId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  renderGallery(catId, currentLang);
};

function renderGallery(catId, lang) {
  const gallery = document.getElementById("projectsGallery");
  if (!gallery) return;

  const items = catId === "all" 
    ? PORTFOLIO_CONFIG.projects 
    : PORTFOLIO_CONFIG.projects.filter(p => p.category === catId || (Array.isArray(p.categories) && p.categories.includes(catId)));

  if (items.length === 0) {
    const emptyMessages = {
      ur: "اس کیٹیگری کے ڈیزائنز جلد ہی شامل کیے جائیں گے۔",
      ar: "سيتم إضافة المزيد من تصاميم هذا القسم قريباً.",
      tr: "Bu kategorideki tasarımlar yakında eklenecektir.",
      zh: "该分类的设计作品即将上线，敬请期待。",
      fa: "طرح‌های این دسته‌بندی به‌زودی اضافه خواهند شد.",
      en: "Designs in this category will be available soon."
    };
    const emptyText = emptyMessages[lang] || emptyMessages.en;

    gallery.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400">
        <i data-lucide="folder-open" class="w-12 h-12 mx-auto mb-3 text-slate-600"></i>
        <p class="text-lg font-bold text-slate-300">${emptyText}</p>
        <p class="text-xs text-slate-500 mt-1">Direct contact for custom inquiries</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  const inspectBtnTexts = {
    ur: "ڈیزائن دیکھیں",
    ar: "معاينة التصميم",
    tr: "Tasarımı Gör",
    zh: "查看高清大图",
    fa: "مشاهده طرح",
    en: "View Design"
  };
  const inspectBtnText = inspectBtnTexts[lang] || inspectBtnTexts.en;

  gallery.innerHTML = items.map(p => {
    let aspectClass = "aspect-video";
    if (p.aspectRatio === "1/1" || p.category === "logo") {
      aspectClass = "aspect-square";
    } else if (p.aspectRatio === "4/5") {
      aspectClass = "aspect-[4/5]";
    }

    const title = p.title[lang] || p.title.en;
    const catName = p.categoryName[lang] || p.categoryName.en;

    return `
      <div class="glass-card rounded-2xl overflow-hidden group cursor-pointer flex flex-col bg-[#14131A] border border-white/[0.08] hover:border-rose-500/40 transition-all hover:shadow-[0_10px_30px_rgba(225,29,72,0.18)]" onclick="openLightbox(${p.id})">
        <div class="relative w-full ${aspectClass} bg-[#0A0A0E] flex items-center justify-center p-2 sm:p-2.5 overflow-hidden border-b border-white/[0.06]">
          <img src="${p.image}" alt="${title}" loading="lazy" class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';">
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <div class="px-4 py-2 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-sm border border-rose-400/40">
              <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
              <span>${inspectBtnText}</span>
            </div>
          </div>
        </div>

        <div class="p-4 sm:p-5 bg-[#14131A] flex flex-col flex-1">
          <div class="flex items-center justify-between gap-2 mb-2.5">
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <i data-lucide="folder" class="w-3 h-3 text-rose-400"></i> ${catName}
            </span>
            ${p.metric ? `
              <span class="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                ${p.metric}
              </span>
            ` : ''}
          </div>

          <h3 class="text-sm sm:text-base font-black text-white group-hover:text-rose-400 transition-colors line-clamp-2 mb-1.5 leading-snug">
            ${title}
          </h3>

          <div class="text-xs text-slate-400 font-semibold flex items-center gap-1.5 mb-4">
            <i data-lucide="user" class="w-3.5 h-3.5 text-slate-500"></i>
            <span>${p.client || 'Client Project'}</span>
          </div>

          <div class="mt-auto pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-rose-400">
            <span class="flex items-center gap-1">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i> ${inspectBtnText}
            </span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"></i>
          </div>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();
}

// =====================================================================
// 5. LIGHTBOX MODAL
// =====================================================================
window.openLightbox = function(id) {
  const item = PORTFOLIO_CONFIG.projects.find(p => p.id === id);
  if (!item) return;

  const dialog = document.getElementById("lightboxDialog");
  const d = PORTFOLIO_CONFIG.designer;
  const lang = currentLang;

  const title = item.title[lang] || item.title.en;
  const catName = item.categoryName[lang] || item.categoryName.en;
  const desc = item.description[lang] || item.description.en;

  const promptTexts = {
    ur: "کیا آپ ایسا شاندار ڈیزائن بنوانا چاہتے ہیں؟",
    ar: "هل ترغب في الحصول على تصميم احترافي مشابه؟",
    tr: "Bunun gibi profesyonel bir tasarım ister misiniz?",
    zh: "想要定制同款高点击率爆款视觉吗？",
    fa: "آیا می‌خواهید چنین طرح حرفه‌ای و جذابی داشته باشید؟",
    en: "Want a high-impact custom design like this?"
  };
  const subTexts = {
    ur: "سورس فائلز (PSD / AI) اور 4K کوالٹی کے ساتھ ڈیلیور کیا جائے گا۔",
    ar: "تسليم سريع بجودة 4K مع الملفات المصدرية المفتوحة عند الطلب مسبقاً.",
    tr: "4K kalite ve önceden belirtilirse kaynak dosyalar (PSD/AI) ile teslim edilir.",
    zh: "4K超清画质交付，下单前注明即可随单提供源文件（PSD/AI）。",
    fa: "تحویل با کیفیت 4K و در صورت درخواست قبلی، فایل‌های لایه‌باز (PSD/AI).",
    en: "Delivered in 4K resolution with source files (PSD/AI) upon advance notice."
  };
  const btnTexts = {
    ur: "واٹس ایپ پر آرڈر کریں",
    ar: "اطلب عبر واتساب",
    tr: "WhatsApp'tan Sipariş Ver",
    zh: "通过 WhatsApp 立即下单",
    fa: "سفارش در واتساپ",
    en: "Order on WhatsApp"
  };

  const promptText = promptTexts[lang] || promptTexts.en;
  const subText = subTexts[lang] || subTexts.en;
  const btnText = btnTexts[lang] || btnTexts.en;

  const content = document.getElementById("dialogContent");
  content.innerHTML = `
    <div class="relative bg-[#131219] text-white flex flex-col max-h-[92vh] border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl">
      <div class="relative w-full bg-[#08080C] flex items-center justify-center p-3 sm:p-5 overflow-hidden min-h-[260px] max-h-[58vh] border-b border-white/[0.08]">
        <img src="${item.image}" alt="${title}" class="max-h-[52vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';">
        
        <button 
          onclick="document.getElementById('lightboxDialog').close()" 
          class="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all z-20"
          aria-label="Close modal"
        >
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="p-5 sm:p-7 md:p-8 overflow-y-auto">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div class="flex items-center gap-2">
            <span class="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              ${catName}
            </span>
            ${item.metric ? `
              <span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold">
                ${item.metric}
              </span>
            ` : ''}
          </div>
          <div class="text-xs sm:text-sm text-slate-400 font-medium">
            Client: <span class="text-white font-bold">${item.client || 'Custom Client'}</span>
          </div>
        </div>

        <h2 id="lightboxTitle" class="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 leading-snug">
          ${title}
        </h2>

        <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          ${desc}
        </p>

        <div class="p-4 sm:p-5 rounded-2xl bg-[#1A1924] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-center sm:text-left rtl:sm:text-right">
            <div class="text-white font-black text-sm">${promptText}</div>
            <div class="text-slate-400 text-xs mt-0.5">${subText}</div>
          </div>
          <a 
            href="https://wa.me/${d.whatsappNumber}?text=${encodeURIComponent(`Assalam u Alaikum Hani Creates! I saw this design: "${title}". I want to place a custom order.`)}"
            target="_blank"
            class="btn-primary w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shrink-0 shadow-[0_4px_20px_rgba(225,29,72,0.35)]"
          >
            <i data-lucide="message-circle" class="w-4 h-4"></i> ${btnText}
          </a>
        </div>
      </div>
    </div>
  `;

  dialog.showModal();
  lucide.createIcons();
};

function initDialogFallback() {
  const dialog = document.getElementById("lightboxDialog");
  if (!dialog) return;

  if (!("closedBy" in HTMLDialogElement.prototype)) {
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;

      const rect = dialog.getBoundingClientRect();
      const isDialogContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );

      if (isDialogContent) return;
      dialog.close();
    });
  }
}

// =====================================================================
// 6. TESTIMONIALS & FAQS
// =====================================================================
function renderTestimonials(lang) {
  const container = document.getElementById("testimonialsGrid");
  if (!container) return;

  container.innerHTML = PORTFOLIO_CONFIG.testimonials.map(t => `
    <div class="glass-card p-5 sm:p-7 rounded-2xl flex flex-col justify-between bg-[#14131A] border border-white/[0.08] hover:border-rose-500/30 transition-all">
      <div>
        <div class="flex items-center gap-1 text-amber-400 mb-3 sm:mb-4">
          ${Array(t.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>').join("")}
        </div>
        <p class="text-slate-300 text-sm sm:text-base italic leading-relaxed mb-5">
          "${t.review[lang] || t.review.en}"
        </p>
      </div>

      <div class="flex items-center gap-3 border-t border-white/[0.06] pt-4">
        <img src="${t.avatar}" alt="${t.name}" class="w-11 h-11 rounded-full object-cover border border-white/10 shrink-0">
        <div>
          <div class="text-white font-black text-sm">${t.name}</div>
          <div class="text-xs text-rose-400 font-semibold">${t.channel}</div>
        </div>
      </div>
    </div>
  `).join("");
}

function renderFaqs(lang) {
  const container = document.getElementById("faqsList");
  if (!container) return;

  container.innerHTML = PORTFOLIO_CONFIG.faqs.map(f => `
    <details class="glass-card rounded-2xl p-4 sm:p-6 group cursor-pointer transition-all bg-[#14131A] border border-white/[0.08] hover:border-white/[0.15]">
      <summary class="flex items-center justify-between gap-4 font-bold text-base md:text-lg text-white list-none select-none">
        <span>${f.q[lang] || f.q.en}</span>
        <div class="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform">
          <i data-lucide="chevron-down" class="w-4 h-4 text-slate-300"></i>
        </div>
      </summary>
      <div class="mt-4 pt-4 border-t border-white/[0.08] text-slate-300 text-sm md:text-base leading-relaxed">
        ${f.a[lang] || f.a.en}
      </div>
    </details>
  `).join("");
}

// =====================================================================
// 7. ORDER PORTAL SETUP & DYNAMIC TOGGLES
// =====================================================================
function updateOrderPortalTexts(tOrder) {
  if (!tOrder) return;

  updateText("orderTag", tOrder.tag);
  updateText("orderTitle", tOrder.title);
  updateText("orderSubtitle", tOrder.subtitle);
  updateText("orderMandatoryBanner", tOrder.mandatoryBanner);

  setLabelAndPlaceholder("clientNameLabel", "clientName", tOrder.labels.name, tOrder.labels.namePlh);
  setLabelAndPlaceholder("clientPhoneLabel", "clientPhone", tOrder.labels.phone, tOrder.labels.phonePlh);
  setLabelAndPlaceholder("clientEmailLabel", "clientEmail", tOrder.labels.email, tOrder.labels.emailPlh);
  setLabelAndPlaceholder("clientBudgetLabel", "clientBudget", tOrder.labels.budget, tOrder.labels.budgetPlh);
  setLabelAndPlaceholder("clientDetailsLabel", "clientDetails", tOrder.labels.details, tOrder.labels.detailsPlh);
  setLabelAndPlaceholder("clientLinkLabel", "clientLink", tOrder.labels.link, tOrder.labels.linkPlh);
  setLabelAndPlaceholder("clientCustomDaysLabel", "clientCustomDays", tOrder.labels.customDays, tOrder.labels.customDaysPlh);
  setLabelAndPlaceholder("clientCustomQuantityLabel", "clientCustomQuantity", tOrder.labels.customQuantity, tOrder.labels.customQuantityPlh);

  updateText("clientServiceLabel", tOrder.labels.service);
  updateText("clientQuantityLabel", tOrder.labels.quantity);
  updateText("clientUrgencyLabel", tOrder.labels.urgency);

  updateText("orderBtnWhatsAppText", "Send Order to WhatsApp & Email");
  updateText("orderBtnEmailText", tOrder.btnEmail);
  updateText("orderSecureNote", tOrder.secureNote);

  const serviceSelect = document.getElementById("clientService");
  if (serviceSelect && tOrder.servicesOptions) {
    const cur = serviceSelect.value;
    serviceSelect.innerHTML = tOrder.servicesOptions.map(opt => `
      <option value="${opt.val}">${opt.label}</option>
    `).join("");
    if (cur) serviceSelect.value = cur;
  }

  const quantitySelect = document.getElementById("clientQuantity");
  if (quantitySelect && tOrder.quantityOptions) {
    const cur = quantitySelect.value;
    quantitySelect.innerHTML = tOrder.quantityOptions.map(opt => `
      <option value="${opt.val}">${opt.label}</option>
    `).join("");
    if (cur) quantitySelect.value = cur;
  }

  const urgencySelect = document.getElementById("clientUrgency");
  if (urgencySelect && tOrder.urgencyOptions) {
    const cur = urgencySelect.value;
    urgencySelect.innerHTML = tOrder.urgencyOptions.map(opt => `
      <option value="${opt.val}">${opt.label}</option>
    `).join("");
    if (cur) urgencySelect.value = cur;
  }
}

function setLabelAndPlaceholder(labelId, inputId, labelText, placeholderText) {
  const lbl = document.getElementById(labelId);
  if (lbl && labelText) lbl.textContent = labelText;
  const input = document.getElementById(inputId);
  if (input && placeholderText) input.placeholder = placeholderText;
}

// Dynamic Custom Delivery Days & Custom Quantity Toggles
function initCustomToggles() {
  // 1. Custom Delivery Days Toggle
  const urgencySelect = document.getElementById("clientUrgency");
  const customDaysContainer = document.getElementById("customDaysContainer");
  const customDaysInput = document.getElementById("clientCustomDays");

  function checkCustomDays() {
    if (!urgencySelect || !customDaysContainer) return;
    const val = urgencySelect.value;
    if (val === "Custom Days" || val.toLowerCase().includes("custom")) {
      customDaysContainer.classList.remove("hidden");
      if (customDaysInput) customDaysInput.setAttribute("required", "required");
    } else {
      customDaysContainer.classList.add("hidden");
      if (customDaysInput) {
        customDaysInput.removeAttribute("required");
        customDaysInput.classList.remove("input-error");
      }
    }
  }

  if (urgencySelect) {
    urgencySelect.addEventListener("change", checkCustomDays);
    checkCustomDays();
  }

  // 2. Custom Quantity Toggle
  const quantitySelect = document.getElementById("clientQuantity");
  const customQtyContainer = document.getElementById("customQuantityContainer");
  const customQtyInput = document.getElementById("clientCustomQuantity");

  function checkCustomQuantity() {
    if (!quantitySelect || !customQtyContainer) return;
    const val = quantitySelect.value;
    if (val === "Custom Quantity" || val.toLowerCase().includes("custom")) {
      customQtyContainer.classList.remove("hidden");
      if (customQtyInput) customQtyInput.setAttribute("required", "required");
    } else {
      customQtyContainer.classList.add("hidden");
      if (customQtyInput) {
        customQtyInput.removeAttribute("required");
        customQtyInput.classList.remove("input-error");
      }
    }
  }

  if (quantitySelect) {
    quantitySelect.addEventListener("change", checkCustomQuantity);
    checkCustomQuantity();
  }
}

// =====================================================================
// 8. STRICT ORDER VALIDATION & GUARANTEED EMAIL + WHATSAPP DELIVERY
// =====================================================================
function initContactForm() {
  const form = document.getElementById("orderForm");
  if (!form) return;

  const d = PORTFOLIO_CONFIG.designer;

  const allInputs = form.querySelectorAll("input, select, textarea");
  allInputs.forEach(input => {
    input.addEventListener("input", () => input.classList.remove("input-error"));
    input.addEventListener("change", () => input.classList.remove("input-error"));
  });

  function validateOrderForm() {
    let isValid = true;
    let firstInvalid = null;

    const nameInput = document.getElementById("clientName");
    const phoneInput = document.getElementById("clientPhone");
    const emailInput = document.getElementById("clientEmail");
    const serviceInput = document.getElementById("clientService");
    const quantityInput = document.getElementById("clientQuantity");
    const customQtyInput = document.getElementById("clientCustomQuantity");
    const urgencyInput = document.getElementById("clientUrgency");
    const customDaysInput = document.getElementById("clientCustomDays");
    const detailsInput = document.getElementById("clientDetails");

    function markError(el) {
      if (!el) return;
      el.classList.add("input-error");
      isValid = false;
      if (!firstInvalid) firstInvalid = el;
    }

    if (!nameInput || !nameInput.value.trim()) markError(nameInput);
    if (!phoneInput || phoneInput.value.trim().length < 7) markError(phoneInput);

    const emailVal = emailInput ? emailInput.value.trim() : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) markError(emailInput);

    if (!serviceInput || !serviceInput.value.trim()) markError(serviceInput);
    if (!quantityInput || !quantityInput.value.trim()) markError(quantityInput);

    // Validate Custom Quantity if chosen
    if (quantityInput && (quantityInput.value === "Custom Quantity" || quantityInput.value.toLowerCase().includes("custom"))) {
      if (!customQtyInput || !customQtyInput.value.trim()) markError(customQtyInput);
    }

    if (!urgencyInput || !urgencyInput.value.trim()) markError(urgencyInput);

    // Validate Custom Days if chosen
    if (urgencyInput && (urgencyInput.value === "Custom Days" || urgencyInput.value.toLowerCase().includes("custom"))) {
      if (!customDaysInput || !customDaysInput.value.trim()) markError(customDaysInput);
    }

    if (!detailsInput || detailsInput.value.trim().length < 5) markError(detailsInput);

    if (!isValid) {
      const t = PORTFOLIO_CONFIG.translations[currentLang] || PORTFOLIO_CONFIG.translations.en;
      const alertMsg = (t.orderPortal && t.orderPortal.validationAlert) || "⚠️ Please fill in all required fields (Name, Phone, Email, Details) before submitting!";
      showToast(alertMsg, true);

      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        firstInvalid.focus();
      }
    }

    return isValid;
  }

  function getOrderData() {
    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();
    const email = document.getElementById("clientEmail").value.trim();
    const service = document.getElementById("clientService").value;
    const quantity = document.getElementById("clientQuantity").value;
    const customQty = document.getElementById("clientCustomQuantity") ? document.getElementById("clientCustomQuantity").value.trim() : "";
    const urgency = document.getElementById("clientUrgency").value;
    const customDays = document.getElementById("clientCustomDays") ? document.getElementById("clientCustomDays").value.trim() : "";
    const budget = document.getElementById("clientBudget").value.trim() || "Discuss / Standard";
    const details = document.getElementById("clientDetails").value.trim();
    const link = document.getElementById("clientLink").value.trim() || "None";

    let finalQuantity = quantity;
    if ((quantity === "Custom Quantity" || quantity.toLowerCase().includes("custom")) && customQty) {
      finalQuantity = `Custom Quantity (${customQty})`;
    }

    let finalTimeline = urgency;
    if ((urgency === "Custom Days" || urgency.toLowerCase().includes("custom")) && customDays) {
      finalTimeline = `Custom Timeline (${customDays})`;
    }

    return { name, phone, email, service, quantity: finalQuantity, timeline: finalTimeline, budget, details, link };
  }

  // Handle Form Submission (BOTH Email Delivery + WhatsApp)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateOrderForm()) return;

    const o = getOrderData();
    const submitBtn = document.getElementById("orderSubmitBtn");
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i data-lucide="loader" class="w-5 h-5 animate-spin"></i> <span>Dispatching to Email & WhatsApp...</span>`;
      lucide.createIcons();
    }

    // 1. Guaranteed Direct Email Dispatch via FormSubmit AJAX to hanishahoy@gmail.com
    fetch("https://formsubmit.co/ajax/hanishahoy@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: `🔥 NEW ORDER: ${o.service} from ${o.name}`,
        _replyto: o.email,
        "Client Name": o.name,
        "Contact / WhatsApp": o.phone,
        "Email Address": o.email,
        "Service Category": o.service,
        "Quantity": o.quantity,
        "Delivery Timeline": o.timeline,
        "Estimated Budget": o.budget,
        "Reference Link": o.link,
        "Project Brief": o.details
      })
    }).catch(err => {
      console.log("Background email notice:", err);
    });

    // 2. Also dispatch to local PHP/MySQL backend if available
    fetch("backend/order.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(o)
    }).catch(() => {});

    // 3. Prepare WhatsApp Message
    const message = `*🚀 NEW DESIGN ORDER FOR HANI CREATES!*
━━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${o.name}
📞 *Contact/WhatsApp:* ${o.phone}
📧 *Email:* ${o.email}
🎨 *Selected Service:* ${o.service}
📦 *Quantity / Package:* ${o.quantity}
⏱️ *Timeline:* ${o.timeline}
💰 *Budget:* ${o.budget}
🔗 *Reference / Assets:* ${o.link}

📝 *PROJECT DETAILS & BRIEF:*
${o.details}
━━━━━━━━━━━━━━━━━━━━━
_Sent via Client Order Portal - Hani Creates_`;

    const whatsappUrl = `https://wa.me/${d.whatsappNumber}?text=${encodeURIComponent(message)}`;

    showToast("🎉 Order dispatched to Email (hanishahoy@gmail.com) and opening WhatsApp...", false);

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        lucide.createIcons();
      }
    }, 600);
  });

  // Handle Manual Email Client Button
  const emailBtn = document.getElementById("orderEmailBtn");
  if (emailBtn) {
    emailBtn.addEventListener("click", () => {
      if (!validateOrderForm()) return;

      const o = getOrderData();
      const subject = `New Project Order: ${o.service} (${o.name})`;
      const body = `Hani Creates Design Order:
----------------------------------------
Client Name: ${o.name}
WhatsApp / Phone: ${o.phone}
Email: ${o.email}
Service: ${o.service}
Quantity: ${o.quantity}
Timeline: ${o.timeline}
Budget: ${o.budget}
Reference Link: ${o.link}

Project Brief:
${o.details}
----------------------------------------`;

      const mailtoUrl = `mailto:${d.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl, "_blank");
    });
  }
}

// Enhanced Toast Notification
function showToast(msg, isError = false) {
  const toast = document.getElementById("toastNotification");
  const toastText = document.getElementById("toastText");
  if (!toast || !toastText) return;

  toastText.textContent = msg;

  if (isError) {
    toast.classList.add("toast-error");
    toast.classList.remove("toast-success");
  } else {
    toast.classList.remove("toast-error");
    toast.classList.add("toast-success");
  }

  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
}

// =====================================================================
// 9. AMBIENT COSMIC PARTICLES CANVAS (60FPS ULTRA SMOOTH)
// =====================================================================
function initAmbientCanvas() {
  const canvas = document.getElementById("ambientCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 45);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.5,
      color: Math.random() > 0.3 ? "rgba(225, 29, 72, " : "rgba(245, 158, 11, ",
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ")";
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color + "0.6)";
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// =====================================================================
// 10. MOBILE MENU DRAWER
// =====================================================================
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("closeMobileMenuBtn");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !menu) return;

  function openMenu() {
    menu.classList.remove("hidden");
    menu.classList.add("flex");
  }

  function closeMenu() {
    menu.classList.add("hidden");
    menu.classList.remove("flex");
  }

  toggleBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  mobileLinks.forEach(link => link.addEventListener("click", closeMenu));
}
