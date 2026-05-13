const STATUS_CONFIG = {
  running: { dot: 'status-running', color: '#9bd6b3', label: '운영 중' },
  shipped: { dot: 'status-shipped', color: '#aad4f9', label: '출시 완료' },
  wip:     { dot: 'status-wip',     color: '#f5c98a', label: '개발 중' },
} as const;

export function StatusDot({ status }: { status: keyof typeof STATUS_CONFIG }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] flex items-center"
      style={{ color: cfg.color }}
    >
      <span className={`status-dot ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
