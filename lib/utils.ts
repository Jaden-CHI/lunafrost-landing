export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function estimateReadingTime(content: string | undefined): string {
  if (!content) return "1분";
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes}분`;
}
