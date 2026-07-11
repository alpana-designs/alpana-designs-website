import { ReactNode } from "react";
import { C } from "@/constants/colors";

export function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "9px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: C.oyster,
          display: "block",
          marginBottom: "10px",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
