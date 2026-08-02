/* ==========================================================================
   CivilCut Core Logic: Content Automation, Real-time Editor, & Export
   ========================================================================== */

// 1. Initial Shortcut Database (Preloaded)
const defaultShortcuts = [
  {
    id: "ac-tr",
    software: "AutoCAD",
    keys: "TR",
    action: "Trim Objects",
    desc: "Trims elements to meet the edges of other selected elements in your drawing space.",
    steps: [
      "Type 'TR' on your keyboard and hit Enter.",
      "Select cutting edges (optional) or press Enter to select all objects.",
      "Click the parts of the lines you want to remove."
    ],
    proTip: "Hold SHIFT while using Trim to quickly extend lines instead!"
  },
  {
    id: "ac-ex",
    software: "AutoCAD",
    keys: "EX",
    action: "Extend Objects",
    desc: "Extends elements to meet the boundary edges of other selected elements.",
    steps: [
      "Type 'EX' on your keyboard and hit Enter.",
      "Select boundary edges (optional) or press Enter to select all.",
      "Click the objects you want to extend."
    ],
    proTip: "Hold SHIFT while extending to trim objects instead of extending!"
  },
  {
    id: "ac-pl",
    software: "AutoCAD",
    keys: "PL",
    action: "Draw Polyline",
    desc: "Draws a connected sequence of line segments as a single 2D object, allowing boundary area math.",
    steps: [
      "Type 'PL' on your keyboard and hit Enter.",
      "Click in the workspace to start drawing line vertices.",
      "Type 'C' and hit Enter to close the shape, or just hit Enter to finish."
    ],
    proTip: "Polylines are highly recommended because CAD can calculate their area instantly!"
  },
  {
    id: "ac-mi",
    software: "AutoCAD",
    keys: "MI",
    action: "Mirror Objects",
    desc: "Creates a mirrored copy of selected AutoCAD objects across a custom axis of symmetry.",
    steps: [
      "Select the objects you want to mirror.",
      "Type 'MI' on your keyboard and hit Enter.",
      "Click two points to define the mirror line, then choose to erase source."
    ],
    proTip: "Hit Enter to keep original objects; type 'Y' and hit Enter to erase!"
  },
  {
    id: "rv-wa",
    software: "Revit",
    keys: "WA",
    action: "Create Wall",
    desc: "Instantly starts the Wall tool to draw architectural or structural walls in your project model.",
    steps: [
      "Press 'W' followed by 'A' on your keyboard (do not press Enter).",
      "Choose Wall type in the Properties palette on the left.",
      "Click in the viewport to define the start and end points of the wall."
    ],
    proTip: "Press Spacebar while drawing to flip the wall orientation/location line."
  },
  {
    id: "rv-bx",
    software: "Revit",
    keys: "BX",
    action: "Section Box Selected",
    desc: "Isolates selected elements in a 3D view with a crop section box, ideal for reviewing detailed structural joints.",
    steps: [
      "Select one or more elements in any 2D or 3D view.",
      "Type 'BX' on your keyboard.",
      "Revit will automatically open the default 3D view cropped around the selected items."
    ],
    proTip: "Uncheck 'Section Box' in the 3D View properties to reset the full view."
  },
  {
    id: "rv-tg",
    software: "Revit",
    keys: "TG",
    action: "Tag Category",
    desc: "Applies structural or architectural annotation tags to components based on their category details.",
    steps: [
      "Type 'TG' on your keyboard.",
      "Hover your cursor over a wall, beam, column, or door.",
      "Click to place the tag annotation, then adjust lead lines as needed."
    ],
    proTip: "Use 'Tag All Not Tagged' in the Annotate menu to tag hundreds of elements in one click!"
  },
  {
    id: "c3d-align",
    software: "Civil 3D",
    keys: "ALIGNMENT",
    action: "Create Alignment",
    desc: "Launches the Alignment Layout Tools to design roads, railways, or pipe networks.",
    steps: [
      "Go to the Home tab on the Ribbon, click 'Alignment'.",
      "Select 'Alignment Creation Tools' from the dropdown.",
      "Name the alignment, choose styles, and start drawing layout segments."
    ],
    proTip: "Use 'Create Alignment from Polyline' if you already drafted the path in CAD."
  },
  {
    id: "c3d-surf",
    software: "Civil 3D",
    keys: "SURFACE",
    action: "Create Surface",
    desc: "Generates a digital terrain model (TIN Surface) from survey point groups or contours.",
    steps: [
      "Right-click 'Surfaces' in Prospector and select 'Create Surface'.",
      "Give it a name (e.g., Existing Ground) and set contour styles.",
      "Expand the Surface definition, right-click Point Groups, and select your survey data."
    ],
    proTip: "Add boundary lines under definition to trim extra triangles along surface borders."
  },
  {
    id: "et-f5",
    software: "ETABS",
    keys: "F5",
    action: "Run Analysis",
    desc: "Launches the solver to analyze structural stresses, moments, displacements, and shear forces.",
    steps: [
      "Ensure all loads (Dead, Live, Wind, Seismic) are defined and applied.",
      "Press the 'F5' shortcut key on your keyboard.",
      "Wait for the ETABS solver to complete and check the deformed shape."
    ],
    proTip: "Unlock the model using the lock icon in the toolbar to make structural changes."
  },
  {
    id: "et-slab",
    software: "ETABS",
    keys: "Draw Slab",
    action: "Quick Draw Slab",
    desc: "Quickly draws concrete structural slabs, floors, or deck elements by clicking inside grid lines.",
    steps: [
      "Select the 'Quick Draw Floor/Wall' tool in the left vertical toolbar.",
      "Select your concrete Section type from the properties dropdown.",
      "Click once inside any grid boundary to place the floor slab instantly."
    ],
    proTip: "Select multiple grid cells by dragging a selection box to draw slabs in bulk!"
  },
  {
    id: "su-p",
    software: "SketchUp",
    keys: "P",
    action: "Push / Pull",
    desc: "Extrudes 2D faces into 3D geometry or subtracts volume by pushing faces inward.",
    steps: [
      "Draw any closed 2D shape (Rectangle, Circle, etc.).",
      "Press 'P' on your keyboard to activate the tool.",
      "Click the face and move your cursor to extrude, then click to set."
    ],
    proTip: "Double-click a new face to apply the exact same extrusion depth as before!"
  },
  {
    id: "su-f",
    software: "SketchUp",
    keys: "F",
    action: "Offset Face",
    desc: "Creates concentric boundaries of a selected 2D face at a set offset distance.",
    steps: [
      "Press 'F' on your keyboard to activate the Offset tool.",
      "Hover over the face or edges and click once.",
      "Drag your cursor inside or outside, type the offset dimension, and hit Enter."
    ],
    proTip: "Double-click on any other face to repeat the exact same offset distance instantly!"
  }
];

function safeJsonParse(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (e) {
    console.warn(`Failed to parse localStorage key '${key}', using fallback:`, e);
    return fallback;
  }
}

function getCleanDefaultData() {
  if (typeof autocadCalendar !== 'undefined' && Array.isArray(autocadCalendar) && autocadCalendar.length > 0) {
    return autocadCalendar;
  }
  if (typeof CALENDAR_DATA_FROM_FILE !== 'undefined' && Array.isArray(CALENDAR_DATA_FROM_FILE) && CALENDAR_DATA_FROM_FILE.length > 0) {
    return CALENDAR_DATA_FROM_FILE;
  }
  return [];
}

let calendarDb = safeJsonParse('ludarp_calendar_db', []);
if (!Array.isArray(calendarDb) || calendarDb.length === 0) {
  calendarDb = safeJsonParse('ludarp_shortcuts', []);
}

function ensureCalendarDbLoaded() {
  if (!Array.isArray(calendarDb) || calendarDb.length === 0) {
    const defaults = getCleanDefaultData();
    if (defaults.length > 0) {
      calendarDb = JSON.parse(JSON.stringify(defaults));
    }
  }
  shortcutDb = calendarDb;
  try {
    if (Array.isArray(calendarDb) && calendarDb.length > 0) {
      localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
      localStorage.setItem('ludarp_shortcuts', JSON.stringify(calendarDb));
    }
  } catch(e) {}
}

ensureCalendarDbLoaded();

// State variables
let currentFormat = "square"; // "square" or "story"
let activeStylePreset = "blueprint";
let activeStudioShortcutId = null; // Track currently loaded shortcut from library
let latestGeneratedResearch = null; // Store latest AI generated result object
let fileHandle = null; // Stored FileSystemFileHandle for disk sync
let activeCalendarDayNum = "1";

// Dynamic Sidebar Controls
const sidebarStudioContext = document.getElementById('sidebar-studio-context');
const sidebarDaysList = document.getElementById('sidebar-days-list');
const sidebarProgressCount = document.getElementById('sidebar-progress-count');
const sidebarProgressBar = document.getElementById('sidebar-progress-bar');
const syncStatusText = document.getElementById('sync-status');
const btnConnectFile = document.getElementById('btn-connect-file');
const btnExportBackup = document.getElementById('btn-export-backup');
const btnImportBackup = document.getElementById('btn-import-backup');
const fileImportBackup = document.getElementById('file-import-backup');

// DOM Elements
const sidebarButtons = document.querySelectorAll('.nav-btn');
const tabViews = document.querySelectorAll('.tab-view');
const btnFormatSquare = document.getElementById('btn-format-square');
const btnFormatStory = document.getElementById('btn-format-story');
const canvasWrapper = document.querySelector('.canvas-outer-wrapper');
const previewAspectLabel = document.getElementById('preview-aspect-label');
const instagramCard = document.getElementById('instagram-post-canvas');

// Input Controls Elements
const brandHandleInput = document.getElementById('brand-handle');
const contentSoftwareSelect = document.getElementById('content-software');
const contentKeysInput = document.getElementById('content-keys');
const contentSymbolInput = document.getElementById('content-symbol');
const contentActionInput = document.getElementById('content-action');
const contentDescInput = document.getElementById('content-desc');
const contentProTipInput = document.getElementById('content-pro-tip');
const contentCommonMistakeInput = document.getElementById('content-common-mistake');
const contentHashtagsInput = document.getElementById('content-hashtags');
const stepsContainer = document.getElementById('steps-container');
const btnAddStep = document.getElementById('btn-add-step');
const getStepInputs = () => document.querySelectorAll('.step-input');

// Format & Type Toggle Elements
const typeCommandBtn = document.getElementById('type-command');
const typeListBtn = document.getElementById('type-list');
const typeCarouselBtn = document.getElementById('type-carousel');
const keyField = document.getElementById('key-field');
const stepsLabel = document.getElementById('steps-label');
const carouselScriptGroup = document.getElementById('carousel-script-group');
const carouselMultiScriptInput = document.getElementById('carousel-multi-script');

// Card Preview Elements
const cardSoftwareName = document.getElementById('card-software-name');
const cardHandleText = document.getElementById('card-handle-text');
const cardKeys = document.getElementById('card-keys');
const cardAction = document.getElementById('card-action');
const cardDesc = document.getElementById('card-desc');
const cardStepsList = document.getElementById('card-steps-list');
const cardProTip = document.getElementById('card-pro-tip');
const cardWatermark = document.getElementById('card-watermark');

// CAD Title Block Elements
const tbDrawnBy = document.getElementById('tb-drawn-by');
const tbScale = document.getElementById('tb-scale');
const tbRev = document.getElementById('tb-rev');
const tbDwgNo = document.getElementById('tb-dwg-no');
const btnMarkDayDone = document.getElementById('btn-mark-day-done');

// Action Buttons
const btnExportImage = document.getElementById('btn-export-image');
const btnExportCarousel = document.getElementById('btn-export-carousel');
const btnSaveToLibrary = document.getElementById('btn-save-to-library');
const btnCopyCaption = document.getElementById('btn-copy-caption');
const stylePresetBtns = document.querySelectorAll('.style-preset-btn');
const customColorsContainer = document.getElementById('custom-colors-container');


// Custom Color Pickers
const pickerBgStart = document.getElementById('color-bg-start');
const pickerBgEnd = document.getElementById('color-bg-end');
const pickerAccent = document.getElementById('color-accent');
const pickerText = document.getElementById('color-text');

// Public Hub Elements
const hubSearchInput = document.getElementById('hub-search-input');
const hubSortSelect = document.getElementById('hub-sort-select');
const searchFeedbackCount = document.getElementById('search-feedback-count');
const hubTabBtns = document.querySelectorAll('.hub-tab-btn');
const hubPhaseTabBtns = document.querySelectorAll('#hub-phase-tabs .hub-tab-btn');
const shortcutsGridContainer = document.getElementById('shortcuts-grid-container');

// Modal Elements
const addShortcutModal = document.getElementById('add-shortcut-modal');
const btnOpenAddModal = document.getElementById('btn-open-add-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancelModal = document.getElementById('btn-cancel-modal');
const addShortcutForm = document.getElementById('add-shortcut-form');
const modalPhaseSelect = document.getElementById('modal-phase');

// Toast Notification Container
const toastContainer = document.getElementById('toast-container');

// Bulk Export Elements
const btnBulkExport = document.getElementById('btn-bulk-export');
const bulkProgressContainer = document.getElementById('bulk-progress-container');
const bulkProgressStatus = document.getElementById('bulk-progress-status');
const bulkProgressPercent = document.getElementById('bulk-progress-percent');
const bulkProgressBar = document.getElementById('bulk-progress-bar');

// AI Research Assistant Elements
const aiApiKeyInput = document.getElementById('ai-api-key');
const aiPromptInput = document.getElementById('ai-prompt');
const btnAiGenerate = document.getElementById('btn-ai-generate');
const aiLoadingContainer = document.getElementById('ai-loading-container');
const aiLoadingText = document.getElementById('ai-loading-text');

// Research Hub Results Elements
const researchEmptyState = document.getElementById('research-empty-state');
const researchResultsDisplay = document.getElementById('research-results-display');
const resSoftware = document.getElementById('res-software');
const resKeys = document.getElementById('res-keys');
const resAction = document.getElementById('res-action');
const resDesc = document.getElementById('res-desc');
const resSteps = document.getElementById('res-steps');
const resProTip = document.getElementById('res-protip');
const btnImportResearchToStudio = document.getElementById('btn-import-research-to-studio');
const btnSaveResearchToHub = document.getElementById('btn-save-research-to-hub');

// ChatGPT / Claude Importer Elements
const aiPasteInput = document.getElementById('ai-paste-input');
const btnParsePaste = document.getElementById('btn-parse-paste');

// Content Calendar Elements
const calendarPhaseSelect = document.getElementById('calendar-phase-select');
const calendarGridContainer = document.getElementById('calendar-grid-container');
const calendarProgressCount = document.getElementById('calendar-progress-count');
const calendarProgressPercent = document.getElementById('calendar-progress-percent');
const calendarProgressBar = document.getElementById('calendar-progress-bar');

// ==========================================================================
// 2. Real-Time Creator Studio Updates
// ==========================================================================

function getMarkerSymbol(markerStyle, index) {
  switch (markerStyle) {
    case 'bullet': return '•';
    case 'arrow': return '▶';
    case 'check': return '✓';
    case 'square': return '■';
    case 'alphabet': return String.fromCharCode(65 + index);
    case 'roman': {
      const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
      return romans[index] || (index + 1).toString();
    }
    case 'number':
    default:
      return (index + 1).toString().padStart(2, '0');
  }
}

function updateCardPreview() {
  // Update brand handle
  const handleVal = brandHandleInput.value.trim() || "ludarp_civil";
  cardHandleText.textContent = handleVal.startsWith('@') ? handleVal : `@${handleVal}`;
  
  // Update software badge
  const softwareVal = contentSoftwareSelect.value;
  cardSoftwareName.textContent = softwareVal.toUpperCase();

  // Update Carousel ID badge & Slide Switcher chips
  const carouselInput = document.getElementById('content-carousel-id');
  let rawCode = (carouselInput && carouselInput.value.trim() ? carouselInput.value.trim() : 'AC-001').toUpperCase();
  
  let baseCode = rawCode;
  let detectedLetter = '';
  const letterMatch = rawCode.match(/^(.*?)([A-Z])$/);
  if (letterMatch && letterMatch[1].length >= 2) {
    baseCode = letterMatch[1];
    detectedLetter = letterMatch[2];
  }

  const carouselBadge = document.getElementById('card-carousel-id-badge');
  if (carouselBadge) {
    const activeChip = document.querySelector('#carousel-slide-chips .btn-slide-chip.active');
    if (activeChip && activeChip.getAttribute('data-slide-id')) {
      carouselBadge.textContent = activeChip.getAttribute('data-slide-id');
    } else {
      carouselBadge.textContent = rawCode;
    }
  }
  
  // Update keys, symbol & action title
  const keysVal = contentKeysInput.value.trim() || "KEY";
  cardKeys.textContent = keysVal;

  const contentSymbolInput = document.getElementById('content-symbol');
  const cardSymbol = document.getElementById('card-symbol');
  if (cardSymbol) {
    const symVal = contentSymbolInput ? contentSymbolInput.value.trim() : '';
    if (symVal) {
      cardSymbol.textContent = symVal;
      const toggleElemSymbol = document.getElementById('toggle-elem-symbol');
      cardSymbol.style.display = (!toggleElemSymbol || toggleElemSymbol.checked) ? 'inline-block' : 'none';
    } else {
      cardSymbol.style.display = 'none';
    }
  }

  cardAction.textContent = contentActionInput.value.trim() || "Action Title";
  
  // Update description
  cardDesc.textContent = contentDescInput.value.trim() || "Description of shortcut goes here.";

  // Update Custom Image Slots
  const imageUrlVal = document.getElementById('content-image-url') ? document.getElementById('content-image-url').value.trim() : '';
  const imagePosVal = document.getElementById('image-position-select') ? document.getElementById('image-position-select').value : 'bottom-center';
  const imageHeightVal = document.getElementById('image-height-slider') ? document.getElementById('image-height-slider').value : '160';
  const offsetXVal = document.getElementById('image-offset-x-slider') ? document.getElementById('image-offset-x-slider').value : '0';
  const offsetYVal = document.getElementById('image-offset-y-slider') ? document.getElementById('image-offset-y-slider').value : '0';

  const valImageHeightEl = document.getElementById('val-image-height');
  const valImageOffsetXEl = document.getElementById('val-image-offset-x');
  const valImageOffsetYEl = document.getElementById('val-image-offset-y');
  if (valImageHeightEl) valImageHeightEl.textContent = imageHeightVal;
  if (valImageOffsetXEl) valImageOffsetXEl.textContent = offsetXVal;
  if (valImageOffsetYEl) valImageOffsetYEl.textContent = offsetYVal;

  const activeAlignBtn = document.querySelector('#image-align-group .btn-img-align.active');
  const alignVal = activeAlignBtn ? activeAlignBtn.getAttribute('data-align') : 'center';

  const toggleElemImage = document.getElementById('toggle-elem-image');
  const isImageVisible = (!toggleElemImage || toggleElemImage.checked) && imageUrlVal !== '';

  const slots = {
    top: document.getElementById('card-image-top'),
    hero: document.getElementById('card-image-hero-wrap'),
    middle: document.getElementById('card-image-middle-wrap'),
    bottom: document.getElementById('card-image-bottom-wrap'),
    custom: document.getElementById('card-image-custom-wrap')
  };

  if (slots.top) slots.top.style.display = 'none';
  if (slots.hero) slots.hero.style.display = 'none';
  if (slots.middle) slots.middle.style.display = 'none';
  if (slots.bottom) slots.bottom.style.display = 'none';
  if (slots.custom) slots.custom.style.display = 'none';

  if (isImageVisible) {
    const textAlignCss = alignVal === 'left' ? 'left' : alignVal === 'right' ? 'right' : 'center';
    const transformShift = `translate(${offsetXVal}px, ${offsetYVal}px)`;

    if (imagePosVal === 'custom' && slots.custom) {
      const img = document.getElementById('card-image-custom');
      if (img) {
        img.src = imageUrlVal;
        img.style.maxHeight = `${imageHeightVal}px`;
      }
      slots.custom.style.transform = `translate(calc(-50% + ${offsetXVal}px), calc(-50% + ${offsetYVal}px))`;
      slots.custom.style.display = 'block';
    } else if (imagePosVal.startsWith('top') && slots.top) {
      slots.top.src = imageUrlVal;
      slots.top.style.maxHeight = `${Math.min(imageHeightVal, 60)}px`;
      slots.top.style.transform = transformShift;
      slots.top.style.display = 'inline-block';
    } else if (imagePosVal === 'hero' && slots.hero) {
      const img = document.getElementById('card-image-hero');
      if (img) { img.src = imageUrlVal; img.style.maxHeight = `${imageHeightVal}px`; img.style.transform = transformShift; }
      slots.hero.style.textAlign = textAlignCss;
      slots.hero.style.display = 'block';
    } else if (imagePosVal.startsWith('middle') && slots.middle) {
      const img = document.getElementById('card-image-middle');
      if (img) { img.src = imageUrlVal; img.style.maxHeight = `${imageHeightVal}px`; img.style.transform = transformShift; }
      const slotAlign = imagePosVal.includes('left') ? 'left' : imagePosVal.includes('right') ? 'right' : textAlignCss;
      slots.middle.style.textAlign = slotAlign;
      slots.middle.style.display = 'block';
    } else if (slots.bottom) {
      const img = document.getElementById('card-image-bottom');
      if (img) { img.src = imageUrlVal; img.style.maxHeight = `${imageHeightVal}px`; img.style.transform = transformShift; }
      const slotAlign = imagePosVal.includes('left') ? 'left' : imagePosVal.includes('right') ? 'right' : textAlignCss;
      slots.bottom.style.textAlign = slotAlign;
      slots.bottom.style.display = 'block';
    }
  }
  
  // Update steps
  cardStepsList.innerHTML = '';
  let stepIndex = 0;
  const markerStyle = document.getElementById('list-marker-style') ? document.getElementById('list-marker-style').value : 'number';
  const isSymbolMarker = ['bullet', 'arrow', 'check', 'square'].includes(markerStyle);
  const symbolClass = isSymbolMarker ? `is-symbol marker-${markerStyle}` : '';
  
  getStepInputs().forEach(input => {
    const text = input.value.trim();
    if (text) {
      const stepItem = document.createElement('div');
      stepItem.className = 'card-step-item';
      
      const markerSymbol = getMarkerSymbol(markerStyle, stepIndex);
      stepItem.innerHTML = `
        <div class="card-step-num ${symbolClass}">${markerSymbol}</div>
        <div class="card-step-text">${text}</div>
      `;
      cardStepsList.appendChild(stepItem);
      stepIndex++;
    }
  });
  
  // Update CAD Title Block Elements dynamically
  if (tbDrawnBy) {
    tbDrawnBy.textContent = handleVal.replace('@', '').toLowerCase();
  }
  if (tbScale) {
    const isStory = instagramCard && instagramCard.classList.contains('format-story');
    tbScale.textContent = isStory ? "9:16" : "1:1";
  }
  if (tbRev) {
    // Standard starting revision
    tbRev.textContent = "R0";
  }
  if (tbDwgNo) {
    const prefix = softwareVal.substring(0, 3).toUpperCase();
    let sanitizedKey = keysVal.replace(/^DAY\s*/i, '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (!sanitizedKey) sanitizedKey = "01";
    tbDwgNo.textContent = `${prefix}-${sanitizedKey}`;
  }
  
  // Update Pro Tip (supports multiple pro tips on separate lines)
  const proTipText = contentProTipInput ? contentProTipInput.value.trim() : '';
  const proTipBox = instagramCard.querySelector('.pro-tip-box');
  if (proTipBox) {
    if (proTipText) {
      proTipBox.style.display = 'flex';
      if (cardProTip) {
        if (proTipText.includes('\n')) {
          const tips = proTipText.split('\n').map(t => t.trim()).filter(t => t);
          cardProTip.innerHTML = tips.map(t => `<div style="margin-bottom:4px; display:flex; gap:4px; align-items:flex-start;"><span>💡</span><span>${t.replace(/^(?:💡|pro\s*tip:?\s*)/i, '').trim()}</span></div>`).join('');
        } else {
          cardProTip.textContent = proTipText;
        }
      }
    } else {
      proTipBox.style.display = 'none';
    }
  }

  // Update Common Mistake Box
  const contentCommonMistakeInput = document.getElementById('content-common-mistake');
  const commonMistakeText = contentCommonMistakeInput ? contentCommonMistakeInput.value.trim() : '';
  const commonMistakeBox = document.getElementById('card-common-mistake-box');
  const cardCommonMistakeEl = document.getElementById('card-common-mistake');
  if (commonMistakeBox) {
    if (commonMistakeText) {
      commonMistakeBox.style.display = 'flex';
      if (cardCommonMistakeEl) cardCommonMistakeEl.textContent = commonMistakeText;
    } else {
      commonMistakeBox.style.display = 'none';
    }
  }

  // Update background watermark letter
  const watermarkMap = {
    'AutoCAD':  'A',
    'Revit':    'R',
    'Civil 3D': 'C',
    'ETABS':    'E',
    'SketchUp': 'S'
  };
  if (cardWatermark) {
    cardWatermark.textContent = watermarkMap[softwareVal] || softwareVal.charAt(0).toUpperCase();
  }

  if (typeof refreshLiveScriptEditor === 'function') {
    refreshLiveScriptEditor();
  }
}

// Bind event listeners to input elements for real-time visual syncing and database auto-saving
const contentDifficultyInput = document.getElementById('content-difficulty');
const contentCategoryInput = document.getElementById('content-category');
const contentCarouselIdInput = document.getElementById('content-carousel-id');

[
  'brand-handle', 'content-software', 'content-carousel-id', 'content-keys',
  'content-symbol', 'content-action', 'content-desc', 'content-pro-tip',
  'content-hashtags', 'content-difficulty', 'content-category', 'content-common-mistake'
].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', () => {
      updateCardPreview();
      saveCurrentDayData();
    });
  }
});

if (contentSoftwareSelect) {
  contentSoftwareSelect.addEventListener('change', () => {
    updateCardPreview();
    saveCurrentDayData();
  });
}

// Dynamic Steps Management
function bindStepRowEvents(row) {
  const input = row.querySelector('.step-input');
  const btnRemove = row.querySelector('.btn-remove-step');
  
  if (input) {
    input.addEventListener('input', () => {
      updateCardPreview();
      saveCurrentDayData();
    });
  }
  
  if (btnRemove) {
    btnRemove.addEventListener('click', () => {
      const rows = stepsContainer.querySelectorAll('.step-input-row');
      if (rows.length <= 1) {
        showToast("You must keep at least one instruction step.", "warning");
        return;
      }
      row.remove();
      reindexSteps();
      updateCardPreview();
      saveCurrentDayData();
    });
  }
}

function reindexSteps() {
  const markerStyle = document.getElementById('list-marker-style') ? document.getElementById('list-marker-style').value : 'number';
  const rows = stepsContainer.querySelectorAll('.step-input-row');
  rows.forEach((r, index) => {
    const numSpan = r.querySelector('.step-number');
    if (numSpan) numSpan.textContent = getMarkerSymbol(markerStyle, index);
    const input = r.querySelector('.step-input');
    if (input) input.placeholder = `Item ${index + 1}`;
  });
}

if (btnAddStep) {
  btnAddStep.addEventListener('click', () => {
    const rows = stepsContainer.querySelectorAll('.step-input-row');
    const newIndex = rows.length;
    const markerStyle = document.getElementById('list-marker-style') ? document.getElementById('list-marker-style').value : 'number';
    const markerSymbol = getMarkerSymbol(markerStyle, newIndex);
    
    const newRow = document.createElement('div');
    newRow.className = 'step-input-row';
    newRow.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 8px;';
    newRow.innerHTML = `
      <span class="step-number" style="font-weight: 700; min-width: 15px; color: var(--accent-color);">${markerSymbol}</span>
      <input type="text" class="step-input" placeholder="Item ${newIndex + 1}" value="" style="flex-grow: 1; padding: 8px 12px; background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-family: var(--font-ui); font-size: 0.85rem;">
      <button type="button" class="btn-remove-step" style="background: none; border: none; color: var(--error); cursor: pointer; font-size: 1.1rem; padding: 0 4px;">&times;</button>
    `;
    
    stepsContainer.appendChild(newRow);
    bindStepRowEvents(newRow);
    newRow.querySelector('.step-input').focus();
    updateCardPreview();
    saveCurrentDayData();
  });
}

// Bind List Marker Style select dropdown change listener
const listMarkerSelect = document.getElementById('list-marker-style');
if (listMarkerSelect) {
  listMarkerSelect.addEventListener('change', () => {
    reindexSteps();
    updateCardPreview();
    saveCurrentDayData();
  });
}

// Bind initial step rows on page load
if (stepsContainer) {
  stepsContainer.querySelectorAll('.step-input-row').forEach(row => {
    bindStepRowEvents(row);
  });
}

// ==========================================================================
// 3. Tab Switching Navigation
// ==========================================================================

function switchTab(targetTab) {
  const allNavBtns = document.querySelectorAll('.nav-btn');
  const allTabViews = document.querySelectorAll('.tab-view');
  
  allNavBtns.forEach(b => {
    const isActive = b.getAttribute('data-tab') === targetTab;
    b.classList.toggle('active', isActive);
  });

  allTabViews.forEach(view => {
    const isActive = view.id === `${targetTab}-view`;
    view.classList.toggle('active', isActive);
  });

  const ctxSidebar = document.getElementById('sidebar-studio-context');
  if (ctxSidebar) {
    ctxSidebar.style.display = (targetTab === 'studio') ? 'flex' : 'none';
  }

  try {
    if (targetTab === 'hub' && typeof renderShortcutsHub === 'function') {
      renderShortcutsHub();
    } else if (targetTab === 'calendar' && typeof renderCalendarHub === 'function') {
      renderCalendarHub();
    } else if (targetTab === 'database' && typeof renderDatabaseManagerTable === 'function') {
      renderDatabaseManagerTable();
    } else if (targetTab === 'feed' && typeof renderInstagramFeedGrid === 'function') {
      renderInstagramFeedGrid();
    } else if (targetTab === 'cheatsheet' && typeof renderCheatSheet === 'function') {
      renderCheatSheet();
    } else if (targetTab === 'quiz' && typeof initQuizAndFlashcards === 'function') {
      initQuizAndFlashcards();
    } else if (targetTab === 'cloudviewer' && typeof initCloudViewer === 'function') {
      initCloudViewer();
    }
  } catch (err) {
    console.error("Tab view render error:", err);
  }
}

const bindSidebarNav = () => {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab) switchTab(targetTab);
    };
  });
};
bindSidebarNav();
document.addEventListener('DOMContentLoaded', bindSidebarNav);

// ==========================================================================
// 4. Visual Card Styles & Themes
// ==========================================================================

// Switch themes
stylePresetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    stylePresetBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const themeName = btn.getAttribute('data-style');
    activeStylePreset = themeName;
    
    // Reset classes
    instagramCard.className = `instagram-card format-${currentFormat}`;
    instagramCard.style.background = '';
    instagramCard.style.color = '';
    instagramCard.style.borderColor = '';
    
    // Apply selected theme class
    if (themeName !== 'custom') {
      customColorsContainer.classList.add('hidden');
      instagramCard.classList.add(`theme-${themeName}`);
    } else {
      customColorsContainer.classList.remove('hidden');
      instagramCard.classList.add('theme-custom');
      applyCustomColors();
    }
    saveCurrentDayData();
  });
});

// Apply custom colors
function applyCustomColors() {
  if (activeStylePreset !== 'custom') return;
  
  const bgStart = pickerBgStart.value;
  const bgEnd = pickerBgEnd.value;
  const accent = pickerAccent.value;
  const text = pickerText.value;
  
  // Update card styles inline
  instagramCard.style.background = `linear-gradient(135deg, ${bgStart}, ${bgEnd})`;
  instagramCard.style.color = text;
  instagramCard.style.borderColor = `${accent}33`; // 20% opacity
  
  // Custom badges/pills updates inside custom theme
  const softwareBadge = instagramCard.querySelector('.software-badge');
  softwareBadge.style.backgroundColor = `${accent}26`; // 15% opacity
  softwareBadge.style.borderColor = accent;
  softwareBadge.style.color = accent;
  
  const keycap = instagramCard.querySelector('.keycap');
  if (keycap) {
    keycap.style.background = `linear-gradient(135deg, ${accent}, ${accent}cc)`;
    keycap.style.borderColor = '#ffffff';
    keycap.style.color = '#000000';
  }
  
  const stepNums = instagramCard.querySelectorAll('.card-step-num');
  stepNums.forEach(num => num.style.color = accent);
  
  const proTipBox = instagramCard.querySelector('.pro-tip-box');
  proTipBox.style.backgroundColor = `${accent}14`; // 8% opacity
  proTipBox.style.borderLeft = `8px solid ${accent}`;
  
  const proTipTag = instagramCard.querySelector('.pro-tip-tag');
  proTipTag.style.backgroundColor = accent;
  proTipTag.style.color = '#000000';
  
  const ctaMessage = instagramCard.querySelector('.cta-message');
  ctaMessage.style.color = accent;
}

[pickerBgStart, pickerBgEnd, pickerAccent, pickerText].forEach(picker => {
  if (picker) picker.addEventListener('input', () => { applyCustomColors(); saveCurrentDayData(); });
});

// ==========================================================================
// 5. Canvas Format Swapping (Post aspect ratio scale)
// ==========================================================================

if (btnFormatSquare) {
  btnFormatSquare.addEventListener('click', () => {
    currentFormat = "square";
    btnFormatSquare.classList.add('active');
    if (btnFormatStory) btnFormatStory.classList.remove('active');
    if (canvasWrapper) canvasWrapper.id = "canvas-wrapper-square";
    if (previewAspectLabel) previewAspectLabel.textContent = "1080 x 1080 PX";
    if (instagramCard) {
      instagramCard.classList.remove('format-story');
      instagramCard.classList.add('format-square');
    }
  });
}

if (btnFormatStory) {
  btnFormatStory.addEventListener('click', () => {
    currentFormat = "story";
    btnFormatStory.classList.add('active');
    if (btnFormatSquare) btnFormatSquare.classList.remove('active');
    if (canvasWrapper) canvasWrapper.id = "canvas-wrapper-story";
    if (previewAspectLabel) previewAspectLabel.textContent = "1080 x 1920 PX";
    if (instagramCard) {
      instagramCard.classList.remove('format-square');
      instagramCard.classList.add('format-story');
    }
  });
}

// ==========================================================================
// 6. Export Instagram Card Image (html2canvas Clone Render)
// ==========================================================================

btnExportImage.addEventListener('click', () => {
  showToast("Rendering high-res card...", "info");
  
  // Create a high-fidelity clone of the target card offscreen
  const originNode = document.getElementById('instagram-post-canvas');
  const clone = originNode.cloneNode(true);
  
  // Reset scaling transforms on the clone so it renders at full 1080px resolution
  clone.style.transform = 'none';
  clone.style.position = 'fixed';
  clone.style.top = '-9999px';
  clone.style.left = '-9999px';
  document.body.appendChild(clone);
  
  // Execute html2canvas rendering
  html2canvas(clone, {
    useCORS: true,
    scale: 2, // Double-density scale renders crisp 2160px image
    backgroundColor: null,
    logging: false
  }).then(canvas => {
    // Generate file download link
    const softwareName = contentSoftwareSelect.value.replace(/\s+/g, '_');
    const shortcutKeys = (contentKeysInput.value || 'shortcut').replace(/[^a-zA-Z0-9]/g, '');
    const filename = `${softwareName.toLowerCase()}_${shortcutKeys.toLowerCase()}_post.png`;
    
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    // Clean up clone
    document.body.removeChild(clone);
    showToast("Downloaded graphic successfully!");
  }).catch(err => {
    console.error("html2canvas Render Error: ", err);
    showToast("Failed to render graphic. Check console for details.", "error");
    if (document.body.contains(clone)) {
      document.body.removeChild(clone);
    }
  });
});

// ==========================================================================
// 7. Caption and Hashtags Copy Generator
// ==========================================================================

btnCopyCaption.addEventListener('click', () => {
  const software = contentSoftwareSelect.value;
  const keys = contentKeysInput.value.trim() || 'SHORTCUT';
  const action = contentActionInput.value.trim() || 'Command Action';
  const desc = contentDescInput.value.trim();
  const proTip = contentProTipInput.value.trim();
  
  // Gather non-empty steps
  let stepTextList = [];
  getStepInputs().forEach(input => {
    const text = input.value.trim();
    if (text) stepTextList.push(text);
  });
  
  // Build caption text
  let caption = `🚀 CIVIL ENGINEERING SHORTCUT: ${keys.toUpperCase()} 🚀\n\n`;
  caption += `💻 Software: ${software}\n`;
  caption += `🛠️ Action: ${action}\n\n`;
  
  if (desc) {
    caption += `💡 What it does:\n${desc}\n\n`;
  }
  
  if (stepTextList.length > 0) {
    caption += `👉 Step-by-Step Instructions:\n`;
    stepTextList.forEach((step, idx) => {
      caption += `${idx + 1}️⃣ ${step}\n`;
    });
    caption += `\n`;
  }
  
  if (proTip) {
    caption += `🔥 Value Pro Tip:\n${proTip}\n\n`;
  }
  
  caption += `💾 Save this post for your next project!\n\n`;
  
  // Append targeted hashtags
  const hashtagsVal = contentHashtagsInput ? contentHashtagsInput.value.trim() : '';
  if (hashtagsVal) {
    caption += hashtagsVal;
  } else {
    const tagSoftware = software.toLowerCase().replace(/\s+/g, '');
    caption += `#CivilEngineering #StructuralEngineering #Architecture #CADTips #${tagSoftware}Tips #BIM #RevitTips #AutoCADTips #Civil3D #ETABS #SketchUpTips #LudarpCivil`;
  }
  
  // Copy to clipboard
  navigator.clipboard.writeText(caption).then(() => {
    showToast("Instagram caption copied to clipboard!");
  }).catch(() => {
    showToast("Could not copy caption automatically.", "error");
  });
});

// ==========================================================================
// 8. Public Shortcut Hub & Filters
// ==========================================================================

function renderShortcutsHub() {
  const query = hubSearchInput.value.toLowerCase().trim();
  const activeSoftwareBtn = document.querySelector('.hub-tab-btn[data-software].active');
  const activeSoftwareTab = activeSoftwareBtn ? activeSoftwareBtn.getAttribute('data-software') : 'all';
  
  const activePhaseBtn = document.querySelector('.hub-tab-btn[data-phase].active');
  const activePhaseTab = activePhaseBtn ? activePhaseBtn.getAttribute('data-phase') : 'all';
  
  shortcutsGridContainer.innerHTML = '';
  
  let filtered = shortcutDb.filter(item => {
    const matchesSoftware = activeSoftwareTab === 'all' || item.software === activeSoftwareTab;
    const matchesPhase = activePhaseTab === 'all' || (item.phase && item.phase === activePhaseTab);
    const matchesQuery = !query || 
      item.software.toLowerCase().includes(query) ||
      (item.phase && item.phase.toLowerCase().includes(query)) ||
      item.keys.toLowerCase().includes(query) ||
      item.action.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query);
      
    return matchesSoftware && matchesPhase && matchesQuery;
  });
  
  // Sort results
  const sortVal = hubSortSelect ? hubSortSelect.value : 'recent';
  if (sortVal === 'alpha') {
    filtered.sort((a, b) => a.keys.localeCompare(b.keys));
  } else if (sortVal === 'software') {
    filtered.sort((a, b) => a.software.localeCompare(b.software));
  }
  
  // Update matching results counter
  if (searchFeedbackCount) {
    if (query || activeSoftwareTab !== 'all' || activePhaseTab !== 'all') {
      searchFeedbackCount.textContent = `Found ${filtered.length} shortcut${filtered.length === 1 ? '' : 's'} matching your filters.`;
    } else {
      searchFeedbackCount.textContent = `Showing all ${filtered.length} shortcuts in library.`;
    }
  }
  
  if (filtered.length === 0) {
    shortcutsGridContainer.innerHTML = `
      <div class="hub-empty-state card" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary); border: 2px dashed var(--border-color); border-radius: 12px;">
        <p style="font-weight: 700; margin-bottom: 8px; font-size: 1.1rem; color: var(--accent-color);">No shortcuts found for "${query || 'your filters'}"</p>
        <span style="font-size: 0.85rem; color: var(--text-muted);">Try AutoCAD command names like <strong>TR</strong>, <strong>CO</strong>, or check your active software / phase selectors.</span>
      </div>
    `;
    return;
  }
  
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'shortcut-card card';
    
    // Check if there is a pro tip
    const proTipSection = item.proTip 
      ? `<div class="pro-tip-indicator">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
             <path d="m9 12 2 2 4-4"/>
             <path d="M5 12a7 7 0 1 1 14 0 7 7 0 0 1-14 0z"/>
           </svg>
           Includes Pro Tip
         </div>`
      : '<div></div>';
      
    card.innerHTML = `
      <div>
        <div class="shortcut-card-header">
          <div style="display: flex; gap: 6px;">
            <span class="shortcut-card-badge">${item.software.toUpperCase()}</span>
            <span class="shortcut-card-badge" style="background-color: rgba(56,189,248,0.08); color: var(--accent-color); border-color: rgba(56,189,248,0.15);">${(item.phase || 'basics').toUpperCase()}</span>
          </div>
          <span class="shortcut-card-key">${item.keys}</span>
        </div>
        <h4 class="shortcut-card-title">${item.action}</h4>
        <p class="shortcut-card-desc">${item.desc}</p>
      </div>
      
      <div class="shortcut-card-footer">
        ${proTipSection}
        <div class="action-btn-group">
          <!-- Copy shortcut code -->
          <button class="card-action-btn copy-btn" title="Copy Shortcut Keys" data-copy="${item.keys}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
          </button>
          <!-- Load into creator studio -->
          <button class="card-action-btn edit-btn" title="Edit in Creator Studio" data-id="${item.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    
    // Copy Event
    card.querySelector('.copy-btn').addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const textToCopy = btn.getAttribute('data-copy');
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        btn.classList.add('copy-active');
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        `;
        showToast(`Copied shortcut: "${textToCopy}"`);
        
        setTimeout(() => {
          btn.classList.remove('copy-active');
          btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
          `;
        }, 1500);
      });
    });
    
    // Edit/Load Event
    card.querySelector('.edit-btn').addEventListener('click', () => {
      loadIntoCreatorStudio(item);
    });
    
    shortcutsGridContainer.appendChild(card);
  });
}

// Load shortcut item properties into Creator Studio editor inputs
// Load shortcut item properties into Creator Studio editor inputs
function loadIntoCreatorStudio(item) {
  // Update state variable to track the loaded item
  activeStudioShortcutId = item.id;
  activeCalendarDayNum = null;
  if (btnMarkDayDone) btnMarkDayDone.style.display = 'none';
  
  // Update inputs
  contentSoftwareSelect.value = item.software;
  contentKeysInput.value = item.keys;
  contentActionInput.value = item.action;
  contentDescInput.value = item.desc;
  contentProTipInput.value = item.proTip || "";
  if (contentHashtagsInput) {
    contentHashtagsInput.value = item.hashtags ? item.hashtags.join(' ') : '';
  }
  
  // Re-generate steps container inputs based on item.steps
  stepsContainer.innerHTML = '';
  const steps = item.steps || [];
  if (steps.length === 0) steps.push("");
  
  steps.forEach((stepText, index) => {
    const row = document.createElement('div');
    row.className = 'step-input-row';
    row.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 8px;';
    row.innerHTML = `
      <span class="step-number" style="font-weight: 700; min-width: 15px; color: var(--accent-color);">${index + 1}</span>
      <input type="text" class="step-input" placeholder="Step ${index + 1}" value="${stepText}" style="flex-grow: 1; padding: 8px 12px; background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-family: var(--font-ui); font-size: 0.85rem;">
      <button type="button" class="btn-remove-step" style="background: none; border: none; color: var(--error); cursor: pointer; font-size: 1.1rem; padding: 0 4px;">&times;</button>
    `;
    stepsContainer.appendChild(row);
    bindStepRowEvents(row);
  });
  
  // Trigger update
  updateCardPreview();
  
  // Switch tab visually back to Creator Studio
  document.querySelector('.nav-btn[data-tab="studio"]').click();
  showToast(`Loaded "${item.action}" into Creator Studio!`);
}

// Bind search and filter events
if (hubSearchInput) {
  hubSearchInput.addEventListener('input', renderShortcutsHub);
}

if (hubSortSelect) {
  hubSortSelect.addEventListener('change', renderShortcutsHub);
}

hubTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!btn.hasAttribute('data-software')) return;
    document.querySelectorAll('.hub-tab-btn[data-software]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderShortcutsHub();
  });
});

if (hubPhaseTabBtns) {
  hubPhaseTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      hubPhaseTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderShortcutsHub();
    });
  });
}

// Save Creator Studio Card to Hub Library
if (btnSaveToLibrary) {
  btnSaveToLibrary.addEventListener('click', () => {
    const keysVal = contentKeysInput.value.trim();
    const actionVal = contentActionInput.value.trim();
    if (!keysVal || !actionVal) {
      showToast("Keys and action title are required to save to library.", "warning");
      return;
    }
    
    const softwareVal = contentSoftwareSelect.value;
    const descVal = contentDescInput.value.trim() || "Manual shortcut draft";
    const proTipVal = contentProTipInput.value.trim();
    
    const stepsVal = [];
    getStepInputs().forEach(input => {
      const text = input.value.trim();
      if (text) stepsVal.push(text);
    });
    if (stepsVal.length === 0) {
      stepsVal.push(`Type '${keysVal}' to activate the command.`);
    }
    
    if (activeStudioShortcutId) {
      const index = shortcutDb.findIndex(item => item.id === activeStudioShortcutId);
      if (index !== -1) {
        shortcutDb[index].software = softwareVal;
        shortcutDb[index].keys = keysVal;
        shortcutDb[index].action = actionVal;
        shortcutDb[index].desc = descVal;
        shortcutDb[index].steps = stepsVal;
        shortcutDb[index].proTip = proTipVal;
        
        localStorage.setItem('ludarp_shortcuts', JSON.stringify(shortcutDb));
        renderShortcutsHub();
        saveAllDataToSyncFile();
        showToast("Shortcut card updated in Hub library!");
        return;
      }
    }
    
    // Create new entry
    const id = `item-${Math.random().toString(36).substr(2, 9)}`;
    const newShortcut = {
      id,
      software: softwareVal,
      phase: 'basics',
      keys: keysVal,
      action: actionVal,
      desc: descVal,
      steps: stepsVal,
      proTip: proTipVal
    };
    
    shortcutDb.unshift(newShortcut);
    activeStudioShortcutId = id;
    localStorage.setItem('ludarp_shortcuts', JSON.stringify(shortcutDb));
    renderShortcutsHub();
    saveAllDataToSyncFile();
    showToast("Saved as new shortcut card in Hub library!");
  });
}

// ==========================================================================
// Backup & Recovery Exporter/Importer (single registration)
// ==========================================================================

// Connect file system trigger binding
if (btnConnectFile) btnConnectFile.addEventListener('click', connectLocalFile);

// Export full backup
if (btnExportBackup) {
  btnExportBackup.addEventListener('click', () => {
    try {
      const backupData = {
        version: "1.0",
        timestamp: new Date().toISOString(),
        shortcuts: shortcutDb,
        calendar: calendarDb,
        completed: Array.from(completedCalendarDays)
      };
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ludarp_civil_backup_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      showToast("Library backup exported successfully!");
    } catch (err) {
      console.error(err);
      showToast("Failed to export backup.", "error");
    }
  });
}

// Import backup JSON with backward compatibility
if (btnImportBackup && fileImportBackup) {
  btnImportBackup.addEventListener('click', () => fileImportBackup.click());
  fileImportBackup.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target.result);
        if (!imported.shortcuts || !Array.isArray(imported.shortcuts)) {
          showToast("Invalid backup file format. Missing shortcuts data.", "error");
          return;
        }
        
        const listToImport = imported.calendar || imported.shortcuts;
        if (!listToImport || !Array.isArray(listToImport)) {
          showToast("Invalid backup file format.", "error");
          return;
        }
        
        if (confirm(`Are you sure you want to import ${listToImport.length} items and overwrite your library?`)) {
          calendarDb = listToImport;
          shortcutDb = calendarDb;
          localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
          localStorage.setItem('ludarp_shortcuts', JSON.stringify(shortcutDb));
          
          let progressList = null;
          if (imported.completed && Array.isArray(imported.completed)) {
            progressList = imported.completed;
          } else if (imported.calendarProgress && Array.isArray(imported.calendarProgress)) {
            progressList = imported.calendarProgress;
          }
          
          if (progressList) {
            completedCalendarDays = new Set(progressList);
            localStorage.setItem('ludarp_completed_calendar', JSON.stringify(Array.from(completedCalendarDays)));
            updateCalendarProgress();
            renderCalendarHub();
            renderSidebarDaysList();
          }
          
          renderShortcutsHub();
          saveAllDataToSyncFile();
          showToast("Library and progress restored successfully!");
        }
      } catch (err) {
        console.error(err);
        showToast("Error reading file. Make sure it's valid JSON.", "error");
      }
      fileImportBackup.value = '';
    };
    reader.readAsText(file);
  });
}

// ==========================================================================
// 9. Add Shortcut Dialog / Modal & Data Saving
// ==========================================================================

btnOpenAddModal.addEventListener('click', () => {
  addShortcutModal.classList.remove('id-hidden');
});

function closeModal() {
  addShortcutModal.classList.add('id-hidden');
  addShortcutForm.reset();
}

btnCloseModal.addEventListener('click', closeModal);
btnCancelModal.addEventListener('click', closeModal);

// Form submit action
addShortcutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const software = document.getElementById('modal-software').value;
  const phase = modalPhaseSelect ? modalPhaseSelect.value : 'basics';
  const keys = document.getElementById('modal-keys').value.trim();
  const action = document.getElementById('modal-action').value.trim();
  const desc = document.getElementById('modal-desc').value.trim();
  const proTip = document.getElementById('modal-pro-tip').value.trim();
  
  // Generate random ID
  const id = `item-${Math.random().toString(36).substr(2, 9)}`;
  
  // Build default steps based on user input
  const steps = [
    `Type '${keys}' in the command terminal or workspace.`,
    `Execute the tool prompts accordingly.`,
    `Complete your modeling action in the project grid.`
  ];
  
  const newShortcut = { id, software, phase, keys, action, desc, steps, proTip };
  
  // Add to database & save to LocalStorage
  shortcutDb.unshift(newShortcut);
  localStorage.setItem('ludarp_shortcuts', JSON.stringify(shortcutDb));
  
  closeModal();
  renderShortcutsHub();
  saveAllDataToSyncFile();
  showToast("New shortcut saved to library!");
});

// ==========================================================================
// 10. Lightweight Toast Notifications
// ==========================================================================

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  // Checkmark or Info Icon
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 18px; height: 18px; color: var(--success);">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    `;
  } else if (type === 'info') {
    iconSvg = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 18px; height: 18px; color: var(--accent-color);">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    `;
  } else {
    iconSvg = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 18px; height: 18px; color: var(--error);">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    `;
  }
  
  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;
  
  toastContainer.appendChild(toast);
  
  // Slide out after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards';
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// ==========================================================================
// 10.5 Bulk Export Automation (Sequential Queueing & ZIP bundling)
// ==========================================================================

btnBulkExport.addEventListener('click', async () => {
  // 1. Validate checked software categories
  const selectedSoftwares = Array.from(document.querySelectorAll('.bulk-software-checkbox:checked')).map(cb => cb.value);
  
  if (selectedSoftwares.length === 0) {
    showToast("Please check at least one software platform to export.", "warning");
    return;
  }
  
  // 2. Filter shortcuts list
  const itemsToExport = shortcutDb.filter(item => selectedSoftwares.includes(item.software));
  
  if (itemsToExport.length === 0) {
    showToast("No shortcuts found in database for the selected software categories.", "warning");
    return;
  }
  
  // 3. Update UI states
  btnBulkExport.disabled = true;
  btnBulkExport.style.opacity = '0.5';
  bulkProgressContainer.classList.remove('id-hidden');
  showToast("Starting bulk generation process...", "info");
  
  const zip = new JSZip();
  let captionsCatalog = "==================================================\n";
  captionsCatalog += "  LUDARP CIVIL AUTOMATED INSTAGRAM CAPTION CATALOG\n";
  captionsCatalog += "==================================================\n\n";
  
  const total = itemsToExport.length;
  
  try {
    for (let index = 0; index < total; index++) {
      const item = itemsToExport[index];
      
      // Update UI Progress bar
      const percent = Math.round((index / total) * 100);
      bulkProgressPercent.textContent = `${percent}%`;
      bulkProgressBar.style.width = `${percent}%`;
      bulkProgressStatus.textContent = `Rendering: [${item.software}] ${item.keys}`;
      
      // A. Temporarily update the DOM preview card elements
      cardSoftwareName.textContent = item.software.toUpperCase();
      cardKeys.textContent = item.keys;
      cardAction.textContent = item.action;
      cardDesc.textContent = item.desc;
      
      cardStepsList.innerHTML = '';
      const markerStyle = item.markerStyle || (document.getElementById('list-marker-style') ? document.getElementById('list-marker-style').value : 'number');
      const isSymbolMarker = ['bullet', 'arrow', 'check', 'square'].includes(markerStyle);
      const symbolClass = isSymbolMarker ? `is-symbol marker-${markerStyle}` : '';
      
      item.steps.forEach((stepText, sIdx) => {
        if (stepText.trim()) {
          const stepItem = document.createElement('div');
          stepItem.className = 'card-step-item';
          const markerSymbol = getMarkerSymbol(markerStyle, sIdx);
          stepItem.innerHTML = `
            <div class="card-step-num ${symbolClass}">${markerSymbol}</div>
            <div class="card-step-text">${stepText}</div>
          `;
          cardStepsList.appendChild(stepItem);
        }
      });
      
      const proTipBox = instagramCard.querySelector('.pro-tip-box');
      if (item.proTip) {
        proTipBox.style.display = 'flex';
        cardProTip.textContent = item.proTip;
      } else {
        proTipBox.style.display = 'none';
      }
      
      // Re-trigger custom colors dynamically if on custom style theme
      if (activeStylePreset === 'custom') {
        applyCustomColors();
      }
      
      // Wait for DOM paint tick
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // B. Render via html2canvas Clone
      const originNode = document.getElementById('instagram-post-canvas');
      const clone = originNode.cloneNode(true);
      clone.style.transform = 'none';
      clone.style.position = 'fixed';
      clone.style.top = '-9999px';
      clone.style.left = '-9999px';
      document.body.appendChild(clone);
      
      const canvas = await html2canvas(clone, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
        logging: false
      });
      
      document.body.removeChild(clone);
      
      // C. Base64 file mapping
      const base64Image = canvas.toDataURL('image/png').split(',')[1];
      
      // Generate clean filename
      const fileIdx = (index + 1).toString().padStart(2, '0');
      const softwareName = item.software.replace(/\s+/g, '_').toLowerCase();
      const shortcutName = item.keys.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      const imgFilename = `${fileIdx}_${softwareName}_${shortcutName}.png`;
      
      // Add to zip file
      zip.file(imgFilename, base64Image, { base64: true });
      
      // D. Build Instagram Caption for catalog text
      let caption = `==================================================\n`;
      caption += `FILE: ${imgFilename}\n`;
      caption += `==================================================\n\n`;
      caption += `🚀 CIVIL ENGINEERING SHORTCUT: ${item.keys.toUpperCase()} 🚀\n\n`;
      caption += `💻 Software: ${item.software}\n`;
      caption += `🛠️ Action: ${item.action}\n\n`;
      
      if (item.desc) {
        caption += `💡 What it does:\n${item.desc}\n\n`;
      }
      
      if (item.steps.length > 0) {
        caption += `👉 Step-by-Step Instructions:\n`;
        item.steps.forEach((step, sIdx) => {
          caption += `${sIdx + 1}️⃣ ${step}\n`;
        });
        caption += `\n`;
      }
      
      if (item.proTip) {
        caption += `🔥 Value Pro Tip:\n${item.proTip}\n\n`;
      }
      
      caption += `💾 Save this post for your next project!\n\n`;
      
      const tagSoftware = item.software.toLowerCase().replace(/\s+/g, '');
      caption += `#CivilEngineering #StructuralEngineering #Architecture #CADTips #${tagSoftware}Tips #BIM #RevitTips #AutoCADTips #Civil3D #ETABS #SketchUpTips #LudarpCivil\n\n\n`;
      
      captionsCatalog += caption;
    }
    
    // 4. Update UI complete progress
    bulkProgressPercent.textContent = `100%`;
    bulkProgressBar.style.width = `100%`;
    bulkProgressStatus.textContent = `Compressing files...`;
    
    // Add captions text file to zip
    zip.file("captions.txt", captionsCatalog);
    
    // 5. Generate and download ZIP file
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement('a');
    link.download = `ludarp_instagram_pack.zip`;
    link.href = URL.createObjectURL(content);
    link.click();
    
    showToast("Downloaded bulk ZIP archive successfully!");
  } catch (error) {
    console.error("Bulk Generator Error: ", error);
    showToast("Error generating batch files. Check console.", "error");
  } finally {
    // 6. Reset visual preview to the current form inputs
    updateCardPreview();
    
    // Hide progress bar & enable button
    btnBulkExport.disabled = false;
    btnBulkExport.style.opacity = '1';
    bulkProgressContainer.classList.add('id-hidden');
  }
});

// ==========================================================================
// 10.6 Web-Grounded AI Generation Handler (Gemini API with Google Search)
// ==========================================================================

aiApiKeyInput.addEventListener('input', () => {
  localStorage.setItem('ludarp_gemini_api_key', aiApiKeyInput.value.trim());
});

btnAiGenerate.addEventListener('click', async () => {
  const apiKey = aiApiKeyInput.value.trim();
  const topic = aiPromptInput.value.trim();
  
  if (!apiKey) {
    showToast("Please enter a valid Gemini API Key on the left.", "warning");
    return;
  }
  
  if (!topic) {
    showToast("Please enter an engineering topic or search query.", "warning");
    return;
  }
  
  // Update UI loading states
  btnAiGenerate.disabled = true;
  btnAiGenerate.style.opacity = '0.5';
  if (aiLoadingContainer) {
    aiLoadingContainer.classList.remove('id-hidden');
    aiLoadingText.textContent = "Grounding on Google Search & generating card...";
  }
  
  const systemPrompt = `You are a professional Civil Engineering content writer. The user wants to generate an Instagram post for a shortcut related to: "${topic}".
  
  YOUR INSTRUCTIONS:
  1. Use the googleSearchRetrieval tool to perform search queries to find the exact software, official command name, and keyboard shortcut keys used for this topic.
  2. Identify the most popular and industry-standard software (AutoCAD, Revit, Civil 3D, ETABS, or SketchUp).
  3. Extract or deduce the primary keyboard shortcut (e.g. TR for Trim in AutoCAD, WA for Wall in Revit, F5 for Run Analysis in ETABS, or ALIGNMENT for Civil 3D alignments).
  4. Generate a detailed, engaging description of what the tool does.
  5. Provide 3 simple, sequential steps to use this shortcut.
  6. Include a high-value "Pro Tip" related to this shortcut.
  7. You MUST return ONLY a JSON object that matches the following schema. Do not wrap in markdown tags or include any trailing text:
  {
    "software": "AutoCAD | Revit | Civil 3D | ETABS | SketchUp",
    "keys": "keyboard shortcut keys (capitalized, e.g. TR or F5)",
    "action": "action name (e.g., Trim Lines)",
    "desc": "brief description of what it does",
    "steps": [
      "Step 1 text",
      "Step 2 text",
      "Step 3 text"
    ],
    "proTip": "expert tip or value addition"
  }`;
  
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        tools: [{
          googleSearchRetrieval: {} // Corrected tool name for Google Search Grounding
        }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error?.message || "Gemini API Request failed");
    }
    
    const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error("No response content returned from Gemini. Please verify your query or key.");
    }
    
    // Parse response JSON
    const data = JSON.parse(responseText);
    latestGeneratedResearch = data; // Store in state variable
    
    // Display results in Research tab
    if (resSoftware) resSoftware.textContent = data.software || 'AutoCAD';
    if (resKeys) resKeys.textContent = data.keys || 'SHORTCUT';
    if (resAction) resAction.textContent = data.action || 'Command';
    if (resDesc) resDesc.textContent = data.desc || '';
    if (resProTip) resProTip.textContent = data.proTip || 'Save this post!';
    
    if (resSteps) {
      resSteps.innerHTML = '';
      const stepsList = data.steps || [];
      stepsList.forEach(stepText => {
        const li = document.createElement('li');
        li.textContent = stepText;
        resSteps.appendChild(li);
      });
    }
    
    // Toggle displays
    if (researchEmptyState) researchEmptyState.classList.add('id-hidden');
    if (researchResultsDisplay) researchResultsDisplay.classList.remove('id-hidden');
    
    showToast("AI successfully researched details! Review on the right.");
    aiPromptInput.value = '';
    
  } catch (error) {
    console.error("AI Generation Error: ", error);
    showToast(error.message || "Failed to generate shortcut. Check console.", "error");
  } finally {
    btnAiGenerate.disabled = false;
    btnAiGenerate.style.opacity = '1';
    if (aiLoadingContainer) aiLoadingContainer.classList.add('id-hidden');
  }
});

// Import Researched Data to Creator Studio Editor
if (btnImportResearchToStudio) {
  btnImportResearchToStudio.addEventListener('click', () => {
    if (!latestGeneratedResearch) {
      showToast("No generated research found.", "warning");
      return;
    }
    
    const data = latestGeneratedResearch;
    activeStudioShortcutId = null; // Reset edit ID since this is a new draft imported
    
    // Software
    const softwareOptions = Array.from(contentSoftwareSelect.options).map(opt => opt.value);
    if (!softwareOptions.includes(data.software)) {
      const newOpt = new Option(data.software, data.software);
      contentSoftwareSelect.add(newOpt);
    }
    contentSoftwareSelect.value = data.software || 'AutoCAD';
    
    // Fields
    contentKeysInput.value = data.keys || '';
    contentActionInput.value = data.action || '';
    contentDescInput.value = data.desc || '';
    contentProTipInput.value = data.proTip || '';
    
    // Steps
    stepsContainer.innerHTML = '';
    const steps = data.steps || [];
    if (steps.length === 0) steps.push("Execute the command.");
    steps.forEach((stepText, index) => {
      const row = document.createElement('div');
      row.className = 'step-input-row';
      row.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 8px;';
      row.innerHTML = `
        <span class="step-number" style="font-weight: 700; min-width: 15px; color: var(--accent-color);">${index + 1}</span>
        <input type="text" class="step-input" placeholder="Step ${index + 1}" value="${stepText}" style="flex-grow: 1; padding: 8px 12px; background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-family: var(--font-ui); font-size: 0.85rem;">
        <button type="button" class="btn-remove-step" style="background: none; border: none; color: var(--error); cursor: pointer; font-size: 1.1rem; padding: 0 4px;">&times;</button>
      `;
      stepsContainer.appendChild(row);
      bindStepRowEvents(row);
    });
    
    updateCardPreview();
    
    // Switch to studio tab
    document.querySelector('.nav-btn[data-tab="studio"]').click();
    showToast("Loaded AI researched draft into Creator Studio!");
  });
}

// Save Researched Data directly to Hub Library
if (btnSaveResearchToHub) {
  btnSaveResearchToHub.addEventListener('click', () => {
    if (!latestGeneratedResearch) {
      showToast("No generated research found.", "warning");
      return;
    }
    
    const data = latestGeneratedResearch;
    const id = `item-${Math.random().toString(36).substr(2, 9)}`;
    
    const newShortcut = {
      id,
      software: data.software || 'AutoCAD',
      phase: 'basics',
      keys: data.keys || 'SHORTCUT',
      action: data.action || 'Command Action',
      desc: data.desc || 'AI-researched tool details',
      steps: data.steps || ['Execute the tool.'],
      proTip: data.proTip || ''
    };
    
    shortcutDb.unshift(newShortcut);
    localStorage.setItem('ludarp_shortcuts', JSON.stringify(shortcutDb));
    renderShortcutsHub();
    saveAllDataToSyncFile();
    showToast("Successfully saved researched shortcut directly to Hub Library!");
  });
}

// ==========================================================================
// 10.7 Content Calendar Manager Logic
// ==========================================================================

let rawCompleted = safeJsonParse('ludarp_completed_calendar', []);
if (!Array.isArray(rawCompleted)) rawCompleted = [];
let completedCalendarDays = new Set(rawCompleted.map(String));

function renderCalendarHub() {
  const selectedPhase = calendarPhaseSelect.value;
  calendarGridContainer.innerHTML = '';
  
  // Filter posts
  const sourcePosts = (Array.isArray(calendarDb) && calendarDb.length > 0) ? calendarDb : (typeof autocadCalendar !== 'undefined' ? autocadCalendar : []);
  const filteredPosts = sourcePosts.filter(post => {
    return selectedPhase === 'all' || post.phase === selectedPhase;
  });
  
  if (filteredPosts.length === 0) {
    calendarGridContainer.innerHTML = `
      <div class="hub-empty-state card" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
        <p>No calendar posts match your filter criteria.</p>
      </div>
    `;
    return;
  }
  
  filteredPosts.forEach(post => {
    const isCompleted = completedCalendarDays.has(post.day);
    
    // Determine card phase color theme class
    let phaseClass = 'phase-basics';
    if (post.phase.includes('Advanced')) {
      phaseClass = 'phase-advanced';
    } else if (post.phase.includes('Workflow')) {
      phaseClass = 'phase-workflow';
    }
    
    // Set snippet preview
    let snippet = post.description || post.desc || '';
    if (!snippet && post.bullets && post.bullets.length > 0) {
      snippet = post.bullets.slice(0, 3).map(b => `• ${b}`).join('\n');
    } else if (!snippet && post.script) {
      snippet = post.script;
    } else if (!snippet && post.caption) {
      snippet = post.caption;
    }
    
    const card = document.createElement('div');
    card.className = `calendar-card ${phaseClass} ${isCompleted ? 'completed' : ''}`;
    card.setAttribute('data-day', post.day);
    
    const shortcutKey = post.shortcut || post.keys || '';
    const cardTitle = post.action || (post.title ? post.title.replace(/^[^:]+:\s*/, '') : 'Untitled') ;
    const formatType = post.format || 'post';
    card.innerHTML = `
      <div>
        <div class="calendar-card-header">
          <span class="calendar-day-badge">DAY ${post.day}</span>
          ${shortcutKey ? `<span class="calendar-format-badge" style="font-family:var(--font-mono); font-size:0.72rem; font-weight:800; padding:3px 8px; background:var(--bg-secondary); border:1px solid var(--border); border-radius:6px; color:var(--accent);">${shortcutKey}</span>` : ''}
        </div>
        <h4 class="calendar-card-title">${cardTitle}</h4>
        <pre class="calendar-card-snippet" style="font-family: inherit; white-space: pre-wrap; margin: 8px 0; max-height: 80px; overflow: hidden; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">${snippet}</pre>
      </div>
      
      <div class="calendar-card-footer">
        <label class="calendar-complete-label">
          <input type="checkbox" class="calendar-complete-checkbox" ${isCompleted ? 'checked' : ''} data-day="${post.day}">
          <span>${isCompleted ? 'Posted ✓' : 'Mark Done'}</span>
        </label>
        <button class="calendar-load-btn" data-day="${post.day}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px; vertical-align: middle;">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
          </svg>
          Load Card
        </button>
      </div>
    `;
    
    // Bind toggle completed status
    const checkbox = card.querySelector('.calendar-complete-checkbox');
    checkbox.addEventListener('change', (e) => {
      const dayNum = post.day;
      if (e.target.checked) {
        completedCalendarDays.add(dayNum);
        card.classList.add('completed');
        card.querySelector('.calendar-complete-label span').textContent = 'Posted ✓';
        showToast(`Day ${dayNum} marked as Completed!`);
      } else {
        completedCalendarDays.delete(dayNum);
        card.classList.remove('completed');
        card.querySelector('.calendar-complete-label span').textContent = 'Mark Done';
        showToast(`Day ${dayNum} marked as Pending.`);
      }
      localStorage.setItem('ludarp_completed_calendar', JSON.stringify(Array.from(completedCalendarDays)));
      updateCalendarProgress();
      renderSidebarDaysList();
      saveAllDataToSyncFile();
      
      // Sync editor state if active day changed
      if (String(activeCalendarDayNum) === String(dayNum)) {
        const activePost = calendarDb.find(p => String(p.day) === String(dayNum));
        if (activePost) {
          loadCalendarItemToEditor(activePost);
        }
      }
    });
    
    // Bind load into creator studio
    const loadBtn = card.querySelector('.calendar-load-btn');
    loadBtn.addEventListener('click', () => {
      loadCalendarItemToEditor(post);
    });
    
    calendarGridContainer.appendChild(card);
  });
  
  updateCalendarProgress();
}

function updateCalendarProgress() {
  const totalDays = calendarDb ? calendarDb.length : 84;
  const completedCount = calendarDb ? calendarDb.filter(item => completedCalendarDays.has(String(item.day))).length : completedCalendarDays.size;
  const percent = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;
  
  if (calendarProgressCount) calendarProgressCount.textContent = `${completedCount} / ${totalDays}`;
  if (calendarProgressPercent) calendarProgressPercent.textContent = `(${percent}%)`;
  if (calendarProgressBar) calendarProgressBar.style.width = `${percent}%`;
  
  const sidebarCount = document.getElementById('sidebar-progress-count');
  if (sidebarCount) sidebarCount.textContent = `${completedCount} / ${totalDays}`;
  
  const dbStatPosted = document.getElementById('db-stat-posted-count');
  if (dbStatPosted) dbStatPosted.textContent = `${completedCount} / ${totalDays}`;
  
  const dbStatCal = document.getElementById('db-stat-calendar-count');
  if (dbStatCal) dbStatCal.textContent = totalDays;
}

function loadCalendarItemToEditor(item) {
  // Set loaded calendar day number
  activeCalendarDayNum = item.day;
  
  // Update Mark Day Done button state
  if (btnMarkDayDone) {
    btnMarkDayDone.style.display = 'flex';
    const isCompleted = completedCalendarDays.has(String(item.day));
    if (isCompleted) {
      btnMarkDayDone.querySelector('span').textContent = 'Posted ✓';
      btnMarkDayDone.style.borderColor = 'var(--success)';
      btnMarkDayDone.style.color = 'var(--success)';
    } else {
      btnMarkDayDone.querySelector('span').textContent = 'Mark Day Done';
      btnMarkDayDone.style.borderColor = 'var(--border-color)';
      btnMarkDayDone.style.color = 'var(--text-secondary)';
    }
  }

  // Reset loaded library shortcut tracking since we are starting fresh with a calendar day
  activeStudioShortcutId = null;

  // Clean titles to separate keys and action
  let keys = item.keys || 'CAD';
  let action = item.title;
  
  const colonMatch = item.title.match(/^([^:]+):\s*(.*)$/);
  if (colonMatch) {
    keys = colonMatch[1].trim();
    action = colonMatch[2].trim();
  }

  // Update Studio View Headers dynamically
  const dayTitleEl = document.getElementById('day-title');
  const daySubEl = document.getElementById('day-sub');
  if (dayTitleEl) dayTitleEl.textContent = action;
  if (daySubEl) daySubEl.textContent = (item.phase || '').toUpperCase();

  // Reset software and select AutoCAD since this is AutoCAD calendar
  contentSoftwareSelect.value = item.software || 'AutoCAD';
  
  // Set values in Creator Studio inputs
  const carouselIdInput = document.getElementById('content-carousel-id');
  if (carouselIdInput) {
    carouselIdInput.value = item.carouselId || (item.day ? `AC-${String(item.day).padStart(3, '0')}` : 'AC-001');
  }
  contentKeysInput.value = keys;
  const contentSymbolInput = document.getElementById('content-symbol');
  if (contentSymbolInput) contentSymbolInput.value = item.symbol || '';
  
  const contentImageUrlInput = document.getElementById('content-image-url');
  const imagePosSelect = document.getElementById('image-position-select');
  if (contentImageUrlInput) contentImageUrlInput.value = item.imageUrl || item.image || '';
  if (imagePosSelect) imagePosSelect.value = item.imagePos || 'bottom';

  contentActionInput.value = action;
  
  // Build description
  let descText = item.description || item.desc || item.caption || item.script || (item.bullets && item.bullets.length > 0 ? item.bullets.join(' | ') : '');
  contentDescInput.value = descText;
  
  // Set pro-tip & common mistake if any
  contentProTipInput.value = item.proTip ? item.proTip : '';
  const contentCommonMistakeInput = document.getElementById('content-common-mistake');
  if (contentCommonMistakeInput) contentCommonMistakeInput.value = item.commonMistake ? item.commonMistake : '';
  
  // Set Difficulty & Category
  const contentDiffInput = document.getElementById('content-difficulty');
  const contentCatInput = document.getElementById('content-category');
  if (contentDiffInput) contentDiffInput.value = item.difficulty || 'Beginner';
  if (contentCatInput) contentCatInput.value = item.category || 'Drawing';

  // Set hashtags if any
  if (contentHashtagsInput) {
    contentHashtagsInput.value = item.hashtags ? (Array.isArray(item.hashtags) ? item.hashtags.join(' ') : item.hashtags) : '#autocad #civilengineering #drafting';
  }

  // Set Date & Performance fields
  const contentDateInput = document.getElementById('content-date');
  const contentSavesInput = document.getElementById('content-saves');
  const contentLikesInput = document.getElementById('content-likes');
  if (contentDateInput) contentDateInput.value = item.scheduledDate || '';
  if (contentSavesInput) contentSavesInput.value = item.saves || '';
  if (contentLikesInput) contentLikesInput.value = item.likes || '';

  // Set List Marker Style
  const listMarkerSelect = document.getElementById('list-marker-style');
  if (listMarkerSelect) {
    listMarkerSelect.value = item.markerStyle || 'number';
  }
  const markerStyle = item.markerStyle || 'number';

  // Auto-detect command type (Single Command vs List vs Carousel)
  const isCarousel = item.format === 'carousel' || item.type === 'carousel' || (item.carouselId && /[A-Z]$/i.test(item.carouselId)) || (item.script && item.script.includes('---'));
  const isList = item.type === 'list' || (item.bullets && item.bullets.length > 5);
  
  if (isCarousel) {
    setType('carousel', false);
  } else if (isList) {
    setType('list', false);
  } else {
    setType('command', false);
  }

  // Re-generate steps container inputs based on item content
  stepsContainer.innerHTML = '';
  const listItems = item.bullets || item.items || [];
  if (listItems.length > 0) {
    listItems.forEach((bulletText, index) => {
      const markerSymbol = getMarkerSymbol(markerStyle, index);
      const row = document.createElement('div');
      row.className = 'step-input-row';
      row.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 8px;';
      row.innerHTML = `
        <span class="step-number" style="font-weight: 700; min-width: 15px; color: var(--accent-color);">${markerSymbol}</span>
        <input type="text" class="step-input" placeholder="Item ${index + 1}" value="${bulletText}" style="flex-grow: 1; padding: 8px 12px; background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-family: var(--font-ui); font-size: 0.85rem;">
        <button type="button" class="btn-remove-step" style="background: none; border: none; color: var(--error); cursor: pointer; font-size: 1.1rem; padding: 0 4px;">&times;</button>
      `;
      stepsContainer.appendChild(row);
      bindStepRowEvents(row);
    });
  } else {
    // Reel script mapping or fallback
    const fallbackSteps = [];
    if (item.script) {
      fallbackSteps.push(`Hook: ${action}`);
      fallbackSteps.push(`Demo: ${item.script.substring(0, 70)}...`);
      fallbackSteps.push(`Caption tip: ${item.caption ? item.caption.substring(0, 70) : 'Learn this!'}`);
    } else {
      fallbackSteps.push(`Launch AutoCAD software.`);
      fallbackSteps.push(`Type command: ${keys} and press Enter.`);
      fallbackSteps.push(`Execute the drawing action on screen.`);
    }
    
    fallbackSteps.forEach((stepText, index) => {
      const row = document.createElement('div');
      row.className = 'step-input-row';
      row.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 8px;';
      row.innerHTML = `
        <span class="step-number" style="font-weight: 700; min-width: 15px; color: var(--accent-color);">${index + 1}</span>
        <input type="text" class="step-input" placeholder="Step ${index + 1}" value="${stepText}" style="flex-grow: 1; padding: 8px 12px; background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-family: var(--font-ui); font-size: 0.85rem;">
        <button type="button" class="btn-remove-step" style="background: none; border: none; color: var(--error); cursor: pointer; font-size: 1.1rem; padding: 0 4px;">&times;</button>
      `;
      stepsContainer.appendChild(row);
      bindStepRowEvents(row);
    });
  }
  
  // ── Restore Style / Theme State ──────────────────────────────────────────
  const canvas = document.getElementById('instagram-post-canvas');

  // Restore theme
  if (item._theme && canvas) {
    // Remove existing theme classes and apply saved one
    [...canvas.classList].filter(c => c.startsWith('theme-')).forEach(c => canvas.classList.remove(c));
    canvas.classList.add(item._theme);
    // Sync the theme preset buttons
    document.querySelectorAll('.style-preset-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === item._theme);
    });
  }

  // Restore custom color pickers + apply CSS vars
  if (item._colors) {
    Object.entries(item._colors).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) { el.value = val; el.dispatchEvent(new Event('input')); }
    });
  }

  // Restore font size sliders
  const defaultFontSizes = {
    'font-size-title': '55',
    'font-size-keycap': '30',
    'font-size-desc': '30',
    'font-size-steps': '16',
    'font-size-protip': '20'
  };
  const fontSizesToApply = Object.assign({}, defaultFontSizes, item._fontSizes || {});
  Object.entries(fontSizesToApply).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) { el.value = val; el.dispatchEvent(new Event('input')); }
  });

  // Restore layout/overlay sliders
  if (item._layoutSettings) {
    Object.entries(item._layoutSettings).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) { el.value = val; el.dispatchEvent(new Event('input')); }
    });
  }

  // Restore element visibility checkboxes
  if (item._visibility) {
    Object.entries(item._visibility).forEach(([id, checked]) => {
      const el = document.getElementById(id);
      if (el) { el.checked = checked; el.dispatchEvent(new Event('change')); }
    });
  }

  // Restore image sliders and alignment
  if (item._imgHeight) { const el = document.getElementById('image-height-slider'); if (el) { el.value = item._imgHeight; el.dispatchEvent(new Event('input')); } }
  if (item._imgOffsetX) { const el = document.getElementById('image-offset-x-slider'); if (el) { el.value = item._imgOffsetX; el.dispatchEvent(new Event('input')); } }
  if (item._imgOffsetY) { const el = document.getElementById('image-offset-y-slider'); if (el) { el.value = item._imgOffsetY; el.dispatchEvent(new Event('input')); } }
  if (item._imgAlign) {
    document.querySelectorAll('#image-align-group .btn-img-align').forEach(btn => {
      const isActive = (btn.dataset.align || btn.textContent.trim().toLowerCase()) === item._imgAlign;
      btn.classList.toggle('active', isActive);
      btn.style.background = isActive ? 'var(--accent)' : 'var(--bg-tertiary)';
      btn.style.color = isActive ? '#000' : 'var(--text-primary)';
      btn.style.fontWeight = isActive ? '800' : 'normal';
    });
  }
  // ──────────────────────────────────────────────────────────────────────────

  // Sync view
  updateCardPreview();
  
  // Switch to studio tab
  document.querySelector('.nav-btn[data-tab="studio"]').click();
  showToast(`Loaded Day ${item.day}: "${action}" into Creator Studio!`);
}

if (calendarPhaseSelect) {
  calendarPhaseSelect.addEventListener('change', renderCalendarHub);
}

if (btnMarkDayDone) {
  btnMarkDayDone.addEventListener('click', () => {
    if (!activeCalendarDayNum) return;
    const dayStr = String(activeCalendarDayNum);
    // Use mutable calendarDb (not static autocadCalendar)
    const post = calendarDb.find(p => String(p.day) === dayStr);
    
    if (completedCalendarDays.has(dayStr)) {
      completedCalendarDays.delete(dayStr);
      if (post) {
        post.posted = false;
        post.status = 'draft';
      }
      showToast(`Lesson ${dayStr} marked as Pending.`);
    } else {
      completedCalendarDays.add(dayStr);
      if (post) {
        post.posted = true;
        post.status = 'published';
      }
      showToast(`✅ Lesson ${dayStr} marked as Published!`, 'success');
    }
    
    localStorage.setItem('ludarp_completed_calendar', JSON.stringify(Array.from(completedCalendarDays)));
    updateCalendarProgress();
    renderCalendarHub();
    renderSidebarDaysList();
    renderShortcutsHub();
    saveAllDataToSyncFile();
    
    // Auto-advance to next day after marking done
    const idx = calendarDb.findIndex(p => String(p.day) === dayStr);
    if (idx !== -1 && idx < calendarDb.length - 1 && completedCalendarDays.has(dayStr)) {
      const nextPost = calendarDb[idx + 1];
      activeCalendarDayNum = nextPost.day;
      setTimeout(() => loadCalendarItemToEditor(nextPost), 500);
    } else if (post) {
      loadCalendarItemToEditor(post);
    }
  });
}


// ==========================================================================
// 10.8 ChatGPT / Claude Paste Importer Parser
// ==========================================================================

function matchSoftware(val) {
  const normalized = val.toLowerCase();
  if (normalized.includes('autocad')) return 'AutoCAD';
  if (normalized.includes('revit')) return 'Revit';
  if (normalized.includes('civil 3d') || normalized.includes('civil3d')) return 'Civil 3D';
  if (normalized.includes('etabs')) return 'ETABS';
  if (normalized.includes('sketchup')) return 'SketchUp';
  return '';
}

function parseAICopyPasteText(text) {
  const result = {
    software: '',
    keys: '',
    action: '',
    desc: '',
    steps: ['', '', ''],
    proTip: ''
  };

  const lines = text.split('\n');
  let stepIndex = 0;
  let inStepsList = false;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Remove markdown bold marks (**), backticks (`), and asterisks (*)
    const cleanLine = line.replace(/\*\*|`|__|\*/g, '').trim();
    const lowerCleanLine = cleanLine.toLowerCase();

    // 1. Software Match
    if (lowerCleanLine.startsWith('software:')) {
      const val = cleanLine.substring(cleanLine.indexOf(':') + 1).trim();
      result.software = matchSoftware(val);
      continue;
    }

    // 2. Shortcut Keys Match
    if (lowerCleanLine.startsWith('shortcut:') || lowerCleanLine.startsWith('key:') || lowerCleanLine.startsWith('keys:') || lowerCleanLine.startsWith('shortcut keys:')) {
      const val = cleanLine.substring(cleanLine.indexOf(':') + 1).trim();
      result.keys = val;
      continue;
    }

    // 3. Command Action Match
    if (lowerCleanLine.startsWith('action:') || lowerCleanLine.startsWith('command:') || lowerCleanLine.startsWith('command action:') || lowerCleanLine.startsWith('title:')) {
      const val = cleanLine.substring(cleanLine.indexOf(':') + 1).trim();
      result.action = val;
      continue;
    }

    // 4. Pro Tip Match
    if (lowerCleanLine.startsWith('pro tip:') || lowerCleanLine.startsWith('pro-tip:') || lowerCleanLine.startsWith('value pro tip:') || lowerCleanLine.startsWith('tip:')) {
      const val = cleanLine.substring(cleanLine.indexOf(':') + 1).trim();
      result.proTip = val;
      continue;
    }

    // 5. Description Match
    if (lowerCleanLine.startsWith('description:') || lowerCleanLine.startsWith('what it does:') || lowerCleanLine.startsWith('what does this shortcut do:')) {
      const val = cleanLine.substring(cleanLine.indexOf(':') + 1).trim();
      result.desc = val;
      continue;
    }

    // 6. Step Header check
    if (lowerCleanLine.startsWith('steps:') || lowerCleanLine.startsWith('instructions:') || lowerCleanLine.startsWith('how to use:')) {
      inStepsList = true;
      continue;
    }

    // 7. Check if line is a numbered/bulleted step
    const stepMatch = cleanLine.match(/^(?:[0-9]+️⃣?|[0-9]+\.|step\s+[0-9]+:?|[-*•])\s*(.*)/i);
    if (stepMatch && stepMatch[1]) {
      if (stepIndex < 3) {
        result.steps[stepIndex] = stepMatch[1].trim();
        stepIndex++;
      }
      continue;
    }
    
    // Heuristics fallbacks (if no prefix tags are matched)
    const softwareMatch = matchSoftware(cleanLine);
    if (softwareMatch && !result.software) {
      result.software = softwareMatch;
      continue;
    }

    // If it's a short 1-4 word line in uppercase, it might be the keys
    if (cleanLine.length <= 10 && cleanLine === cleanLine.toUpperCase() && !result.keys && /^[A-Z0-9\s/&+-]+$/.test(cleanLine)) {
      result.keys = cleanLine;
      continue;
    }
  }

  // Final Heuristic: if description is empty, find the longest line that isn't a step or software or keys or pro-tip
  if (!result.desc) {
    let longestLine = '';
    for (let line of lines) {
      line = line.replace(/\*\*|`|__|\*/g, '').trim();
      if (!line) continue;
      
      const lower = line.toLowerCase();
      if (lower.startsWith('software:') || lower.startsWith('shortcut:') || lower.startsWith('action:') || lower.startsWith('pro tip:') || lower.startsWith('steps:') || lower.match(/^(?:[0-9]+\.|[-*•])\s*/)) {
        continue;
      }
      if (line.length > longestLine.length && line.length < 150) {
        longestLine = line;
      }
    }
    if (longestLine) result.desc = longestLine;
  }

  return result;
}

// ==========================================================================
// 10.9 Multi-slide Carousel ZIP Exporter
// ==========================================================================

if (btnExportCarousel) {
  btnExportCarousel.addEventListener('click', async () => {
    showToast("Preparing carousel slides...", "info");
    
    const steps = [];
    getStepInputs().forEach(input => {
      const text = input.value.trim();
      if (text) steps.push(text);
    });
    
    if (steps.length === 0) {
      showToast("Please add at least one step to export a carousel.", "warning");
      return;
    }
    
    btnExportCarousel.disabled = true;
    btnExportCarousel.style.opacity = '0.5';
    
    try {
      const zip = new JSZip();
      
      // Clone the card offscreen to mutate styles without visual flickering
      const originNode = document.getElementById('instagram-post-canvas');
      const clone = originNode.cloneNode(true);
      clone.style.transform = 'none';
      clone.style.position = 'fixed';
      clone.style.top = '-9999px';
      clone.style.left = '-9999px';
      document.body.appendChild(clone);
      
      const cloneDesc = clone.querySelector('#card-desc');
      const cloneStepsList = clone.querySelector('#card-steps-list');
      const cloneProTipBox = clone.querySelector('.pro-tip-box');
      
      let slideIdx = 1;
      
      const carouselInput = document.getElementById('content-carousel-id');
      const baseCode = (carouselInput && carouselInput.value.trim() ? carouselInput.value.trim() : 'AC-001').toUpperCase();

      // --- Slide 1 (Hook / Title) -> AC-001A ---
      if (cloneDesc) cloneDesc.style.display = 'block';
      if (cloneStepsList) cloneStepsList.style.display = 'none';
      if (cloneProTipBox) cloneProTipBox.style.display = 'none';
      
      // Small delay to ensure styles apply before capture
      await new Promise(resolve => setTimeout(resolve, 100));
      let canvas = await html2canvas(clone, { scale: 2, backgroundColor: null, logging: false });
      zip.file(`${baseCode}A.png`, canvas.toDataURL('image/png').split(',')[1], { base64: true });
      
      // --- Slides 2..N (Steps) -> AC-001B, AC-001C... ---
      if (cloneDesc) cloneDesc.style.display = 'none';
      if (cloneStepsList) {
        cloneStepsList.style.display = 'flex';
        cloneStepsList.style.flexDirection = 'column';
        cloneStepsList.style.justifyContent = 'center';
        cloneStepsList.style.height = '100%';
      }
      if (cloneProTipBox) cloneProTipBox.style.display = 'none';
      
      for (let i = 0; i < steps.length; i++) {
        const letter = String.fromCharCode(66 + i); // 'B', 'C', 'D'...
        if (cloneStepsList) {
          cloneStepsList.innerHTML = `
            <div class="card-step-item" style="flex-direction: column; align-items: center; text-align: center; gap: 20px; padding: 40px 20px; height: 100%; justify-content: center;">
              <div class="card-step-num" style="font-size: 3rem; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">${(i + 1).toString().padStart(2, '0')}</div>
              <div class="card-step-text" style="font-size: 1.4rem; line-height: 1.6; max-width: 90%; font-weight: 600; text-align: center; margin-top: 10px;">${steps[i]}</div>
            </div>
          `;
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
        canvas = await html2canvas(clone, { scale: 2, backgroundColor: null, logging: false });
        zip.file(`${baseCode}${letter}.png`, canvas.toDataURL('image/png').split(',')[1], { base64: true });
      }
      
      // --- Final Slide (Pro Tip + CTA) -> AC-001[Final] ---
      const finalLetter = String.fromCharCode(66 + steps.length);
      if (cloneStepsList) cloneStepsList.style.display = 'none';
      if (cloneProTipBox) {
        cloneProTipBox.style.display = 'flex';
        cloneProTipBox.style.flexDirection = 'column';
        cloneProTipBox.style.alignItems = 'center';
        cloneProTipBox.style.justifyContent = 'center';
        cloneProTipBox.style.padding = '40px';
        cloneProTipBox.style.margin = 'auto';
        cloneProTipBox.style.width = '90%';
        cloneProTipBox.style.minHeight = '250px';
        cloneProTipBox.style.borderLeft = 'none';
        cloneProTipBox.style.borderRadius = '16px';
        cloneProTipBox.style.border = '2px dashed var(--accent-color)';
        
        const cloneProTipTag = cloneProTipBox.querySelector('.pro-tip-tag');
        if (cloneProTipTag) {
          cloneProTipTag.style.fontSize = '1.2rem';
          cloneProTipTag.style.padding = '6px 16px';
          cloneProTipTag.style.marginBottom = '16px';
        }
        
        const cloneProTipText = cloneProTipBox.querySelector('#card-pro-tip');
        if (cloneProTipText) {
          cloneProTipText.style.fontSize = '1.4rem';
          cloneProTipText.style.lineHeight = '1.6';
          cloneProTipText.style.textAlign = 'center';
          cloneProTipText.style.fontWeight = '600';
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
      canvas = await html2canvas(clone, { scale: 2, backgroundColor: null, logging: false });
      zip.file(`${baseCode}${finalLetter}.png`, canvas.toDataURL('image/png').split(',')[1], { base64: true });
      
      document.body.removeChild(clone);
      
      const content = await zip.generateAsync({ type: "blob" });
      const softwareName = contentSoftwareSelect.value.replace(/\s+/g, '_').toLowerCase();
      const shortcutKeys = (contentKeysInput.value || 'shortcut').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      
      const link = document.createElement('a');
      link.download = `${softwareName}_${shortcutKeys}_carousel.zip`;
      link.href = URL.createObjectURL(content);
      link.click();
      
      showToast("Downloaded carousel slides successfully!");
    } catch (err) {
      console.error("Carousel Render Error: ", err);
      showToast("Failed to render carousel slides.", "error");
    } finally {
      btnExportCarousel.disabled = false;
      btnExportCarousel.style.opacity = '1';
    }
  });
}


if (btnParsePaste) {
  btnParsePaste.addEventListener('click', () => {
    const pasteText = aiPasteInput.value.trim();
    if (!pasteText) {
      showToast("Please paste ChatGPT or Claude text first.", "warning");
      return;
    }

    // Check if it's a batch paste split by ---
    if (pasteText.includes('---')) {
      const blocks = pasteText.split('---');
      let importCount = 0;
      
      blocks.forEach(block => {
        const trimmedBlock = block.trim();
        if (!trimmedBlock) return;
        
        const data = parseAICopyPasteText(trimmedBlock);
        if (data.keys && data.action) {
          const id = `item-${Math.random().toString(36).substr(2, 9)}`;
          const steps = data.steps.filter(s => s.trim() !== '');
          if (steps.length === 0) {
            steps.push(`Type '${data.keys}' in the command terminal.`);
          }
          
          const newShortcut = {
            id,
            software: data.software || 'AutoCAD',
            phase: 'basics', // Fallback to basics
            keys: data.keys,
            action: data.action,
            desc: data.desc || 'Imported from AI draft',
            steps,
            proTip: data.proTip || ''
          };
          
          shortcutDb.unshift(newShortcut);
          importCount++;
        }
      });
      
      if (importCount > 0) {
        localStorage.setItem('ludarp_shortcuts', JSON.stringify(shortcutDb));
        renderShortcutsHub();
        saveAllDataToSyncFile();
        aiPasteInput.value = '';
        showToast(`Successfully imported ${importCount} shortcuts to library! Go to Section 4 to export.`);
      } else {
        showToast("Could not find any valid shortcuts to parse. Check format.", "error");
      }
    } else {
      // Single post parse
      const data = parseAICopyPasteText(pasteText);

      if (data.software) {
        contentSoftwareSelect.value = data.software;
      } else {
        contentSoftwareSelect.value = "AutoCAD";
      }

      contentKeysInput.value = data.keys || 'SHORTCUT';
      contentActionInput.value = data.action || 'Command Action';
      contentDescInput.value = data.desc || 'Auto-parsed from paste text';
      contentProTipInput.value = data.proTip || '';

      // Rebuild dynamic step inputs
      stepsContainer.innerHTML = '';
      const steps = data.steps.filter(s => s.trim() !== '');
      if (steps.length === 0) steps.push("Execute the command.");
      
      steps.forEach((stepText, index) => {
        const row = document.createElement('div');
        row.className = 'step-input-row';
        row.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 8px;';
        row.innerHTML = `
          <span class="step-number" style="font-weight: 700; min-width: 15px; color: var(--accent-color);">${index + 1}</span>
          <input type="text" class="step-input" placeholder="Step ${index + 1}" value="${stepText}" style="flex-grow: 1; padding: 8px 12px; background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-family: var(--font-ui); font-size: 0.85rem;">
          <button type="button" class="btn-remove-step" style="background: none; border: none; color: var(--error); cursor: pointer; font-size: 1.1rem; padding: 0 4px;">&times;</button>
        `;
        stepsContainer.appendChild(row);
        bindStepRowEvents(row);
      });

      activeStudioShortcutId = null;
      updateCardPreview();
      aiPasteInput.value = '';
      showToast("Successfully parsed and populated card details!");
    }
  });
}


// ==========================================================================
// 10.9 File System Access API & IndexedDB Sync
// ==========================================================================

function setType(type, triggerSync = true) {
  const btnCmd = typeCommandBtn || document.getElementById('type-command');
  const btnLst = typeListBtn || document.getElementById('type-list');
  const btnCar = typeCarouselBtn || document.getElementById('type-carousel');
  const fieldKey = keyField || document.getElementById('key-field');
  const lblSteps = stepsLabel || document.getElementById('steps-label');
  const grpCarId = document.getElementById('carousel-id-field');
  const grpSlideChips = document.getElementById('carousel-slide-chips-header');

  if (type === 'carousel') {
    if (btnCmd) btnCmd.classList.remove('active');
    if (btnLst) btnLst.classList.remove('active');
    if (btnCar) btnCar.classList.add('active');
    if (fieldKey) fieldKey.style.display = 'block';
    if (lblSteps) lblSteps.textContent = 'Carousel Slide Items';
    if (grpCarId) grpCarId.style.display = 'block';
    if (grpSlideChips) grpSlideChips.style.display = 'flex';
    const cardKeysWrapper = document.querySelector('.keycap-container');
    if (cardKeysWrapper) cardKeysWrapper.style.display = 'flex';
  } else if (type === 'command') {
    if (btnCmd) btnCmd.classList.add('active');
    if (btnLst) btnLst.classList.remove('active');
    if (btnCar) btnCar.classList.remove('active');
    if (fieldKey) fieldKey.style.display = 'block';
    if (lblSteps) lblSteps.textContent = 'Steps';
    if (grpCarId) grpCarId.style.display = 'none';
    if (grpSlideChips) grpSlideChips.style.display = 'none';
    const cardKeysWrapper = document.querySelector('.keycap-container');
    if (cardKeysWrapper) cardKeysWrapper.style.display = 'flex';
  } else {
    if (btnCmd) btnCmd.classList.remove('active');
    if (btnLst) btnLst.classList.add('active');
    if (btnCar) btnCar.classList.remove('active');
    if (fieldKey) fieldKey.style.display = 'none';
    if (lblSteps) lblSteps.textContent = 'Shortcut List Items';
    if (grpCarId) grpCarId.style.display = 'none';
    if (grpSlideChips) grpSlideChips.style.display = 'none';
    const cardKeysWrapper = document.querySelector('.keycap-container');
    if (cardKeysWrapper) cardKeysWrapper.style.display = 'none';
  }
  if (triggerSync) {
    saveCurrentDayData();
    updateCardPreview();
  }
}

const bindTypeButtons = () => {
  const btnCmd = document.getElementById('type-command');
  const btnLst = document.getElementById('type-list');
  const btnCar = document.getElementById('type-carousel');
  if (btnCmd) btnCmd.onclick = () => setType('command');
  if (btnLst) btnLst.onclick = () => setType('list');
  if (btnCar) btnCar.onclick = () => setType('carousel');
};
bindTypeButtons();
document.addEventListener('DOMContentLoaded', bindTypeButtons);

// Multi-Slide Script Parser for '---' dividers
function parseMultiSlideScript(scriptText) {
  if (!scriptText || !scriptText.includes('---')) return null;

  const slides = scriptText.split(/\n\s*---\s*\n|\n\s*---|---\s*\n|---/).map(s => s.trim()).filter(s => s);
  if (slides.length === 0) return null;

  const parsedData = {
    title: '',
    desc: '',
    steps: [],
    proTip: ''
  };

  // Slide 1 (Hook / Cover / Title & Desc)
  const slide1Lines = slides[0].split('\n').map(l => l.trim()).filter(l => l);
  slide1Lines.forEach(line => {
    const clean = line.replace(/\*\*|`|__|\*/g, '').trim();
    if (/^(?:title|action|hook|cover):\s*/i.test(clean)) {
      parsedData.title = clean.replace(/^(?:title|action|hook|cover):\s*/i, '').trim();
    } else if (/^(?:desc|description):\s*/i.test(clean)) {
      parsedData.desc = clean.replace(/^(?:desc|description):\s*/i, '').trim();
    } else if (!parsedData.title && !clean.includes(':')) {
      parsedData.title = clean;
    } else if (!parsedData.desc && parsedData.title) {
      parsedData.desc += (parsedData.desc ? ' ' : '') + clean;
    }
  });

  // Slide 2 (Steps / Content)
  if (slides.length > 1) {
    const slide2Lines = slides[1].split('\n').map(l => l.trim()).filter(l => l);
    slide2Lines.forEach(line => {
      const clean = line.replace(/\*\*|`|__|\*/g, '').trim();
      const stepText = clean.replace(/^(?:\d+[\.\)]|[•▶✓■a-z]\.)\s*/i, '').trim();
      if (stepText) parsedData.steps.push(stepText);
    });
  }

  // Slide 3 (ProTip / CTA)
  if (slides.length > 2) {
    const slide3Lines = slides[2].split('\n').map(l => l.trim()).filter(l => l);
    slide3Lines.forEach(line => {
      const clean = line.replace(/\*\*|`|__|\*/g, '').trim();
      if (/^(?:pro\s*tip|protip|tip):\s*/i.test(clean)) {
        parsedData.proTip = clean.replace(/^(?:pro\s*tip|protip|tip):\s*/i, '').trim();
      } else {
        parsedData.proTip += (parsedData.proTip ? ' ' : '') + clean;
      }
    });
  }

  return parsedData;
}

if (carouselMultiScriptInput) {
  carouselMultiScriptInput.addEventListener('input', () => {
    const text = carouselMultiScriptInput.value;
    if (text.includes('---')) {
      setType('carousel', false);
      const parsed = parseMultiSlideScript(text);
      if (parsed) {
        if (parsed.title) contentActionInput.value = parsed.title;
        if (parsed.desc) contentDescInput.value = parsed.desc;
        if (parsed.proTip) contentProTipInput.value = parsed.proTip;
        if (parsed.steps && parsed.steps.length > 0) {
          stepsContainer.innerHTML = '';
          parsed.steps.forEach((stepText, index) => {
            const row = document.createElement('div');
            row.className = 'step-input-row';
            row.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 8px;';
            row.innerHTML = `
              <span class="step-number" style="font-weight: 700; min-width: 15px; color: var(--accent-color);">${index + 1}</span>
              <input type="text" class="step-input" placeholder="Step ${index + 1}" value="${stepText}" style="flex-grow: 1; padding: 8px 12px; background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-family: var(--font-ui); font-size: 0.85rem;">
              <button type="button" class="btn-remove-step" style="background: none; border: none; color: var(--error); cursor: pointer; font-size: 1.1rem; padding: 0 4px;">&times;</button>
            `;
            stepsContainer.appendChild(row);
            bindStepRowEvents(row);
          });
        }
      }
    }
    updateCardPreview();
    saveCurrentDayData();
  });
}

// Arrow day selectors
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

if (btnPrev) {
  btnPrev.addEventListener('click', () => {
    if (!activeCalendarDayNum) activeCalendarDayNum = "1";
    const idx = calendarDb.findIndex(d => String(d.day) === String(activeCalendarDayNum));
    if (idx > 0) {
      const prevPost = calendarDb[idx - 1];
      activeCalendarDayNum = prevPost.day;
      loadCalendarItemToEditor(prevPost);
      renderSidebarDaysList();
    }
  });
}

if (btnNext) {
  btnNext.addEventListener('click', () => {
    if (!activeCalendarDayNum) activeCalendarDayNum = "1";
    const idx = calendarDb.findIndex(d => String(d.day) === String(activeCalendarDayNum));
    if (idx !== -1 && idx < calendarDb.length - 1) {
      const nextPost = calendarDb[idx + 1];
      activeCalendarDayNum = nextPost.day;
      loadCalendarItemToEditor(nextPost);
      renderSidebarDaysList();
    }
  });
}

// Auto-save form content back to calendarDb array and file handle if connected
async function saveCurrentDayData() {
  if (!activeCalendarDayNum) return;
  const index = calendarDb.findIndex(d => String(d.day) === String(activeCalendarDayNum));
  if (index === -1) return;
  
  const d = calendarDb[index];
  d.software = contentSoftwareSelect.value;
  d.title = contentActionInput.value.trim();
  d.desc = contentDescInput.value.trim();
  d.description = d.desc; // keep both fields in sync
  d.proTip = contentProTipInput.value.trim();
  
  const carouselIdInput = document.getElementById('content-carousel-id');
  if (carouselIdInput) {
    d.carouselId = carouselIdInput.value.trim() || `AC-${String(d.day).padStart(3, '0')}`;
  }
  
  const contentDiffInput = document.getElementById('content-difficulty');
  const contentCatInput = document.getElementById('content-category');
  const contentCommonMistakeInput = document.getElementById('content-common-mistake');
  
  if (contentDiffInput) d.difficulty = contentDiffInput.value;
  if (contentCatInput) d.category = contentCatInput.value;
  if (contentCommonMistakeInput) d.commonMistake = contentCommonMistakeInput.value.trim();
  
  if (contentHashtagsInput) {
    d.hashtags = contentHashtagsInput.value.trim().split(/\s+/).filter(t => t);
  }
  
  // Format step inputs
  const steps = [];
  getStepInputs().forEach(input => {
    const text = input.value.trim();
    if (text) steps.push(text);
  });
  
  const isCommand = typeCommandBtn && typeCommandBtn.classList.contains('active');
  d.type = isCommand ? 'command' : 'list';
  d.keys = contentKeysInput.value.trim();
  d.markerStyle = document.getElementById('list-marker-style') ? document.getElementById('list-marker-style').value : 'number';
  
  if (isCommand) {
    d.bullets = steps;
    d.items = [];
  } else {
    d.bullets = [];
    d.items = steps;
  }

  // ── Save Style / Theme State ──────────────────────────────────────────────
  // Capture the active theme class on the canvas
  const canvasEl = document.getElementById('instagram-post-canvas');
  const themeClass = canvasEl ? [...canvasEl.classList].find(c => c.startsWith('theme-')) : null;
  if (themeClass) d._theme = themeClass;

  // Capture custom color pickers
  const colorIds = ['color-bg-start','color-bg-end','color-accent','color-text','color-keycap-bg','color-keycap-text','color-header-bg','color-header-text'];
  d._colors = {};
  colorIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) d._colors[id] = el.value;
  });

  // Capture font size sliders
  const sliderIds = ['font-size-title','font-size-keycap','font-size-desc','font-size-steps','font-size-protip'];
  d._fontSizes = {};
  sliderIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) d._fontSizes[id] = el.value;
  });

  // Capture layout/overlay sliders
  const layoutIds = ['layout-opacity','layout-vignette','layout-watermark-size'];
  d._layoutSettings = {};
  layoutIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) d._layoutSettings[id] = el.value;
  });

  // Capture element visibility checkboxes
  const checkIds = ['toggle-elem-software','toggle-elem-handle','toggle-elem-symbol','toggle-elem-image','toggle-elem-keycap','toggle-elem-title','toggle-elem-desc','toggle-elem-steps','layout-toggle-protip','toggle-elem-mistake','layout-toggle-bookmark','layout-toggle-grid','layout-toggle-watermark'];
  d._visibility = {};
  checkIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) d._visibility[id] = el.checked;
  });

  // Capture image settings
  const imgUrl = document.getElementById('content-image-url');
  const imgPos = document.getElementById('image-position-select');
  const imgHeight = document.getElementById('image-height-slider');
  const imgOffsetX = document.getElementById('image-offset-x-slider');
  const imgOffsetY = document.getElementById('image-offset-y-slider');
  const imgAlignActive = document.querySelector('#image-align-group .btn-img-align.active');
  if (imgUrl) d.imageUrl = imgUrl.value;
  if (imgPos) d.imagePos = imgPos.value;
  if (imgHeight) d._imgHeight = imgHeight.value;
  if (imgOffsetX) d._imgOffsetX = imgOffsetX.value;
  if (imgOffsetY) d._imgOffsetY = imgOffsetY.value;
  if (imgAlignActive) d._imgAlign = imgAlignActive.dataset.align || imgAlignActive.textContent.trim().toLowerCase();
  // ──────────────────────────────────────────────────────────────────────────
  
  // Always cache back to browser storage
  localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
  
  // Real-time synchronization to disk file
  await saveAllDataToSyncFile();
}

const DB_NAME = 'LudarpCivilDB';
const STORE_NAME = 'FileHandles';

function getDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

async function getStoredHandle() {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get('data_json');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.error("IndexedDB load error:", e);
    return null;
  }
}

async function storeHandle(handle) {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(handle, 'data_json');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.error("IndexedDB store error:", e);
  }
}

// Request and verify file system permissions
async function verifyPermission(handle, readWrite) {
  const options = {};
  if (readWrite) {
    options.mode = 'readwrite';
  }
  if ((await handle.queryPermission(options)) === 'granted') {
    return true;
  }
  if ((await handle.requestPermission(options)) === 'granted') {
    return true;
  }
  return false;
}

// Update disk sync status description in sidebar
function updateSyncStatus(connected, filename = '') {
  if (!syncStatusText || !btnConnectFile) return;
  if (connected) {
    syncStatusText.innerHTML = `Connected:<br><span style="color: var(--success); font-family: var(--font-mono); font-weight: 700; font-size:0.7rem">${filename}</span>`;
    btnConnectFile.textContent = "↩ Change File";
    btnConnectFile.style.borderColor = "var(--success)";
    btnConnectFile.style.color = "var(--success)";
    // Update sync dot
    const syncDot = document.getElementById('sync-dot');
    if (syncDot) syncDot.classList.add('connected');
  } else {
    syncStatusText.innerHTML = `Local Sandbox`;
    btnConnectFile.textContent = "Link JSON File";
    btnConnectFile.style.borderColor = "";
    btnConnectFile.style.color = "";
  }
}

// Load sync data from disk file
async function loadSyncDataFromFile(handle) {
  try {
    const file = await handle.getFile();
    const contents = await file.text();
    if (contents.trim()) {
      const data = JSON.parse(contents);
      if (data.calendar && Array.isArray(data.calendar)) {
        calendarDb = data.calendar;
      } else if (data.shortcuts && Array.isArray(data.shortcuts)) {
        calendarDb = data.shortcuts;
      }
      shortcutDb = calendarDb;
      localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
      localStorage.setItem('ludarp_shortcuts', JSON.stringify(calendarDb));
      renderShortcutsHub();
      if (data.completed && Array.isArray(data.completed)) {
        completedCalendarDays = new Set(data.completed.map(String));
        localStorage.setItem('ludarp_completed_calendar', JSON.stringify([...completedCalendarDays]));
        updateCalendarProgress();
        renderCalendarHub();
        renderSidebarDaysList();
      }
      showToast(`Loaded data from connected file: ${handle.name}`);
    }
  } catch (err) {
    console.error("Failed to parse file data:", err);
    showToast("Connected to empty or invalid file. Ready to sync.");
  }
}

// Connect file system picker
async function connectLocalFile() {
  try {
    const [handle] = await window.showOpenFilePicker({
      types: [{
        description: 'JSON Files',
        accept: {
          'application/json': ['.json']
        }
      }],
      excludeAcceptAllOption: true,
      multiple: false
    });
    
    const hasPerm = await verifyPermission(handle, true);
    if (!hasPerm) {
      showToast("Write permission denied. Sandbox mode active.", "warning");
      return;
    }
    
    fileHandle = handle;
    await storeHandle(handle);
    await loadSyncDataFromFile(handle);
    updateSyncStatus(true, handle.name);
    
    saveAllDataToSyncFile(); // sync immediately to keep state
  } catch (e) {
    console.error(e);
    if (e.name !== 'AbortError') {
      showToast("Error connecting local file.", "error");
    }
  }
}

// Sync database and calendar checks back to file system
async function saveAllDataToSyncFile() {
  // Always update LocalStorage
  localStorage.setItem('ludarp_shortcuts', JSON.stringify(shortcutDb));
  localStorage.setItem('ludarp_completed_calendar', JSON.stringify(Array.from(completedCalendarDays)));
  localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
  
  if (fileHandle) {
    try {
      const writable = await fileHandle.createWritable();
      const payload = {
        shortcuts: shortcutDb,
        calendar: calendarDb,
        completed: Array.from(completedCalendarDays)
      };
      await writable.write(JSON.stringify(payload, null, 2));
      await writable.close();
    } catch (err) {
      console.error("Auto-sync disk write failed:", err);
    }
  }

  // Auto-sync data to Google Sheet / Excel if configured
  if (typeof window.pushPostsToGoogleSheet === 'function') {
    window.pushPostsToGoogleSheet(true);
  }
}

// Render dynamic post checklist in sidebar (Post Library)
function renderSidebarDaysList() {
  ensureCalendarDbLoaded();
  const sidebarList = document.getElementById('sidebar-days-list');
  const progressCount = document.getElementById('sidebar-progress-count');
  const progressBar = document.getElementById('sidebar-progress-bar');
  
  if (!sidebarList) return;
  sidebarList.innerHTML = '';
  
  if (calendarDb.length === 0) {
    sidebarList.innerHTML = `
      <div style="padding: 20px 10px; text-align: center; color: var(--text-muted); font-size: 0.8rem;">
        <p style="font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">No Content Posts Yet</p>
        <p style="font-size: 0.72rem; line-height: 1.4;">Paste your fresh posts in the <b>Bulk Post Importer</b> tab to start building your library!</p>
      </div>
    `;
    if (progressCount) progressCount.textContent = `0 / 0`;
    if (progressBar) progressBar.style.width = `0%`;
    return;
  }

  const phases = [...new Set(calendarDb.map(post => post.phase || 'General Posts'))];
  
  phases.forEach(phase => {
    const label = document.createElement('div');
    label.className = 'phase-label';
    label.style.cssText = 'font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin: 12px 0 6px 0; padding-bottom: 4px; border-bottom: 1px solid var(--border);';
    label.textContent = phase;
    sidebarList.appendChild(label);
    
    calendarDb.forEach(post => {
      if ((post.phase || 'General Posts') !== phase) return;
      
      const isCompleted = completedCalendarDays.has(String(post.day));
      const isActive = String(activeCalendarDayNum) === String(post.day);
      const item = document.createElement('div');
      item.className = `day-item${isCompleted ? ' done' : ''}${isActive ? ' active' : ''}`;
      
      item.innerHTML = `
        <span class="dchk">${isCompleted ? '✓' : ''}</span>
        <span class="dtitle">${post.title || post.action || 'Untitled Post'}</span>
      `;
      
      item.addEventListener('click', () => {
        activeCalendarDayNum = post.day;
        loadCalendarItemToEditor(post);
        renderSidebarDaysList();
      });
      
      sidebarList.appendChild(item);
    });
  });
  
  // Update sidebar progress count & bar
  const total = calendarDb.length;
  const done = calendarDb.filter(post => completedCalendarDays.has(String(post.day))).length;
  if (progressCount) progressCount.textContent = `${done} / ${total}`;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  if (progressBar) progressBar.style.width = `${percent}%`;
}

// Auto-reconnect stored JSON file handle on page load
async function initDiskSync() {
  try {
    const handle = await getStoredHandle();
    if (handle) {
      const options = { mode: 'readwrite' };
      if (await handle.queryPermission(options) === 'granted') {
        fileHandle = handle;
        await loadSyncDataFromFile(handle);
        updateSyncStatus(true, handle.name);
        renderSidebarDaysList();
      } else {
        const statusEl = document.getElementById('sync-status');
        const btnEl = document.getElementById('btn-connect-file');
        if (statusEl && btnEl) {
          statusEl.innerHTML = `Linked file:<br><span style="color: var(--accent-color); font-family: var(--font-mono); font-weight: 700;">${handle.name}</span><br><span style="font-size:0.7rem; color:var(--text-muted);">Permission needed.</span>`;
          btnEl.textContent = "🔓 Authorize Sync & Connect";
          btnEl.onclick = async () => {
            const granted = await verifyPermission(handle, true);
            if (granted) {
              fileHandle = handle;
              await loadSyncDataFromFile(handle);
              updateSyncStatus(true, handle.name);
              btnEl.onclick = connectLocalFile; // restore picker event
              renderSidebarDaysList();
            } else {
              showToast("Authorization denied.", "warning");
            }
          };
        }
      }
    }
  } catch (e) {
    console.error("Failed to restore disk sync:", e);
  }
}

// ==========================================================================
// 11. Initializer Hook
// ==========================================================================

async function initApp() {
  renderShortcutsHub();
  updateCalendarProgress(); // Fix Progress display showing 0/83 initially
  renderSidebarDaysList();
  
  // Load saved API key
  if (aiApiKeyInput) {
    aiApiKeyInput.value = localStorage.getItem('ludarp_gemini_api_key') || '';
  }
  
function resetCreatorStudioForm() {
  const dayTitleEl = document.getElementById('day-title');
  const daySubEl = document.getElementById('day-sub');
  if (dayTitleEl) dayTitleEl.textContent = "Post Editor";
  if (daySubEl) daySubEl.textContent = "CREATOR STUDIO";

  if (contentKeysInput) contentKeysInput.value = "";
  if (contentActionInput) contentActionInput.value = "";
  if (contentDescInput) contentDescInput.value = "";
  if (contentProTipInput) contentProTipInput.value = "";

  if (stepsContainer) {
    stepsContainer.innerHTML = `
      <div class="step-input-row">
        <span class="step-number">1</span>
        <input type="text" class="step-input" placeholder="Item 1" value="">
        <button type="button" class="btn-remove-step">&times;</button>
      </div>
    `;
    stepsContainer.querySelectorAll('.step-input-row').forEach(row => bindStepRowEvents(row));
  }
  updateCardPreview();
}

  // Load initial active day on startup (Day 1)
  if (calendarDb.length > 0) {
    const activeDay = calendarDb.find(d => String(d.day) === String(activeCalendarDayNum)) || calendarDb[0];
    loadCalendarItemToEditor(activeDay);
  } else {
    resetCreatorStudioForm();
  }
  
  // Wire real-time CAD crosshairs mouse tracking movement on preview canvas
  const wrapper = document.getElementById('canvas-wrapper-square');
  const crossH = document.getElementById('cad-crosshair-h');
  const crossV = document.getElementById('cad-crosshair-v');
  
  if (wrapper && crossH && crossV) {
    wrapper.addEventListener('mouseenter', () => {
      crossH.style.display = 'block';
      crossV.style.display = 'block';
    });
    wrapper.addEventListener('mouseleave', () => {
      crossH.style.display = 'none';
      crossV.style.display = 'none';
    });
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      crossH.style.top = `${y}px`;
      crossV.style.left = `${x}px`;
    });
  }
  
  // Initialize File Sync
  await initDiskSync();

  // Layout Adjuster Controls Initialization
  const layoutTitleFont = document.getElementById('layout-title-font');
  const layoutTitleSize = document.getElementById('layout-title-size');
  const layoutGridSize = document.getElementById('layout-grid-size');
  const layoutProtipRot = document.getElementById('layout-protip-rot');
  const layoutWatermarkOp = document.getElementById('layout-watermark-op');
  const layoutWatermarkSize = document.getElementById('layout-watermark-size');
  const layoutToggleGrid = document.getElementById('layout-toggle-grid');
  const layoutToggleProtip = document.getElementById('layout-toggle-protip');
  const layoutToggleWatermark = document.getElementById('layout-toggle-watermark');
  const layoutToggleBookmark = document.getElementById('layout-toggle-bookmark');

  const valTitleSize = document.getElementById('val-title-size');
  const valGridSize = document.getElementById('val-grid-size');
  const valProtipRot = document.getElementById('val-protip-rot');
  const valWatermarkOp = document.getElementById('val-watermark-op');
  const valWatermarkSize = document.getElementById('val-watermark-size');

  if (layoutTitleFont) {
    layoutTitleFont.addEventListener('change', () => {
      if (cardAction) cardAction.style.fontFamily = layoutTitleFont.value;
    });
  }

  if (layoutTitleSize) {
    layoutTitleSize.addEventListener('input', () => {
      if (valTitleSize) valTitleSize.textContent = layoutTitleSize.value;
      if (cardAction) cardAction.style.fontSize = `${layoutTitleSize.value}px`;
    });
  }

  if (layoutGridSize) {
    layoutGridSize.addEventListener('input', () => {
      if (valGridSize) valGridSize.textContent = layoutGridSize.value;
      const bgGrid = instagramCard ? instagramCard.querySelector('.card-bg-grid') : null;
      if (bgGrid) bgGrid.style.backgroundSize = `${layoutGridSize.value}px ${layoutGridSize.value}px`;
    });
  }

  if (layoutProtipRot) {
    layoutProtipRot.addEventListener('input', () => {
      if (valProtipRot) valProtipRot.textContent = layoutProtipRot.value;
      const proTipBox = instagramCard ? instagramCard.querySelector('.pro-tip-box') : null;
      if (proTipBox) proTipBox.style.transform = `rotate(${layoutProtipRot.value}deg)`;
    });
  }

  if (layoutWatermarkOp) {
    layoutWatermarkOp.addEventListener('input', () => {
      if (valWatermarkOp) valWatermarkOp.textContent = layoutWatermarkOp.value;
      if (cardWatermark) cardWatermark.style.opacity = layoutWatermarkOp.value / 100;
    });
  }

  if (layoutWatermarkSize) {
    layoutWatermarkSize.addEventListener('input', () => {
      if (valWatermarkSize) valWatermarkSize.textContent = layoutWatermarkSize.value;
      if (cardWatermark) cardWatermark.style.fontSize = `${layoutWatermarkSize.value}px`;
    });
  }

  if (layoutToggleGrid) {
    layoutToggleGrid.addEventListener('change', () => {
      const bgGrid = instagramCard ? instagramCard.querySelector('.card-bg-grid') : null;
      if (bgGrid) bgGrid.style.display = layoutToggleGrid.checked ? 'block' : 'none';
    });
  }

  if (layoutToggleProtip) {
    layoutToggleProtip.addEventListener('change', () => {
      const proTipBox = instagramCard ? instagramCard.querySelector('.pro-tip-box') : null;
      if (proTipBox) proTipBox.style.display = layoutToggleProtip.checked ? 'flex' : 'none';
    });
  }

  if (layoutToggleWatermark) {
    layoutToggleWatermark.addEventListener('change', () => {
      if (cardWatermark) cardWatermark.style.display = layoutToggleWatermark.checked ? 'block' : 'none';
    });
  }

  if (layoutToggleBookmark) {
    layoutToggleBookmark.addEventListener('change', () => {
      const ctaMsg = instagramCard ? instagramCard.querySelector('.cta-message') : null;
      if (ctaMsg) ctaMsg.style.display = layoutToggleBookmark.checked ? 'flex' : 'none';
    });
  }

  // ── Element Visibility Checkboxes Binding ─────────────────────────────────
  const toggleElemSoftware = document.getElementById('toggle-elem-software');
  const toggleElemHandle = document.getElementById('toggle-elem-handle');
  const toggleElemSymbol = document.getElementById('toggle-elem-symbol');
  const toggleElemKeycap = document.getElementById('toggle-elem-keycap');
  const toggleElemTitle = document.getElementById('toggle-elem-title');
  const toggleElemDesc = document.getElementById('toggle-elem-desc');
  const toggleElemSteps = document.getElementById('toggle-elem-steps');
  const toggleElemMistake = document.getElementById('toggle-elem-mistake');

  // ── Custom Post Image Controls Engine ────────────────────────────────────
  const contentImageUrlInput = document.getElementById('content-image-url');
  const contentImageFileInput = document.getElementById('content-image-file');
  const btnBrowseImage = document.getElementById('btn-browse-image');
  const btnClearImage = document.getElementById('btn-clear-image');
  const imagePositionSelect = document.getElementById('image-position-select');
  const imageHeightSlider = document.getElementById('image-height-slider');
  const toggleElemImage = document.getElementById('toggle-elem-image');

  if (btnBrowseImage && contentImageFileInput) {
    btnBrowseImage.addEventListener('click', () => contentImageFileInput.click());
    contentImageFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          if (contentImageUrlInput) {
            contentImageUrlInput.value = evt.target.result;
            updateCardPreview();
            showToast("🖼️ Loaded image onto post card!", "success");
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (btnClearImage && contentImageUrlInput) {
    btnClearImage.addEventListener('click', () => {
      contentImageUrlInput.value = '';
      if (contentImageFileInput) contentImageFileInput.value = '';
      updateCardPreview();
      showToast("Cleared post image.");
    });
  }

  const imageOffsetXSlider = document.getElementById('image-offset-x-slider');
  const imageOffsetYSlider = document.getElementById('image-offset-y-slider');

  [contentImageUrlInput, imagePositionSelect, imageHeightSlider, imageOffsetXSlider, imageOffsetYSlider, toggleElemImage].forEach(el => {
    if (el) {
      el.addEventListener('input', updateCardPreview);
      el.addEventListener('change', updateCardPreview);
    }
  });

  const alignBtns = document.querySelectorAll('#image-align-group .btn-img-align');
  alignBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      alignBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = 'var(--bg-tertiary)';
        b.style.color = 'var(--text-primary)';
        b.style.fontWeight = 'normal';
      });
      btn.classList.add('active');
      btn.style.background = 'var(--accent)';
      btn.style.color = '#000';
      btn.style.fontWeight = '800';
      updateCardPreview();
    });
  });

  if (toggleElemSymbol) {
    toggleElemSymbol.addEventListener('change', () => {
      const el = document.getElementById('card-symbol');
      if (el) el.style.display = toggleElemSymbol.checked ? 'inline-block' : 'none';
    });
  }

  const symbolQuickPicker = document.getElementById('symbol-quick-picker');
  if (symbolQuickPicker) {
    symbolQuickPicker.querySelectorAll('.symbol-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const contentSymbolInput = document.getElementById('content-symbol');
        if (contentSymbolInput) {
          contentSymbolInput.value = chip.textContent.trim();
          contentSymbolInput.dispatchEvent(new Event('input'));
          showToast(`Selected symbol: ${chip.textContent.trim()}`);
        }
      });
    });
  }

  if (toggleElemSoftware) {
    toggleElemSoftware.addEventListener('change', () => {
      const el = instagramCard ? instagramCard.querySelector('.software-badge') : null;
      if (el) el.style.display = toggleElemSoftware.checked ? 'inline-block' : 'none';
      saveCurrentDayData();
    });
  }

  if (toggleElemHandle) {
    toggleElemHandle.addEventListener('change', () => {
      const el = instagramCard ? instagramCard.querySelector('.creator-tag') : null;
      if (el) el.style.display = toggleElemHandle.checked ? 'flex' : 'none';
      saveCurrentDayData();
    });
  }

  if (toggleElemKeycap) {
    toggleElemKeycap.addEventListener('change', () => {
      const el = instagramCard ? instagramCard.querySelector('.keycap-container') : null;
      if (el) el.style.display = toggleElemKeycap.checked ? 'block' : 'none';
      saveCurrentDayData();
    });
  }

  if (toggleElemTitle) {
    toggleElemTitle.addEventListener('change', () => {
      const el = document.getElementById('card-action');
      if (el) el.style.display = toggleElemTitle.checked ? 'block' : 'none';
      saveCurrentDayData();
    });
  }

  if (toggleElemDesc) {
    toggleElemDesc.addEventListener('change', () => {
      const el = document.getElementById('card-desc');
      if (el) el.style.display = toggleElemDesc.checked ? 'block' : 'none';
      saveCurrentDayData();
    });
  }

  if (toggleElemSteps) {
    toggleElemSteps.addEventListener('change', () => {
      const el = document.getElementById('card-steps-list');
      if (el) el.style.display = toggleElemSteps.checked ? 'block' : 'none';
      saveCurrentDayData();
    });
  }

  if (toggleElemMistake) {
    toggleElemMistake.addEventListener('change', () => {
      const el = document.getElementById('card-common-mistake-box');
      if (el) el.style.display = toggleElemMistake.checked ? 'block' : 'none';
      saveCurrentDayData();
    });
  }

  // Declare first so buttons can reference the body
  const toggleElemVisibilitySettings = document.getElementById('toggle-elem-visibility-settings');
  const elemVisibilityBody = document.getElementById('elem-visibility-body');
  const arrowElemVisibility = document.getElementById('arrow-elem-visibility');

  if (toggleElemVisibilitySettings && elemVisibilityBody) {
    toggleElemVisibilitySettings.addEventListener('click', (e) => {
      // Don't toggle when clicking the Check All / None buttons inside the header
      if (e.target.closest('button')) return;
      const isHidden = elemVisibilityBody.style.display === 'none';
      elemVisibilityBody.style.display = isHidden ? 'grid' : 'none';
      if (arrowElemVisibility) arrowElemVisibility.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  }

  const btnCheckAllElems = document.getElementById('btn-check-all-elems');
  const btnUncheckAllElems = document.getElementById('btn-uncheck-all-elems');

  if (btnCheckAllElems && elemVisibilityBody) {
    btnCheckAllElems.addEventListener('click', (e) => {
      e.stopPropagation();
      elemVisibilityBody.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = true;
        cb.dispatchEvent(new Event('change'));
      });
      updateCardPreview();
      showToast("☑️ All elements shown!");
    });
  }

  if (btnUncheckAllElems && elemVisibilityBody) {
    btnUncheckAllElems.addEventListener('click', (e) => {
      e.stopPropagation();
      elemVisibilityBody.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
        cb.dispatchEvent(new Event('change'));
      });
      updateCardPreview();
      showToast("☐ All elements hidden!");
    });
  }

  // ── Typography & Text Sizes Controls Binding ───────────────────────────────
  const fontSizeTitle = document.getElementById('font-size-title');
  const fontSizeKeycap = document.getElementById('font-size-keycap');
  const fontSizeDesc = document.getElementById('font-size-desc');
  const fontSizeSteps = document.getElementById('font-size-steps');
  const fontSizeProtip = document.getElementById('font-size-protip');

  const valFontTitle = document.getElementById('val-font-title');
  const valFontKeycap = document.getElementById('val-font-keycap');
  const valFontDesc = document.getElementById('val-font-desc');
  const valFontSteps = document.getElementById('val-font-steps');
  const valFontProtip = document.getElementById('val-font-protip');

  if (fontSizeTitle) {
    fontSizeTitle.addEventListener('input', () => {
      if (valFontTitle) valFontTitle.textContent = fontSizeTitle.value;
      if (cardAction) cardAction.style.fontSize = `${fontSizeTitle.value}px`;
    });
  }

  if (fontSizeKeycap) {
    fontSizeKeycap.addEventListener('input', () => {
      if (valFontKeycap) valFontKeycap.textContent = fontSizeKeycap.value;
      const cardKeys = document.getElementById('card-keys');
      if (cardKeys) cardKeys.style.fontSize = `${fontSizeKeycap.value}px`;
    });
  }

  if (fontSizeDesc) {
    fontSizeDesc.addEventListener('input', () => {
      if (valFontDesc) valFontDesc.textContent = fontSizeDesc.value;
      const cardDesc = document.getElementById('card-desc');
      if (cardDesc) cardDesc.style.fontSize = `${fontSizeDesc.value}px`;
    });
  }

  if (fontSizeSteps) {
    fontSizeSteps.addEventListener('input', () => {
      if (valFontSteps) valFontSteps.textContent = fontSizeSteps.value;
      const cardStepsList = document.getElementById('card-steps-list');
      if (cardStepsList) cardStepsList.style.fontSize = `${fontSizeSteps.value}px`;
    });
  }

  if (fontSizeProtip) {
    fontSizeProtip.addEventListener('input', () => {
      if (valFontProtip) valFontProtip.textContent = fontSizeProtip.value;
      const cardProTipText = document.getElementById('card-pro-tip');
      if (cardProTipText) cardProTipText.style.fontSize = `${fontSizeProtip.value}px`;
    });
  }

  const toggleTypoSettings = document.getElementById('toggle-typo-settings');
  const typoSettingsBody = document.getElementById('typo-settings-body');
  const arrowTypoSettings = document.getElementById('arrow-typo-settings');

  if (toggleTypoSettings && typoSettingsBody) {
    toggleTypoSettings.addEventListener('click', () => {
      const isHidden = typoSettingsBody.style.display === 'none';
      typoSettingsBody.style.display = isHidden ? 'grid' : 'none';
      if (arrowTypoSettings) arrowTypoSettings.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  }

  // ── Custom Software Adder ──────────────────────────────────────────────────
  const btnAddSoftware = document.getElementById('btn-add-software');
  const contentSoftware = document.getElementById('content-software');

  function loadCustomSoftwares() {
    const customList = JSON.parse(localStorage.getItem('ludarp_custom_softwares')) || [];
    customList.forEach(swName => {
      if (contentSoftware && !contentSoftware.querySelector(`option[value="${swName}"]`)) {
        const opt = document.createElement('option');
        opt.value = swName;
        opt.textContent = swName;
        contentSoftware.appendChild(opt);
      }

      const dbFilterSoftware = document.getElementById('db-filter-software');
      if (dbFilterSoftware && !dbFilterSoftware.querySelector(`option[value="${swName}"]`)) {
        const opt = document.createElement('option');
        opt.value = swName;
        opt.textContent = swName;
        dbFilterSoftware.appendChild(opt);
      }
    });
  }

  if (btnAddSoftware && contentSoftware) {
    btnAddSoftware.addEventListener('click', () => {
      const newSoftware = prompt("Enter new software name (e.g. Rhino, STAAD Pro, Blender, Tekla, Archicad):");
      if (!newSoftware || !newSoftware.trim()) return;

      const swName = newSoftware.trim();
      const customList = JSON.parse(localStorage.getItem('ludarp_custom_softwares')) || [];

      if (!customList.includes(swName)) {
        customList.push(swName);
        localStorage.setItem('ludarp_custom_softwares', JSON.stringify(customList));
      }

      loadCustomSoftwares();
      contentSoftware.value = swName;
      contentSoftware.dispatchEvent(new Event('change'));

      showToast(`✅ Added "${swName}" to Software list!`, 'success');
    });
  }

  loadCustomSoftwares();

  // ── Script & JSON Exporters & Multi-ProTip Handler ───────────────────────
  function generateScriptTextFromItem(item) {
    let keys = item.keys || '';
    let action = item.action || item.title || '';
    const colonMatch = (item.title || '').match(/^([^:]+):\s*(.*)$/);
    if (colonMatch) {
      keys = keys || colonMatch[1].trim();
      action = colonMatch[2].trim();
    }

    const stepsList = (item.bullets && item.bullets.length > 0)
      ? item.bullets.map((b, i) => `${i + 1}. ${b}`).join('\n')
      : '1. Execute command on keyboard.';

    return `ID: ${item.id || ('AC-' + String(item.day || 1).padStart(3, '0'))}
Software: ${item.software || 'AutoCAD'}
Shortcut: ${keys}
Symbol: ${item.symbol || '⚡'}
Action: ${action}
Category: ${item.category || item.phase || 'General'}
Difficulty: ${item.difficulty || 'Everyone'}
Version: ${item.version || '2026'}
Description:
${item.desc || item.description || ''}
Steps:
${stepsList}
Pro Tip:
${item.proTip || ''}
Common Mistake:
${item.commonMistake || ''}
Hashtags:
${item.hashtags || '#autocad #civilengineering #ludarpcivil'}`;
  }

  function generateJsonFromItem(item) {
    return JSON.stringify(item, null, 2);
  }

  function getActiveEditorAsItem() {
    const sw = contentSoftware ? contentSoftware.value : 'AutoCAD';
    const keys = contentKeysInput ? contentKeysInput.value : '';
    const symbolVal = document.getElementById('content-symbol') ? document.getElementById('content-symbol').value : '';
    const action = contentActionInput ? contentActionInput.value : '';
    const desc = contentDescInput ? contentDescInput.value : '';
    const proTip = contentProTipInput ? contentProTipInput.value : '';
    const mistake = document.getElementById('content-common-mistake') ? document.getElementById('content-common-mistake').value : '';
    const hashtags = document.getElementById('content-hashtags') ? document.getElementById('content-hashtags').value : '';
    const difficulty = document.getElementById('content-difficulty') ? document.getElementById('content-difficulty').value : 'Beginner';
    const category = document.getElementById('content-category') ? document.getElementById('content-category').value : 'Drawing';

    const bullets = Array.from(getStepInputs()).map(inp => inp.value.trim()).filter(val => val !== '');

    const activeItem = calendarDb.find(i => Number(i.day) === Number(activeCalendarDayNum)) || {};

    return {
      id: activeItem.id || `AC-${String(activeCalendarDayNum).padStart(3, '0')}`,
      day: activeCalendarDayNum,
      software: sw,
      keys: keys,
      symbol: symbolVal,
      action: action,
      title: keys ? `${keys}: ${action}` : action,
      category: category,
      difficulty: difficulty,
      desc: desc,
      bullets: bullets,
      proTip: proTip,
      commonMistake: mistake,
      hashtags: hashtags,
      format: currentFormat || 'post'
    };
  }

  const btnCopyScript = document.getElementById('btn-copy-script');
  const btnCopyJson = document.getElementById('btn-copy-json');

  if (btnCopyScript) {
    btnCopyScript.addEventListener('click', () => {
      const item = getActiveEditorAsItem();
      const scriptText = generateScriptTextFromItem(item);
      navigator.clipboard.writeText(scriptText).then(() => {
        showToast("📜 Formatted Text Script copied to clipboard!", "success");
      });
    });
  }

  if (btnCopyJson) {
    btnCopyJson.addEventListener('click', () => {
      const item = getActiveEditorAsItem();
      const jsonText = generateJsonFromItem(item);
      navigator.clipboard.writeText(jsonText).then(() => {
        showToast("📦 Clean JSON Payload copied to clipboard!", "success");
      });
    });
  }

  const btnAddExtraProtip = document.getElementById('btn-add-extra-protip');
  if (btnAddExtraProtip && contentProTipInput) {
    btnAddExtraProtip.addEventListener('click', () => {
      const existing = contentProTipInput.value.trim();
      if (existing) {
        contentProTipInput.value = existing + '\n💡 Pro Tip: ';
      } else {
        contentProTipInput.value = '💡 Pro Tip 1: \n💡 Pro Tip 2: ';
      }
      contentProTipInput.focus();
      contentProTipInput.dispatchEvent(new Event('input'));
      showToast("💡 Added extra Pro Tip line!");
    });
  }

  // ── Live Script Code Editor Toggle & Bi-directional Sync Engine ──────────
  const toggleLiveScriptSettings = document.getElementById('toggle-live-script-settings');
  const liveScriptBody = document.getElementById('live-script-body');
  const arrowLiveScript = document.getElementById('arrow-live-script');
  const liveScriptInput = document.getElementById('live-script-editor-input');
  const btnSyncScriptToForm = document.getElementById('btn-sync-script-to-form');

  window.refreshLiveScriptEditor = function() {
    if (liveScriptBody && liveScriptBody.style.display !== 'none' && liveScriptInput && document.activeElement !== liveScriptInput) {
      const activeItem = getActiveEditorAsItem();
      liveScriptInput.value = generateScriptTextFromItem(activeItem);
    }
  };

  if (toggleLiveScriptSettings && liveScriptBody) {
    toggleLiveScriptSettings.addEventListener('click', () => {
      const isHidden = liveScriptBody.style.display === 'none';
      liveScriptBody.style.display = isHidden ? 'block' : 'none';
      if (arrowLiveScript) arrowLiveScript.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
      if (isHidden) {
        window.refreshLiveScriptEditor();
        setTimeout(() => {
          liveScriptBody.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      }
    });
  }

  function setStepValues(bullets) {
    const stepsContainer = document.getElementById('steps-container');
    if (!stepsContainer) return;
    stepsContainer.innerHTML = '';
    const listMarkerSelect = document.getElementById('list-marker-style');
    const markerStyle = listMarkerSelect ? listMarkerSelect.value : 'number';

    const itemsToRender = (bullets && bullets.length > 0) ? bullets : ['Step 1: Execute command on keyboard', 'Step 2: Pick selection boundary', 'Step 3: Press Enter to execute'];

    itemsToRender.forEach((bulletText, index) => {
      const markerSymbol = getMarkerSymbol(markerStyle, index);
      const row = document.createElement('div');
      row.className = 'step-input-row';
      row.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 8px;';
      row.innerHTML = `
        <span class="step-number" style="font-weight: 700; min-width: 15px; color: var(--accent-color);">${markerSymbol}</span>
        <input type="text" class="step-input" placeholder="Item ${index + 1}" value="${bulletText}" style="flex-grow: 1; padding: 8px 12px; background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-family: var(--font-ui); font-size: 0.85rem;">
        <button type="button" class="btn-remove-step" style="background: none; border: none; color: var(--error); cursor: pointer; font-size: 1.1rem; padding: 0 4px;">&times;</button>
      `;
      stepsContainer.appendChild(row);
      if (typeof bindStepRowEvents === 'function') bindStepRowEvents(row);
    });
  }

  function syncScriptTextToFormFields() {
    if (!liveScriptInput || !liveScriptInput.value.trim()) return;
    const rawText = liveScriptInput.value.trim();
    const parsed = parseRawTextToPosts(rawText);
    if (parsed.length > 0) {
      if (parsed.length > 1 || rawText.includes('---')) {
        setType('carousel', false);
      }

      // Upsert ALL parsed slides into calendarDb
      parsed.forEach(pItem => {
        const existingIdx = calendarDb.findIndex(i => (i.id && pItem.id && i.id === pItem.id) || (pItem.day && Number(i.day) === Number(pItem.day)));
        if (existingIdx >= 0) {
          calendarDb[existingIdx] = { ...calendarDb[existingIdx], ...pItem };
        } else {
          calendarDb.push(pItem);
        }
      });
      localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
      shortcutDb = calendarDb;

      // Render dynamic slide chips for all parsed slides in header
      const slideChipsContainer = document.getElementById('carousel-slide-chips');
      if (slideChipsContainer && parsed.length > 1) {
        slideChipsContainer.innerHTML = '';
        parsed.forEach((pItem, idx) => {
          const slideId = pItem.id || ('AC-003' + String.fromCharCode(65 + idx));
          const chip = document.createElement('button');
          chip.type = 'button';
          chip.className = `btn-slide-chip ${idx === 0 ? 'active' : ''}`;
          chip.setAttribute('data-slide', slideId.slice(-1));
          chip.setAttribute('data-slide-id', slideId);
          chip.textContent = `${slideId} (${pItem.keys || pItem.action || ('Slide ' + (idx + 1))})`;
          chip.style.cssText = `padding:4px 10px; font-size:0.75rem; font-weight:800; border-radius:6px; cursor:pointer; font-family:var(--font-mono); ${idx === 0 ? 'background:var(--accent); color:#000; border:none; box-shadow:0 0 10px rgba(56,189,248,0.4);' : 'background:var(--bg-tertiary); color:var(--text-primary); border:1px solid var(--border);'}`;

          chip.onclick = () => {
            if (pItem.day) activeCalendarDayNum = pItem.day;
            loadCalendarItemToEditor(pItem);
            slideChipsContainer.querySelectorAll('.btn-slide-chip').forEach(c => {
              const isActive = c === chip;
              c.classList.toggle('active', isActive);
              c.style.background = isActive ? 'var(--accent)' : 'var(--bg-tertiary)';
              c.style.color = isActive ? '#000' : 'var(--text-primary)';
              c.style.border = isActive ? 'none' : '1px solid var(--border)';
              c.style.boxShadow = isActive ? '0 0 10px rgba(56,189,248,0.4)' : 'none';
            });
          };
          slideChipsContainer.appendChild(chip);
        });
      }

      // Load Slide 1 into Editor
      const item = parsed[0];
      loadCalendarItemToEditor(item);

      if (typeof renderSidebarDaysList === 'function') renderSidebarDaysList();
      if (typeof renderDatabaseManagerTable === 'function') renderDatabaseManagerTable();
      saveAllDataToSyncFile();
    }
  }

  if (liveScriptInput) {
    ['input', 'change', 'paste'].forEach(evt => {
      liveScriptInput.addEventListener(evt, () => {
        setTimeout(syncScriptTextToFormFields, 50);
      });
    });
  }

  if (btnSyncScriptToForm) {
    btnSyncScriptToForm.addEventListener('click', (e) => {
      e.preventDefault();
      syncScriptTextToFormFields();
      showToast("✅ Form, Card & Database JSON updated!", "success");

      // Auto-push updated JSON payload to Google Sheet Cloud
      if (typeof window.pushPostsToGoogleSheet === 'function') {
        window.pushPostsToGoogleSheet(false);
      }
    });
  }

  // Overlay & Pattern Controls Initialization
  const overlayGridPattern = document.getElementById('overlay-grid-pattern');
  const overlayToggleCropmarks = document.getElementById('overlay-toggle-cropmarks');
  const overlayToggleUcs = document.getElementById('overlay-toggle-ucs');
  const overlayToggleVignette = document.getElementById('overlay-toggle-vignette');

  if (overlayGridPattern) {
    overlayGridPattern.addEventListener('change', () => {
      const bgGrid = instagramCard ? instagramCard.querySelector('.card-bg-grid') : null;
      if (bgGrid) {
        bgGrid.className = 'card-bg-grid'; // Reset classes
        if (overlayGridPattern.value !== 'square') {
          bgGrid.classList.add(`grid-${overlayGridPattern.value}`);
        }
      }
    });
  }

  if (overlayToggleCropmarks) {
    overlayToggleCropmarks.addEventListener('change', () => {
      const cropmarks = instagramCard ? instagramCard.querySelectorAll('.viewport-crosshair') : [];
      cropmarks.forEach(cm => cm.style.display = overlayToggleCropmarks.checked ? 'block' : 'none');
    });
  }

  if (overlayToggleUcs) {
    overlayToggleUcs.addEventListener('change', () => {
      const ucsIcon = document.getElementById('card-ucs-icon');
      if (ucsIcon) ucsIcon.style.display = overlayToggleUcs.checked ? 'block' : 'none';
    });
  }

  if (overlayToggleVignette) {
    overlayToggleVignette.addEventListener('change', () => {
      const vignette = document.getElementById('card-vignette');
      if (vignette) vignette.style.display = overlayToggleVignette.checked ? 'block' : 'none';
    });
  }

  // Layout Accordion Toggle
  const toggleLayoutSettings = document.getElementById('toggle-layout-settings');
  const layoutSettingsBody = document.getElementById('layout-settings-body');
  const arrowLayoutSettings = document.getElementById('arrow-layout-settings');
  if (toggleLayoutSettings && layoutSettingsBody && arrowLayoutSettings) {
    let isOpen = true;
    toggleLayoutSettings.addEventListener('click', () => {
      isOpen = !isOpen;
      layoutSettingsBody.style.display = isOpen ? 'grid' : 'none';
      arrowLayoutSettings.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(-90deg)';
    });
  }

  // Overlay Accordion Toggle
  const toggleOverlaySettings = document.getElementById('toggle-overlay-settings');
  const overlaySettingsBody = document.getElementById('overlay-settings-body');
  const arrowOverlaySettings = document.getElementById('arrow-overlay-settings');
  if (toggleOverlaySettings && overlaySettingsBody && arrowOverlaySettings) {
    let isOpen = true;
    toggleOverlaySettings.addEventListener('click', () => {
      isOpen = !isOpen;
      overlaySettingsBody.style.display = isOpen ? 'grid' : 'none';
      arrowOverlaySettings.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(-90deg)';
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// ==========================================================================
// 12. Database Manager Tab Engine
// ==========================================================================

const dbTableBody = document.getElementById('db-table-body');
const dbSearchInput = document.getElementById('db-search-input');
const dbFilterSoftware = document.getElementById('db-filter-software');
const dbBtnExportJson = document.getElementById('db-btn-export-json');
const dbBtnImportJson = document.getElementById('db-btn-import-json');
const dbFileImportInput = document.getElementById('db-file-import-input');
const dbBtnResetFactory = document.getElementById('db-btn-reset-factory');

const dbStatCalendarCount = document.getElementById('db-stat-calendar-count');
const dbStatPostedCount = document.getElementById('db-stat-posted-count');
const dbStatShortcutsCount = document.getElementById('db-stat-shortcuts-count');
const dbStatSyncStatus = document.getElementById('db-stat-sync-status');

function renderDatabaseManagerTable() {
  const tableBody = document.getElementById('db-table-body');
  const statCal = document.getElementById('db-stat-calendar-count');
  const statPosted = document.getElementById('db-stat-posted-count');
  const statShortcuts = document.getElementById('db-stat-shortcuts-count');
  const statSync = document.getElementById('db-stat-sync-status');
  const searchInput = document.getElementById('db-search-input');
  const filterSoft = document.getElementById('db-filter-software');

  // Stats update
  const totalCal = Array.isArray(calendarDb) ? calendarDb.length : 0;
  const postedCal = Array.isArray(calendarDb) ? calendarDb.filter(item => completedCalendarDays.has(String(item.day))).length : 0;
  const totalShortcuts = Array.isArray(shortcutDb) ? shortcutDb.length : 0;

  if (statCal) statCal.textContent = totalCal;
  if (statPosted) statPosted.textContent = `${postedCal} / ${totalCal}`;
  if (statShortcuts) statShortcuts.textContent = totalShortcuts;
  if (statSync) statSync.textContent = fileHandle ? fileHandle.name : 'Local Sandbox';

  if (!tableBody) return;

  const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const softwareFilter = filterSoft ? filterSoft.value : 'all';

  tableBody.innerHTML = '';

  const filtered = (Array.isArray(calendarDb) ? calendarDb : []).filter(item => {
    const matchesSoftware = softwareFilter === 'all' || (item.software || 'AutoCAD') === softwareFilter;
    const itemText = `${item.day || ''} ${item.title || item.action || ''} ${item.keys || ''} ${item.software || ''} ${item.phase || ''} ${item.desc || ''}`.toLowerCase();
    const matchesSearch = !searchVal || itemText.includes(searchVal);
    return matchesSoftware && matchesSearch;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding:32px; color:var(--text-muted);">
          No database entries found matching filters.
        </td>
      </tr>
    `;
    return;
  }

  filtered.forEach(item => {
    const isCompleted = completedCalendarDays.has(String(item.day));
    const tr = document.createElement('tr');
    tr.style.cssText = 'border-bottom:1px solid var(--border); transition:0.15s background;';

    // Parse keys and title safely
    let keys = item.keys || 'CAD';
    let action = item.title || item.action || 'Untitled Post';
    if (typeof item.title === 'string') {
      const colonMatch = item.title.match(/^([^:]+):\s*(.*)$/);
      if (colonMatch) {
        keys = colonMatch[1].trim();
        action = colonMatch[2].trim();
      }
    }

    tr.innerHTML = `
      <td style="padding:10px 16px; font-family:var(--font-mono); font-weight:700; color:var(--accent);">Lesson ${item.day || '-'}</td>
      <td style="padding:10px 16px; font-weight:700;">${item.software || 'AutoCAD'}</td>
      <td style="padding:10px 16px;">
        <span style="font-family:var(--font-mono); font-weight:800; color:var(--text-primary); background:var(--bg-tertiary); padding:2px 6px; border-radius:4px; border:1px solid var(--border);">${keys}</span>
        <span style="margin-left:6px; color:var(--text-secondary); font-weight:600;">${action}</span>
      </td>
      <td style="padding:10px 16px; font-size:0.75rem; text-transform:capitalize;">
        ${item.format === 'carousel' ? '🎠 Carousel' : item.format === 'reel' ? '🎥 Reel' : '🖼️ Post'}
      </td>
      <td style="padding:10px 16px; font-size:0.72rem; color:var(--text-muted); text-transform:uppercase;">${item.phase || ''}</td>
      <td style="padding:10px 16px;">
        <span style="font-size:0.72rem; padding:3px 8px; border-radius:12px; font-weight:800; ${isCompleted ? 'background:var(--success-dim); color:var(--success);' : 'background:rgba(255,255,255,0.06); color:var(--text-muted);'}">
          ${isCompleted ? 'Posted ✓' : 'Pending'}
        </span>
      </td>
      <td style="padding:10px 16px; text-align:right;">
        <div style="display:inline-flex; gap:6px;">
          <button class="db-btn-sm btn-action btn-primary-action" data-action="load" data-day="${item.day}">Load</button>
          <button class="db-btn-sm btn-action btn-secondary-action" data-action="toggle" data-day="${item.day}">${isCompleted ? 'Undo' : 'Mark Done'}</button>
          <button class="db-btn-sm btn-action btn-ghost-action" data-action="copy-script" data-day="${item.day}" title="Copy Text Script">📜 Script</button>
          <button class="db-btn-sm btn-action btn-ghost-action" data-action="copy-json" data-day="${item.day}" title="Copy JSON Payload">📦 JSON</button>
          <button class="db-btn-sm btn-action btn-ghost-action" data-action="delete" data-day="${item.day}" style="color:var(--error);">Delete</button>
        </div>
      </td>
    `;

    // Bind row button events
    const loadBtn = tr.querySelector('[data-action="load"]');
    if (loadBtn) {
      loadBtn.onclick = () => {
        activeCalendarDayNum = item.day;
        loadCalendarItemToEditor(item);
        if (typeof switchTab === 'function') switchTab('studio');
        showToast(`Loaded Lesson ${item.day}: "${action}" into Creator Studio!`);
      };
    }

    const scriptBtn = tr.querySelector('[data-action="copy-script"]');
    if (scriptBtn) {
      scriptBtn.onclick = () => {
        const scriptText = generateScriptTextFromItem(item);
        navigator.clipboard.writeText(scriptText).then(() => {
          showToast(`📜 Lesson ${item.day} Text Script copied!`, 'success');
        });
      };
    }

    const jsonBtn = tr.querySelector('[data-action="copy-json"]');
    if (jsonBtn) {
      jsonBtn.onclick = () => {
        const jsonText = generateJsonFromItem(item);
        navigator.clipboard.writeText(jsonText).then(() => {
          showToast(`📦 Lesson ${item.day} JSON copied!`, 'success');
        });
      };
    }

    const toggleBtn = tr.querySelector('[data-action="toggle"]');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        const dayStr = String(item.day);
        if (completedCalendarDays.has(dayStr)) {
          completedCalendarDays.delete(dayStr);
          showToast(`Lesson ${dayStr} marked as Pending.`);
        } else {
          completedCalendarDays.add(dayStr);
          showToast(`✅ Lesson ${dayStr} marked as Posted!`, 'success');
        }
        localStorage.setItem('ludarp_completed_calendar', JSON.stringify(Array.from(completedCalendarDays)));
        updateCalendarProgress();
        renderSidebarDaysList();
        renderDatabaseManagerTable();
        saveAllDataToSyncFile();
      };
    }

    const delBtn = tr.querySelector('[data-action="delete"]');
    if (delBtn) {
      delBtn.onclick = () => {
        if (confirm(`Are you sure you want to delete Lesson ${item.day}: "${item.title}"?`)) {
          calendarDb = calendarDb.filter(d => String(d.day) !== String(item.day));
          localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
          renderSidebarDaysList();
          renderDatabaseManagerTable();
          saveAllDataToSyncFile();
          showToast(`Deleted Lesson ${item.day} from database.`, 'info');
        }
      };
    }

    tableBody.appendChild(tr);
  });
}

// Search & Filter Listeners for Database Manager
if (dbSearchInput) dbSearchInput.addEventListener('input', renderDatabaseManagerTable);
if (dbFilterSoftware) dbFilterSoftware.addEventListener('change', renderDatabaseManagerTable);

// Export JSON
if (dbBtnExportJson) {
  dbBtnExportJson.addEventListener('click', () => {
    const payload = {
      appName: "CivilCut Creator Studio",
      version: "2.0.0",
      updatedAt: new Date().toISOString().split('T')[0],
      shortcuts: shortcutDb,
      calendar: calendarDb,
      completed: Array.from(completedCalendarDays)
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "database.json";
    link.click();
    showToast("Downloaded master database.json!");
  });
}

// Import JSON
if (dbBtnImportJson && dbFileImportInput) {
  dbBtnImportJson.addEventListener('click', () => dbFileImportInput.click());
  dbFileImportInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (data.calendar && Array.isArray(data.calendar)) {
          calendarDb = data.calendar;
        } else if (data.shortcuts && Array.isArray(data.shortcuts)) {
          calendarDb = data.shortcuts;
        }
        shortcutDb = calendarDb;
        localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
        localStorage.setItem('ludarp_shortcuts', JSON.stringify(calendarDb));
        if (data.completed && Array.isArray(data.completed)) {
          completedCalendarDays = new Set(data.completed.map(String));
          localStorage.setItem('ludarp_completed_calendar', JSON.stringify([...completedCalendarDays]));
        }
        renderSidebarDaysList();
        renderDatabaseManagerTable();
        saveAllDataToSyncFile();
        showToast("Database imported & synced successfully!", "success");
      } catch (err) {
        showToast("Error parsing JSON file.", "error");
      }
    };
    reader.readAsText(file);
  });
}

// Reset Factory DB
if (dbBtnResetFactory) {
  dbBtnResetFactory.addEventListener('click', () => {
    if (confirm("Reset database back to original factory 84-item AutoCAD schedule?")) {
      if (typeof autocadCalendar !== 'undefined') {
        calendarDb = JSON.parse(JSON.stringify(autocadCalendar));
        localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
        renderSidebarDaysList();
        renderDatabaseManagerTable();
        saveAllDataToSyncFile();
        showToast("Restored factory database!", "success");
      }
    }
  });
}

// ==========================================================================
// 13. Duplicate / Clone Entry Engine
// ==========================================================================
function duplicateCurrentCalendarItem() {
  const currentItem = calendarDb.find(item => Number(item.day) === Number(activeCalendarDayNum));
  const maxDay = calendarDb.reduce((max, item) => Math.max(max, Number(item.day) || 0), 0);
  const newDay = maxDay + 1;
  
  const newItem = {
    day: newDay,
    title: currentItem ? `${currentItem.title} (Copy)` : `New Shortcut Entry`,
    software: currentItem ? currentItem.software : (contentSoftwareSelect ? contentSoftwareSelect.value : 'AutoCAD'),
    format: currentItem ? currentItem.format : 'post',
    phase: currentItem ? currentItem.phase : 'basics',
    creatorHandle: currentItem ? currentItem.creatorHandle : 'ludarp.civil',
    hashtags: currentItem ? currentItem.hashtags : '#autocad #civilengineering #drafting',
    proTip: currentItem ? currentItem.proTip : 'Save for later!',
    bullets: ['Step 1: Enter command key on keyboard', 'Step 2: Pick selection boundary', 'Step 3: Press Enter to execute']
  };
  
  calendarDb.push(newItem);
  localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
  activeCalendarDayNum = newDay;
  
  updateCalendarProgress();
  renderSidebarDaysList();
  loadCalendarItemToEditor(newItem);
  saveAllDataToSyncFile();
  
  showToast(`📋 Duplicated as Day ${newDay}!`, 'success');
}

const btnDuplicateCard = document.getElementById('btn-duplicate-card');
if (btnDuplicateCard) {
  btnDuplicateCard.addEventListener('click', duplicateCurrentCalendarItem);
}

// ==========================================================================
// 14. Instagram 3-Column Profile Feed Grid Engine
// ==========================================================================
const feedGridContainer = document.getElementById('feed-grid-container');
const feedFilterSoftware = document.getElementById('feed-filter-software');
const feedSortBy = document.getElementById('feed-sort-by');

function renderInstagramFeedGrid() {
  if (!feedGridContainer) return;
  
  const filterSw = feedFilterSoftware ? feedFilterSoftware.value : 'all';
  const sortBy = feedSortBy ? feedSortBy.value : 'day';
  
  let items = calendarDb.filter(item => filterSw === 'all' || (item.software || 'AutoCAD') === filterSw);
  
  if (sortBy === 'saves') {
    items = [...items].sort((a, b) => (Number(b.saves) || 0) - (Number(a.saves) || 0));
  } else if (sortBy === 'likes') {
    items = [...items].sort((a, b) => (Number(b.likes) || 0) - (Number(a.likes) || 0));
  } else {
    items = [...items].sort((a, b) => Number(a.day) - Number(b.day));
  }
  
  feedGridContainer.innerHTML = '';
  
  if (items.length === 0) {
    feedGridContainer.innerHTML = `<div style="grid-column:span 3; text-align:center; padding:48px; color:var(--text-muted);">No feed items found.</div>`;
    return;
  }
  
  items.forEach(item => {
    const isCompleted = completedCalendarDays.has(String(item.day));
    
    // Parse keys and action
    let keys = item.keys || 'CAD';
    let action = item.title;
    const colonMatch = item.title.match(/^([^:]+):\s*(.*)$/);
    if (colonMatch) {
      keys = colonMatch[1].trim();
      action = colonMatch[2].trim();
    }
    
    const cardEl = document.createElement('div');
    cardEl.className = 'feed-card-item';
    cardEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; z-index:2;">
        <span class="status-pill ${isCompleted ? 'status-posted' : 'status-scheduled'}">${isCompleted ? 'Posted ✓' : 'Day ' + item.day}</span>
        <span style="font-size:0.65rem; font-weight:800; text-transform:uppercase; color:var(--accent);">${item.software || 'AutoCAD'}</span>
      </div>
      
      <div style="text-align:center; margin:auto 0; z-index:2;">
        <div style="font-family:var(--font-mono); font-size:1.4rem; font-weight:900; color:var(--accent); letter-spacing:1px; margin-bottom:4px;">${keys}</div>
        <div style="font-size:0.82rem; font-weight:700; color:var(--text-primary); line-height:1.2; max-width:90%; margin:0 auto; font-family:'Chakra Petch', sans-serif;">${action}</div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.68rem; color:var(--text-muted); z-index:2;">
        <span>💾 ${item.saves || 0}</span>
        <span>❤️ ${item.likes || 0}</span>
      </div>

      <div class="feed-card-overlay">
        <h4 style="font-size:0.95rem; font-weight:800; color:#fff;">Day ${item.day}: ${action}</h4>
        <p style="font-size:0.75rem; color:rgba(255,255,255,0.7); max-width:85%;">${item.proTip || 'Pro Tip Available'}</p>
        <button class="btn-action btn-primary-action" style="font-size:0.75rem; padding:6px 14px; margin-top:6px;">Load in Studio</button>
      </div>
    `;
    
    cardEl.onclick = () => {
      activeCalendarDayNum = item.day;
      loadCalendarItemToEditor(item);
      document.querySelector('.nav-btn[data-tab="studio"]').click();
      showToast(`Loaded Day ${item.day}: "${action}" into Studio!`);
    };
    
    feedGridContainer.appendChild(cardEl);
  });
}

if (feedFilterSoftware) feedFilterSoftware.addEventListener('change', renderInstagramFeedGrid);
if (feedSortBy) feedSortBy.addEventListener('change', renderInstagramFeedGrid);

// Bind Date, Saves, and Likes input changes to active calendar item
['content-date', 'content-saves', 'content-likes'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('change', () => {
      const activeItem = calendarDb.find(i => Number(i.day) === Number(activeCalendarDayNum));
      if (activeItem) {
        if (id === 'content-date') activeItem.scheduledDate = el.value;
        if (id === 'content-saves') activeItem.saves = Number(el.value) || 0;
        if (id === 'content-likes') activeItem.likes = Number(el.value) || 0;
        localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
        saveAllDataToSyncFile();
      }
    });
  }
});

// ==========================================================================
// 15. Global Application Keyboard Shortcuts (Hotkeys)
// ==========================================================================
document.addEventListener('keydown', (e) => {
  const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
  if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
    if (e.key === 'Escape') document.activeElement.blur();
    return;
  }
  
  // Ctrl+S or Cmd+S -> Quick Save / Sync
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    saveAllDataToSyncFile();
    showToast("💾 Disk Sync file saved!", "success");
  }
  
  // Ctrl+D or Cmd+D -> Duplicate active entry
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
    e.preventDefault();
    duplicateCurrentCalendarItem();
  }
  
  // Ctrl+E or Cmd+E -> Export Image
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
    e.preventDefault();
    const btnExport = document.getElementById('btn-export-image');
    if (btnExport) btnExport.click();
  }
  
  // Arrow Left -> Previous Day
  if (e.key === 'ArrowLeft') {
    const btnPrev = document.getElementById('btn-prev');
    if (btnPrev) btnPrev.click();
  }
  
  // Arrow Right -> Next Day
  if (e.key === 'ArrowRight') {
    const btnNext = document.getElementById('btn-next');
    if (btnNext) btnNext.click();
  }
});

// ==========================================================================
// 16. Bulk Content Importer Studio Engine
// ==========================================================================
const importerTextInput = document.getElementById('importer-text-input');
const btnImporterLoadExample = document.getElementById('btn-importer-load-example');
const btnImporterParse = document.getElementById('btn-importer-parse');
const btnImporterParseBottom = document.getElementById('btn-importer-parse-bottom');
const btnImporterClear = document.getElementById('btn-importer-clear');
const btnImporterSaveAll = document.getElementById('btn-importer-save-all');

const importerEmptyState = document.getElementById('importer-empty-state');
const importerParsedList = document.getElementById('importer-parsed-list');
const importerParsedCount = document.getElementById('importer-parsed-count');

let currentParsedPosts = [];

// Format skeleton only — no content. User provides their own posts.
const EXAMPLE_POST_TEXT = `ID: AC-001
Software: AutoCAD
Shortcut: 
Action: 
Category: Drawing
Difficulty: Beginner
Version: AutoCAD 2025
Description: 
Steps:
1. 
2. 
3. 
Pro Tip: 
Common Mistake: 
Related Commands: 
Hashtags: #autocad`;

if (btnImporterLoadExample) {
  btnImporterLoadExample.addEventListener('click', () => {
    if (importerTextInput) {
      importerTextInput.value = EXAMPLE_POST_TEXT;
      showToast("📋 Loaded example format! Click 'Parse & Build Posts'.");
      parseAndRenderBulkPosts();
    }
  });
}

if (btnImporterClear) {
  btnImporterClear.addEventListener('click', () => {
    if (importerTextInput) importerTextInput.value = '';
    currentParsedPosts = [];
    renderParsedPostsList();
  });
}

function parseRawTextToPosts(rawText) {
  if (!rawText || !rawText.trim()) return [];
  let blocks = rawText.split(/---+/);

  // Auto-split multi-post blocks if '---' separators are omitted (ONLY split on ID:)
  if (blocks.length === 1 && (rawText.match(/(?:^|\n)ID:\s*/gi) || []).length > 1) {
    blocks = rawText.split(/(?=(?:^|\n)ID:\s*)/i);
  }

  const parsed = [];

  blocks.forEach((block, idx) => {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length === 0) return;

    let sw = 'Ludarp Civil Studio';
    let shortcut = '';
    let symbolVal = '⚡';
    let action = '';
    let descLines = [];
    let steps = [];
    let protipLines = [];
    let mistakeLines = [];
    let category = 'Introduction';
    let difficulty = 'Everyone';
    let relatedCommands = [];
    let version = '2026';
    let hashtagLines = [];
    let customId = '';

    let currentField = '';

    lines.forEach(line => {
      // Field Header Detectors
      if (/^id:/i.test(line)) {
        currentField = 'id';
        const val = line.replace(/^id:\s*/i, '').trim();
        if (val) customId = val;
      } else if (/^software:/i.test(line)) {
        currentField = 'software';
        const val = line.replace(/^software:\s*/i, '').trim();
        if (val) sw = val;
      } else if (/^shortcut:/i.test(line)) {
        currentField = 'shortcut';
        const val = line.replace(/^shortcut:\s*/i, '').trim();
        if (val) shortcut = val;
      } else if (/^symbol:/i.test(line) || /^icon:/i.test(line)) {
        currentField = 'symbol';
        const val = line.replace(/^(?:symbol|icon):\s*/i, '').trim();
        if (val) symbolVal = val;
      } else if (/^action:/i.test(line)) {
        currentField = 'action';
        const val = line.replace(/^action:\s*/i, '').trim();
        if (val) action = val;
      } else if (/^category:/i.test(line)) {
        currentField = 'category';
        const val = line.replace(/^category:\s*/i, '').trim();
        if (val) category = val;
      } else if (/^difficulty:/i.test(line)) {
        currentField = 'difficulty';
        const val = line.replace(/^difficulty:\s*/i, '').trim();
        if (val) difficulty = val;
      } else if (/^version:/i.test(line)) {
        currentField = 'version';
        const val = line.replace(/^version:\s*/i, '').trim();
        if (val) version = val;
      } else if (/^description:/i.test(line) || /^desc:/i.test(line)) {
        currentField = 'description';
        const val = line.replace(/^(?:description|desc):\s*/i, '').trim();
        if (val) descLines.push(val);
      } else if (/^steps:/i.test(line)) {
        currentField = 'steps';
        const val = line.replace(/^steps:\s*/i, '').trim();
        if (val) {
          const cleanStep = val.replace(/^\d+[\.\)]\s*/, '').trim();
          if (cleanStep) steps.push(cleanStep);
        }
      } else if (/^pro\s*tip:/i.test(line) || /^protip:/i.test(line)) {
        currentField = 'protip';
        const val = line.replace(/^(?:pro\s*tip|protip):\s*/i, '').trim();
        if (val) protipLines.push(val);
      } else if (/^common\s*mistake:/i.test(line) || /^mistake:/i.test(line)) {
        currentField = 'commonMistake';
        const val = line.replace(/^(?:common\s*mistake|mistake):\s*/i, '').trim();
        if (val) mistakeLines.push(val);
      } else if (/^related\s*commands:/i.test(line) || /^related:/i.test(line)) {
        currentField = 'related';
        const val = line.replace(/^(?:related\s*commands|related):\s*/i, '').trim();
        if (val) {
          val.split(/[\n,]/).forEach(s => {
            const clean = s.trim();
            if (clean) relatedCommands.push(clean);
          });
        }
      } else if (/^hashtags:/i.test(line)) {
        currentField = 'hashtags';
        const val = line.replace(/^hashtags:\s*/i, '').trim();
        if (val) hashtagLines.push(val);
      } else {
        // Line continuations for multi-line headers
        if (currentField === 'software' && !sw) {
          sw = line;
        } else if (currentField === 'shortcut' && !shortcut) {
          shortcut = line;
        } else if (currentField === 'symbol') {
          symbolVal = line;
        } else if (currentField === 'action' && !action) {
          action = line;
        } else if (currentField === 'description') {
          descLines.push(line);
        } else if (currentField === 'steps') {
          const cleanStep = line.replace(/^\d+[\.\)]\s*/, '').trim();
          if (cleanStep) steps.push(cleanStep);
        } else if (currentField === 'protip') {
          protipLines.push(line);
        } else if (currentField === 'commonMistake') {
          mistakeLines.push(line);
        } else if (currentField === 'related') {
          if (line) relatedCommands.push(line);
        } else if (currentField === 'hashtags') {
          if (line) hashtagLines.push(line);
        }
      }
    });

    const desc = descLines.join(' ');
    const protip = protipLines.join(' ');
    const commonMistake = mistakeLines.join(' ');
    const hashtags = hashtagLines.join(' ');

    // Auto-generate Carousel ID if omitted in script text (e.g. AC-003A, AC-003B, AC-003C...)
    const carouselIdInput = document.getElementById('content-carousel-id');
    let baseId = (carouselIdInput && carouselIdInput.value && typeof carouselIdInput.value === 'string' && carouselIdInput.value.trim()) ? carouselIdInput.value.trim().toUpperCase() : '';
    const match = baseId.match(/^(.*?)([A-Z])$/);
    if (match && match[1].length >= 2) {
      baseId = match[1];
    }
    if (!baseId) baseId = 'AC-003';

    let autoAssignedId = customId;
    if (!autoAssignedId) {
      if (blocks.length > 1) {
        autoAssignedId = `${baseId}${String.fromCharCode(65 + idx)}`;
      } else {
        autoAssignedId = `${baseId}A`;
      }
    }

    if (action || shortcut || desc || sw) {
      parsed.push({
        id: autoAssignedId,
        software: sw || 'Ludarp Civil Studio',
        keys: shortcut || 'START',
        symbol: symbolVal || '',
        action: action || 'Shortcut Action',
        title: shortcut ? `${shortcut}: ${action}` : action,
        category: category || 'Introduction',
        difficulty: difficulty || 'Everyone',
        desc: desc || 'Description goes here.',
        bullets: steps.length > 0 ? steps : ['Step 1: Execute command on keyboard'],
        proTip: protip || '',
        commonMistake: commonMistake || '',
        relatedCommands: relatedCommands,
        version: version || '2026',
        hashtags: hashtags || '#autocad #civilengineering #ludarpcivil',
        format: 'post',
        markerStyle: 'number',
        creatorHandle: 'ludarp.civil'
      });
    }
  });

  return parsed;
}

function parseAndRenderBulkPosts() {
  const text = importerTextInput ? importerTextInput.value : '';
  currentParsedPosts = parseRawTextToPosts(text);
  renderParsedPostsList();
}

function renderParsedPostsList() {
  if (!importerParsedList || !importerEmptyState) return;

  importerParsedList.innerHTML = '';
  if (importerParsedCount) importerParsedCount.textContent = currentParsedPosts.length;

  if (currentParsedPosts.length === 0) {
    importerEmptyState.style.display = 'block';
    if (btnImporterSaveAll) btnImporterSaveAll.style.display = 'none';
    return;
  }

  importerEmptyState.style.display = 'none';
  if (btnImporterSaveAll) btnImporterSaveAll.style.display = 'block';

  currentParsedPosts.forEach((post, index) => {
    const cardEl = document.createElement('div');
    cardEl.style.cssText = 'padding:14px; background:var(--bg-tertiary); border:1px solid var(--border); border-radius:var(--r-md); display:flex; flex-direction:column; gap:8px;';

    const stepsListHtml = post.bullets.map((st, i) => `<li style="margin-left:16px;">${st}</li>`).join('');

    cardEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-family:var(--font-mono); font-weight:800; color:var(--accent); background:var(--bg-secondary); padding:2px 8px; border-radius:4px; border:1px solid var(--border);">${post.keys}</span>
          <strong style="font-size:0.9rem; color:var(--text-primary);">${post.action}</strong>
        </div>
        <span style="font-size:0.7rem; font-weight:800; color:var(--text-muted); text-transform:uppercase;">${post.software}</span>
      </div>

      <p style="font-size:0.8rem; color:var(--text-secondary); margin:0;">${post.desc}</p>

      <ol style="font-size:0.75rem; color:var(--text-muted); padding-left:14px; margin:4px 0;">
        ${stepsListHtml}
      </ol>

      <div style="font-size:0.75rem; color:var(--warning); font-weight:700;">💡 Pro Tip: ${post.proTip}</div>

      <div style="display:flex; gap:8px; margin-top:6px; justify-content:flex-end;">
        <button class="btn-action btn-primary-action" style="padding:4px 10px; font-size:0.75rem;" data-action="load-studio">Load in Creator Studio</button>
        <button class="btn-action btn-secondary-action" style="padding:4px 10px; font-size:0.75rem;" data-action="add-db">+ Add to Calendar DB</button>
      </div>
    `;

    cardEl.querySelector('[data-action="load-studio"]').onclick = () => {
      loadCalendarItemToEditor(post);
      document.querySelector('.nav-btn[data-tab="studio"]').click();
      showToast(`Loaded "${post.action}" into Creator Studio!`);
    };

    cardEl.querySelector('[data-action="add-db"]').onclick = () => {
      const isDuplicate = calendarDb.some(item => {
        const itemKey = (item.shortcut || item.keys || '').toLowerCase().trim();
        const postKey = (post.shortcut || post.keys || '').toLowerCase().trim();
        const itemAct = (item.action || '').toLowerCase().trim();
        const postAct = (post.action || '').toLowerCase().trim();
        return (itemKey && itemKey === postKey) || (itemAct && itemAct === postAct);
      });

      if (isDuplicate) {
        const confirmAdd = confirm(
          `⚠️ Duplicate Command Warning:\n\nCommand "${post.shortcut || post.keys}: ${post.action}" already exists in your database.\n\nDo you want to add this duplicate anyway?`
        );
        if (!confirmAdd) {
          showToast('ℹ️ Cancelled adding duplicate command.', 'info');
          return;
        }
      }

      const maxDay = calendarDb.reduce((max, item) => Math.max(max, Number(item.day) || 0), 0);
      post.day = maxDay + 1;
      calendarDb.push(post);
      localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
      updateCalendarProgress();
      renderSidebarDaysList();
      renderDatabaseManagerTable();
      saveAllDataToSyncFile();
      updateUnsyncedBanner(1);
      showToast(`✅ Added Day ${post.day}: "${post.action}" to Database!`, 'success');
    };

    importerParsedList.appendChild(cardEl);
  });
}

if (btnImporterParse) btnImporterParse.addEventListener('click', parseAndRenderBulkPosts);
if (btnImporterParseBottom) btnImporterParseBottom.addEventListener('click', parseAndRenderBulkPosts);

if (btnImporterSaveAll) {
  btnImporterSaveAll.addEventListener('click', () => {
    if (currentParsedPosts.length === 0) return;

    const duplicates = [];
    const uniquePosts = [];

    currentParsedPosts.forEach(post => {
      const isDup = calendarDb.some(item => {
        const itemKey = (item.shortcut || item.keys || '').toLowerCase().trim();
        const postKey = (post.shortcut || post.keys || '').toLowerCase().trim();
        const itemAct = (item.action || '').toLowerCase().trim();
        const postAct = (post.action || '').toLowerCase().trim();
        return (itemKey && itemKey === postKey) || (itemAct && itemAct === postAct);
      });

      if (isDup) {
        duplicates.push(post);
      } else {
        uniquePosts.push(post);
      }
    });

    let postsToAdd = [];

    if (duplicates.length > 0) {
      const dupSummary = duplicates.slice(0, 5).map(d => ` • ${d.shortcut || d.keys}: ${d.action}`).join('\n');
      const moreCount = duplicates.length > 5 ? `\n ... and ${duplicates.length - 5} more` : '';

      const confirmDuplicates = confirm(
        `⚠️ Duplicate Commands Detected (${duplicates.length} item${duplicates.length > 1 ? 's' : ''}):\n\n${dupSummary}${moreCount}\n\nDo you want to include these duplicate commands?\n\n• Click OK to add ALL (${currentParsedPosts.length} posts, including duplicates)\n• Click CANCEL to skip duplicates and add ONLY new unique commands (${uniquePosts.length} posts)`
      );

      if (confirmDuplicates) {
        postsToAdd = currentParsedPosts;
      } else {
        postsToAdd = uniquePosts;
      }
    } else {
      postsToAdd = currentParsedPosts;
    }

    if (postsToAdd.length === 0) {
      showToast('ℹ️ No new unique commands to import.', 'warning');
      return;
    }

    let maxDay = calendarDb.reduce((max, item) => Math.max(max, Number(item.day) || 0), 0);

    postsToAdd.forEach(post => {
      maxDay++;
      const itemCopy = { ...post, day: maxDay };
      calendarDb.push(itemCopy);
    });

    localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
    updateCalendarProgress();
    renderSidebarDaysList();
    renderDatabaseManagerTable();
    saveAllDataToSyncFile();
    updateUnsyncedBanner(postsToAdd.length);

    showToast(`✅ Successfully imported ${postsToAdd.length} commands to database!`, 'success');
  });
}

// ==========================================================================
// 17. Printable PDF Cheat Sheet Generator Engine
// ==========================================================================
function renderCheatSheet() {
  const grid = document.getElementById('cheatsheet-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const posts = calendarDb;

  if (posts.length === 0) {
    grid.innerHTML = `<div style="grid-column:span 2; text-align:center; padding:60px 20px; color:#64748b; font-weight:700;">
      <p style="font-size:1.1rem; color:#0f2b46; margin-bottom:8px;">No posts in database yet</p>
      <p style="font-size:0.85rem; font-weight:500;">Import your posts in ⚡ <b>Bulk Post Importer</b> or sync from 📊 <b>Google Sheets</b> to generate your printable PDF cheat sheet!</p>
    </div>`;
    return;
  }

  const categories = [...new Set(posts.map(p => p.category || 'General CAD'))];

  categories.forEach(cat => {
    const catBlock = document.createElement('div');
    catBlock.style.cssText = 'border:1px solid #cbd5e1; border-radius:6px; padding:16px; background:#f8fafc;';

    const catTitle = document.createElement('h3');
    catTitle.style.cssText = 'font-size:14px; font-weight:800; color:#0f2b46; border-bottom:2px solid #0f2b46; padding-bottom:6px; margin:0 0 10px 0; text-transform:uppercase; font-family:"Chakra Petch", sans-serif;';
    catTitle.textContent = cat;
    catBlock.appendChild(catTitle);

    const table = document.createElement('table');
    table.style.cssText = 'width:100%; border-collapse:collapse; font-size:12px;';
    table.innerHTML = `
      <thead>
        <tr style="background:#e2e8f0; color:#1e293b; text-align:left; font-weight:800;">
          <th style="padding:6px;">KEY</th>
          <th style="padding:6px;">ACTION</th>
          <th style="padding:6px;">PRO TIP</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;

    const tbody = table.querySelector('tbody');
    posts.filter(p => (p.category || 'General CAD') === cat).forEach(item => {
      const tr = document.createElement('tr');
      tr.style.cssText = 'border-bottom:1px solid #e2e8f0;';
      tr.innerHTML = `
        <td style="padding:6px; font-family:monospace; font-weight:800; color:#2563eb;">${item.keys || item.shortcut || ''}</td>
        <td style="padding:6px; font-weight:700; color:#0f172a;">${item.action || item.title || ''}</td>
        <td style="padding:6px; color:#475569; font-size:11px;">${item.proTip || item.desc || ''}</td>
      `;
      tbody.appendChild(tr);
    });

    catBlock.appendChild(table);
    grid.appendChild(catBlock);
  });
}

const btnPrintCheat = document.getElementById('btn-print-cheatsheet');
if (btnPrintCheat) {
  btnPrintCheat.addEventListener('click', () => {
    window.print();
  });
}

// ==========================================================================
// 18. Quiz & Flashcards Engine
// ==========================================================================
let currentFlashcardIndex = 0;
let currentQuizScore = 0;
let currentQuizIndex = 0;
let currentQuizQuestions = [];

function initQuizAndFlashcards() {
  const flashcardEl = document.getElementById('flashcard-element');
  const btnFlip = document.getElementById('btn-flashcard-flip');
  const btnPrev = document.getElementById('btn-flashcard-prev');
  const btnNext = document.getElementById('btn-flashcard-next');

  const btnModeFlash = document.getElementById('btn-mode-flashcards');
  const btnModeQuiz = document.getElementById('btn-mode-quiz');
  const flashContainer = document.getElementById('quiz-flashcards-container');
  const quizContainer = document.getElementById('quiz-game-container');

  if (btnModeFlash && btnModeQuiz && flashContainer && quizContainer) {
    btnModeFlash.onclick = () => {
      flashContainer.style.display = 'flex';
      quizContainer.style.display = 'none';
      btnModeFlash.classList.add('btn-primary-action');
      btnModeFlash.classList.remove('btn-secondary-action');
      btnModeQuiz.classList.add('btn-secondary-action');
      btnModeQuiz.classList.remove('btn-primary-action');
    };

    btnModeQuiz.onclick = () => {
      flashContainer.style.display = 'none';
      quizContainer.style.display = 'flex';
      btnModeQuiz.classList.add('btn-primary-action');
      btnModeQuiz.classList.remove('btn-secondary-action');
      btnModeFlash.classList.add('btn-secondary-action');
      btnModeFlash.classList.remove('btn-primary-action');
      startQuizGame();
    };
  }

  const posts = calendarDb.length > 0 ? calendarDb : parseRawTextToPosts(EXAMPLE_POST_TEXT);
  if (posts.length === 0) return;

  function renderFlashcard() {
    const card = posts[currentFlashcardIndex % posts.length];
    if (!card) return;

    document.getElementById('flashcard-software-badge').textContent = (card.software || 'AUTOCAD').toUpperCase();
    document.getElementById('flashcard-count-badge').textContent = `Card ${currentFlashcardIndex + 1} / ${posts.length}`;
    document.getElementById('flashcard-keys').textContent = card.keys || card.shortcut || 'CAD';
    document.getElementById('flashcard-action').textContent = card.action || card.title || 'Action Title';
    document.getElementById('flashcard-desc').textContent = card.desc || 'Description of command.';
    
    const protipEl = document.getElementById('flashcard-protip');
    if (protipEl) {
      if (card.proTip) {
        protipEl.style.display = 'block';
        protipEl.textContent = `💡 Pro Tip: ${card.proTip}`;
      } else {
        protipEl.style.display = 'none';
      }
    }

    const mistakeEl = document.getElementById('flashcard-mistake');
    if (mistakeEl) {
      if (card.commonMistake) {
        mistakeEl.style.display = 'block';
        mistakeEl.textContent = `❌ Mistake: ${card.commonMistake}`;
      } else {
        mistakeEl.style.display = 'none';
      }
    }

    // Reset card to front
    document.getElementById('flashcard-front').style.display = 'block';
    document.getElementById('flashcard-back').style.display = 'none';
  }

  if (flashcardEl) {
    flashcardEl.onclick = () => {
      const front = document.getElementById('flashcard-front');
      const back = document.getElementById('flashcard-back');
      if (front.style.display === 'none') {
        front.style.display = 'block';
        back.style.display = 'none';
      } else {
        front.style.display = 'none';
        back.style.display = 'flex';
      }
    };
  }

  if (btnFlip) btnFlip.onclick = () => flashcardEl.click();
  if (btnNext) btnNext.onclick = () => { currentFlashcardIndex++; renderFlashcard(); };
  if (btnPrev) btnPrev.onclick = () => { currentFlashcardIndex = (currentFlashcardIndex - 1 + posts.length) % posts.length; renderFlashcard(); };

  renderFlashcard();
}

function startQuizGame() {
  const posts = calendarDb.length > 0 ? calendarDb : parseRawTextToPosts(EXAMPLE_POST_TEXT);
  if (posts.length === 0) return;

  currentQuizScore = 0;
  currentQuizIndex = 0;
  currentQuizQuestions = posts.slice(0, 5); // Take 5 questions

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const qNum = document.getElementById('quiz-question-number');
  const scoreBadge = document.getElementById('quiz-score-badge');
  const qText = document.getElementById('quiz-question-text');
  const optsContainer = document.getElementById('quiz-options-container');
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const btnNextQ = document.getElementById('btn-quiz-next-question');

  if (!qText || !optsContainer) return;

  if (currentQuizIndex >= currentQuizQuestions.length) {
    // Quiz Finish
    qText.textContent = `🎉 Quiz Completed! You scored ${currentQuizScore} out of ${currentQuizQuestions.length}!`;
    optsContainer.innerHTML = `<button class="btn-action btn-primary-action" onclick="startQuizGame()" style="align-self:center; margin-top:20px;">🔄 Restart Quiz</button>`;
    if (feedbackBox) feedbackBox.style.display = 'none';
    if (btnNextQ) btnNextQ.style.display = 'none';
    return;
  }

  const currentQ = currentQuizQuestions[currentQuizIndex];
  if (qNum) qNum.textContent = `Question ${currentQuizIndex + 1} of ${currentQuizQuestions.length}`;
  if (scoreBadge) scoreBadge.textContent = `Score: ${currentQuizScore}`;

  qText.textContent = `What is the correct shortcut key for "${currentQ.action || currentQ.title}" in ${currentQ.software || 'AutoCAD'}?`;

  optsContainer.innerHTML = '';
  if (feedbackBox) feedbackBox.style.display = 'none';
  if (btnNextQ) btnNextQ.style.display = 'none';

  // Generate 4 choices
  const correctAnswer = currentQ.keys || currentQ.shortcut || 'TR';
  const distractorPool = ['TR', 'EX', 'L', 'C', 'REC', 'PL', 'A', 'O', 'MI', 'RO', 'M', 'E', 'F8', 'F3', 'Z', 'P'];
  const wrongChoices = distractorPool.filter(k => k !== correctAnswer).sort(() => 0.5 - Math.random()).slice(0, 3);
  const choices = [correctAnswer, ...wrongChoices].sort(() => 0.5 - Math.random());

  choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'btn-action btn-secondary-action';
    btn.style.cssText = 'padding:14px; text-align:left; font-weight:800; font-size:0.95rem; font-family:var(--font-mono); justify-content:flex-start;';
    btn.textContent = choice;

    btn.onclick = () => {
      // Disable all choice buttons
      optsContainer.querySelectorAll('button').forEach(b => b.disabled = true);

      if (choice === correctAnswer) {
        btn.style.background = 'var(--success)';
        btn.style.color = '#fff';
        currentQuizScore++;
        if (scoreBadge) scoreBadge.textContent = `Score: ${currentQuizScore}`;
        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.style.background = 'rgba(16,185,129,0.15)';
          feedbackBox.style.color = 'var(--success)';
          feedbackBox.textContent = `✅ Correct! ${currentQ.action} uses "${correctAnswer}". ${currentQ.proTip ? '💡 Pro Tip: ' + currentQ.proTip : ''}`;
        }
      } else {
        btn.style.background = 'var(--error)';
        btn.style.color = '#fff';
        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.style.background = 'rgba(239,68,68,0.15)';
          feedbackBox.style.color = 'var(--error)';
          feedbackBox.textContent = `❌ Incorrect. The correct key is "${correctAnswer}".`;
        }
      }

      if (btnNextQ) {
        btnNextQ.style.display = 'block';
        btnNextQ.onclick = () => {
          currentQuizIndex++;
          renderQuizQuestion();
        };
      }
    };

    optsContainer.appendChild(btn);
  });
}

// ==========================================================================
// 19. Google Sheets Cloud Sync Engine
// ==========================================================================
const gsheetApiUrlInput = document.getElementById('gsheet-api-url');
const btnGsheetFetch = document.getElementById('btn-gsheet-fetch');
const btnGsheetPush = document.getElementById('btn-gsheet-push');
const btnGsheetInstructions = document.getElementById('btn-gsheet-instructions');
const gsheetSetupModal = document.getElementById('gsheet-setup-modal');
const btnCloseGsheetModal = document.getElementById('btn-close-gsheet-modal');
const btnCopyGsheetScript = document.getElementById('btn-copy-gsheet-script');

// ── JSONP helper — bypasses CORS for Google Apps Script GET requests ──────────
// Google Apps Script redirects through accounts.google.com, blocking fetch().
// JSONP injects a <script> tag instead — no CORS restriction applies.
function fetchJSONP(url) {
  return new Promise((resolve, reject) => {
    const cbName = 'ludarp_jsonp_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
    const timeout = setTimeout(() => {
      delete window[cbName];
      if (script.parentNode) script.parentNode.removeChild(script);
      reject(new Error('JSONP timeout — Apps Script did not respond in time'));
    }, 15000);

    window[cbName] = (data) => {
      clearTimeout(timeout);
      delete window[cbName];
      if (script.parentNode) script.parentNode.removeChild(script);
      resolve(data);
    };

    const sep = url.includes('?') ? '&' : '?';
    const script = document.createElement('script');
    script.src = url + sep + 'callback=' + cbName;
    script.onerror = () => {
      clearTimeout(timeout);
      delete window[cbName];
      reject(new Error('JSONP script load failed — check your Apps Script URL'));
    };
    document.head.appendChild(script);
  });
}

// Load saved Google Sheet URL from LocalStorage (or use permanent default)
const LUDARP_GSHEET_DEFAULT_URL = 'https://script.google.com/macros/s/AKfycbyVUADznw9S_gp1rZNfMC_p9pMHxLXuKgkO2ycd7Z3pF1lMcpac8hAYDLjkvPR-D524/exec';

if (gsheetApiUrlInput) {
  const savedUrl = localStorage.getItem('ludarp_gsheet_url') || LUDARP_GSHEET_DEFAULT_URL;
  gsheetApiUrlInput.value = savedUrl;
  // Persist to localStorage on first load so it sticks
  if (!localStorage.getItem('ludarp_gsheet_url')) {
    localStorage.setItem('ludarp_gsheet_url', LUDARP_GSHEET_DEFAULT_URL);
  }

  gsheetApiUrlInput.addEventListener('change', () => {
    localStorage.setItem('ludarp_gsheet_url', gsheetApiUrlInput.value.trim());
  });
}

// Modal Toggle
if (btnGsheetInstructions && gsheetSetupModal) {
  btnGsheetInstructions.onclick = () => gsheetSetupModal.classList.remove('id-hidden');
}
if (btnCloseGsheetModal && gsheetSetupModal) {
  btnCloseGsheetModal.onclick = () => gsheetSetupModal.classList.add('id-hidden');
}

// Copy Code Button
if (btnCopyGsheetScript) {
  btnCopyGsheetScript.onclick = () => {
    const codeArea = document.getElementById('gsheet-script-code');
    if (codeArea) {
      codeArea.select();
      navigator.clipboard.writeText(codeArea.value);
      showToast('📋 Apps Script code copied to clipboard!', 'success');
    }
  };
}

// Fetch posts FROM Google Sheet
if (btnGsheetFetch) {
  btnGsheetFetch.onclick = async () => {
    const url = gsheetApiUrlInput ? gsheetApiUrlInput.value.trim() : '';
    if (!url) {
      showToast('⚠️ Please enter your Google Apps Script or Published CSV URL first.', 'error');
      return;
    }

    try {
      showToast('⏳ Fetching live posts from Google Sheet via JSONP...', 'info');
      const data = await fetchJSONP(url);

      if (Array.isArray(data) && data.length > 0) {
        const sanitized = data.map((item, i) => ({
          ...item,
          day: Number(item.day) || i + 1,
          bullets: typeof item.bullets === 'string' ? tryParse(item.bullets, []) : (item.bullets || []),
          hashtags: typeof item.hashtags === 'string' ? tryParse(item.hashtags, []) : (item.hashtags || [])
        }));

        calendarDb = sanitized;
        localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
        updateCalendarProgress();
        renderSidebarDaysList();
        renderDatabaseManagerTable();
        saveAllDataToSyncFile();
        showToast(`✅ Synced ${calendarDb.length} posts from Google Sheet Cloud!`, 'success');
      } else {
        showToast('⚠️ Google Sheet returned no rows. Push your posts first.', 'warning');
      }
    } catch (err) {
      console.error('Google Sheet Sync Error:', err);
      showToast('❌ ' + err.message, 'error');
    }
  };
}

// Push posts TO Google Sheet
// Google Apps Script blocks direct CORS POST from browsers.
window.pushPostsToGoogleSheet = function(silent = false) {
  const gsheetApiUrlInput = document.getElementById('gsheet-api-url');
  const url = (gsheetApiUrlInput && gsheetApiUrlInput.value.trim()) ? gsheetApiUrlInput.value.trim() : (localStorage.getItem('ludarp_gsheet_url') || LUDARP_GSHEET_DEFAULT_URL);
  if (!url) {
    if (!silent) showToast('⚠️ Please enter your Google Apps Script Web App URL first.', 'error');
    return;
  }
  if (calendarDb.length === 0) {
    if (!silent) showToast('⚠️ No posts to push. Add posts first!', 'error');
    return;
  }

  try {
    if (!silent) showToast('⏳ Pushing updated JSON data to Google Sheet...', 'info');

    const oldForm = document.getElementById('gsheet-push-form');
    const oldFrame = document.getElementById('gsheet-push-frame');
    if (oldForm) oldForm.remove();
    if (oldFrame) oldFrame.remove();

    const iframe = document.createElement('iframe');
    iframe.name = 'gsheet-push-frame';
    iframe.id = 'gsheet-push-frame';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.id = 'gsheet-push-form';
    form.method = 'POST';
    form.action = url;
    form.target = 'gsheet-push-frame';
    form.style.display = 'none';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data';
    input.value = JSON.stringify(calendarDb);
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      showToast(`📊 Updated JSON (${calendarDb.length} posts) synced to Google Sheet!`, 'success');
    }, 2000);

  } catch (err) {
    console.error('Google Sheet Push Error:', err);
    if (!silent) showToast('❌ Push failed: ' + err.message, 'error');
  }
};

if (btnGsheetPush) {
  btnGsheetPush.onclick = () => window.pushPostsToGoogleSheet(false);
}

// ==========================================================================
// 20. Cloud Sheet Viewer Engine
// ==========================================================================
let cloudViewerData = [];

const PRIORITY_COLS = ['id', 'day', 'software', 'keys', 'shortcut', 'action', 'title', 'category', 'difficulty', 'desc', 'description', 'proTip', 'commonMistake', 'hashtags'];
const DIFFICULTY_COLORS = { 'Beginner': '#10b981', 'Intermediate': '#f59e0b', 'Advanced': '#ef4444', 'Expert': '#a855f7' };

function initCloudViewer() {
  const btnRefresh = document.getElementById('btn-cloudviewer-refresh');
  const btnLoadAll = document.getElementById('btn-cloudviewer-load-all');
  const searchInput = document.getElementById('cloudviewer-search');
  const filterSoftware = document.getElementById('cloudviewer-filter-software');
  const filterDifficulty = document.getElementById('cloudviewer-filter-difficulty');
  const viewModeSelect = document.getElementById('cloudviewer-view-mode');

  if (btnRefresh) btnRefresh.onclick = fetchCloudViewerData;
  if (searchInput) searchInput.addEventListener('input', renderCloudViewerContent);
  if (filterSoftware) filterSoftware.addEventListener('change', renderCloudViewerContent);
  if (filterDifficulty) filterDifficulty.addEventListener('change', renderCloudViewerContent);
  if (viewModeSelect) viewModeSelect.addEventListener('change', renderCloudViewerContent);

  if (btnLoadAll) {
    btnLoadAll.onclick = () => {
      if (cloudViewerData.length === 0) {
        showToast('⚠️ No cloud data loaded yet. Click Refresh from Cloud first.', 'error');
        return;
      }
      const sanitized = cloudViewerData.map((item, i) => ({
        ...item,
        day: Number(item.day) || i + 1,
        bullets: typeof item.bullets === 'string' ? tryParse(item.bullets, []) : (item.bullets || []),
        hashtags: typeof item.hashtags === 'string' ? tryParse(item.hashtags, []) : (item.hashtags || [])
      }));
      calendarDb = sanitized;
      localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
      updateCalendarProgress();
      renderSidebarDaysList();
      renderDatabaseManagerTable();
      saveAllDataToSyncFile();
      showToast(`✅ Loaded ${calendarDb.length} posts from Cloud Sheet into App Database!`, 'success');
    };
  }

  // Auto-fetch on first open if no data yet
  if (cloudViewerData.length === 0) {
    fetchCloudViewerData();
  } else {
    renderCloudViewerContent();
  }
}

function tryParse(str, fallback) {
  try { return JSON.parse(str); } catch { return fallback; }
}

async function fetchCloudViewerData() {
  const url = (typeof LUDARP_GSHEET_DEFAULT_URL !== 'undefined') ? LUDARP_GSHEET_DEFAULT_URL : '';
  let savedUrl = localStorage.getItem('ludarp_gsheet_url') || url;
  if (gsheetApiUrlInput && gsheetApiUrlInput.value.trim()) {
    savedUrl = gsheetApiUrlInput.value.trim();
  }
  if (!savedUrl) {
    showToast('⚠️ No Google Sheet URL configured. Go to Database Manager to set it up.', 'error');
    return;
  }

  const emptyEl = document.getElementById('cloudviewer-empty');
  if (emptyEl) {
    emptyEl.style.display = 'block';
    emptyEl.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:40px;">
        <div class="ai-spinner"></div>
        <p style="font-weight:700; color:var(--text-primary);">Fetching live data from Google Sheet...</p>
      </div>`;
  }

  try {
    const data = await fetchJSONP(savedUrl);

    if (!Array.isArray(data) || data.length === 0) {
      if (emptyEl) {
        emptyEl.style.display = 'block';
        emptyEl.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:52px;height:52px;margin-bottom:14px;opacity:0.35;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          <p style="font-weight:800; font-size:1rem; color:var(--text-primary);">Google Sheet is currently empty (0 rows)</p>
          <p style="font-size:0.82rem; margin-top:6px; opacity:0.7;">Go to <b>Database Manager</b> and click <b>📤 Push TO Cloud</b> to upload all 141 posts into your Google Sheet!</p>`;
      }
      showToast('⚠️ Google Sheet connected, but returned no data rows.', 'warning');
      return;
    }

    cloudViewerData = data;
    const countBadge = document.getElementById('cloudviewer-count-badge');
    if (countBadge) countBadge.textContent = `${data.length} row${data.length !== 1 ? 's' : ''}`;

    showToast(`✅ Loaded ${data.length} rows from Google Sheet!`, 'success');
    renderCloudViewerContent();
  } catch (err) {
    console.error('Cloud Viewer Fetch Error:', err);
    if (emptyEl) {
      emptyEl.style.display = 'block';
      emptyEl.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:52px;height:52px;margin-bottom:14px;opacity:0.35;color:var(--error);"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <p style="font-weight:800; font-size:1rem; color:var(--error);">Failed to connect to Google Sheet</p>
        <p style="font-size:0.82rem; margin-top:8px; line-height:1.5; opacity:0.85; max-width:480px; margin-left:auto; margin-right:auto;">
          Google Apps Script Web App returned a 404 or connection error.<br><br>
          <b>How to fix in 30 seconds:</b><br>
          1. Open Google Sheets ➔ <b>Extensions ➔ Apps Script</b>.<br>
          2. Click <b>Deploy ➔ New deployment ➔ Web app</b>.<br>
          3. Set <b>Who has access: Anyone</b> and click <b>Deploy</b>.<br>
          4. Copy the new Web App URL and paste it in <b>Database Manager</b>!
        </p>`;
    }
    showToast('❌ Could not reach Google Sheet Web App.', 'error');
  }
}

function renderCloudViewerContent() {
  const searchVal = (document.getElementById('cloudviewer-search')?.value || '').toLowerCase();
  const softwareVal = document.getElementById('cloudviewer-filter-software')?.value || '';
  const diffVal = document.getElementById('cloudviewer-filter-difficulty')?.value || '';
  const viewMode = document.getElementById('cloudviewer-view-mode')?.value || 'table';

  const emptyEl = document.getElementById('cloudviewer-empty');
  const tableWrap = document.getElementById('cloudviewer-table-wrap');
  const cardsGrid = document.getElementById('cloudviewer-cards-grid');

  // Filter
  let rows = cloudViewerData.filter(row => {
    const sw = (row.software || '').toLowerCase();
    const diff = (row.difficulty || '');
    const text = JSON.stringify(row).toLowerCase();

    if (softwareVal && !sw.includes(softwareVal.toLowerCase())) return false;
    if (diffVal && diff !== diffVal) return false;
    if (searchVal && !text.includes(searchVal)) return false;
    return true;
  });

  if (emptyEl) emptyEl.style.display = 'none';

  if (viewMode === 'table') {
    if (tableWrap) tableWrap.style.display = 'block';
    if (cardsGrid) cardsGrid.style.display = 'none';
    renderCloudTable(rows);
  } else {
    if (tableWrap) tableWrap.style.display = 'none';
    if (cardsGrid) { cardsGrid.style.display = 'grid'; renderCloudCards(rows, cardsGrid); }
  }
}

function renderCloudTable(rows) {
  const thead = document.getElementById('cloudviewer-thead');
  const tbody = document.getElementById('cloudviewer-tbody');
  if (!thead || !tbody) return;

  if (rows.length === 0) {
    thead.innerHTML = '';
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:40px;color:var(--text-muted);font-weight:700;">No matching records found</td></tr>`;
    return;
  }

  // Determine column order (priority cols first, then rest)
  const allKeys = Object.keys(rows[0]);
  const prioritized = PRIORITY_COLS.filter(k => allKeys.includes(k));
  const rest = allKeys.filter(k => !PRIORITY_COLS.includes(k));
  const cols = [...prioritized, ...rest];

  // Thead
  thead.innerHTML = `<tr style="background:var(--bg-tertiary); position:sticky; top:0; z-index:2;">
    ${cols.map(col => `<th style="padding:10px 12px; text-align:left; font-size:0.72rem; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); white-space:nowrap; border-bottom:2px solid var(--border);">${col}</th>`).join('')}
  </tr>`;

  // Tbody
  tbody.innerHTML = rows.map((row, i) => {
    const bg = i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)';
    const diffColor = DIFFICULTY_COLORS[row.difficulty] || 'var(--text-muted)';
    return `<tr style="background:${bg}; transition:background 0.15s;" onmouseover="this.style.background='var(--bg-tertiary)'" onmouseout="this.style.background='${bg}'">
      ${cols.map(col => {
        let val = row[col] ?? '';
        if (typeof val === 'object') val = JSON.stringify(val);
        val = String(val);

        // Special styling per column
        if (col === 'difficulty' && val) {
          return `<td style="padding:8px 12px; border-bottom:1px solid var(--border);">
            <span style="font-size:0.7rem; font-weight:800; padding:2px 8px; border-radius:10px; background:${diffColor}22; color:${diffColor}; border:1px solid ${diffColor}44;">${val}</span>
          </td>`;
        }
        if (col === 'keys' || col === 'shortcut') {
          return `<td style="padding:8px 12px; border-bottom:1px solid var(--border); font-family:var(--font-mono); font-weight:900; color:var(--accent);">${val}</td>`;
        }
        if (col === 'software') {
          return `<td style="padding:8px 12px; border-bottom:1px solid var(--border); font-weight:800; color:var(--text-primary);">${val}</td>`;
        }
        if (col === 'action' || col === 'title') {
          return `<td style="padding:8px 12px; border-bottom:1px solid var(--border); font-weight:700; color:var(--text-primary); max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${val}">${val}</td>`;
        }
        return `<td style="padding:8px 12px; border-bottom:1px solid var(--border); color:var(--text-secondary); max-width:180px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${val}">${val}</td>`;
      }).join('')}
    </tr>`;
  }).join('');
}

function renderCloudCards(rows, container) {
  container.innerHTML = '';
  if (rows.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted); font-weight:700;">No matching records found</div>`;
    return;
  }

  rows.forEach(row => {
    const diffColor = DIFFICULTY_COLORS[row.difficulty] || 'var(--text-muted)';
    const keys = row.keys || row.shortcut || '—';
    const action = row.action || row.title || 'No Title';
    const desc = row.desc || row.description || '';
    const proTip = row.proTip || '';
    const mistake = row.commonMistake || '';
    const software = row.software || '';
    const difficulty = row.difficulty || '';
    const category = row.category || '';

    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText = 'padding:18px; display:flex; flex-direction:column; gap:10px; position:relative; overflow:hidden;';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
        <div style="font-family:var(--font-mono); font-size:1.6rem; font-weight:900; color:var(--accent); line-height:1;">${keys}</div>
        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
          ${software ? `<span style="font-size:0.68rem; font-weight:800; padding:2px 7px; border-radius:8px; background:var(--accent-dim); color:var(--accent);">${software}</span>` : ''}
          ${difficulty ? `<span style="font-size:0.65rem; font-weight:800; padding:2px 7px; border-radius:8px; background:${diffColor}22; color:${diffColor};">${difficulty}</span>` : ''}
        </div>
      </div>
      <div>
        <div style="font-weight:800; font-size:0.95rem; color:var(--text-primary); line-height:1.3;">${action}</div>
        ${category ? `<div style="font-size:0.7rem; font-weight:700; color:var(--text-muted); margin-top:3px; text-transform:uppercase; letter-spacing:0.05em;">${category}</div>` : ''}
      </div>
      ${desc ? `<p style="font-size:0.8rem; color:var(--text-secondary); line-height:1.5; margin:0;">${desc}</p>` : ''}
      ${proTip ? `<div style="font-size:0.75rem; font-weight:700; color:var(--warning); background:rgba(245,158,11,0.1); padding:6px 10px; border-radius:6px; border-left:3px solid var(--warning);">💡 ${proTip}</div>` : ''}
      ${mistake ? `<div style="font-size:0.75rem; font-weight:700; color:var(--error); background:rgba(239,68,68,0.1); padding:6px 10px; border-radius:6px; border-left:3px solid var(--error);">❌ ${mistake}</div>` : ''}
    `;
    container.appendChild(card);
  });
}

// ── Unsynced Cloud Banner Engine ─────────────────────────────────────────────
let unsyncedCount = Number(localStorage.getItem('ludarp_unsynced_count') || 0);

function updateUnsyncedBanner(increment = 0) {
  if (increment > 0) {
    unsyncedCount += increment;
  } else if (increment === -1) {
    unsyncedCount = 0;
  }
  localStorage.setItem('ludarp_unsynced_count', unsyncedCount);

  const banner = document.getElementById('unsynced-alert-banner');
  const countText = document.getElementById('unsynced-count-text');

  if (banner && countText) {
    if (unsyncedCount > 0) {
      banner.style.display = 'flex';
      countText.textContent = `⚠️ ${unsyncedCount} new/updated command${unsyncedCount !== 1 ? 's' : ''} not synced to Google Sheet`;
    } else {
      banner.style.display = 'none';
    }
  }
}

const bannerSyncBtn = document.getElementById('btn-banner-sync-now');
if (bannerSyncBtn) {
  bannerSyncBtn.addEventListener('click', () => {
    if (btnGsheetPush) {
      btnGsheetPush.click();
    } else {
      const dbTab = document.querySelector('.nav-btn[data-tab="database"]');
      if (dbTab) dbTab.click();
    }
  });
}

if (btnGsheetPush) {
  btnGsheetPush.addEventListener('click', () => {
    setTimeout(() => {
      updateUnsyncedBanner(-1);
    }, 1500);
  });
}

// Check initial banner state on load
document.addEventListener('DOMContentLoaded', () => {
  updateUnsyncedBanner(0);
});
updateUnsyncedBanner(0);
