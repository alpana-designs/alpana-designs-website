import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { NavItem } from "@/components/ui/NavItem";
import { C } from "@/constants/colors";
import logoSrc from "@/images/logo1.png";
import { paths } from "@/routing/paths";
import type { Page } from "@/types";

export interface HeaderProps {
  current: Page;
}

export function Header({ current }: HeaderProps) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goToPage = (p: Page) => {
    const path = p === "home" ? paths.home : paths[p];
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: scrolled ? "#FFFFFF" : "transparent",
          boxShadow: scrolled ? `0 1px 24px ${C.shadow}` : "none",
          transition: "background 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{ maxWidth: "1280px", padding: "0 32px", height: "72px" }}
        >
          <button
            onClick={() => goToPage("home")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 0 }}
            aria-label="Alpana S. Design — Home"
          >
            <ImageWithFallback
              src={logoSrc}
              alt="Alpana S. Design wordmark"
              style={{
                height: "225px",
                width: "auto",
                display: "block",
                mixBlendMode: "multiply",
                objectFit: "contain",
              }}
            />
          </button>

          <div className="hidden md:flex items-center gap-10">
            {(["home", "work", "studio", "contact"] as Page[]).map((p) => (
              <NavItem
                key={p}
                label={p.charAt(0).toUpperCase() + p.slice(1)}
                active={current === p}
                onClick={() => goToPage(p)}
              />
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="md:hidden flex flex-col gap-[6px] p-2"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span
              style={{ display: "block", width: "22px", height: "1px", background: C.cedar }}
            />
            <span
              style={{ display: "block", width: "22px", height: "1px", background: C.cedar }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
        style={{
          background: C.rifleGreen,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          style={{
            position: "absolute",
            top: "24px",
            right: "32px",
            background: "none",
            border: "none",
            color: C.merino,
            fontSize: "18px",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ✕
        </button>
        <div className="flex flex-col items-center gap-6">
          {(["home", "work", "studio", "contact"] as Page[]).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(36px, 8vw, 56px)",
                letterSpacing: "0.05em",
                color: C.merino,
                textTransform: "capitalize",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
