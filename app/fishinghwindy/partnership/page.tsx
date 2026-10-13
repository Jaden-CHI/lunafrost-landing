import type { Metadata } from "next";
import Proposal from "./components/Proposal";
import "./partnership.css";

export const metadata: Metadata = {
  title: "Fishing Windy 제휴 제안서",
  description:
    "Fishing Windy — 낚시 '출조 준비 + 날씨 인텔리전스' 플랫폼 제휴·협업 제안. 전국 낚시 포인트 데이터 · 물때 · 파고 · 입질 지표 · 출조 가능여부.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FishingWindyPartnershipPage() {
  return (
    <div className="fw-page">
      <Proposal />
    </div>
  );
}
