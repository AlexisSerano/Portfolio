'use client'
import React from 'react'

export default function GeometricReliefBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Razor-sharp Gold Linear Gradients for Edges */}
          <linearGradient id="goldEdgeBright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#F5D785" stopOpacity="1" />
            <stop offset="70%" stopColor="#D4A843" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8A6B29" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="goldEdgeSoft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#F5D785" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#D4A843" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="goldEdgeSubtle" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#D4A843" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#D4A843" stopOpacity="0.1" />
          </linearGradient>

          {/* Distinct Deep Black & Carbon Facet Fills */}
          <linearGradient id="facetBlackDeep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#050507" />
            <stop offset="100%" stopColor="#080A0F" />
          </linearGradient>

          <linearGradient id="facetBlackMid" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#07090E" />
            <stop offset="100%" stopColor="#0B0E16" />
          </linearGradient>

          <linearGradient id="facetBlackCarbon" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06070B" />
            <stop offset="100%" stopColor="#090C12" />
          </linearGradient>

          {/* Distinct Brushed Dark Gold Facet Fills — Rich, High Contrast yet Content-Friendly */}
          <linearGradient id="facetGoldPlane1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B150A" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#281E0D" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#140F06" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="facetGoldPlane2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#241B0C" stopOpacity="0.92" />
            <stop offset="60%" stopColor="#181208" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0E0A04" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="facetGoldAccent" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#2F230E" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1A1307" stopOpacity="0.95" />
          </linearGradient>

          {/* Delicate Technical Micro-Hatching Pattern inside Gold Planes */}
          <pattern id="goldHatch" width="24" height="24" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="24" stroke="#D4A843" strokeWidth="0.6" strokeOpacity="0.06" />
          </pattern>

          <pattern id="goldGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="40" y2="0" stroke="#D4A843" strokeWidth="0.5" strokeOpacity="0.04" />
            <line x1="0" y1="0" x2="0" y2="40" stroke="#D4A843" strokeWidth="0.5" strokeOpacity="0.04" />
          </pattern>

          {/* Vertex Node Glow */}
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =================================================================
            GEOMETRIC ARCHITECTURE: FULL-VIEWPORT BLACK & GOLD DIVISION
            No isolated floating shapes — entire canvas is structured.
        ================================================================= */}

        {/* Base Layer: Deep obsidian field */}
        <rect width="1920" height="1080" fill="#050507" />

        {/* -------------------------------------------------------------
            ZONE 1: UPPER-LEFT DEEP BLACK CARBON FACET
        ------------------------------------------------------------- */}
        <polygon
          points="0,0 1180,0 760,420 0,340"
          fill="url(#facetBlackDeep)"
        />

        {/* -------------------------------------------------------------
            ZONE 2: UPPER-RIGHT DISTINCT GOLD ARCHITECTURAL PLANE
            Sharp geometric gold zone with micro-hatch & metallic tone
        ------------------------------------------------------------- */}
        <polygon
          points="1180,0 1920,0 1920,440 1380,320 760,420"
          fill="url(#facetGoldPlane1)"
        />
        {/* Subtle geometric technical hatching on the gold facet */}
        <polygon
          points="1180,0 1920,0 1920,440 1380,320 760,420"
          fill="url(#goldHatch)"
        />

        {/* -------------------------------------------------------------
            ZONE 3: CENTER TRIANGULAR MID-ONYX FACET
        ------------------------------------------------------------- */}
        <polygon
          points="0,340 760,420 1140,740 460,880 0,780"
          fill="url(#facetBlackMid)"
        />

        {/* -------------------------------------------------------------
            ZONE 4: LOWER-RIGHT DISTINCT GOLD ARCHITECTURAL PLANE
            Second bold geometric gold zone balancing the composition
        ------------------------------------------------------------- */}
        <polygon
          points="1380,320 1920,440 1920,1080 1260,1080 1140,740"
          fill="url(#facetGoldPlane2)"
        />
        <polygon
          points="1380,320 1920,440 1920,1080 1260,1080 1140,740"
          fill="url(#goldHatch)"
        />

        {/* -------------------------------------------------------------
            ZONE 5: LOWER-LEFT MATTE VELVET BLACK FACET
        ------------------------------------------------------------- */}
        <polygon
          points="0,780 460,880 1140,740 1260,1080 0,1080"
          fill="url(#facetBlackCarbon)"
        />

        {/* -------------------------------------------------------------
            ZONE 6: GEOMETRIC ACCENT WEDGE (Angular Golden Intersection)
        ------------------------------------------------------------- */}
        <polygon
          points="760,420 1380,320 1140,740"
          fill="url(#facetGoldAccent)"
          opacity="0.8"
        />
        <polygon
          points="760,420 1380,320 1140,740"
          fill="url(#goldGrid)"
        />

        {/* =================================================================
            PRIMARY GOLD DIVISION SEAMS (Laser-sharp, distinct boundaries)
        ================================================================= */}
        <g strokeLinecap="round">
          {/* Main Diagonal Cutting Seams */}
          <line
            x1="1180" y1="0"
            x2="760" y2="420"
            stroke="url(#goldEdgeBright)"
            strokeWidth="1.6"
          />
          <line
            x1="760" y1="420"
            x2="1380" y2="320"
            stroke="url(#goldEdgeBright)"
            strokeWidth="1.8"
          />
          <line
            x1="1380" y1="320"
            x2="1920" y2="440"
            stroke="url(#goldEdgeSoft)"
            strokeWidth="1.4"
          />
          <line
            x1="0" y1="340"
            x2="760" y2="420"
            stroke="url(#goldEdgeSoft)"
            strokeWidth="1.3"
          />
          <line
            x1="760" y1="420"
            x2="1140" y2="740"
            stroke="url(#goldEdgeBright)"
            strokeWidth="1.8"
          />
          <line
            x1="1380" y1="320"
            x2="1140" y2="740"
            stroke="url(#goldEdgeBright)"
            strokeWidth="1.5"
          />
          <line
            x1="1140" y1="740"
            x2="1920" y2="1080"
            stroke="url(#goldEdgeSoft)"
            strokeWidth="1.4"
          />
          <line
            x1="1140" y1="740"
            x2="1260" y2="1080"
            stroke="url(#goldEdgeBright)"
            strokeWidth="1.6"
          />
          <line
            x1="0" y1="780"
            x2="460" y2="880"
            stroke="url(#goldEdgeSubtle)"
            strokeWidth="1.2"
          />
          <line
            x1="460" y1="880"
            x2="1140" y2="740"
            stroke="url(#goldEdgeSoft)"
            strokeWidth="1.4"
          />
        </g>

        {/* =================================================================
            SECONDARY ARCHITECTURAL GUIDE LINES (Crisp technical perspective)
        ================================================================= */}
        <g stroke="url(#goldEdgeSubtle)" strokeWidth="0.8" strokeDasharray="6,10">
          <line x1="760" y1="420" x2="760" y2="1080" opacity="0.35" />
          <line x1="1380" y1="0" x2="1380" y2="320" opacity="0.35" />
          <line x1="0" y1="420" x2="1920" y2="420" opacity="0.2" />
          <line x1="0" y1="740" x2="1920" y2="740" opacity="0.2" />
          <line x1="1180" y1="0" x2="1920" y2="740" opacity="0.25" />
        </g>

        {/* =================================================================
            ARCHITECTURAL VERTEX NODES (Subtle illuminated gold points)
        ================================================================= */}
        <g>
          {/* Main Golden Intersection 1 */}
          <circle cx="760" cy="420" r="4" fill="#F5D785" filter="url(#nodeGlow)" />
          <circle cx="760" cy="420" r="1.8" fill="#050507" />

          {/* Main Golden Intersection 2 */}
          <circle cx="1380" cy="320" r="4.5" fill="#F5D785" filter="url(#nodeGlow)" />
          <circle cx="1380" cy="320" r="2" fill="#050507" />

          {/* Main Golden Intersection 3 */}
          <circle cx="1140" cy="740" r="4.5" fill="#F5D785" filter="url(#nodeGlow)" />
          <circle cx="1140" cy="740" r="2" fill="#050507" />

          {/* Secondary Points */}
          <circle cx="1180" cy="0" r="2.5" fill="#D4A843" />
          <circle cx="0" cy="340" r="2.5" fill="#D4A843" />
          <circle cx="460" cy="880" r="3" fill="#D4A843" />
          <circle cx="1260" cy="1080" r="3" fill="#D4A843" />
          <circle cx="1920" cy="440" r="3" fill="#D4A843" />
        </g>

        {/* Subtle Light Reflection Glint on Main Seam */}
        <line
          x1="760" y1="420"
          x2="1140" y2="740"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          opacity="0.3"
          strokeDasharray="40,240"
          className="animate-pulse"
        />
      </svg>
    </div>
  )
}
