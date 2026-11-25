/**
 * AEC Tools Hub & Publishes - Application Logic
 * Pradul-P Publishes (Tools-for-AutoCAD & Tools-for-Revit & Ludarp.Civil)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================= STATE =================
  const state = {
    activeTab: 'all',          // 'all' | 'AutoLISP' | 'pyRevit' | 'Other' | 'upcoming' | 'shortcuts'
    searchQuery: '',
    subFilter: 'all',
    sortBy: 'featured',        // 'featured' | 'newest' | 'name'
    shortcutPhase: 'all',      // 'all' | 'Basics' | 'Intermediate' | 'Advanced' | 'Expert'
    shortcutSoftware: 'all',   // 'all' | 'AutoCAD' | 'Revit'
    shortcutPage: 1,
    shortcutsPerPage: 9,
    theme: localStorage.getItem('theme') || 'dark',
    activeModalTool: null,
    verifyingTool: null,
    githubPackagerDownloads: 3
  };

  // Safely grab datasets
  const publishedList = typeof toolsData !== 'undefined' ? toolsData : [];
  const upcomingList = typeof upcomingData !== 'undefined' ? upcomingData : [];
  const shortcutsData = (window.ludarpDatabase && window.ludarpDatabase.shortcuts) ? window.ludarpDatabase.shortcuts : [];

  // ================= TELEMETRY & ANALYTICS ENGINE =================
  const TELEMETRY_KEY = 'ludarp_civil_telemetry_v1';

  function getTelemetry() {
    try {
      const raw = localStorage.getItem(TELEMETRY_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      pageviews: 0,
      uniqueSessions: 0,
      downloads: {},
      views: {},
      shares: { total: 0, whatsapp: 0, email: 0, copy: 0 },
      events: []
    };
  }

  function saveTelemetry(data) {
    try {
      localStorage.setItem(TELEMETRY_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function logTelemetryEvent(type, toolId = null, extra = {}) {
    const data = getTelemetry();
    const now = new Date().toISOString();

    if (type === 'pageview') {
      data.pageviews = (data.pageviews || 0) + 1;
      if (!sessionStorage.getItem('ludarp_session_logged')) {
        sessionStorage.setItem('ludarp_session_logged', '1');
        data.uniqueSessions = (data.uniqueSessions || 0) + 1;
      }
    } else if (type === 'download' && toolId) {
      data.downloads = data.downloads || {};
      data.downloads[toolId] = (data.downloads[toolId] || 0) + 1;
    } else if (type === 'view' && toolId) {
      data.views = data.views || {};
      data.views[toolId] = (data.views[toolId] || 0) + 1;
    } else if (type === 'share') {
      data.shares = data.shares || { total: 0, whatsapp: 0, email: 0, copy: 0 };
      data.shares.total = (data.shares.total || 0) + 1;
      if (extra.channel && data.shares[extra.channel] !== undefined) {
        data.shares[extra.channel] = (data.shares[extra.channel] || 0) + 1;
      }
    }

    data.events = data.events || [];
    data.events.unshift({
      type,
      toolId,
      timestamp: now,
      ...extra
    });
    if (data.events.length > 100) data.events.length = 100;

    saveTelemetry(data);
  }

  // Live GitHub Releases API download counter fetcher for Drawing Packager
  async function fetchGitHubReleaseStats() {
    try {
      const res = await fetch('https://api.github.com/repos/PRADUL-P/Drawing-Packager/releases');
      if (res.ok) {
        const releases = await res.json();
        if (Array.isArray(releases) && releases.length > 0) {
          let count = 0;
          releases.forEach(rel => {
            if (Array.isArray(rel.assets)) {
              rel.assets.forEach(asset => {
                if (asset.name && asset.name.includes('Drawing.Packager.exe')) {
                  count += (asset.download_count || 0);
                }
              });
            }
          });
          if (count > 0) {
            state.githubPackagerDownloads = count;
            const el = document.getElementById('statPackagerGithubDownloads');
            if (el) el.textContent = count;
            const cardBadge = document.getElementById('badgeGithubDownloads-drawing-packager-v2');
            if (cardBadge) cardBadge.innerHTML = `<i class="fa-brands fa-github text-[9px]"></i> ${count} Downloads`;
          }
        }
      }
    } catch (e) {
      // Quiet fallback
    }
  }

  // Log initial pageview
  logTelemetryEvent('pageview');
  fetchGitHubReleaseStats();

  // ================= DOM REFS =================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const platformTabs = document.getElementById('platformTabs');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const subFilterSelect = document.getElementById('subFilterSelect');
  const sortSelect = document.getElementById('sortSelect');
  const visibleCount = document.getElementById('visibleCount');
  const activeSearchTag = document.getElementById('activeSearchTag');
  
  const toolsGrid = document.getElementById('toolsGrid');
  const shortcutsContainer = document.getElementById('shortcutsContainer');
  const shortcutsGrid = document.getElementById('shortcutsGrid');
  const studioContainer = document.getElementById('studioContainer');
  const emptyState = document.getElementById('emptyState');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  // Shortcuts Pagination
  const shortcutPhaseFilters = document.getElementById('shortcutPhaseFilters');
  const prevShortcutPage = document.getElementById('prevShortcutPage');
  const nextShortcutPage = document.getElementById('nextShortcutPage');
  const pageIndicator = document.getElementById('pageIndicator');

  // Stats Elements
  const statTotalTools = document.getElementById('statTotalTools');
  const statLispCount = document.getElementById('statLispCount');
  const statPyRevitCount = document.getElementById('statPyRevitCount');
  const statUpcomingCount = document.getElementById('statUpcomingCount');
  const badgeAll = document.getElementById('badgeAll');
  const badgeLisp = document.getElementById('badgeLisp');
  const badgePyRevit = document.getElementById('badgePyRevit');
  const badgeOther = document.getElementById('badgeOther');
  const badgeUpcoming = document.getElementById('badgeUpcoming');

  // Modals
  const toolModal = document.getElementById('toolModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeModalBottomBtn = document.getElementById('closeModalBottomBtn');
  const modalIconBox = document.getElementById('modalIconBox');
  const modalCategoryBadge = document.getElementById('modalCategoryBadge');
  const modalVersionBadge = document.getElementById('modalVersionBadge');
  const modalCompatibilityBadge = document.getElementById('modalCompatibilityBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalSummary = document.getElementById('modalSummary');
  const modalCommand = document.getElementById('modalCommand');
  const copyCommandBtn = document.getElementById('copyCommandBtn');
  const modalInstallType = document.getElementById('modalInstallType');
  const modalInstallSteps = document.getElementById('modalInstallSteps');
  const modalCodeSnippet = document.getElementById('modalCodeSnippet');
  const modalCopyCodeBtn = document.getElementById('modalCopyCodeBtn');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');
  const modalTagsContainer = document.getElementById('modalTagsContainer');

  // Detailed Comparison, Use Cases, Steps, and Code Toggle elements
  const modalComparisonSection = document.getElementById('modalComparisonSection');
  const modalTimeSavedBadge = document.getElementById('modalTimeSavedBadge');
  const modalManualMethod = document.getElementById('modalManualMethod');
  const modalToolMethod = document.getElementById('modalToolMethod');
  const modalStepsSavedRow = document.getElementById('modalStepsSavedRow');
  const modalStepsSavedText = document.getElementById('modalStepsSavedText');
  const modalUseCasesSection = document.getElementById('modalUseCasesSection');
  const modalUseCasesList = document.getElementById('modalUseCasesList');
  const modalUsageStepsSection = document.getElementById('modalUsageStepsSection');
  const modalUsageStepsList = document.getElementById('modalUsageStepsList');
  const modalToggleCodeBtn = document.getElementById('modalToggleCodeBtn');
  const modalToggleCodeIcon = document.getElementById('modalToggleCodeIcon');
  const modalCodeWrapper = document.getElementById('modalCodeWrapper');
  const toggleCodeLabel = document.getElementById('toggleCodeLabel');
  const modalGitHubBtn = document.getElementById('modalGitHubBtn');
  const modalVideoSection = document.getElementById('modalVideoSection');
  const modalVideoExternalLink = document.getElementById('modalVideoExternalLink');
  const modalVideoIframe = document.getElementById('modalVideoIframe');
  const modalShareBtn = document.getElementById('modalShareBtn');
  const modalShareBottomBtn = document.getElementById('modalShareBottomBtn');
  const modalSharedNotice = document.getElementById('modalSharedNotice');
  const modalSharedCopyBtn = document.getElementById('modalSharedCopyBtn');

  // Guide Modal
  const guideModal = document.getElementById('guideModal');
  const guideBtn = document.getElementById('guideBtn');
  const closeGuideModalBtn = document.getElementById('closeGuideModalBtn');
  const footerGuideTrigger = document.getElementById('footerGuideTrigger');

  // Toast
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');

  // ================= INITIALIZATION =================
  initTheme();
  updateStats();
  render();
  checkUrlDeepLink();

  // ================= THEME TOGGLE =================
  function initTheme() {
    if (state.theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      themeIcon.className = 'fa-solid fa-sun text-amber-500';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      themeIcon.className = 'fa-solid fa-moon text-slate-300';
    }
  }

  themeToggleBtn.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', state.theme);
    initTheme();
    showToast(`Switched to ${state.theme} mode`, 'fa-circle-half-stroke');
  });

  // ================= STATS UPDATE =================
  function updateStats() {
    const lispCount = publishedList.filter(t => t.category === 'AutoLISP').length;
    const pyRevitCount = publishedList.filter(t => t.category === 'pyRevit').length;
    const otherCount = publishedList.filter(t => t.category === 'Other').length;
    const totalPublished = publishedList.length;
    const totalUpcoming = upcomingList.length;

    if (statTotalTools) statTotalTools.textContent = totalPublished;
    if (statLispCount) statLispCount.textContent = lispCount;
    if (statPyRevitCount) statPyRevitCount.textContent = pyRevitCount;
    if (statUpcomingCount) statUpcomingCount.textContent = totalUpcoming;

    if (badgeAll) badgeAll.textContent = totalPublished;
    if (badgeLisp) badgeLisp.textContent = lispCount;
    if (badgePyRevit) badgePyRevit.textContent = pyRevitCount;
    if (badgeOther) badgeOther.textContent = otherCount;
    if (badgeUpcoming) badgeUpcoming.textContent = totalUpcoming;

    const totalShortcuts = shortcutsData.length;
    const autocadShortcuts = shortcutsData.filter(s => (s.software || 'AutoCAD') === 'AutoCAD').length;
    const revitShortcuts = shortcutsData.filter(s => s.software === 'Revit').length;

    const badgeShortcuts = document.getElementById('badgeShortcuts');
    if (badgeShortcuts) badgeShortcuts.textContent = totalShortcuts;

    const countAllEl = document.getElementById('countAllShortcuts');
    if (countAllEl) countAllEl.textContent = totalShortcuts;

    const countAcadEl = document.getElementById('countAutoCadShortcuts');
    if (countAcadEl) countAcadEl.textContent = autocadShortcuts;

    const countRevitEl = document.getElementById('countRevitShortcuts');
    if (countRevitEl) countRevitEl.textContent = revitShortcuts;
  }

  // ================= PLATFORM TABS =================
  platformTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    
    const targetTab = btn.getAttribute('data-tab');
    if (state.activeTab === targetTab) return;

    state.activeTab = targetTab;

    // Update active tab styles
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('border-brand-cyan', 'text-brand-cyan', 'bg-brand-cyan/10');
      b.classList.add('border-transparent', 'text-slate-400');
    });
    btn.classList.remove('border-transparent', 'text-slate-400');
    btn.classList.add('border-brand-cyan', 'text-brand-cyan', 'bg-brand-cyan/10');

    render();
  });

  // ================= SEARCH & FILTERS =================
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    clearSearchBtn.classList.toggle('hidden', state.searchQuery === '');
    render();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    clearSearchBtn.classList.add('hidden');
    render();
  });

  subFilterSelect.addEventListener('change', (e) => {
    state.subFilter = e.target.value;
    render();
  });

  sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    render();
  });

  resetFiltersBtn.addEventListener('click', () => {
    state.activeTab = 'all';
    state.searchQuery = '';
    state.subFilter = 'all';
    state.sortBy = 'featured';
    state.shortcutPhase = 'all';
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    subFilterSelect.value = 'all';
    sortSelect.value = 'featured';

    document.querySelectorAll('.tab-btn').forEach(b => {
      const isAll = b.getAttribute('data-tab') === 'all';
      b.classList.toggle('border-brand-cyan', isAll);
      b.classList.toggle('text-brand-cyan', isAll);
      b.classList.toggle('bg-brand-cyan/10', isAll);
      b.classList.toggle('border-transparent', !isAll);
      b.classList.toggle('text-slate-400', !isAll);
    });

    render();
    showToast('Filters reset', 'fa-rotate-left');
  });

  // ================= SHORTCUT PHASE FILTERS =================
  shortcutPhaseFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('.phase-btn');
    if (!btn) return;

    state.shortcutPhase = btn.getAttribute('data-phase');
    state.shortcutPage = 1;

    document.querySelectorAll('.phase-btn').forEach(b => {
      b.className = 'phase-btn px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700';
    });
    btn.className = 'phase-btn px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-cyan text-brand-dark';

    renderShortcuts();
  });

  // ================= MAIN RENDER DISPATCHER =================
  function render() {
    if (state.activeTab === 'shortcuts') {
      toolsGrid.classList.add('hidden');
      if (studioContainer) studioContainer.classList.add('hidden');
      shortcutsContainer.classList.remove('hidden');
      renderShortcuts();
    } else {
      if (studioContainer) studioContainer.classList.add('hidden');
      shortcutsContainer.classList.add('hidden');
      toolsGrid.classList.remove('hidden');
      renderTools();
    }
  }

  // ================= RENDER TOOLS =================
  function renderTools() {
    let sourceList = state.activeTab === 'upcoming' ? upcomingList : publishedList;

    let filtered = sourceList.filter(tool => {
      if (state.activeTab !== 'all' && state.activeTab !== 'upcoming') {
        if (tool.category !== state.activeTab) return false;
      }

      if (state.subFilter !== 'all') {
        const matchesTag = tool.tags.some(tag => tag.toLowerCase().includes(state.subFilter.toLowerCase()));
        const matchesTitle = tool.title.toLowerCase().includes(state.subFilter.toLowerCase());
        if (!matchesTag && !matchesTitle) return false;
      }

      if (state.searchQuery) {
        const q = state.searchQuery;
        const matchesName = tool.title.toLowerCase().includes(q);
        const matchesDesc = tool.summary.toLowerCase().includes(q);
        const matchesCmd = (tool.command || '').toLowerCase().includes(q);
        const matchesCompat = (tool.compatibility || '').toLowerCase().includes(q);
        const matchesTags = tool.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCmd && !matchesCompat && !matchesTags) {
          return false;
        }
      }
      return true;
    });

    filtered.sort((a, b) => {
      if (state.sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.title > a.title ? -1 : 1);
      } else if (state.sortBy === 'newest') {
        return (b.date > a.date ? 1 : -1);
      } else if (state.sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    visibleCount.textContent = filtered.length;
    emptyState.classList.toggle('hidden', filtered.length > 0);
    toolsGrid.classList.toggle('hidden', filtered.length === 0);

    // AutoCAD AutoLISP Banner with direct GitHub link
    const cadBanner = state.activeTab === 'AutoLISP' ? `
      <div class="col-span-1 md:col-span-2 lg:col-span-3 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center font-bold text-lg flex-shrink-0 border border-orange-500/30">
            <i class="fa-solid fa-code"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-sm font-bold text-zinc-100">AutoCAD AutoLISP Published Tools</h4>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">Official Repo</span>
            </div>
            <p class="text-xs text-zinc-400 mt-1 leading-relaxed">
              Verified production-grade AutoLISP routines for automated drafting, grid setups, and batch renumbering.
            </p>
          </div>
        </div>
        <a href="https://github.com/PRADUL-P/Tools-for-AutoCAD" target="_blank" rel="noopener noreferrer" 
           class="flex-shrink-0 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-bold flex items-center gap-2 border border-zinc-700 transition-all hover:scale-105">
          <i class="fa-brands fa-github text-sm"></i>
          <span>Tools-for-AutoCAD Repo</span>
          <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-zinc-400"></i>
        </a>
      </div>
    ` : '';

    // pyRevit Installation Notice & GitHub Repo Banner
    const pyRevitBanner = state.activeTab === 'pyRevit' ? `
      <div class="col-span-1 md:col-span-2 lg:col-span-3 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold text-lg flex-shrink-0 border border-purple-500/30">
            <i class="fa-solid fa-cubes-stacked"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-sm font-bold text-zinc-100">LUDARP pyRevit Toolkit v2.0</h4>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">Official Repo</span>
            </div>
            <p class="text-xs text-zinc-400 mt-1 leading-relaxed">
              Revit ribbon extension for View Filters, Multi-Discipline Views, Levels, Grids, and Calculations.
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <a href="https://github.com/PRADUL-P/Tools-for-Revit" target="_blank" rel="noopener noreferrer" 
             class="flex-shrink-0 px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-bold flex items-center gap-2 border border-zinc-700 transition-all hover:scale-105">
            <i class="fa-brands fa-github text-sm"></i>
            <span>Tools-for-Revit Repo</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-zinc-400"></i>
          </a>
          <button onclick="requestDownloadVerification('filter-override')" 
             class="flex-shrink-0 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105">
            <i class="fa-solid fa-file-zipper"></i>
            <span>Download Full Extension (.zip)</span>
          </button>
        </div>
      </div>
    ` : '';

    // Other Tools Banner (Desktop Automation & Standalone Tools)
    const otherBanner = state.activeTab === 'Other' ? `
      <div class="col-span-1 md:col-span-2 lg:col-span-3 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center font-bold text-lg flex-shrink-0 border border-sky-500/30">
            <i class="fa-solid fa-toolbox"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-sm font-bold text-zinc-100">Civil & AEC Desktop Automation Tools</h4>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">Official Desktop App</span>
            </div>
            <p class="text-xs text-zinc-400 mt-1 leading-relaxed">
              High-performance standalone desktop utilities and automated package distribution tools. Distributed exclusively through official GitHub repositories.
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <button onclick="requestDownloadVerification('drawing-packager-v2')" 
             class="flex-shrink-0 px-3.5 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 text-xs font-bold flex items-center gap-2 border border-sky-500/40 transition-all hover:scale-105 shadow-lg">
            <i class="fa-solid fa-bolt text-amber-400"></i>
            <span>Download .exe (Verified)</span>
          </button>
          <a href="https://github.com/PRADUL-P/Drawing-Packager/releases/tag/v2.0" target="_blank" rel="noopener noreferrer" 
             class="flex-shrink-0 px-3 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center gap-2 border border-zinc-700 transition-all hover:scale-105">
            <i class="fa-solid fa-box-archive text-purple-400"></i>
            <span>v2.0 Release</span>
          </a>
          <a href="https://youtu.be/OdTz4SFu0KI" target="_blank" rel="noopener noreferrer" 
             class="flex-shrink-0 px-3 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs font-bold flex items-center gap-2 border border-red-500/40 transition-all hover:scale-105">
            <i class="fa-brands fa-youtube text-red-400 text-sm"></i>
            <span>Video Demo</span>
          </a>
          <a href="https://github.com/PRADUL-P/Drawing-Packager" target="_blank" rel="noopener noreferrer" 
             class="flex-shrink-0 px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-bold flex items-center gap-2 border border-zinc-700 transition-all hover:scale-105">
            <i class="fa-brands fa-github text-sm"></i>
            <span>Repo</span>
          </a>
        </div>
      </div>
    ` : '';

    toolsGrid.innerHTML = cadBanner + pyRevitBanner + otherBanner + filtered.map(tool => createToolCardHtml(tool)).join('');
  }

  // ================= TOOL CARD HTML GENERATOR =================
  function createToolCardHtml(tool) {
    const isLisp = tool.category === 'AutoLISP';
    const isPyRevit = tool.category === 'pyRevit';
    const isOther = tool.category === 'Other';
    const isUpcoming = tool.isUpcoming === true;

    const platformColor = isLisp ? 'text-orange-400 bg-orange-400/10 border-orange-400/30' :
                          isPyRevit ? 'text-purple-400 bg-purple-400/10 border-purple-400/30' :
                          isOther ? 'text-sky-400 bg-sky-400/10 border-sky-400/30' :
                          'text-blue-400 bg-blue-400/10 border-blue-400/30';

    const platformIcon = isLisp ? 'fa-solid fa-code' :
                         isPyRevit ? 'fa-solid fa-cubes-stacked' :
                         isOther ? 'fa-solid fa-toolbox' :
                         'fa-solid fa-network-wired';

    const statusBadge = isUpcoming ?
      `<span class="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1 font-mono">
         <i class="fa-solid fa-hourglass-half text-[9px]"></i> Upcoming Specs
       </span>` :
      (tool.downloadGithubOnly ?
        `<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center gap-1 font-mono">
           <i class="fa-brands fa-github text-[9px]"></i> GitHub Only
         </span>` :
        (tool.featured ? 
          `<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center gap-1">
             <i class="fa-solid fa-star text-[9px]"></i> Published
           </span>` : 
          `<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
             Verified
           </span>`
        )
      );

    return `
      <div id="tool-card-${tool.id}" class="tool-card group relative flex flex-col justify-between bg-slate-900/90 dark:bg-brand-surface border border-slate-800 dark:border-brand-border rounded-2xl p-5 shadow-lg hover:border-brand-cyan transition-all">
        <div>
          <!-- Top Row: Category, Version, Status & Share -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="px-2.5 py-1 rounded-lg text-xs font-bold font-mono border ${platformColor} flex items-center gap-1.5">
                <i class="${platformIcon}"></i> ${tool.categoryLabel}
              </span>
              <span class="px-2 py-0.5 rounded text-xs font-mono text-slate-400 bg-slate-800/80 border border-slate-700/60">
                ${tool.version}
              </span>
            </div>
            <div class="flex items-center gap-1.5 flex-wrap">
              ${tool.id === 'drawing-packager-v2' ? `
                <span id="badgeGithubDownloads-drawing-packager-v2" class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1" title="Real-time releases downloads from GitHub">
                  <i class="fa-brands fa-github text-[9px]"></i> ${state.githubPackagerDownloads}+ Downloads
                </span>
              ` : ''}
              ${statusBadge}
              <button onclick="shareTool('${tool.id}', event)" 
                      title="Share direct link to ${escapeHtml(tool.title)}" 
                      class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-brand-cyan/20 text-slate-400 hover:text-brand-cyan border border-slate-700 hover:border-brand-cyan/40 flex items-center justify-center text-xs transition-all hover:scale-110"
                      aria-label="Share tool">
                <i class="fa-solid fa-share-nodes text-[11px]"></i>
              </button>
            </div>
          </div>

          <!-- Title -->
          <h3 class="text-lg font-bold text-slate-100 group-hover:text-brand-cyan transition-colors leading-snug">
            ${escapeHtml(tool.title)}
          </h3>

          <!-- Command Trigger Callout -->
          <div class="mt-2.5 flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800">
            <div class="flex items-center gap-2 overflow-hidden">
              <span class="text-[10px] uppercase font-bold text-slate-400 font-mono flex-shrink-0">
                ${isUpcoming ? 'Planned Cmd:' : 'Command:'}
              </span>
              <code class="text-xs font-mono font-bold text-brand-cyan truncate select-all">${escapeHtml(tool.command || 'N/A')}</code>
            </div>
            ${tool.command ? `
              <button onclick="copyToClipboard('${escapeJs(tool.command)}', 'Command copied!')" 
                      title="Copy Command" class="text-slate-400 hover:text-white px-1.5 py-0.5 text-xs transition-colors">
                <i class="fa-regular fa-copy"></i>
              </button>
            ` : ''}
          </div>

          <!-- Time Savings & Efficiency Badge -->
          ${tool.comparison && tool.comparison.timeSavings ? `
            <div class="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl">
              <i class="fa-solid fa-gauge-high text-[10px]"></i>
              <span class="truncate font-semibold">${escapeHtml(tool.comparison.timeSavings)}</span>
            </div>
          ` : ''}

          <!-- Summary Description -->
          <p class="text-xs text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
            ${escapeHtml(tool.summary)}
          </p>

          <!-- Video Walkthrough Link if Available -->
          ${tool.videoUrl ? `
            <a href="${tool.videoUrl}" target="_blank" rel="noopener noreferrer" 
               title="Watch ${escapeHtml(tool.videoTitle || 'Video Walkthrough')} on YouTube"
               class="mt-3 flex items-center justify-between p-2 rounded-xl bg-red-950/40 hover:bg-red-950/70 border border-red-500/30 text-xs font-semibold text-red-200 transition-all group/vid">
              <div class="flex items-center gap-2">
                <i class="fa-brands fa-youtube text-red-400 text-sm"></i>
                <span class="text-[11px] font-bold text-slate-200">Video Walkthrough (YouTube)</span>
              </div>
              <span class="text-[10px] font-mono text-red-400 flex items-center gap-1 group-hover/vid:translate-x-0.5 transition-transform">
                Watch <i class="fa-solid fa-play text-[8px]"></i>
              </span>
            </a>
          ` : ''}

          <!-- Planned Features if Upcoming -->
          ${isUpcoming && tool.plannedFeatures ? `
            <div class="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div class="text-[10px] uppercase font-bold text-amber-400 font-mono mb-1 flex items-center gap-1">
                <i class="fa-solid fa-list-check"></i> Development Specs:
              </div>
              <ul class="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                ${tool.plannedFeatures.slice(0, 2).map(f => `<li>${escapeHtml(f)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- Compatibility -->
          <div class="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
            <i class="fa-solid fa-microchip text-brand-cyan"></i>
            <span class="truncate">${escapeHtml(tool.compatibility)}</span>
          </div>

          <!-- Tags -->
          <div class="mt-3 flex items-center gap-1.5 flex-wrap">
            ${tool.tags.map(tag => `
              <span onclick="filterByTag('${escapeJs(tag)}')" 
                    class="cursor-pointer text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-brand-cyan transition-all">
                #${escapeHtml(tag)}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
          ${isUpcoming ? `
            <!-- Non-Downloadable Area Actions -->
            <button onclick="openToolModal('${tool.id}', true)" 
                    class="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 hover:border-slate-600 transition-all">
              <i class="fa-solid fa-book-open text-amber-400"></i> View Specs & Architecture
            </button>
            <button onclick="shareTool('${tool.id}', event)" 
                    title="Share direct link to ${escapeHtml(tool.title)}" 
                    class="py-2 px-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-brand-cyan border border-zinc-700 hover:border-brand-cyan/40 text-xs font-semibold flex items-center justify-center transition-all hover:scale-105"
                    aria-label="Share tool">
              <i class="fa-solid fa-share-nodes text-xs"></i>
            </button>
            <span class="py-2 px-3 rounded-xl bg-slate-800/50 text-slate-500 border border-slate-700/50 text-xs font-mono font-semibold flex items-center gap-1.5 cursor-not-allowed" title="Non-downloadable: In active development">
              <i class="fa-solid fa-lock text-[10px]"></i> In Pipeline
            </span>
          ` : `
            <!-- Published Downloadable Actions -->
            <button onclick="openToolModal('${tool.id}', false)" 
                    class="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 hover:border-slate-600 transition-all">
              <i class="fa-solid fa-eye text-brand-cyan"></i> Details & Code
            </button>
            
            <button onclick="shareTool('${tool.id}', event)" 
                    title="Share direct link to ${escapeHtml(tool.title)}" 
                    class="py-2 px-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-brand-cyan border border-zinc-700 hover:border-brand-cyan/40 text-xs font-semibold flex items-center justify-center transition-all hover:scale-105"
                    aria-label="Share tool">
              <i class="fa-solid fa-share-nodes text-xs"></i>
            </button>
            
            ${tool.downloadGithubOnly ? `
              <button onclick="requestDownloadVerification('${tool.id}')" 
                 title="Verified Download (1-Click .exe)" 
                 class="py-2 px-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 shadow-sm">
                <i class="fa-solid fa-bolt text-amber-400"></i>
                <span class="text-xs font-bold">1-Click .exe</span>
                <i class="fa-solid fa-download text-[10px]"></i>
              </button>

              <a href="${tool.releasePageUrl || 'https://github.com/PRADUL-P/Drawing-Packager/releases/tag/v2.0'}" target="_blank" rel="noopener noreferrer" 
                 title="📦 GitHub Release Page (v2.0)"
                 class="py-2 px-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 text-xs font-semibold flex items-center gap-1.5 transition-all">
                <i class="fa-solid fa-box-archive text-purple-400 text-xs"></i>
                <span class="hidden sm:inline text-[11px]">v2.0</span>
              </a>

              <a href="${tool.githubUrl || 'https://github.com/PRADUL-P/Drawing-Packager'}" target="_blank" rel="noopener noreferrer" 
                 title="📄 Main Repository"
                 class="py-2 px-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 text-xs font-semibold flex items-center gap-1.5 transition-all">
                <i class="fa-brands fa-github text-sm"></i>
                <span class="hidden sm:inline text-[11px]">Repo</span>
              </a>
            ` : `
              <a href="${tool.githubUrl || (isLisp ? 'https://github.com/PRADUL-P/Tools-for-AutoCAD' : isPyRevit ? 'https://github.com/PRADUL-P/Tools-for-Revit' : 'https://github.com/PRADUL-P')}" 
                 target="_blank" rel="noopener noreferrer" 
                 title="Open ${escapeHtml(tool.title)} in GitHub"
                 class="py-2 px-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 text-xs font-semibold flex items-center gap-1.5 transition-all">
                <i class="fa-brands fa-github text-sm"></i>
                <span class="hidden sm:inline text-[11px]">Repo</span>
              </a>

              <button onclick="requestDownloadVerification('${tool.id}')" 
                      title="${isPyRevit ? 'Download Full Extension (.zip)' : 'Download .lsp'}" 
                      class="py-2 px-3 rounded-xl ${isPyRevit ? 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border-purple-500/40' : 'bg-brand-cyan/20 hover:bg-brand-cyan/30 text-brand-cyan border-brand-cyan/30'} border text-xs font-semibold flex items-center gap-1.5 transition-all">
                <i class="${isPyRevit ? 'fa-solid fa-file-zipper' : 'fa-solid fa-download'}"></i>
                <span class="hidden sm:inline">${isPyRevit ? 'Extension (.zip)' : 'Download .lsp'}</span>
              </button>
            `}
          `}
        </div>

      </div>
    `;
  }

  // ================= RENDER SHORTCUTS =================
  function renderShortcuts() {
    let filtered = shortcutsData.filter(item => {
      if (state.shortcutSoftware !== 'all') {
        const itemSoft = item.software || 'AutoCAD';
        if (itemSoft.toLowerCase() !== state.shortcutSoftware.toLowerCase()) return false;
      }
      if (state.shortcutPhase !== 'all' && item.phase !== state.shortcutPhase) {
        return false;
      }
      if (state.searchQuery) {
        const q = state.searchQuery;
        const matchesShortcut = item.shortcut.toLowerCase().includes(q);
        const matchesAction = item.action.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesSoft = (item.software || '').toLowerCase().includes(q);
        const matchesProTip = (item.proTip || '').toLowerCase().includes(q);
        if (!matchesShortcut && !matchesAction && !matchesDesc && !matchesSoft && !matchesProTip) {
          return false;
        }
      }
      return true;
    });

    visibleCount.textContent = filtered.length;
    emptyState.classList.toggle('hidden', filtered.length > 0);
    shortcutsGrid.classList.toggle('hidden', filtered.length === 0);

    const totalPages = Math.ceil(filtered.length / state.shortcutsPerPage) || 1;
    if (state.shortcutPage > totalPages) state.shortcutPage = totalPages;
    if (state.shortcutPage < 1) state.shortcutPage = 1;

    pageIndicator.textContent = `Page ${state.shortcutPage} of ${totalPages} (${filtered.length} shortcuts)`;
    prevShortcutPage.disabled = state.shortcutPage <= 1;
    nextShortcutPage.disabled = state.shortcutPage >= totalPages;

    const startIdx = (state.shortcutPage - 1) * state.shortcutsPerPage;
    const pageItems = filtered.slice(startIdx, startIdx + state.shortcutsPerPage);

    shortcutsGrid.innerHTML = pageItems.map(item => {
      const isRevit = (item.software || '').toLowerCase() === 'revit';
      const softBadge = isRevit ?
        `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
           <i class="fa-solid fa-cubes-stacked text-[9px]"></i> Revit BIM
         </span>` :
        `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center gap-1">
           <i class="fa-solid fa-code text-[9px]"></i> AutoCAD
         </span>`;

      return `
        <div class="tool-card group bg-slate-900 dark:bg-brand-surface border border-slate-800 dark:border-brand-border rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-brand-cyan transition-all">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <div class="flex items-center gap-2">
                ${softBadge}
                <span class="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-800">
                  ${escapeHtml(item.phase || 'Essential')}
                </span>
              </div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                ${escapeHtml(item.difficulty || 'Essential')}
              </span>
            </div>

            <div class="my-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <code class="text-sm font-mono font-extrabold text-brand-cyan tracking-wide select-all">${escapeHtml(item.shortcut)}</code>
              <button onclick="copyToClipboard('${escapeJs(item.shortcut)}', 'Shortcut copied!')" 
                      class="text-xs text-slate-400 hover:text-white p-1">
                <i class="fa-regular fa-copy"></i>
              </button>
            </div>

            <h4 class="text-base font-bold text-slate-100">${escapeHtml(item.action)}</h4>
            <p class="text-xs text-slate-300 mt-2 leading-relaxed">${escapeHtml(item.description)}</p>

            ${item.steps && item.steps.length ? `
              <div class="mt-3 pt-3 border-t border-slate-800/80">
                <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1.5">How To:</div>
                <ul class="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  ${item.steps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            ${item.proTip ? `
              <div class="mt-3 p-2.5 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan">
                <strong class="font-bold flex items-center gap-1 mb-0.5">
                  <i class="fa-regular fa-lightbulb"></i> Pro Tip:
                </strong>
                <span class="text-slate-300">${escapeHtml(item.proTip)}</span>
              </div>
            ` : ''}
          </div>

          <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Ludarp Civil Studio</span>
            <span>${item.hashtags ? escapeHtml(item.hashtags[0] || '') : ''}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Software filter listener
  const shortcutSoftwareFilters = document.getElementById('shortcutSoftwareFilters');
  if (shortcutSoftwareFilters) {
    shortcutSoftwareFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.software-btn');
      if (!btn) return;
      state.shortcutSoftware = btn.getAttribute('data-software');
      state.shortcutPage = 1;

      document.querySelectorAll('.software-btn').forEach(b => {
        b.className = 'software-btn px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all flex items-center gap-1.5';
      });
      btn.className = 'software-btn px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-cyan text-brand-dark transition-all flex items-center gap-1.5 shadow-sm';

      renderShortcuts();
    });
  }

  // Pagination clicks
  prevShortcutPage.addEventListener('click', () => {
    if (state.shortcutPage > 1) {
      state.shortcutPage--;
      renderShortcuts();
      window.scrollTo({ top: shortcutsContainer.offsetTop - 100, behavior: 'smooth' });
    }
  });

  nextShortcutPage.addEventListener('click', () => {
    state.shortcutPage++;
    renderShortcuts();
    window.scrollTo({ top: shortcutsContainer.offsetTop - 100, behavior: 'smooth' });
  });

  // ================= MODAL LOGIC =================
  window.openToolModal = function(toolId, isUpcoming = false, isFromUrl = false) {
    const list = isUpcoming ? upcomingList : publishedList;
    const tool = list.find(t => t.id === toolId);
    if (!tool) return;

    state.activeModalTool = tool;

    // Log telemetry event for tool view
    logTelemetryEvent('view', tool.id, { title: tool.title });

    // Update URL query param to reflect this active tool for easy direct sharing
    try {
      history.replaceState({ toolId: tool.id }, '', `?tool=${encodeURIComponent(tool.id)}`);
    } catch (e) {}

    // Show shared direct link notice banner if opened from an external shared link
    if (modalSharedNotice) {
      modalSharedNotice.classList.toggle('hidden', !isFromUrl);
    }

    const isLisp = tool.category === 'AutoLISP';
    const isPyRevit = tool.category === 'pyRevit';
    const isOther = tool.category === 'Other';

    modalIconBox.className = isLisp ? 'w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-orange-400/15 text-orange-400 border border-orange-400/30' :
                             isPyRevit ? 'w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-purple-400/15 text-purple-400 border border-purple-400/30' :
                             isOther ? 'w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-sky-400/15 text-sky-400 border border-sky-400/30' :
                             'w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-blue-400/15 text-blue-400 border border-blue-400/30';

    modalIconBox.innerHTML = isLisp ? '<i class="fa-solid fa-code"></i>' :
                             isPyRevit ? '<i class="fa-solid fa-cubes-stacked"></i>' :
                             isOther ? '<i class="fa-solid fa-toolbox"></i>' :
                             '<i class="fa-solid fa-network-wired"></i>';

    modalCategoryBadge.textContent = tool.categoryLabel;
    modalVersionBadge.textContent = tool.version;
    modalCompatibilityBadge.textContent = tool.compatibility;
    modalTitle.textContent = tool.title;
    modalSummary.textContent = tool.summary;
    modalCommand.textContent = tool.command || 'Planned';

    // ⏱️ Workflow Comparison: Without Tool vs. With Tool
    if (tool.comparison) {
      if (modalComparisonSection) modalComparisonSection.classList.remove('hidden');
      if (modalTimeSavedBadge) modalTimeSavedBadge.textContent = tool.comparison.timeSavings || 'High Efficiency';
      if (modalManualMethod) modalManualMethod.textContent = tool.comparison.manualMethod || 'Manual clicks and repetitive input.';
      if (modalToolMethod) modalToolMethod.textContent = tool.comparison.toolMethod || 'One-click automated execution.';
      if (modalStepsSavedRow) {
        if (tool.comparison.stepsSaved) {
          modalStepsSavedRow.classList.remove('hidden');
          if (modalStepsSavedText) modalStepsSavedText.textContent = tool.comparison.stepsSaved;
        } else {
          modalStepsSavedRow.classList.add('hidden');
        }
      }
    } else {
      if (modalComparisonSection) modalComparisonSection.classList.add('hidden');
    }

    // 🎯 Practical Use Cases List
    if (tool.useCases && tool.useCases.length) {
      if (modalUseCasesSection) modalUseCasesSection.classList.remove('hidden');
      if (modalUseCasesList) {
        modalUseCasesList.innerHTML = tool.useCases.map(uc => `
          <li class="pl-1"><span class="font-semibold text-slate-200">${escapeHtml(uc)}</span></li>
        `).join('');
      }
    } else {
      if (modalUseCasesSection) modalUseCasesSection.classList.add('hidden');
    }

    // 📋 Step-by-Step How to Use (In-Software Guide)
    if (tool.usageSteps && tool.usageSteps.length) {
      if (modalUsageStepsSection) modalUsageStepsSection.classList.remove('hidden');
      if (modalUsageStepsList) {
        modalUsageStepsList.innerHTML = tool.usageSteps.map(step => `
          <li class="pl-1 leading-relaxed"><span class="text-slate-200">${escapeHtml(step)}</span></li>
        `).join('');
      }
    } else {
      if (modalUsageStepsSection) modalUsageStepsSection.classList.add('hidden');
    }

    // 🎥 Video Walkthrough Section
    if (tool.videoUrl && modalVideoSection) {
      modalVideoSection.classList.remove('hidden');
      if (modalVideoIframe) {
        modalVideoIframe.src = tool.videoEmbedUrl || `https://www.youtube-nocookie.com/embed/${tool.videoUrl.split('/').pop()}`;
      }
      if (modalVideoExternalLink) {
        modalVideoExternalLink.href = tool.videoUrl;
      }
    } else if (modalVideoSection) {
      modalVideoSection.classList.add('hidden');
      if (modalVideoIframe) modalVideoIframe.src = '';
    }

    // ⚙️ Installation / Load Guide
    if (isUpcoming) {
      modalInstallType.textContent = "Planned Architecture & Specifications";
      modalInstallSteps.innerHTML = tool.plannedFeatures ? 
        tool.plannedFeatures.map(step => `<li>${escapeHtml(step)}</li>`).join('') :
        `<li>Tool is currently in development and functional testing.</li><li>Scheduled for upcoming release in Tools-for-AutoCAD / Tools-for-Revit.</li>`;
      
      modalDownloadBtn.classList.add('opacity-50', 'cursor-not-allowed');
      modalDownloadBtn.innerHTML = '<i class="fa-solid fa-lock"></i> <span>In Development (Non-Downloadable)</span>';
      modalDownloadBtn.onclick = () => showToast('This upcoming tool is currently non-downloadable in active testing.', 'fa-lock');
    } else if (tool.downloadGithubOnly) {
      modalInstallType.textContent = `${tool.installGuide ? tool.installGuide.type : 'Installation'} Steps`;
      modalInstallSteps.innerHTML = tool.installGuide && tool.installGuide.steps ? 
        tool.installGuide.steps.map(step => `<li>${escapeHtml(step)}</li>`).join('') :
        `<li>Download standalone executable directly from GitHub Releases.</li>`;
      
      modalDownloadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      modalDownloadBtn.innerHTML = '<i class="fa-solid fa-bolt text-amber-400 text-sm"></i> <span>⚡ Verified Download (.exe)</span> <i class="fa-solid fa-download text-[10px] ml-1"></i>';
      modalDownloadBtn.onclick = () => requestDownloadVerification(tool.id);
    } else {
      modalInstallType.textContent = `${tool.installGuide ? tool.installGuide.type : 'Installation'} Steps`;
      modalInstallSteps.innerHTML = tool.installGuide && tool.installGuide.steps ? 
        tool.installGuide.steps.map(step => `<li>${escapeHtml(step)}</li>`).join('') :
        `<li>Download and load using standard platform commands.</li>`;
      
      modalDownloadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      modalDownloadBtn.innerHTML = '<i class="fa-solid fa-download"></i> <span>Download File</span>';
      modalDownloadBtn.onclick = () => requestDownloadVerification(tool.id);
    }

    // Modal WhatsApp & Email share buttons
    const modalShareWhatsAppBtn = document.getElementById('modalShareWhatsAppBtn');
    if (modalShareWhatsAppBtn) modalShareWhatsAppBtn.onclick = () => shareWhatsApp(tool.id);
    const modalShareEmailBtn = document.getElementById('modalShareEmailBtn');
    if (modalShareEmailBtn) modalShareEmailBtn.onclick = () => shareEmail(tool.id);

    // 💻 Code Snippet (Hidden by default - Collapsed)
    if (modalCodeWrapper) modalCodeWrapper.classList.add('hidden');
    if (modalToggleCodeIcon) modalToggleCodeIcon.className = 'fa-solid fa-chevron-down text-slate-400 transition-transform';
    if (toggleCodeLabel) toggleCodeLabel.textContent = 'View Source Code (Optional)';
    modalCodeSnippet.textContent = tool.codeSnippet || '// Code snippet will be available upon public release.';

    // 🐙 GitHub Repo Link
    if (modalGitHubBtn) {
      const fallbackRepo = isLisp ? 'https://github.com/PRADUL-P/Tools-for-AutoCAD' : 
                           isPyRevit ? 'https://github.com/PRADUL-P/Tools-for-Revit' : 
                           isOther ? 'https://github.com/PRADUL-P/Drawing-Packager' :
                           'https://github.com/PRADUL-P';
      modalGitHubBtn.href = tool.githubUrl || fallbackRepo;
      modalGitHubBtn.title = `Open ${tool.title} in GitHub Repository`;
    }

    modalTagsContainer.innerHTML = tool.tags.map(tag => `
      <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">#${escapeHtml(tag)}</span>
    `).join('');

    // Wire up modal share buttons
    if (modalShareBtn) {
      modalShareBtn.onclick = () => shareTool(tool.id);
    }
    if (modalShareBottomBtn) {
      modalShareBottomBtn.onclick = () => shareTool(tool.id);
    }
    if (modalSharedCopyBtn) {
      modalSharedCopyBtn.onclick = () => shareTool(tool.id);
    }

    toolModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  function closeToolModal() {
    toolModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    if (modalVideoIframe) modalVideoIframe.src = '';
    if (modalSharedNotice) modalSharedNotice.classList.add('hidden');
    try {
      history.replaceState({}, '', window.location.pathname);
    } catch (e) {}
  }

  closeModalBtn.addEventListener('click', closeToolModal);
  closeModalBottomBtn.addEventListener('click', closeToolModal);
  toolModal.addEventListener('click', (e) => {
    if (e.target === toolModal) closeToolModal();
  });

  // Modal actions
  copyCommandBtn.addEventListener('click', () => {
    if (state.activeModalTool && state.activeModalTool.command) {
      copyToClipboard(state.activeModalTool.command, 'Command copied!');
    }
  });

  modalCopyCodeBtn.addEventListener('click', () => {
    if (state.activeModalTool && state.activeModalTool.codeSnippet) {
      copyToClipboard(state.activeModalTool.codeSnippet, 'Script code copied to clipboard!');
    }
  });

  // Code toggle button (hidden by default, expands on demand)
  if (modalToggleCodeBtn) {
    modalToggleCodeBtn.addEventListener('click', () => {
      if (!modalCodeWrapper) return;
      const isHidden = modalCodeWrapper.classList.toggle('hidden');
      if (isHidden) {
        if (modalToggleCodeIcon) modalToggleCodeIcon.className = 'fa-solid fa-chevron-down text-slate-400 transition-transform';
        if (toggleCodeLabel) toggleCodeLabel.textContent = 'View Source Code (Optional)';
      } else {
        if (modalToggleCodeIcon) modalToggleCodeIcon.className = 'fa-solid fa-chevron-up text-brand-cyan transition-transform';
        if (toggleCodeLabel) toggleCodeLabel.textContent = 'Hide Source Code';
      }
    });
  }

  // ================= GUIDE MODAL =================
  function openGuideModal() {
    guideModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeGuideModal() {
    guideModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  guideBtn.addEventListener('click', openGuideModal);
  if (footerGuideTrigger) footerGuideTrigger.addEventListener('click', openGuideModal);
  closeGuideModalBtn.addEventListener('click', closeGuideModal);
  guideModal.addEventListener('click', (e) => {
    if (e.target === guideModal) closeGuideModal();
  });

  // Keyboard escape handler for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeToolModal();
      closeGuideModal();
    }
  });

  // ================= LEAD CAPTURE & DOWNLOAD ACCESS =================
  const LEADS_KEY = 'ludarp_civil_leads_v1';
  const USER_KEY = 'ludarp_saved_user_profile';

  function getSavedUser() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { name: '', email: '', phone: '', org: '' };
  }

  function saveUser(user) {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {}
  }

  function getLeads() {
    try {
      const raw = localStorage.getItem(LEADS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
  }

  function saveLead(lead) {
    const leads = getLeads();
    leads.unshift(lead);
    if (leads.length > 300) leads.length = 300;
    try {
      localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    } catch (e) {}
  }

  // ================= VERIFIED DOWNLOAD MODAL & ACTIONS =================
  window.requestDownloadVerification = function(toolId) {
    const list = [...publishedList, ...upcomingList];
    const tool = list.find(t => t.id === toolId);
    if (!tool) return;

    if (tool.isUpcoming) {
      showToast('This tool is currently in the upcoming roadmap.', 'fa-lock');
      return;
    }

    state.verifyingTool = tool;

    const modal = document.getElementById('downloadVerifyModal');
    const titleEl = document.getElementById('verifyModalTitle');
    const catEl = document.getElementById('verifyModalCategory');
    const fileEl = document.getElementById('verifyModalFileName');
    const iconBox = document.getElementById('verifyModalIcon');

    if (titleEl) titleEl.textContent = tool.title;
    if (catEl) catEl.textContent = tool.categoryLabel || tool.category;

    const isOther = tool.category === 'Other';
    const isPyRevit = tool.category === 'pyRevit';

    let defaultFileName = isOther ? 'LUDARP.Drawing.Packager.exe' :
                          isPyRevit ? 'Ludarp_pyRevit_Extension_Full.zip' :
                          `${tool.id}.lsp`;
    if (tool.downloadFilename) defaultFileName = tool.downloadFilename;
    if (fileEl) fileEl.textContent = defaultFileName;

    if (iconBox) {
      iconBox.className = isOther ? 'w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-sky-500/15 text-sky-400 border border-sky-500/30' :
                          isPyRevit ? 'w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-purple-500/15 text-purple-400 border border-purple-500/30' :
                          'w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-orange-500/15 text-orange-400 border border-orange-500/30';
      iconBox.innerHTML = isOther ? '<i class="fa-solid fa-toolbox"></i>' :
                          isPyRevit ? '<i class="fa-solid fa-cubes-stacked"></i>' :
                          '<i class="fa-solid fa-code"></i>';
    }

    // Pre-fill previously saved user details if available
    const savedUser = getSavedUser();
    const nameInput = document.getElementById('leadNameInput');
    const emailInput = document.getElementById('leadEmailInput');
    const phoneInput = document.getElementById('leadPhoneInput');
    const orgInput = document.getElementById('leadOrgInput');

    if (nameInput && savedUser.name) nameInput.value = savedUser.name;
    if (emailInput && savedUser.email) emailInput.value = savedUser.email;
    if (phoneInput && savedUser.phone) phoneInput.value = savedUser.phone;
    if (orgInput && savedUser.org) orgInput.value = savedUser.org;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeDownloadVerification = function() {
    const modal = document.getElementById('downloadVerifyModal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };

  // Submit Details & Instant Automated Download
  window.handleDownloadAccessSubmit = function(event) {
    if (event) event.preventDefault();
    const tool = state.verifyingTool;
    if (!tool) return;

    const nameInput = document.getElementById('leadNameInput');
    const emailInput = document.getElementById('leadEmailInput');
    const phoneInput = document.getElementById('leadPhoneInput');
    const orgInput = document.getElementById('leadOrgInput');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const org = orgInput ? orgInput.value.trim() : '';

    if (!name) {
      showToast('Please enter your full name.', 'fa-circle-exclamation');
      if (nameInput) nameInput.focus();
      return;
    }

    if (!email && !phone) {
      showToast('Please provide either an Email or Phone (WhatsApp) to receive or unlock the file.', 'fa-circle-exclamation');
      if (emailInput) emailInput.focus();
      return;
    }

    // Save lead record
    const now = new Date().toISOString();
    const leadRecord = {
      name,
      email: email || 'N/A',
      phone: phone || 'N/A',
      org: org || 'Independent',
      toolId: tool.id,
      toolTitle: tool.title,
      timestamp: now,
      method: 'Automated Unlock'
    };
    saveLead(leadRecord);
    saveUser({ name, email, phone, org });
    logTelemetryEvent('download', tool.id, { title: tool.title, leadName: name, contact: email || phone });

    // Determine filename
    const isOther = tool.category === 'Other';
    const isPyRevit = tool.category === 'pyRevit';
    let defaultFileName = isOther ? 'LUDARP.Drawing.Packager.exe' :
                          isPyRevit ? 'Ludarp_pyRevit_Extension_Full.zip' :
                          `${tool.id}.lsp`;
    if (tool.downloadFilename) defaultFileName = tool.downloadFilename;

    // Trigger instant automated download
    if (tool.downloadGithubOnly) {
      window.open(tool.downloadUrl || 'https://github.com/PRADUL-P/Drawing-Packager/releases/download/v2.0/LUDARP.Drawing.Packager.exe', '_blank');
    } else if (tool.downloadUrl) {
      const link = document.createElement('a');
      link.href = tool.downloadUrl;
      link.download = defaultFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const blob = new Blob([tool.codeSnippet || '; LUDARP Civil Tool'], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = defaultFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    closeDownloadVerification();
    showToast(`Access granted! Downloading ${defaultFileName}...`, 'fa-circle-check');
  };

  // Ask Pradul on WhatsApp for the file or link
  window.askPradulOnWhatsApp = function() {
    const tool = state.verifyingTool;
    if (!tool) return;

    const nameInput = document.getElementById('leadNameInput');
    const emailInput = document.getElementById('leadEmailInput');
    const phoneInput = document.getElementById('leadPhoneInput');
    const orgInput = document.getElementById('leadOrgInput');

    const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Prospective User';
    const email = emailInput && emailInput.value.trim() ? emailInput.value.trim() : '';
    const phone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : '';
    const org = orgInput && orgInput.value.trim() ? orgInput.value.trim() : '';

    const contact = [phone, email].filter(Boolean).join(' / ') || 'WhatsApp';

    // Save lead record
    saveLead({
      name,
      email: email || 'N/A',
      phone: phone || 'N/A',
      org: org || 'N/A',
      toolId: tool.id,
      toolTitle: tool.title,
      timestamp: new Date().toISOString(),
      method: 'WhatsApp Request'
    });
    if (name !== 'Prospective User') {
      saveUser({ name, email, phone, org });
    }
    logTelemetryEvent('share', tool.id, { channel: 'whatsapp_request', name });

    const toolHubUrl = `${window.location.origin}${window.location.pathname}?tool=${encodeURIComponent(tool.id)}`;
    const msg = `Hello Pradul, I would like to request the download file / link for *${tool.title}* (${tool.version || 'v2.0'}).\n\n*My Details:*\n• Name: ${name}\n• Contact (WhatsApp/Email): ${contact}\n• Company/Role: ${org || 'Civil Engineering'}\n\n🌐 Tool Reference:\n${toolHubUrl}`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
    showToast('Opening WhatsApp to send request to Pradul...', 'fa-brands fa-whatsapp');
  };

  // Ask Pradul via Email for the file or link
  window.askPradulViaEmail = function() {
    const tool = state.verifyingTool;
    if (!tool) return;

    const nameInput = document.getElementById('leadNameInput');
    const emailInput = document.getElementById('leadEmailInput');
    const phoneInput = document.getElementById('leadPhoneInput');
    const orgInput = document.getElementById('leadOrgInput');

    const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'User';
    const email = emailInput && emailInput.value.trim() ? emailInput.value.trim() : '';
    const phone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : '';
    const org = orgInput && orgInput.value.trim() ? orgInput.value.trim() : '';

    saveLead({
      name,
      email: email || 'N/A',
      phone: phone || 'N/A',
      org: org || 'N/A',
      toolId: tool.id,
      toolTitle: tool.title,
      timestamp: new Date().toISOString(),
      method: 'Email Request'
    });
    if (name !== 'User') {
      saveUser({ name, email, phone, org });
    }
    logTelemetryEvent('share', tool.id, { channel: 'email_request', name });

    const toolHubUrl = `${window.location.origin}${window.location.pathname}?tool=${encodeURIComponent(tool.id)}`;
    const subject = `Download Access Request for ${tool.title} - ${name}`;
    const body = `Hello Pradul,\n\nI would like to request the download file / link for ${tool.title} (${tool.version || 'Latest'}).\n\nMy Details:\n• Name: ${name}\n• Email: ${email}\n• Phone / WhatsApp: ${phone}\n• Company / Role: ${org}\n\nTool Page:\n${toolHubUrl}\n\nThank you!`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast('Opening Email client to send request...', 'fa-envelope');
  };

  // Legacy downloadToolFile routes directly through verification modal
  window.downloadToolFile = function(toolId) {
    requestDownloadVerification(toolId);
  };

  // Direct WhatsApp & Email sharing helpers
  window.shareWhatsApp = function(toolId) {
    const list = [...publishedList, ...upcomingList];
    const tool = list.find(t => t.id === toolId);
    if (!tool) return;
    logTelemetryEvent('share', tool.id, { channel: 'whatsapp', title: tool.title });
    const toolHubUrl = `${window.location.origin}${window.location.pathname}?tool=${encodeURIComponent(tool.id)}`;
    const directDlUrl = tool.downloadUrl || (tool.downloadGithubOnly ? 'https://github.com/PRADUL-P/Drawing-Packager/releases/download/v2.0/LUDARP.Drawing.Packager.exe' : toolHubUrl);
    const msg = `🚀 *Download ${tool.title}* (${tool.version || 'Latest'}) — Ludarp Civil\n${tool.summary}\n\n⚡ *Download Link:*\n${directDlUrl}\n\n🌐 *Tool Specs & Web Hub:*\n${toolHubUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
    showToast('Opening WhatsApp to share...', 'fa-brands fa-whatsapp');
  };

  window.shareEmail = function(toolId) {
    const list = [...publishedList, ...upcomingList];
    const tool = list.find(t => t.id === toolId);
    if (!tool) return;
    logTelemetryEvent('share', tool.id, { channel: 'email', title: tool.title });
    const toolHubUrl = `${window.location.origin}${window.location.pathname}?tool=${encodeURIComponent(tool.id)}`;
    const directDlUrl = tool.downloadUrl || (tool.downloadGithubOnly ? 'https://github.com/PRADUL-P/Drawing-Packager/releases/download/v2.0/LUDARP.Drawing.Packager.exe' : toolHubUrl);
    const subject = `Download ${tool.title} - Ludarp Civil`;
    const body = `Hi,\n\nHere is the verified download link for ${tool.title} (${tool.version || 'Latest'}) from Ludarp Civil:\n\n${tool.summary}\n\nDownload Link:\n${directDlUrl}\n\nTool Details & Documentation:\n${toolHubUrl}\n\nBest regards,\nLudarp Civil`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast('Opening email client...', 'fa-envelope');
  };

  // ================= ANALYTICS MODAL LOGIC =================
  const analyticsModal = document.getElementById('analyticsModal');
  const analyticsBtn = document.getElementById('analyticsBtn');
  const closeAnalyticsModalBtn = document.getElementById('closeAnalyticsModalBtn');
  const analyticsExportBtn = document.getElementById('analyticsExportBtn');
  const analyticsRefreshBtn = document.getElementById('analyticsRefreshBtn');
  const analyticsResetBtn = document.getElementById('analyticsResetBtn');

  function renderAnalyticsModal() {
    const data = getTelemetry();

    const statViews = document.getElementById('statTotalPageviews');
    const statDls = document.getElementById('statTotalDownloads');
    const statPackagerDls = document.getElementById('statPackagerGithubDownloads');
    const statShares = document.getElementById('statTotalShares');
    const tableBody = document.getElementById('analyticsTableBody');

    if (statViews) statViews.textContent = data.pageviews || 1;

    let totalLocalDls = 0;
    if (data.downloads) {
      totalLocalDls = Object.values(data.downloads).reduce((a, b) => a + b, 0);
    }
    if (statDls) statDls.textContent = totalLocalDls;
    if (statPackagerDls) statPackagerDls.textContent = state.githubPackagerDownloads || 3;
    if (statShares) statShares.textContent = data.shares ? (data.shares.total || 0) : 0;

    // Per-Tool Table
    if (tableBody) {
      const allTools = [...publishedList, ...upcomingList];
      tableBody.innerHTML = allTools.map(tool => {
        const dls = data.downloads ? (data.downloads[tool.id] || 0) : 0;
        const views = data.views ? (data.views[tool.id] || 0) : 0;
        const isUpcoming = tool.isUpcoming === true;
        const extraNote = tool.id === 'drawing-packager-v2' ? ` (GH: ${state.githubPackagerDownloads})` : '';

        return `
          <tr class="hover:bg-slate-800/40 transition-colors">
            <td class="p-2.5 font-bold text-slate-200">
              ${escapeHtml(tool.title)}
            </td>
            <td class="p-2.5">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono ${tool.category === 'pyRevit' ? 'text-purple-400 bg-purple-500/10' : tool.category === 'Other' ? 'text-sky-400 bg-sky-500/10' : 'text-orange-400 bg-orange-500/10'}">
                ${escapeHtml(tool.categoryLabel || tool.category)}
              </span>
            </td>
            <td class="p-2.5 text-center font-bold text-emerald-400">
              ${dls}${extraNote}
            </td>
            <td class="p-2.5 text-center text-slate-300">
              ${views}
            </td>
            <td class="p-2.5 text-right font-mono text-[10px]">
              ${isUpcoming ? '<span class="text-amber-400">Roadmap</span>' : '<span class="text-emerald-400">Active</span>'}
            </td>
          </tr>
        `;
      }).join('');
    }

    // Registered Leads Table
    const leads = getLeads();
    const leadsBadge = document.getElementById('statLeadCountBadge');
    if (leadsBadge) leadsBadge.textContent = `${leads.length} Registered`;

    const leadsBody = document.getElementById('analyticsLeadsTableBody');
    if (leadsBody) {
      if (leads.length === 0) {
        leadsBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-500 font-mono">No download leads registered yet. User submissions will appear here live.</td></tr>`;
      } else {
        leadsBody.innerHTML = leads.map(lead => `
          <tr class="hover:bg-slate-800/40 transition-colors">
            <td class="p-2.5 text-slate-400 whitespace-nowrap">${new Date(lead.timestamp).toLocaleDateString()} ${new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
            <td class="p-2.5 font-bold text-white">${escapeHtml(lead.name)}</td>
            <td class="p-2.5 text-emerald-400">${escapeHtml(lead.phone !== 'N/A' ? lead.phone : lead.email)}</td>
            <td class="p-2.5 text-slate-200 truncate max-w-[150px]">${escapeHtml(lead.toolTitle || lead.toolId)}</td>
            <td class="p-2.5 text-right"><span class="px-2 py-0.5 rounded text-[10px] font-mono ${lead.method === 'WhatsApp Request' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-brand-cyan/20 text-brand-cyan'}">${escapeHtml(lead.method)}</span></td>
          </tr>
        `).join('');
      }
    }
  }

  function openAnalyticsModal() {
    if (analyticsModal) {
      renderAnalyticsModal();
      analyticsModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAnalyticsModal() {
    if (analyticsModal) {
      analyticsModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }

  if (analyticsBtn) analyticsBtn.addEventListener('click', openAnalyticsModal);
  if (closeAnalyticsModalBtn) closeAnalyticsModalBtn.addEventListener('click', closeAnalyticsModal);
  if (analyticsModal) {
    analyticsModal.addEventListener('click', (e) => {
      if (e.target === analyticsModal) closeAnalyticsModal();
    });
  }

  if (analyticsRefreshBtn) {
    analyticsRefreshBtn.addEventListener('click', async () => {
      await fetchGitHubReleaseStats();
      renderAnalyticsModal();
      showToast('Analytics refreshed with live data', 'fa-rotate');
    });
  }

  // Export Leads to CSV
  const analyticsExportLeadsCsvBtn = document.getElementById('analyticsExportLeadsCsvBtn');
  if (analyticsExportLeadsCsvBtn) {
    analyticsExportLeadsCsvBtn.addEventListener('click', () => {
      const leads = getLeads();
      if (leads.length === 0) {
        showToast('No leads registered yet to export.', 'fa-circle-exclamation');
        return;
      }
      let csv = 'Timestamp,Full Name,Email,Phone,Organization,Tool Requested,Method\n';
      leads.forEach(l => {
        csv += `"${l.timestamp}","${(l.name||'').replace(/"/g, '""')}","${(l.email||'').replace(/"/g, '""')}","${(l.phone||'').replace(/"/g, '""')}","${(l.org||'').replace(/"/g, '""')}","${(l.toolTitle||l.toolId||'').replace(/"/g, '""')}","${(l.method||'').replace(/"/g, '""')}"\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ludarp_civil_leads_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Exported leads list as CSV', 'fa-file-csv');
    });
  }

  // Export full Telemetry Report as JSON
  if (analyticsExportBtn) {
    analyticsExportBtn.addEventListener('click', () => {
      const data = getTelemetry();
      data.leads = getLeads();
      data.githubReleaseDownloads = {
        'drawing-packager-v2': state.githubPackagerDownloads
      };
      data.exportTimestamp = new Date().toISOString();

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ludarp_civil_telemetry_report_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Full telemetry report exported as JSON', 'fa-file-export');
    });
  }

  if (analyticsResetBtn) {
    analyticsResetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset local counter & leads telemetry? (GitHub live release stats will NOT be affected).')) {
        localStorage.removeItem(TELEMETRY_KEY);
        localStorage.removeItem(LEADS_KEY);
        sessionStorage.removeItem('ludarp_session_logged');
        renderAnalyticsModal();
        showToast('Local telemetry & leads data reset', 'fa-trash-can');
      }
    });
  }

  // ================= GLOBAL HELPERS =================
  window.copyToClipboard = function(text, successMsg = 'Copied to clipboard!') {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg, 'fa-copy');
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
      showToast('Failed to copy', 'fa-triangle-exclamation');
    });
  };

  window.filterByTag = function(tag) {
    searchInput.value = tag;
    state.searchQuery = tag.toLowerCase();
    clearSearchBtn.classList.remove('hidden');
    render();
    showToast(`Filtered by tag: #${tag}`, 'fa-filter');
  };

  let toastTimer = null;
  function showToast(msg, iconClass = 'fa-circle-check') {
    if (toastTimer) clearTimeout(toastTimer);

    toastMessage.textContent = msg;
    toastIcon.className = `fa-solid ${iconClass} text-brand-cyan`;

    toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    toastTimer = setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    }, 2800);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeJs(str) {
    if (!str) return '';
    return String(str).replace(/'/g, "\\'").replace(/"/g, '\\"');
  }

  // ================= SHARE TOOL DEEP-LINKING =================
  window.shareTool = function(toolId, event) {
    if (event) event.stopPropagation();
    const list = [...publishedList, ...upcomingList];
    const tool = list.find(t => t.id === toolId);
    if (!tool) return;

    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('tool', tool.id);
    const shareUrl = url.toString();

    if (navigator.share) {
      navigator.share({
        title: `${tool.title} | Ludarp Civil`,
        text: `Check out ${tool.title} on Ludarp Civil Tools Hub:\n${tool.summary}`,
        url: shareUrl
      }).catch((err) => {
        if (err.name !== 'AbortError') {
          copyToClipboard(shareUrl, `Direct share link for "${tool.title}" copied!`);
        }
      });
    } else {
      copyToClipboard(shareUrl, `Direct share link for "${tool.title}" copied!`);
    }
  };

  window.shareActiveModalTool = function() {
    if (state.activeModalTool) {
      shareTool(state.activeModalTool.id);
    }
  };

  window.copyCurrentShareLink = function() {
    if (state.activeModalTool) {
      shareTool(state.activeModalTool.id);
    }
  };

  function checkUrlDeepLink() {
    const params = new URLSearchParams(window.location.search);
    let toolId = params.get('tool') || params.get('id');
    if (!toolId && window.location.hash) {
      const cleanHash = window.location.hash.replace('#', '').replace('tool=', '');
      if (publishedList.some(t => t.id === cleanHash) || upcomingList.some(t => t.id === cleanHash)) {
        toolId = cleanHash;
      }
    }
    if (!toolId) return;

    const isUpcoming = upcomingList.some(t => t.id === toolId);
    const tool = (isUpcoming ? upcomingList : publishedList).find(t => t.id === toolId);
    if (!tool) return;

    // Automatically switch to the tool's tab
    if (isUpcoming) {
      state.activeTab = 'upcoming';
    } else if (tool.category === 'AutoLISP') {
      state.activeTab = 'AutoLISP';
    } else if (tool.category === 'pyRevit') {
      state.activeTab = 'pyRevit';
    } else if (tool.category === 'Other') {
      state.activeTab = 'Other';
    } else {
      state.activeTab = 'all';
    }

    // Sync tab button active classes
    document.querySelectorAll('.tab-btn').forEach(b => {
      const isCurrent = b.getAttribute('data-tab') === state.activeTab;
      b.classList.toggle('border-brand-cyan', isCurrent);
      b.classList.toggle('text-brand-cyan', isCurrent);
      b.classList.toggle('bg-brand-cyan/10', isCurrent);
      b.classList.toggle('border-transparent', !isCurrent);
      b.classList.toggle('text-slate-400', !isCurrent);
    });

    render();

    // Open modal directly for this tool
    setTimeout(() => {
      openToolModal(toolId, isUpcoming, true);
      const card = document.getElementById(`tool-card-${toolId}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('ring-2', 'ring-brand-cyan', 'ring-offset-2', 'ring-offset-slate-900');
        setTimeout(() => {
          card.classList.remove('ring-2', 'ring-brand-cyan', 'ring-offset-2', 'ring-offset-slate-900');
        }, 3500);
      }
      showToast(`Viewing shared tool: ${tool.title}`, 'fa-share-nodes');
    }, 150);
  }

});
