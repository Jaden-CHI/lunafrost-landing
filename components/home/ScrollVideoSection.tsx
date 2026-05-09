"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  youtubeId?: string;
}

export default function ScrollVideoSection({ youtubeId }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], [50, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "var(--dark)" }}
    >
      {/* Section header */}
      <motion.div
        style={{ opacity, y: titleY }}
        className="text-center mb-16"
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--frost-dim)" }}
        >
          Work in Motion
        </p>
        <h2
          className="font-[family-name:var(--font-cormorant)] font-light"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--text)" }}
        >
          무엇을 만드는가
        </h2>
      </motion.div>

      {/* Video frame */}
      <motion.div
        style={{ scale, opacity }}
        className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden"
      >
        {/* Border glow */}
        <div
          className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 1px rgba(200,223,245,0.12)" }}
        />

        {youtubeId ? (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&controls=1&playlist=${youtubeId}&playsinline=1&rel=0&modestbranding=1`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              style={{ border: "none" }}
            />
          </div>
        ) : (
          <div
            className="w-full aspect-video flex flex-col items-center justify-center gap-4"
            style={{ background: "var(--surface)" }}
          >
            <div
              className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "var(--frost-dim)" }}
            >
              <div
                className="w-0 h-0 ml-1"
                style={{
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  borderLeft: "16px solid var(--frost-dim)",
                }}
              />
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              영상을 연결하면 여기에 표시됩니다
            </p>
          </div>
        )}
      </motion.div>

      {/* Bottom caption */}
      <motion.p
        style={{ opacity, color: "var(--text-muted)" }}
        className="text-center mt-12 text-sm leading-relaxed max-w-lg mx-auto"
      >
        AI와 코드, 콘텐츠가 교차하는 지점을 탐구합니다.
        <br />
        직접 만들고, 기록하고, 공유합니다.
      </motion.p>
    </section>
  );
}
