import { MarqueeBrandInfo } from '../types/wedding';

/**
 * =========================================================================
 * CẤU HÌNH TRUNG TÂM TOÀN BỘ WEBSITE NHÀ RẠP SƠN NỤ
 * =========================================================================
 * BẠN CHỈ CẦN SỬA THÔNG TIN TẠI FILE NÀY:
 * - Thay đổi danh sách khu vực phục vụ (Bắc Hà, Mường Mương,...)
 * - Thay đổi số điện thoại hotline, zalo, địa chỉ, kênh tiktok, v.v.
 * Toàn bộ website (Tiêu đề, Hero, Video thực tế, Chân trang Footer)
 * sẽ TỰ ĐỘNG đồng bộ 100%!
 */

// 1. DANH SÁCH CÁC HUYỆN / KHU VỰC PHỤC VỤ (CHỈ CẦN SỬA Ở ĐÂY LÀ ĐỦ):
export const SERVICE_AREAS: string[] = [
  'Bắc Hà',
  'Mường Mương',
  'Bảo Thắng',
  'Si Ma Cai',
  'TP. Lào Cai',
];

// Chuỗi hiển thị nhanh với dấu chấm ngăn cách
export const SERVICE_AREAS_TEXT = SERVICE_AREAS.join(' · ');
export const SERVICE_AREAS_BULLET_TEXT = SERVICE_AREAS.join(' • ');

// 2. THÔNG TIN THƯƠNG HIỆU & LIÊN HỆ
export const SITE_BRAND_INFO: MarqueeBrandInfo = {
  brandName: 'Nhà Rạp Sơn Nụ',
  slogan: 'Nâng tầm hôn lễ · Dệt trọn yêu thương',
  tiktokUrl: 'https://www.tiktok.com/@nharapsonnu',
  tiktokHandle: '@nharapsonnu',
  hotline: '0965.252.888',
  zalo: '0965252888',
  address: 'Xã Bản Lầu, Tỉnh Lào Cai',
  serviceAreas: SERVICE_AREAS,
  experienceYears: 12,
  completedWeddings: 1850,
};

// Tương thích ngược với các file import DEFAULT_BRAND_INFO
export const DEFAULT_BRAND_INFO = SITE_BRAND_INFO;
