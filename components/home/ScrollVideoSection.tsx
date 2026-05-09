"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  videoSrc?: string;
}

export default function ScrollVideoSection({ videoSrc }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // GSAP scroll-scrub video
  useEffect(() => {
    if (!videoRef.current || !videoSrc) return;

    const video = videoRef.current;

    const onMetadata = () => {
      const duration = video.duration;
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          video.currentTime = self.progress * duration;
        },
      });
    };

    video.addEventListener("loadedmetadata", onMetadata);
    return () => {
      video.removeEventListener("loadedmetadata", onMetadata);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [videoSrc]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "var(--dark)" }}
    >
      {/* Section label */}
      <motion.div
        style={{ opacity, y }}
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
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "var(--text)",
          }}
        >
          무엇을 만드는가
        </h2>
      </motion.div>

      {/* Video frame */}
      <motion.div
        style={{ scale, opacity }}
        className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden"
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div
          className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(200,223,245,0.12)",
          }}
        />

        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            className="w-full aspect-video object-cover"
          />
        ) : (
          /* Placeholder */
          <div
            className="w-full aspect-video flex flex-col items-center justify-center gap-4"
            style={{ background: "var(--surface)" }}
          >
            <div
              className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "var(--frost-dim)" }}
            >
              <div
                className="w-0 h-0"
                style={{
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  borderLeft: `16px solid var(--frost-dim)`,
                  marginLeft: "4px",
                }}
              />
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              영상을 업로드하면 여기에 표시됩니다
            </p>
          </div>
        )}
      </motion.div>

      {/* Bottom label */}
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
