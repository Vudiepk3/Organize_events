import React from 'react';
import { ZoomIn, Sparkles, MessageCircle } from 'lucide-react';
import { WeddingPhoto } from '../types/wedding';

interface PhotoCardProps {
  photo: WeddingPhoto;
  zaloPhone: string;
  onOpenLightbox: (photo: WeddingPhoto) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  zaloPhone,
  onOpenLightbox,
}) => {
  const cleanZaloPhone = zaloPhone.replace(/\D/g, '');
  const zaloUrl = `https://zalo.me/${cleanZaloPhone}?text=${encodeURIComponent(`Xin chào, tôi muốn nhận báo giá mẫu: ${photo.title}`)}`;

  const handleZaloIntent = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(zaloUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onOpenLightbox(photo)}
      className="group relative bg-stone-900 rounded-2xl overflow-hidden border-2 border-[#EADBCC] hover:border-amber-400 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-4/3 flex items-center justify-center"
    >
      {/* 100% Pure Edge-to-Edge Photo */}
      <img
        src={photo.imageUrl}
        alt={photo.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        referrerPolicy="no-referrer"
        loading="lazy"
      />

      {/* Category Badge on Top-Left */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-amber-900 border border-amber-200/60 shadow-xs flex items-center gap-1 z-10">
        <Sparkles className="w-3 h-3 text-amber-600" />
        <span>{photo.categoryName}</span>
      </div>

      {/* Hover Overlay with Title and Direct Zalo Intent */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 z-20">
        {/* Top spacer */}
        <div />

        {/* Center/Bottom Overlay: Title & Zalo Action */}
        <div className="space-y-3 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-snug drop-shadow-md">
            {photo.title}
          </h3>

          <div className="flex items-center gap-2">
            {/* Primary Zalo Intent Button */}
            <button
              type="button"
              onClick={handleZaloIntent}
              className="flex-1 py-2.5 px-3 bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold text-xs rounded-xl shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-105 cursor-pointer border border-white/25"
              title="Nhảy đến Zalo để nhận báo giá"
            >
              <span className="bg-white text-[#0068FF] px-1.5 py-0.5 rounded font-extrabold text-[10px]">
                Zalo
              </span>
              <span>Nhận Báo Giá Rạp Cưới</span>
            </button>

            {/* Quick Zoom Icon */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenLightbox(photo);
              }}
              className="p-2.5 bg-black/75 hover:bg-black text-amber-300 rounded-xl border border-amber-400/30 transition-colors cursor-pointer"
              title="Phóng to xem ảnh full"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
