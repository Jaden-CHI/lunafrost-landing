'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      className="py-32 px-5 md:px-16 border-y"
      style={{ borderColor: 'rgba(66,71,77,0.1)', background: 'rgba(10,14,20,0.5)' }}
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Copy */}
        <div className="space-y-6">
          <span
            className="block font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase"
            style={{ color: 'rgba(170,212,249,0.6)' }}
          >
            SUBSCRIBE · 매주 일요일 발행
          </span>
          <h2
            className="font-[family-name:var(--font-cormorant)] italic font-normal leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)' }}
          >
            새로운 글이<br />도착하면 알려드릴게요.
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--text-muted)' }}>
            AI, 개인 개발, 콘텐츠 운영에 대한 매주 하나의 길고 정제된 글.
            스팸 없이, 가치 있는 내용만 보내드립니다.
          </p>
        </div>

        {/* Form */}
        <div>
          {status === 'success' ? (
            <div
              className="font-[family-name:var(--font-mono)] text-sm"
              style={{ color: 'var(--good)' }}
            >
              ✓ 구독 완료. 다음 호에서 뵙겠습니다.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="newsletter-email"
                  className="block font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] mb-3"
                  style={{ color: 'rgba(194,199,206,0.5)' }}
                >
                  [01] EMAIL
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  className="term-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              {status === 'error' && (
                <p className="font-[family-name:var(--font-mono)] text-[11px]" style={{ color: 'var(--bad)' }}>
                  오류가 발생했습니다. 다시 시도해주세요.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="cta-primary rim-light font-[family-name:var(--font-mono)] uppercase w-full justify-center disabled:opacity-50"
                style={{ padding: '1rem 2rem', fontSize: '11px', letterSpacing: '0.1em' }}
              >
                {status === 'loading' ? '처리 중...' : '구독하기'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
