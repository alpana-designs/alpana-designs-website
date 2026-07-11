import { useState } from "react";
import { C } from "@/constants/colors";

export function GalleryPhoto({
  imageUrl,
  globalIndex,
  onClick,
  priority = false,
}: {
  imageUrl: string;
  globalIndex: number;
  onClick: (i: number) => void;
  priority?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={() => onClick(globalIndex)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        cursor: "pointer",
        position: "relative",
        marginBottom: "12px",
      }}
    >
      <img
        src={imageUrl}
        alt={`Project photo ${globalIndex + 1}`}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={{
          width: "100%",
          display: "block",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: C.overlayLight,
          opacity: hov ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
