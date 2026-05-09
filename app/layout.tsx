import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moonyth.app"),
  title: {
    default: "lunafrost | AI · Dev · App · Contents",
    template: "%s | lunafrost",
  },
  description: "AI 트렌드, 앱 개발, 콘텐츠 전략을 탐구하는 Moonyth의 공간입니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://aimoonyth.com",
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
    <html
      lang="ko"
      className={`${cormorant.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-dm-sans)] font-light">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
