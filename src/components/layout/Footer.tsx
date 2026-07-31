import { Facebook, Instagram, Youtube } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { NavItem } from "@/components/ui/NavItem";
import { STUDIO_SHORT } from "@/constants/brand";
import { C } from "@/constants/colors";
import logoSrc from "@/images/logo1.png";
import { paths } from "@/routing/paths";
import type { Page } from "@/types";

export function Footer() {
  const navigate = useNavigate();

  const goToPage = (p: Exclude<Page, "project">) => {
    const path = p === "home" ? paths.home : paths[p];
    navigate(path);
  };

  return (
    <footer style={{ background: C.rifleGreen }}>
      <div
        className="mx-auto"
        style={{ maxWidth: "1280px", padding: "6px 32px 40px" }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <button
            onClick={() => goToPage("home")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 0 }}
            aria-label="Alpana S. Design — Home"
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <ImageWithFallback
                src={logoSrc}
                alt="Alpana S. Design wordmark"
                style={{
                  height: "clamp(160px, 34vw, 250px)",
                  width: "auto",
                  display: "block",
                  objectFit: "contain",
                  clipPath: "inset(20% 0 20% 0)",
                  filter: "invert(1)",
                }}
              />
            </span>
          </button>
          <div className="flex items-center gap-8">
            {(["work", "studio", "contact"] as Exclude<Page, "project">[]).map((p) => (
              <NavItem
                key={p}
                label={p.charAt(0).toUpperCase() + p.slice(1)}
                active={false}
                onClick={() => goToPage(p)}
                light
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="https://www.instagram.com/alpanas.design/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: C.white,
                cursor: "pointer",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = C.kangaroo}
              onMouseLeave={(e) => e.currentTarget.style.color = C.white}
            >
              <Instagram size={14} strokeWidth={1.75} />
              Instagram
            </a>
            <a
              href="https://www.facebook.com/alpanas.design"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: C.white,
                cursor: "pointer",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = C.kangaroo}
              onMouseLeave={(e) => e.currentTarget.style.color = C.white}
            >
              <Facebook size={14} strokeWidth={1.75} />
              Facebook
            </a>
            <a
              href="https://www.youtube.com/@Alpanas.design"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: C.white,
                cursor: "pointer",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = C.kangaroo}
              onMouseLeave={(e) => e.currentTarget.style.color = C.white}
            >
              <Youtube size={14} strokeWidth={1.75} />
              YouTube
            </a>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.borderFade}`, paddingTop: "24px" }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              color: C.oyster,
            }}
          >
            © 2026 {STUDIO_SHORT}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
