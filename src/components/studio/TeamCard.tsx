import { useState } from "react";
import { C } from "@/constants/colors";
import type { TeamMember } from "@/types";

export function TeamCard({
  member,
}: {
  member: TeamMember;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ overflow: "hidden", background: C.kangaroo }}>
        <img
          src={member.img}
          alt={member.name}
          style={{
            width: "100%",
            aspectRatio: "1/1",
            objectFit: "cover",
            objectPosition: "center 18%",
            display: "block",
            filter: hov ? "brightness(1.1)" : "brightness(1)",
            transition: "filter 0.4s ease",
          }}
        />
      </div>
      <div style={{ paddingTop: "20px" }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "22px",
            color: C.cedar,
            letterSpacing: "0.02em",
          }}
        >
          {member.name}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.oyster,
            marginTop: "6px",
          }}
        >
          {member.role}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            color: C.oyster,
            lineHeight: 1.7,
            marginTop: "12px",
          }}
        >
          {member.bio}
        </p>
      </div>
    </div>
  );
}