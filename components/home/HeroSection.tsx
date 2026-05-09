"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

interface Props {
  youtubeId?: string;
}

export default function HeroSection({ youtubeId }: Props) {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${youtubeId}&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1`}
            className="absolute w-[300%] h-[300%] -top-[100%] -left-[100%]"
            allow="autoplay; fullscreen"
            style={{ border: "none", pointerEvents: "none" }}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 20% 20%, rgba(60,100,160,0.25) 0%, transparent 60%),
                radial-gradient(ellipse 60% 80% at 80% 80%, rgba(30,60,110,0.2) 0%, transparent 60%),
                var(--dark)
              `,
            }}
          />
        )}
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,12,18,0.55) 0%, rgba(8,12,18,0.25) 50%, rgba(8,12,18,0.88) 100%)",
          }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(rgba(200,223,245,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200,223,245,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-xs tracking-[0.35em] uppercase mb-8"
          style={{ color: "var(--frost-dim)" }}
        >
          AI · Dev · App · Contents
        </motion.p>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-[family-name:var(--font-cormorant)] font-light leading-none mb-8"
          style={{
            fontSize: "clamp(4rem, 12vw, 9rem)",
            color: "var(--text)",
            letterSpacing: "-0.02em",
          }}
        >
          luna<em style={{ fontStyle: "italic", color: "var(--frost)" }}>frost</em>
        </motion.h1>

        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-12 h-px mx-auto mb-8 opacity-50"
          style={{ background: "var(--frost-dim)" }}
        />

        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg leading-relaxed mb-12 max-w-xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          AI 트렌드, 앱 개발, 콘텐츠 전략을 탐구하는 공간.
          <br />
          기술과 창작의 경계를 걷는 Moonyth의 기록입니다.
        </motion.p>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link
            href="/blog"
            className="px-8 py-3 text-sm tracking-widest uppercase no-underline rounded-full transition-opacity duration-300 hover:opacity-80"
            style={{ background: "var(--frost)", color: "var(--dark)", fontWeight: 500 }}
          >
            블로그 보기
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 text-sm tracking-widest uppercase no-underline rounded-full border transition-colors duration-300"
            style={{ borderColor: "rgba(200,223,245,0.3)", color: "var(--text-muted)" }}
          >
            About
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--text-muted)" }}
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "var(--frost-dim)" }}
        />
      </motion.div>
    </section>
  );
}
