import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import ethnicGroupsData from '../data/ethnicGroups.json';
import type { EthnicGroup } from '../types/EthnicGroup';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const group = (ethnicGroupsData.groups as EthnicGroup[]).find(g => g.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!group) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Không tìm thấy thông tin dân tộc
        </h2>
        <Link to="/" className="text-primary hover:text-primary-dark text-lg">
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  const allImages = [group.thumbnail, ...group.images];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#f7f3e9]">
      {/* Header với breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-primary hover:opacity-70 transition-opacity">
              Trang chủ
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-700">{group.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section với ảnh carousel */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Carousel */}
        <div className="relative w-full h-full">
          <img 
            src={allImages[currentImageIndex]} 
            alt={group.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
          
          {/* Prev/Next Buttons */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-primary text-3xl transition-all hover:scale-110 z-10"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-primary text-3xl transition-all hover:scale-110 z-10"
              >
                ›
              </button>
            </>
          )}

          {/* Indicators */}
          {allImages.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'w-8 bg-white' 
                      : 'w-3 bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white z-10 w-full px-8">
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg tracking-wider mb-2">
            {group.name}
          </h1>
          {group.otherNames && group.otherNames.length > 0 && (
            <p className="text-xl md:text-2xl opacity-95 italic">
              ({group.otherNames.join(', ')})
            </p>
          )}
        </div>
      </section>

      {/* Info Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-transform flex items-center gap-4">
            <div className="text-5xl">👥</div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-1">Dân số</h3>
              <p className="text-gray-600">{group.population.toLocaleString('vi-VN')} người</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-transform flex items-center gap-4">
            <div className="text-5xl">📍</div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-1">Khu vực sinh sống</h3>
              <p className="text-gray-600">{group.regions.join(', ')}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-transform flex items-center gap-4">
            <div className="text-5xl">🗣️</div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-1">Ngôn ngữ</h3>
              <p className="text-gray-600">{group.language}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nội dung chi tiết */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Giới thiệu */}
        <section className="bg-white p-8 rounded-xl shadow-md mb-6">
          <h2 className="text-3xl font-bold text-primary mb-4 pb-4 border-b-4 border-primary relative">
            Giới thiệu
            <span className="absolute bottom-0 left-0 w-24 h-1 bg-accent -mb-1"></span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">{group.description}</p>
        </section>

        {/* Lịch sử */}
        <section className="bg-white p-8 rounded-xl shadow-md mb-6">
          <h2 className="text-3xl font-bold text-primary mb-4 pb-4 border-b-4 border-primary relative">
            Lịch sử
            <span className="absolute bottom-0 left-0 w-24 h-1 bg-accent -mb-1"></span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">{group.history}</p>
        </section>

        {/* Đặc điểm nhận dạng */}
        <section className="bg-white p-8 rounded-xl shadow-md mb-6">
          <h2 className="text-3xl font-bold text-primary mb-4 pb-4 border-b-4 border-primary relative">
            Đặc điểm nhận dạng
            <span className="absolute bottom-0 left-0 w-24 h-1 bg-accent -mb-1"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.characteristics.map((char, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg flex items-center gap-3 border-l-4 border-primary"
              >
                <span className="text-primary text-xl">✦</span>
                <span className="text-gray-700">{char}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Văn hóa */}
        <section className="bg-white p-8 rounded-xl shadow-md mb-6">
          <h2 className="text-3xl font-bold text-primary mb-6 pb-4 border-b-4 border-primary relative">
            Văn hóa truyền thống
            <span className="absolute bottom-0 left-0 w-24 h-1 bg-accent -mb-1"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lễ hội */}
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <h3 className="text-xl font-semibold text-primary mb-3">🎊 Lễ hội</h3>
              <ul className="space-y-2">
                {group.culture.festivals.map((festival, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">• {festival}</li>
                ))}
              </ul>
            </div>

            {/* Phong tục */}
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <h3 className="text-xl font-semibold text-primary mb-3">🎭 Phong tục tập quán</h3>
              <ul className="space-y-2">
                {group.culture.customs.map((custom, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">• {custom}</li>
                ))}
              </ul>
            </div>

            {/* Ẩm thực */}
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <h3 className="text-xl font-semibold text-primary mb-3">🍜 Ẩm thực</h3>
              <ul className="space-y-2">
                {group.culture.cuisine.map((food, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">• {food}</li>
                ))}
              </ul>
            </div>

            {/* Trang phục */}
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <h3 className="text-xl font-semibold text-primary mb-3">👘 Trang phục truyền thống</h3>
              <p className="text-gray-700 leading-relaxed">{group.culture.clothing}</p>
            </div>

            {/* Nhà ở */}
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 md:col-span-2">
              <h3 className="text-xl font-semibold text-primary mb-3">🏠 Nhà ở</h3>
              <p className="text-gray-700 leading-relaxed">{group.culture.housing}</p>
            </div>
          </div>
        </section>

        {/* Âm nhạc */}
        {group.music && group.music.length > 0 && (
          <section className="bg-white p-8 rounded-xl shadow-md mb-6">
            <h2 className="text-3xl font-bold text-primary mb-6 pb-4 border-b-4 border-primary relative">
              🎵 Âm nhạc truyền thống
              <span className="absolute bottom-0 left-0 w-24 h-1 bg-accent -mb-1"></span>
            </h2>
            <div className="space-y-6">
              {group.music.map((music, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{music.title}</h4>
                  <p className="text-gray-600 italic mb-4">{music.description}</p>
                  <audio controls className="w-full">
                    <source src={music.url} type="audio/mpeg" />
                    Trình duyệt của bạn không hỗ trợ phát âm thanh.
                  </audio>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video */}
        {group.videos && group.videos.length > 0 && (
          <section className="bg-white p-8 rounded-xl shadow-md mb-6">
            <h2 className="text-3xl font-bold text-primary mb-6 pb-4 border-b-4 border-primary relative">
              🎬 Video giới thiệu
              <span className="absolute bottom-0 left-0 w-24 h-1 bg-accent -mb-1"></span>
            </h2>
            <div className="space-y-6">
              {group.videos.map((video, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{video.title}</h4>
                  <p className="text-gray-600 italic mb-4">{video.description}</p>
                  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                    <iframe
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Back to home button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Link 
          to="/" 
          className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          ← Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default DetailPage;
