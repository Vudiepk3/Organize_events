import React, { useState } from 'react';
import { ZoomIn, Sparkles, ImageOff } from 'lucide-react';
import { WeddingPhoto } from '../types/wedding';

interface PhotoCardProps {
  photo: WeddingPhoto;
  zaloPhone: string;
  onOpenLightbox: (photo: WeddingPhoto) => void;
}

// Fallback high quality wedding tent image if URL fails to load
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=75';

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  zaloPhone,
  onOpenLightbox,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const cleanZaloPhone = zaloPhone.replace(/\D/g, '');
  const zaloUrl = `https://zalo.me/${cleanZaloPhone}?text=${encodeURIComponent(`Xin chào, tôi muốn nhận báo giá mẫu rạp ${photo.categoryName} (Mã: ${photo.id})`)}`;

  const handleZaloIntent = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(zaloUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onOpenLightbox(photo)}
      className="group relative bg-stone-900 rounded-2xl overflow-hidden border-2 border-[#EADBCC] hover:border-amber-400 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-4/3 flex items-center justify-center select-none"
    >
      {/* Skeleton Shimmer when loading */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-stone-800 animate-pulse flex items-center justify-center z-5">
          <div className="w-8 h-8 border-2 border-amber-400/40 border-t-amber-400 rounded-full animate-spin" />
        </div>
      )}

      {/* Main Image with Async Decoding & Lazy Loading */}
      <img
        src={imageError ? FALLBACK_IMAGE : photo.imageUrl}
        alt={photo.categoryName}
        loading="lazy"
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true);
          setImageLoaded(true);
        }}
        className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        referrerPolicy="no-referrer"
      />

      {/* Category Badge on Top-Left */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-amber-900 border border-amber-200/60 shadow-xs flex items-center gap-1 z-10 pointer-events-none">
        <Sparkles className="w-3 h-3 text-amber-600" />
        <span>{photo.categoryName}</span>
      </div>

      {/* Hover Overlay with Direct Zalo Intent & Quick Zoom (No title/name) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 z-20">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
          {/* Primary Zalo Intent Button */}
          <button
            type="button"
            onClick={handleZaloIntent}
            className="flex-1 py-2 px-3 bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-transform hover:scale-102 cursor-pointer border border-white/20"
            title="Nhảy đến Zalo để nhận báo giá"
          >
            <span className="bg-white text-[#0068FF] px-1 py-0.2 rounded font-extrabold text-[9px]">
              Zalo
            </span>
            <span>Báo Giá Mẫu Này</span>
          </button>

          {/* Quick Zoom Icon */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(photo);
            }}
            className="p-2 bg-black/80 hover:bg-black text-amber-300 rounded-xl border border-amber-400/30 transition-colors cursor-pointer shrink-0"
            title="Phóng to xem ảnh full"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
