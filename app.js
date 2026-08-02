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

// Load from LocalStorage or fallback to defaults
let shortcutDb = JSON.parse(localStorage.getItem('ludarp_shortcuts')) || defaultShortcuts;

// State variables
let currentFormat = "square"; // "square" or "story"
let activeStylePreset = "blueprint";
let activeStudioShortcutId = null; // Track currently loaded shortcut from library
let latestGeneratedResearch = null; // Store latest AI generated result object
let fileHandle = null; // Stored FileSystemFileHandle for disk sync

// Mutable calendar schedule database
let calendarDb = JSON.parse(localStorage.getItem('ludarp_calendar_db')) || [];
if (calendarDb.length === 0 && typeof autocadCalendar !== 'undefined') {
  calendarDb = JSON.parse(JSON.stringify(autocadCalendar));
  localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
}
let activeCalendarDayNum = "1"; // Default to day "1" string

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
const contentActionInput = document.getElementById('content-action');
const contentDescInput = document.getElementById('content-desc');
const contentProTipInput = document.getElementById('content-pro-tip');
const contentHashtagsInput = document.getElementById('content-hashtags');
const stepsContainer = document.getElementById('steps-container');
const btnAddStep = document.getElementById('btn-add-step');
const getStepInputs = () => document.querySelectorAll('.step-input');

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

function updateCardPreview() {
  // Update brand handle
  const handleVal = brandHandleInput.value.trim() || "ludarp_civil";
  cardHandleText.textContent = handleVal.startsWith('@') ? handleVal : `@${handleVal}`;
  
  // Update software badge
  const softwareVal = contentSoftwareSelect.value;
  cardSoftwareName.textContent = softwareVal.toUpperCase();
  
  // Update keys & action title
  const keysVal = contentKeysInput.value.trim() || "KEY";
  cardKeys.textContent = keysVal;
  cardAction.textContent = contentActionInput.value.trim() || "Action Title";
  
  // Update description
  cardDesc.textContent = contentDescInput.value.trim() || "Description of shortcut goes here.";
  
  // Update steps
  cardStepsList.innerHTML = '';
  let stepIndex = 1;
  getStepInputs().forEach(input => {
    const text = input.value.trim();
    if (text) {
      const stepItem = document.createElement('div');
      stepItem.className = 'card-step-item';
      
      const numFormatted = stepIndex.toString().padStart(2, '0');
      stepItem.innerHTML = `
        <div class="card-step-num">${numFormatted}</div>
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
  
  // Update Pro Tip
  const proTipText = contentProTipInput.value.trim();
  const proTipBox = instagramCard.querySelector('.pro-tip-box');
  if (proTipText) {
    proTipBox.style.display = 'flex';
    cardProTip.textContent = proTipText;
  } else {
    proTipBox.style.display = 'none';
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
}

// Bind event listeners to input elements for real-time visual syncing and database auto-saving
[brandHandleInput, contentSoftwareSelect, contentKeysInput, contentActionInput, contentDescInput, contentProTipInput, contentHashtagsInput].forEach(el => {
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
  const rows = stepsContainer.querySelectorAll('.step-input-row');
  rows.forEach((r, index) => {
    r.querySelector('.step-number').textContent = index + 1;
    const input = r.querySelector('.step-input');
    if (input) input.placeholder = `Step ${index + 1}`;
  });
}

if (btnAddStep) {
  btnAddStep.addEventListener('click', () => {
    const rows = stepsContainer.querySelectorAll('.step-input-row');
    const newIndex = rows.length + 1;
    
    const newRow = document.createElement('div');
    newRow.className = 'step-input-row';
    newRow.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 8px;';
    newRow.innerHTML = `
      <span class="step-number" style="font-weight: 700; min-width: 15px; color: var(--accent-color);">${newIndex}</span>
      <input type="text" class="step-input" placeholder="Step ${newIndex}" value="" style="flex-grow: 1; padding: 8px 12px; background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-family: var(--font-ui); font-size: 0.85rem;">
      <button type="button" class="btn-remove-step" style="background: none; border: none; color: var(--error); cursor: pointer; font-size: 1.1rem; padding: 0 4px;">&times;</button>
    `;
    
    stepsContainer.appendChild(newRow);
    bindStepRowEvents(newRow);
    newRow.querySelector('.step-input').focus();
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

sidebarButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Toggle active navigation buttons
    sidebarButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Toggle visible views
    const targetTab = btn.getAttribute('data-tab');
    tabViews.forEach(view => {
      view.classList.remove('active');
      if (view.id === `${targetTab}-view`) {
        view.classList.add('active');
      }
    });
    
    // Toggle contextual sidebar elements
    if (sidebarStudioContext) {
      sidebarStudioContext.style.display = (targetTab === 'studio') ? 'flex' : 'none';
    }
    
    // If switching to hub view, reload grid
    if (targetTab === 'hub') {
      renderShortcutsHub();
    } else if (targetTab === 'calendar') {
      renderCalendarHub();
    }
  });
});

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
  if (picker) picker.addEventListener('input', applyCustomColors);
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
        
        if (confirm(`Are you sure you want to import ${imported.shortcuts.length} shortcuts and overwrite your library?`)) {
          shortcutDb = imported.shortcuts;
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
      item.steps.forEach((stepText, sIdx) => {
        if (stepText.trim()) {
          const stepItem = document.createElement('div');
          stepItem.className = 'card-step-item';
          const numFormatted = (sIdx + 1).toString().padStart(2, '0');
          stepItem.innerHTML = `
            <div class="card-step-num">${numFormatted}</div>
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

let completedCalendarDays = new Set(JSON.parse(localStorage.getItem('ludarp_completed_calendar')) || []);

function renderCalendarHub() {
  const selectedPhase = calendarPhaseSelect.value;
  calendarGridContainer.innerHTML = '';
  
  // Filter posts
  const filteredPosts = autocadCalendar.filter(post => {
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
    let snippet = '';
    if (post.bullets && post.bullets.length > 0) {
      snippet = post.bullets.slice(0, 3).map(b => `• ${b}`).join('\n');
    } else if (post.script) {
      snippet = `Script: ${post.script}`;
    } else if (post.caption) {
      snippet = post.caption;
    }
    
    const card = document.createElement('div');
    card.className = `calendar-card ${phaseClass} ${isCompleted ? 'completed' : ''}`;
    card.setAttribute('data-day', post.day);
    
    card.innerHTML = `
      <div>
        <div class="calendar-card-header">
          <span class="calendar-day-badge">DAY ${post.day}</span>
          <span class="calendar-format-badge format-${post.format}-badge">
            ${post.format === 'carousel' ? '🎠 Carousel' : post.format === 'reel' ? '🎥 Reel' : '🖼️ Post'}
          </span>
        </div>
        <h4 class="calendar-card-title">${post.title}</h4>
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
  const totalDays = 83; // Total calendar items
  const completedCount = completedCalendarDays.size;
  const percent = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;
  
  if (calendarProgressCount) calendarProgressCount.textContent = `${completedCount} / ${totalDays}`;
  if (calendarProgressPercent) calendarProgressPercent.textContent = `(${percent}%)`;
  if (calendarProgressBar) calendarProgressBar.style.width = `${percent}%`;
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
  contentKeysInput.value = keys;
  contentActionInput.value = action;
  
  // Build description
  let descText = '';
  if (item.caption) {
    descText = item.caption;
  } else if (item.script) {
    descText = item.script;
  } else if (item.bullets && item.bullets.length > 0) {
    descText = item.bullets.join(' | ');
  }
  contentDescInput.value = descText;
  
  // Set pro-tip if any
  contentProTipInput.value = item.proTip ? item.proTip : 'Save & share this AutoCAD tip for your next drawing project!';
  
  // Set hashtags if any
  if (contentHashtagsInput) {
    contentHashtagsInput.value = item.hashtags ? (Array.isArray(item.hashtags) ? item.hashtags.join(' ') : item.hashtags) : '#autocad #civilengineering #drafting';
  }

  // Auto-detect command type (Single Command vs List)
  const isList = item.type === 'list' || (item.bullets && item.bullets.length > 5);
  setType(isList ? 'list' : 'command', false);

  // Re-generate steps container inputs based on item content
  stepsContainer.innerHTML = '';
  const listItems = item.bullets || item.items || [];
  if (listItems.length > 0) {
    listItems.forEach((bulletText, index) => {
      const row = document.createElement('div');
      row.className = 'step-input-row';
      row.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 8px;';
      row.innerHTML = `
        <span class="step-number" style="font-weight: 700; min-width: 15px; color: var(--accent-color);">${index + 1}</span>
        <input type="text" class="step-input" placeholder="Step ${index + 1}" value="${bulletText}" style="flex-grow: 1; padding: 8px 12px; background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-family: var(--font-ui); font-size: 0.85rem;">
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
      showToast(`Day ${dayStr} marked as Pending.`);
    } else {
      completedCalendarDays.add(dayStr);
      showToast(`✅ Day ${dayStr} marked as Done!`, 'success');
    }
    
    localStorage.setItem('ludarp_completed_calendar', JSON.stringify(Array.from(completedCalendarDays)));
    updateCalendarProgress();
    renderCalendarHub();
    renderSidebarDaysList();
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
      
      // --- Slide 1: Hook / Title ---
      if (cloneDesc) cloneDesc.style.display = 'block';
      if (cloneStepsList) cloneStepsList.style.display = 'none';
      if (cloneProTipBox) cloneProTipBox.style.display = 'none';
      
      // Small delay to ensure styles apply before capture
      await new Promise(resolve => setTimeout(resolve, 100));
      let canvas = await html2canvas(clone, { scale: 2, backgroundColor: null, logging: false });
      zip.file(`slide_${slideIdx.toString().padStart(2, '0')}.png`, canvas.toDataURL('image/png').split(',')[1], { base64: true });
      slideIdx++;
      
      // --- Slides 2..N: One Step per Slide ---
      if (cloneDesc) cloneDesc.style.display = 'none';
      if (cloneStepsList) {
        cloneStepsList.style.display = 'flex';
        cloneStepsList.style.flexDirection = 'column';
        cloneStepsList.style.justifyContent = 'center';
        cloneStepsList.style.height = '100%';
      }
      if (cloneProTipBox) cloneProTipBox.style.display = 'none';
      
      for (let i = 0; i < steps.length; i++) {
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
        zip.file(`slide_${slideIdx.toString().padStart(2, '0')}.png`, canvas.toDataURL('image/png').split(',')[1], { base64: true });
        slideIdx++;
      }
      
      // --- Slide N+1: Pro Tip + CTA ---
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
      zip.file(`slide_${slideIdx.toString().padStart(2, '0')}.png`, canvas.toDataURL('image/png').split(',')[1], { base64: true });
      
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

const typeCommandBtn = document.getElementById('type-command');
const typeListBtn = document.getElementById('type-list');
const keyField = document.getElementById('key-field');
const stepsLabel = document.getElementById('steps-label');

function setType(type, triggerSync = true) {
  if (type === 'command') {
    if (typeCommandBtn) typeCommandBtn.classList.add('active');
    if (typeListBtn) typeListBtn.classList.remove('active');
    if (keyField) keyField.style.display = 'block';
    if (stepsLabel) stepsLabel.textContent = 'Steps';
    const cardKeysWrapper = document.querySelector('.keycap-container');
    if (cardKeysWrapper) cardKeysWrapper.style.display = 'block';
  } else {
    if (typeCommandBtn) typeCommandBtn.classList.remove('active');
    if (typeListBtn) typeListBtn.classList.add('active');
    if (keyField) keyField.style.display = 'none';
    if (stepsLabel) stepsLabel.textContent = 'Shortcut List Items';
    const cardKeysWrapper = document.querySelector('.keycap-container');
    if (cardKeysWrapper) cardKeysWrapper.style.display = 'none';
  }
  if (triggerSync) {
    saveCurrentDayData();
    updateCardPreview();
  }
}

if (typeCommandBtn && typeListBtn) {
  typeCommandBtn.onclick = () => setType('command');
  typeListBtn.onclick = () => setType('list');
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
  d.proTip = contentProTipInput.value.trim();
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
  
  if (isCommand) {
    d.bullets = steps;
    d.items = [];
  } else {
    d.bullets = [];
    d.items = steps;
  }
  
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
      if (data.shortcuts && Array.isArray(data.shortcuts)) {
        shortcutDb = data.shortcuts;
        localStorage.setItem('ludarp_shortcuts', JSON.stringify(shortcutDb));
        renderShortcutsHub();
      }
      if (data.calendar && Array.isArray(data.calendar)) {
        calendarDb = data.calendar;
        localStorage.setItem('ludarp_calendar_db', JSON.stringify(calendarDb));
      }
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
}

// Render dynamic day-by-day checklist in sidebar (Production Line)
function renderSidebarDaysList() {
  if (!sidebarDaysList) return;
  sidebarDaysList.innerHTML = '';
  
  const phases = [...new Set(calendarDb.map(post => post.phase))];
  
  phases.forEach(phase => {
    const label = document.createElement('div');
    label.className = 'phase-label';
    label.style.cssText = 'font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin: 12px 0 6px 0; padding-bottom: 4px; border-bottom: 1px solid var(--border);';
    label.textContent = phase;
    sidebarDaysList.appendChild(label);
    
    calendarDb.forEach(post => {
      if (post.phase !== phase) return;
      
      const isCompleted = completedCalendarDays.has(String(post.day));
      const isActive = String(activeCalendarDayNum) === String(post.day);
      const item = document.createElement('div');
      item.className = `day-item${isCompleted ? ' done' : ''}${isActive ? ' active' : ''}`;
      
      item.innerHTML = `
        <span class="dchk">${isCompleted ? '✓' : ''}</span>
        <span class="dtitle">${post.title}</span>
      `;
      
      item.addEventListener('click', () => {
        activeCalendarDayNum = post.day;
        loadCalendarItemToEditor(post);
        renderSidebarDaysList();
      });
      
      sidebarDaysList.appendChild(item);
    });
  });
  
  // Update sidebar progress count & bar
  const total = calendarDb.length;
  const done = calendarDb.filter(post => completedCalendarDays.has(String(post.day))).length;
  if (sidebarProgressCount) sidebarProgressCount.textContent = `${done} / ${total}`;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  if (sidebarProgressBar) sidebarProgressBar.style.width = `${percent}%`;
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

document.addEventListener('DOMContentLoaded', async () => {
  renderShortcutsHub();
  updateCalendarProgress(); // Fix Progress display showing 0/83 initially
  renderSidebarDaysList();
  
  // Load saved API key
  if (aiApiKeyInput) {
    aiApiKeyInput.value = localStorage.getItem('ludarp_gemini_api_key') || '';
  }
  
  // Load initial active day on startup (Day 1)
  if (calendarDb.length > 0) {
    const activeDay = calendarDb.find(d => String(d.day) === String(activeCalendarDayNum)) || calendarDb[0];
    loadCalendarItemToEditor(activeDay);
  } else {
    updateCardPreview();
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
});
