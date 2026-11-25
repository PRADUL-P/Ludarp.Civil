// ==========================================================================
// LUDARP CIVIL — REVIT BIM PRODUCTIVITY SHORTCUTS DATABASE
// Comprehensive collection of 60 Essential, Intermediate & Expert Revit shortcuts
// ==========================================================================

const revitShortcutsData = [
  // --- MODELING & ARCHITECTURE ---
  {
    id: 'RV-001',
    day: 142,
    software: 'Revit',
    shortcut: 'WA',
    action: 'Wall (Architectural)',
    title: 'WA: Create Architectural Wall',
    category: 'Modeling & Architecture',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Activates the Architectural Wall tool instantly to sketch linear, curved, or chained wall elements with automated joins.',
    steps: [
      'Type WA on your keyboard (no Enter needed in Revit).',
      'In the Options Bar or Properties, set the Base Constraint, Top Constraint, and Wall Type.',
      'Click to place start and end points in floor plan or 3D view.'
    ],
    bullets: [
      'Type WA on your keyboard (no Enter needed in Revit).',
      'In the Options Bar or Properties, set the Base Constraint, Top Constraint, and Wall Type.',
      'Click to place start and end points in floor plan or 3D view.'
    ],
    proTip: 'Press Spacebar while drawing or after selecting a wall to flip its exterior/interior orientation.',
    hashtags: ['#revit', '#revitshortcuts', '#revitbim', '#revitarchitecture'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-002',
    day: 143,
    software: 'Revit',
    shortcut: 'WN',
    action: 'Window',
    title: 'WN: Place Window',
    category: 'Modeling & Architecture',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Enables the Window placement tool. Windows automatically cut openings into host walls upon insertion.',
    steps: [
      'Type WN on your keyboard.',
      'Hover cursor over any existing host wall.',
      'Click to place the window — Revit automatically generates the wall opening and sill.'
    ],
    bullets: [
      'Type WN on your keyboard.',
      'Hover cursor over any existing host wall.',
      'Click to place the window — Revit automatically generates the wall opening and sill.'
    ],
    proTip: 'Tap Spacebar before clicking to flip window swing direction or inside/outside sill placement.',
    hashtags: ['#revit', '#revitwindows', '#bimdoorswindows', '#revittips'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-003',
    day: 144,
    software: 'Revit',
    shortcut: 'DR',
    action: 'Door',
    title: 'DR: Place Door',
    category: 'Modeling & Architecture',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Selects the Door placement tool to insert hosted single, double, or sliding doors into walls.',
    steps: [
      'Type DR on keyboard.',
      'Move cursor over any wall element.',
      'Click to insert the door; tap Spacebar to toggle swing side, or use flip arrows.'
    ],
    bullets: [
      'Type DR on keyboard.',
      'Move cursor over any wall element.',
      'Click to insert the door; tap Spacebar to toggle swing side, or use flip arrows.'
    ],
    proTip: 'Hold Shift or use temporary dimension blue witness lines to quickly position the door exactly 100mm from adjacent corners.',
    hashtags: ['#revit', '#revitdoors', '#bimdrafting'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-004',
    day: 145,
    software: 'Revit',
    shortcut: 'CM',
    action: 'Place Component / Family',
    title: 'CM: Place Component',
    category: 'Modeling & Architecture',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Opens component placement for furniture, casework, MEP fixtures, and generic model families.',
    steps: [
      'Type CM on your keyboard.',
      'Select the desired family and type from the Type Selector dropdown in the Properties Palette.',
      'Click in the view to place the component.'
    ],
    bullets: [
      'Type CM on your keyboard.',
      'Select the desired family and type from the Type Selector dropdown in the Properties Palette.',
      'Click in the view to place the component.'
    ],
    proTip: 'Press Spacebar repeatedly to rotate components by 90 degrees before placing.',
    hashtags: ['#revit', '#revitfamilies', '#revitcomponents'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-005',
    day: 146,
    software: 'Revit',
    shortcut: 'CL',
    action: 'Column (Architectural / Structural)',
    title: 'CL: Place Column',
    category: 'Modeling & Architecture',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Places structural or architectural columns at grid intersections or specified coordinates.',
    steps: [
      'Type CL on keyboard.',
      'Choose Height or Depth in Options bar, and specify the target upper level.',
      'Click to place individually, or use At Grids tool to place across multiple grid lines in one click.'
    ],
    bullets: [
      'Type CL on keyboard.',
      'Choose Height or Depth in Options bar, and specify the target upper level.',
      'Click to place individually, or use At Grids tool to place across multiple grid lines in one click.'
    ],
    proTip: 'Use At Grids in the ribbon to multi-select grid intersections and generate hundreds of columns in seconds.',
    hashtags: ['#revit', '#revitstructure', '#revitcolumns'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-006',
    day: 147,
    software: 'Revit',
    shortcut: 'FL',
    action: 'Floor (Architectural)',
    title: 'FL: Create Floor by Boundary',
    category: 'Modeling & Architecture',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Enables Floor boundary sketch mode with pick walls or line boundary tools.',
    steps: [
      'Type FL to enter sketch mode (magenta lines).',
      'Use Pick Walls tool with Extend into wall core checked.',
      'Click Finish Edit Mode (green checkmark) to generate 3D slab.'
    ],
    bullets: [
      'Type FL to enter sketch mode (magenta lines).',
      'Use Pick Walls tool with Extend into wall core checked.',
      'Click Finish Edit Mode (green checkmark) to generate 3D slab.'
    ],
    proTip: 'Always use Pick Walls so the floor boundary stays parametric and moves automatically when walls move.',
    hashtags: ['#revit', '#revitfloors', '#revitslab'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-007',
    day: 148,
    software: 'Revit',
    shortcut: 'RO',
    action: 'Roof by Footprint',
    title: 'RO: Roof by Footprint',
    category: 'Modeling & Architecture',
    phase: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Creates pitched, flat, or mansard roofs by sketching building footprint boundaries.',
    steps: [
      'Type RO to start Roof by Footprint tool.',
      'Set overhang distance in Options bar and pick perimeter walls.',
      'Toggle Defines Slope on edges to control gable vs. hip roof profiles, then click Finish.'
    ],
    bullets: [
      'Type RO to start Roof by Footprint tool.',
      'Set overhang distance in Options bar and pick perimeter walls.',
      'Toggle Defines Slope on edges to control gable vs. hip roof profiles, then click Finish.'
    ],
    proTip: 'Select walls and click Attach Top/Base to automatically trim wall peaks to the underside of the roof.',
    hashtags: ['#revit', '#revitroof', '#bimmodeling'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-008',
    day: 149,
    software: 'Revit',
    shortcut: 'RP',
    action: 'Reference Plane',
    title: 'RP: Create Reference Plane',
    category: 'Modeling & Architecture',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Draws temporary or named reference planes used as workplanes, alignment references, or parametric constraints.',
    steps: [
      'Type RP on keyboard.',
      'Click two points to draw a green dashed reference plane.',
      'Click Click to Name on the plane to give it a named reference for family creation or workplanes.'
    ],
    bullets: [
      'Type RP on keyboard.',
      'Click two points to draw a green dashed reference plane.',
      'Click Click to Name on the plane to give it a named reference for family creation or workplanes.'
    ],
    proTip: 'Always name your primary reference planes in family editor so you can select them by name in Set Work Plane.',
    hashtags: ['#revit', '#refplane', '#revitworkplane'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-009',
    day: 150,
    software: 'Revit',
    shortcut: 'LI',
    action: 'Model Line',
    title: 'LI: Draw Model Line',
    category: 'Modeling & Architecture',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Draws 3D workplane-based lines visible across all plan, elevation, section, and 3D views.',
    steps: [
      'Type LI on keyboard.',
      'Choose line subcategory from placement panel.',
      'Click start and endpoints on active workplane.'
    ],
    bullets: [
      'Type LI on keyboard.',
      'Choose line subcategory from placement panel.',
      'Click start and endpoints on active workplane.'
    ],
    proTip: 'Use Model Lines for setting out 3D site curves or building grids before modeling 3D geometry.',
    hashtags: ['#revit', '#modellines', '#revitbasics'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-010',
    day: 151,
    software: 'Revit',
    shortcut: 'DL',
    action: 'Detail Line',
    title: 'DL: Draw Detail Line (2D)',
    category: 'Annotation',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Draws 2D view-specific drafting lines that only appear in the currently active view.',
    steps: [
      'Type DL in any floor plan, section, or drafting view.',
      'Select Line Style (Thin, Medium, Wide, Hidden, Overhead).',
      'Sketch lines or circles for drafting embellishments and 2D details.'
    ],
    bullets: [
      'Type DL in any floor plan, section, or drafting view.',
      'Select Line Style (Thin, Medium, Wide, Hidden, Overhead).',
      'Sketch lines or circles for drafting embellishments and 2D details.'
    ],
    proTip: 'Detail lines do not clutter your 3D model, making them ideal for standard detail sheets and schematics.',
    hashtags: ['#revit', '#detaillines', '#revitdrafting'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-011',
    day: 152,
    software: 'Revit',
    shortcut: 'RM',
    action: 'Room',
    title: 'RM: Create Room',
    category: 'Modeling & Architecture',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Places an intelligent Room element inside enclosed wall boundaries to compute area, perimeter, and volume.',
    steps: [
      'Type RM on keyboard.',
      'Move cursor into an enclosed room boundary — blue highlight confirms enclosure.',
      'Click to place room and automatic room tag.'
    ],
    bullets: [
      'Type RM on keyboard.',
      'Move cursor into an enclosed room boundary — blue highlight confirms enclosure.',
      'Click to place room and automatic room tag.'
    ],
    proTip: 'Use Room Separator lines if a large open floor plan needs zoning without physical partitions.',
    hashtags: ['#revit', '#revitrooms', '#bimtakeoffs'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-012',
    day: 153,
    software: 'Revit',
    shortcut: 'RT',
    action: 'Tag Room',
    title: 'RT: Tag Room',
    category: 'Annotation',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Places a room tag displaying Room Name, Number, and Area on existing un-tagged rooms.',
    steps: [
      'Type RT on keyboard.',
      'Hover over untagged rooms.',
      'Click to drop the tag; change tag type in Properties to show Area or Department.'
    ],
    bullets: [
      'Type RT on keyboard.',
      'Hover over untagged rooms.',
      'Click to drop the tag; change tag type in Properties to show Area or Department.'
    ],
    proTip: 'Use Tag All Not Tagged in the Annotate tab to tag hundreds of rooms across the whole building in one click.',
    hashtags: ['#revit', '#roomtags', '#revitannotation'],
    status: 'pending',
    posted: false
  },

  // --- STRUCTURE ---
  {
    id: 'RV-013',
    day: 154,
    software: 'Revit',
    shortcut: 'BM',
    action: 'Beam (Structural Framing)',
    title: 'BM: Place Structural Beam',
    category: 'Structure',
    phase: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Places horizontal structural steel, concrete, or timber framing members between columns or bearing walls.',
    steps: [
      'Type BM on keyboard.',
      'Select member profile from Type Selector (e.g. UB, UC, W-beam, or Concrete Rectangular).',
      'Click start column/grid and end column/grid.'
    ],
    bullets: [
      'Type BM on keyboard.',
      'Select member profile from Type Selector (e.g. UB, UC, W-beam, or Concrete Rectangular).',
      'Click start column/grid and end column/grid.'
    ],
    proTip: 'Click On Grids to place beams across entire structural grid bays automatically.',
    hashtags: ['#revit', '#revitstructure', '#structuralbim'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-014',
    day: 155,
    software: 'Revit',
    shortcut: 'BR',
    action: 'Structural Brace',
    title: 'BR: Place Structural Brace',
    category: 'Structure',
    phase: 'Advanced',
    difficulty: 'Advanced',
    description: 'Inserts diagonal bracing members into framing elevations to resist lateral wind and seismic loads.',
    steps: [
      'Open a Framing Elevation or 3D view.',
      'Type BR on keyboard.',
      'Pick top beam-column node and bottom beam-column node.'
    ],
    bullets: [
      'Open a Framing Elevation or 3D view.',
      'Type BR on keyboard.',
      'Pick top beam-column node and bottom beam-column node.'
    ],
    proTip: 'Use 3D Snapping in Options Bar when placing braces in 3D views for reliable nodal connections.',
    hashtags: ['#revit', '#revitbracing', '#structuralengineering'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-015',
    day: 156,
    software: 'Revit',
    shortcut: 'GR',
    action: 'Datum Grid Line',
    title: 'GR: Place Grid Line',
    category: 'Modeling & Architecture',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Draws parametric structural grid lines with automatic alphanumeric renumbering.',
    steps: [
      'Type GR on keyboard.',
      'Click start point and end point to draw grid line 1.',
      'Draw the next grid — Revit automatically numbers it 2, 3, etc., or A, B, C.'
    ],
    bullets: [
      'Type GR on keyboard.',
      'Click start point and end point to draw grid line 1.',
      'Draw the next grid — Revit automatically numbers it 2, 3, etc., or A, B, C.'
    ],
    proTip: 'Change the first bubble to A before drawing vertical lines — Revit will sequence B, C, D automatically.',
    hashtags: ['#revit', '#revitgrids', '#bimdatum'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-016',
    day: 157,
    software: 'Revit',
    shortcut: 'LL',
    action: 'Datum Level',
    title: 'LL: Place Datum Level',
    category: 'Modeling & Architecture',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Places elevation datum levels with automatic floor plan and ceiling plan view creation.',
    steps: [
      'Open an Elevation or Section view.',
      'Type LL on keyboard.',
      'Click start and end points at the desired elevation height.'
    ],
    bullets: [
      'Open an Elevation or Section view.',
      'Type LL on keyboard.',
      'Click start and end points at the desired elevation height.'
    ],
    proTip: 'Ensure Make Plan View is checked in the Options Bar if you want Revit to automatically generate floor plans for that level.',
    hashtags: ['#revit', '#revitlevels', '#bimsetup'],
    status: 'pending',
    posted: false
  },

  // --- MODIFY & TRANSFORMS ---
  {
    id: 'RV-017',
    day: 158,
    software: 'Revit',
    shortcut: 'MV',
    action: 'Move Elements',
    title: 'MV: Move Elements',
    category: 'Modify',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Moves selected elements from a basepoint to a destination point with Disjoin and Constrain options.',
    steps: [
      'Select element(s) and type MV.',
      'Click basepoint.',
      'Click target endpoint or type distance number and press Enter.'
    ],
    bullets: [
      'Select element(s) and type MV.',
      'Click basepoint.',
      'Click target endpoint or type distance number and press Enter.'
    ],
    proTip: 'Check Disjoin in Options Bar when moving walls or columns that are locked into adjacent joins.',
    hashtags: ['#revit', '#revitmodify', '#bimshortcuts'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-018',
    day: 159,
    software: 'Revit',
    shortcut: 'CO / CC',
    action: 'Copy Elements',
    title: 'CO / CC: Copy Elements',
    category: 'Modify',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Duplicates selected model or annotation elements with multiple copy and constraint controls.',
    steps: [
      'Select elements and type CO or CC.',
      'Check Multiple in Options Bar for continuous copying.',
      'Click base point and click multiple destination points.'
    ],
    bullets: [
      'Select elements and type CO or CC.',
      'Check Multiple in Options Bar for continuous copying.',
      'Click base point and click multiple destination points.'
    ],
    proTip: 'Type CC if your left hand is resting near C on the keyboard for ergonomic high-speed drafting.',
    hashtags: ['#revit', '#revitcopy', '#revitdrafting'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-019',
    day: 160,
    software: 'Revit',
    shortcut: 'RO',
    action: 'Rotate Element',
    title: 'RO: Rotate Element',
    category: 'Modify',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Rotates elements around a center of rotation with copy or custom angle inputs.',
    steps: [
      'Select elements and type RO.',
      'Drag the blue center pin or click Place in Options Bar to change center of rotation.',
      'Enter rotation angle (e.g. 45) and press Enter.'
    ],
    bullets: [
      'Select elements and type RO.',
      'Drag the blue center pin or click Place in Options Bar to change center of rotation.',
      'Enter rotation angle (e.g. 45) and press Enter.'
    ],
    proTip: 'Check Copy in the Options Bar to rotate a duplicate copy while leaving the original untouched.',
    hashtags: ['#revit', '#revitrotate', '#bimtips'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-020',
    day: 161,
    software: 'Revit',
    shortcut: 'AR',
    action: 'Array Elements',
    title: 'AR: Array (Linear & Radial)',
    category: 'Modify',
    phase: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Creates parametric linear or radial repetitions of elements grouped with count and spacing formulas.',
    steps: [
      'Select element and type AR.',
      'Choose Linear or Radial in Options Bar, set Number (e.g. 5), and choose Move to 2nd or Last.',
      'Click basepoint and destination spacing point.'
    ],
    bullets: [
      'Select element and type AR.',
      'Choose Linear or Radial in Options Bar, set Number (e.g. 5), and choose Move to 2nd or Last.',
      'Click basepoint and destination spacing point.'
    ],
    proTip: 'Keep Group and Associate checked so you can change the item count anytime later just by typing a new number.',
    hashtags: ['#revit', '#revitarray', '#parametricbim'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-021',
    day: 162,
    software: 'Revit',
    shortcut: 'MM',
    action: 'Mirror - Pick Axis',
    title: 'MM: Mirror (Pick Axis)',
    category: 'Modify',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Mirrors selected elements across an existing line, wall, reference plane, or grid.',
    steps: [
      'Select elements to mirror.',
      'Type MM on keyboard.',
      'Click any existing linear edge, reference plane, or grid line to mirror across.'
    ],
    bullets: [
      'Select elements to mirror.',
      'Type MM on keyboard.',
      'Click any existing linear edge, reference plane, or grid line to mirror across.'
    ],
    proTip: 'Uncheck Copy in Options Bar if you want to reflect the elements without retaining the original.',
    hashtags: ['#revit', '#revitmirror', '#cadshortcuts'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-022',
    day: 163,
    software: 'Revit',
    shortcut: 'DM',
    action: 'Mirror - Draw Axis',
    title: 'DM: Mirror (Draw Axis)',
    category: 'Modify',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Mirrors selected elements by sketching a temporary two-point axis line anywhere on screen.',
    steps: [
      'Select elements and type DM.',
      'Click point 1 of reflection axis.',
      'Click point 2 — elements mirror instantly across your drawn line.'
    ],
    bullets: [
      'Select elements and type DM.',
      'Click point 1 of reflection axis.',
      'Click point 2 — elements mirror instantly across your drawn line.'
    ],
    proTip: 'Use DM when no reference plane exists at the midpoint of your layout.',
    hashtags: ['#revit', '#revitmirror', '#bimdesign'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-023',
    day: 164,
    software: 'Revit',
    shortcut: 'AL',
    action: 'Align Elements',
    title: 'AL: Align',
    category: 'Modify',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Aligns one or more elements to a target face, line, or reference plane with optional locking constraint.',
    steps: [
      'Type AL on keyboard.',
      'Click the destination alignment line (where you want to align TO).',
      'Click the element face you want to move.',
      'Click the blue padlock icon if you want a permanent parametric lock.'
    ],
    bullets: [
      'Type AL on keyboard.',
      'Click the destination alignment line (where you want to align TO).',
      'Click the element face you want to move.',
      'Click the blue padlock icon if you want a permanent parametric lock.'
    ],
    proTip: 'Check Multiple Alignment in the Options Bar to align 20 elements to the same datum in one go.',
    hashtags: ['#revit', '#revitalign', '#bimprecision'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-024',
    day: 165,
    software: 'Revit',
    shortcut: 'SL',
    action: 'Split Element',
    title: 'SL: Split Element',
    category: 'Modify',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Cuts a wall, line, or framing element into two separate segments with optional gap deletion.',
    steps: [
      'Type SL on keyboard.',
      'Hover over wall or line — an exact cut marker appears.',
      'Click to slice into two distinct elements.'
    ],
    bullets: [
      'Type SL on keyboard.',
      'Hover over wall or line — an exact cut marker appears.',
      'Click to slice into two distinct elements.'
    ],
    proTip: 'Check Delete Inner Segment in Options bar and click two points to cut out a doorway-sized gap in one operation.',
    hashtags: ['#revit', '#revitsplit', '#bimtips'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-025',
    day: 166,
    software: 'Revit',
    shortcut: 'TR',
    action: 'Trim / Extend to Corner',
    title: 'TR: Trim / Extend to Corner',
    category: 'Modify',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Joins two non-parallel walls or lines into a clean corner, or trims away excess ends.',
    steps: [
      'Type TR on keyboard.',
      'Click the portion of wall 1 you want to KEEP.',
      'Click the portion of wall 2 you want to KEEP — Revit joins them into a mitered corner.'
    ],
    bullets: [
      'Type TR on keyboard.',
      'Click the portion of wall 1 you want to KEEP.',
      'Click the portion of wall 2 you want to KEEP — Revit joins them into a mitered corner.'
    ],
    proTip: 'In Revit TR always click the sides you want to KEEP (opposite of standard CAD trim behavior).',
    hashtags: ['#revit', '#revittrim', '#revitwalljoins'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-026',
    day: 167,
    software: 'Revit',
    shortcut: 'OF',
    action: 'Offset',
    title: 'OF: Offset Elements',
    category: 'Modify',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Offsets walls, lines, or beam lines by a specified numerical distance or graphical pick.',
    steps: [
      'Type OF on keyboard.',
      'Type Offset distance in Options Bar (e.g. 1500).',
      'Hover cursor on wall side — blue dashed line indicates offset direction; click to place.'
    ],
    bullets: [
      'Type OF on keyboard.',
      'Type Offset distance in Options Bar (e.g. 1500).',
      'Hover cursor on wall side — blue dashed line indicates offset direction; click to place.'
    ],
    proTip: 'Press Tab while hovering over a connected chain of walls to offset the entire building boundary at once.',
    hashtags: ['#revit', '#revitoffset', '#draftingproductivity'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-027',
    day: 168,
    software: 'Revit',
    shortcut: 'PN',
    action: 'Pin Element',
    title: 'PN: Pin Element in Place',
    category: 'Modify',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Pins elements to prevent accidental movement, dragging, deletion, or modification.',
    steps: [
      'Select structural grids, levels, linked CAD files, or linked Revit models.',
      'Type PN on keyboard — a pin tack icon appears.',
      'Elements are now immovably locked against accidental moves.'
    ],
    bullets: [
      'Select structural grids, levels, linked CAD files, or linked Revit models.',
      'Type PN on keyboard — a pin tack icon appears.',
      'Elements are now immovably locked against accidental moves.'
    ],
    proTip: 'Always pin all structural grids and floor levels as the very first step of any project setup.',
    hashtags: ['#revit', '#revitpin', '#bimcoordination'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-028',
    day: 169,
    software: 'Revit',
    shortcut: 'UP',
    action: 'Unpin Element',
    title: 'UP: Unpin Element',
    category: 'Modify',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Removes the pin constraint from pinned elements so they can be modified or repositioned.',
    steps: [
      'Select the pinned element.',
      'Type UP on keyboard (or click the thumbtack icon).',
      'Element can now be moved or edited.'
    ],
    bullets: [
      'Select the pinned element.',
      'Type UP on keyboard (or click the thumbtack icon).',
      'Element can now be moved or edited.'
    ],
    proTip: 'Turn off Select Pinned Elements in the bottom right corner toggle to prevent accidentally highlighting pinned links.',
    hashtags: ['#revit', '#revitunpin', '#bimtips'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-029',
    day: 170,
    software: 'Revit',
    shortcut: 'DE',
    action: 'Delete Element',
    title: 'DE: Delete Element',
    category: 'Modify',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Deletes selected elements from the project without reaching for the Delete key on the far right.',
    steps: [
      'Select any model, annotation, or view element.',
      'Type DE on your left hand.',
      'Element is immediately removed from model.'
    ],
    bullets: [
      'Select any model, annotation, or view element.',
      'Type DE on your left hand.',
      'Element is immediately removed from model.'
    ],
    proTip: 'Using DE keeps your right hand on the mouse at all times, avoiding arm strain over a full workday.',
    hashtags: ['#revit', '#revitdelete', '#ergonomics'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-030',
    day: 171,
    software: 'Revit',
    shortcut: 'CS',
    action: 'Create Similar',
    title: 'CS: Create Similar (Revit Superpower)',
    category: 'Modeling & Architecture',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'The single most productive shortcut in Revit. Selects an existing element and immediately activates its tool with identical type, level, and properties.',
    steps: [
      'Click any wall, window, door, detail line, dimension, or duct in your project.',
      'Type CS on keyboard.',
      'Revit instantly launches the exact placement tool with identical type and family parameters ready to draw.'
    ],
    bullets: [
      'Click any wall, window, door, detail line, dimension, or duct in your project.',
      'Type CS on keyboard.',
      'Revit instantly launches the exact placement tool with identical type and family parameters ready to draw.'
    ],
    proTip: 'Never browse through the Type Selector again — just click an existing object and hit CS!',
    hashtags: ['#revit', '#createsimilar', '#bimsuperpower', '#productivity'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-031',
    day: 172,
    software: 'Revit',
    shortcut: 'MA',
    action: 'Match Type Properties',
    title: 'MA: Match Type Properties',
    category: 'Modify',
    phase: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Copies type and graphic properties from a source element to target elements across the view.',
    steps: [
      'Type MA on keyboard (paintbrush cursor appears).',
      'Click the SOURCE element with the desired type/properties.',
      'Click one or more TARGET elements to convert them instantly.'
    ],
    bullets: [
      'Type MA on keyboard (paintbrush cursor appears).',
      'Click the SOURCE element with the desired type/properties.',
      'Click one or more TARGET elements to convert them instantly.'
    ],
    proTip: 'Works seamlessly across walls, windows, doors, lines, dimensions, and text notes.',
    hashtags: ['#revit', '#matchproperties', '#revittips'],
    status: 'pending',
    posted: false
  },

  // --- ANNOTATION & DIMENSIONS ---
  {
    id: 'RV-032',
    day: 173,
    software: 'Revit',
    shortcut: 'DI',
    action: 'Aligned Dimension',
    title: 'DI: Aligned Dimension',
    category: 'Annotation',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Places aligned dimensions between parallel wall faces, grid lines, reference planes, or component edges.',
    steps: [
      'Type DI on keyboard.',
      'In Options Bar, choose Wall Centerlines or Wall Faces.',
      'Click references in sequence, then click in empty space to drop the dimension string.'
    ],
    bullets: [
      'Type DI on keyboard.',
      'In Options Bar, choose Wall Centerlines or Wall Faces.',
      'Click references in sequence, then click in empty space to drop the dimension string.'
    ],
    proTip: 'Click the EQ symbol that appears above the dimension string to equalize room bays or window spacing automatically!',
    hashtags: ['#revit', '#revitdimensions', '#equalize'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-033',
    day: 174,
    software: 'Revit',
    shortcut: 'TX',
    action: 'Text Annotation',
    title: 'TX: Place Text Note',
    category: 'Annotation',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Places multiline text annotations with optional leader arrows and alignment options.',
    steps: [
      'Type TX on keyboard.',
      'Select text style and leader type (straight, curved, or none) from ribbon.',
      'Click to place leader point, click for knee, and type your note.'
    ],
    bullets: [
      'Type TX on keyboard.',
      'Select text style and leader type (straight, curved, or none) from ribbon.',
      'Click to place leader point, click for knee, and type your note.'
    ],
    proTip: 'Revit text notes have a spell-checker! Press F7 while typing to check spelling.',
    hashtags: ['#revit', '#revittext', '#bimannotation'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-034',
    day: 175,
    software: 'Revit',
    shortcut: 'TG',
    action: 'Tag by Category',
    title: 'TG: Tag by Category',
    category: 'Annotation',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Applies intelligent BIM category tags to walls, doors, windows, structural framing, or MEP equipment.',
    steps: [
      'Type TG on keyboard.',
      'Hover over any model element — the preview tag appears.',
      'Click to drop tag with leader line.'
    ],
    bullets: [
      'Type TG on keyboard.',
      'Hover over any model element — the preview tag appears.',
      'Click to drop tag with leader line.'
    ],
    proTip: 'Check Leader in Options Bar and set a standard 6mm leader length for consistent drawing presentation.',
    hashtags: ['#revit', '#tagbycategory', '#revittags'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-035',
    day: 176,
    software: 'Revit',
    shortcut: 'FR',
    action: 'Find / Replace',
    title: 'FR: Find and Replace Text',
    category: 'Annotation',
    phase: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Searches for and batch replaces text across text notes, schedules, and view names in the entire project.',
    steps: [
      'Type FR on keyboard.',
      'Enter Find text and Replace text.',
      'Choose scope: Current View or Entire Project, then click Replace All.'
    ],
    bullets: [
      'Type FR on keyboard.',
      'Enter Find text and Replace text.',
      'Choose scope: Current View or Entire Project, then click Replace All.'
    ],
    proTip: 'Saves hours during project handover when standard abbreviations or client names are updated.',
    hashtags: ['#revit', '#findreplace', '#batchoperations'],
    status: 'pending',
    posted: false
  },

  // --- VIEWS & VISIBILITY ---
  {
    id: 'RV-036',
    day: 177,
    software: 'Revit',
    shortcut: 'PP / PR',
    action: 'Toggle Properties Palette',
    title: 'PP / PR: Properties Palette Toggle',
    category: 'Views & Visibility',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Toggles the Properties Palette on or off to reclaim screen real estate on single-monitor setups.',
    steps: [
      'Type PP or PR on keyboard.',
      'The Properties Palette instantly hides or restores.'
    ],
    bullets: [
      'Type PP or PR on keyboard.',
      'The Properties Palette instantly hides or restores.'
    ],
    proTip: 'If your Properties palette ever disappears from the screen, PP restores it immediately.',
    hashtags: ['#revit', '#revitproperties', '#revitui'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-037',
    day: 178,
    software: 'Revit',
    shortcut: 'KS',
    action: 'Keyboard Shortcuts Dialog',
    title: 'KS: Keyboard Shortcuts Customizer',
    category: 'Productivity',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Opens the Revit Keyboard Shortcuts dialog to search, reassign, or export your custom shortcuts.',
    steps: [
      'Type KS on keyboard.',
      'Search for any tool command in the search bar.',
      'Enter new keys under Press new keys and click Assign.'
    ],
    bullets: [
      'Type KS on keyboard.',
      'Search for any tool command in the search bar.',
      'Enter new keys under Press new keys and click Assign.'
    ],
    proTip: 'You can export your shortcuts to an XML file to sync across all company workstations.',
    hashtags: ['#revit', '#revitshortcuts', '#keyboardshortcuts'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-038',
    day: 179,
    software: 'Revit',
    shortcut: 'WT',
    action: 'Tile Windows',
    title: 'WT: Tile Windows',
    category: 'Views & Visibility',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Arranges all currently open view tabs side-by-side in tiled window panes.',
    steps: [
      'Open a floor plan, section, and 3D view.',
      'Type WT on keyboard.',
      'Revit tiles all three views side-by-side simultaneously.'
    ],
    bullets: [
      'Open a floor plan, section, and 3D view.',
      'Type WT on keyboard.',
      'Revit tiles all three views side-by-side simultaneously.'
    ],
    proTip: 'Move an object in the plan view and watch it update live in your 3D view and section in real time!',
    hashtags: ['#revit', '#tilewindows', '#multiview'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-039',
    day: 180,
    software: 'Revit',
    shortcut: 'TW',
    action: 'Tab Views',
    title: 'TW: Tab Views (Full Screen)',
    category: 'Views & Visibility',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Restores tiled windows back into a clean tabbed view interface across the top ribbon.',
    steps: [
      'While in tiled window mode, type TW.',
      'Revit consolidates all view panes back into full-screen tabs.'
    ],
    bullets: [
      'While in tiled window mode, type TW.',
      'Revit consolidates all view panes back into full-screen tabs.'
    ],
    proTip: 'Use WT for multi-view coordination and TW when you need maximum canvas area for drafting.',
    hashtags: ['#revit', '#tabviews', '#workspacesetup'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-040',
    day: 181,
    software: 'Revit',
    shortcut: 'ZE',
    action: 'Zoom to Fit (Zoom Extents)',
    title: 'ZE: Zoom to Fit (Extents)',
    category: 'Views & Visibility',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Zooms the active view so that all visible model elements fit comfortably inside the window.',
    steps: [
      'Type ZE on keyboard (or double-click the mouse wheel).',
      'The entire model immediately centers and scales to view.'
    ],
    bullets: [
      'Type ZE on keyboard (or double-click the mouse wheel).',
      'The entire model immediately centers and scales to view.'
    ],
    proTip: 'If Zoom Extents zooms way too far out, an accidental object is floating kilometers away in space — locate and delete it!',
    hashtags: ['#revit', '#zoomtofit', '#revitnavigation'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-041',
    day: 182,
    software: 'Revit',
    shortcut: 'VV / VG',
    action: 'Visibility / Graphics Overrides',
    title: 'VV / VG: Visibility/Graphics Overrides',
    category: 'Views & Visibility',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Opens the Visibility/Graphic Overrides dialog to control category visibilities, cut patterns, halftone, and filters.',
    steps: [
      'Type VV or VG in active view.',
      'Toggle visibility checkboxes for Model Categories, Annotation, Imported CAD, or View Filters.',
      'Click OK to apply view overrides.'
    ],
    bullets: [
      'Type VV or VG in active view.',
      'Toggle visibility checkboxes for Model Categories, Annotation, Imported CAD, or View Filters.',
      'Click OK to apply view overrides.'
    ],
    proTip: 'If elements are grayed out in VV, a View Template is controlling the view — edit the template or unlink it temporarily.',
    hashtags: ['#revit', '#visibilitygraphics', '#viewtemplates'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-042',
    day: 183,
    software: 'Revit',
    shortcut: 'TL',
    action: 'Thin Lines',
    title: 'TL: Toggle Thin Lines',
    category: 'Views & Visibility',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Toggles all vector line weights on screen to hairline 1-pixel thickness for microscopic precision drafting.',
    steps: [
      'Type TL on keyboard.',
      'All heavy wall cuts and line weights shrink to hairline.',
      'Type TL again to restore true print line thicknesses.'
    ],
    bullets: [
      'Type TL on keyboard.',
      'All heavy wall cuts and line weights shrink to hairline.',
      'Type TL again to restore true print line thicknesses.'
    ],
    proTip: 'Always toggle TL on when aligning tight millwork, structural connections, or tiny wall offsets.',
    hashtags: ['#revit', '#thinlines', '#revitprecision'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-043',
    day: 184,
    software: 'Revit',
    shortcut: 'HH',
    action: 'Temporary Hide Element',
    title: 'HH: Temporary Hide Element',
    category: 'Views & Visibility',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Hides selected element(s) temporarily with cyan glasses border; does NOT affect sheet prints.',
    steps: [
      'Select one or more elements (e.g. Roof or Wall).',
      'Type HH on keyboard.',
      'Selected elements vanish and a cyan border surrounds the view.'
    ],
    bullets: [
      'Select one or more elements (e.g. Roof or Wall).',
      'Type HH on keyboard.',
      'Selected elements vanish and a cyan border surrounds the view.'
    ],
    proTip: 'Temporary hide is 100% safe — even if you forget to reset it, temporary hides never show up on exported PDFs.',
    hashtags: ['#revit', '#hideelements', '#revitviews'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-044',
    day: 185,
    software: 'Revit',
    shortcut: 'HI',
    action: 'Temporary Isolate Element',
    title: 'HI: Temporary Isolate Element',
    category: 'Views & Visibility',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Hides everything in the view EXCEPT the selected element(s) for focused work.',
    steps: [
      'Select elements you want to inspect (e.g. complex stair).',
      'Type HI on keyboard.',
      'All other model objects disappear temporarily.'
    ],
    bullets: [
      'Select elements you want to inspect (e.g. complex stair).',
      'Type HI on keyboard.',
      'All other model objects disappear temporarily.'
    ],
    proTip: 'Perfect for inspecting complex stairs, structural trusses, or mechanical risers without visual clutter.',
    hashtags: ['#revit', '#isolateelements', '#revitinspection'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-045',
    day: 186,
    software: 'Revit',
    shortcut: 'HC',
    action: 'Temporary Hide Category',
    title: 'HC: Temporary Hide Category',
    category: 'Views & Visibility',
    phase: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Temporarily hides every element in the active view that belongs to the selected category.',
    steps: [
      'Click one furniture piece, door, or curtain wall.',
      'Type HC on keyboard.',
      'Every single object in that category vanishes instantly from view.'
    ],
    bullets: [
      'Click one furniture piece, door, or curtain wall.',
      'Type HC on keyboard.',
      'Every single object in that category vanishes instantly from view.'
    ],
    proTip: 'Faster than opening Visibility/Graphics dialog when you just want to turn off furniture or ceilings.',
    hashtags: ['#revit', '#hidecategory', '#quickvisibility'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-046',
    day: 187,
    software: 'Revit',
    shortcut: 'IC',
    action: 'Temporary Isolate Category',
    title: 'IC: Temporary Isolate Category',
    category: 'Views & Visibility',
    phase: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Isolates the entire selected category, hiding all other categories across the view.',
    steps: [
      'Select a structural column or beam.',
      'Type IC on keyboard.',
      'Only columns or framing remain visible across the whole model.'
    ],
    bullets: [
      'Select a structural column or beam.',
      'Type IC on keyboard.',
      'Only columns or framing remain visible across the whole model.'
    ],
    proTip: 'Great for quickly reviewing structural framing continuity across multi-story buildings.',
    hashtags: ['#revit', '#isolatecategory', '#structuralreview'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-047',
    day: 188,
    software: 'Revit',
    shortcut: 'HR',
    action: 'Reset Temporary Hide/Isolate',
    title: 'HR: Reset Temporary Hide/Isolate',
    category: 'Views & Visibility',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Restores all temporarily hidden and isolated elements back to standard view visibility.',
    steps: [
      'Type HR on keyboard while cyan glasses border is active.',
      'All hidden elements return and cyan border turns off.'
    ],
    bullets: [
      'Type HR on keyboard while cyan glasses border is active.',
      'All hidden elements return and cyan border turns off.'
    ],
    proTip: 'Memorize the pair: HH (Hide) and HR (Reset) — you will use them 50+ times every single day.',
    hashtags: ['#revit', '#resethide', '#essentialrevit'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-048',
    day: 189,
    software: 'Revit',
    shortcut: 'RH',
    action: 'Toggle Reveal Hidden Elements',
    title: 'RH: Reveal Hidden Elements Mode',
    category: 'Views & Visibility',
    phase: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Toggles the magenta Reveal Hidden Elements mode, displaying all permanently hidden elements in bright magenta.',
    steps: [
      'Type RH on keyboard (or click lightbulb icon on bottom bar).',
      'Screen acquires magenta border, showing permanently hidden items in magenta.',
      'Select hidden items and right click -> Unhide in View -> Elements, then type RH again to exit.'
    ],
    bullets: [
      'Type RH on keyboard (or click lightbulb icon on bottom bar).',
      'Screen acquires magenta border, showing permanently hidden items in magenta.',
      'Select hidden items and right click -> Unhide in View -> Elements, then type RH again to exit.'
    ],
    proTip: 'Whenever an element is mysteriously missing in a view, press RH first before checking worksets or phases.',
    hashtags: ['#revit', '#revealhidden', '#troubleshooting'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-049',
    day: 190,
    software: 'Revit',
    shortcut: 'EH',
    action: 'Hide in View: Elements (Permanent)',
    title: 'EH: Hide Elements in View',
    category: 'Views & Visibility',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Permanently hides selected elements in the active view (persists on printed sheets and PDF exports).',
    steps: [
      'Select elements to hide permanently in this specific view.',
      'Type EH on keyboard.',
      'Elements disappear without triggering temporary glasses mode.'
    ],
    bullets: [
      'Select elements to hide permanently in this specific view.',
      'Type EH on keyboard.',
      'Elements disappear without triggering temporary glasses mode.'
    ],
    proTip: 'Use EH for presentation drawings to remove rogue model elements from a specific sheet view.',
    hashtags: ['#revit', '#hideelements', '#revitpresentation'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-050',
    day: 191,
    software: 'Revit',
    shortcut: 'VH',
    action: 'Hide in View: Category (Permanent)',
    title: 'VH: Hide Category in View',
    category: 'Views & Visibility',
    phase: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Permanently turns off the entire category in the active view without opening the VV dialog.',
    steps: [
      'Select one element belonging to the category (e.g. Scope Boxes or Survey Points).',
      'Type VH on keyboard.',
      'The entire category is turned off in Visibility/Graphics overrides for this view.'
    ],
    bullets: [
      'Select one element belonging to the category (e.g. Scope Boxes or Survey Points).',
      'Type VH on keyboard.',
      'The entire category is turned off in Visibility/Graphics overrides for this view.'
    ],
    proTip: 'Fastest way to turn off annoying survey points or internal origin markers in plan views.',
    hashtags: ['#revit', '#hidecategory', '#drawingcleanup'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-051',
    day: 192,
    software: 'Revit',
    shortcut: 'BX',
    action: 'Selection Box (3D Crop)',
    title: 'BX: 3D Selection Box',
    category: 'Views & Visibility',
    phase: 'Advanced',
    difficulty: 'Advanced',
    description: 'Opens default 3D view and automatically tight-crops a section box directly around the selected elements.',
    steps: [
      'In plan, section, or elevation, select elements (e.g. a complex beam-column node or stair).',
      'Type BX on keyboard.',
      'Revit immediately jumps to 3D view with section box isolating only those elements in 3D.'
    ],
    bullets: [
      'In plan, section, or elevation, select elements (e.g. a complex beam-column node or stair).',
      'Type BX on keyboard.',
      'Revit immediately jumps to 3D view with section box isolating only those elements in 3D.'
    ],
    proTip: 'The absolute fastest way to inspect 3D clash conditions without adjusting section box grips manually.',
    hashtags: ['#revit', '#selectionbox', '#3dbim', '#clashdetection'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-052',
    day: 193,
    software: 'Revit',
    shortcut: 'SA',
    action: 'Select All Instances',
    title: 'SA: Select All Instances',
    category: 'Productivity',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Selects every instance of the selected family type visible in the active view.',
    steps: [
      'Click one instance of any door, window, wall, or tag.',
      'Type SA on keyboard.',
      'Every identical instance in the view is selected at once.'
    ],
    bullets: [
      'Click one instance of any door, window, wall, or tag.',
      'Type SA on keyboard.',
      'Every identical instance in the view is selected at once.'
    ],
    proTip: 'Right click -> Select All Instances in Entire Project lets you change family types across 50 floors simultaneously.',
    hashtags: ['#revit', '#selectall', '#batchselection'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-053',
    day: 194,
    software: 'Revit',
    shortcut: 'GP',
    action: 'Group Elements',
    title: 'GP: Create Model/Detail Group',
    category: 'Modeling & Architecture',
    phase: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Bundles selected elements into an intelligent modular Group that updates across all floors.',
    steps: [
      'Select repeating elements (e.g. hotel room layout or toilet pod).',
      'Type GP on keyboard.',
      'Name your group (e.g. Type-A Hotel Suite) and click OK.'
    ],
    bullets: [
      'Select repeating elements (e.g. hotel room layout or toilet pod).',
      'Type GP on keyboard.',
      'Name your group (e.g. Type-A Hotel Suite) and click OK.'
    ],
    proTip: 'Editing any group instance updates all other 100 instances in the building automatically.',
    hashtags: ['#revit', '#revitgroups', '#modularbim'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-054',
    day: 195,
    software: 'Revit',
    shortcut: 'EG',
    action: 'Edit Group',
    title: 'EG: Edit Group',
    category: 'Modeling & Architecture',
    phase: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Enables group edit mode to add, remove, or modify elements inside an existing group.',
    steps: [
      'Select group and type EG.',
      'Make design changes, add or remove elements using ribbon buttons.',
      'Click Finish to apply changes across all instances.'
    ],
    bullets: [
      'Select group and type EG.',
      'Make design changes, add or remove elements using ribbon buttons.',
      'Click Finish to apply changes across all instances.'
    ],
    proTip: 'Avoid hosting face-based families inside groups across different levels to prevent group corruption warnings.',
    hashtags: ['#revit', '#editgroup', '#bimworkflow'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-055',
    day: 196,
    software: 'Revit',
    shortcut: 'UG',
    action: 'Ungroup',
    title: 'UG: Ungroup Elements',
    category: 'Modeling & Architecture',
    phase: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Explodes a group instance back into individual standalone model elements.',
    steps: [
      'Select the group instance.',
      'Type UG on keyboard.',
      'The group is unlinked and elements become standalone.'
    ],
    bullets: [
      'Select the group instance.',
      'Type UG on keyboard.',
      'The group is unlinked and elements become standalone.'
    ],
    proTip: 'Use UG when a specific room needs custom modifications that should not propagate to standard typical rooms.',
    hashtags: ['#revit', '#ungroup', '#revitmodeling'],
    status: 'pending',
    posted: false
  },

  // --- PYREVIT AUTOMATION & PRODUCTIVITY ---
  {
    id: 'RV-056',
    day: 197,
    software: 'Revit',
    shortcut: 'E0',
    action: 'pyRevit Reload Extension',
    title: 'E0: pyRevit Reload Extension',
    category: 'pyRevit Automation',
    phase: 'Expert',
    difficulty: 'Expert',
    description: 'Hot-reloads all pyRevit Python scripts, ribbon extensions, and custom tabs without restarting Revit.',
    steps: [
      'Assign E0 in Keyboard Shortcuts (KS) to pyRevit -> Reload.',
      'Edit your LUDARP pyRevit python script in VS Code / notepad.',
      'Switch to Revit and type E0 — the entire ribbon and scripts reload in 2 seconds.'
    ],
    bullets: [
      'Assign E0 in Keyboard Shortcuts (KS) to pyRevit -> Reload.',
      'Edit your LUDARP pyRevit python script in VS Code / notepad.',
      'Switch to Revit and type E0 — the entire ribbon and scripts reload in 2 seconds.'
    ],
    proTip: 'The #1 productivity shortcut for pyRevit developers and BIM managers writing automated ribbon tools.',
    hashtags: ['#pyrevit', '#revitautomation', '#revitapi', '#pythonforrevit'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-057',
    day: 198,
    software: 'Revit',
    shortcut: 'MD',
    action: 'Modify / Cancel Command',
    title: 'MD: Modify Tool (Safe Escape)',
    category: 'Productivity',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Exits any active command and returns cursor to selection mode (same as pressing Esc twice).',
    steps: [
      'While inside any active tool, type MD on keyboard.',
      'Tool cancels cleanly and returns to select pointer.'
    ],
    bullets: [
      'While inside any active tool, type MD on keyboard.',
      'Tool cancels cleanly and returns to select pointer.'
    ],
    proTip: 'Keep your left hand on MD to quickly exit sketch modes or command chains without lifting your hand.',
    hashtags: ['#revit', '#revitmodify', '#draftingtips'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-058',
    day: 199,
    software: 'Revit',
    shortcut: 'Tab Key',
    action: 'Cycle Selection & Chain Select',
    title: 'Tab: Cycle Selection & Chain Walls',
    category: 'Productivity',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Cycles through overlapping elements, detects wall endpoints, and chain-selects connected geometry.',
    steps: [
      'Hover cursor over any wall in a closed building loop.',
      'Press Tab once — the entire perimeter highlights blue.',
      'Click to select all connected walls simultaneously.'
    ],
    bullets: [
      'Hover cursor over any wall in a closed building loop.',
      'Press Tab once — the entire perimeter highlights blue.',
      'Click to select all connected walls simultaneously.'
    ],
    proTip: 'When elements are stacked on top of each other, keep tapping Tab until the status bar confirms your target item.',
    hashtags: ['#revit', '#tabkey', '#chainselect', '#revitsuperpower'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-059',
    day: 200,
    software: 'Revit',
    shortcut: 'Spacebar',
    action: 'Flip Orientation & Rotate',
    title: 'Spacebar: Flip Wall/Door & Rotate 90°',
    category: 'Productivity',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Flips door swing, toggles wall exterior/interior faces, and rotates families by 90 degrees or aligns to angled walls.',
    steps: [
      'Hover component near an angled wall and press Spacebar — it snaps flush to the wall angle.',
      'Select any placed door and press Spacebar to flip its swing hand.',
      'Select any wall and press Spacebar to flip exterior face.'
    ],
    bullets: [
      'Hover component near an angled wall and press Spacebar — it snaps flush to the wall angle.',
      'Select any placed door and press Spacebar to flip its swing hand.',
      'Select any wall and press Spacebar to flip exterior face.'
    ],
    proTip: 'Hovering a desk near a 37-degree angled wall and tapping Spacebar aligns the desk to exactly 37 degrees instantly!',
    hashtags: ['#revit', '#spacebar', '#revittricks'],
    status: 'pending',
    posted: false
  },
  {
    id: 'RV-060',
    day: 201,
    software: 'Revit',
    shortcut: 'Shift + Scroll',
    action: 'Orbit in 3D View',
    title: 'Shift + Scroll Click: Free 3D Orbit',
    category: 'Views & Visibility',
    phase: 'Basics',
    difficulty: 'Beginner',
    description: 'Smoothly orbits your 3D model around a selected focal point without needing the ViewCube.',
    steps: [
      'In any 3D view, click an element you want as the center of rotation.',
      'Hold Shift and hold down the middle mouse wheel.',
      'Drag mouse to orbit freely around that exact element.'
    ],
    bullets: [
      'In any 3D view, click an element you want as the center of rotation.',
      'Hold Shift and hold down the middle mouse wheel.',
      'Drag mouse to orbit freely around that exact element.'
    ],
    proTip: 'Always select an object first before Shift+Orbit so Revit orbits around that specific object instead of the universe origin!',
    hashtags: ['#revit', '#3dorbit', '#revitnavigation'],
    status: 'pending',
    posted: false
  }
];

// Automatically register into window.ludarpDatabase if loaded
if (typeof window !== 'undefined' && window.ludarpDatabase) {
  if (Array.isArray(window.ludarpDatabase.shortcuts)) {
    // Avoid double-pushing if script is loaded multiple times
    const existingIds = new Set(window.ludarpDatabase.shortcuts.map(s => s.id));
    revitShortcutsData.forEach(item => {
      if (!existingIds.has(item.id)) {
        window.ludarpDatabase.shortcuts.push(item);
        if (Array.isArray(window.ludarpDatabase.calendar)) {
          window.ludarpDatabase.calendar.push(item);
        }
      }
    });
  }
}

// Support CommonJS / Node environment for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = revitShortcutsData;
}
