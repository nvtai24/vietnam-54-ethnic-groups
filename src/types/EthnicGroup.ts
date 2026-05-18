// Data model cho dân tộc
export interface EthnicGroup {
  id: string;
  name: string;
  otherNames?: string[]; // Tên gọi khác
  population: number;
  regions: string[]; // Khu vực sinh sống
  language: string;
  
  // Hình ảnh
  thumbnail: string; // Ảnh đại diện
  images: string[]; // Gallery ảnh
  
  // Thông tin chi tiết
  description: string; // Mô tả tổng quan
  history: string; // Lịch sử
  culture: {
    festivals: string[]; // Lễ hội
    customs: string[]; // Phong tục tập quán
    clothing: string; // Trang phục truyền thống
    cuisine: string[]; // Ẩm thực đặc trưng
    housing: string; // Nhà ở
  };
  
  // Media
  music?: {
    title: string;
    url: string;
    description: string;
  }[];
  
  videos?: {
    title: string;
    url: string; // YouTube embed URL
    description: string;
  }[];
  
  // Đặc điểm nhận dạng
  characteristics: string[];
}
