import { useState } from "react";
import { C } from "@/constants/colors";


export function NavItem({
  label,
  active,
  onClick,
  light = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  light?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: "12px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: light ? C.merino : C.cedar,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
    >
      {label}
      <span
        style={{
          position: "absolute",
          bottom: "-3px",
          left: 0,
          width: "100%",
          height: "1px",
          background: C.oyster,
          transform: active || hov ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.25s ease",
        }}
      />
    </button>
  );
}


