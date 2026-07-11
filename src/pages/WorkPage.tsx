import { useNavigate } from "react-router";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FlipCard } from "@/components/work/FlipCard";
import { TestimonialCard } from "@/components/work/TestimonialCard";
import { C } from "@/constants/colors";
import { portfolioTiles } from "@/data/portfolioTiles";
import { paths } from "@/routing/paths";
import type { Tile } from "@/types";

export function WorkPage() {
  const navigate = useNavigate();

  const onProjectSelect = (tile: Tile) => {
    navigate(paths.project(tile.slug));
  };
  const col1 = portfolioTiles.filter((_, i) => i % 3 === 0);
  const col2 = portfolioTiles.filter((_, i) => i % 3 === 1);
  const col3 = portfolioTiles.filter((_, i) => i % 3 === 2);
  
  const testimonials = portfolioTiles
    .filter((tile) => tile.testimonial)
    .map((tile) => ({ testimonial: tile.testimonial!, projectName: tile.name }))
    .slice(0, 3);

  return (
    <div style={{ paddingTop: "72px", background: C.merino }}>
      {/* ── Header ── */}
      <section style={{ padding: "80px 32px 56px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <Eyebrow>Portfolio</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(40px, 5.5vw, 56px)",
                color: C.cedar,
                letterSpacing: "0.04em",
                marginTop: "12px",
              }}
            >
              The Work.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: C.oyster,
                marginTop: "14px",
                maxWidth: "420px",
                lineHeight: 1.8,
              }}
            >
              Each project is an exploration of space, light, and intention.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Masonry Grid ── */}
      <section style={{ padding: "0 32px 120px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          >
            <div>
              {col1.map((tile, i) => (
                <Reveal key={i} delay={i * 60}>
                  <FlipCard tile={tile} onSelect={onProjectSelect} />
                </Reveal>
              ))}
            </div>
            <div>
              {col2.map((tile, i) => (
                <Reveal key={i} delay={i * 60 + 30}>
                  <FlipCard tile={tile} onSelect={onProjectSelect} />
                </Reveal>
              ))}
            </div>
            <div>
              {col3.map((tile, i) => (
                <Reveal key={i} delay={i * 60 + 60}>
                  <FlipCard tile={tile} onSelect={onProjectSelect} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {/* {testimonials.length > 0 && (
        <section style={{ padding: "0 32px 120px", background: C.kangaroo }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <Reveal>
              <Eyebrow>Client Words</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(32px, 4vw, 44px)",
                  color: C.cedar,
                  letterSpacing: "0.03em",
                  marginTop: "14px",
                }}
              >
                What they say.
              </h2>
            </Reveal>
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              style={{ marginTop: "48px" }}
            >
              {testimonials.map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <TestimonialCard
                    testimonial={item.testimonial}
                    projectName={item.projectName}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )} */}
    </div>
  );
}


