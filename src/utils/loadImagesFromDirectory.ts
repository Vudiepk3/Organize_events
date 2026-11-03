import { WeddingPhoto, MarqueeCategory } from '../types/wedding';

// Scan all images in /src/assets/images/ and any subdirectories (rap-dam-cuoi, rap-an-hoi)
const imageModules = import.meta.glob<{ default: string }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,svg,JPG,JPEG,PNG,WEBP,SVG}',
  { eager: true }
);

interface AutoMetadata {
  title: string;
  category: MarqueeCategory;
  categoryName: string;
  dimensions: string;
  capacity: string;
  styleTone: string;
  description: string;
}

function deriveMetadata(filePath: string, itemIndex: number): AutoMetadata {
  const normalizedPath = filePath.toLowerCase().replace(/\\/g, '/');
  const fileName = filePath.split('/').pop() || '';
  const lowerName = fileName.toLowerCase();

  // 1. Prioritize Folder-based Classification
  // Any photo placed inside /rap-an-hoi/ or /an-hoi/ is automatically categorized as Rạp Ăn Hỏi
  const isInAnHoiFolder =
    normalizedPath.includes('/rap-an-hoi/') ||
    normalizedPath.includes('/an-hoi/') ||
    normalizedPath.includes('/an_hoi/') ||
    normalizedPath.includes('/rap_an_hoi/');

  // Any photo placed inside /rap-dam-cuoi/ or /dam-cuoi/ is automatically categorized as Rạp Đám Cưới
  const isInDamCuoiFolder =
    normalizedPath.includes('/rap-dam-cuoi/') ||
    normalizedPath.includes('/dam-cuoi/') ||
    normalizedPath.includes('/dam_cuoi/') ||
    normalizedPath.includes('/rap_dam_cuoi/') ||
    normalizedPath.includes('/rap-cuoi/');

  // Decide category
  let category: MarqueeCategory = 'dam-cuoi';
  let categoryName = 'Rạp Đám Cưới';

  if (isInAnHoiFolder) {
    category = 'an-hoi';
    categoryName = 'Rạp Ăn Hỏi';
  } else if (isInDamCuoiFolder) {
    category = 'dam-cuoi';
    categoryName = 'Rạp Đám Cưới';
  } else if (lowerName.includes('an_hoi') || lowerName.includes('an-hoi') || lowerName.includes('gia_tien')) {
    // Fallback if image was placed in root
    category = 'an-hoi';
    categoryName = 'Rạp Ăn Hỏi';
  }

  // 2. Specific tailored titles if recognized, or clean professional default
  if (lowerName.includes('gia_tien')) {
    return {
      title: 'Trang Trí Lễ Gia Tiên & Rạp Ăn Hỏi Hoa Sen Truyền Thống',
      category,
      categoryName,
      dimensions: 'Không gian gia tiên 30m² - 50m²',
      capacity: 'Bàn lễ gia tiên 12 - 16 ghế VIP',
      styleTone: 'Đỏ nhung & vàng đồng, bình sen Quan Âm gấp cánh',
      description: 'Trang trí gia tiên và rạp ăn hỏi trang trọng, chạm khắc chữ Hỷ dát vàng, bộ lư đồng tam sự và hoa sen tỏa hương thanh khiết.',
    };
  }

  if (lowerName.includes('pha_le') || lowerName.includes('hero_wedding')) {
    return {
      title: 'Rạp Đám Cưới Không Gian Pha Lê Hoàng Gia VIP',
      category,
      categoryName,
      dimensions: '18m x 35m (630m²)',
      capacity: '50 - 80 bàn tiệc (500 - 800 khách)',
      styleTone: 'Champagne Gold, hàng ngàn đèn chùm pha lê Tiệp Khắc',
      description: 'Đại rạp đám cưới đỉnh cao với trần phủ hoa tử đằng trắng muốt, đèn chùm pha lê tráng lệ và đường runway gương lung linh.',
    };
  }

  if (lowerName.includes('outdoor') || lowerName.includes('garden')) {
    return {
      title: 'Rạp Đám Cưới Ngoài Trời Mái Trong Suốt Hoàng Hôn',
      category,
      categoryName,
      dimensions: '15m x 30m (450m²)',
      capacity: '35 - 55 bàn tiệc sân vườn',
      styleTone: 'Trong suốt châu Âu, hoa tử đằng & đèn thả Edison ấm',
      description: 'Mẫu rạp đám cưới mái trong suốt đón trọn ánh hoàng hôn, trần buông rủ hoa tươi và ánh đèn vàng cổ điển vô cùng lãng mạn.',
    };
  }

  if (lowerName.includes('home') || lowerName.includes('luxury_home')) {
    return {
      title: 'Rạp Đám Cưới Tư Gia Biệt Thự Cổng Vòm Hoa Hồng',
      category,
      categoryName,
      dimensions: '10m x 22m (220m²)',
      capacity: '20 - 35 bàn tiệc tư gia',
      styleTone: 'Tone hồng pastel ngọt ngào & hoa hồng Ohara tươi',
      description: 'Thiết kế rạp cưới dựng trước cửa biệt thự tư gia cao cấp, cổng vòm hoa đồ sộ tạo điểm nhấn check-in đẳng cấp đón tiếp quan khách.',
    };
  }

  if (lowerName.includes('stage') || lowerName.includes('runway')) {
    return {
      title: 'Sân Khấu Lễ Thành Hôn & Đường Runway Pha Lê Rực Rỡ',
      category,
      categoryName,
      dimensions: 'Sân khấu 10m x 6m + Đường dẫn 18m',
      capacity: 'Khu vực tâm điểm lễ đường cưới',
      styleTone: 'Trắng tuyết tinh khôi, hoa tú cầu & nến lung linh',
      description: 'Lối đi runway tráng gương bóng loáng cùng tháp rượu champagne và bánh cưới 5 tầng hoa tươi nguy nga, tráng lệ.',
    };
  }

  if (category === 'an-hoi') {
    return {
      title: `Mẫu Rạp Lễ Ăn Hỏi Sang Trọng Song Hỷ #${itemIndex + 1}`,
      category: 'an-hoi',
      categoryName: 'Rạp Ăn Hỏi',
      dimensions: '8m x 18m (144m²)',
      capacity: '15 - 25 bàn tiệc (Gia đình & Họ hàng)',
      styleTone: 'Đỏ Ruby & Vàng Champagne hoàng gia, chữ Hỷ mạ vàng',
      description: 'Không gian rạp lễ ăn hỏi truyền thống cao cấp, bố trí bàn trà quả cau trầu, phông song hỷ sang trọng và trần lụa dập sóng ấm áp.',
    };
  }

  // Default Wedding Marquee for generic filenames (e.g. IMG_001.jpg, photo.png)
  return {
    title: `Mẫu Rạp Đám Cưới Sơn Nụ Cao Cấp #${itemIndex + 1}`,
    category: 'dam-cuoi',
    categoryName: 'Rạp Đám Cưới',
    dimensions: 'Thi công theo kích thước thực tế khuôn viên',
    capacity: '30 - 80 bàn tiệc linh hoạt',
    styleTone: 'Tone màu Champagne & Hoa tươi sang trọng',
    description: 'Thiết kế khung nhôm truss kiên cố, trần lụa dập sóng uốn lượn, đèn chùm pha lê và hoa trang trí tươi tắn đẳng cấp.',
  };
}

export function loadPhotosFromDirectory(): WeddingPhoto[] {
  const photoList: WeddingPhoto[] = [];
  const fileEntries = Object.entries(imageModules);

  fileEntries.forEach(([filePath, moduleExport], index) => {
    const imageUrl = moduleExport.default || filePath;
    const meta = deriveMetadata(filePath, index);

    photoList.push({
      id: `dir-photo-${index}-${filePath.replace(/[^a-zA-Z0-9]/g, '')}`,
      title: meta.title,
      category: meta.category,
      categoryName: meta.categoryName,
      imageUrl,
      dimensions: meta.dimensions,
      capacity: meta.capacity,
      styleTone: meta.styleTone,
      lighting: 'Đèn chùm pha lê + Led chiếu sáng chuyên nghiệp',
      features: [
        'Khung nhôm truss an toàn chịu lực',
        'Vải lụa cao cấp dập sóng tinh tế',
        'Hoa tươi & phụ kiện sang trọng',
        'Bảo hành thi công đúng tiến độ'
      ],
      description: meta.description,
      isPopular: index % 2 === 0,
    });
  });

  return photoList;
}
