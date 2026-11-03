import { WeddingPhoto, MarqueeCategory } from '../types/wedding';

// Automatically scan the directory /src/assets/images/ using Vite's eager glob import
const imageModules = import.meta.glob<{ default: string }>(
  '/src/assets/images/*.{jpg,jpeg,png,webp,svg}',
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

function deriveMetadataFromFilename(filePath: string): AutoMetadata {
  const fileName = filePath.split('/').pop() || '';
  const lower = fileName.toLowerCase();

  if (lower.includes('an_hoi') || lower.includes('an-hoi')) {
    return {
      title: 'Mẫu Rạp Lễ Ăn Hỏi Sang Trọng Song Hỷ',
      category: 'an-hoi' as MarqueeCategory,
      categoryName: 'Rạp Ăn Hỏi',
      dimensions: '8m x 18m (144m²)',
      capacity: '15 - 25 bàn tiệc (Gia đình & Họ hàng)',
      styleTone: 'Đỏ Ruby & Vàng Champagne hoàng gia, chữ Hỷ mạ vàng',
      description: 'Không gian rạp lễ ăn hỏi truyền thống cao cấp, bố trí bàn trà quả cau trầu, phông song hỷ sang trọng và trần lụa dập sóng ấm áp.',
    };
  }

  if (lower.includes('pha_le') || lower.includes('hero_wedding')) {
    return {
      title: 'Rạp Đám Cưới Không Gian Pha Lê Hoàng Gia VIP',
      category: 'dam-cuoi' as MarqueeCategory,
      categoryName: 'Rạp Đám Cưới',
      dimensions: '18m x 35m (630m²)',
      capacity: '50 - 80 bàn tiệc (500 - 800 khách)',
      styleTone: 'Champagne Gold, hàng ngàn đèn chùm pha lê Tiệp Khắc',
      description: 'Đại rạp đám cưới đỉnh cao với trần phủ hoa tử đằng trắng muốt, đèn chùm pha lê tráng lệ và đường runway gương lung linh.',
    };
  }

  if (lower.includes('outdoor') || lower.includes('garden')) {
    return {
      title: 'Rạp Đám Cưới Ngoài Trời Mái Trong Suốt Hoàng Hôn',
      category: 'dam-cuoi' as MarqueeCategory,
      categoryName: 'Rạp Đám Cưới',
      dimensions: '15m x 30m (450m²)',
      capacity: '35 - 55 bàn tiệc sân vườn',
      styleTone: 'Trong suốt châu Âu, hoa tử đằng & đèn thả Edison ấm',
      description: 'Mẫu rạp đám cưới mái trong suốt đón trọn ánh hoàng hôn, trần buông rủ hoa tươi và ánh đèn vàng cổ điển vô cùng lãng mạn.',
    };
  }

  if (lower.includes('home') || lower.includes('luxury_home')) {
    return {
      title: 'Rạp Đám Cưới Tư Gia Biệt Thự Cổng Vòm Hoa Hồng',
      category: 'dam-cuoi' as MarqueeCategory,
      categoryName: 'Rạp Đám Cưới',
      dimensions: '10m x 22m (220m²)',
      capacity: '20 - 35 bàn tiệc tư gia',
      styleTone: 'Tone hồng pastel ngọt ngào & hoa hồng Ohara tươi',
      description: 'Thiết kế rạp cưới dựng trước cửa biệt thự tư gia cao cấp, cổng vòm hoa đồ sộ tạo điểm nhấn check-in đẳng cấp đón tiếp quan khách.',
    };
  }

  if (lower.includes('gia_tien')) {
    return {
      title: 'Trang Trí Lễ Gia Tiên & Rạp Ăn Hỏi Hoa Sen Truyền Thống',
      category: 'an-hoi' as MarqueeCategory,
      categoryName: 'Rạp Ăn Hỏi',
      dimensions: 'Không gian gia tiên 30m² - 50m²',
      capacity: 'Bàn lễ gia tiên 12 - 16 ghế VIP',
      styleTone: 'Đỏ nhung & vàng đồng, bình sen Quan Âm gấp cánh',
      description: 'Trang trí gia tiên và rạp ăn hỏi trang trọng, chạm khắc chữ Hỷ dát vàng, bộ lư đồng tam sự và hoa sen tỏa hương thanh khiết.',
    };
  }

  if (lower.includes('stage') || lower.includes('runway')) {
    return {
      title: 'Sân Khấu Lễ Thành Hôn & Đường Runway Pha Lê Rực Rỡ',
      category: 'dam-cuoi' as MarqueeCategory,
      categoryName: 'Rạp Đám Cưới',
      dimensions: 'Sân khấu 10m x 6m + Đường dẫn 18m',
      capacity: 'Khu vực tâm điểm lễ đường cưới',
      styleTone: 'Trắng tuyết tinh khôi, hoa tú cầu & nến lung linh',
      description: 'Lối đi runway tráng gương bóng loáng cùng tháp rượu champagne và bánh cưới 5 tầng hoa tươi nguy nga, tráng lệ.',
    };
  }

  // Generic fallback
  return {
    title: 'Mẫu Rạp Cưới Hỏi Thiết Kế Theo Yêu Cầu',
    category: 'dam-cuoi' as MarqueeCategory,
    categoryName: 'Rạp Đám Cưới',
    dimensions: 'Thi công theo kích thước thực tế',
    capacity: '20 - 60 bàn tiệc',
    styleTone: 'Tone màu sang trọng tự chọn',
    description: 'Thiết kế khung nhôm truss kiên cố, hoa trang trí cao cấp và ánh sáng lung linh phục vụ hôn lễ trọn vẹn.',
  };
}

export function loadPhotosFromDirectory(): WeddingPhoto[] {
  const photoList: WeddingPhoto[] = [];

  const fileEntries = Object.entries(imageModules);

  fileEntries.forEach(([filePath, moduleExport], index) => {
    const imageUrl = moduleExport.default || filePath;
    const meta = deriveMetadataFromFilename(filePath);

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
        'Khung nhôm truss an toàn',
        'Vải lụa cao cấp dập sóng',
        'Hoa tươi & phụ kiện sang trọng',
        'Bảo hành thi công đúng tiến độ'
      ],
      description: meta.description,
      isPopular: index % 2 === 0,
    });
  });

  return photoList;
}
