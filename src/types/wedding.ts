export type MarqueeCategory = 
  | 'all'
  | 'dam-cuoi'
  | 'an-hoi'
  | 'ngoai-troi'
  | 'tu-gia'
  | 'gia-tien'
  | 'cong-hoa'
  | 'san-khau'
  | 'nha-bat-khong-gian';

export interface WeddingPhoto {
  id: string;
  name?: string;
  title?: string;
  category: MarqueeCategory;
  categoryName: string;
  url?: string;
  imageUrl: string;
  dimensions?: string;
  capacity?: string;
  styleTone?: string;
  lighting?: string;
  features?: string[];
  description?: string;
  isPopular?: boolean;
}

export interface MarqueeBrandInfo {
  brandName: string;
  slogan: string;
  tiktokUrl: string;
  tiktokHandle: string;
  hotline: string;
  zalo: string;
  address: string;
  serviceAreas: string[];
  experienceYears: number;
  completedWeddings: number;
}
