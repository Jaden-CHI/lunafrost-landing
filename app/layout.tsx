import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// GA4 consent-gated analytics (separate from @vercel/analytics above).
// Measurement ID supplied by the coordinating agent for moonyth.app
// (GA4 property 558312113 / stream 16098530613, Enhanced Measurement OFF).
const GA4_MEASUREMENT_ID = "G-8JD9ZYWHLT";
const GA4_PUBLIC_PATHS = [
  "/",
  "/blog",
  "/blog/*",
  "/tools",
  "/tools/image-rescaler",
  "/apps",
  "/youtube",
  "/about",
  "/contact",
  "/copyright",
  "/privacy-policy",
  "/terms",
  "/pangpangdefense",
  "/pangpangdefense/privacy",
  "/fishinghwindy/privacy",
  "/golfwindy/privacy",
];

export const metadata: Metadata = {
  metadataBase: new URL("https://moonyth.app"),
  title: {
    default: "lunafrost | AI · Dev · App · Contents",
    template: "%s | lunafrost",
  },
  description: "AI 트렌드, 앱 개발, 콘텐츠 전략을 탐구하는 Moonyth의 공간입니다.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://moonyth.app",
    siteName: "lunafrost",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col font-normal">
        {children}
        <Analytics />
        <SpeedInsights />
        <Script
          src="/shared/ga4-consent-analytics.js"
          strategy="afterInteractive"
          data-site-analytics="moonyth-app"
          data-measurement-id={GA4_MEASUREMENT_ID}
          data-canonical-host="moonyth.app"
          data-site-name="moonyth.app"
          data-public-paths={JSON.stringify(GA4_PUBLIC_PATHS)}
          data-privacy-url="/privacy-policy#ga4-analytics-privacy"
        />
      </body>
    </html>
  );
}
