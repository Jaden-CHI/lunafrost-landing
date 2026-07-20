import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ImageRescalerTool from '@/components/tools/ImageRescalerTool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Rescaler Demo',
  description: '첨부된 이미지 리스케일러 컨셉을 기반으로 한 데모 페이지입니다.',
};

export default function ImageRescalerPage() {
  return (
    <>
      <Header />
      <main>
        <ImageRescalerTool />
      </main>
      <Footer />
    </>
  );
}
