import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moonyth.app"),
  title: {
    default: "lunafrost | AI · Dev · App · Contents",
    template: "%s | lunafrost",
  },
  description: "AI 트렌드, 앱 개발, 콘텐츠 전략을 탐구하는 Moonyth의 공간입니다.",
  icons: {
    icon: "/IC.png",
    apple: "/IC.png",
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
    <html
      lang="ko"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)] font-normal">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
