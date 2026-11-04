import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, MapPin, Phone, CheckCircle2, Video, ChevronDown } from 'lucide-react';
import { MarqueeBrandInfo, MarqueeCategory, WeddingPhoto } from '../types/wedding';
import { WeddingVideo } from '../utils/loadVideos';
import { PhotoCard } from './PhotoCard';
import { VideoCard } from './VideoCard';
import { VideoShowcase } from './VideoShowcase';
import { SERVICE_AREAS } from '../config/siteConfig';

interface MainMarqueeScreenProps {
  photos: WeddingPhoto[];
  videos: WeddingVideo[];
  brandInfo: MarqueeBrandInfo;
  selectedCategory: MarqueeCategory;
  onSelectCategory: (category: MarqueeCategory) => void;
  onOpenLightbox: (photo: WeddingPhoto) => void;
}

export const MainMarqueeScreen: React.FC<MainMarqueeScreenProps> = ({
  photos,
  videos,
  brandInfo,
  selectedCategory,
  onSelectCategory,
  onOpenLightbox,
}) => {
  // Primary Tab state: 'photos' (Mẫu Rạp Cưới & Ăn Hỏi) vs 'videos' (Video Thực Tế)
  const [activeMainTab, setActiveMainTab] = useState<'photos' | 'videos'>('photos');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(0);
  
  // Progressive display to avoid rendering hundreds of items at once (zero lag)
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Reset pagination when category or tab changes
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory, activeMainTab]);

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return photos;
    return photos.filter((p) => p.category === selectedCategory);
  }, [photos, selectedCategory]);

  const visiblePhotos = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, visibleCount]);

  const weddingCount = photos.filter((p) => p.category === 'dam-cuoi').length;
  const engagementCount = photos.filter((p) => p.category === 'an-hoi').length;

  const serviceAreas = brandInfo.serviceAreas && brandInfo.serviceAreas.length > 0
    ? brandInfo.serviceAreas
    : SERVICE_AREAS;

  const handleSelectVideoFromGrid = (index: number) => {
    setSelectedVideoIndex(index);
    // Smooth scroll up toward the cinema video player
    const playerElement = document.getElementById('cinema-video-player');
    if (playerElement) {
      playerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Editorial Title & Brand Header - GIỮ NGUYÊN PHẦN TRÊN THEO YÊU CẦU */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-800 mb-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>{brandInfo.brandName} · Showroom Trực Tuyến</span>
        </div>

        {/* Display Headline with High-Contrast Rich Amber Gold on Light Background */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-[1.22] mb-3">
          Tất Cả Mẫu <span className="animate-gold-shimmer font-bold">Rạp Đám Cưới & Rạp Ăn Hỏi</span> Đẹp Nhất
        </h1>

        <p className="text-xs sm:text-base text-stone-600 leading-relaxed mb-5 max-w-2xl mx-auto px-2">
          Rê chuột hoặc chạm vào ảnh để <strong className="text-stone-900 font-semibold">phóng to chi tiết</strong> và bấm nút <strong className="text-[#0068FF] font-semibold">"Nhận Báo Giá Rạp Cưới"</strong> để kết nối trực tiếp qua Zalo.
        </p>

        {/* Prominent Service Area & Contact Highlight Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 border-2 border-amber-300/80 shadow-sm text-left mb-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-amber-200/60 text-xs">
            {/* Địa chỉ cơ sở chính */}
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[11px] text-amber-800 font-medium uppercase tracking-wider block">Cơ Sở Chính</span>
                <strong className="text-stone-900 text-xs sm:text-sm font-semibold">{brandInfo.address}</strong>
              </div>
            </div>

            {/* Hotline & Zalo */}
            <a
              href={`https://zalo.me/${brandInfo.zalo.replace(/\D/g, '') || '0965252888'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-amber-300 rounded-xl hover:bg-amber-50 transition-colors shrink-0 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-xs font-semibold text-stone-800">
                Hotline / Zalo: <strong className="text-[#0068FF] font-mono font-bold text-sm">{brandInfo.hotline}</strong>
              </span>
            </a>
          </div>

          {/* Các khu vực phục vụ nổi bật */}
          <div className="pt-3">
            <div className="flex items-center gap-1.5 text-xs text-amber-900 font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Khu Vực Nhận Thi Công Dựng Rạp Tận Nơi Tại Lào Cai:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {serviceAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-stone-800 border border-amber-300/80 shadow-xs flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                  <span>{area}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2 PRIMARY TABS: [Tab 1: Mẫu Rạp Cưới & Ăn Hỏi (Ảnh)] vs [Tab 2: Video Thực Tế Công Trình] */}
        <div className="flex items-center justify-center mb-6">
          <div className="grid grid-cols-2 p-1.5 bg-stone-200/90 rounded-2xl border border-stone-300/80 shadow-sm max-w-lg w-full">
            <button
              type="button"
              onClick={() => setActiveMainTab('photos')}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 py-3 px-2 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${activeMainTab === 'photos'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-900/20 ring-1 ring-amber-400'
                : 'text-stone-700 hover:text-stone-950 hover:bg-white/60'
                }`}
            >
              <Sparkles className="w-4 h-4 text-amber-200 shrink-0" />
              <span className="truncate">Mẫu Rạp Cưới</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-mono shrink-0 ${activeMainTab === 'photos' ? 'bg-black/25 text-white' : 'bg-stone-300/80 text-stone-700'
                  }`}
              >
                {photos.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMainTab('videos')}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 py-3 px-2 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${activeMainTab === 'videos'
                ? 'bg-stone-900 text-white shadow-md shadow-black/25 ring-1 ring-stone-700'
                : 'text-stone-700 hover:text-stone-950 hover:bg-white/60'
                }`}
            >
              <Video className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">Video Thực Tế</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono shrink-0 bg-rose-600 text-white flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {videos.length}
              </span>
            </button>
          </div>
        </div>

        {/* TAB 1 SUB-CATEGORIES: Only visible when activeMainTab is 'photos' */}
        {activeMainTab === 'photos' && (
          <div className="w-full max-w-md mx-auto animate-fadeIn">
            <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-2xl border border-stone-200/90 shadow-xs">
              <button
                onClick={() => onSelectCategory('all')}
                className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-xl transition-all cursor-pointer text-center truncate ${selectedCategory === 'all'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
                  }`}
              >
                Tất Cả ({photos.length})
              </button>

              <button
                onClick={() => onSelectCategory('dam-cuoi')}
                className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-xl transition-all cursor-pointer text-center truncate ${selectedCategory === 'dam-cuoi'
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
                  }`}
              >
                Rạp Cưới ({weddingCount})
              </button>

              <button
                onClick={() => onSelectCategory('an-hoi')}
                className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-xl transition-all cursor-pointer text-center truncate ${selectedCategory === 'an-hoi'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
                  }`}
              >
                Rạp Ăn Hỏi ({engagementCount})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===================== TAB 1 CONTENT: PHOTOS GRID ===================== */}
      {activeMainTab === 'photos' && (
        <section aria-label="Danh sách mẫu rạp cưới và ăn hỏi" className="animate-fadeIn">
          {visiblePhotos.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
                {visiblePhotos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    zaloPhone={brandInfo.zalo || brandInfo.hotline}
                    onOpenLightbox={onOpenLightbox}
                  />
                ))}
              </div>

              {/* Load More Button if more photos exist */}
              {visibleCount < filteredPhotos.length ? (
                <div className="mt-10 sm:mt-12 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-102"
                  >
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                    <span>
                      Xem Thêm Mẫu Rạp Khác (Đã xem {visiblePhotos.length} / {filteredPhotos.length} mẫu)
                    </span>
                  </button>
                </div>
              ) : filteredPhotos.length > 12 ? (
                <div className="mt-8 text-center text-xs text-stone-500 font-medium">
                  ✓ Đã hiển thị đầy đủ tất cả {filteredPhotos.length} mẫu rạp trong danh mục này.
                </div>
              ) : null}
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
              <p className="text-stone-500 text-sm">Chưa có ảnh nào trong mục này.</p>
            </div>
          )}
        </section>
      )}

      {/* ===================== TAB 2 CONTENT: VIDEO THỰC TẾ ===================== */}
      {activeMainTab === 'videos' && (
        <section aria-label="Video thực tế thi công rạp cưới" className="animate-fadeIn">
          {/* Main Cinema Video Showcase with 2 side buttons */}
          <div id="cinema-video-player">
            <VideoShowcase
              videos={videos}
              brandInfo={brandInfo}
              selectedIndex={selectedVideoIndex}
              onSelectVideo={setSelectedVideoIndex}
            />
          </div>

          {/* List of Real Videos (Grid Layout like the Photos in Tab 1) */}
          <div className="mt-8 pt-8 border-t border-[#EADFD5]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-800 mb-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Bộ Sưu Tập Video Thi Công</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Danh Sách Tất Cả Video Thực Tế ({videos.length})
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Chạm vào bất kỳ video nào dưới đây để phát trên màn hình lớn hoặc bấm nút Báo Giá qua Zalo
                </p>
              </div>
            </div>

            {/* Video Cards Grid matching the 3-column layout of the Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {videos.map((vid, idx) => (
                <VideoCard
                  key={vid.id || idx}
                  video={vid}
                  index={idx}
                  isActive={idx === selectedVideoIndex}
                  zaloPhone={brandInfo.zalo || brandInfo.hotline}
                  onSelectVideo={handleSelectVideoFromGrid}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
