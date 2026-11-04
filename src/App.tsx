/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { MainMarqueeScreen } from './components/MainMarqueeScreen';
import { LightboxModal } from './components/LightboxModal';
import { Footer } from './components/Footer';
import { FallingPetals } from './components/FallingPetals';
import { WeddingMusicPlayer } from './components/WeddingMusicPlayer';
import { SITE_BRAND_INFO } from './config/siteConfig';
import { getWeddingPhotos } from './utils/loadPhotos';
import { getWeddingVideos } from './utils/loadVideos';
import { MarqueeBrandInfo, MarqueeCategory, WeddingPhoto } from './types/wedding';

export default function App() {
  // Brand info state - lấy trực tiếp từ src/config/siteConfig.ts làm nguồn cấu hình duy nhất
  const [brandInfo] = useState<MarqueeBrandInfo>(SITE_BRAND_INFO);

  // Tự động đồng bộ tiêu đề trang web và thẻ meta khi danh sách địa điểm thay đổi
  React.useEffect(() => {
    const areasStr = (brandInfo.serviceAreas || []).join(', ');
    document.title = `${brandInfo.brandName} - Rạp Cưới & Ăn Hỏi (${areasStr})`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `${brandInfo.brandName} tại ${brandInfo.address}. Chuyên thi công rạp đám cưới, rạp ăn hỏi tại ${areasStr}. Hotline/Zalo: ${brandInfo.hotline}.`
      );
    }
  }, [brandInfo]);

  // Đọc danh sách ảnh trực tiếp từ JSON URL để tăng tốc độ hiển thị và giảm lag
  const photos = useMemo(() => {
    return getWeddingPhotos();
  }, []);

  // Read local video directory or fallback to TikTok/YouTube marquee videos
  const weddingVideos = useMemo(() => {
    return getWeddingVideos();
  }, []);

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<MarqueeCategory>('all');

  // Falling petals animation toggle
  const [petalsEnabled, setPetalsEnabled] = useState<boolean>(true);

  // Background wedding music state - Mặc định BẬT khi vừa vào web
  const [musicPlaying, setMusicPlaying] = useState<boolean>(true);

  // Modals state
  const [lightboxPhoto, setLightboxPhoto] = useState<WeddingPhoto | null>(null);

  const cleanZaloPhone = brandInfo.zalo.replace(/\D/g, '') || brandInfo.hotline.replace(/\D/g, '');
  const generalZaloUrl = `https://zalo.me/${cleanZaloPhone}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F6] text-[#2C2420] relative selection:bg-amber-100 selection:text-amber-900">
      {/* Romantic Falling Petals Effect */}
      <FallingPetals enabled={petalsEnabled} />

      {/* Top Bar Header with Marquee Brand Name & Controls */}
      <Header
        brandInfo={brandInfo}
        petalsEnabled={petalsEnabled}
        onTogglePetals={() => setPetalsEnabled(!petalsEnabled)}
        musicPlaying={musicPlaying}
        onToggleMusic={() => setMusicPlaying(!musicPlaying)}
      />

      {/* Main Screen: Showing All Marquee Models (Rạp Đám Cưới, Rạp Ăn Hỏi) */}
      <div className="flex-1">
        <MainMarqueeScreen
          photos={photos}
          videos={weddingVideos}
          brandInfo={brandInfo}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenLightbox={(p) => setLightboxPhoto(p)}
        />
      </div>

      {/* Footer (Đã xóa nút Cài đặt thông tin theo yêu cầu) */}
      <Footer brandInfo={brandInfo} />

      {/* Background Wedding Music Audio Engine */}
      <WeddingMusicPlayer
        isPlaying={musicPlaying}
        onTogglePlay={() => setMusicPlaying(!musicPlaying)}
      />

      {/* Floating Action Bar on Right (TikTok + Zalo Intent) */}
      <aside aria-label="Liên kết nhanh" className="fixed bottom-4 right-4 z-30 flex items-center gap-2">
        {/* TikTok Floating Button */}
        <a
          href={brandInfo.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-full shadow-xl border border-white/20 transition-transform hover:scale-105"
          title={`Mở TikTok cá nhân ${brandInfo.tiktokHandle}`}
        >
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.49 6.27 6.27 0 0 0 1.86-4.49V8.78a8.21 8.21 0 0 0 4.92 1.63v-3.72h-1Z" />
          </svg>
          <span className="text-xs font-semibold hidden sm:inline">TikTok</span>
        </a>

        {/* Zalo Intent Direct Floating Button */}
        <a
          href={generalZaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0068FF] hover:bg-[#0052cc] text-white rounded-full shadow-xl border border-blue-300/40 transition-transform hover:scale-105"
          title="Nhảy đến Zalo để nhận báo giá rạp cưới"
        >
          <span className="bg-white text-[#0068FF] px-1 py-0.2 rounded text-[10px] font-extrabold">
            Zalo
          </span>
          <span className="text-xs font-bold">Báo Giá Zalo</span>
        </a>
      </aside>

      {/* Lightbox Modal with Full-size Zoom & Zalo Intent */}
      <LightboxModal
        photo={lightboxPhoto}
        photos={photos}
        brandInfo={brandInfo}
        onClose={() => setLightboxPhoto(null)}
        onSelectPhoto={(p) => setLightboxPhoto(p)}
      />
    </div>
  );
}
