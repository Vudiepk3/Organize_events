import React, { useState } from 'react';
import { X, Check, Store, Link2, Phone, MapPin, Sparkles } from 'lucide-react';
import { MarqueeBrandInfo } from '../types/wedding';

interface EditBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandInfo: MarqueeBrandInfo;
  onSave: (updated: MarqueeBrandInfo) => void;
}

export const EditBrandModal: React.FC<EditBrandModalProps> = ({
  isOpen,
  onClose,
  brandInfo,
  onSave,
}) => {
  const [formData, setFormData] = useState<MarqueeBrandInfo>({ ...brandInfo });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auto format tiktok handle if url contains it
    let cleanHandle = formData.tiktokHandle;
    if (formData.tiktokUrl.includes('@')) {
      const match = formData.tiktokUrl.split('@')[1]?.split('?')[0];
      if (match) cleanHandle = `@${match}`;
    }
    onSave({
      ...formData,
      tiktokHandle: cleanHandle || formData.tiktokHandle,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
        <div className="p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Cài Đặt Tên Nhà Rạp & TikTok
              </h3>
              <p className="text-xs text-stone-500">
                Tùy chỉnh thông tin thương hiệu & liên kết trang cá nhân của bạn
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Tên nhà rạp */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
              Tên Nhà Rạp / Thương Hiệu Cưới *
            </label>
            <input
              type="text"
              required
              value={formData.brandName}
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              placeholder="VD: Rạp Cưới Hoàng Gia, Cưới Hỏi Vũ Linh,..."
              className="w-full px-3.5 py-2.5 bg-stone-50 text-stone-900 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* TikTok URL (Yêu cầu chính từ khách) */}
          {/* Tip for image folders */}
          <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/70 text-xs text-amber-950 space-y-1">
            <div className="font-semibold text-amber-900 flex items-center gap-1.5">
              <span>📁</span>
              <span>Quản lý ảnh theo 2 thư mục riêng biệt:</span>
            </div>
            <p className="text-[11px] text-stone-700 leading-relaxed">
              Bạn có thể thả hàng loạt ảnh vào 2 thư mục mà <strong>không cần phải đổi tên ảnh</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="bg-white/80 p-2 rounded-lg border border-amber-100 font-mono text-[10px]">
                <span className="font-semibold text-amber-800 block">/src/assets/images/rap-dam-cuoi/</span>
                <span className="text-stone-500 font-sans">Mọi ảnh rạp cưới (tên bất kỳ)</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-amber-100 font-mono text-[10px]">
                <span className="font-semibold text-rose-800 block">/src/assets/images/rap-an-hoi/</span>
                <span className="text-stone-500 font-sans">Mọi ảnh rạp ăn hỏi, gia tiên</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
              {/* TikTok icon */}
              <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.49 6.27 6.27 0 0 0 1.86-4.49V8.78a8.21 8.21 0 0 0 4.92 1.63v-3.72h-1Z" />
              </svg>
              <span>Liên kết TikTok cá nhân / Kênh nhà rạp *</span>
            </div>

            <div>
              <label className="block text-[11px] text-stone-500 mb-1">
                Link chuyển hướng đến TikTok của bạn:
              </label>
              <input
                type="url"
                required
                value={formData.tiktokUrl}
                onChange={(e) => setFormData({ ...formData, tiktokUrl: e.target.value })}
                placeholder="https://www.tiktok.com/@tentaikhoan"
                className="w-full px-3 py-2 bg-white text-stone-900 text-xs font-mono border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-stone-500 mb-1">
                Tên hiển thị TikTok:
              </label>
              <input
                type="text"
                value={formData.tiktokHandle}
                onChange={(e) => setFormData({ ...formData, tiktokHandle: e.target.value })}
                placeholder="@rapcuoihoanggia"
                className="w-full px-3 py-2 bg-white text-stone-900 text-xs font-mono border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Hotline & Zalo */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Số Hotline tư vấn
              </label>
              <input
                type="text"
                value={formData.hotline}
                onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                placeholder="0988.xxx.xxx"
                className="w-full px-3.5 py-2 bg-stone-50 text-stone-900 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Số Zalo báo giá
              </label>
              <input
                type="text"
                value={formData.zalo}
                onChange={(e) => setFormData({ ...formData, zalo: e.target.value })}
                placeholder="0988.xxx.xxx"
                className="w-full px-3.5 py-2 bg-stone-50 text-stone-900 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Slogan */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Khẩu hiệu / Slogan
            </label>
            <input
              type="text"
              value={formData.slogan}
              onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
              placeholder="Nâng tầm hôn lễ · Dệt trọn yêu thương"
              className="w-full px-3.5 py-2 bg-stone-50 text-stone-900 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Địa chỉ xưởng rạp chính
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="VD: Xã Bản Lầu, Tỉnh Lào Cai"
              className="w-full px-3.5 py-2 bg-stone-50 text-stone-900 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Các khu vực phục vụ */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Các huyện / khu vực nhận phục vụ (phân cách bằng dấu phẩy)
            </label>
            <input
              type="text"
              value={(formData.serviceAreas || []).join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                serviceAreas: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
              })}
              placeholder="Bắc Hà, Mường Mương, Bảo Thắng, Si Ma Cai, TP. Lào Cai"
              className="w-full px-3.5 py-2 bg-stone-50 text-stone-900 text-xs border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-700 to-amber-600 text-white rounded-xl text-xs font-semibold hover:from-amber-800 hover:to-amber-800 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Lưu Cài Đặt Ngay</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
