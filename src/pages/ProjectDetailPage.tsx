import { useNavigate } from "react-router";
import { useState } from "react";
import { GalleryPhoto } from "@/components/project/GalleryPhoto";
import { Lightbox } from "@/components/project/Lightbox";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { C } from "@/constants/colors";
import { portfolioTiles } from "@/data/portfolioTiles";
import { paths } from "@/routing/paths";
import type { Tile } from "@/types";

interface ProjectDetailPageProps {
  project: Tile;
}

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const isInstagramVideo = project.videoUrl?.includes('instagram.com');
  const [nextHov, setNextHov] = useState(false);

  const currentIdx = portfolioTiles.findIndex((t) => t.name === project.name);
  const nextProject = portfolioTiles[(currentIdx + 1) % portfolioTiles.length];

  // Round-robin distribution keeps column heights balanced for any image count
  // (columns differ by at most 1 image, avoiding a nearly-empty last column).
  const galCol1 = project.galleryImages
    .map((img, i) => ({ img, i }))
    .filter(({ i }) => i % 3 === 0);
  const galCol2 = project.galleryImages
    .map((img, i) => ({ img, i }))
    .filter(({ i }) => i % 3 === 1);
  const galCol3 = project.galleryImages
    .map((img, i) => ({ img, i }))
    .filter(({ i }) => i % 3 === 2);

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };
  const prevPhoto = () =>
    setLightboxIndex((i) => (i - 1 + project.galleryImages.length) % project.galleryImages.length);
  const nextPhoto = () =>
    setLightboxIndex((i) => (i + 1) % project.galleryImages.length);

  const [categoryType, categoryLocation] = project.category.split(" · ");

  const specs = [
    { label: "Typology", value: project.specs.typology || categoryType },
    { label: "Location", value: project.specs.location || categoryLocation },
    ...(project.specs.yearCompleted ? [{ label: "Year Completed", value: project.specs.yearCompleted }] : []),
    ...(project.specs.area ? [{ label: "Area", value: project.specs.area }] : []),
    ...(project.specs.principal ? [{ label: "Principal", value: project.specs.principal }] : []),
    ...(project.specs.photography ? [{ label: "Photography", value: project.specs.photography }] : []),
  ];

  return (
    <div style={{ paddingTop: "72px", background: C.merino }}>

      {/* ── Section 1: Typographic Hero Header ── */}
      <section style={{ padding: "80px 32px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <button
              onClick={() => navigate(paths.work)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: C.oyster,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                marginBottom: "32px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.oyster)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.oyster)}
            >
              ← All Projects
            </button>
          </Reveal>

          <Reveal delay={60}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: C.oyster,
                marginBottom: "16px",
              }}
            >
              {project.category}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(40px, 6.5vw, 72px)",
                letterSpacing: "0.04em",
                color: C.cedar,
                lineHeight: 1.05,
                marginBottom: "20px",
              }}
            >
              {project.name}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontStyle: "italic",
                fontSize: "clamp(14px, 1.5vw, 18px)",
                color: C.oyster,
                maxWidth: "600px",
                lineHeight: 1.7,
                marginBottom: "32px",
              }}
            >
              {project.oneliner}
            </p>
          </Reveal>

          <Reveal delay={170}>
            <div
              className="flex flex-wrap items-center gap-4"
              style={{ marginBottom: "48px" }}
            >
              {[
                ...(project.specs.yearCompleted ? [`Year: ${project.specs.yearCompleted}`] : []),
                ...(project.specs.area ? [`Area: ${project.specs.area}`] : []),
                "Scope: Full Interior",
              ].map((meta, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      color: C.oyster,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {meta}
                  </span>
                  {i < 2 && (
                    <span style={{ width: "1px", height: "12px", background: C.oyster, display: "inline-block" }} />
                  )}
                </span>
              ))}
            </div>
            <div style={{ height: "1px", background: C.oyster }} />
          </Reveal>
        </div>
      </section>

      {/* ── Section 2: Primary Hero Photograph ── */}
      <section style={{ padding: "56px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <img
              src={project.heroImage || project.img}
              alt={project.name}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              style={{
                width: "100%",
                aspectRatio: "16/9",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Reveal>
        </div>
      </section>

      {/* ── Section 3: Project Narrative + Specs ── */}
      <section style={{ padding: "16px 32px 96px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-[55fr_35fr] gap-16 md:gap-24">
            {/* Left: Narrative */}
            <Reveal>
              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: C.oyster,
                    marginBottom: "14px",
                  }}
                >
                  The Brief
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    color: C.cedar,
                    lineHeight: 1.85,
                    marginBottom: "40px",
                  }}
                >
                  {project.brief}
                </p>
                {/* <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: C.oyster,
                    marginBottom: "14px",
                  }}
                >
                  Our Approach
                </p> */}
                {/* <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    color: C.cedar,
                    lineHeight: 1.85,
                  }}
                >
                  {project.approach}
                </p> */}
              </div>
            </Reveal>

            {/* Right: Specs */}
            <Reveal delay={100}>
              <div style={{ marginTop: "2px" }}>
                {specs.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      paddingBottom: "18px",
                      marginBottom: "18px",
                      borderBottom:
                        i < specs.length - 1 ? `1px solid ${C.kangaroo}` : "none",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: "9px",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: C.oyster,
                        marginBottom: "6px",
                      }}
                    >
                      {s.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 400,
                        fontSize: "20px",
                        color: C.cedar,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Section 4: Photo Gallery ── */}
      <section style={{ background: C.kangaroo, padding: "80px 32px 96px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <Eyebrow>Project Photography</Eyebrow>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
            <div>
              {galCol1.map(({ img, i }, colIdx) => (
                <Reveal key={i} delay={colIdx * 30}>
                  <GalleryPhoto imageUrl={img} globalIndex={i} onClick={openLightbox} priority={i < 3} />
                </Reveal>
              ))}
            </div>
            <div>
              {galCol2.map(({ img, i }, colIdx) => (
                <Reveal key={i} delay={colIdx * 30 + 10}>
                  <GalleryPhoto imageUrl={img} globalIndex={i} onClick={openLightbox} priority={i < 3} />
                </Reveal>
              ))}
            </div>
            <div>
              {galCol3.map(({ img, i }, colIdx) => (
                <Reveal key={i} delay={colIdx * 30 + 20}>
                  <GalleryPhoto imageUrl={img} globalIndex={i} onClick={openLightbox} priority={i < 3} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Video Walkthrough ── */}
      {project.videoUrl && (
        <section style={{ background: C.merino, padding: "96px 32px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <Reveal>
              <Eyebrow>Walkthrough</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  color: C.cedar,
                  letterSpacing: "0.03em",
                  marginTop: "12px",
                  marginBottom: "32px",
                }}
              >
                Experience the Space.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ position: "relative", width: "100%", aspectRatio: isInstagramVideo ? "9/16" : "16/9", maxWidth: isInstagramVideo ? "400px" : "100%", margin: isInstagramVideo ? "0 auto" : "0" }}>
                {isInstagramVideo && project.videoUrl ? (
                  <iframe
                    style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                    src={project.videoUrl}
                    title="Project Walkthrough"
                    allow="autoplay; fullscreen"
                    scrolling="no"
                  />
                ) : videoPlaying && project.videoUrl ? (
                  <iframe
                    style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                    src={`${project.videoUrl}?autoplay=1`}
                    title="Project Walkthrough"
                    allow="autoplay; fullscreen"
                  />
                ) : project.videoUrl ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: C.rifleGreen,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      gap: "24px",
                    }}
                    onClick={() => project.videoUrl && setVideoPlaying(true)}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        background: C.oyster,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    >
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderTop: "10px solid transparent",
                          borderBottom: "10px solid transparent",
                          borderLeft: "16px solid #FFFFFF",
                          marginLeft: "4px",
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: C.oyster,
                      }}
                    >
                      Project Walkthrough Video · {project.videoDuration || "--:--"}
                    </p>
                  </div>
                ) : null}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Section 6: Owner Testimonial ── */}
      {project.testimonial?.text && (
        <section style={{ background: C.kangaroo, padding: "120px 32px" }}>
          <Reveal>
            <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center" }}>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    top: "-48px",
                    left: "-16px",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "120px",
                    color: C.oyster,
                    opacity: 0.3,
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  "
                </span>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(20px, 2.8vw, 20px)",
                    color: C.cedar,
                    lineHeight: 1.55,
                    position: "relative",
                  }}
                >
                  {project.testimonial.text}
                </p>
              </div>

              <div style={{ height: "48px" }} />

              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: C.cedar,
                  }}
                >
                  {project.testimonial.author}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: C.oyster,
                    marginTop: "4px",
                  }}
                >
                  {project.testimonial.role} · {project.testimonial.project}
                </p>
              </div>

              <div style={{ marginTop: "28px", display: "flex", justifyContent: "center", gap: "6px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: C.oyster,
                    }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ── Section 7: Next Project CTA ── */}
      <div style={{ height: "1px", background: C.oyster }} />
      <section
        style={{
          background: C.cedar,
          padding: "0 32px",
          minHeight: "280px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={() => setNextHov(true)}
        onMouseLeave={() => setNextHov(false)}
        onClick={() => navigate(paths.project(nextProject.slug))}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "56px 0",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: C.oyster,
                marginBottom: "12px",
              }}
            >
              Next Project
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4.5vw, 52px)",
                color: "#FFFFFF",
                letterSpacing: "0.03em",
                lineHeight: 1.1,
                marginBottom: "10px",
              }}
            >
              {nextProject.name}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: C.oyster,
                letterSpacing: "0.06em",
              }}
            >
              {nextProject.category}
            </p>
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(56px, 8vw, 96px)",
              color: C.oyster,
              lineHeight: 1,
              transform: nextHov ? "translateX(16px)" : "translateX(0)",
              transition: "transform 0.3s ease",
              userSelect: "none",
              flexShrink: 0,
              marginLeft: "32px",
            }}
          >
            →
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          index={lightboxIndex}
          total={project.galleryImages.length}
          projectName={project.name}
          images={project.galleryImages}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </div>
  );
}


