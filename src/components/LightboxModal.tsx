import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sparkles, 
  Phone, 
  ArrowUpRight
} from 'lucide-react';
import { WeddingPhoto, MarqueeBrandInfo } from '../types/wedding';

interface LightboxModalProps {
  photo: WeddingPhoto | null;
  photos: WeddingPhoto[];
  brandInfo: MarqueeBrandInfo;
  onClose: () => void;
  onSelectPhoto: (photo: WeddingPhoto) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  photos,
  brandInfo,
  onClose,
  onSelectPhoto,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  }, [photo?.id]);

  useEffect(() => {
    if (!photo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-') handleZoomOut();
      if (e.key === '0') handleResetZoom();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, photos]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    onSelectPhoto(photos[nextIndex]);
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(3.5, +(z + 0.35).toFixed(2)));
  const handleZoomOut = () => {
    setZoomLevel((z) => {
      const next = Math.max(1, +(z - 0.35).toFixed(2));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Direct Zalo Intent
  const cleanZaloPhone = brandInfo.zalo.replace(/\D/g, '') || brandInfo.hotline.replace(/\D/g, '');
  const zaloUrl = `https://zalo.me/${cleanZaloPhone}?text=${encodeURIComponent(`Xin chào, tôi muốn nhận báo giá mẫu: ${photo.title}`)}`;

  const handleOpenZalo = () => {
    window.open(zaloUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 backdrop-blur-md animate-fadeIn select-none">
      {/* Sleek Top Header */}
      <div className="w-full px-4 sm:px-6 py-3.5 flex items-center justify-between text-white border-b border-white/10 bg-black/60 z-30">
        <div className="flex items-center gap-3">
          <span className="font-serif font-bold text-base sm:text-lg text-white truncate max-w-xs sm:max-w-md">
            {photo.title}
          </span>
          <span className="text-xs text-amber-400 font-medium px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 hidden sm:inline">
            {photo.categoryName}
          </span>
          <span className="text-xs text-stone-400 hidden md:inline">
            ({currentIndex + 1} / {photos.length})
          </span>
        </div>

        {/* Zoom Controls & Close */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="p-1.5 hover:text-amber-300 disabled:opacity-30 cursor-pointer"
              title="Thu nhỏ (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono tabular-nums text-stone-300">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3.5}
              className="p-1.5 hover:text-amber-300 disabled:opacity-30 cursor-pointer"
              title="Phóng to (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={handleResetZoom}
                className="p-1.5 hover:text-amber-300 cursor-pointer border-l border-white/20 pl-2 ml-1"
                title="Về ban đầu (0)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/15 rounded-xl text-stone-300 hover:text-white transition-colors cursor-pointer ml-1"
            title="Đóng (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Fullscreen Photo Stage */}
      <div
        className={`relative flex-1 w-full flex items-center justify-center p-2 sm:p-6 overflow-hidden ${
          zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="max-h-[76vh] max-w-[96vw] object-contain rounded-xl shadow-2xl transition-transform duration-100 ease-out pointer-events-none"
          style={{
            transform: `scale(${zoomLevel}) translate(${pan.x / zoomLevel}px, ${pan.y / zoomLevel}px)`,
          }}
          referrerPolicy="no-referrer"
        />

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:scale-110 transition-all cursor-pointer z-20 shadow-xl"
          title="Ảnh trước (Mũi tên trái)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:scale-110 transition-all cursor-pointer z-20 shadow-xl"
          title="Ảnh tiếp theo (Mũi tên phải)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Redesigned Floating Bottom Glass Bar: Clean, uncluttered, focused on Zalo & TikTok */}
      <div className="w-full bg-[#14100D]/95 backdrop-blur-md border-t border-white/10 px-4 sm:px-8 py-3.5 z-30 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Thumbnail Strip */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          {photos.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectPhoto(item)}
              className={`w-11 h-8 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                item.id === photo.id
                  ? 'border-amber-400 scale-105 opacity-100 ring-2 ring-amber-400/30'
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>

        {/* Right: Direct Actions (Zalo Intent, TikTok, Call) */}
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
          {/* Official TikTok Button */}
          <a
            href={brandInfo.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/20 transition-all hover:scale-105 shrink-0"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.49 6.27 6.27 0 0 0 1.86-4.49V8.78a8.21 8.21 0 0 0 4.92 1.63v-3.72h-1Z" />
            </svg>
            <span className="hidden md:inline">TikTok</span>
          </a>

          {/* Primary Action: Zalo Intent Button */}
          <button
            onClick={handleOpenZalo}
            className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 cursor-pointer"
          >
            <span className="bg-white text-[#0068FF] px-1.5 py-0.5 rounded font-extrabold text-[11px]">
              Zalo
            </span>
            <span>Nhận Báo Giá Mẫu Này Qua Zalo</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
