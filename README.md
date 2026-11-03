# Nhà Rạp Sơn Nụ - Website Giới Thiệu & Báo Giá Rạp Cưới

Trang web giới thiệu mẫu rạp đám cưới, rạp ăn hỏi cao cấp cho Nhà Rạp Sơn Nụ (Bản Lầu - Lào Cai).

---

## 🚀 Hướng Dẫn Chạy Trên Máy Tính (Local)

### 1. Yêu cầu hệ thống
- Đã cài đặt **Node.js** (phiên bản 18, 20 hoặc mới hơn). Tải tại: [https://nodejs.org](https://nodejs.org).

### 2. Cài đặt thư viện (Bắt buộc sau khi Clone)
Khi clone từ Git về máy, thư mục `node_modules` chưa có nên trình soạn thảo (VS Code) sẽ báo lỗi:
`Cannot find module 'react' or its corresponding type declarations.ts(2307)`

👉 **Cách khắc phục:**
Mở Terminal tại thư mục dự án và chạy lệnh:
```bash
npm install --legacy-peer-deps
```
*(Hoặc `npm install`)*

### 3. Khởi chạy trang web
Sau khi cài đặt xong, chạy lệnh:
```bash
npm run dev
```
Mở trình duyệt truy cập: `http://localhost:3000`

---

## 💡 Mẹo Xử Lý Lỗi VS Code Vẫn Báo Đỏ Sau Khi `npm install`
Nếu bạn đã chạy `npm install` thành công nhưng VS Code vẫn gạch đỏ ở chữ `react`:
1. Nhấn phím `Ctrl + Shift + P` (trên Mac: `Cmd + Shift + P`).
2. Gõ tìm kiếm: `TypeScript: Restart TS Server` và nhấn **Enter**.
3. Hoặc đơn giản là tắt VS Code đi và mở lại thư mục dự án.

---

## 📁 Cách Thêm Ảnh Rạp Cưới & Ăn Hỏi (Không cần đổi tên)
Dự án được cấu hình tự động quét tất cả ảnh trong 2 thư mục:
- **Ảnh Rạp Đám Cưới**: Thả trực tiếp các file ảnh vào `src/assets/images/rap-dam-cuoi/`
- **Ảnh Rạp Ăn Hỏi**: Thả trực tiếp các file ảnh vào `src/assets/images/rap-an-hoi/`

*Hỗ trợ mọi định dạng ảnh (.jpg, .jpeg, .png, .webp). Web sẽ tự động tải lên danh sách mẫu mà bạn không cần phải sửa code.*

---

## 🎥 Thêm Video
- Thả file video vào thư mục: `public/videos/` (định dạng `.mp4`, `.webm`).
- Hoặc chỉnh sửa link video TikTok / YouTube trong giao diện **Cài Đặt** ngay trên web.
