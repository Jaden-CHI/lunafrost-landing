"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "08+", label: "Years Experience" },
  { value: "50+", label: "Projects Shared" },
];

export default function AboutSection() {
  return (
    <section
      className="relative py-48 overflow-hidden"
      style={{ background: "rgba(24, 28, 34, 0.2)" }}
    >
      <div
        className="max-w-[1280px] mx-auto px-5 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center"
      >
        {/* Image frame */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 lg:order-1"
        >
          <div
            className="relative border max-w-lg mx-auto lg:ml-0"
            style={{
              aspectRatio: "1/1",
              borderColor: "rgba(66, 71, 77, 0.2)",
              padding: "2rem",
            }}
          >
            {/* Corner brackets */}
            <div
              className="absolute border-t border-l"
              style={{
                top: "-1rem",
                left: "-1rem",
                width: "3rem",
                height: "3rem",
                borderColor: "rgba(170, 212, 249, 0.4)",
              }}
            />
            <div
              className="absolute border-b border-r"
              style={{
                bottom: "-1rem",
                right: "-1rem",
                width: "3rem",
                height: "3rem",
                borderColor: "rgba(170, 212, 249, 0.4)",
              }}
            />
            {/* Visual placeholder */}
            <div
              className="w-full h-full relative overflow-hidden"
              style={{ background: "rgba(49, 53, 60, 0.1)" }}
            >
              <div
                className="absolute inset-0 technical-grid opacity-60"
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
              >
                <span
                  className="font-[family-name:var(--font-cormorant)] italic"
                  style={{
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    color: "rgba(170, 212, 249, 0.15)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  lunafrost
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12 order-1 lg:order-2"
        >
          <div className="space-y-4">
            <span
              className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase"
              style={{ color: "rgba(170, 212, 249, 0.6)" }}
            >
              CORE VALUES
            </span>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-normal italic leading-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--text)",
              }}
            >
              Exploring the frontier of technical creativity.
            </h2>
          </div>

          <p
            className="leading-relaxed max-w-xl"
            style={{ fontSize: "1.125rem", lineHeight: "1.7", color: "var(--text-muted)" }}
          >
            단순히 코드를 짜는 것을 넘어, 기술이 우리의 일상과 창작 방식을 어떻게
            변화시키는지 탐구합니다. 인공지능이라는 거대한 도구를 활용해 더 나은
            사용자 경험과 효율적인 시스템을 설계하는 것이 목표입니다.
          </p>

          <div
            className="grid grid-cols-2 gap-12 pt-8 border-t"
            style={{ borderColor: "rgba(66, 71, 77, 0.15)" }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-[family-name:var(--font-cormorant)] mb-2"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--primary)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest"
                  style={{ color: "rgba(194, 199, 206, 0.5)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
