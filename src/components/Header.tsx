import React from 'react';
import { Sparkles, Disc } from 'lucide-react';
import { MarqueeBrandInfo } from '../types/wedding';

interface HeaderProps {
  brandInfo: MarqueeBrandInfo;
  petalsEnabled: boolean;
  onTogglePetals: () => void;
  musicPlaying: boolean;
  onToggleMusic: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  brandInfo,
  petalsEnabled,
  onTogglePetals,
  musicPlaying,
  onToggleMusic,
}) => {
  const cleanZaloPhone = brandInfo.zalo.replace(/\D/g, '') || brandInfo.hotline.replace(/\D/g, '');
  const zaloUrl = `https://zalo.me/${cleanZaloPhone}`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EADFD5] shadow-xs transition-all w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-6">
        {/* Tên Nhà Rạp (Brand Name & Location) */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <a href="/" className="flex items-center gap-2 group min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-xl md:text-2xl font-serif font-bold tracking-tight text-[#1F1915] group-hover:text-amber-800 transition-colors truncate">
                {brandInfo.brandName}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-amber-700 font-semibold truncate">
                {brandInfo.address || 'Bản Lầu · Lào Cai'}
              </span>
            </div>
          </a>
        </div>

        {/* Right Controls: Bật Nhạc, TikTok Redirect & Zalo Báo Giá */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Wedding Music Player Button */}
          <button
            onClick={onToggleMusic}
            title={musicPlaying ? 'Tạm dừng nhạc cưới' : 'Bật nhạc cưới lãng mạn'}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              musicPlaying
                ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            <Disc className={`w-3.5 h-3.5 ${musicPlaying ? 'animate-spin text-amber-700' : 'text-stone-500'}`} style={{ animationDuration: '3s' }} />
            <span className="whitespace-nowrap text-[11px] sm:text-xs font-semibold">
              {musicPlaying ? 'Nhạc' : 'Bật Nhạc'}
            </span>
            {musicPlaying && (
              <span className="flex items-end gap-0.5 h-2.5 ml-0.5" aria-hidden="true">
                <span className="w-0.5 h-full bg-amber-600 rounded-full animate-bounce" style={{ animationDuration: '0.6s' }} />
                <span className="w-0.5 h-2/3 bg-amber-500 rounded-full animate-bounce" style={{ animationDuration: '0.4s' }} />
              </span>
            )}
          </button>

          {/* TikTok Direct Profile Link Button */}
          <a
            href={brandInfo.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`Chuyển hướng đến TikTok ${brandInfo.tiktokHandle}`}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all shadow-xs group shrink-0"
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.49 6.27 6.27 0 0 0 1.86-4.49V8.78a8.21 8.21 0 0 0 4.92 1.63v-3.72h-1Z" />
            </svg>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide hidden md:inline">
              TikTok
            </span>
          </a>

          {/* Zalo Intent Direct Link */}
          <a
            href={zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-[#0068FF] hover:bg-[#0052cc] text-white rounded-xl text-[11px] sm:text-xs font-bold transition-all shadow-xs shrink-0"
            title="Chat Zalo nhận báo giá trực tiếp"
          >
            <span className="bg-white text-[#0068FF] px-1 py-0.2 rounded text-[10px] font-extrabold">
              Zalo
            </span>
            <span className="hidden sm:inline">Báo Giá</span>
          </a>
        </div>
      </div>
    </header>
  );
};
