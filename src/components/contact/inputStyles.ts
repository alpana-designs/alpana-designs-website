import { CSSProperties } from "react";
import { C } from "@/constants/colors";

export const inputBase: CSSProperties = {
  width: "100%",
  background: "#FFFFFF",
  border: "none",
  borderBottom: `1px solid ${C.oyster}`,
  outline: "none",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "15px",
  color: C.cedar,
  padding: "10px 0",
  transition: "border-bottom 0.2s ease",
};
