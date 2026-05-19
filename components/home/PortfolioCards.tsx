'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { StatusDot } from '@/components/ui/StatusDot';

type Status = 'running' | 'shipped' | 'wip';

const projects = [
  {
    id: 1,
    featured: true,
    title: 'lunafrost Landing',
    category: 'WEB · NEXT.JS',
    description: '카페24 워드프레스에서 Vercel Next.js로 전환한 개인 브랜드 플랫폼. Notion CMS 연동 및 고성능 ISR 적용.',
    tech: ['Next.js 16', 'Tailwind CSS', 'Notion API'],
    status: 'running' as Status,
    href: '/apps',
    isAI: false,
  },
  {
    id: 2,
    featured: false,
    title: 'AlwaysPDF Tools',
    category: 'APP · CHROME EXTENSION',
    description: 'PDF 작업을 브라우저에서 바로 처리하는 크롬 확장 프로그램. OCR, 변환, 편집 기능 탑재.',
    tech: ['Chrome MV3', 'Tesseract.js', 'TypeScript'],
    status: 'shipped' as Status,
    href: '/apps',
    isAI: false,
  },
  {
    id: 3,
    featured: false,
    title: 'AI 콘텐츠 스튜디오',
    category: 'TOOL · AI WORKFLOW',
    description: 'YouTube 쇼츠, 블로그 자동화 파이프라인. Claude API와 영상 생성 도구를 연결한 워크플로우.',
    tech: ['Claude API', 'Python', 'Automation'],
    status: 'wip' as Status,
    href: '/tools',
    isAI: true,
  },
  {
    id: 4,
    featured: false,
    title: 'TaskSnap',
    category: 'APP · CHROME EXTENSION',
    description: 'Todoist의 단순함과 ClickUp의 파워를 결합한 스마트 태스크 매니저. 브라우저 안에서 바로 사용하는 생산성 도구.',
    tech: ['Chrome MV3', 'TypeScript'],
    status: 'shipped' as Status,
    href: 'https://chromewebstore.google.com/detail/TaskSnap/ipdbelmbiebiejclgnpnphbcbmhijogn',
    external: true,
    isAI: false,
  },
];

function FeaturedCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-2 lg:row-span-2"
    >
      <Link href={project.href} className="no-underline block h-full">
        <article
          className="pf-card lens-target border h-full flex flex-col"
          style={{
            padding: '3rem',
            borderColor: 'rgba(66,71,77,0.2)',
            background: 'rgba(24,28,34,0.4)',
            backdropFilter: 'blur(12px)',
            minHeight: '400px',
          }}
        >
          {/* corner brackets */}
          <span className="corner-tl" /><span className="corner-br" />

          <div className="flex justify-between items-start mb-10 gap-4">
            <div className="space-y-1">
              <span
                className="block font-[family-name:var(--font-mono)] text-[11px] tracking-wider uppercase"
                style={{ color: 'rgba(170,212,249,0.7)' }}
              >
                {project.category}
              </span>
              <h3
                className="font-[family-name:var(--font-cormorant)] italic"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: 'var(--text)' }}
              >
                {project.title}
              </h3>
            </div>
            <StatusDot status={project.status} />
          </div>

          <p className="leading-relaxed mb-10 flex-grow" style={{ fontSize: '15px', color: 'rgba(194,199,206,0.8)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2.5 mb-10">
            {project.tech.map(t => (
              <span
                key={t}
                className={`font-[family-name:var(--font-mono)] text-[10px] px-3 py-1.5 border ${project.isAI ? 'tag-ai' : ''}`}
                style={project.isAI ? {} : {
                  background: 'rgba(49,53,60,0.6)',
                  borderColor: 'rgba(66,71,77,0.3)',
                  color: 'var(--text)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <span
            className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] transition-colors duration-300"
            style={{ color: 'rgba(170,212,249,0.6)' }}
          >
            자세히 보기 →
          </span>
        </article>
      </Link>
    </motion.div>
  );
}

function SmallCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const linkProps = project.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={project.href} className="no-underline block h-full" {...linkProps}>
        <article
          className="pf-card border h-full flex flex-col"
          style={{
            padding: '2rem',
            borderColor: 'rgba(66,71,77,0.2)',
            background: 'rgba(24,28,34,0.4)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex justify-between items-start mb-4 gap-3">
            <div className="space-y-0.5">
              <span
                className="block font-[family-name:var(--font-mono)] text-[10px] tracking-wider uppercase"
                style={{ color: 'rgba(170,212,249,0.7)' }}
              >
                {project.category}
              </span>
              <h3
                className="font-[family-name:var(--font-cormorant)] italic text-xl"
                style={{ color: 'var(--text)' }}
              >
                {project.title}
              </h3>
            </div>
            <StatusDot status={project.status} />
          </div>

          <p className="text-sm leading-relaxed flex-grow mb-6" style={{ color: 'rgba(194,199,206,0.8)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map(t => (
              <span
                key={t}
                className={`font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-1 border ${project.isAI ? 'tag-ai' : ''}`}
                style={project.isAI ? {} : {
                  background: 'rgba(49,53,60,0.6)',
                  borderColor: 'rgba(66,71,77,0.3)',
                  color: 'var(--text)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <span
            className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em]"
            style={{ color: 'rgba(170,212,249,0.6)' }}
          >
            자세히 보기 →
          </span>
        </article>
      </Link>
    </motion.div>
  );
}

export default function PortfolioCards() {
  const featured = projects.find(p => p.featured) ?? projects[0];
  const others = projects.filter(p => p.id !== featured.id);

  return (
    <section className="py-32 px-5 md:px-16 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="space-y-3">
          <span
            className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase"
            style={{ color: 'rgba(170,212,249,0.6)' }}
          >
            PORTFOLIO · 만들어온 것들
          </span>
          <h2
            className="font-[family-name:var(--font-cormorant)] italic font-normal"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--text)' }}
          >
            손으로 빚은 것들.
          </h2>
        </div>
        <Link
          href="/apps"
          className="no-underline cta-secondary font-[family-name:var(--font-mono)] uppercase"
          style={{ fontSize: '11px', letterSpacing: '0.1em' }}
        >
          모든 프로젝트 →
        </Link>
      </div>

      {/* Mosaic grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FeaturedCard project={featured} />
        {others.map((p, i) => (
          <SmallCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
