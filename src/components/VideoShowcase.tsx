import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Video, Sparkles, ExternalLink } from 'lucide-react';
import { WeddingVideo } from '../utils/loadVideos';
import { MarqueeBrandInfo } from '../types/wedding';
import { SERVICE_AREAS } from '../config/siteConfig';

interface VideoShowcaseProps {
  videos: WeddingVideo[];
  brandInfo: MarqueeBrandInfo;
  selectedIndex?: number;
  onSelectVideo?: (index: number) => void;
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({
  videos,
  brandInfo,
  selectedIndex,
  onSelectVideo,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);

  // Use controlled index if provided, otherwise internal state
  const currentIndex = selectedIndex !== undefined ? selectedIndex : internalIndex;

  const updateIndex = (newIndex: number) => {
    if (onSelectVideo) {
      onSelectVideo(newIndex);
    } else {
      setInternalIndex(newIndex);
    }
  };

  // If no videos available, don't display anything ("nếu ko có thì ko cần hiển thị")
  if (!videos || videos.length === 0) {
    return null;
  }

  const currentVideo = videos[currentIndex] || videos[0];

  const handlePrev = () => {
    updateIndex((currentIndex - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    updateIndex((currentIndex + 1) % videos.length);
  };

  const cleanZaloPhone = brandInfo.zalo.replace(/\D/g, '') || brandInfo.hotline.replace(/\D/g, '') || '0965252888';
  const zaloUrl = `https://zalo.me/${cleanZaloPhone}?text=${encodeURIComponent(`Xin chào Nhà Rạp Sơn Nụ, tôi muốn nhận báo giá mẫu rạp trong Video #${currentIndex + 1}`)}`;

  return (
    <section className="mb-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-800 mb-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
            <Video className="w-3.5 h-3.5 text-amber-600" />
            <span>Video Thực Tế Tại Công Trình</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight">
            Xem Video Thi Công & Lên Đèn Rạp Cưới
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Ghi lại chân thực quy trình dựng khung truss, dập voan trần và hệ thống ánh sáng pha lê.
          </p>
        </div>

        {/* Carousel Navigation Indicator in Header */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono font-semibold text-stone-500 mr-1">
            {currentIndex + 1} / {videos.length}
          </span>
          <button
            onClick={handlePrev}
            className="p-2 sm:p-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 shadow-xs transition-all hover:scale-105 cursor-pointer"
            title="Video trước"
            aria-label="Video trước"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 sm:p-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 shadow-xs transition-all hover:scale-105 cursor-pointer"
            title="Video tiếp theo"
            aria-label="Video tiếp theo"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Main Video Cinema Container */}
      <div className="bg-stone-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-xl flex flex-col lg:flex-row">
        {/* Left: Video Player with 2 prominent navigation buttons on left and right */}
        <div className="relative flex-1 aspect-video lg:aspect-auto lg:min-h-[440px] bg-black flex items-center justify-center group">
          {currentVideo.type === 'local' ? (
            <video
              key={currentVideo.src}
              src={currentVideo.src}
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <iframe
              key={currentVideo.src}
              src={currentVideo.src}
              title={currentVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}

          {/* Left Navigation Button - Prominent on the left side of video */}
          <button
            onClick={handlePrev}
            aria-label="Video trước"
            className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-stone-900/85 hover:bg-amber-600 text-white border-2 border-white/40 hover:border-amber-300 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
            title="Xem video trước"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 -ml-0.5" />
          </button>

          {/* Right Navigation Button - Prominent on the right side of video */}
          <button
            onClick={handleNext}
            aria-label="Video tiếp theo"
            className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-stone-900/85 hover:bg-amber-600 text-white border-2 border-white/40 hover:border-amber-300 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
            title="Xem video tiếp theo"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 -mr-0.5" />
          </button>

          {/* Bottom badge overlay indicating current video index */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white/95 text-xs font-semibold tracking-wide flex items-center gap-2">
            <span>Video {currentIndex + 1} / {videos.length}</span>
            <div className="flex items-center gap-1">
              {videos.map((_, idx) => (
                <span
                  key={idx}
                  className={`inline-block rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-4 h-1.5 bg-amber-400'
                      : 'w-1.5 h-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Clean Video Information & Direct Action Buttons (No broken thumbnails) */}
        <div className="w-full lg:w-96 p-5 sm:p-6 bg-gradient-to-b from-[#1C1714] to-[#120E0C] text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Video #{currentIndex + 1}
              </span>
            </div>

            {/* Quick Switch Buttons & Instruction */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 mb-5">
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="text-stone-300 font-medium">Chuyển đổi video:</span>
                <span className="text-amber-400 font-semibold">{currentIndex + 1} / {videos.length}</span>
              </div>
              <div className={`grid gap-1.5 ${
                videos.length <= 4 
                  ? 'grid-cols-2 sm:grid-cols-4' 
                  : 'grid-cols-4'
              }`}>
                {videos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => updateIndex(idx)}
                    className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center truncate ${
                      idx === currentIndex
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/30 ring-1 ring-amber-300'
                        : 'bg-white/10 text-stone-300 hover:bg-white/20'
                    }`}
                    title={`Chuyển sang Video ${idx + 1}`}
                  >
                    Video {idx + 1}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-stone-400 mt-2.5 text-center">
                Bấm 2 nút mũi tên ở 2 bên video để lướt xem nhanh
              </p>
            </div>

            {/* Service Areas Note */}
            <div className="mb-4 text-xs text-stone-300 bg-black/30 p-3 rounded-lg border border-white/5">
              <span className="text-amber-400 font-semibold block mb-1">Khu vực phục vụ thi công:</span>
              <span>
                {(brandInfo.serviceAreas && brandInfo.serviceAreas.length > 0
                  ? brandInfo.serviceAreas
                  : SERVICE_AREAS
                ).join(' • ')}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            {/* Zalo Intent for this Video */}
            <a
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-blue-500/25"
            >
              <span className="bg-white text-[#0068FF] px-1.5 py-0.5 rounded font-extrabold text-[10px]">
                Zalo
              </span>
              <span>Báo Giá Mẫu Rạp Này</span>
            </a>

            {/* TikTok Channel Redirect */}
            <a
              href={brandInfo.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-white/20 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.49 6.27 6.27 0 0 0 1.86-4.49V8.78a8.21 8.21 0 0 0 4.92 1.63v-3.72h-1Z" />
              </svg>
              <span>Xem Thêm Video Trên TikTok {brandInfo.tiktokHandle}</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
