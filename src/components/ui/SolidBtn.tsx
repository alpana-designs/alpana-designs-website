import { useState, ReactNode } from "react";
import { C } from "@/constants/colors";

export function SolidBtn({
  children,
  onClick,
  full = false,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  full?: boolean;
  type?: "button" | "submit";
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.oyster : C.rifleGreen,
        color: C.merino,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: "12px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        width: full ? "100%" : "200px",
        height: "48px",
        border: "none",
        cursor: "pointer",
        transition: "background 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}
