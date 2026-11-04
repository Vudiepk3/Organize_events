# HƯỚNG DẪN QUẢN LÝ ẢNH BẰNG JSON (CHỈ 3 DÒNG: ID, CATEGORY, URL)

Website đã được tối giản hóa tối đa, **không cần điền tên hay tiêu đề rườm rà**. Giao diện sẽ hiển thị ảnh trực quan, sắc nét cùng nút bấm Báo Giá Zalo và xem chi tiết.

---

## 📁 Nơi chỉnh sửa ảnh:
Mở file:
👉 **`src/data/photos.json`** (hoặc `public/photos.json`)

---

## 📝 Cấu trúc mỗi mẫu rạp trong `photos.json` (Chỉ cần 3 thông tin):

```json
[
  {
    "id": "dam-cuoi-01",
    "category": "dam-cuoi",
    "url": "https://link-anh-cua-ban.jpg"
  },
  {
    "id": "an-hoi-01",
    "category": "an-hoi",
    "url": "https://link-anh-cua-ban-2.jpg"
  }
]
```

### 📋 Giải thích 3 trường:
1. **`id`**: Mã định danh rạp (VD: `"dam-cuoi-01"`, `"an-hoi-02"`, `"rap-123"`). Mã này sẽ được đính kèm tự động khi khách bấm nhận báo giá qua Zalo.
2. **`category`**: Phân loại rạp:
   - `"dam-cuoi"`: Xuất hiện trong tab **Rạp Đám Cưới**
   - `"an-hoi"`: Xuất hiện trong tab **Rạp Ăn Hỏi**
3. **`url`**: Link hình ảnh (link online Imgur/Cloudinary/Google... hoặc ảnh trong thư mục `public/photos/...`).

---

## 🌐 Cách lấy link URL ảnh:
1. **Up ảnh miễn phí lên:**
   - [Imgur](https://imgur.com) (Upload xong bấm chuột phải chọn "Copy image address / Sao chép địa chỉ hình ảnh").
   - [Postimages](https://postimages.org) hoặc [Cloudinary](https://cloudinary.com).
2. **Hoặc đặt ảnh trong dự án:**
   - Đặt ảnh vào thư mục `public/photos/` (ví dụ `public/photos/rap-dep.jpg`), rồi điền:
   - `"url": "/photos/rap-dep.jpg"`
