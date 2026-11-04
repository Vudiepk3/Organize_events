import React from 'react';
import { MarqueeBrandInfo } from '../types/wedding';
import { SERVICE_AREAS } from '../config/siteConfig';

interface FooterProps {
  brandInfo: MarqueeBrandInfo;
}

export const Footer: React.FC<FooterProps> = ({ brandInfo }) => {
  const areas = (brandInfo.serviceAreas && brandInfo.serviceAreas.length > 0)
    ? brandInfo.serviceAreas
    : SERVICE_AREAS;

  return (
    <footer className="bg-[#181310] text-[#D4C8BE] py-8 border-t border-amber-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
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
            <span className="text-amber-300/90 font-medium">Phục vụ: {areas.join(' · ')}</span>
          </div>

          <div className="text-stone-500 text-[11px] text-center md:text-right">
            © {new Date().getFullYear()} {brandInfo.brandName} · Thiết kế & thi công rạp cưới trọn gói
          </div>
        </div>
      </div>
    </footer>
  );
};
