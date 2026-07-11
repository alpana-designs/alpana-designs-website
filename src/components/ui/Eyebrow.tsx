import { ReactNode } from "react";
import { C } from "@/constants/colors";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        fontSize: "11px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: C.oyster,
      }}
    >
      {children}
    </p>
  );
}
