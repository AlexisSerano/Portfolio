'use client'
import React from 'react'

export default function GeometricReliefBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      <svg
        className="w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gold linear and radial gradients */}
          <linearGradient id="goldEdge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F5D785" stopOpacity="1" />
            <stop offset="100%" stopColor="#A3845B" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="goldEdgeSoft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#A3845B" stopOpacity="0.1" />
          </linearGradient>

          {/* Facet Relief Gradients (Deep Black to Dark Charcoal with subtle warm bounce) */}
          <linearGradient id="facetDark1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#141824" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#06080E" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="facetDark2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#181F2E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#090C14" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="facetDark3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B0E16" stopOpacity="0.98" />
            <stop offset="60%" stopColor="#1A2130" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#222B3D" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="facetGoldWash" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#121622" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#05070B" stopOpacity="0.95" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ===============================================================
            SHAPE 1: TOP RIGHT POLYHEDRON (Near Hero / Header)
            Faceted 3D relief crystal with illuminated gold traces
        =============================================================== */}
        <g className="animate-[floatSlow_18s_ease-in-out_infinite]" transform="translate(1450, 120)">
          {/* Outer ambient aura */}
          <circle cx="150" cy="150" r="160" fill="#D4A843" opacity="0.03" filter="url(#goldGlow)" />

          {/* Facet 1 (Top Left) */}
          <polygon
            points="150,20 270,90 150,150 50,100"
            fill="url(#facetDark2)"
            stroke="url(#goldEdge)"
            strokeWidth="1.2"
          />
          {/* Facet 2 (Top Right) */}
          <polygon
            points="150,20 270,90 280,180 150,150"
            fill="url(#facetGoldWash)"
            stroke="url(#goldEdge)"
            strokeWidth="1.2"
          />
          {/* Facet 3 (Bottom Right) */}
          <polygon
            points="150,150 280,180 230,280 150,260"
            fill="url(#facetDark1)"
            stroke="url(#goldEdge)"
            strokeWidth="1.2"
          />
          {/* Facet 4 (Bottom Center) */}
          <polygon
            points="150,150 150,260 70,240 50,160"
            fill="url(#facetDark3)"
            stroke="url(#goldEdge)"
            strokeWidth="1.2"
          />
          {/* Facet 5 (Left Front) */}
          <polygon
            points="50,100 150,150 50,160"
            fill="url(#facetDark1)"
            stroke="url(#goldEdge)"
            strokeWidth="1"
          />
          {/* Apex Golden Vertex Nodes */}
          <circle cx="150" cy="20" r="3" fill="#F5D785" filter="url(#goldGlow)" />
          <circle cx="270" cy="90" r="2.5" fill="#D4A843" />
          <circle cx="150" cy="150" r="3.5" fill="#F5D785" filter="url(#goldGlow)" />
          <circle cx="280" cy="180" r="2" fill="#D4A843" />
          <circle cx="150" cy="260" r="2.5" fill="#D4A843" />
        </g>

        {/* ===============================================================
            SHAPE 2: MID-LEFT RELIEF MESH (Near About / Skills)
            Low-poly dark topological relief with gold seams
        =============================================================== */}
        <g className="animate-[floatMid_22s_ease-in-out_infinite]" transform="translate(60, 480)">
          <circle cx="180" cy="200" r="200" fill="#D4A843" opacity="0.02" filter="url(#goldGlow)" />

          {/* Polygon Triangles forming 3D dark relief surface */}
          <polygon points="40,120 160,60 220,150" fill="url(#facetDark3)" stroke="url(#goldEdge)" strokeWidth="1" />
          <polygon points="160,60 290,90 220,150" fill="url(#facetGoldWash)" stroke="url(#goldEdge)" strokeWidth="1" />
          <polygon points="220,150 290,90 340,190" fill="url(#facetDark1)" stroke="url(#goldEdge)" strokeWidth="1.2" />
          <polygon points="40,120 220,150 140,240" fill="url(#facetDark2)" stroke="url(#goldEdge)" strokeWidth="1" />
          <polygon points="220,150 340,190 260,280" fill="url(#facetDark3)" stroke="url(#goldEdge)" strokeWidth="1.2" />
          <polygon points="140,240 220,150 260,280" fill="url(#facetGoldWash)" stroke="url(#goldEdge)" strokeWidth="1" />
          <polygon points="140,240 260,280 180,340" fill="url(#facetDark1)" stroke="url(#goldEdge)" strokeWidth="1" />
          <polygon points="40,120 140,240 50,290" fill="url(#facetDark2)" stroke="url(#goldEdgeSoft)" strokeWidth="0.8" />

          {/* Glowing intersections */}
          <circle cx="220" cy="150" r="3.5" fill="#F5D785" filter="url(#goldGlow)" />
          <circle cx="260" cy="280" r="2.5" fill="#D4A843" />
          <circle cx="160" cy="60" r="2" fill="#D4A843" />
          <circle cx="340" cy="190" r="2.5" fill="#F5D785" />
        </g>

        {/* ===============================================================
            SHAPE 3: LOWER RIGHT ICOSAHEDRAL PRISM (Near Projects / Experience)
            Floating angled jewel in deep black with gold edges
        =============================================================== */}
        <g className="animate-[floatSlow_25s_ease-in-out_infinite]" transform="translate(1500, 720)">
          <circle cx="160" cy="160" r="180" fill="#D4A843" opacity="0.025" filter="url(#goldGlow)" />

          <polygon points="160,30 250,90 210,190 110,190 70,90" fill="url(#facetDark1)" stroke="url(#goldEdge)" strokeWidth="1" />
          <polygon points="160,30 210,190 160,290 110,190" fill="url(#facetDark2)" stroke="url(#goldEdge)" strokeWidth="1.2" />
          <polygon points="250,90 270,190 210,190" fill="url(#facetGoldWash)" stroke="url(#goldEdge)" strokeWidth="1" />
          <polygon points="210,190 270,190 210,260 160,290" fill="url(#facetDark3)" stroke="url(#goldEdge)" strokeWidth="1" />
          <polygon points="70,90 110,190 50,190" fill="url(#facetDark3)" stroke="url(#goldEdgeSoft)" strokeWidth="0.8" />
          <polygon points="110,190 160,290 110,260 50,190" fill="url(#facetDark1)" stroke="url(#goldEdge)" strokeWidth="1" />

          {/* Internal diagonal architectural gold ray */}
          <line x1="160" y1="30" x2="160" y2="290" stroke="#F5D785" strokeWidth="1.4" opacity="0.7" filter="url(#goldGlow)" />
          <circle cx="160" cy="30" r="3" fill="#F5D785" />
          <circle cx="160" cy="190" r="3.5" fill="#F5D785" filter="url(#goldGlow)" />
          <circle cx="160" cy="290" r="3" fill="#D4A843" />
        </g>

        {/* ===============================================================
            FINE ARCHITECTURAL GOLDEN GUIDE LINES (Connecting geometry)
        =============================================================== */}
        <g stroke="url(#goldEdgeSoft)" strokeWidth="0.6" strokeDasharray="4,8" opacity="0.4">
          <line x1="150" y1="30" x2="300" y2="800" />
          <line x1="1600" y1="260" x2="1680" y2="760" />
          <line x1="450" y1="200" x2="1400" y2="200" strokeDasharray="6,12" opacity="0.2" />
          <line x1="120" y1="850" x2="1750" y2="850" strokeDasharray="8,16" opacity="0.2" />
        </g>
      </svg>

      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-24px) rotate(3deg);
          }
        }
        @keyframes floatMid {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-18px) rotate(-2deg) scale(1.03);
          }
        }
      `}</style>
    </div>
  )
}
