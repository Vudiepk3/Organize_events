import React from 'react';
import { Phone, MapPin, Sparkles, ArrowUp, Settings } from 'lucide-react';
import { MarqueeBrandInfo } from '../types/wedding';

interface FooterProps {
  brandInfo: MarqueeBrandInfo;
  onOpenEditBrand: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  brandInfo,
  onOpenEditBrand,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#181310] text-[#D4C8BE] pt-8 pb-24 sm:pb-14 border-t border-amber-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs pr-0 sm:pr-48">
          {/* Brand & Basic Info */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1.5 text-stone-400">
            <span className="font-serif font-bold text-white text-sm">
              {brandInfo.brandName}
            </span>
            <span aria-hidden="true">·</span>
            <span>Hotline / Zalo: <strong className="text-white font-mono">{brandInfo.hotline}</strong></span>
            <span aria-hidden="true">·</span>
            <span>{brandInfo.address}</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-300/90 font-medium">Phục vụ: {(brandInfo.serviceAreas || ['Bắc Hà', 'Mường Mương', 'Bảo Thắng', 'Si Ma Cai', 'TP. Lào Cai']).join(' · ')}</span>
          </div>

          {/* Action buttons: Settings & Scroll To Top */}
          <div className="flex items-center gap-4 text-stone-400 shrink-0">
            <button
              onClick={onOpenEditBrand}
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Đổi thông tin liên hệ"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Cài đặt thông tin</span>
            </button>

            <span aria-hidden="true">·</span>

            <button
              onClick={scrollToTop}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Lên đầu trang</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
