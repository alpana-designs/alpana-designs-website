import { useState } from "react";
import { C } from "@/constants/colors";
import type { HomeProject } from "@/types";

export function ProjectCard({
  proj,
  onClick,
}: {
  proj: HomeProject;
  onClick?: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        cursor: "pointer",
        border: hov ? `1px solid ${C.oyster}` : "1px solid transparent",
        transition: "border-color 0.3s ease",
      }}
    >
      <div style={{ overflow: "hidden", background: C.kangaroo }}>
        <img
          src={proj.img}
          alt={proj.name}
          style={{
            width: "100%",
            aspectRatio: "1/1",
            objectFit: "cover",
            display: "block",
            opacity: hov ? 0.8 : 1,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>
      <div style={{ padding: "16px 0 12px" }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "22px",
            color: C.cedar,
            letterSpacing: "0.02em",
          }}
        >
          {proj.name}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.oyster,
            marginTop: "6px",
          }}
        >
          {proj.location}
        </p>
      </div>
    </div>
  );
}
