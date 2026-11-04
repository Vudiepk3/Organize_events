import { WeddingPhoto } from '../types/wedding';
import rawPhotos from '../data/photos.json';

/**
 * =========================================================================
 * BỘ TẢI DỮ LIỆU ẢNH TỪ JSON (TĂNG TỐC ĐỘ & GIẢM LAG)
 * =========================================================================
 * Đọc trực tiếp danh sách URL ảnh từ src/data/photos.json hoặc public/photos.json.
 * Không cần nhúng hàng trăm file ảnh nặng hàng trăm MB vào bộ nhớ bundle của Vite.
 */

export interface MinimalPhotoItem {
  id?: string | number;
  name?: string;
  title?: string;
  category?: string;
  categoryName?: string;
  url?: string;
  imageUrl?: string;
}

export function normalizePhoto(item: MinimalPhotoItem, index: number): WeddingPhoto {
  const id = String(item.id || `photo-${index + 1}`);
  const url = item.url || item.imageUrl || '';
  const category = (item.category || 'dam-cuoi') as any;
  const categoryName = item.categoryName || (category === 'an-hoi' ? 'Rạp Ăn Hỏi' : 'Rạp Đám Cưới');
  const name = item.name || item.title || `${categoryName} #${index + 1}`;

  return {
    id,
    name,
    title: name,
    category,
    categoryName,
    url,
    imageUrl: url,
    features: [
      'Khung nhôm truss an toàn chịu lực',
      'Vải lụa cao cấp dập sóng tinh tế',
      'Hoa trang trí phong cách sang trọng',
      'Thi công đúng tiến độ cam kết'
    ],
  };
}

export function getWeddingPhotos(): WeddingPhoto[] {
  try {
    if (Array.isArray(rawPhotos) && rawPhotos.length > 0) {
      return (rawPhotos as MinimalPhotoItem[]).map((photo, index) => normalizePhoto(photo, index));
    }
  } catch (err) {
    console.error('Lỗi khi đọc photos.json:', err);
  }

  return [];
}

/**
 * Tải động từ public/photos.json nếu người dùng cập nhật file trực tiếp khi host
 */
export async function fetchWeddingPhotos(): Promise<WeddingPhoto[]> {
  try {
    const res = await fetch('/photos.json');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return (data as MinimalPhotoItem[]).map((photo, index) => normalizePhoto(photo, index));
      }
    }
  } catch (err) {
    console.warn('Không tải được /photos.json qua fetch, dùng dữ liệu tĩnh:', err);
  }

  return getWeddingPhotos();
}
