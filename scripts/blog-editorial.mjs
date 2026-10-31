export const weeklyLanes = ['updates', 'github', 'youtube', 'practical', 'github', 'youtube', 'practical'];

export function editorialLane(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) throw new Error('Invalid editorial date');
  return weeklyLanes[new Date(`${date}T00:00:00Z`).getUTCDay()];
}

const briefs = {
  github: 'GitHub에서 주목받는 오픈소스 프로젝트. GitHub Trending과 저장소를 찾아 AI 에이전트, 브라우저 자동화, 로컬 AI, 영상/음성 도구, 개발 도구 중 하나를 선정. 정확한 owner/repo를 확인하고 README, 릴리스, 라이선스, 최근 유지보수 상태와 실제 사용처를 조사. 저장소 이름만 보고 다른 동명 제품으로 추측하지 않기.',
  youtube: '유튜브에서 다뤄지는 AI 활용 주제. 한국어와 영어 영상에서 이미지/영상/음성 제작, 브라우저 자동화, 노코드, 로컬 AI 등의 실제 데모를 발굴. 서로 독립적인 채널들의 관련 영상과 게시일을 비교하고 광고/협찬 가능성을 구분. 영상만으로 성능이나 기능을 확정하지 말고 공식 저장소/문서로 검증. 자막이나 영상 내용을 확인하지 못했다면 제목/설명만 확인한 것으로 명시.',
  practical: '개발자와 크리에이터를 위한 구체적인 도구 비교 또는 실전 튜토리얼. 앱/웹 제작, 콘텐츠 제작, 업무 자동화, 로컬 실행, 데이터 처리 등에서 하나의 문제를 해결하는 방법. 모델 출시 요약으로 대체하지 말고 준비물, 절차, 비용/제약, 대안을 설명.',
  updates: '개발자와 크리에이터에게 영향이 큰 주요 모델/플랫폼 업데이트 하나. 공식 발표일, 기존 기능과의 차이, 실제 적용 대상, 제한을 확인. 단순 홍보 문구나 모델 성능 순위만으로 선정하지 않기.',
};

export function editorialBrief(date, existing, topic = '') {
  const lane = topic.trim() ? 'manual' : editorialLane(date);
  const recent = existing.filter(p => p.published && p.date <= date).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 14);
  return { lane, prompt: `편성: ${lane}. ${lane === 'manual' ? `사용자 지정 주제: ${topic}` : briefs[lane]}
최근 글: ${JSON.stringify(recent.map(p => ({ date: p.date, title: p.title, tags: p.tags })))}
후보 3개를 비교하고 기존 글과 제품, 해결 문제, 핵심 내용이 겹치지 않는 하나를 선정. 같은 회사/모델을 연속 선정하지 말고 최근 14편의 반복을 피하세요. 중요한 변경이 있어 재선정한다면 이전 글과 달라진 점을 명시하세요.
스타/조회수는 관심의 신호이지 품질 보증이 아닙니다. 수치에는 URL과 관측일을 기록하세요. 최근 증가량은 비교 가능한 시점별 수치가 있을 때만 사용하고 누적 스타만으로 급상승이라고 쓰지 마세요. 유튜브 조회수도 업로드 시점과 채널 규모를 함께 고려하고 증거가 없으면 '화제', '폭발적 인기'를 쓰지 마세요.
주제 발굴 자료와 사실 검증 자료를 구분하세요. 영상이나 Trending 목록은 기능/가격의 1차 근거가 아닙니다. 해당 프로젝트 소유자의 README/릴리스/공식 문서 등 1차 자료 2개 이상으로 사실을 확인하세요. 실사용을 하지 않았다면 직접 써봤다는 후기나 재현 성공을 주장하지 마세요.
지정 편성의 검증 가능한 후보가 없으면 새 모델 발표로 임의 대체하지 말고 근거 부족을 명시하세요.` };
}

export function validateDiscovery(lane, sources) {
  const urls = sources.map(value => new URL(value));
  if (lane === 'github' && !urls.some(u => u.hostname === 'github.com' && /^\/[^/]+\/[^/]+/.test(u.pathname) && !u.pathname.startsWith('/topics/'))) throw new Error('GitHub lane requires a repository source');
  if (lane === 'youtube' && !urls.some(u => (['youtube.com', 'www.youtube.com'].includes(u.hostname) && (u.pathname === '/watch' && u.searchParams.has('v') || /^\/shorts\/[^/]+/.test(u.pathname))) || u.hostname === 'youtu.be' && u.pathname.length > 1)) throw new Error('YouTube lane requires a video discovery source');
  const verification = urls.filter(u => !['youtube.com', 'www.youtube.com', 'youtu.be'].includes(u.hostname) && !(u.hostname === 'github.com' && /^\/(trending|topics)(\/|$)/.test(u.pathname)));
  if (verification.length < 2) throw new Error('At least two non-discovery sources required');
}
