'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const features = [
  {
    title: '고해상도 업스케일',
    body: '원본 품질을 살리면서 확대해도 선명한 결과물을 빠르게 확인합니다.',
  },
  {
    title: '배경·텍스처 정리',
    body: '콘텐츠에 맞게 디테일을 다듬고, 시각적 집중도를 높여줍니다.',
  },
  {
    title: '디자인용 프리뷰',
    body: '웹사이트, 광고, 앱 화면까지 바로 쓸 수 있는 고급형 미리보기 경험.',
  },
];

export default function ImageRescalerSpotlight() {
  return (
    <section className="px-5 py-28 md:px-16 md:py-36">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface)]/90 shadow-[0_30px_100px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-8 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <span
                className="block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.3em]"
                style={{ color: 'var(--tertiary)' }}
              >
                ATTACHED SOURCE · IMAGE RESCALER
              </span>
              <h2
                className="font-[family-name:var(--font-inter)] font-bold leading-[1.08]"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)' }}
              >
                이미지 한 장으로 <span style={{ color: 'var(--tertiary)' }}>더 선명한 결과</span>를 만들다.
              </h2>
              <p
                className="max-w-2xl leading-[1.75]"
                style={{ fontSize: '16px', color: 'var(--text-muted)' }}
              >
                첨부된 컨셉을 바탕으로, 업스케일부터 비교 미리보기까지 한 번에 체험할 수 있는 제품형 데모를 구성했습니다.
                웹, 배너, 포스터용 결과물까지 바로 떠올릴 수 있도록 정리된 흐름으로 보여줍니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {features.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[18px] border border-[color:var(--border)] bg-[color:var(--surface-low)] p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <h3
                    className="mb-2 font-[family-name:var(--font-inter)] font-semibold"
                    style={{ color: 'var(--text)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                    {item.body}
                  </p>
                </article>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/tools"
                className="cta-primary rim-light justify-center font-[family-name:var(--font-mono)] uppercase"
                style={{ padding: '0.95rem 1.8rem', fontSize: '11px', letterSpacing: '0.12em' }}
              >
                도구 둘러보기
              </Link>
              <Link
                href="/tools/image-rescaler"
                className="cta-secondary justify-center font-[family-name:var(--font-mono)] uppercase"
                style={{ padding: '0.95rem 1.8rem', fontSize: '11px', letterSpacing: '0.12em' }}
              >
                바로 체험하기 →
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative border-t border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(0,122,255,0.06),rgba(0,0,0,0.01))] p-8 md:p-12 lg:p-16 lg:border-t-0 lg:border-l"
          >
            <div className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)]/90 p-5 backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1">
              <div className="mb-5 flex items-center justify-between">
                <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  Image Rescaler
                </div>
                <div className="rounded-full border border-[color:var(--tertiary)]/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--tertiary)' }}>
                  Live
                </div>
              </div>

              <div className="rounded-[20px] border border-[color:var(--border)] bg-[color:var(--surface-low)] p-4">
                <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  <span>Original</span>
                  <span>Upscaled</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="img-ph aspect-[4/5] rounded-[16px] text-center text-[10px] uppercase tracking-[0.2em]">
                    1024 × 768
                  </div>
                  <div className="img-ph aspect-[4/5] rounded-[16px] border-[color:var(--tertiary)]/40 text-center text-[10px] uppercase tracking-[0.2em]">
                    2048 × 1536
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                    Resolution
                  </div>
                  <div className="mt-1 text-2xl font-semibold" style={{ color: 'var(--text)' }}>
                    2048 × 1365
                  </div>
                </div>
                <div className="rounded-full border border-[color:var(--border)] px-3 py-2 text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--tertiary)' }}>
                  +38% Sharper
                </div>
              </div>

              <div className="mt-5 rounded-[16px] border border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(0,122,255,0.08),transparent)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                      Output preview
                    </div>
                    <div className="mt-1 text-sm font-medium" style={{ color: 'var(--text)' }}>
                      고해상도·디테일 강화·즉시 비교
                    </div>
                  </div>
                  <div className="rounded-full border border-[color:var(--tertiary)]/35 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--tertiary)' }}>
                    AI Style
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
