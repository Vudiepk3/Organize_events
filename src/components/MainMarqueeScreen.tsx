import React, { useMemo } from 'react';
import { Sparkles, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { MarqueeBrandInfo, MarqueeCategory, WeddingPhoto } from '../types/wedding';
import { WeddingVideo } from '../utils/loadVideos';
import { PhotoCard } from './PhotoCard';
import { VideoShowcase } from './VideoShowcase';

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
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return photos;
    return photos.filter((p) => p.category === selectedCategory);
  }, [photos, selectedCategory]);

  const weddingCount = photos.filter((p) => p.category === 'dam-cuoi').length;
  const engagementCount = photos.filter((p) => p.category === 'an-hoi').length;

  const serviceAreas = brandInfo.serviceAreas && brandInfo.serviceAreas.length > 0 
    ? brandInfo.serviceAreas 
    : ['Bắc Hà', 'Mường Mương', 'Bảo Thắng', 'Si Ma Cai', 'TP. Lào Cai'];

  return (
    <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Editorial Title & Brand Header */}
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

        {/* Prominent Service Area & Contact Highlight Card (Yêu Cầu Trọng Tâm Của Khách Hàng) */}
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

          {/* Các khu vực phục vụ nổi bật (Bắc Hà, Mường Mương, Bảo Thắng, Si Ma Cai, TP Lào Cai) */}
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
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-100/80 text-amber-900 border border-amber-300 flex items-center gap-1">
                <span>Khảo sát mặt bằng miễn phí</span>
              </span>
            </div>
          </div>
        </div>

        {/* Category Switcher Tabs - Responsive Grid on Mobile */}
        <div className="w-full max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-2xl border border-stone-200/90 shadow-xs">
            <button
              onClick={() => onSelectCategory('all')}
              className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-xl transition-all cursor-pointer text-center truncate ${
                selectedCategory === 'all'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tất Cả ({photos.length})
            </button>

            <button
              onClick={() => onSelectCategory('dam-cuoi')}
              className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-xl transition-all cursor-pointer text-center truncate ${
                selectedCategory === 'dam-cuoi'
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Rạp Cưới ({weddingCount})
            </button>

            <button
              onClick={() => onSelectCategory('an-hoi')}
              className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-xl transition-all cursor-pointer text-center truncate ${
                selectedCategory === 'an-hoi'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Rạp Ăn Hỏi ({engagementCount})
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Marquee Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            zaloPhone={brandInfo.zalo || brandInfo.hotline}
            onOpenLightbox={onOpenLightbox}
          />
        ))}
      </div>

      {/* Video Showcase Section: Displays local videos from /src/assets/videos/ or fallback TikTok/YouTube */}
      <VideoShowcase
        videos={videos}
        brandInfo={brandInfo}
      />
    </main>
  );
};
