'use client';

import { ChangeEvent, useMemo, useRef, useState } from 'react';

const presets = [
  { id: 'web', label: 'Web', scale: 1.4, description: '웹용 고해상도' },
  { id: 'hero', label: 'Hero', scale: 2, description: '메인 배너 최적화' },
  { id: 'poster', label: 'Poster', scale: 2.6, description: '인쇄/포스터급' },
  { id: 'custom', label: 'Custom', scale: 0, description: '사용자 지정 사이즈' },
] as const;

const studioTabs = [
  { id: 'enhance', label: 'Enhance', description: '업스케일 & 디테일' },
  { id: 'compare', label: 'Compare', description: '이전/이후 확인' },
  { id: 'export', label: 'Export', description: '다운로드 & 공유' },
] as const;

type PresetId = (typeof presets)[number]['id'];
type StudioTab = (typeof studioTabs)[number]['id'];
type ExportFormat = 'webp' | 'jpeg' | 'png';

type ImageState = {
  src: string;
  name: string;
  width: number;
  height: number;
};

const sampleSvg = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900">
    <rect width="1400" height="900" fill="#07111d"/>
    <rect x="96" y="100" width="1208" height="700" rx="28" fill="#0e1b2b" stroke="#85bce8" stroke-width="2"/>
    <circle cx="420" cy="420" r="180" fill="#8fb8dc" fill-opacity="0.18"/>
    <path d="M220 648c104-110 228-144 316-128 142 25 189 152 330 158 76 3 169-37 256-113v142H220z" fill="#1b3355"/>
    <path d="M310 342l202 210 140-144 184 196 152-190 148 174" stroke="#c8dff5" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="110" y="120" width="240" height="46" rx="23" fill="#85bce8" fill-opacity="0.3"/>
    <rect x="110" y="182" width="168" height="18" rx="9" fill="#c8dff5" fill-opacity="0.7"/>
  </svg>
`)}`;

function loadImage(src: string, name: string, cb: (img: ImageState) => void) {
  const img = new Image();
  img.onload = () => {
    cb({ src, name, width: img.naturalWidth, height: img.naturalHeight });
  };
  img.src = src;
}

function clamp(value: number, min = 0, max = 255) {
  return Math.min(max, Math.max(min, value));
}

function applyUnsharpMask(imageData: ImageData, amount: number) {
  const { data, width, height } = imageData;
  const copy = new Uint8ClampedArray(data);

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = (y * width + x) * 4;
      let blurR = 0;
      let blurG = 0;
      let blurB = 0;
      let count = 0;

      for (let ky = -1; ky <= 1; ky += 1) {
        for (let kx = -1; kx <= 1; kx += 1) {
          const sourceIndex = ((y + ky) * width + (x + kx)) * 4;
          blurR += copy[sourceIndex];
          blurG += copy[sourceIndex + 1];
          blurB += copy[sourceIndex + 2];
          count += 1;
        }
      }

      blurR /= count;
      blurG /= count;
      blurB /= count;

      const diffR = copy[index] - blurR;
      const diffG = copy[index + 1] - blurG;
      const diffB = copy[index + 2] - blurB;

      data[index] = clamp(copy[index] + diffR * amount);
      data[index + 1] = clamp(copy[index + 1] + diffG * amount);
      data[index + 2] = clamp(copy[index + 2] + diffB * amount);
    }
  }
}

function createScaledDataUrl(image: HTMLImageElement, width: number, height: number, format: ExportFormat, quality: number) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.filter = 'contrast(1.04) saturate(1.08) brightness(1.02)';
  ctx.drawImage(image, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  applyUnsharpMask(imageData, 0.24);
  ctx.putImageData(imageData, 0, 0);

  if (format === 'png') {
    return canvas.toDataURL('image/png');
  }

  if (format === 'jpeg') {
    return canvas.toDataURL('image/jpeg', quality);
  }

  return canvas.toDataURL('image/webp', quality);
}

export default function ImageRescalerTool() {
  const [image, setImage] = useState<ImageState | null>(null);
  const [preset, setPreset] = useState<PresetId>('hero');
  const [scale, setScale] = useState(2);
  const [customWidth, setCustomWidth] = useState(2048);
  const [customHeight, setCustomHeight] = useState(1365);
  const [activeTab, setActiveTab] = useState<StudioTab>('enhance');
  const [resultUrl, setResultUrl] = useState('');
  const [compareValue, setCompareValue] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [status, setStatus] = useState('샘플 이미지로 시작하거나 파일을 업로드해 보세요.');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('webp');
  const [exportQuality, setExportQuality] = useState(0.92);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [baseAspectRatio, setBaseAspectRatio] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const outputSize = useMemo(() => {
    if (!image) return { width: 0, height: 0 };
    if (preset === 'custom') {
      return {
        width: Math.max(1, customWidth),
        height: Math.max(1, customHeight),
      };
    }
    return {
      width: Math.round(image.width * scale),
      height: Math.round(image.height * scale),
    };
  }, [image, scale, preset, customWidth, customHeight]);

  const applyTransform = (img: HTMLImageElement, targetWidth: number, targetHeight: number) => {
    const nextUrl = createScaledDataUrl(img, targetWidth, targetHeight, exportFormat, exportQuality);
    setResultUrl(nextUrl);
    setIsProcessing(false);
    setStatus(`처리 완료 · ${targetWidth} × ${targetHeight} · ${exportFormat.toUpperCase()} 출력`);
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 1800);
  };

  const handleLoad = (src: string, name: string) => {
    setIsProcessing(true);
    setStatus('이미지를 분석하고 업스케일을 준비하는 중입니다…');
    loadImage(src, name, (nextImage) => {
      setImage(nextImage);
      setBaseAspectRatio(nextImage.width / nextImage.height);
      setStatus(`${name} 로드 완료 · ${nextImage.width} × ${nextImage.height}`);
      const img = new Image();
      img.onload = () => {
        const targetWidth = preset === 'custom' ? Math.max(1, customWidth) : Math.round(nextImage.width * scale);
        const targetHeight = preset === 'custom' ? Math.max(1, customHeight) : Math.round(nextImage.height * scale);
        applyTransform(img, targetWidth, targetHeight);
      };
      img.src = src;
    });
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      handleLoad(src, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = () => {
    if (!image) return;
    setIsProcessing(true);
    setStatus('업스케일을 적용하고 디테일을 강화하는 중입니다…');
    const img = new Image();
    img.onload = () => {
      const targetWidth = preset === 'custom' ? Math.max(1, customWidth) : outputSize.width;
      const targetHeight = preset === 'custom' ? Math.max(1, customHeight) : outputSize.height;
      applyTransform(img, targetWidth, targetHeight);
    };
    img.src = image.src;
  };

  const updateCustomSize = (field: 'width' | 'height', value: number) => {
    const nextValue = Math.max(1, value);

    if (preset === 'custom' && lockAspectRatio && baseAspectRatio) {
      if (field === 'width') {
        setCustomWidth(nextValue);
        setCustomHeight(Math.max(1, Math.round(nextValue / baseAspectRatio)));
      } else {
        setCustomHeight(nextValue);
        setCustomWidth(Math.max(1, Math.round(nextValue * baseAspectRatio)));
      }
      return;
    }

    if (field === 'width') {
      setCustomWidth(nextValue);
    } else {
      setCustomHeight(nextValue);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const fileName = image?.name ? image.name.replace(/\.[^.]+$/, '') : 'upscaled-image';
    const targetWidth = preset === 'custom' ? Math.max(1, customWidth) : outputSize.width;
    const targetHeight = preset === 'custom' ? Math.max(1, customHeight) : outputSize.height;
    const extension = exportFormat === 'jpeg' ? 'jpg' : exportFormat;
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `${fileName}-${targetWidth}x${targetHeight}.${extension}`;
    link.click();
  };

  return (
    <section className="min-h-screen bg-[color:var(--secondary)] px-5 py-16 md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)]/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.06)] backdrop-blur-xl md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.3em]" style={{ color: 'var(--tertiary)' }}>
                AI STUDIO · IMAGE RESCALER
              </div>
              <h1 className="font-[family-name:var(--font-inter)] text-3xl font-semibold leading-tight md:text-4xl" style={{ color: 'var(--text)' }}>
                업스케일부터 비교, 내보내기까지 한 번에 — Studio 모드
              </h1>
              <p className="leading-[1.75]" style={{ color: 'var(--text-muted)' }}>
                AI Studio 스타일의 작업 흐름으로 재구성한 데모입니다. 업로드한 이미지를 즉시 업스케일하고, 결과를 미리 보고, 원하는 포맷으로 내보낼 수 있습니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleLoad(sampleSvg, 'sample-scene.png')}
                className="cta-secondary justify-center font-[family-name:var(--font-mono)] uppercase"
                style={{ padding: '0.9rem 1.4rem', fontSize: '11px', letterSpacing: '0.12em' }}
              >
                샘플 이미지
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="cta-primary rim-light justify-center font-[family-name:var(--font-mono)] uppercase"
                style={{ padding: '0.9rem 1.4rem', fontSize: '11px', letterSpacing: '0.12em' }}
              >
                이미지 업로드
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {studioTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-3.5 py-2 text-left transition ${activeTab === tab.id ? 'border-[color:var(--tertiary)] bg-[color:var(--surface-low)]' : 'border-[color:var(--border)] bg-transparent'}`}
              >
                <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]" style={{ color: activeTab === tab.id ? 'var(--tertiary)' : 'var(--text-muted)' }}>
                  {tab.label}
                </div>
                <div className="mt-1 text-sm" style={{ color: 'var(--text)' }}>
                  {tab.description}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-[20px] border border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(0,122,255,0.08),transparent)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  Workflow
                </div>
                <div className="mt-1 text-sm font-medium" style={{ color: 'var(--text)' }}>
                  {activeTab === 'enhance' && '업로드한 이미지에 업스케일 파라미터를 바로 적용합니다.'}
                  {activeTab === 'compare' && '원본과 업스케일 결과를 사이드바 비교로 빠르게 확인합니다.'}
                  {activeTab === 'export' && '원하는 해상도로 내보내고 바로 다운로드할 수 있습니다.'}
                </div>
              </div>
              <div className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--tertiary)' }}>
                {image ? `${outputSize.width} × ${outputSize.height}` : 'Ready'}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5 rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)]/90 p-6 backdrop-blur-xl">
            <div className="rounded-[18px] border border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(0,122,255,0.08),transparent)] p-4">
              <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                Service Summary
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[color:var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  Smart Upscale
                </span>
                <span className="rounded-full border border-[color:var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  Detail Recovery
                </span>
                <span className="rounded-full border border-[color:var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  Instant Preview
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  Control Panel
                </div>
                <h2 className="mt-2 font-[family-name:var(--font-inter)] text-xl font-semibold" style={{ color: 'var(--text)' }}>
                  리사이즈 설정
                </h2>
              </div>
              <div className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--tertiary)' }}>
                {preset.toUpperCase()}
              </div>
            </div>

            <div className="grid gap-3">
              {presets.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setPreset(item.id);
                    setScale(item.scale);
                    setStatus(`${item.label} 프리셋 적용 · x${item.scale}`);
                  }}
                  className={`rounded-[16px] border p-4 text-left transition ${preset === item.id ? 'border-[color:var(--tertiary)] bg-[color:var(--surface-low)]' : 'border-[color:var(--border)] bg-transparent'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-[family-name:var(--font-inter)] font-medium" style={{ color: 'var(--text)' }}>
                      {item.label}
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--tertiary)' }}>
                      x{item.scale}
                    </div>
                  </div>
                  <div className="mt-2 text-sm leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
                    {item.description}
                  </div>
                </button>
              ))}
            </div>

            <div className="rounded-[16px] border border-[color:var(--border)] bg-[color:var(--surface-low)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  Custom Scale
                </div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  ×{preset === 'custom' ? 'Custom' : scale.toFixed(1)}
                </div>
              </div>
              {preset === 'custom' ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <span className="block font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]">Width</span>
                    <input
                      type="number"
                      min="1"
                      value={customWidth}
                      onChange={(event) => updateCustomSize('width', Number(event.target.value))}
                      className="w-full rounded-[12px] border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-sm outline-none"
                    />
                  </label>
                  <label className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <span className="block font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]">Height</span>
                    <input
                      type="number"
                      min="1"
                      value={customHeight}
                      onChange={(event) => updateCustomSize('height', Number(event.target.value))}
                      className="w-full rounded-[12px] border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-sm outline-none"
                    />
                  </label>
                </div>
              ) : (
                <>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={scale}
                    onChange={(event) => setScale(Number(event.target.value))}
                    className="w-full accent-[color:var(--tertiary)]"
                  />
                  <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                    <span>1.0x</span>
                    <span>3.0x</span>
                  </div>
                </>
              )}
            </div>

            <div className="rounded-[16px] border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
              <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
                <label className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span className="block font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]">Export Format</span>
                  <select
                    value={exportFormat}
                    onChange={(event) => setExportFormat(event.target.value as ExportFormat)}
                    className="w-full rounded-[12px] border border-[color:var(--border)] bg-[color:var(--surface-low)] px-3 py-2 text-sm outline-none"
                  >
                    <option value="webp">WebP</option>
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span className="block font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]">Quality</span>
                  <input
                    type="range"
                    min="0.6"
                    max="1"
                    step="0.01"
                    value={exportQuality}
                    onChange={(event) => setExportQuality(Number(event.target.value))}
                    className="w-full accent-[color:var(--tertiary)]"
                  />
                  <div className="text-[11px] uppercase tracking-[0.2em]">{exportQuality.toFixed(2)}</div>
                </label>
              </div>
              <button
                type="button"
                onClick={() => setLockAspectRatio((value) => !value)}
                className="mt-3 rounded-full border border-[color:var(--border)] px-3 py-2 text-[10px] uppercase tracking-[0.2em] transition"
                style={{ color: lockAspectRatio ? 'var(--tertiary)' : 'var(--text-muted)' }}
              >
                {lockAspectRatio ? 'Aspect Ratio Lock: ON' : 'Aspect Ratio Lock: OFF'}
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleGenerate}
                className="cta-primary rim-light w-full justify-center font-[family-name:var(--font-mono)] uppercase"
                style={{ padding: '0.95rem 1.4rem', fontSize: '11px', letterSpacing: '0.12em' }}
              >
                리사이즈 실행
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!resultUrl}
                className="cta-secondary w-full justify-center font-[family-name:var(--font-mono)] uppercase disabled:cursor-not-allowed disabled:opacity-60"
                style={{ padding: '0.95rem 1.4rem', fontSize: '11px', letterSpacing: '0.12em' }}
              >
                다운로드
              </button>
            </div>
          </div>

          <div className="space-y-5 rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)]/90 p-6 backdrop-blur-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  Preview
                </div>
                <h2 className="mt-2 font-[family-name:var(--font-inter)] text-xl font-semibold" style={{ color: 'var(--text)' }}>
                  Before / After
                </h2>
              </div>
              <div className="rounded-full border border-[color:var(--border)] px-3 py-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--tertiary)' }}>
                {image ? `${outputSize.width} × ${outputSize.height}` : 'No image'}
              </div>
            </div>

            <div className="rounded-[18px] border border-[color:var(--border)] bg-[color:var(--surface-low)] p-3">
              <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                <span>Compare</span>
                <span>{resultUrl ? `${outputSize.width} × ${outputSize.height}` : '—'}</span>
              </div>
              <div className="img-ph relative aspect-[4/5] overflow-hidden rounded-[14px]">
                {image ? (
                  <>
                    <img src={image.src} alt="Original preview" className="absolute inset-0 h-full w-full object-cover" />
                    {resultUrl ? (
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - compareValue}% 0 0)` }}
                      >
                        <img src={resultUrl} alt="Upscaled preview" className="h-full w-full object-cover" />
                      </div>
                    ) : null}
                    <div
                      className="absolute inset-y-0 w-[2px] bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.2)]"
                      style={{ left: `${compareValue}%` }}
                    />
                    <div
                      className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[11px] font-semibold text-[color:var(--primary)] shadow-lg"
                      style={{ left: `${compareValue}%` }}
                    >
                      ↕
                    </div>
                  </>
                ) : (
                  <span>UPLOAD</span>
                )}
              </div>

              <div className="mt-4">
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="1"
                  value={compareValue}
                  onChange={(event) => setCompareValue(Number(event.target.value))}
                  className="w-full accent-[color:var(--tertiary)]"
                />
                <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  <span>Original</span>
                  <span>Upscaled</span>
                </div>
              </div>
            </div>

            <div className="rounded-[16px] border border-[color:var(--border)] bg-[color:var(--surface-low)] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  Status
                </div>
                <div className="rounded-full border border-[color:var(--tertiary)]/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--tertiary)' }}>
                  {isProcessing ? 'Processing' : resultUrl ? 'Enhanced' : 'Ready'}
                </div>
              </div>
              <div className="mt-2 space-y-2 text-sm leading-[1.7]" style={{ color: 'var(--text)' }}>
                <div>{status}</div>
                <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  {resultUrl ? 'Processed output ready for download' : 'Upload an image to begin processing'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast ? (
        <div className="fixed bottom-6 right-6 z-50 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/95 px-4 py-3 text-sm shadow-xl backdrop-blur-xl">
          <span style={{ color: 'var(--tertiary)' }}>✓</span> 업스케일 결과가 준비되었습니다.
        </div>
      ) : null}
    </section>
  );
}
