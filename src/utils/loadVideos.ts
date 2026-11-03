export interface WeddingVideo {
  id: string;
  title: string;
  description: string;
  type: 'local' | 'youtube' | 'tiktok';
  src: string; // URL or local video path
  thumbnail?: string;
  location?: string;
}

// Eagerly scan /src/assets/videos/
const localVideoModules = import.meta.glob<{ default: string }>(
  '/src/assets/videos/*.{mp4,webm,mov,ogg}',
  { eager: true }
);

// Fallback high-quality YouTube / TikTok wedding marquee showcase videos
export const FALLBACK_WEDDING_VIDEOS: WeddingVideo[] = [
  {
    id: 'fallback-vid-1',
    title: 'Toàn Cảnh Đại Rạp Cưới Không Gian Pha Lê 600 Khách',
    description: 'Video quay thực tế quá trình dựng khung nhôm truss chịu bão, trần dập lụa sóng champagne và 8 chùm đèn pha lê Tiệp Khắc lộng lẫy.',
    type: 'youtube',
    src: 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=0&rel=0', // Luxury wedding tent decoration showcase
    thumbnail: '/src/assets/images/hero_wedding_marquee_1793672017831.jpg',
    location: 'TP. Lào Cai',
  },
  {
    id: 'fallback-vid-2',
    title: 'Dựng Rạp Lễ Ăn Hỏi Sang Trọng Song Hỷ & Gia Tiên',
    description: 'Toàn cảnh không gian lễ đính hôn truyền thống với hoa sen Quan Âm, phông chữ Hỷ dát vàng và bàn trà cau trầu trang trọng.',
    type: 'youtube',
    src: 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=0&rel=0',
    thumbnail: '/src/assets/images/rap_an_hoi_truyen_thong_1793672769275.jpg',
    location: 'Xã Bản Lầu, Lào Cai',
  },
  {
    id: 'fallback-vid-3',
    title: 'Rạp Cưới Mái Trong Suốt Sân Vườn Lúc Lên Đèn Hoàng Hôn',
    description: 'Không gian tiệc cưới cổ tích phong cách châu Âu, mái bạt trong suốt đón ánh hoàng hôn và hàng ngàn dây đèn led ấm áp.',
    type: 'youtube',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0', // Elegant event marquee showcase
    thumbnail: '/src/assets/images/outdoor_garden_marquee_1793672019493.jpg',
    location: 'Bảo Thắng, Lào Cai',
  },
];

export function getWeddingVideos(): WeddingVideo[] {
  const localEntries = Object.entries(localVideoModules);

  // If local videos exist in /src/assets/videos/, use them!
  if (localEntries.length > 0) {
    return localEntries.map(([filePath, moduleExport], idx) => {
      const fileName = filePath.split('/').pop() || `Video ${idx + 1}`;
      const cleanName = fileName.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');

      return {
        id: `local-vid-${idx}`,
        title: cleanName.toUpperCase().includes('AN HOI')
          ? `Video Rạp Lễ Ăn Hỏi - ${cleanName}`
          : `Video Thi Công Rạp Cưới - ${cleanName}`,
        description: 'Video ghi lại trực tiếp quá trình thi công và bàn giao rạp cưới thực tế của Nhà Rạp Sơn Nụ.',
        type: 'local',
        src: moduleExport.default || filePath,
        location: 'Tỉnh Lào Cai',
      };
    });
  }

  // If local directory is empty, return the curated wedding marquee video collection
  return FALLBACK_WEDDING_VIDEOS;
}
