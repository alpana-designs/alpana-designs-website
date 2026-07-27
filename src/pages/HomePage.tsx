import { useNavigate } from "react-router";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/home/ProjectCard";
import { TextLink } from "@/components/home/TextLink";
import { FOUNDER } from "@/constants/brand";
import { C } from "@/constants/colors";
import { homeProjects } from "@/data/homeProjects";
import { portfolioTiles } from "@/data/portfolioTiles";
import { paths } from "@/routing/paths";
import homepg from "@/images/HomePage1.jpeg";
import logoWordmark from "@/images/logo1-wordmark.png";

export function HomePage() {
  const navigate = useNavigate();

  const handleProjectClick = (projectName: string) => {
    const project = portfolioTiles.find((t) => t.name === projectName);
    if (project) {
      navigate(paths.project(project.slug));
    }
  };

  return (
    <div>
      {/* ── Hero ── */}
      <section
        style={{
          display: "flex",
          minHeight: "50vh",
          background: C.merino,
        }}
      >
        <div
          className="hidden md:block"
          style={{ width: "55%", flexShrink: 0, overflow: "hidden" }}
        >
          <img
            src={homepg}
            alt="Warm afternoon light over a chaise lounge in a minimal interior"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{ width: "100%", height: "80%", objectFit: "cover", display: "block" }}
          />
        </div>

        <div
          className="flex items-center px-6 pt-24 pb-16 md:px-0 md:pt-20 md:pb-20 md:pl-14 md:pr-16"
          style={{ flex: 1 }}
        >
          <div style={{ width: "100%" }}>
            <Eyebrow>Architecture · Interior Design</Eyebrow>
            <div style={{ marginTop: "20px" }}>
              {/* Primary wordmark — logo image */}
              <img
                src={logoWordmark}
                alt="Alpana S. Design"
                className="-translate-x-1 md:-translate-x-[18px]"
                style={{
                  width: "clamp(200px, 62vw, 380px)",
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
              <br />
              {/* Secondary tagline */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(16px, 2vw, 50px)",
                  letterSpacing: "0.04em",
                  color: C.cedar,
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                The Space Edit
                By Alpana.
              </p>

            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                color: C.oyster,
                maxWidth: "280px",
                lineHeight: 1.8,
                marginTop: "24px",
              }}
            >
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. */}
            </p>
            <div style={{ marginTop: "40px" }}>
              <TextLink onClick={() => navigate(paths.work)}>View our work</TextLink>
            </div>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: C.oyster,
                marginTop: "20px",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Selected Work ── */}
      <section style={{ background: C.merino, padding: "20px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <Eyebrow>Selected Projects</Eyebrow>
          </Reveal>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            style={{ marginTop: "40px" }}
          >
            {homeProjects.map((proj, i) => (
              <Reveal key={i} delay={i * 80}>
                <ProjectCard proj={proj} onClick={() => handleProjectClick(proj.name)} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={180}>
            <div style={{ textAlign: "center", marginTop: "56px" }}>
              <TextLink onClick={() => navigate(paths.work)}>See all projects</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
        <Hairline />
      </div> */}
      <br></br>

      {/* ── Pull Quote ── */}
      <section style={{ background: C.kangaroo, padding: "120px 32px" }}>
        <Reveal>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(24px, 3.8vw, 46px)",
                lineHeight: 1.45,
                letterSpacing: "0.01em",
                color: C.cedar,
              }}
            >
              "Design with Intent."
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: C.oyster,
                marginTop: "32px",
              }}
            >
              — {FOUNDER}, Principal Designer
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Services ── */}
      <section style={{ background: C.merino, padding: "120px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
            {[
              {
                numeral: "I",
                name: "Design & Turnkey Execution",
                desc: "A complete design-to-delivery experience, tailored exclusively for you.\nOur turnkey solutions combine creative excellence with flawless execution, allowing you to enjoy a stress-free transformation of your space. From conceptual design and immersive 3D visualizations to civil modifications, bespoke furniture, lighting, electrical and plumbing works, finishes, furnishings, décor, and final styling, every element is meticulously planned and executed.\nWith a single point of accountability, we deliver interiors that are sophisticated, functional, and move-in ready—crafted with uncompromising attention to quality, craftsmanship, and timelines.",
              },
              {
                numeral: "II",
                name: "End-to-End Consultancy",
                desc: "Design is more than creating beautiful spaces—it is about crafting environments that reflect your personality and enhance the way you live. From the initial consultation to the final handover, we guide every aspect of your project with precision and care.\nOur end-to-end consultancy covers design strategy, space planning, concept development, material curation, budgeting, vendor coordination, project management, site supervision, and quality assurance. Every detail is thoughtfully managed, ensuring a seamless journey and a home that is both timeless and uniquely yours.",
              },
              {
                numeral: "III",
                name: "Design Consultancy",
                desc: "For clients who seek exceptional design while preferring to manage execution independently, our consultancy service provides a complete creative roadmap.\nWe develop bespoke concepts supported by detailed layouts, working drawings, furniture planning, lighting design, material palettes, colour schemes, and comprehensive specifications. Every recommendation is carefully curated to ensure your vision is translated into a cohesive, elegant, and highly functional space, giving your execution team the clarity needed to achieve outstanding results.",
              },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "13px",
                      color: C.oyster,
                      letterSpacing: "0.08em",
                      marginBottom: "18px",
                    }}
                  >
                    {s.numeral}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 400,
                      fontSize: "28px",
                      color: C.cedar,
                      letterSpacing: "0.02em",
                      lineHeight: 1.2,
                      marginBottom: "16px",
                    }}
                  >
                    {s.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: C.oyster,
                      lineHeight: 1.8,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


