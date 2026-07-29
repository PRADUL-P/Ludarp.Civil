# PHASE 3.5: "ONE COMMAND INSTEAD OF THREE" — Workflow Compression Tips (Days 61-70)
### Slots in right after Phase 3 (Advanced), before moving to Revit

**Theme:** Every post highlights a command that replaces 2+ manual steps with a single action — strong "wait, I didn't know that" hook for reels.

**Format key:** 🎠 Carousel | 🎥 Reel/Screen recording | 🖼️ Single image

---

## Week 13 (Days 61-65)

### Day 61 🎥 — ALIGN: Move + Rotate + Scale in One Command
**Script:** Show manually moving an object, then rotating it, then scaling it to fit a reference — 3 separate commands. Cut to: ALIGN, pick source/destination points, done in one action.
**Caption:** Stop doing move → rotate → scale separately. ALIGN (AL) does all three in one command.
**Hashtags:** #autocad #align #cadhacks #drafting #workflowtips

---

### Day 62 🎥 — REFEDIT: Edit a Block Without Exploding It
**Script:** Show the old way — EXPLODE → edit geometry → re-BLOCK → re-insert everywhere. Cut to: REFEDIT, double-click the block, edit in place, save back — done.
**Caption:** Never explode a block just to fix one line again.
**Hashtags:** #autocad #refedit #cadhacks #blocks #drafting

---

### Day 63 🎠 — MEASUREGEOM: One Command, All Measurements
**Caption:** Stop switching between DIST, AREA, and separate radius checks. **MEASUREGEOM** gives you distance, radius, angle, area, AND volume — all from one command with sub-options.
**Hashtags:** #autocad #measuregeom #cadtips #drafting #workflowtips

---

### Day 64 🎥 — SCALE & ROTATE: The "Reference" Option Nobody Uses
**Script:** Show manually calculating a scale ratio or rotation angle with a calculator first. Cut to: SCALE/ROTATE → Reference option → pick two points → AutoCAD calculates the ratio/angle for you automatically.
**Caption:** Stop doing math before you scale or rotate. Let AutoCAD do it.
**Hashtags:** #autocad #scalecommand #rotatecommand #cadhacks #drafting

---

### Day 65 🖼️ — Hidden Feature: BLOCKREPLACE
**Caption:** Need to swap every instance of an old block (like an outdated symbol) with a new one? **BLOCKREPLACE** does it project-wide in one command — no manual delete-and-reinsert for every instance.
**Hashtags:** #autocad #blockreplace #cadefficiency #drafting

---

## Week 14 (Days 66-70)

### Day 66 🎥 — FILLET/CHAMFER at Radius 0: Instant Clean Corners
**Script:** Show trimming and extending two lines manually to form a corner. Cut to: FILLET with radius set to 0, click both lines, instant clean corner in one click.
**Caption:** Stop trim-and-extending corners. Set fillet radius to 0 and just click both lines.
**Hashtags:** #autocad #fillet #cadhacks #drafting #workflowtips

---

### Day 67 🎠 — MULTIPLE: Repeat Any Command Without Re-Pressing Enter
**Caption:** Placing 20 circles or blocks one at a time? Type **MULTIPLE** before your command (e.g., "MULTIPLE CIRCLE") and it repeats automatically after each placement — no need to hit Enter or retype the command every time.
**Hashtags:** #autocad #multiplecommand #cadtips #drafting

---

### Day 68 🎥 — Copy/Paste with Base Point: One Action, Not Three
**Script:** Show the old way — set a base point, copy, switch drawings, paste, manually reposition. Cut to: Ctrl+Shift+C (copy with base point) → Ctrl+Shift+V (paste at correct point) — perfectly placed in one motion across drawings.
**Caption:** Copying between drawings? This shortcut saves the repositioning step entirely.
**Hashtags:** #autocad #copypaste #cadhacks #drafting #workflowtips

---

### Day 69 🎠 — More Workflow-Compression Commands
**Caption:** A few more "does 2-3 things at once" commands to add to your list:
- **PEDIT with Multiple option** – join AND smooth multiple polylines in one command, instead of joining then curve-fitting separately
- **OFFSET with Multiple option** – offset the same object several times at once instead of repeating the command
- **MATCHPROP with settings toggles** – copy only specific properties (like just layer, not linetype) instead of resetting each manually
- **STRETCH with crossing window** – moves and resizes in one action depending on what's captured, instead of separate move + resize steps
**Hashtags:** #autocad #cadworkflow #drafting #cadhacks #productivitytips

---

### Day 69.5 🎥 — NCOPY: Copy One Element Straight Out of a Block or Xref
**Script:** Show the old way — explode the entire block/xref just to grab one line or symbol, then rebuild everything afterward. Cut to: type **NCOPY**, click the single nested object inside the block/xref, place it — it copies out as an independent object, while the block and xref stay fully intact.
**Caption:** You don't need to explode a block or xref to steal one piece of it. NCOPY grabs a nested object directly — done in one command.
**Hashtags:** #autocad #ncopy #cadhacks #blocks #xref #drafting #workflowtips

---

### Day 70 🎠 — "One Command Instead of Three" — Full Recap
**Caption:** Every workflow-compression tip from this module, compiled in one graphic. These are the tips that separate a fast drafter from a slow one. Save this. 📸
*(Include a compiled grid graphic of all commands from Days 61-69.5)*
**Hashtags:** #autocad #cadmastery #drafting #savethispost #workflowtips

---

## Week 15 (Days 71-75): More "Nobody Told Me This Existed" Commands

### Day 71 🎥 — CHSPACE: Move Objects Between Model Space & Paper Space Instantly
**Script:** Show the old way — manually redrawing or copy-pasting an object from model space into a layout, then recalculating scale by hand. Cut to: select the object, type **CHSPACE**, and it moves between model/paper space with the scale automatically corrected.
**Caption:** Stop manually recalculating scale when moving objects between model space and a layout. CHSPACE does it in one command.
**Hashtags:** #autocad #chspace #cadhacks #drafting #workflowtips

---

### Day 72 🎥 — BURST: Explode a Block Without Losing Attribute Values
**Script:** Show the old way — EXPLODE on a block with attributes, and the actual filled-in values (like a door tag number) disappear, leaving only the tag prompt. Cut to: **BURST**, same block, but the attribute values convert into real text and survive.
**Caption:** Never use EXPLODE on an attributed block again. BURST keeps the actual values intact.
**Hashtags:** #autocad #burst #cadhacks #blocks #drafting

---

### Day 73 🎠 — SCALETEXT & JUSTIFYTEXT: Resize/Realign Text Without Moving It
**Caption:** Two commands that fix a text formatting headache in one step:
- **SCALETEXT** – resize multiple text objects to a new height without manually repositioning each one
- **JUSTIFYTEXT** – change text justification (left/center/right/etc.) without the text jumping to a new location
**Hashtags:** #autocad #scaletext #justifytext #cadtips #drafting

---

### Day 74 🎠 — MLEADERALIGN & DIMBREAK: Auto-Clean Your Annotations
**Caption:** Stop manually nudging things into place:
- **MLEADERALIGN** – select multiple leaders and align them all in one command, instead of dragging each one individually
- **DIMBREAK** – automatically adds a gap where a dimension line crosses another object or dimension, instead of manually trimming it
**Hashtags:** #autocad #mleaderalign #dimbreak #cadhacks #drafting

---

### Day 75 🎠 — OOPS, SETBYLAYER & FIND: Quiet Time-Savers
**Caption:** Three more one-command fixes worth knowing:
- **OOPS** – restores your last erased object, even after running other commands in between (unlike UNDO, which reverses everything since)
- **SETBYLAYER** – forces all selected objects' color/linetype/lineweight to ByLayer in one command, instead of fixing each property manually
- **FIND** – find and replace text across an entire drawing, including text buried inside blocks
**Hashtags:** #autocad #oops #setbylayer #find #cadhacks #drafting

---

### Day 76 🎠 — "Nobody Told Me This Existed" — Full Recap
**Caption:** Every hidden-gem command from Days 71-75, compiled in one graphic. These are the commands almost nobody gets taught in school. Save this. 📸
**Hashtags:** #autocad #cadmastery #drafting #savethispost #workflowtips

---

## Week 16 (Days 77-81): Data Extraction & 3D-to-2D Shortcuts

### Day 77 🎥 — DATAEXTRACTION: Auto-Pull Block Data Into a Table
**Script:** Show the old way — manually counting every door/window block instance and typing counts into a schedule by hand. Cut to: **DATAEXTRACTION**, run the wizard, select block properties, and it generates a complete schedule (or exports to Excel) automatically.
**Caption:** Stop manually counting blocks for schedules. DATAEXTRACTION builds the table for you.
**Hashtags:** #autocad #dataextraction #cadhacks #drafting #civilengineering

---

### Day 78 🎠 — SOLPROF & FLATSHOT: Auto-Generate 2D Lines From a 3D Model
**Caption:** Stop manually tracing outlines from a 3D view:
- **SOLPROF** – generates clean 2D profile lines of a 3D solid for the current view automatically
- **FLATSHOT** – flattens an entire 3D model into a 2D line drawing based on the current viewpoint, in one command
**Hashtags:** #autocad #solprof #flatshot #3dto2d #cadhacks

---

### Day 79 🖼️ — Hidden Feature: MASSPROP
**Caption:** Need area, volume, centroid, or moment of inertia for a solid or region? **MASSPROP** calculates all of it instantly — no manual formulas or exporting to a spreadsheet.
**Hashtags:** #autocad #massprop #cadtips #structuralengineering

---

### Day 80 🎠 — SELECTSIMILAR & ISOLATEOBJECTS: Smarter Selection in One Click
**Caption:** Two commands that replace manual multi-object selection:
- **SELECTSIMILAR** – right-click an object and instantly select every other object in the drawing with matching properties (same layer, type, etc.)
- **ISOLATEOBJECTS** – isolate specific objects on screen regardless of what layer they're on, without touching layer settings at all (pairs with UNISOLATEOBJECTS to restore)
**Hashtags:** #autocad #selectsimilar #isolateobjects #cadhacks #drafting

---

### Day 81 🎠 — THICKEN & CONVTOSOLID: Instant Solid Conversion
**Caption:** Stop rebuilding geometry from scratch:
- **THICKEN** – turns a flat surface into a 3D solid with a set thickness, in one command
- **CONVTOSOLID** – converts eligible meshes or surfaces directly into solids, instead of manually remodeling them
**Hashtags:** #autocad3d #thicken #convtosolid #cadhacks #advancedcad

---

### Day 82 🎠 — Full Series Master Recap
**Caption:** From Day 1 to Day 81 — every command, shortcut, and workflow trick covered across 2D, 3D, Advanced, and Workflow Compression. This is the complete AutoCAD reference. Save this post. 📸
**Hashtags:** #autocad #cadmastery #drafting #savethispost

---

## Updated Full Series Overview

| Phase | Focus | Days | Content |
|---|---|---|---|
| 1 | Complete 2D | 1-40 | ~95 commands (drawing, editing, layers, dimensions, blocks, xrefs, data, parametric, output) |
| 2 | Complete 3D | 41-45 | ~20 commands (solids, editing, booleans, sectioning) |
| 3 | Advanced / Power-user | 46-60 | Customization, automation, LISP intro, Express Tools, collaboration, standards, sheet set mastery |
| 3.5 | Workflow Compression ("1 command instead of 3") | 61-82 | ALIGN, REFEDIT, MEASUREGEOM, Reference option, BLOCKREPLACE, Fillet-0, MULTIPLE, Copy/Paste base point, NCOPY, PEDIT/OFFSET/MATCHPROP/STRETCH options, CHSPACE, BURST, SCALETEXT, JUSTIFYTEXT, MLEADERALIGN, DIMBREAK, OOPS, SETBYLAYER, FIND, DATAEXTRACTION, SOLPROF, FLATSHOT, MASSPROP, SELECTSIMILAR, ISOLATEOBJECTS, THICKEN, CONVTOSOLID |

**Total: 82 days, ~163+ distinct commands/features/workflows.**

This module (3.5) is a strong recurring content type even beyond Day 70 — every time you learn or notice a "combo" command while drafting, it can become a one-off post between other series. Worth keeping as an ongoing content bucket, not just a one-time module.

After Day 70, the account has a complete AutoCAD foundation (2D → 3D → Advanced → Workflow Compression) and is ready to start the same structure for Revit.
