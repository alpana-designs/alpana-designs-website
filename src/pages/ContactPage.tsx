import { useState, FormEvent, FocusEvent } from "react";
import { FormField } from "@/components/contact/FormField";
import { inputBase } from "@/components/contact/inputStyles";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Hairline } from "@/components/ui/Hairline";
import { Reveal } from "@/components/ui/Reveal";
import { SolidBtn } from "@/components/ui/SolidBtn";
import { C } from "@/constants/colors";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", brief: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderBottom = `2px solid ${C.cedar}`;
    e.currentTarget.style.transition = "border-bottom 0.3s ease";
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderBottom = `1px solid ${C.oyster}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`New Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone || 'Not provided'}\n` +
      `Project Type: ${form.type || 'Not specified'}\n\n` +
      `Project Brief:\n${form.brief}`
    );
    
    window.location.href = `mailto:contact@alpanas.design?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: "72px", background: C.merino }}>
      {/* ── Header ── */}
      <section style={{ padding: "100px 32px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <Eyebrow>Get in Touch</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(40px, 6vw, 64px)",
                color: C.cedar,
                letterSpacing: "0.03em",
                lineHeight: 1.08,
                marginTop: "18px",
                whiteSpace: "pre-line",
              }}
            >
              {"Let's build\nsomething\nbeautiful."}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                color: C.oyster,
                maxWidth: "520px",
                lineHeight: 1.85,
                marginTop: "28px",
              }}
            >
              We take on a limited number of projects each year. If you're looking for a studio
              that listens before it designs, we'd love to hear from you.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ marginTop: "64px" }}>
              <Hairline />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact Layout ── */}
      <section style={{ padding: "100px 32px 140px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-16 md:gap-24">
            {/* Left: Details */}
            <Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                {[
                  {
                    label: "Studio Address",
                    value: "3a 44 , Manali hsg society , Evershine Nagar ,\nMalad West Mumbai 400064",
                    serif: true,
                  },
                  {
                    label: "Email",
                    value: "contact@alpanas.design",
                    accent: true,
                  },
                  { label: "Phone", value: "+91 9324138179" },
                  {
                    label: "Hours",
                    value: "Monday – Friday\n10:00 – 19:00 IST",
                    muted: true,
                  },
                ].map((item, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: "10px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: C.oyster,
                        marginBottom: "12px",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: item.serif
                          ? "'Cormorant Garamond', serif"
                          : "'DM Sans', sans-serif",
                        fontSize: item.serif ? "23px" : "16px",
                        color: item.accent ? C.oyster : item.muted ? C.oyster : C.cedar,
                        lineHeight: 1.6,
                        whiteSpace: "pre-line",
                        textDecoration: item.accent ? "underline" : "none",
                        cursor: item.accent ? "pointer" : "default",
                        transition: item.accent ? "color 0.2s ease, text-decoration 0.2s ease" : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (item.accent) {
                          e.currentTarget.style.color = C.cedar;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (item.accent) {
                          e.currentTarget.style.color = C.oyster;
                        }
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}

                <div style={{ paddingTop: "12px" }}>
                  <a href="tel:+919324138179" style={{ textDecoration: 'none', display: 'inline-block' }}>
                    <SolidBtn>Contact Us</SolidBtn>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right: Form */}
            <Reveal delay={100}>
              {submitted ? (
                <div
                  style={{
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "42px",
                      color: C.cedar,
                      letterSpacing: "0.03em",
                      lineHeight: 1.1,
                    }}
                  >
                    Thank you.
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "15px",
                      color: C.oyster,
                      marginTop: "20px",
                      lineHeight: 1.8,
                      maxWidth: "400px",
                    }}
                  >
                    Your inquiry has been received. We'll be in touch within 48 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "36px" }}
                >
                  <FormField label="Full Name">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      required
                      style={inputBase}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </FormField>

                  <FormField label="Email Address">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      required
                      style={inputBase}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </FormField>

                  <FormField label="Phone / Mobile">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      style={inputBase}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </FormField>

                  <FormField label="Project Type">
                    <select
                      value={form.type}
                      onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                      style={{
                        ...inputBase,
                        appearance: "none" as const,
                        cursor: "pointer",
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      <option value="">Select…</option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Consultation</option>
                      <option>Other</option>
                    </select>
                  </FormField>

                  <FormField label="Project Brief">
                    <textarea
                      rows={5}
                      value={form.brief}
                      onChange={(e) => setForm((f) => ({ ...f, brief: e.target.value }))}
                      style={{
                        ...inputBase,
                        resize: "none",
                        display: "block",
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </FormField>

                  <SolidBtn type="submit" full>
                    Send Inquiry
                  </SolidBtn>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Instagram ── */}
      <Hairline />
      <section style={{ padding: "100px 32px 140px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <Eyebrow>Follow Our Work</Eyebrow>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(32px, 4vw, 48px)",
                  color: C.cedar,
                  letterSpacing: "0.03em",
                  lineHeight: 1.1,
                  marginTop: "18px",
                }}
              >
                On Instagram
              </h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div
              style={{
                maxWidth: "640px",
                margin: "0 auto",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06)";
              }}
            >
              <iframe
                title="Instagram — Alpana S. Design"
                src="https://www.instagram.com/alpanas.design/embed"
                style={{
                  width: "100%",
                  height: "400px",
                  border: "none",
                  display: "block",
                }}
                loading="lazy"
                scrolling="no"
              />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div style={{ textAlign: "center", marginTop: "48px" }}>
              <a
                href="https://www.instagram.com/alpanas.design/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  color: C.oyster,
                  textDecoration: "underline",
                  letterSpacing: "0.02em",
                  transition: "color 0.2s ease, text-decoration 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = C.cedar;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = C.oyster;
                }}
              >
                @alpanas.design
              </a>
            </div>
          </Reveal>
        </div>
      </section>
            {/* ── Map ── */}
      <Hairline />
      <div style={{ height: "450px", overflow: "hidden", position: "relative" }}>
        <a
          href="https://maps.app.goo.gl/xMrdYrmdAemMn7on6"
          target="_blank"
          rel="noopener noreferrer"
          style={{ position: "absolute", inset: 0, zIndex: 10 }}
          aria-label="Open in Google Maps"
        />
        <iframe
          title="Studio Location — Alpana Design"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.8396!2d72.8276327!3d19.1917472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6eb0345240f:0x281b43fd1e40d6c!2sManali+Society,+Evershine+Nagar,+Malad+West,+Mumbai,+Maharashtra+400064!5e0!3m2!1sen!2sin!4v1234567890!12z"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            filter: "grayscale(1) sepia(0.15) opacity(0.75)",
            display: "block",
            transition: "filter 0.3s ease",
          }}
          loading="lazy"
          allowFullScreen
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = "grayscale(0.5) sepia(0.1) opacity(0.85)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "grayscale(1) sepia(0.15) opacity(0.75)";
          }}
        />
      </div>
    </div>
  );
}


