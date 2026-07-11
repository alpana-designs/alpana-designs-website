import { useState, ReactNode } from "react";
import { C } from "@/constants/colors";

export function TextLink({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center gap-2"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: "13px",
        letterSpacing: "0.04em",
        color: C.cedar,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
    >
      {children}
      <span
        style={{
          display: "inline-block",
          transform: hov ? "translateX(5px)" : "translateX(0)",
          transition: "transform 0.2s ease",
        }}
      >
        →
      </span>
    </button>
  );
}
