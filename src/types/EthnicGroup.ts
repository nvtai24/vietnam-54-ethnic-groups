// Data model cho dân tộc
export interface MediaItem {
  title: string;
  url: string;
  description: string;
}

export interface CultureActivity {
  name: string;
  imageUrl: string;
}

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
  historyImages: string[]; // 2 ảnh tư liệu lịch sử
  culture: {
    festivals: CultureActivity[]; // Lễ hội
    customs: CultureActivity[]; // Phong tục tập quán
    clothing: string; // Trang phục truyền thống
    clothingImage: string; // Ảnh trang phục
    cuisine: CultureActivity[]; // Ẩm thực đặc trưng
    housing: string; // Nhà ở
    housingImage: string; // Ảnh nhà ở
  };
  
  // Media
  music?: MediaItem[];
  
  videos?: MediaItem[]; // YouTube embed URL
  
  // Đặc điểm nhận dạng
  characteristics: string[];
}

export interface DetailPageCopy {
  brandLabel: string;
  footerLabel: string;
  navigation: {
    homeLabel: string;
    collectionLabel: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    backLabel: string;
  };
  hero: {
    eyebrow: string;
    otherNamesLabel: string;
  };
  statLabels: {
    population: string;
    language: string;
    regions: string;
    populationUnit: string;
  };
  historySection: {
    eyebrow: string;
    title: string;
  };
  materialCultureSection: {
    eyebrow: string;
    title: string;
    clothingTitle: string;
    housingTitle: string;
  };
  lifeSection: {
    eyebrow: string;
    title: string;
    description: string;
    festivalTitle: string;
    customTitle: string;
    cuisineTitle: string;
  };
  identitySection: {
    eyebrow: string;
    title: string;
  };
  mediaSection: {
    eyebrow: string;
    title: string;
    description: string;
    defaultVideo: MediaItem;
  };
  actions: {
    backHome: string;
  };
  imageLabels: {
    mainImageAltPrefix: string;
    previousImage: string;
    nextImage: string;
    previousImageSymbol: string;
    nextImageSymbol: string;
    thumbnailImagePrefix: string;
  };
}

export interface EthnicGroupsData {
  detailPage: DetailPageCopy;
  groups: EthnicGroup[];
}
