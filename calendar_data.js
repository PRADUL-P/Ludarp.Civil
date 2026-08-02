// 30-Day Feed-Only Schedule — All 82 pieces across 30 days (~3 posts/day)
// Each object is one post. Day numbering uses "1a", "1b", "1c" for multi-post days.
// "slot" indicates posting order within the day (morning / afternoon / evening).
const autocadCalendar = [

  // ─────────────────────────────────────────────
  // DAY 1  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "1a", "slot": "Morning", "format": "carousel",
    "title": "Top 10 Drawing Shortcuts",
    "desc": "The 10 essential drawing shortcuts every AutoCAD user needs memorized.",
    "bullets": ["L – Line", "PL – Polyline", "C – Circle", "REC – Rectangle", "ARC (A) – Arc", "POL – Polygon", "EL – Ellipse", "DO – Donut", "PO – Point", "SPL – Spline"],
    "proTip": "Type just the alias and press Enter — never touch the ribbon.",
    "hashtags": ["#autocad", "#autocadtips", "#civilengineering", "#cadtips", "#drafting"],
    "phase": "Week 1 — 2D Drawing Basics"
  },
  {
    "day": "1b", "slot": "Afternoon", "format": "carousel",
    "title": "Line Command: Ribbon vs Shortcut",
    "desc": "Clicking the ribbon vs typing 'L' and pressing Enter — the difference in speed is massive.",
    "bullets": ["Ribbon click = 2-3 seconds per command", "Type L + Enter = instant", "Build muscle memory from Day 1", "Never click the ribbon for commands you use daily"],
    "proTip": "Time yourself for one week — you'll never go back to ribbon clicking.",
    "hashtags": ["#autocad", "#cadhacks", "#engineeringtips", "#productivityhacks"],
    "phase": "Week 1 — 2D Drawing Basics"
  },
  {
    "day": "1c", "slot": "Evening", "format": "image",
    "title": "Hidden Feature: BOUNDARY",
    "desc": "Need a closed polyline from overlapping lines without redrawing? BOUNDARY auto-traces a clean closed shape.",
    "bullets": [],
    "proTip": "Use BO (short alias) to launch it even faster.",
    "hashtags": ["#autocadhiddenfeatures", "#cadtricks", "#drafting"],
    "phase": "Week 1 — 2D Drawing Basics"
  },

  // ─────────────────────────────────────────────
  // DAY 2  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "2a", "slot": "Morning", "format": "carousel",
    "title": "More Drawing Tools",
    "desc": "Beyond Line and Circle — the drawing tools that handle complex geometry.",
    "bullets": ["XL – Construction Line (infinite)", "RAY – Ray (one-directional)", "REG – Region (2D closed area)", "BOUNDARY (BO) – Closed polyline from area", "DIV – Divide into equal segments", "MEA – Measure at fixed intervals"],
    "proTip": "XL is invaluable for setting up reference geometry before you start detailing.",
    "hashtags": ["#autocad", "#drafting", "#cadtips", "#civilengineering"],
    "phase": "Week 1 — 2D Drawing Basics"
  },
  {
    "day": "2b", "slot": "Afternoon", "format": "carousel",
    "title": "Trim Command Trick Nobody Teaches You",
    "desc": "Press Enter immediately after TR — no cutting edge selection needed. AutoCAD uses ALL visible objects as cutting edges.",
    "bullets": ["Type TR → Enter", "Press Enter again (skip edge selection)", "Click anything to trim — it just works", "Saves 10+ minutes on complex drawings"],
    "proTip": "Hold Shift while trimming to switch to Extend mode instantly.",
    "hashtags": ["#autocadtrim", "#cadhacks", "#drafting"],
    "phase": "Week 1 — 2D Drawing Basics"
  },
  {
    "day": "2c", "slot": "Evening", "format": "image",
    "title": "Hidden Feature: OVERKILL",
    "desc": "Duplicate overlapping lines causing plot issues? OVERKILL auto-deletes exact duplicates and overlapping geometry in one command.",
    "bullets": [],
    "proTip": "Run OVERKILL before every file submission — keeps your drawings clean.",
    "hashtags": ["#autocad", "#cadcleanup", "#drafting"],
    "phase": "Week 1 — 2D Drawing Basics"
  },

  // ─────────────────────────────────────────────
  // DAY 3  —  2 posts
  // ─────────────────────────────────────────────
  {
    "day": "3a", "slot": "Morning", "format": "carousel",
    "title": "Polyline Editing",
    "desc": "Everything you can do with polylines that most people don't know about.",
    "bullets": ["PE – Polyline Edit (join, width, curve fit)", "JOIN (J) – Join lines/arcs/polylines into one", "SPLINEDIT – Edit spline objects", "CLOSE – Close an open polyline"],
    "proTip": "Use PE → J to join multiple separate lines into a single clean polyline.",
    "hashtags": ["#autocad", "#polylines", "#drafting", "#cadtips"],
    "phase": "Week 1 — 2D Drawing Basics"
  },
  {
    "day": "3b", "slot": "Afternoon", "format": "image",
    "title": "Hidden Feature: MATCHPROP",
    "desc": "Stop manually resetting layer, color, and linetype. MATCHPROP copies all formatting from one object to another in one click.",
    "bullets": [],
    "proTip": "Use the 'Settings' option in MATCHPROP to control which properties get copied.",
    "hashtags": ["#autocadtips", "#cadefficiency", "#drafting"],
    "phase": "Week 1 — 2D Drawing Basics"
  },

  // ─────────────────────────────────────────────
  // DAY 4  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "4a", "slot": "Morning", "format": "carousel",
    "title": "Essential Editing Shortcuts",
    "desc": "The 10 editing commands you'll use every single day.",
    "bullets": ["TR – Trim", "EX – Extend", "CO / CP – Copy", "MI – Mirror", "O – Offset", "F – Fillet", "CHA – Chamfer", "S – Stretch", "RO – Rotate", "SC – Scale"],
    "proTip": "Learn these 10 before anything else — they cover 90% of your editing workflow.",
    "hashtags": ["#autocadtips", "#cadediting", "#civil3d", "#drafting101"],
    "phase": "Week 1 — 2D Drawing Basics"
  },
  {
    "day": "4b", "slot": "Afternoon", "format": "carousel",
    "title": "Layer Walk: The Tool That Finds Hidden Junk",
    "desc": "LAYWALK cycles through every layer interactively — perfect for spotting forgotten or empty layers before a deadline handoff.",
    "bullets": ["Type LAYWALK", "Click each layer in the list", "Drawing updates in real time showing only that layer", "Find forgotten geometry before submitting"],
    "proTip": "Run LAYWALK before every handoff — you'll catch hidden objects every time.",
    "hashtags": ["#autocad", "#layermanagement", "#cadhacks"],
    "phase": "Week 1 — 2D Drawing Basics"
  },
  {
    "day": "4c", "slot": "Evening", "format": "image",
    "title": "Hidden Feature: QDIM",
    "desc": "Need to dimension 10 points at once? QDIM auto-generates continuous or baseline dimensions instantly — no clicking one at a time.",
    "bullets": [],
    "proTip": "Select your entire geometry, then run QDIM — works on complex profiles in seconds.",
    "hashtags": ["#autocad", "#quickdim", "#drafting", "#cadtricks"],
    "phase": "Week 1 — 2D Drawing Basics"
  },

  // ─────────────────────────────────────────────
  // DAY 5  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "5a", "slot": "Morning", "format": "carousel",
    "title": "Array & Duplication Commands",
    "desc": "Stop copying objects one at a time — use arrays for any repeating pattern.",
    "bullets": ["AR – Array (rectangular/polar/path)", "ARRAYRECT – Rectangular array directly", "ARRAYPOLAR – Polar array directly", "ARRAYPATH – Array along a path", "ARRAYEDIT – Edit an existing array"],
    "proTip": "Associative arrays let you edit the count and spacing live via grip points after creation.",
    "hashtags": ["#autocad", "#arraycommand", "#drafting", "#cadtips"],
    "phase": "Week 1 — 2D Drawing Basics"
  },
  {
    "day": "5b", "slot": "Afternoon", "format": "carousel",
    "title": "Multileaders vs Old Leaders — Use This Instead",
    "desc": "The old LEADER command is limited. MLEADER gives you styles, multiple leader lines to one note, and auto-formatting.",
    "bullets": ["LE – old Quick Leader (limited)", "MLD – Multileader (modern, flexible)", "MLEADERSTYLE – create your own leader styles", "Attach multiple arrowheads to a single note"],
    "proTip": "Set up an MLEADERSTYLE matching your project standard once — reuse it across all drawings.",
    "hashtags": ["#autocad", "#mleader", "#drafting", "#cadtips"],
    "phase": "Week 1 — 2D Drawing Basics"
  },
  {
    "day": "5c", "slot": "Evening", "format": "image",
    "title": "Hidden Feature: DESIGNCENTER",
    "desc": "Stop rebuilding blocks and styles from scratch. ADCENTER lets you drag-and-drop content from any other drawing directly into your current one.",
    "bullets": [],
    "proTip": "Pin your company standards drawing in DesignCenter for instant access to all blocks and layers.",
    "hashtags": ["#autocad", "#designcenter", "#cadefficiency"],
    "phase": "Week 1 — 2D Drawing Basics"
  },

  // ─────────────────────────────────────────────
  // DAY 6  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "6a", "slot": "Morning", "format": "carousel",
    "title": "More Editing Tools",
    "desc": "The editing commands that fill the gaps in your workflow.",
    "bullets": ["BR – Break", "BREAKATPOINT – Break without gap", "JOIN – Join objects", "LEN – Lengthen", "ALIGN (AL) – Align to reference", "REVERSE – Reverse polyline direction"],
    "proTip": "BREAKATPOINT splits a line at an exact point without creating a visible gap — useful for managing overlapping objects.",
    "hashtags": ["#autocad", "#cadediting", "#drafting", "#civilengineering"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },
  {
    "day": "6b", "slot": "Afternoon", "format": "carousel",
    "title": "Dynamic Blocks: One Block, Endless Variations",
    "desc": "A single door block that can stretch width, flip orientation, and change swing angle — all from one block definition.",
    "bullets": ["Open BEDIT (Block Editor)", "Add a Stretch parameter + action", "Add Flip parameter for mirroring", "Add Visibility states for different types"],
    "proTip": "Replace 5 separate door size blocks with 1 dynamic block — cuts your block library significantly.",
    "hashtags": ["#autocad", "#dynamicblocks", "#drafting", "#cadhacks"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },
  {
    "day": "6c", "slot": "Evening", "format": "image",
    "title": "Hidden Feature: FIELD",
    "desc": "Want your title block to auto-update the date or sheet number? Use FIELD to insert live data instead of static text that goes out of date.",
    "bullets": [],
    "proTip": "Use FIELD for drawing scale, plot date, file path — anything that changes per sheet.",
    "hashtags": ["#autocad", "#titleblocks", "#cadautomation"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },

  // ─────────────────────────────────────────────
  // DAY 7  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "7a", "slot": "Morning", "format": "carousel",
    "title": "Layer Management Shortcuts",
    "desc": "The layer commands that save hours on complex multi-discipline drawings.",
    "bullets": ["LA – Layer Manager", "LAYISO – Isolate Layer", "LAYUNISO – Restore all layers", "LAYFRZ – Freeze layer by clicking object", "LAYOFF – Turn off layer by clicking", "LAYMCUR – Set current layer from object", "LAYDEL – Delete a layer entirely"],
    "proTip": "LAYISO is the fastest way to focus on one discipline's content — one click isolates everything.",
    "hashtags": ["#autocadlayers", "#cadorganization", "#drafting"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },
  {
    "day": "7b", "slot": "Afternoon", "format": "carousel",
    "title": "Link Excel Data Into AutoCAD",
    "desc": "Connect a live Excel schedule to an AutoCAD table — update Excel, and the drawing table refreshes automatically.",
    "bullets": ["DATALINK – Create a link to an Excel file", "TABLE → insert with data link active", "DATALINKUPDATE – Refresh from Excel", "Never manually retype a schedule again"],
    "proTip": "Link your door/window schedule in Excel so the architect and drafter always have the same numbers.",
    "hashtags": ["#autocad", "#exceltoautocad", "#datalink", "#cadautomation"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },
  {
    "day": "7c", "slot": "Evening", "format": "image",
    "title": "Hidden Feature: QUICKCALC",
    "desc": "Need a quick calculation without leaving AutoCAD? QUICKCALC (Ctrl+8) opens a built-in calculator that can grab measurements directly from your drawing.",
    "bullets": [],
    "proTip": "Use the GetDist() function in QuickCalc to snap a real distance from the drawing into your formula.",
    "hashtags": ["#autocad", "#quickcalc", "#cadtricks"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },

  // ─────────────────────────────────────────────
  // DAY 8  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "8a", "slot": "Morning", "format": "carousel",
    "title": "Object Properties Deep Dive",
    "desc": "Controlling object properties the right way — ByLayer discipline and fast property editing.",
    "bullets": ["MO / PR – Properties Palette", "CH – Change properties", "CHPROP – Change via command line", "LT – Linetype Manager", "LTS – Linetype Scale", "LW – Lineweight settings"],
    "proTip": "Always keep color, linetype, and lineweight set to ByLayer — this is non-negotiable for professional drawings.",
    "hashtags": ["#autocad", "#objectproperties", "#drafting", "#cadtips"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },
  {
    "day": "8b", "slot": "Afternoon", "format": "carousel",
    "title": "Why Your File Is 200MB (And How to Fix It)",
    "desc": "The cleanup routine that cuts bloated AutoCAD files down to size in under 2 minutes.",
    "bullets": ["PURGE (PU) – Remove unused blocks, layers, styles", "AUDIT – Find and fix drawing errors", "Detach unused Xrefs (XREF manager)", "Run OVERKILL to eliminate duplicate geometry"],
    "proTip": "Do this cleanup routine before every file submission and before archiving projects.",
    "hashtags": ["#autocad", "#cadfilesize", "#cadcleanup"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },
  {
    "day": "8c", "slot": "Evening", "format": "image",
    "title": "Hidden Feature: Action Recorder",
    "desc": "Repeating the same 10-step process on every drawing? ACTRECORD records a macro once and ACTPLAY replays it — no scripting needed.",
    "bullets": [],
    "proTip": "Record your standard layer setup sequence once — replay it on every new drawing with one command.",
    "hashtags": ["#autocad", "#actionrecorder", "#cadautomation", "#powerusertips"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },

  // ─────────────────────────────────────────────
  // DAY 9  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "9a", "slot": "Morning", "format": "carousel",
    "title": "More Layer Tools",
    "desc": "Advanced layer management — the tools that handle complex multi-layer drawings.",
    "bullets": ["LAYWALK – Preview each layer interactively", "LAYMRG – Merge two layers into one", "LAYCUR – Move objects to current layer", "LAYLCK / LAYULK – Lock/unlock a layer", "LAYVPI – Isolate layer per viewport only"],
    "proTip": "LAYVPI is critical for paper space workflows — hide a layer in one viewport without affecting others.",
    "hashtags": ["#autocadlayers", "#cadtips", "#drafting"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },
  {
    "day": "9b", "slot": "Afternoon", "format": "carousel",
    "title": "QSELECT: Select 500 Objects in One Click",
    "desc": "Demo selecting every instance of a specific block or text style instantly using QSELECT's property filters.",
    "bullets": ["Open QSELECT from right-click menu", "Choose object type (e.g., Block Reference)", "Filter by a property (e.g., Name = DOOR)", "All matching objects selected instantly"],
    "proTip": "Combine QSELECT with CHPROP to change properties of hundreds of objects in seconds.",
    "hashtags": ["#autocad", "#qselect", "#cadhacks"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },
  {
    "day": "9c", "slot": "Evening", "format": "image",
    "title": "Hidden Feature: Superhatch (Express Tools)",
    "desc": "Need to hatch with an image, block, or external drawing? Express Tools' Superhatch lets you use anything as a hatch pattern — great for material call-outs.",
    "bullets": [],
    "proTip": "Enable Express Tools via the Add/Remove Programs if you don't see them — they're free with every AutoCAD install.",
    "hashtags": ["#autocad", "#expresstools", "#hatching", "#advancedcad"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },

  // ─────────────────────────────────────────────
  // DAY 10  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "10a", "slot": "Morning", "format": "carousel",
    "title": "Dimensioning Shortcuts",
    "desc": "All the dimension commands you need — typed fast, no ribbon required.",
    "bullets": ["DLI – Linear Dimension", "DAL – Aligned Dimension", "DAN – Angular Dimension", "DRA – Radius Dimension", "DDI – Diameter Dimension", "DCO – Continue Dimension", "DBA – Baseline Dimension"],
    "proTip": "Use DCO (Continue) immediately after placing one dimension to chain the next — massively faster.",
    "hashtags": ["#autocaddimensions", "#drafting", "#cadtips"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },
  {
    "day": "10b", "slot": "Afternoon", "format": "carousel",
    "title": "Publishing 50 Sheets in One Click",
    "desc": "The PUBLISH command batch-prints an entire sheet set to PDF automatically — no more plotting sheet by sheet.",
    "bullets": ["Set up Sheet Set (SSM)", "PUBLISH → select sheet set", "Choose PDF output settings", "Hit Publish — all sheets export automatically"],
    "proTip": "Schedule PUBLISH as a batch job overnight — come in to find 200 sheets already exported.",
    "hashtags": ["#autocad", "#publish", "#cadefficiency"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },
  {
    "day": "10c", "slot": "Evening", "format": "image",
    "title": "Hidden Feature: CAD Standards Checker",
    "desc": "STANDARDS checks your drawing against a standards file (.dws) and flags any layer/style naming violations automatically.",
    "bullets": [],
    "proTip": "Share the .dws standards file with your whole team so every drawing passes the same check.",
    "hashtags": ["#autocad", "#cadstandards", "#advancedcad", "#qualitycontrol"],
    "phase": "Week 2 — Layers, Properties & Annotation"
  },

  // ─────────────────────────────────────────────
  // DAY 11  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "11a", "slot": "Morning", "format": "carousel",
    "title": "Text & Leader Shortcuts",
    "desc": "The text and annotation commands every drafter needs to know.",
    "bullets": ["MT / T – Multiline Text", "DT – Single Line Text", "ED – Edit Text", "ST – Text Style Manager", "LE – Quick Leader", "MLD – Multileader", "MLEADERSTYLE – Multileader style manager"],
    "proTip": "Use MT for any text that needs formatting — DT is only for single-line labels that never need to wrap.",
    "hashtags": ["#autocadtext", "#drafting", "#cadannotations"],
    "phase": "Week 3 — Blocks, Xrefs & Data"
  },
  {
    "day": "11b", "slot": "Afternoon", "format": "carousel",
    "title": "3D Editing Commands You're Missing",
    "desc": "The 3D editing commands that most users don't realize exist — powerful once you know them.",
    "bullets": ["3DROTATE – Rotate around a 3D axis", "3DMOVE – Move along a 3D axis", "3DALIGN – Align in 3D space", "FILLETEDGE – Fillet a 3D solid edge", "CHAMFEREDGE – Chamfer a 3D solid edge"],
    "proTip": "Use 3DALIGN to precisely position 3D models from point cloud scans against reference geometry.",
    "hashtags": ["#autocad3d", "#3dediting", "#cadhacks"],
    "phase": "Week 3 — Blocks, Xrefs & Data"
  },
  {
    "day": "11c", "slot": "Evening", "format": "image",
    "title": "Hidden Feature: BLOCKREPLACE",
    "desc": "Need to swap every instance of an outdated block with a new one? BLOCKREPLACE does it project-wide in one command — no manual delete and reinsert.",
    "bullets": [],
    "proTip": "Use BLOCKREPLACE when updating a standard symbol across a 50-sheet set — takes seconds instead of hours.",
    "hashtags": ["#autocad", "#blockreplace", "#cadefficiency", "#drafting"],
    "phase": "Week 3 — Blocks, Xrefs & Data"
  },

  // ─────────────────────────────────────────────
  // DAY 12  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "12a", "slot": "Morning", "format": "carousel",
    "title": "Dimension Style & Management",
    "desc": "Setting up professional dimension styles — the foundation of a clean, consistent drawing set.",
    "bullets": ["D – Dimension Style Manager", "DIMSTYLE – Full command alias", "DED – Edit dimension text/position", "DIMTEDIT – Edit dimension text location", "DOV – Override a single dimension's style"],
    "proTip": "Always create a project-specific dim style — never use the AutoCAD Standard default for submitted drawings.",
    "hashtags": ["#autocad", "#dimensionstyles", "#drafting", "#cadtips"],
    "phase": "Week 3 — Blocks, Xrefs & Data"
  },
  {
    "day": "12b", "slot": "Afternoon", "format": "carousel",
    "title": "5 Express Tools You're Not Using",
    "desc": "The Express Tools hidden gems that save serious time on repetitive annotation and editing tasks.",
    "bullets": ["TCOUNT – Auto-number text objects sequentially", "TXTEXP – Convert text to polylines/outlines", "EXTRIM – Trim multiple objects to one boundary", "MPEDIT – Edit multiple polylines simultaneously", "LSPINCLUDE – Load Express Tools automatically at startup"],
    "proTip": "TCOUNT is a game-changer for numbering door tags, parking spaces, or room labels.",
    "hashtags": ["#autocad", "#expresstools", "#cadhacks", "#advancedcad"],
    "phase": "Week 3 — Blocks, Xrefs & Data"
  },
  {
    "day": "12c", "slot": "Evening", "format": "image",
    "title": "Hidden Feature: MASSPROP",
    "desc": "Need area, volume, centroid, or moment of inertia? MASSPROP calculates all of it instantly for any solid or region — no manual formulas.",
    "bullets": [],
    "proTip": "Use MASSPROP on closed polyline regions for quick area and centroid checks in 2D too.",
    "hashtags": ["#autocad", "#massprop", "#cadtips", "#structuralengineering"],
    "phase": "Week 3 — Blocks, Xrefs & Data"
  },

  // ─────────────────────────────────────────────
  // DAY 13  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "13a", "slot": "Morning", "format": "carousel",
    "title": "Block Basics",
    "desc": "Creating, inserting, and managing blocks — the foundation of reusable CAD content.",
    "bullets": ["B – Create a block definition", "I – Insert a block", "BEDIT – Block Editor", "W – Wblock (export block as separate file)", "X – Explode (break block into objects)"],
    "proTip": "Always set the insertion point carefully when creating blocks — it determines where the block snaps on insert.",
    "hashtags": ["#autocadblocks", "#cadtips", "#drafting"],
    "phase": "Week 3 — Blocks, Xrefs & Data"
  },
  {
    "day": "13b", "slot": "Afternoon", "format": "carousel",
    "title": "eTransmit: Sending a Complete Project Package",
    "desc": "ETRANSMIT bundles a drawing with all its xrefs, fonts, and plot styles into a single zip — no more 'missing xref' emails.",
    "bullets": ["ETRANSMIT opens the package wizard", "Select drawings to include", "AutoCAD finds and packs all referenced files", "Deliver one clean zip to consultants"],
    "proTip": "Always use eTransmit instead of just emailing the .dwg — it catches every missing dependency automatically.",
    "hashtags": ["#autocad", "#etransmit", "#cadcollaboration", "#advancedcad"],
    "phase": "Week 3 — Blocks, Xrefs & Data"
  },
  {
    "day": "13c", "slot": "Evening", "format": "carousel",
    "title": "Week 1-2 Recap: Top 5 Tips So Far",
    "desc": "The 5 most impactful tips from the first two weeks — save these if you haven't already.",
    "bullets": ["TR → Enter (trim with all visible edges)", "MATCHPROP (copy formatting in one click)", "LAYISO (isolate any layer instantly)", "QSELECT (select by property)", "OVERKILL (auto-clean duplicate geometry)"],
    "proTip": "Master these 5 before moving on — they'll save you time on every drawing from here.",
    "hashtags": ["#autocad", "#cadtips", "#drafting", "#savethispost"],
    "phase": "Week 3 — Blocks, Xrefs & Data"
  },

  // ─────────────────────────────────────────────
  // DAY 14  —  2 posts
  // ─────────────────────────────────────────────
  {
    "day": "14a", "slot": "Morning", "format": "carousel",
    "title": "Block Utilities",
    "desc": "The utilities that keep your block library clean, organized and maintainable.",
    "bullets": ["PURGE (PU) – Remove unused blocks/layers/styles", "RENAME (REN) – Rename a block or named object", "INSERTOBJ – Insert OLE object", "MINSERT – Insert a rectangular array of a block in one step"],
    "proTip": "Run PURGE with 'Purge nested items' checked to get rid of all orphaned block definitions.",
    "hashtags": ["#autocadblocks", "#cadcleanup", "#drafting"],
    "phase": "Week 3 — Blocks, Xrefs & Data"
  },
  {
    "day": "14b", "slot": "Afternoon", "format": "carousel",
    "title": "ALIGN: Move + Rotate + Scale in One Command",
    "desc": "Stop doing Move → Rotate → Scale as three separate commands. ALIGN (AL) does all three in one action with reference points.",
    "bullets": ["Type AL (ALIGN)", "Pick 1, 2, or 3 source points on the object", "Pick matching destination points", "AutoCAD moves, rotates, and scales to fit"],
    "proTip": "Use 2-point ALIGN for most tasks — it moves and rotates without affecting scale.",
    "hashtags": ["#autocad", "#align", "#cadhacks", "#drafting", "#workflowtips"],
    "phase": "Week 3 — Blocks, Xrefs & Data"
  },

  // ─────────────────────────────────────────────
  // DAY 15  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "15a", "slot": "Morning", "format": "carousel",
    "title": "External References (Xrefs)",
    "desc": "Working with external drawings — the foundation of collaborative CAD on any large project.",
    "bullets": ["XREF (XR) – Manage external references", "XATTACH (XA) – Attach an external drawing", "XCLIP – Clip an xref to show only part", "XBIND – Bind specific xref elements", "BIND – Bind an entire xref permanently"],
    "proTip": "Use Overlay (not Attach) for xrefs when working in a team — prevents accidental circular references.",
    "hashtags": ["#autocadxref", "#cadcollaboration", "#drafting"],
    "phase": "Week 4 — Advanced Tools & Output"
  },
  {
    "day": "15b", "slot": "Afternoon", "format": "carousel",
    "title": "REFEDIT: Edit a Block Without Exploding It",
    "desc": "Never explode a block just to fix one line again. REFEDIT lets you edit in place and save back while keeping all instances updated.",
    "bullets": ["Double-click a block (or type REFEDIT)", "Edit geometry directly in context", "REFCLOSE → Save reference edits", "All instances of the block update automatically"],
    "proTip": "REFEDIT works on Xrefs too — make changes to a referenced file without opening it separately.",
    "hashtags": ["#autocad", "#refedit", "#cadhacks", "#blocks", "#drafting"],
    "phase": "Week 4 — Advanced Tools & Output"
  },
  {
    "day": "15c", "slot": "Evening", "format": "carousel",
    "title": "MEASUREGEOM: One Command, All Measurements",
    "desc": "Stop switching between DIST, AREA, and separate radius checks. MEASUREGEOM gives you distance, radius, angle, area, AND volume from one command.",
    "bullets": ["Type MEASUREGEOM (or MEA)", "Choose sub-option: Distance / Radius / Angle / Area / Volume", "All in one command — no switching", "Replaces DIST, AREA, and separate radius checks"],
    "proTip": "Use the Area option with the Object sub-option to measure any closed polyline area instantly.",
    "hashtags": ["#autocad", "#measuregeom", "#cadtips", "#drafting", "#workflowtips"],
    "phase": "Week 4 — Advanced Tools & Output"
  },

  // ─────────────────────────────────────────────
  // DAY 16  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "16a", "slot": "Morning", "format": "carousel",
    "title": "Tables & Data Links",
    "desc": "AutoCAD tables connected to live Excel data — the right way to manage schedules on engineering drawings.",
    "bullets": ["TABLE – Insert a table object", "TABLEDIT – Edit table cell content", "DATALINK – Link an Excel spreadsheet", "DATALINKUPDATE – Refresh linked data from Excel"],
    "proTip": "Right-click a linked table and choose 'Update Data Links' after any Excel change — takes 2 seconds.",
    "hashtags": ["#autocadtables", "#datalinks", "#drafting"],
    "phase": "Week 4 — Advanced Tools & Output"
  },
  {
    "day": "16b", "slot": "Afternoon", "format": "carousel",
    "title": "SCALE & ROTATE: The Reference Option Nobody Uses",
    "desc": "Stop calculating scale ratios and rotation angles manually. Let AutoCAD do the math using the Reference option.",
    "bullets": ["Type SCALE (or SC)", "Select objects → pick base point", "Type R for Reference", "Pick two reference points — AutoCAD calculates the ratio"],
    "proTip": "Same trick works with ROTATE → R (Reference) — pick two points to define the target angle automatically.",
    "hashtags": ["#autocad", "#scalecommand", "#rotatecommand", "#cadhacks", "#drafting"],
    "phase": "Week 4 — Advanced Tools & Output"
  },
  {
    "day": "16c", "slot": "Evening", "format": "image",
    "title": "Hidden Feature: SECTIONPLANE",
    "desc": "SECTIONPLANE slices through a 3D model and generates a live 2D section view instantly — no manual tracing.",
    "bullets": [],
    "proTip": "Use Live Section mode to drag the plane through the model in real time before generating the output.",
    "hashtags": ["#autocad3d", "#sectionplane", "#cadtricks"],
    "phase": "Week 4 — Advanced Tools & Output"
  },

  // ─────────────────────────────────────────────
  // DAY 17  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "17a", "slot": "Morning", "format": "carousel",
    "title": "Geometric Constraints",
    "desc": "Parametric drawing — define geometric relationships that AutoCAD enforces automatically.",
    "bullets": ["GEOMCONSTRAINT – Apply constraints (parallel, perpendicular, tangent)", "AUTOCONSTRAIN – Auto-detect and apply constraints", "CONSTRAINTBAR – Show/hide constraint icons", "DELCONSTRAINT – Remove constraints"],
    "proTip": "Use AUTOCONSTRAIN on existing geometry first — it finds and applies most constraints automatically.",
    "hashtags": ["#autocadparametric", "#geometricconstraints", "#cadtips"],
    "phase": "Week 4 — Advanced Tools & Output"
  },
  {
    "day": "17b", "slot": "Afternoon", "format": "carousel",
    "title": "Copy/Paste With Base Point: One Action, Not Three",
    "desc": "Ctrl+Shift+C copies with a base point. Ctrl+Shift+V pastes at exactly the right location — perfectly aligned across drawings.",
    "bullets": ["Ctrl+Shift+C – Copy with base point", "Switch to target drawing", "Ctrl+Shift+V – Paste to original coordinates", "Object lands in the exact correct position"],
    "proTip": "Use 0,0 as your base point across all project drawings — everything aligns perfectly on paste.",
    "hashtags": ["#autocad", "#copypaste", "#cadhacks", "#drafting", "#workflowtips"],
    "phase": "Week 4 — Advanced Tools & Output"
  },
  {
    "day": "17c", "slot": "Evening", "format": "image",
    "title": "Hidden Feature: BLOCKREPLACE (Revisited)",
    "desc": "BLOCKREPLACE is the most underused productivity command in AutoCAD — swap every instance of a block project-wide in one step.",
    "bullets": [],
    "proTip": "Works across all open drawings when using Sheet Sets — true project-wide replacement.",
    "hashtags": ["#autocad", "#cadefficiency", "#drafting", "#workflowtips"],
    "phase": "Week 4 — Advanced Tools & Output"
  },

  // ─────────────────────────────────────────────
  // DAY 18  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "18a", "slot": "Morning", "format": "carousel",
    "title": "Dimensional Constraints",
    "desc": "Drive geometry with numbers — parametric dimensions that update the drawing when you change values.",
    "bullets": ["DCON – Apply a dimensional constraint", "PARAMETERS – Open Parameters Manager", "Link constraints to formulas (width = 2 × height)", "Changing one value updates all linked geometry"],
    "proTip": "Name your parameters clearly (e.g., 'wall_thickness') — you'll thank yourself when editing later.",
    "hashtags": ["#autocadparametric", "#dimensionalconstraints", "#cadtips"],
    "phase": "Week 5 — Workflow Compression"
  },
  {
    "day": "18b", "slot": "Afternoon", "format": "carousel",
    "title": "NCOPY: Copy One Element Straight Out of a Block or Xref",
    "desc": "You don't need to explode a block or xref to steal one piece of it. NCOPY grabs a nested object directly — done in one command.",
    "bullets": ["Type NCOPY", "Click the nested object inside the block or xref", "Place the copy — it lands as an independent object", "The block/xref stays completely intact"],
    "proTip": "NCOPY is indispensable when you need just one line or symbol from an xref without binding the whole thing.",
    "hashtags": ["#autocad", "#ncopy", "#cadhacks", "#blocks", "#xref", "#workflowtips"],
    "phase": "Week 5 — Workflow Compression"
  },
  {
    "day": "18c", "slot": "Evening", "format": "carousel",
    "title": "More Workflow-Compression Commands",
    "desc": "Commands that replace 2-3 steps with one — the hallmark of a fast, efficient drafter.",
    "bullets": ["PEDIT → Multiple – join + smooth polylines at once", "OFFSET → Multiple – offset same object several times", "MATCHPROP → Settings – copy only specific properties", "STRETCH → Crossing window – move AND resize in one action"],
    "proTip": "OFFSET → Multiple is one of the most underused options — keeps the source object active for rapid multi-offset.",
    "hashtags": ["#autocad", "#cadworkflow", "#drafting", "#cadhacks", "#productivitytips"],
    "phase": "Week 5 — Workflow Compression"
  },

  // ─────────────────────────────────────────────
  // DAY 19  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "19a", "slot": "Morning", "format": "carousel",
    "title": "Selection & Query Tools",
    "desc": "Select smarter, query faster — the tools that turn 10-minute selection tasks into seconds.",
    "bullets": ["QSELECT – Select by object type/property", "FILTER – Advanced selection filter", "LIST – Detailed object data", "DIST (DI) – Measure distance", "AREA – Calculate area of a region", "ID – Get coordinates of a point"],
    "proTip": "FILTER is more powerful than QSELECT for complex multi-criteria selection — worth learning both.",
    "hashtags": ["#autocad", "#cadselection", "#drafting", "#cadtips"],
    "phase": "Week 5 — Workflow Compression"
  },
  {
    "day": "19b", "slot": "Afternoon", "format": "carousel",
    "title": "Workflow Compression Bonus List",
    "desc": "A curated list of 'does two things at once' commands that separate fast drafters from slow ones.",
    "bullets": ["BURST – Explode block, keep attribute values", "CHSPACE – Move between model/paper space with auto-scale", "MULTIPLE – Repeat any command automatically", "SCALETEXT – Resize text height without repositioning", "JUSTIFYTEXT – Change alignment without moving text"],
    "proTip": "Print this list and stick it next to your monitor — you'll find yourself using these daily within a week.",
    "hashtags": ["#autocad", "#cadhacks", "#cadworkflow", "#drafting"],
    "phase": "Week 5 — Workflow Compression"
  },
  {
    "day": "19c", "slot": "Evening", "format": "carousel",
    "title": "CHSPACE: Move Objects Between Model & Paper Space",
    "desc": "Stop manually recalculating scale when moving objects between model space and a layout. CHSPACE does it with auto-scale correction.",
    "bullets": ["Select the object in model space", "Type CHSPACE", "Object moves to paper space at the correct scale", "Works in reverse too — paper to model"],
    "proTip": "CHSPACE is essential for moving annotation notes between layouts and model space correctly.",
    "hashtags": ["#autocad", "#chspace", "#cadhacks", "#drafting", "#workflowtips"],
    "phase": "Week 5 — Workflow Compression"
  },

  // ─────────────────────────────────────────────
  // DAY 20  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "20a", "slot": "Morning", "format": "carousel",
    "title": "Plotting Essentials",
    "desc": "Everything you need to know to plot correctly — page setups, plot styles, and PDF export.",
    "bullets": ["PLOT (Ctrl+P) – Open plot dialog", "PAGESETUP – Configure page/plot settings", "PLOTSTYLE – Manage plot style tables", "PREVIEW – Preview before printing", "EXPORTPDF – Export directly to PDF"],
    "proTip": "Save a named Page Setup for each common output (A1 PDF, A3 PDF) — reuse in seconds.",
    "hashtags": ["#autocadplotting", "#cadoutput", "#drafting"],
    "phase": "Week 5 — Workflow Compression"
  },
  {
    "day": "20b", "slot": "Afternoon", "format": "carousel",
    "title": "DATAEXTRACTION: Auto-Pull Block Data Into a Table",
    "desc": "Stop manually counting block instances for schedules. DATAEXTRACTION builds a complete schedule table — or exports to Excel — automatically.",
    "bullets": ["Type DATAEXTRACTION → follow the wizard", "Select which drawings/blocks to scan", "Choose which attribute properties to extract", "Output as an AutoCAD table or export to Excel"],
    "proTip": "Link the extracted table back as a DATALINK so the schedule auto-updates when blocks change.",
    "hashtags": ["#autocad", "#dataextraction", "#cadhacks", "#drafting", "#civilengineering"],
    "phase": "Week 5 — Workflow Compression"
  },
  {
    "day": "20c", "slot": "Evening", "format": "carousel",
    "title": "BURST: Explode a Block Without Losing Attribute Values",
    "desc": "Never use EXPLODE on an attributed block again. BURST keeps the actual filled-in values intact as real text.",
    "bullets": ["EXPLODE on attributed block → values disappear", "BURST on same block → values convert to text", "The block explodes to geometry + real text", "Nothing is lost"],
    "proTip": "BURST is an Express Tool — make sure Express Tools are enabled in your installation.",
    "hashtags": ["#autocad", "#burst", "#cadhacks", "#blocks", "#drafting"],
    "phase": "Week 5 — Workflow Compression"
  },

  // ─────────────────────────────────────────────
  // DAY 21  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "21a", "slot": "Morning", "format": "carousel",
    "title": "Layouts & Viewports",
    "desc": "Paper space, layouts, and viewports — the setup that every professional drawing uses.",
    "bullets": ["LAYOUT – Create/manage layout tabs", "MVIEW (MV) – Create a viewport in a layout", "VPORTS – Manage multiple viewports", "VPLAYER – Control layer visibility per viewport", "MSPACE / PSPACE – Switch model/paper space"],
    "proTip": "Lock viewport scale (double-click the viewport border → Properties → Lock Display) to prevent accidental zooming.",
    "hashtags": ["#autocadlayouts", "#paperspace", "#modelspace"],
    "phase": "Week 5 — Workflow Compression"
  },
  {
    "day": "21b", "slot": "Afternoon", "format": "carousel",
    "title": "SCALETEXT & JUSTIFYTEXT: Fix Text Without Moving It",
    "desc": "Two commands that solve text formatting problems in one step — no repositioning afterward.",
    "bullets": ["SCALETEXT – Resize multiple text objects to a new height in place", "JUSTIFYTEXT – Change text justification without the text jumping", "Select all affected text at once", "Works on MText, DText, and Attribute text"],
    "proTip": "SCALETEXT is perfect when a client asks you to change all annotation from 2.5mm to 3mm height project-wide.",
    "hashtags": ["#autocad", "#scaletext", "#justifytext", "#cadtips", "#drafting"],
    "phase": "Week 5 — Workflow Compression"
  },
  {
    "day": "21c", "slot": "Evening", "format": "carousel",
    "title": "DATAEXTRACTION: Build Your Door Schedule in 2 Minutes",
    "desc": "A practical walkthrough of using DATAEXTRACTION to auto-generate a door schedule from block attributes.",
    "bullets": ["Tag all door blocks with number attributes", "Run DATAEXTRACTION → select the drawing", "Map 'DoorNumber' and 'DoorType' attributes", "AutoCAD builds the complete schedule table"],
    "proTip": "Run the extraction again after any door additions — the schedule updates in under 30 seconds.",
    "hashtags": ["#autocad", "#schedules", "#cadautomation", "#civilengineering"],
    "phase": "Week 5 — Workflow Compression"
  },

  // ─────────────────────────────────────────────
  // DAY 22  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "22a", "slot": "Morning", "format": "carousel",
    "title": "Layouts & Viewports (Deep Dive)",
    "desc": "Advanced viewport control — the techniques that make your sheet layouts professional.",
    "bullets": ["VPLAYER – Hide layers in specific viewports only", "MS / PS – Toggle in/out of viewport quickly", "Set viewport scale via Properties palette", "CHSPACE – Move objects between spaces with scale correction"],
    "proTip": "Never set viewport scale by zooming manually — always use the Properties palette for exact 1:100, 1:200 scale.",
    "hashtags": ["#autocadlayouts", "#paperspace", "#cadtips"],
    "phase": "Week 6 — Output, 3D & Advanced"
  },
  {
    "day": "22b", "slot": "Afternoon", "format": "carousel",
    "title": "SOLPROF & FLATSHOT: Auto-Generate 2D Lines From a 3D Model",
    "desc": "Stop manually tracing 3D views to create 2D drawings. SOLPROF and FLATSHOT do it automatically.",
    "bullets": ["SOLPROF – 2D profile of a 3D solid for current view", "FLATSHOT – Flatten entire 3D model to 2D lines", "Both generate clean linework from viewpoint", "Export to paper space layouts for elevation drawings"],
    "proTip": "Use FLATSHOT for quick elevation extractions from 3D models — delivers clean 2D geometry in seconds.",
    "hashtags": ["#autocad", "#solprof", "#flatshot", "#3dto2d", "#cadhacks"],
    "phase": "Week 6 — Output, 3D & Advanced"
  },
  {
    "day": "22c", "slot": "Evening", "format": "carousel",
    "title": "OOPS, SETBYLAYER & FIND: Quiet Time-Savers",
    "desc": "Three commands that fix common headaches in one step each — most people don't know they exist.",
    "bullets": ["OOPS – Restores last erased object, even after other commands (unlike UNDO)", "SETBYLAYER – Forces all object properties to ByLayer in one step", "FIND – Find and replace text across entire drawing including inside blocks"],
    "proTip": "FIND works inside blocks — the only way to bulk-update block text without exploding everything.",
    "hashtags": ["#autocad", "#oops", "#setbylayer", "#find", "#cadhacks", "#drafting"],
    "phase": "Week 6 — Output, 3D & Advanced"
  },

  // ─────────────────────────────────────────────
  // DAY 23  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "23a", "slot": "Morning", "format": "carousel",
    "title": "Sheet Sets for Multi-Drawing Projects",
    "desc": "The professional workflow for managing large drawing sets — Sheet Set Manager explained.",
    "bullets": ["SHEETSET (SSM) – Open Sheet Set Manager", "NEWSHEETSET – Create a new sheet set", "Publish entire sheet sets to PDF in one click", "Auto-updating title block fields across all sheets"],
    "proTip": "Sheet Sets are essential for any project over 10 drawings — the time investment pays back immediately.",
    "hashtags": ["#autocadsheetsets", "#civilengineering", "#drafting"],
    "phase": "Week 6 — Output, 3D & Advanced"
  },
  {
    "day": "23b", "slot": "Afternoon", "format": "carousel",
    "title": "Basic 3D Solid Primitives",
    "desc": "The building blocks of 3D modeling in AutoCAD — every primitive command you need.",
    "bullets": ["BOX – Rectangular solid", "CYL – Cylinder", "SPHERE – Sphere", "CONE – Cone", "WEDGE (WE) – Wedge", "PYRAMID (PYR) – Pyramid", "TORUS (TOR) – Torus (donut)"],
    "proTip": "Switch to '3D Modeling' workspace before starting 3D — gives you all the right tools upfront.",
    "hashtags": ["#autocad3d", "#cad3dmodeling", "#drafting"],
    "phase": "Week 6 — Output, 3D & Advanced"
  },
  {
    "day": "23c", "slot": "Evening", "format": "carousel",
    "title": "SELECTSIMILAR & ISOLATEOBJECTS: Smarter Selection",
    "desc": "Two commands that replace manual multi-object selection — instant isolation and bulk selection by property.",
    "bullets": ["SELECTSIMILAR – Right-click → select all matching objects instantly", "ISOLATEOBJECTS – Isolate selected objects regardless of layer", "UNISOLATEOBJECTS – Restore everything after isolation", "Works independently of layer settings"],
    "proTip": "ISOLATEOBJECTS is perfect for focusing on one detail area without touching layer visibility at all.",
    "hashtags": ["#autocad", "#selectsimilar", "#isolateobjects", "#cadhacks", "#drafting"],
    "phase": "Week 6 — Output, 3D & Advanced"
  },

  // ─────────────────────────────────────────────
  // DAY 24  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "24a", "slot": "Morning", "format": "carousel",
    "title": "Complex 3D Shapes",
    "desc": "Beyond primitives — the commands that create any complex 3D form from 2D geometry.",
    "bullets": ["EXTRUDE (EXT) – Push a 2D profile into 3D", "REVOLVE (REV) – Spin a profile around an axis", "LOFT – Blend between multiple cross-sections", "SWEEP – Follow a path curve", "PRESSPULL – Push/pull faces interactively"],
    "proTip": "PRESSPULL on a closed region is the fastest way to create a simple solid — just drag and type a height.",
    "hashtags": ["#autocad3d", "#cadmodeling", "#extrude", "#revolve"],
    "phase": "Week 6 — Output, 3D & Advanced"
  },
  {
    "day": "24b", "slot": "Afternoon", "format": "carousel",
    "title": "Boolean Operations",
    "desc": "Combine, subtract, and intersect 3D solids — the core logic of solid modeling.",
    "bullets": ["UNION (UNI) – Combine two solids into one", "SUBTRACT (SU) – Cut one solid with another", "INTERSECT (IN) – Keep only the overlapping volume", "SLICE (SL) – Cut a solid with a plane"],
    "proTip": "SUBTRACT is how you create holes, notches, and cut-outs in 3D — model the cutter separately then subtract it.",
    "hashtags": ["#autocad3d", "#booleanoperations", "#cadtips"],
    "phase": "Week 6 — Output, 3D & Advanced"
  },
  {
    "day": "24c", "slot": "Evening", "format": "carousel",
    "title": "THICKEN & CONVTOSOLID: Instant Solid Conversion",
    "desc": "Stop rebuilding 3D geometry from scratch — convert existing surfaces directly into solids.",
    "bullets": ["THICKEN – Turn a flat surface into a solid with set thickness", "CONVTOSOLID – Convert meshes/surfaces to solids directly", "THICKEN works on any AutoCAD surface", "CONVTOSOLID handles imported mesh geometry"],
    "proTip": "Use THICKEN on surfaces imported from Rhino or SketchUp to make them solid for Boolean operations.",
    "hashtags": ["#autocad3d", "#thicken", "#convtosolid", "#cadhacks", "#advancedcad"],
    "phase": "Week 6 — Output, 3D & Advanced"
  },

  // ─────────────────────────────────────────────
  // DAY 25  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "25a", "slot": "Morning", "format": "carousel",
    "title": "Custom Keyboard Shortcuts & Aliases",
    "desc": "Build your own shortcuts — stop using defaults that don't match your workflow.",
    "bullets": ["CUI – Customize User Interface", "Edit acad.pgp file to add/change aliases", "Example: make 'WD' = Wipeout command", "REINIT – Reload aliases after editing the PGP file"],
    "proTip": "Remap the 5 commands you use most to single-letter aliases — you'll feel the speed difference within an hour.",
    "hashtags": ["#autocadcustomization", "#cadhacks", "#powerusertips"],
    "phase": "Week 7 — Advanced & Power-User"
  },
  {
    "day": "25b", "slot": "Afternoon", "format": "carousel",
    "title": "Tool Palettes & Workspaces",
    "desc": "A workspace that fits how you actually work — custom palettes and saved ribbon layouts.",
    "bullets": ["TOOLPALETTES (Ctrl+3) – Custom palettes with your blocks/hatches", "WORKSPACE – Save custom ribbon/toolbar layouts", "CUIEXPORT – Export your setup for use on another PC", "CUIIMPORT – Import another user's setup"],
    "proTip": "Build one Tool Palette per project discipline (Structural, Civil, MEP) — one click to switch contexts.",
    "hashtags": ["#autocad", "#workspaces", "#cadefficiency", "#powerusertips"],
    "phase": "Week 7 — Advanced & Power-User"
  },
  {
    "day": "25c", "slot": "Evening", "format": "carousel",
    "title": "Intro to AutoLISP (No Coding Experience Required)",
    "desc": "You don't need to write code to use AutoLISP routines — just load and run them.",
    "bullets": ["APPLOAD – Load a .lsp routine into AutoCAD", "Free community LISP routines exist for auto-numbering, batch attribute editing, area labeling", "VLIDE – Visual LISP Editor for viewing/editing routines"],
    "proTip": "Search 'AutoCAD LISP routines free download' — thousands exist for common civil/architectural tasks.",
    "hashtags": ["#autocad", "#autolisp", "#cadautomation", "#advancedcad"],
    "phase": "Week 7 — Advanced & Power-User"
  },

  // ─────────────────────────────────────────────
  // DAY 26  —  3 posts
  // ─────────────────────────────────────────────
  {
    "day": "26a", "slot": "Morning", "format": "carousel",
    "title": "Advanced Object Snap & Tracking",
    "desc": "Precision drafting depends on these — beyond basic endpoint/midpoint snaps.",
    "bullets": ["OSNAP (OS) – Configure running object snaps", "Polar Tracking (F10) – Snap to precise angles", "Object Snap Tracking (F11) – Track from multiple reference points", "OTRACK – Toggle object snap tracking"],
    "proTip": "Enable only the snaps you actively use — too many running snaps causes snap conflicts on complex drawings.",
    "hashtags": ["#autocad", "#precisiondrafting", "#cadtips", "#advancedcad"],
    "phase": "Week 7 — Advanced & Power-User"
  },
  {
    "day": "26b", "slot": "Afternoon", "format": "carousel",
    "title": "Groups & Advanced Selection",
    "desc": "Group related objects so you never lose track of them — and selection cycling for overlapping geometry.",
    "bullets": ["GROUP (G) – Create a named group", "UNGROUP – Break a group apart", "PICKSTYLE – Toggle group selection behavior", "Selection Cycling – Ctrl+click overlapping objects"],
    "proTip": "Named groups are searchable — GROUP → Name gives you click-to-select across complex drawings.",
    "hashtags": ["#autocad", "#cadgroups", "#drafting", "#advancedcad"],
    "phase": "Week 7 — Advanced & Power-User"
  },
  {
    "day": "26c", "slot": "Evening", "format": "carousel",
    "title": "Advanced Array Techniques",
    "desc": "Beyond basic arrays — the array features that handle real civil and structural patterns.",
    "bullets": ["Associative Arrays – edit one item, whole array updates", "Array along a 3D path (for structural/civil layouts)", "Edit count/spacing live via grip points", "Convert array to independent objects: ARRAYEDIT → Explode"],
    "proTip": "Associative arrays are the key feature — always leave them associative until you're 100% done editing.",
    "hashtags": ["#autocad", "#advancedarrays", "#cadtips", "#civilengineering"],
    "phase": "Week 7 — Advanced & Power-User"
  },

  // ─────────────────────────────────────────────
  // DAY 27  —  2 posts
  // ─────────────────────────────────────────────
  {
    "day": "27a", "slot": "Morning", "format": "carousel",
    "title": "Advanced Xref & Collaboration Workflow",
    "desc": "Working across a full engineering team — the xref discipline that prevents file corruption and circular references.",
    "bullets": ["Overlay vs Attach – know the difference before nesting drawings", "XREF notification/reload workflow for team file updates", "LAYERSTATE – Save and restore layer configs per discipline", "XCLIP for showing only the relevant project area"],
    "proTip": "Overlay xrefs are always safer in team environments — they don't nest and can't cause circular references.",
    "hashtags": ["#autocad", "#cadcollaboration", "#advancedcad", "#civilengineering"],
    "phase": "Week 7 — Advanced & Power-User"
  },
  {
    "day": "27b", "slot": "Afternoon", "format": "carousel",
    "title": "Sheet Set Advanced Techniques",
    "desc": "Taking Sheet Sets beyond the basics — professional multi-project workflows.",
    "bullets": ["Custom sheet set templates with pre-filled title block fields", "Sheet set Fields linked to project data (name, number, client)", "Batch-renumber sheets across an entire set", "eTransmit to package a full project for consultants"],
    "proTip": "Sheet set Field values update on all sheets simultaneously — change the project number once, updates everywhere.",
    "hashtags": ["#autocad", "#sheetsets", "#advancedcad", "#civilengineering"],
    "phase": "Week 7 — Advanced & Power-User"
  },

  // ─────────────────────────────────────────────
  // DAY 28  —  2 posts
  // ─────────────────────────────────────────────
  {
    "day": "28a", "slot": "Morning", "format": "carousel",
    "title": "AutoCAD 2D Complete Cheat Sheet (Full Recap)",
    "desc": "Every 2D command from Day 1 — compiled in one master reference. Screenshot and save this.",
    "bullets": ["Drawing: L, PL, C, REC, ARC, POL, EL, XL, DIV, MEA", "Editing: TR, EX, CO, MI, O, F, CHA, S, RO, SC, BR, LEN, AL", "Layers: LA, LAYISO, LAYUNISO, LAYFRZ, LAYOFF, LAYWALK", "Dimensions: DLI, DAL, DAN, DRA, DDI, DCO, DBA, QDIM", "Blocks: B, I, BEDIT, W, X, REFEDIT, BURST, BLOCKREPLACE", "Data: DATALINK, FIELD, DATAEXTRACTION, QSELECT, FILTER"],
    "proTip": "Pin this to your workspace — it's the reference you'll come back to for years.",
    "hashtags": ["#autocadcheatsheet", "#cadtips", "#drafting", "#savethispost"],
    "phase": "Week 8 — Recaps & Finales"
  },
  {
    "day": "28b", "slot": "Afternoon", "format": "carousel",
    "title": "AutoCAD Advanced Cheat Sheet (Full Recap)",
    "desc": "Every advanced tip from the series — power-user commands compiled in one graphic.",
    "bullets": ["Customization: CUI, PGP aliases, REINIT, TOOLPALETTES, WORKSPACE", "Automation: ACTRECORD, ACTPLAY, APPLOAD, AUTOLISP", "Collaboration: XREF, XCLIP, ETRANSMIT, LAYERSTATE, STANDARDS", "Express Tools: TCOUNT, TXTEXP, EXTRIM, MPEDIT, SUPERHATCH"],
    "proTip": "Share both cheat sheets with your team — a shared vocabulary makes collaboration significantly faster.",
    "hashtags": ["#autocad", "#advancedcad", "#cadmastery", "#savethispost"],
    "phase": "Week 8 — Recaps & Finales"
  },

  // ─────────────────────────────────────────────
  // DAY 29  —  2 posts
  // ─────────────────────────────────────────────
  {
    "day": "29a", "slot": "Morning", "format": "carousel",
    "title": "Workflow Compression Recap #1",
    "desc": "The first half of the 'One Command Instead of Three' series — every time-saving shortcut compiled.",
    "bullets": ["ALIGN – Move + Rotate + Scale in one", "REFEDIT – Edit a block in place", "MEASUREGEOM – All measurements in one command", "SCALE/ROTATE Reference – no math needed", "BLOCKREPLACE – Swap block project-wide", "FILLET radius 0 – instant clean corners"],
    "proTip": "These commands don't just save time — they reduce errors by eliminating manual intermediate steps.",
    "hashtags": ["#autocad", "#cadmastery", "#drafting", "#savethispost", "#workflowtips"],
    "phase": "Week 8 — Recaps & Finales"
  },
  {
    "day": "29b", "slot": "Afternoon", "format": "carousel",
    "title": "Workflow Compression Recap #2",
    "desc": "The second half of the compression series — more commands that eliminate unnecessary steps.",
    "bullets": ["MULTIPLE – Repeat any command automatically", "Ctrl+Shift+C/V – Copy/paste with base point", "NCOPY – Extract from block/xref without exploding", "CHSPACE – Move between spaces with auto-scale", "BURST – Explode block keeping attribute values", "SCALETEXT / JUSTIFYTEXT – format text without moving it"],
    "proTip": "Combine NCOPY with CHSPACE for a powerful pattern: extract content from xrefs and position in layouts.",
    "hashtags": ["#autocad", "#cadmastery", "#cadhacks", "#savethispost", "#workflowtips"],
    "phase": "Week 8 — Recaps & Finales"
  },

  // ─────────────────────────────────────────────
  // DAY 30  —  2 posts
  // ─────────────────────────────────────────────
  {
    "day": "30a", "slot": "Morning", "format": "carousel",
    "title": "Full Series Master Recap — The Complete AutoCAD Reference",
    "desc": "From Day 1 to Day 29 — every command, shortcut, and workflow trick in one final master graphic. Save this post.",
    "bullets": ["Phase 1 (2D): ~95 commands — drawing, editing, layers, dims, blocks, xrefs, data, output", "Phase 2 (3D): ~20 commands — solids, editing, booleans, sectioning", "Phase 3 (Advanced): Customization, automation, LISP, Express Tools, collaboration", "Phase 3.5 (Workflow): ALIGN, REFEDIT, MEASUREGEOM, NCOPY, BURST, CHSPACE + more"],
    "proTip": "Bookmark this. Share it. Come back to it when you're stuck — this is the complete AutoCAD toolkit.",
    "hashtags": ["#autocad", "#cadmastery", "#drafting", "#savethispost"],
    "phase": "Week 8 — Recaps & Finales"
  },
  {
    "day": "30b", "slot": "Evening", "format": "carousel",
    "title": "What's Coming Next Month? (Revit Series Teaser)",
    "desc": "AutoCAD month is done. Next up: Revit — the same structure, applied to BIM. Here's what's coming.",
    "bullets": ["Revit 2D: Drafting, annotation, sheets, detail views", "Revit 3D: Families, modeling, levels and grids", "Revit Advanced: Schedules, parameters, collaboration, Dynamo intro", "Starting in 7 days — follow now to catch every post from Day 1"],
    "proTip": "Everything you learned in AutoCAD translates to Revit — the muscle memory transfers, the concepts scale up.",
    "hashtags": ["#revit", "#bim", "#autocad", "#civilengineering", "#comingsoon"],
    "phase": "Week 8 — Recaps & Finales"
  }
];
