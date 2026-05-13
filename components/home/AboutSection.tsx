'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const stats = [
  { value: '8.5', label: 'YEARS · DEV',   href: undefined },
  { value: '124', label: 'PROJECTS →',     href: '/apps' },
  { value: '42',  label: 'ARTICLES →',     href: '/blog' },
  { value: '8.4M',label: 'VIEWS · YT →',  href: '/youtube' },
];

export default function AboutSection() {
  return (
    <section className="relative py-40 overflow-hidden" style={{ background: 'rgba(24,28,34,0.2)' }}>
      <div className="absolute inset-0 grid-bg-fine opacity-50" />

      <div className="max-w-[1280px] mx-auto px-5 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">

        {/* Image — 5 cols + intentional mt-20 offset */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 order-2 lg:order-1 lg:mt-20"
        >
          <div className="relative max-w-md mx-auto lg:ml-0" style={{ aspectRatio: '1/1' }}>
            <span className="corner-tl" /><span className="corner-tr" />
            <span className="corner-bl" /><span className="corner-br" />
            <div className="absolute inset-4 overflow-hidden lens-target">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/IC.png"
                alt="Technical workspace"
                className="w-full h-full object-cover transition-all duration-1000"
                style={{ filter: 'grayscale(1)', opacity: 0.6, transform: 'scale(1.05)' }}
                onMouseEnter={e => {
                  const img = e.currentTarget;
                  img.style.filter = 'grayscale(0)';
                  img.style.opacity = '1';
                  img.style.transform = 'scale(1)';
                }}
                onMouseLeave={e => {
                  const img = e.currentTarget;
                  img.style.filter = 'grayscale(1)';
                  img.style.opacity = '0.6';
                  img.style.transform = 'scale(1.05)';
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Text — 7 cols */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-10 order-1 lg:order-2"
        >
          <div className="space-y-4">
            <span
              className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase"
              style={{ color: 'rgba(170,212,249,0.6)' }}
            >
              CORE VALUES · 운영 철학
            </span>
            <h2
              className="font-[family-name:var(--font-cormorant)] italic font-normal leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)' }}
            >
              Exploring the frontier of{' '}
              <span style={{ color: 'var(--primary)' }}>technical creativity.</span>
            </h2>
          </div>

          <p style={{ fontSize: '17px', lineHeight: '1.7', color: 'var(--text-muted)' }}>
            단순히 코드를 짜는 것을 넘어, 기술이 우리의 일상과 창작 방식을 어떻게
            변화시키는지 탐구합니다. AI라는 거대한 도구를 활용해 더 나은 사용자
            경험과 효율적인 시스템을 설계하는 것이 목표입니다.
          </p>

          {/* 4 stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t"
            style={{ borderColor: 'rgba(66,71,77,0.15)' }}
          >
            {stats.map(stat => {
              const inner = (
                <>
                  <div
                    className="font-[family-name:var(--font-cormorant)] italic mb-1"
                    style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: 'var(--primary)' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest"
                    style={{ color: 'rgba(194,199,206,0.5)' }}
                  >
                    {stat.label}
                  </div>
                </>
              );

              return stat.href ? (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="no-underline group block transition-opacity duration-300 hover:opacity-80"
                >
                  {inner}
                </Link>
              ) : (
                <div key={stat.label}>{inner}</div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
