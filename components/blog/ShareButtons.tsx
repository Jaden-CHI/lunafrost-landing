"use client";

interface Props {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: Props) {
  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${url}`
      : `https://aimoonyth.com${url}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`;

  return (
    <div
      className="flex gap-4 items-center py-8 border-t border-b my-8"
      style={{ borderColor: "var(--border)" }}
    >
      <span className="text-sm" style={{ color: "var(--text-muted)" }}>
        공유하기
      </span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm px-4 py-1.5 rounded-full border no-underline transition-colors duration-200"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        Twitter / X
      </a>
      <button
        onClick={() => navigator.clipboard.writeText(fullUrl)}
        className="text-sm px-4 py-1.5 rounded-full border cursor-pointer transition-colors duration-200"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        링크 복사
      </button>
    </div>
  );
}
