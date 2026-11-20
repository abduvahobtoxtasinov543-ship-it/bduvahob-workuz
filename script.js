const INITIAL_JOBS = [
  {
    id: 1,
    company: "Uzum",
    companyLetter: "U",
    companyType: "Texnologik kompaniya",
    title: "Frontend dasturchi",
    salary: "18 000 000 – 25 000 000 UZS / oy",
    city: "Toshkent",
    workType: "To'liq bandlik",
    category: "IT va Dasturlash",
    featured: true,
    description: "Yuqori yuklamali veb-interfeyslar va foydalanuvchi tajribasini rivojlantirish.",
    requirements: [
      "HTML5, CSS3, zamonaviy JavaScript (ES6+) va React/TypeScript bilimi",
      "REST API bilan ishlash va Git tajribasi",
      "Adaptiv va tez yuklanuvchi sahifalar yaratish ko'nikmasi"
    ]
  },
  {
    id: 2,
    company: "Click",
    companyLetter: "C",
    companyType: "Texnologik kompaniya",
    title: "UI/UX dizayner",
    salary: "12 000 000 – 18 000 000 UZS / oy",
    city: "Toshkent",
    workType: "To'liq bandlik",
    category: "Dizayn",
    featured: true,
    description: "Mobil va veb mahsulotlar uchun qulay interfeyslar, dizayn tizimlari va prototiplar yaratish.",
    requirements: [
      "Figma dasturida auto-layout, components va design system bilan ishlash",
      "Foydalanuvchi oqimlari (user flow) va wireframe tayyorlash",
      "Portfolio mavjudligi"
    ]
  },
  {
    id: 3,
    company: "TBC Uzbekistan",
    companyLetter: "T",
    companyType: "Bank",
    title: "Marketing mutaxassisi",
    salary: "10 000 000 – 15 000 000 UZS / oy",
    city: "Global",
    workType: "To'liq bandlik",
    category: "Marketing",
    featured: true,
    description: "Raqamli kampaniyalarni rejalashtirish, tahlil qilish va foydalanuvchilarni jalb qilish.",
    requirements: [
      "Performance va content marketing asoslarini bilish",
      "Reklama kanallari metrikalarini tahlil qilish",
      "Jamoa bilan samarali muloqot"
    ]
  },
  {
    id: 4,
    company: "Payme",
    companyLetter: "P",
    companyType: "Texnologik kompaniya",
    title: "Backend dasturchi",
    salary: "20 000 000 – 28 000 000 UZS / oy",
    city: "Toshkent",
    workType: "To'liq bandlik",
    category: "IT va Dasturlash",
    featured: false,
    description: "Xavfsiz, ishonchli va yuqori unumdorlikka ega servislar hamda API arxitekturasini ishlab chiqish.",
    requirements: [
      "Server tomonlama dasturlash tillari va ma'lumotlar bazalari (SQL) bilimi",
      "Mikroservis yoki REST/gRPC yondashuvlari bilan tanishlik",
      "Xavfsizlik va loglash standartlariga rioya qilish"
    ]
  },
  {
    id: 5,
    company: "EPAM",
    companyLetter: "E",
    companyType: "Texnologik kompaniya",
    title: "Moliyaviy tahlilchi",
    salary: "14 000 000 – 20 000 000 UZS / oy",
    city: "Toshkent",
    workType: "To'liq bandlik",
    category: "Moliya",
    featured: false,
    description: "Byudjetlashtirish, moliyaviy hisobotlar va loyiha rentabelligini tahlil qilish.",
    requirements: [
      "Moliyaviy modellashtirish va Excel/SQL ko'nikmalari",
      "Xarajatlar va daromadlar dinamikasini tahlil qilish",
      "Ingliz tilini bilish afzallik beradi"
    ]
  },
  {
    id: 6,
    company: "Click",
    companyLetter: "C",
    companyType: "Texnologik kompaniya",
    title: "Grafik dizayner",
    salary: "8 000 000 – 12 000 000 UZS / oy",
    city: "Toshkent",
    workType: "To'liq bandlik",
    category: "Dizayn",
    featured: false,
    description: "Ijtimoiy tarmoqlar, bannerlar va kampaniyalar uchun vizual materiallar tayyorlash.",
    requirements: [
      "Figma, Photoshop yoki Illustrator dasturlarida ishlash",
      "Tipografiya va rang uyg'unligini his etish",
      "Topshiriqlarni belgilangan muddatda bajarish"
    ]
  }
];

const JOBS_KEY = "abduvahob_workuz_jobs_v1";
const SAVED_KEY = "abduvahob_workuz_saved_v1";
const ITEMS_PER_PAGE = 4;

let jobsData = loadJobs();
let currentPage = 1;
let selectedJobId = jobsData[0]?.id || 1;
let toastTimer = null;

function loadJobs() {
  try {
    const saved = JSON.parse(localStorage.getItem(JOBS_KEY));
    if (Array.isArray(saved) && saved.length > 0) return saved;
  } catch {}
  return [...INITIAL_JOBS];
}

function saveJobsToStorage() {
  try {
    localStorage.setItem(JOBS_KEY, JSON.stringify(jobsData));
  } catch {}
}

function getSavedJobs() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
  } catch {
    return [];
  }
}

function showToast(message) {
  const el = document.getElementById("toast-box");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove("show");
  }, 2400);
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("open");
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("open");
}

function closeModalOnBackdrop(event, id) {
  if (event.target.id === id) closeModal(id);
}

function showView(viewName) {
  document.getElementById("view-home").style.display = viewName === "home" ? "block" : "none";
  document.getElementById("view-vacancies").style.display = viewName === "vacancies" ? "block" : "none";
  document.getElementById("view-detail").style.display = viewName === "detail" ? "block" : "none";

  document.getElementById("nav-home").classList.toggle("active", viewName === "home");
  document.getElementById("nav-vacancies").classList.toggle("active", viewName === "vacancies");
  document.getElementById("nav-companies").classList.remove("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
  renderAllViews();
}

function openCategory(category) {
  const select = document.getElementById("search-category");
  if (select) select.value = category;
  document.querySelectorAll(".filter-category").forEach((cb) => {
    cb.checked = cb.value === category;
  });
  currentPage = 1;
  showView("vacancies");
  showToast(`Yo'nalish: ${category}`);
}

function filterByCompany(companyName) {
  const queryInput = document.getElementById("search-query");
  if (queryInput) queryInput.value = companyName;
  currentPage = 1;
  showView("vacancies");
  showToast(`${companyName} vakansiyalari ko'rsatilmoqda`);
}

function openCompaniesView() {
  currentPage = 1;
  showView("vacancies");
  document.getElementById("nav-companies").classList.add("active");
  document.getElementById("nav-vacancies").classList.remove("active");
  showToast("Hamkor kompaniyalar vakansiyalari");
}

function resetFilters() {
  const q = document.getElementById("search-query");
  const cat = document.getElementById("search-category");
  const city = document.getElementById("search-city");
  const savedOnly = document.getElementById("filter-saved-only");
  if (q) q.value = "";
  if (cat) cat.value = "";
  if (city) city.value = "";
  if (savedOnly) savedOnly.checked = false;
  document.querySelectorAll(".filter-category, .filter-worktype").forEach((cb) => {
    cb.checked = false;
  });
  currentPage = 1;
  renderVacanciesPage();
  showToast("Filtrlar tozalandi");
}

function openJobDetail(jobId) {
  selectedJobId = jobId;
  showView("detail");
}

function toggleSaveJob(jobId) {
  const saved = getSavedJobs();
  const idx = saved.indexOf(jobId);
  let added = false;
  if (idx > -1) {
    saved.splice(idx, 1);
  } else {
    saved.push(jobId);
    added = true;
  }
  localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  renderAllViews();
  showToast(added ? "Vakansiya saqlandi" : "Saqlanganlardan olib tashlandi");
}

function createJobCard(job) {
  const isSaved = getSavedJobs().includes(job.id);
  return `
    <article class="job-card card-3d">
      <div>
        <div class="job-company-row">
          <span class="company-avatar">${job.companyLetter}</span>
          <div>
            <div class="company-name">${job.company}</div>
            <div class="company-type">${job.companyType}</div>
          </div>
        </div>
        <h3 class="job-title">${job.title}</h3>
        <div class="job-salary">${job.salary}</div>
        <div class="job-meta">${job.city} · ${job.workType}</div>
      </div>
      <div class="job-actions">
        <button type="button" class="btn-3d btn-3d-yellow btn-3d-sm" onclick="openJobDetail(${job.id})">Batafsil →</button>
        <button
          type="button"
          class="btn-3d btn-3d-outline btn-3d-sm ${isSaved ? "btn-3d-saved" : ""}"
          onclick="toggleSaveJob(${job.id})"
        >
          ${isSaved ? "Saqlangan" : "Bajar"}
        </button>
      </div>
    </article>
  `;
}

function renderFeaturedJobs() {
  const container = document.getElementById("featured-jobs");
  if (!container) return;
  const featured = jobsData.filter((j) => j.featured).slice(0, 3);
  container.innerHTML = featured.map(createJobCard).join("");
}

function getFilteredJobs() {
  const queryEl = document.getElementById("search-query");
  const catSelectEl = document.getElementById("search-category");
  const citySelectEl = document.getElementById("search-city");
  const savedOnlyEl = document.getElementById("filter-saved-only");

  const query = queryEl ? queryEl.value.trim().toLowerCase() : "";
  const selectedCat = catSelectEl ? catSelectEl.value : "";
  const selectedCity = citySelectEl ? citySelectEl.value : "";
  const savedOnly = savedOnlyEl ? savedOnlyEl.checked : false;
  const savedIds = getSavedJobs();

  const checkedCategories = Array.from(
    document.querySelectorAll(".filter-category:checked")
  ).map((el) => el.value);

  const checkedWorkTypes = Array.from(
    document.querySelectorAll(".filter-worktype:checked")
  ).map((el) => el.value);

  return jobsData.filter((job) => {
    const matchesQuery =
      !query ||
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query);

    const matchesTopCat = !selectedCat || job.category === selectedCat;
    const matchesCity = !selectedCity || job.city === selectedCity;
    const matchesSidebarCat =
      checkedCategories.length === 0 || checkedCategories.includes(job.category);
    const matchesWorkType =
      checkedWorkTypes.length === 0 || checkedWorkTypes.includes(job.workType);
    const matchesSaved = !savedOnly || savedIds.includes(job.id);

    return (
      matchesQuery &&
      matchesTopCat &&
      matchesCity &&
      matchesSidebarCat &&
      matchesWorkType &&
      matchesSaved
    );
  });
}

function renderVacanciesPage() {
  const listEl = document.getElementById("all-jobs-list");
  const paginationEl = document.getElementById("pagination");
  const subEl = document.getElementById("vacancies-sub");
  if (!listEl) return;

  const filtered = getFilteredJobs();
  if (subEl) {
    subEl.textContent = `Sizga mos ishni toping (${filtered.length} ta vakansiya).`;
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  if (currentPage > totalPages) currentPage = 1;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

  if (pageItems.length === 0) {
    listEl.innerHTML = `<p class="section-subtitle">Mos vakansiya topilmadi. Filtrlarni o'zgartirib ko'ring.</p>`;
  } else {
    listEl.innerHTML = pageItems.map(createJobCard).join("");
  }

  if (paginationEl) {
    const pageCount = Math.max(3, totalPages);
    paginationEl.innerHTML = Array.from({ length: pageCount }, (_, i) => i + 1)
      .map(
        (num) => `
        <button
          type="button"
          class="page-btn ${num === currentPage ? "active" : ""}"
          onclick="goToPage(${num})"
        >
          ${num}
        </button>
      `
      )
      .join("");
  }
}

function goToPage(page) {
  currentPage = page;
  renderVacanciesPage();
}

function renderJobDetailPage() {
  const container = document.getElementById("job-detail-container");
  if (!container) return;

  const job = jobsData.find((item) => item.id === selectedJobId) || jobsData[0];
  const isSaved = getSavedJobs().includes(job.id);

  container.innerHTML = `
    <div class="detail-top">
      <div>
        <div class="job-company-row">
          <span class="company-avatar">${job.companyLetter}</span>
          <div>
            <div class="company-name">${job.company}</div>
            <div class="company-type">${job.companyType} · ${job.category}</div>
          </div>
        </div>
        <h1 style="font-size: 26px; font-weight: 800; margin-bottom: 6px;">${job.title}</h1>
        <div class="job-salary" style="font-size: 14px;">${job.salary}</div>
        <div class="job-meta">${job.city} · ${job.workType}</div>
      </div>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button
          type="button"
          class="btn-3d btn-3d-outline ${isSaved ? "btn-3d-saved" : ""}"
          onclick="toggleSaveJob(${job.id})"
        >
          ${isSaved ? "Saqlangan" : "Bajar"}
        </button>
        <button type="button" class="btn-3d btn-3d-yellow" id="apply-btn">Ariza topshirish</button>
      </div>
    </div>

    <div class="detail-section">
      <h3>Vakansiya tavsifi</h3>
      <p style="font-size: 14px; color: #3f3f46;">${job.description}</p>
    </div>

    <div class="detail-section">
      <h3>Talablar</h3>
      <ul>
        ${job.requirements.map((req) => `<li>${req}</li>`).join("")}
      </ul>
    </div>

    <div id="apply-message" class="status-msg"></div>
  `;

  const applyBtn = document.getElementById("apply-btn");
  const applyMsg = document.getElementById("apply-message");
  if (applyBtn && applyMsg) {
    applyBtn.addEventListener("click", () => {
      applyMsg.textContent = `"${job.title}" (${job.company}) vakansiyasiga arizangiz qabul qilindi!`;
      showToast("Ariza muvaffaqiyatli yuborildi!");
    });
  }
}

function bindEvents() {
  const searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      currentPage = 1;
      renderVacanciesPage();
    });
  }

  const searchQuery = document.getElementById("search-query");
  if (searchQuery) {
    searchQuery.addEventListener("input", () => {
      currentPage = 1;
      renderVacanciesPage();
    });
  }

  document
    .querySelectorAll(".filter-category, .filter-worktype, #search-category, #search-city, #filter-saved-only")
    .forEach((el) => {
      el.addEventListener("change", () => {
        currentPage = 1;
        renderVacanciesPage();
      });
    });

  const postJobForm = document.getElementById("post-job-form");
  if (postJobForm) {
    postJobForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("new-job-title").value.trim();
      const company = document.getElementById("new-job-company").value.trim();
      const salary = document.getElementById("new-job-salary").value.trim();
      const category = document.getElementById("new-job-category").value;
      const city = document.getElementById("new-job-city").value;
      const workType = document.getElementById("new-job-worktype").value;
      const description = document.getElementById("new-job-desc").value.trim();

      if (!title || !company) return;

      const newJob = {
        id: Date.now(),
        company,
        companyLetter: company.charAt(0).toUpperCase(),
        companyType: "Hamkor kompaniya",
        title,
        salary,
        city,
        workType,
        category,
        featured: true,
        description,
        requirements: [
          "Soha bo'yicha amaliy ko'nikmalar",
          "Jamoa bilan mas'uliyatli ishlash",
          "Belgilangan vazifalarni o'z vaqtida bajarish"
        ]
      };

      jobsData.unshift(newJob);
      saveJobsToStorage();
      postJobForm.reset();
      closeModal("post-job-modal");
      currentPage = 1;
      showView("vacancies");
      showToast("Yangi vakansiya qo'shildi!");
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("login-user").value.trim();
      const status = document.getElementById("login-status");
      if (status) {
        status.textContent = `Xush kelibsiz, ${user}! Profil faollashtirildi.`;
      }
      showToast(`Kabinetga kirdingiz: ${user}`);
      setTimeout(() => {
        closeModal("login-modal");
        if (status) status.textContent = "";
        loginForm.reset();
      }, 900);
    });
  }
}

function renderAllViews() {
  renderFeaturedJobs();
  renderVacanciesPage();
  renderJobDetailPage();
}

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  renderAllViews();
});