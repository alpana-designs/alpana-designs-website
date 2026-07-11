import { useState, useRef } from "react";
import { C } from "@/constants/colors";
import type { Tile } from "@/types";

// Hover debounce: card only flips in if the cursor stays for HOVER_INTENT ms.
// Leaving at any point cancels a pending flip-in, so fast mouse-overs never trigger.
const FLIP_DURATION = 820;  // ms — CSS transition length
const HOVER_INTENT = 200;   // ms — cursor must dwell before flip-in starts

export function FlipCard({ tile, onSelect }: { tile: Tile; onSelect: (t: Tile) => void }) {
  const [flipped, setFlipped] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlipped(true), HOVER_INTENT);
  };

  const handleMouseLeave = () => {
    if (timer.current) clearTimeout(timer.current);
    setFlipped(false);
  };

  return (
    <div
      style={{
        perspective: "1200px",
        cursor: "pointer",
        marginBottom: "24px",
        breakInside: "avoid",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: `transform ${FLIP_DURATION}ms cubic-bezier(0.45, 0, 0.55, 1)`,
          position: "relative",
        }}
      >
        {/* Front */}
        <div
          style={{
            backfaceVisibility: "hidden",
            position: "relative",
            overflow: "hidden",
            background: C.kangaroo,
          }}
        >
          <img
            src={tile.img}
            alt={tile.name}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", display: "block", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                `linear-gradient(to top, ${C.overlay} 0%, transparent 52%)`,
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "18px",
                color: "#FFFFFF",
                letterSpacing: "0.03em",
              }}
            >
              {tile.name}
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute",
            inset: 0,
            background: C.rifleGreen,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px 28px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.oyster,
              marginBottom: "18px",
            }}
          >
            {tile.category}
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "24px",
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              marginBottom: "18px",
              lineHeight: 1.2,
            }}
          >
            {tile.name}
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontStyle: "italic",
              fontSize: "13px",
              color: C.kangaroo,
              lineHeight: 1.75,
              marginBottom: "28px",
            }}
          >
            {tile.oneliner}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(tile); }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              color: C.oyster,
              letterSpacing: "0.06em",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            View Project →
          </button>
        </div>
      </div>
    </div>
  );
}
