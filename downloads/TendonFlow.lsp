;;; ============================================================
;;; TendonFlow.lsp
;;; AutoCAD LISP Routine — Draw PT Tendon 2D Drape & 3D Solids
;;; Version: 3.0  |  Compatible: AutoCAD 2016+ (3D requires solids support)
;;; ============================================================
;;; USAGE:
;;;   1. Load this file: AppLoad or drag-drop into AutoCAD.
;;;   2. Run commands:
;;;      - TENDONFLOW     : Draws 2D Elevation Drape profile & lines.
;;;      - TENDONFLOW3D   : Models 3D Slab Solid & Swept Tendon Solids.
;;;      - TENDONFROMLINE : Pick a 2D line/polyline in plan, select JSON, 
;;;                         and generate the 3D swept solid tendon along it.
;;;   3. Select the exported TendonFlow JSON file when prompted.
;;; ============================================================

(vl-load-com) ; Load ActiveX/Visual LISP Support

(defun c:TENDONFLOW ( / fname)
  (princ "\n[TendonFlow] Select TendonFlow JSON design file...")
  (setq fname (getfiled "Select TendonFlow JSON File" "" "json" 0))
  (if (null fname)
    (progn (princ "\n[TendonFlow] Cancelled.") (exit))
  )
  (tf:draw-from-file fname)
  (princ "\n[TendonFlow] Done.")
  (princ)
)

(defun c:TENDONFLOW3D ( / fname)
  (princ "\n[TendonFlow 3D] Select TendonFlow JSON design file...")
  (setq fname (getfiled "Select TendonFlow JSON File" "" "json" 0))
  (if (null fname)
    (progn (princ "\n[TendonFlow 3D] Cancelled.") (exit))
  )
  (tf:draw-3d-model fname)
  (princ "\n[TendonFlow 3D] Done.")
  (princ)
)

(defun c:TENDONFROMLINE ( / selEnt ent fname)
  (princ "\n[TendonFlow] Select a 2D Line, Arc, or Polyline representing the tendon plan trajectory...")
  (setq selEnt (entsel))
  (if (null selEnt)
    (progn (princ "\n[TendonFlow] No entity selected.") (exit))
  )
  (setq ent (car selEnt))

  
  (princ "\n[TendonFlow] Select TendonFlow JSON design file...")
  (setq fname (getfiled "Select TendonFlow JSON File" "" "json" 0))
  (if (null fname)
    (progn (princ "\n[TendonFlow] Cancelled.") (exit))
  )
  
  (tf:create-tendon-from-line fname ent)
  (princ "\n[TendonFlow] Done.")
  (princ)
)

;;; ---- Layer setup ----
(defun tf:ensure-layer (lname lcolor / )
  (if (null (tblsearch "LAYER" lname))
    (progn
      (entmake (list
        (cons 0 "LAYER")
        (cons 100 "AcDbSymbolTableRecord")
        (cons 100 "AcDbLayerTableRecord")
        (cons 2 lname)
        (cons 70 0)
        (cons 62 lcolor)
        (cons 6 "Continuous")
      ))
    )
  )
)

;;; ---- Read file contents into a string ----
(defun tf:read-file (fname / fp line result)
  (setq fp (open fname "r"))
  (if (null fp)
    (progn (princ "\n[TendonFlow] Cannot open file.") (exit))
  )
  (setq result "")
  (while (setq line (read-line fp))
    (setq result (strcat result line))
  )
  (close fp)
  result
)

;;; ---- Find start of n-th occurrence of key ----
(defun tf:find-nth-occurrence (str key n / pos count next-pos)
  (setq pos 0 count 0)
  (while (and (< pos (strlen str)) (< count n))
    (setq next-pos (vl-string-search key str pos))
    (if next-pos
      (progn
        (setq pos (1+ next-pos))
        (setq count (1+ count))
      )
      (setq pos (strlen str)) ; break
    )
  )
  (if (= count n) (1- pos) nil)
)

;;; ---- Parse numbers array from string position ----
(defun tf:parse-array-from-pos (json pos / pos1 pos2 subStrVal nums tok)
  (setq pos1 (vl-string-search "[" json pos))
  (if (null pos1)
    nil
    (progn
      (setq pos2 (vl-string-search "]" json pos1))
      (setq subStrVal (substr json (+ pos1 2) (- pos2 pos1 1)))
      (setq nums '())
      (foreach tok (tf:split-string subStrVal ",")

        (if (/= (vl-string-trim " " tok) "")
          (setq nums (append nums (list (atof (vl-string-trim " " tok)))))
        )
      )
      nums
    )
  )
)

;;; ---- Get supports array for specified row index ----
(defun tf:get-supports-array (json rowIdx / pos)
  (setq pos (tf:find-nth-occurrence json "\"supports\"" (1+ rowIdx)))
  (if pos
    (tf:parse-array-from-pos json pos)
    nil
  )
)

;;; ---- Get low points data for specified row index ----
(defun tf:get-lowpoints (json rowIdx / pos pos1 pos2 subStrVal xFracts ys start nextFract colPos commaPos xVal yPos yColPos bracePos yVal)
  (setq pos (tf:find-nth-occurrence json "\"lowPoints\"" (1+ rowIdx)))
  (setq xFracts '() ys '())
  (if pos
    (progn
      (setq pos1 (vl-string-search "[" json pos))
      (setq pos2 (vl-string-search "]" json pos1))
      (setq subStrVal (substr json (+ pos1 2) (- pos2 pos1 1)))
      (setq start 0)
      (while (setq nextFract (vl-string-search "\"xFract\"" subStrVal start))
        ;; Extract xFract
        (setq colPos (vl-string-search ":" subStrVal nextFract))
        (setq commaPos (vl-string-search "," subStrVal colPos))
        (setq xVal (atof (substr subStrVal (+ colPos 2) (- commaPos colPos 1))))
        (setq xFracts (append xFracts (list xVal)))
        
        ;; Extract y
        (setq yPos (vl-string-search "\"y\"" subStrVal commaPos))
        (setq yColPos (vl-string-search ":" subStrVal yPos))
        (setq bracePos (vl-string-search "}" subStrVal yColPos))
        (setq yVal (atof (substr subStrVal (+ yColPos 2) (- bracePos yColPos 1))))
        (setq ys (append ys (list yVal)))
        
        (setq start bracePos)
      )
    )
  )

  (list xFracts ys)
)

;;; ---- Get plan Y tendons for a span index ----
(defun tf:get-plan-y-tendons (json spanIdx / pos pos1 pos2 subStrVal nums tok j)
  (setq pos (vl-string-search "\"planYTendons\"" json))
  (if pos
    (progn
      (setq pos1 pos)
      (setq j 0)
      (while (<= j spanIdx)
        (setq pos1 (vl-string-search "[" json (1+ pos1)))
        (setq j (1+ j))
      )
      (setq pos2 (vl-string-search "]" json pos1))
      (setq subStrVal (substr json (+ pos1 2) (- pos2 pos1 1)))
      (setq nums '())
      (foreach tok (tf:split-string subStrVal ",")

        (if (/= (vl-string-trim " " tok) "")
          (setq nums (append nums (list (atof (vl-string-trim " " tok)))))
        )
      )
      nums
    )
    nil
  )
)

;;; ---- Minimal JSON number extractor ----
(defun tf:json-get (json key / pos1 pos2 val)
  (setq key (strcat "\"" key "\""))
  (setq pos1 (vl-string-search key json))
  (if (null pos1) (return nil))
  (setq pos1 (+ pos1 (strlen key)))
  (while (or (= (substr json (1+ pos1) 1) " ")
             (= (substr json (1+ pos1) 1) ":"))
    (setq pos1 (1+ pos1))
  )
  (setq pos2 pos1)
  (while (and (< pos2 (strlen json))
              (not (member (substr json (1+ pos2) 1) '("," "}" "]" "\n"))))
    (setq pos2 (1+ pos2))
  )
  (setq val (substr json (1+ pos1) (- pos2 pos1)))
  (atof val)
)

;;; ---- Extract array of numbers after a key ----
(defun tf:json-get-array (json key / pos1 pos2 subStrVal nums tok)
  (setq key (strcat "\"" key "\""))
  (setq pos1 (vl-string-search key json))
  (if (null pos1) (return nil))
  (setq pos1 (vl-string-search "[" json pos1))
  (if (null pos1) (return nil))
  (setq pos2 (vl-string-search "]" json pos1))
  (setq subStrVal (substr json (+ pos1 2) (- pos2 pos1 1)))
  (setq nums '())
  (foreach tok (tf:split-string subStrVal ",")

    (if (/= (vl-string-trim " " tok) "")
      (setq nums (append nums (list (atof (vl-string-trim " " tok)))))
    )
  )
  nums
)

;;; ---- Simple string split ----
(defun tf:split-string (str delim / result part i c)
  (setq result '() part "" i 1)
  (while (<= i (strlen str))
    (setq c (substr str i 1))
    (if (= c delim)
      (progn
        (setq result (append result (list part)))
        (setq part "")
      )
      (setq part (strcat part c))
    )
    (setq i (1+ i))
  )
  (if (/= part "") (setq result (append result (list part))))
  result
)

;;; ---- Evaluates double-quadratic parabola height ----
(defun tf:get-parabola-z (localX L yL yR ym xFract aRatio / xm X1 Y1 b1 xInf a1_low a1_supp dx X2 Y2 b2 a2_low a2_supp)
  (setq xm (* xFract L))
  (if (<= localX xm)
    (progn
      (setq X1 xm)
      (setq Y1 (- yL ym))
      (setq b1 (/ (* aRatio L) X1))
      (if (< b1 0.05) (setq b1 0.05))
      (if (> b1 0.95) (setq b1 0.95))
      (setq xInf (* b1 X1))
      (setq a1_low (/ Y1 (* (- 1.0 b1) X1 X1)))
      (setq a1_supp (/ Y1 (* b1 X1 X1)))
      (if (>= localX xInf)
        (progn
          (setq dx (- xm localX))
          (+ ym (* a1_low dx dx))
        )
        (progn
          (setq dx localX)
          (- yL (* a1_supp dx dx))
        )
      )
    )
    (progn
      (setq X2 (- L xm))
      (setq Y2 (- yR ym))
      (setq b2 (/ (* aRatio L) X2))
      (if (< b2 0.05) (setq b2 0.05))
      (if (> b2 0.95) (setq b2 0.95))
      (setq xInf (- L (* b2 X2)))
      (setq a2_low (/ Y2 (* (- 1.0 b2) X2 X2)))
      (setq a2_supp (/ Y2 (* b2 X2 X2)))
      (if (<= localX xInf)
        (progn
          (setq dx (- localX xm))
          (+ ym (* a2_low dx dx))
        )
        (progn
          (setq dx (- L localX))
          (- yR (* a2_supp dx dx))
        )
      )
    )
  )
)

;;; ---- Generates points list along 3D profile path ----
(defun tf:get-tendon-3d-points (spanLengths supports lowPointsY lowPointsXFract aRatio y_mm / points currentX spanIdx L yL yR ym xFract segments step i localX z pt)
  (setq points '())
  (setq currentX 0.0)
  (setq spanIdx 0)
  (foreach L spanLengths
    (setq yL (nth spanIdx supports))
    (setq yR (nth (1+ spanIdx) supports))
    (setq ym (nth spanIdx lowPointsY))
    (setq xFract (nth spanIdx lowPointsXFract))
    
    (setq segments 40)
    (setq step (/ L segments))
    (setq i 0)
    (while (<= i segments)
      (if (or (> spanIdx 0) (> i 0))
        (progn
          (setq localX (* i step))
          (setq z (tf:get-parabola-z localX L yL yR ym xFract aRatio))
          (setq pt (list (+ currentX localX) y_mm z))
          (setq points (append points (list pt)))
        )
      )
      (setq i (1+ i))
    )
    (setq currentX (+ currentX L))
    (setq spanIdx (1+ spanIdx))
  )
  points
)

;;; ---- Draw 2D drape profile from JSON file ----
(defun tf:draw-from-file (fname / json thickness spans
                           numSpans supportH lowH coverTop
                           coverBot spanLengths
                           x0 y0 pts span
                           xMid xEnd xTotal oldSnap)
  (setq json (tf:read-file fname))

  ;; Extract design parameters
  (setq thickness   (tf:json-get json "slabThickness"))   ; mm
  (setq numSpans    (fix (tf:json-get json "numSpans")))
  (setq supportH    (tf:json-get json "supportHeight"))   ; mm from bottom
  (setq lowH        (tf:json-get json "lowPointHeight"))  ; mm from bottom
  (setq coverTop    (tf:json-get json "coverTop"))        ; mm
  (setq coverBot    (tf:json-get json "coverBottom"))     ; mm
  (setq spanLengths (tf:json-get-array json "spanLengths")) ; meters

  ;; Defaults if missing
  (if (= thickness 0.0)   (setq thickness 250.0))
  (if (= numSpans 0)      (setq numSpans 1))
  (if (= supportH 0.0)    (setq supportH (- thickness coverTop 7.0)))
  (if (= lowH 0.0)        (setq lowH (+ coverBot 7.0)))
  (if (null spanLengths)  (setq spanLengths '(8.0)))

  ;; Scale: mm → drawing units (assume 1 drawing unit = 1 mm)
  ;; Spans are in metres → convert to mm
  (setq spanLengths (mapcar '(lambda (s) (* s 1000.0)) spanLengths))

  ;; Ensure layer exists
  (tf:ensure-layer "TF_TENDON"   4)   ; cyan
  (tf:ensure-layer "TF_SLAB_TOP" 8)   ; grey
  (tf:ensure-layer "TF_SLAB_BOT" 8)

  ;; Ask user for insertion origin
  (setq p0 (getpoint "\n[TendonFlow] Pick start point (left support): "))
  (if (null p0) (exit))
  (setq x0 (car p0) y0 (cadr p0))

  (setq oldSnap (getvar "OSMODE"))
  (setvar "OSMODE" 0)

  ;; Build polyline points list
  (setq pts (list (list x0 (+ y0 supportH) 0.0)))
  (setq xCur x0)

  (foreach span spanLengths
    (setq xMid (+ xCur (* span 0.5)))
    (setq xEnd (+ xCur span))
    (setq pts (append pts (list (list xMid (+ y0 lowH) 0.0))))
    (setq pts (append pts (list (list xEnd (+ y0 supportH) 0.0))))
    (setq xCur xEnd)
  )

  ;; Draw tendon polyline
  (command "_.LAYER" "_SET" "TF_TENDON" "")
  (command "_.PLINE")
  (foreach pt pts (command pt))
  (command "")

  ;; Draw slab top and bottom reference lines
  (setq xTotal xCur)
  (command "_.LAYER" "_SET" "TF_SLAB_TOP" "")
  (command "_.LINE"
    (list x0 (+ y0 thickness) 0.0)
    (list xTotal (+ y0 thickness) 0.0)
    "")
  (command "_.LAYER" "_SET" "TF_SLAB_BOT" "")
  (command "_.LINE"
    (list x0 y0 0.0)
    (list xTotal y0 0.0)
    "")

  ;; Restore settings
  (setvar "OSMODE" oldSnap)
  (command "_.LAYER" "_SET" "0" "")

  (princ (strcat "\n[TendonFlow] Drew " (itoa (length pts))
                 " profile points across "
                 (itoa numSpans) " span(s). "))
)

;;; ---- Model 3D Concrete Slab & Tendon Solids from JSON file ----
(defun tf:draw-3d-model (fname / json thickness numSpans spanLengths slabWidth coverTop coverBottom inflectionRatio ductDia planXTendons supports lowPointsData lowPointsXFract lowPointsY yTotal totalLength p0 x0 y0 z0 oldSnap y_offset y_curr pts pathEnt profileEnt spanStartX spanIdx L yTends yTend absX zHeight ptStart ptEnd)
  (setq json (tf:read-file fname))

  ;; 1. Extract parameters
  (setq thickness        (tf:json-get json "slabThickness"))      ; mm
  (setq numSpans         (fix (tf:json-get json "numSpans")))
  (setq slabWidth        (tf:json-get json "slabWidth"))          ; meters
  (setq coverTop         (tf:json-get json "coverTop"))           ; mm
  (setq coverBottom      (tf:json-get json "coverBottom"))        ; mm
  (setq inflectionRatio  (tf:json-get json "inflectionRatio"))    ; ratio
  (setq ductDia          (tf:json-get json "ductDiameter"))       ; mm

  ;; Defaults if missing
  (if (= thickness 0.0)        (setq thickness 250.0))
  (if (= numSpans 0)           (setq numSpans 1))
  (if (= slabWidth 0.0)        (setq slabWidth 12.0))
  (if (= coverTop 0.0)         (setq coverTop 25.0))
  (if (= coverBottom 0.0)      (setq coverBottom 25.0))
  (if (= inflectionRatio 0.0)  (setq inflectionRatio 0.1))
  (if (= ductDia 0.0)          (setq ductDia 25.0))

  ;; Parse arrays
  (setq spanLengths (tf:json-get-array json "spanLengths")) ; meters
  (if (null spanLengths) (setq spanLengths '(8.0)))
  (setq spanLengths (mapcar '(lambda (s) (* s 1000.0)) spanLengths))

  (setq planXTendons (tf:json-get-array json "planXTendons")) ; meters
  (if (null planXTendons) (setq planXTendons '(1.5 3.0 4.5 6.0 7.5 9.0 10.5)))
  (setq planXTendons (mapcar '(lambda (y) (* y 1000.0)) planXTendons))

  ;; Get control points of row 0 (default row index)
  (setq supports (tf:get-supports-array json 0))
  (if (null supports)
    (setq supports (mapcar '(lambda (x) (- thickness coverTop (/ ductDia 2.0))) (append (list 0.0) spanLengths)))
  )

  (setq lowPointsData (tf:get-lowpoints json 0))
  (setq lowPointsXFract (car lowPointsData))
  (setq lowPointsY (cadr lowPointsData))
  (if (null lowPointsY)
    (progn
      (setq lowPointsXFract '())
      (setq lowPointsY '())
      (foreach L spanLengths
        (setq lowPointsXFract (append lowPointsXFract '(0.5)))
        (setq lowPointsY (append lowPointsY (list (+ coverBottom (/ ductDia 2.0)))))
      )
    )
  )

  ;; Ensure layers exist
  (tf:ensure-layer "TF_3D_SLAB" 8)    ; grey
  (tf:ensure-layer "TF_3D_TENDON" 4)  ; cyan

  ;; Ask user for insertion origin
  (setq p0 (getpoint "\n[TendonFlow 3D] Pick insertion origin (0,0,0): "))
  (if (null p0) (exit))
  (setq x0 (car p0) y0 (cadr p0) z0 (caddr p0))
  (if (null z0) (setq z0 0.0))

  ;; Save Osnap
  (setq oldSnap (getvar "OSMODE"))
  (setvar "OSMODE" 0)

  ;; 2. Draw 3D Concrete Slab box
  (princ "\n[TendonFlow 3D] Drawing 3D Slab Solid...")
  (setq totalLength 0.0)
  (foreach L spanLengths (setq totalLength (+ totalLength L)))
  (setq yTotal (* slabWidth 1000.0))

  (command "_.LAYER" "_SET" "TF_3D_SLAB" "")
  (command "_.BOX"
    (list x0 y0 z0)
    (list (+ x0 totalLength) (+ y0 yTotal) (+ z0 thickness))
  )

  ;; 3. Draw Longitudinal (X) Tendons in 3D (Swept solid ducts)
  (princ "\n[TendonFlow 3D] Modeling 3D Longitudinal Tendons...")
  (command "_.LAYER" "_SET" "TF_3D_TENDON" "")

  (foreach y_offset planXTendons
    (setq y_curr (+ y0 y_offset))
    (setq pts (tf:get-tendon-3d-points spanLengths supports lowPointsY lowPointsXFract inflectionRatio y_curr))
    
    ;; Shift points by insertion origin
    (setq pts (mapcar '(lambda (pt) (list (+ x0 (car pt)) (cadr pt) (+ z0 (caddr pt)))) pts))

    ;; Draw 3D Polyline path
    (command "_.3DPOLY")
    (foreach pt pts (command pt))
    (command "")
    (setq pathEnt (entlast))

    ;; Draw circle for sweep profile at start point
    (command "_.CIRCLE" (car pts) (/ ductDia 2.0))
    (setq profileEnt (entlast))

    ;; Sweep solid
    (command "_.SWEEP" profileEnt "" pathEnt)
  )

  ;; 4. Draw Transverse (Y) Tendons in 3D (Solid cylinders)
  (princ "\n[TendonFlow 3D] Modeling 3D Transverse Tendons...")
  (setq spanStartX 0.0)
  (setq spanIdx 0)
  (foreach L spanLengths
    (setq yTends (tf:get-plan-y-tendons json spanIdx))
    (if yTends
      (foreach yTend yTends
        (setq absX (+ spanStartX (* yTend 1000.0)))
        (setq zHeight (nth spanIdx supports))
        (setq ptStart (list (+ x0 absX) y0 (+ z0 zHeight)))
        (setq ptEnd (list (+ x0 absX) (+ y0 yTotal) (+ z0 zHeight)))
        (command "_.CYLINDER" ptStart "R" (/ ductDia 2.0) "C" ptEnd)
      )
    )
    (setq spanStartX (+ spanStartX L))
    (setq spanIdx (1+ spanIdx))
  )

  ;; Restore Osnap settings and active layer
  (setvar "OSMODE" oldSnap)
  (command "_.LAYER" "_SET" "0" "")
  (princ "\n[TendonFlow 3D] Completed modeling 3D solid PT Slab & Tendons successfully.")
)

;;; ---- Model 3D Tendon Solid along a selected 2D line/polyline ----
(defun tf:create-tendon-from-line (fname ent / json thickness numSpans spanLengths coverTop coverBottom inflectionRatio ductDia supports lowPointsData lowPointsXFract lowPointsY startDist endDist totalLen segments step points i dist pt2d designDist accumX spanIdx localX L yL yR ym xFract z pt zSlabBottom pSlabBottom pathEnt profileEnt oldSnap totalDesignLength scaleFactor k)
  (setq json (tf:read-file fname))

  ;; 1. Extract parameters
  (setq thickness        (tf:json-get json "slabThickness"))      ; mm
  (setq numSpans         (fix (tf:json-get json "numSpans")))
  (setq coverTop         (tf:json-get json "coverTop"))           ; mm
  (setq coverBottom      (tf:json-get json "coverBottom"))        ; mm
  (setq inflectionRatio  (tf:json-get json "inflectionRatio"))    ; ratio
  (setq ductDia          (tf:json-get json "ductDiameter"))       ; mm

  ;; Defaults if missing
  (if (= thickness 0.0)        (setq thickness 250.0))
  (if (= numSpans 0)           (setq numSpans 1))
  (if (= coverTop 0.0)         (setq coverTop 25.0))
  (if (= coverBottom 0.0)      (setq coverBottom 25.0))
  (if (= inflectionRatio 0.0)  (setq inflectionRatio 0.1))
  (if (= ductDia 0.0)          (setq ductDia 25.0))

  ;; Parse arrays
  (setq spanLengths (tf:json-get-array json "spanLengths")) ; meters
  (if (null spanLengths) (setq spanLengths '(8.0)))
  (setq spanLengths (mapcar '(lambda (s) (* s 1000.0)) spanLengths))

  ;; Get control points of row 0 (default row index)
  (setq supports (tf:get-supports-array json 0))
  (if (null supports)
    (setq supports (mapcar '(lambda (x) (- thickness coverTop (/ ductDia 2.0))) (append (list 0.0) spanLengths)))
  )

  (setq lowPointsData (tf:get-lowpoints json 0))
  (setq lowPointsXFract (car lowPointsData))
  (setq lowPointsY (cadr lowPointsData))
  (if (null lowPointsY)
    (progn
      (setq lowPointsXFract '())
      (setq lowPointsY '())
      (foreach L spanLengths
        (setq lowPointsXFract (append lowPointsXFract '(0.5)))
        (setq lowPointsY (append lowPointsY (list (+ coverBottom (/ ductDia 2.0)))))
      )
    )
  )

  ;; Ask user for slab bottom Z elevation
  (setq pSlabBottom (getpoint "\n[TendonFlow] Pick a point on the bottom of the slab (or press Enter for Z=0): "))
  (if pSlabBottom
    (setq zSlabBottom (caddr pSlabBottom))
    (setq zSlabBottom 0.0)
  )

  ;; Ensure layers exist
  (tf:ensure-layer "TF_3D_TENDON" 4)  ; cyan

  ;; Save Osnap
  (setq oldSnap (getvar "OSMODE"))
  (setvar "OSMODE" 0)

  ;; Get curve properties using ActiveX
  (setq startDist (vlax-curve-getDistAtParam ent (vlax-curve-getStartParam ent)))
  (setq endDist (vlax-curve-getDistAtParam ent (vlax-curve-getEndParam ent)))
  (setq totalLen (- endDist startDist))

  ;; Scale curve points to fit span lengths
  (setq totalDesignLength 0.0)
  (foreach L spanLengths (setq totalDesignLength (+ totalDesignLength L)))
  (setq scaleFactor (/ totalLen totalDesignLength))

  (setq segments 80)
  (setq step (/ totalLen segments))
  (setq points '())
  
  (setq i 0)
  (while (<= i segments)
    (setq dist (+ startDist (* i step)))
    (setq pt2d (vlax-curve-getPointAtDist ent dist))
    
    ;; Calculate design coordinate distance to evaluate vertical profile parabola
    (setq designDist (/ (* i step) scaleFactor))
    
    ;; Find which span this designDist falls in
    (setq accumX 0.0)
    (setq spanIdx -1)
    (setq localX 0.0)
    (setq k 0)
    (while (and (< k numSpans) (= spanIdx -1))
      (setq L (nth k spanLengths))
      (if (and (>= designDist accumX) (<= designDist (+ accumX L 0.001)))
        (progn
          (setq spanIdx k)
          (setq localX (- designDist accumX))
        )
      )
      (setq accumX (+ accumX L))
      (setq k (1+ k))
    )
    (if (= spanIdx -1)
      (progn
        (setq spanIdx (1- numSpans))
        (setq localX (nth spanIdx spanLengths))
      )
    )

    (setq yL (nth spanIdx supports))
    (setq yR (nth (1+ spanIdx) supports))
    (setq ym (nth spanIdx lowPointsY))
    (setq xFract (nth spanIdx lowPointsXFract))
    
    (setq z (tf:get-parabola-z localX (nth spanIdx spanLengths) yL yR ym xFract inflectionRatio))
    
    ;; Create 3D coordinate point relative to slab bottom
    (setq pt (list (car pt2d) (cadr pt2d) (+ zSlabBottom z)))
    (setq points (append points (list pt)))
    
    (setq i (1+ i))
  )

  ;; Draw 3D Polyline path along AutoCAD line
  (command "_.LAYER" "_SET" "TF_3D_TENDON" "")
  (command "_.3DPOLY")
  (foreach pt points (command pt))
  (command "")
  (setq pathEnt (entlast))

  ;; Draw circle for sweep profile at start point
  (command "_.CIRCLE" (car points) (/ ductDia 2.0))
  (setq profileEnt (entlast))

  ;; Sweep solid
  (command "_.SWEEP" profileEnt "" pathEnt)

  ;; Restore settings
  (setvar "OSMODE" oldSnap)
  (command "_.LAYER" "_SET" "0" "")
  (princ "\n[TendonFlow] Successfully created 3D Swept Tendon Solid along selected line.")
)

;;; ---- Model 3D Tendon Solid from Plan Line and 2D Profile ----
(defun c:TENDON3DFROMPROFILE ( / planSel planEnt zStart zEnd pStartSide profSel profEnt rad)
  (princ "\n[TendonFlow] Select line or polyline in PLAN view representing tendon trajectory...")
  (setq planSel (entsel))
  (if (null planSel)
    (progn (princ "\n[TendonFlow] No plan entity selected.") (exit))
  )
  (setq planEnt (car planSel))

  (setq zStart (getreal "\n[TendonFlow] Enter start level (Z coordinate) of tendon: "))
  (if (null zStart) (setq zStart 0.0))

  (setq zEnd (getreal "\n[TendonFlow] Enter end level (Z coordinate) of tendon: "))
  (if (null zEnd) (setq zEnd 0.0))

  (setq pStartSide (getpoint "\n[TendonFlow] Click near the start Z side of the tendon (defines direction): "))
  (if (null pStartSide) (setq pStartSide (vlax-curve-getStartPoint planEnt)))

  (princ "\n[TendonFlow] Select 2D polyline or spline in SECTION/ELEVATION view representing tendon profile...")
  (setq profSel (entsel))
  (if (null profSel)
    (progn (princ "\n[TendonFlow] No profile entity selected.") (exit))
  )
  (setq profEnt (car profSel))

  (setq rad (getreal "\n[TendonFlow] Enter tendon radius: "))
  (if (or (null rad) (<= rad 0.0)) (setq rad 12.5))

  (tf:create-3d-tendon-from-profile-and-plan planEnt zStart zEnd profEnt rad pStartSide pStartSide)
  (princ "\n[TendonFlow] 3D tendon shape generated successfully.")
  (princ)
)

;;; ---- Model 3D Tendon Solid from Excel Clipboard and Plan Lines ----
(defun c:TENDON3DFROMEXCEL ( / clipText rows pairs zStart zEnd profSel profEnt rad planSS planCount pStartCrossing pEndCrossing space crossingLine entityCoordsList i ent entVla intPoints ptInt dist pMid sortedEntities sortedPlanEnts pair planEnt)
  (setq clipText (tf:get-clipboard))
  (if (or (null clipText) (= clipText ""))
    (progn (princ "\n[TendonFlow] Error: Clipboard is empty. Copy Z-levels from Excel first.") (exit))
  )

  ;; Clean carriage returns and split into rows
  (while (vl-string-search "\r" clipText)
    (setq clipText (vl-string-subst "" "\r" clipText))
  )
  (setq rows (tf:split-string clipText "\n"))

  ;; Parse pairs of numbers
  (setq pairs '())
  (foreach row rows
    (setq words (tf:split-row-by-whitespace row))
    (if (and words (>= (length words) 2))
      (progn
        (setq zStart (atof (car words)))
        (setq zEnd (atof (cadr words)))
        (setq pairs (append pairs (list (list zStart zEnd))))
      )
    )
  )

  (setq excelCount (length pairs))
  (if (= excelCount 0)
    (progn (princ "\n[TendonFlow] Error: No valid elevation pairs found in clipboard.") (exit))
  )

  (princ (strcat "\n[TendonFlow] Parsed " (itoa excelCount) " tendon elevation pairs from clipboard."))

  ;; Get common inputs
  (princ "\n[TendonFlow] Select 2D polyline or spline in ELEVATION view representing tendon profile...")
  (setq profSel (entsel))
  (if (null profSel)
    (progn (princ "\n[TendonFlow] No profile entity selected.") (exit))
  )
  (setq profEnt (car profSel))

  (setq rad (getreal "\n[TendonFlow] Enter tendon radius: "))
  (if (or (null rad) (<= rad 0.0)) (setq rad 12.5))

  ;; Prompt for plan selection
  (princ "\n[TendonFlow] Select lines/polylines in PLAN view representing tendon trajectories...")
  (setq planSS (ssget '((0 . "LINE,LWPOLYLINE,POLYLINE,SPLINE,ARC"))))
  (if (null planSS)
    (progn (princ "\n[TendonFlow] No plan entities selected.") (exit))
  )
  (setq planCount (sslength planSS))

  (if (/= planCount excelCount)
    (princ (strcat "\n[Warning] Mismatch! Selected " (itoa planCount) " lines, but clipboard has " (itoa excelCount) " rows. Processing up to " (itoa (min planCount excelCount)) " tendons."))
  )
  (setq processCount (min planCount excelCount))

  ;; Prompt for crossing direction line points
  (setq pStartCrossing (getpoint "\n[TendonFlow] Pick start point of crossing direction line (Tendon 1 / Start Z side): "))
  (setq pEndCrossing (getpoint pStartCrossing "\n[TendonFlow] Pick end point of crossing direction line (Tendon N / End Z side): "))

  ;; Create temporary AutoCAD line representing the crossing path
  (setq space (vla-get-ModelSpace (vla-get-ActiveDocument (vlax-get-acad-object))))
  (setq crossingLine (vla-AddLine space (vlax-3d-point pStartCrossing) (vlax-3d-point pEndCrossing)))

  (setq entityCoordsList '())
  (setq i 0)
  (while (< i planCount)
    (setq ent (ssname planSS i))
    (setq entVla (vlax-ename->vla-object ent))
    
    ;; Find intersection with extended crossing line (extend both = 3)
    (setq intPoints (vlax-invoke entVla 'IntersectWith crossingLine 3))
    
    (if (and intPoints (>= (length intPoints) 3))
      (progn
        (setq ptInt (list (car intPoints) (cadr intPoints) (caddr intPoints)))
        (setq dist (distance pStartCrossing ptInt))
        (setq entityCoordsList (cons (cons dist ent) entityCoordsList))
      )
      (progn
        ;; Fallback to midpoint distance
        (setq pMid (vlax-curve-getPointAtDist ent (/ (vlax-curve-getDistAtParam ent (vlax-curve-getEndParam ent)) 2.0)))
        (setq dist (distance pStartCrossing pMid))
        (setq entityCoordsList (cons (cons dist ent) entityCoordsList))
      )
    )
    (setq i (1+ i))
  )

  ;; Delete the temporary line object
  (vla-delete crossingLine)

  ;; Sort by intersection distance along crossing line (closest to start point A comes first)
  (setq sortedEntities (vl-sort entityCoordsList '(lambda (a b) (< (car a) (car b)))))
  (setq sortedPlanEnts (mapcar 'cdr sortedEntities))

  ;; Process and generate 3D solids
  (setq i 0)
  (while (< i processCount)
    (setq planEnt (nth i sortedPlanEnts))
    (setq pair (nth i pairs))
    (setq zStart (car pair))
    (setq zEnd (cadr pair))

    (redraw planEnt 3) ; Highlight
    (tf:create-3d-tendon-from-profile-and-plan planEnt zStart zEnd profEnt rad pStartCrossing pEndCrossing)
    (redraw planEnt 4) ; Unhighlight
    
    (setq i (1+ i))
  )

  (princ "\n[TendonFlow] Completed generating all 3D tendons successfully.")
  (princ)
)

;;; ---- Core Helper: Reconstruct 3D Tendon Path and Sweep ----
(defun tf:create-3d-tendon-from-profile-and-plan (planEnt zStart zEnd profEnt rad pStartCrossing pEndCrossing / startDistPlan endDistPlan lenPlan startDistProf endDistProf lenProf ptProfStart ptProfEnd yProfStart yProfEnd oldSnap segments stepPlan points3d i dPlan ptPlan2d dProf ptProf yProf xFract yChord hDev z3d pt3d pathEnt profileEnt pStartPlan pEndPlan dStart dEnd reversePath distPlan)
  ;; Ensure layer exists
  (tf:ensure-layer "TF_3D_TENDON" 4) ; cyan

  ;; Save Osnap
  (setq oldSnap (getvar "OSMODE"))
  (setvar "OSMODE" 0)

  ;; Get curve parameters using ActiveX
  (setq startDistPlan (vlax-curve-getDistAtParam planEnt (vlax-curve-getStartParam planEnt)))
  (setq endDistPlan (vlax-curve-getDistAtParam planEnt (vlax-curve-getEndParam planEnt)))
  (setq lenPlan (- endDistPlan startDistPlan))

  (setq startDistProf (vlax-curve-getDistAtParam profEnt (vlax-curve-getStartParam profEnt)))
  (setq endDistProf (vlax-curve-getDistAtParam profEnt (vlax-curve-getEndParam profEnt)))
  (setq lenProf (- endDistProf startDistProf))

  ;; Check for zero length curves
  (if (or (<= lenPlan 0.0001) (<= lenProf 0.0001))
    (progn
      (setvar "OSMODE" oldSnap)
      (princ "\n[TendonFlow] Error: Selected lines have zero length.")
      (exit)
    )
  )

  ;; Get vertical coordinates of profile endpoints (Y is vertical elevation)
  (setq ptProfStart (vlax-curve-getPointAtDist profEnt startDistProf))
  (setq ptProfEnd (vlax-curve-getPointAtDist profEnt endDistProf))
  (setq yProfStart (cadr ptProfStart))
  (setq yProfEnd (cadr ptProfEnd))

  ;; Determine if we need to reverse sampling direction to match crossing direction
  (setq pStartPlan (vlax-curve-getStartPoint planEnt))
  (setq pEndPlan (vlax-curve-getEndPoint planEnt))
  (setq dStart (distance pStartPlan pStartCrossing))
  (setq dEnd (distance pEndPlan pStartCrossing))
  (if (< dEnd dStart)
    (setq reversePath T)
    (setq reversePath nil)
  )

  (setq segments 100)
  (setq stepPlan (/ lenPlan segments))
  (setq points3d '())

  (setq i 0)
  (while (<= i segments)
    (setq dPlan (* i stepPlan))
    (if reversePath
      (setq distPlan (- endDistPlan dPlan))
      (setq distPlan (+ startDistPlan dPlan))
    )
    (setq ptPlan2d (vlax-curve-getPointAtDist planEnt distPlan))

    ;; Map distance onto profile
    (setq dProf (* dPlan (/ lenProf lenPlan)))
    (setq ptProf (vlax-curve-getPointAtDist profEnt (+ startDistProf dProf)))
    (setq yProf (cadr ptProf))

    ;; Deviation from straight chord line in profile
    (setq xFract (/ dProf lenProf))
    (setq yChord (+ yProfStart (* (- yProfEnd yProfStart) xFract)))
    (setq hDev (- yProf yChord))

    ;; Calculate Z for 3D point (linear transition + profile deviation)
    (setq z3d (+ zStart (* (- zEnd zStart) (/ dPlan lenPlan)) hDev))

    ;; Construct 3D point (using X/Y from plan line, Z from profile deviation)
    (setq pt3d (list (car ptPlan2d) (cadr ptPlan2d) z3d))
    (setq points3d (append points3d (list pt3d)))

    (setq i (1+ i))
  )

  ;; Draw 3D polyline path
  (command "_.LAYER" "_SET" "TF_3D_TENDON" "")
  (command "_.3DPOLY")
  (foreach pt points3d (command pt))
  (command "")
  (setq pathEnt (entlast))

  ;; Draw circle at start point perpendicular to path
  (command "_.CIRCLE" (car points3d) rad)
  (setq profileEnt (entlast))

  ;; Sweep circle along path to create solid shape
  (command "_.SWEEP" profileEnt "" pathEnt)

  ;; Restore settings
  (setvar "OSMODE" oldSnap)
  (command "_.LAYER" "_SET" "0" "")
  (princ)
)

;;; ---- Clipboard & Parsing Utilities ----
(defun tf:get-clipboard ( / html text)
  (setq html (vlax-create-object "htmlfile"))
  (setq text (vlax-invoke (vlax-get (vlax-get html 'ParentWindow) 'ClipboardData) 'GetData "Text"))
  (vlax-release-object html)
  text
)

(defun tf:split-string (str delim / pos lst)
  (while (setq pos (vl-string-search delim str))
    (setq lst (append lst (list (substr str 1 pos))))
    (setq str (substr str (+ pos (strlen delim) 1)))
  )
  (append lst (list str))
)

(defun tf:split-row-by-whitespace (row / i len char word words)
  (setq i 1)
  (setq len (strlen row))
  (setq word "")
  (setq words '())
  (while (<= i len)
    (setq char (substr row i 1))
    (if (or (= char " ") (= char "\t"))
      (progn
        (if (/= word "")
          (progn
            (setq words (append words (list word)))
            (setq word "")
          )
        )
      )
      (setq word (strcat word char))
    )
    (setq i (1+ i))
  )
  (if (/= word "")
    (setq words (append words (list word)))
  )
  words
)

;;; ---- Clipboard Setter Utility ----
(defun tf:set-clipboard (text / html)
  (setq html (vlax-create-object "htmlfile"))
  (vlax-invoke (vlax-get (vlax-get html 'ParentWindow) 'ClipboardData) 'SetData "Text" text)
  (vlax-release-object html)
)

;;; ---- Export 2D Tendon Profile Heights to Clipboard (CAD to Excel) ----
(defun c:EXPORTTENDONPROFILE ( / tendonSel tendonEnt tendonVla slabSel slabEnt spacingVal ptTendonStart ptTendonEnd xTStart xTEnd totalHorizLen steps i xCurr yLow yHigh p1 p2 space tempLine intPoints ptInt yt ySlab hVal xRel row clipText ptSlabStart ptSlabEnd xS1 yS1 xS2 yS2 minValY maxValY)
  (princ "\n[TendonFlow] Select 2D tendon profile curve (polyline or spline) in section view...")
  (setq tendonSel (entsel))
  (if (null tendonSel) (progn (princ "\nNo entity selected.") (exit)))
  (setq tendonEnt (car tendonSel))
  (setq tendonVla (vlax-ename->vla-object tendonEnt))

  (princ "\n[TendonFlow] Select 2D slab bottom line in section view...")
  (setq slabSel (entsel))
  (if (null slabSel) (progn (princ "\nNo entity selected.") (exit)))
  (setq slabEnt (car slabSel))

  (setq spacingVal (getreal "\n[TendonFlow] Enter horizontal sampling spacing (e.g. 1000): "))
  (if (or (null spacingVal) (<= spacingVal 0.0)) (setq spacingVal 1000.0))

  (setq ptTendonStart (vlax-curve-getStartPoint tendonEnt))
  (setq ptTendonEnd (vlax-curve-getEndPoint tendonEnt))
  (setq xTStart (car ptTendonStart))
  (setq xTEnd (car ptTendonEnd))
  
  (setq ptSlabStart (vlax-curve-getStartPoint slabEnt))
  (setq ptSlabEnd (vlax-curve-getEndPoint slabEnt))
  (setq xS1 (car ptSlabStart) yS1 (cadr ptSlabStart))
  (setq xS2 (car ptSlabEnd) yS2 (cadr ptSlabEnd))

  ;; Calculate horizontal length and steps
  (setq totalHorizLen (abs (- xTEnd xTStart)))
  (setq steps (fix (/ totalHorizLen spacingVal)))
  
  (setq minValY (min yS1 yS2 (cadr ptTendonStart) (cadr ptTendonEnd)))
  (setq maxValY (max yS1 yS2 (cadr ptTendonStart) (cadr ptTendonEnd)))
  (setq yLow (- minValY 1000.0))
  (setq yHigh (+ maxValY 1000.0))

  (setq space (vla-get-ModelSpace (vla-get-ActiveDocument (vlax-get-acad-object))))
  (setq clipText "")

  (setq i 0)
  (while (<= i steps)
    (setq xRel (* i spacingVal))
    (if (< xTEnd xTStart)
      (setq xCurr (- xTStart xRel))
      (setq xCurr (+ xTStart xRel))
    )
    
    ;; Create temporary vertical line at xCurr to find curve intersection
    (setq p1 (list xCurr yLow 0.0))
    (setq p2 (list xCurr yHigh 0.0))
    (setq tempLine (vla-AddLine space (vlax-3d-point p1) (vlax-3d-point p2)))
    
    (setq intPoints (vlax-invoke tendonVla 'IntersectWith tempLine 0))
    (vla-delete tempLine)
    
    (if (and intPoints (>= (length intPoints) 3))
      (progn
        (setq ptInt (list (car intPoints) (cadr intPoints) (caddr intPoints)))
        (setq yt (cadr ptInt))
        
        ;; Interpolate slab bottom Y at this X coordinate
        (if (/= (- xS2 xS1) 0.0)
          (setq ySlab (+ yS1 (* (- yS2 yS1) (/ (- xCurr xS1) (- xS2 xS1)))))
          (setq ySlab yS1)
        )
        (setq hVal (- yt ySlab))
        
        (setq row (strcat (rtos xRel 2 2) "\t" (rtos hVal 2 2) "\n"))
        (setq clipText (strcat clipText row))
      )
    )
    (setq i (1+ i))
  )

  ;; Copy to clipboard
  (tf:set-clipboard clipText)
  (princ (strcat "\n[TendonFlow] Successfully exported " (itoa (1+ steps)) " coordinates to clipboard!"))
  (princ)
)

;;; ---- Annotate Height Clearances along Tendon Curve (CAD to CAD Section) ----
(defun c:ANNOTATETENDONPROFILE ( / tendonSel tendonEnt tendonVla slabSel slabEnt spacingVal textHeight ptTendonStart ptTendonEnd xTStart xTEnd totalHorizLen steps i xRel xCurr yLow yHigh p1 p2 space tempLine intPoints ptInt yt ySlab hVal ptSlab ptText lineObj textObj ptSlabStart ptSlabEnd xS1 yS1 xS2 yS2 minValY maxValY)
  (princ "\n[TendonFlow] Select 2D tendon profile curve (polyline or spline) in section view...")
  (setq tendonSel (entsel))
  (if (null tendonSel) (progn (princ "\nNo entity selected.") (exit)))
  (setq tendonEnt (car tendonSel))
  (setq tendonVla (vlax-ename->vla-object tendonEnt))

  (princ "\n[TendonFlow] Select 2D slab bottom line in section view...")
  (setq slabSel (entsel))
  (if (null slabSel) (progn (princ "\nNo entity selected.") (exit)))
  (setq slabEnt (car slabSel))

  (setq spacingVal (getreal "\n[TendonFlow] Enter horizontal annotation spacing (e.g. 1000): "))
  (if (or (null spacingVal) (<= spacingVal 0.0)) (setq spacingVal 1000.0))

  (setq textHeight (getreal "\n[TendonFlow] Enter annotation text height <150>: "))
  (if (or (null textHeight) (<= textHeight 0.0)) (setq textHeight 150.0))

  (setq ptTendonStart (vlax-curve-getStartPoint tendonEnt))
  (setq ptTendonEnd (vlax-curve-getEndPoint tendonEnt))
  (setq xTStart (car ptTendonStart))
  (setq xTEnd (car ptTendonEnd))
  
  (setq ptSlabStart (vlax-curve-getStartPoint slabEnt))
  (setq ptSlabEnd (vlax-curve-getEndPoint slabEnt))
  (setq xS1 (car ptSlabStart) yS1 (cadr ptSlabStart))
  (setq xS2 (car ptSlabEnd) yS2 (cadr ptSlabEnd))

  ;; Calculate horizontal length and steps
  (setq totalHorizLen (abs (- xTEnd xTStart)))
  (setq steps (fix (/ totalHorizLen spacingVal)))
  
  (setq minValY (min yS1 yS2 (cadr ptTendonStart) (cadr ptTendonEnd)))
  (setq maxValY (max yS1 yS2 (cadr ptTendonStart) (cadr ptTendonEnd)))
  (setq yLow (- minValY 1000.0))
  (setq yHigh (+ maxValY 1000.0))

  (setq space (vla-get-ModelSpace (vla-get-ActiveDocument (vlax-get-acad-object))))

  (setq i 0)
  (while (<= i steps)
    (setq xRel (* i spacingVal))
    (if (< xTEnd xTStart)
      (setq xCurr (- xTStart xRel))
      (setq xCurr (+ xTStart xRel))
    )

    ;; Create temporary vertical line at xCurr to find curve intersection
    (setq p1 (list xCurr yLow 0.0))
    (setq p2 (list xCurr yHigh 0.0))
    (setq tempLine (vla-AddLine space (vlax-3d-point p1) (vlax-3d-point p2)))
    
    (setq intPoints (vlax-invoke tendonVla 'IntersectWith tempLine 0))
    (vla-delete tempLine)
    
    (if (and intPoints (>= (length intPoints) 3))
      (progn
        (setq ptInt (list (car intPoints) (cadr intPoints) (caddr intPoints)))
        (setq yt (cadr ptInt))
        
        ;; Interpolate slab bottom Y
        (if (/= (- xS2 xS1) 0.0)
          (setq ySlab (+ yS1 (* (- yS2 yS1) (/ (- xCurr xS1) (- xS2 xS1)))))
          (setq ySlab yS1)
        )
        (setq hVal (- yt ySlab))
        
        (setq ptSlab (list xCurr ySlab 0.0))

        ;; Define dimension line location (slightly offset to the right)
        (setq ptDimLine (list (+ xCurr (* textHeight 0.75)) (/ (+ ySlab yt) 2.0) 0.0))

        ;; Draw native AutoCAD rotated linear dimension (vertical rotation = 1.570796327 rad)
        (setq dimObj (vla-AddDimRotated space 
                                        (vlax-3d-point ptSlab) 
                                        (vlax-3d-point ptInt) 
                                        (vlax-3d-point ptDimLine) 
                                        1.570796327))
                                        
        ;; Apply rounded height value override and text height setting
        (vla-put-TextOverride dimObj (rtos hVal 2 0))
        (vla-put-TextHeight dimObj textHeight)
      )
    )
    (setq i (1+ i))
  )

  (princ "\n[TendonFlow] Successfully drawn height annotations in section view.")
  (princ)
)

;;; ---- Auto-load message ----
(princ "\n[TendonFlow] Loaded. Commands:")
(princ "\n  - TENDONFLOW            (2D profile from JSON)")
(princ "\n  - TENDONFLOW3D          (3D slab & tendons from JSON)")
(princ "\n  - TENDONFROMLINE        (3D tendon from picked line and JSON)")
(princ "\n  - TENDON3DFROMPROFILE   (3D tendon from picked plan line + 2D profile)")
(princ "\n  - TENDON3DFROMEXCEL     (3D tendons from Excel clipboard + plan lines)")
(princ "\n  - EXPORTTENDONPROFILE   (Export section heights X,Y to Excel clipboard)")
(princ "\n  - ANNOTATETENDONPROFILE (Draw dimension lines & height text in section)")
(princ)
;;; EOF
