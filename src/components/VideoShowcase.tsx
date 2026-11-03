import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Video, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { WeddingVideo } from '../utils/loadVideos';
import { MarqueeBrandInfo } from '../types/wedding';

interface VideoShowcaseProps {
  videos: WeddingVideo[];
  brandInfo: MarqueeBrandInfo;
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({
  videos,
  brandInfo,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If no videos available, don't display anything ("nếu ko có thì ko cần hiển thị")
  if (!videos || videos.length === 0) {
    return null;
  }

  const currentVideo = videos[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const cleanZaloPhone = brandInfo.zalo.replace(/\D/g, '') || brandInfo.hotline.replace(/\D/g, '') || '0965252888';
  const zaloUrl = `https://zalo.me/${cleanZaloPhone}?text=${encodeURIComponent(`Xin chào, tôi muốn nhận báo giá mẫu rạp trong video: ${currentVideo.title}`)}`;

  return (
    <section className="mt-12 mb-10 pt-8 border-t border-[#EADFD5]">
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

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono font-semibold text-stone-500 mr-1">
            {currentIndex + 1} / {videos.length}
          </span>
          <button
            onClick={handlePrev}
            className="p-2 sm:p-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 shadow-xs transition-all hover:scale-105 cursor-pointer"
            title="Video trước"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 sm:p-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 shadow-xs transition-all hover:scale-105 cursor-pointer"
            title="Video tiếp theo"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Main Video Cinema Container */}
      <div className="bg-stone-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-xl flex flex-col lg:flex-row">
        {/* Left: Video Player */}
        <div className="relative flex-1 aspect-video lg:aspect-auto lg:min-h-[420px] bg-black flex items-center justify-center">
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

          {/* Quick Prev / Next Floating Arrows on Video for Mobile */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-opacity lg:hidden cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-opacity lg:hidden cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Video Information & Direct Action Buttons */}
        <div className="w-full lg:w-96 p-5 sm:p-6 bg-gradient-to-b from-[#1C1714] to-[#120E0C] text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentVideo.location || 'Lào Cai'}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-2 leading-snug">
              {currentVideo.title}
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
              {currentVideo.description}
            </p>

            {/* Thumbnail Selector Strip */}
            <div className="mb-6">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                Chọn video khác:
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {videos.map((vid, idx) => (
                  <button
                    key={vid.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      idx === currentIndex
                        ? 'border-amber-400 scale-105 shadow-md'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {vid.thumbnail ? (
                      <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-stone-800 flex items-center justify-center text-stone-400">
                        <Play className="w-4 h-4" />
                      </div>
                    )}
                    <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 text-white px-1 rounded">
                      #{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            {/* Zalo Intent for this Video */}
            <a
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
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
