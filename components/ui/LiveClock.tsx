'use client';

import { useEffect, useState } from 'react';

export function LiveClock() {
  const [time, setTime] = useState<string>('—:—');

  useEffect(() => {
    const tick = () => {
      const kst = new Intl.DateTimeFormat('ko-KR', {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());
      setTime(kst);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="font-[family-name:var(--font-mono)] uppercase mt-1"
      style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(194,199,206,0.4)' }}
      aria-live="polite"
    >
      {time}
    </div>
  );
}
