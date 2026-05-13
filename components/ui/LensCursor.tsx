'use client';

import { useEffect, useRef } from 'react';

export function LensCursor() {
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lens = lensRef.current;
    if (!lens) return;

    let mouseX = 0, mouseY = 0, lensX = 0, lensY = 0;
    let raf: number | null = null;

    const update = () => {
      lensX += (mouseX - lensX) * 0.18;
      lensY += (mouseY - lensY) * 0.18;
      lens.style.left = `${lensX}px`;
      lens.style.top  = `${lensY}px`;
      if (Math.abs(mouseX - lensX) > 0.1 || Math.abs(mouseY - lensY) > 0.1) {
        raf = requestAnimationFrame(update);
      } else {
        raf = null;
      }
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onEnter = (e: Event) => {
      if ((e.target as HTMLElement).closest?.('.lens-target'))
        lens.classList.add('active');
    };
    const onLeave = (e: Event) => {
      if ((e.target as HTMLElement).closest?.('.lens-target'))
        lens.classList.remove('active', 'zoom');
    };
    const onDown = (e: Event) => {
      if ((e.target as HTMLElement).closest?.('.lens-target'))
        lens.classList.add('zoom');
    };
    const onUp = () => lens.classList.remove('zoom');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter, true);
    document.addEventListener('mouseout',  onLeave, true);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter, true);
      document.removeEventListener('mouseout',  onLeave, true);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={lensRef} className="lens-cursor" aria-hidden="true" />;
}
