import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { TeamCard } from "@/components/studio/TeamCard";
import { FOUNDER, TEAM_MEMBERS } from "@/constants/brand";
import teamIMG from "@/images/team-photo.JPG";
import { C } from "@/constants/colors";

export function StudioPage() {
  return (
    <div style={{ paddingTop: "72px" }}>
      {/* ── Studio Intro ── */}
      <section style={{ background: C.merino }}>
        <div
          className="mx-auto flex flex-col"
          style={{ maxWidth: "1280px" }}
        >
          <div
            style={{ 
              width: "100%", 
              maxWidth: "900px", 
              margin: "0 auto", 
              overflow: "hidden", 
              background: C.kangaroo,
              boxShadow: "0 4px 24px rgba(67, 68, 43, 0.12)"
            }}
          >
            <img
              src={teamIMG}
              alt="Alpana Designs studio team"
              width={1800}
              height={1200}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "72px 56px 76px 56px",
            }}
          >
            <div>
              <Reveal>
                <Eyebrow>Our Studio</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h1
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "clamp(36px, 4.5vw, 56px)",
                    letterSpacing: "0.03em",
                    color: C.cedar,
                    lineHeight: 1.1,
                    marginTop: "16px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {"Designing with Intent."}
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    color: C.oyster,
                    maxWidth: "1500px",
                    lineHeight: 1.85,
                    marginTop: "28px",
                  }}
                >
                Alpana S Design is a design studio where over 26 years of experience meets contemporary thinking. Built on a strong foundation in architecture and shaped by a deep understanding of interior design, we believe that every space should be thoughtfully planned with purpose and precision.
                Our design philosophy is rooted in creating environments that balance functionality, spatial flow, and meticulous attention to detail. Every project is approached with the belief that exceptional design is not merely about aesthetics—it is about crafting spaces that are intuitive to use, refined in character, and deeply personal to those who inhabit them.
                Complementing this experience is a dynamic team of young designers who bring fresh perspectives, creative energy, and the latest design technologies to every project. By combining proven expertise with innovative thinking, we deliver spaces that are timeless, practical, and relevant to modern lifestyles.
                At Alpana S Design, every design decision is intentional, allowing elegance and refined aesthetics to emerge naturally from a well-resolved and thoughtfully executed design.
                </p>
              </Reveal>
              <Reveal delay={190}>
                <div
                  style={{
                    width: "60px",
                    height: "1px",
                    background: C.oyster,
                    margin: "40px 0 20px",
                    opacity: 0.6,
                  }}
                />
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: C.oyster,
                  }}
                >
                  Alpana Sukerkar · Principal Designer
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ background: C.merino, padding: "0px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <Eyebrow>The People</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(32px, 4vw, 44px)",
                letterSpacing: "0.03em",
                color: C.cedar,
                lineHeight: 1.15,
                marginTop: "0px",
                whiteSpace: "pre-line",
              }}
            >
              {"A Studio That Designs with Intention."}
            </h2>
            <br></br>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TEAM_MEMBERS.slice(0, 3).map((member, i) => (
              <Reveal key={member.name} delay={i * 60}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-12 mt-12">
            {TEAM_MEMBERS.slice(3).map((member, i) => (
              <Reveal
                key={member.name}
                delay={(i + 3) * 60}
                className="w-full md:w-[calc((100%-3rem)/3)]"
              >
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <br /> <br /> <br />
    </div>
  );
}


