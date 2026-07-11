import { useEffect } from "react";
import { C } from "@/constants/colors";

export function Lightbox({
  index,
  total,
  projectName,
  images,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  total: number;
  projectName: string;
  images: string[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: C.overlayDark,
        zIndex: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: "lbFadeIn 0.3s ease",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "24px",
          right: "32px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "16px",
          color: "#FFFFFF",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      {/* Image */}
      <img
        onClick={(e) => e.stopPropagation()}
        src={images[index]}
        alt={`${projectName} photo ${index + 1}`}
        style={{
          width: "min(80vw, 1080px)",
          maxHeight: "90vh",
          objectFit: "contain",
          display: "block",
        }}
      />

      {/* Left arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={{
          position: "absolute",
          left: "32px",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "48px",
          color: "#FFFFFF",
          background: "none",
          border: "none",
          cursor: "pointer",
          lineHeight: 1,
          opacity: 0.7,
        }}
      >
        ‹
      </button>

      {/* Right arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{
          position: "absolute",
          right: "32px",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "48px",
          color: "#FFFFFF",
          background: "none",
          border: "none",
          cursor: "pointer",
          lineHeight: 1,
          opacity: 0.7,
        }}
      >
        ›
      </button>

      {/* Caption */}
      <p
        style={{
          position: "absolute",
          bottom: "32px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.oyster,
        }}
      >
        {projectName} · {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
    </div>
  );
}
