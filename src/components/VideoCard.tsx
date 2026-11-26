import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import { WeddingVideo } from '../utils/loadVideos';

interface VideoCardProps {
  video: WeddingVideo;
  index: number;
  isActive: boolean;
  zaloPhone: string;
  onSelectVideo: (index: number) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  index,
  isActive,
  zaloPhone,
  onSelectVideo,
}) => {
  const cleanZaloPhone = zaloPhone.replace(/\D/g, '') || '0965252888';
  const zaloUrl = `https://zalo.me/${cleanZaloPhone}?text=${encodeURIComponent(
    `Xin chào Nhà Rạp Sơn Nụ, tôi muốn nhận tư vấn & báo giá mẫu rạp trong Video #${index + 1}`
  )}`;

  const handleZaloClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(zaloUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onSelectVideo(index)}
      className={`group relative bg-stone-900 rounded-2xl overflow-hidden border-2 transition-all duration-300 flex flex-col cursor-pointer shadow-sm hover:shadow-2xl ${
        isActive
          ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-amber-500/10'
          : 'border-stone-200/90 hover:border-amber-400/80 bg-white'
      }`}
    >
      {/* Video Preview / Thumbnail Area */}
      <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
        {video.type === 'local' ? (
          <video
            src={video.src}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            muted
            playsInline
            preload="metadata"
          />
        ) : video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-stone-900 via-stone-800 to-black flex items-center justify-center">
            <Play className="w-12 h-12 text-amber-400/60" />
          </div>
        )}

        {/* Dark subtle overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 group-hover:from-black/90 transition-all duration-300" />

        {/* Video Number Badge (Top-Left) */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500 text-stone-950 shadow-md flex items-center gap-1 z-10">
          <Sparkles className="w-3 h-3 text-stone-950" />
          <span>Video #{index + 1}</span>
        </div>

        {/* Center Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-115 ${
              isActive
                ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-300/60'
                : 'bg-white/90 text-stone-900 group-hover:bg-amber-500 group-hover:text-stone-950'
            }`}
          >
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
          </div>
        </div>

        {/* Status indicator bottom right */}
        {isActive && (
          <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 z-10 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>Đang phát trên màn hình</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-3.5 bg-stone-900 text-white">
        <div className="flex items-center gap-2">
          {/* Zalo Quote Button */}
          <button
            type="button"
            onClick={handleZaloClick}
            className="flex-1 py-2 px-2.5 bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] cursor-pointer"
            title="Nhận báo giá mẫu rạp này qua Zalo"
          >
            <span className="bg-white text-[#0068FF] px-1 py-0.2 rounded font-black text-[9px]">
              Zalo
            </span>
            <span className="truncate">Báo Giá Mẫu Này</span>
          </button>

          {/* Select / Watch Video Button */}
          <button
            type="button"
            onClick={() => onSelectVideo(index)}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              isActive
                ? 'bg-amber-400 text-stone-950 font-bold'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title="Phát video này trên màn hình chính"
          >
            <span>{isActive ? 'Đang Xem' : 'Xem Video'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
