# 54 Dân Tộc Việt Nam

Website giới thiệu về 54 dân tộc anh em tại Việt Nam - Sản phẩm sáng tạo môn Chủ nghĩa Khoa học Xã hội.

## 🎯 Mục đích

Website này được tạo ra để giới thiệu về bản sắc văn hóa đa dạng của 54 dân tộc Việt Nam, bao gồm:
- Thông tin cơ bản (dân số, khu vực sinh sống, ngôn ngữ)
- Lịch sử hình thành và phát triển
- Văn hóa truyền thống (lễ hội, phong tục, trang phục, ẩm thực, nhà ở)
- Gallery ảnh
- Âm nhạc truyền thống
- Video giới thiệu

## 🚀 Cài đặt và Chạy

### Yêu cầu
- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn

### Các bước chạy dự án

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Mở trình duyệt và truy cập: `http://localhost:5173`

4. Build cho production:
```bash
npm run build
```

## 📁 Cấu trúc dự án

```
src/
├── data/
│   └── ethnicGroups.json      # Dữ liệu các dân tộc (hardcoded)
├── types/
│   └── EthnicGroup.ts         # Type definition cho dân tộc
├── pages/
│   ├── HomePage.tsx           # Trang chủ - danh sách các dân tộc
│   ├── HomePage.css
│   ├── DetailPage.tsx         # Trang chi tiết một dân tộc
│   └── DetailPage.css
├── App.tsx                    # Router chính
└── main.tsx                   # Entry point
```

## 📝 Data Model

Mỗi dân tộc có cấu trúc dữ liệu như sau:

```typescript
interface EthnicGroup {
  id: string;                    // ID duy nhất
  name: string;                  // Tên dân tộc
  otherNames?: string[];         // Tên gọi khác
  population: number;            // Dân số
  regions: string[];             // Khu vực sinh sống
  language: string;              // Ngôn ngữ
  
  thumbnail: string;             // Ảnh đại diện
  images: string[];              // Gallery ảnh
  
  description: string;           // Mô tả tổng quan
  history: string;               // Lịch sử
  
  culture: {
    festivals: string[];         // Lễ hội
    customs: string[];           // Phong tục tập quán
    clothing: string;            // Trang phục
    cuisine: string[];           // Ẩm thực
    housing: string;             // Nhà ở
  };
  
  music?: Array<{               // Âm nhạc (optional)
    title: string;
    url: string;
    description: string;
  }>;
  
  videos?: Array<{              // Video (optional)
    title: string;
    url: string;
    description: string;
  }>;
  
  characteristics: string[];     // Đặc điểm nhận dạng
}
```

## ✏️ Cách thêm dân tộc mới

1. Mở file `src/data/ethnicGroups.json`
2. Thêm object mới vào mảng `groups` theo cấu trúc data model ở trên
3. Lưu file và reload trang

**Ví dụ:**
```json
{
  "id": "dao",
  "name": "Dao",
  "population": 891000,
  "regions": ["Hà Giang", "Cao Bằng", "Lào Cai"],
  "language": "Tiếng Dao",
  "thumbnail": "URL_ẢNH",
  "images": ["URL_1", "URL_2"],
  "description": "Mô tả về người Dao...",
  "history": "Lịch sử người Dao...",
  "culture": {
    "festivals": ["Lễ hội 1", "Lễ hội 2"],
    "customs": ["Phong tục 1", "Phong tục 2"],
    "clothing": "Mô tả trang phục...",
    "cuisine": ["Món ăn 1", "Món ăn 2"],
    "housing": "Mô tả nhà ở..."
  },
  "characteristics": ["Đặc điểm 1", "Đặc điểm 2"]
}
```

## 🎨 Tính năng

### Trang chủ
- Hiển thị grid các dân tộc với ảnh đại diện
- Thông tin cơ bản: tên, dân số, khu vực
- Hover effect và animation
- Responsive design

### Trang chi tiết
- **Image Carousel**: Xem nhiều ảnh với nút prev/next và indicators
- **Thông tin cơ bản**: Cards hiển thị dân số, khu vực, ngôn ngữ
- **Văn hóa**: Lễ hội, phong tục, trang phục, ẩm thực, nhà ở
- **Âm nhạc**: Audio player cho nhạc truyền thống
- **Video**: Embedded YouTube videos
- **Đặc điểm**: Grid hiển thị các đặc điểm nhận dạng
- Breadcrumb navigation
- Responsive design

## 🎯 Hiện tại

Hiện tại đã có **6 dân tộc** được thêm vào với dữ liệu đầy đủ:
1. **Kinh** - Dữ liệu hoàn chỉnh (mẫu)
2. Tày
3. Thái
4. Mường
5. Khmer
6. H'Mông

Dân tộc **Kinh** được làm mẫu với đầy đủ thông tin, ảnh, âm nhạc, video để bạn tham khảo.

## 📌 Lưu ý

- Dữ liệu được lưu trong file JSON (hardcoded), không cần backend
- Ảnh hiện tại dùng từ Unsplash (placeholder), bạn nên thay bằng ảnh thật
- URL âm nhạc và video cần được cập nhật với link thật
- Website hoàn toàn frontend, có thể deploy lên Netlify, Vercel, GitHub Pages

## 🔧 Công nghệ sử dụng

- **React 19** - UI Framework
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Vite** - Build tool
- **Tailwind CSS v4** - Utility-first CSS framework

## 📱 Responsive

Website được thiết kế responsive, hoạt động tốt trên:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎨 Theme

- Màu chủ đạo: Đỏ (#c31432, #da1e37) - tượng trưng cho lá cờ Việt Nam
- Màu phụ: Vàng (#ffd700) - tượng trưng cho ngôi sao
- Background: Gradient nhẹ nhàng, truyền thống
- Font: Segoe UI - dễ đọc, hiện đại

---

**Chúc bạn thành công với sản phẩm sáng tạo! 🇻🇳**
