/**
 * @deprecated Chuyển sang dùng getWeddingPhotos() từ ./loadPhotos để đọc từ JSON tăng tốc độ và giảm lag.
 */
import { getWeddingPhotos } from './loadPhotos';
import { WeddingPhoto } from '../types/wedding';

export function loadPhotosFromDirectory(): WeddingPhoto[] {
  return getWeddingPhotos();
}

export { getWeddingPhotos };
