'use client';

import { useEffect } from 'react';

export function useGrowingLine(selector = '.grow-line, .grow-rule', threshold = 0.15) {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold }
    );

    document.querySelectorAll(selector).forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [selector, threshold]);
}
