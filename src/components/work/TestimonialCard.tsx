import { C } from "@/constants/colors";

export function TestimonialCard({
  testimonial,
  projectName,
}: {
  testimonial: {
    text: string;
    author: string;
    role: string;
    project: string;
  };
  projectName: string;
}) {
  return (
    <div
      style={{
        padding: "32px",
        background: C.kangaroo,
        borderLeft: `2px solid ${C.cedar}`,
      }}
    >
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: "14px",
          color: C.cedar,
          lineHeight: 1.6,
          fontStyle: "italic",
          marginBottom: "20px",
        }}
      >
        "{testimonial.text}"
      </p>
      <div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: "13px",
            color: C.oyster,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {testimonial.author}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "11px",
            color: C.oyster,
            marginTop: "4px",
            opacity: 0.7,
          }}
        >
          {testimonial.role} · {projectName}
        </p>
      </div>
    </div>
  );
}
