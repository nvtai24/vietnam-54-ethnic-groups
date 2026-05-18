import { Link } from 'react-router-dom';
import ethnicGroupsData from '../data/ethnicGroups.json';
import type { EthnicGroup } from '../types/EthnicGroup';

const sidebarWords = [
  'VIỆT NAM',
  '54 DÂN TỘC',
  'MỘT TRÁI TIM',
  'ĐOÀN KẾT',
  'ĐA DẠNG',
  'BẢN SẮC',
  'TRUYỀN THỐNG',
  'HỘI NHẬP',
  'TỰ HÀO',
];

const HomePage = () => {
  const groups = ethnicGroupsData.groups as EthnicGroup[];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {/* Decorative sidebar with scrolling text */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 md:w-20 bg-[#7f1d1d] overflow-hidden shadow-[8px_0_30px_rgba(31,41,55,0.16)]"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8d36b_0%,#b91c1c_42%,#12355b_100%)] opacity-95"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.32),transparent_24%)]"></div>

          <div className="sidebar-marquee relative h-full">
            <div className="sidebar-marquee__content">
              {[0, 1].map((trackIndex) => (
                <div className="sidebar-marquee__track" key={trackIndex}>
                  {sidebarWords.map((word) => (
                    <span className="sidebar-marquee__item" key={`${trackIndex}-${word}`}>
                      {word}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-8 md:px-16 lg:px-24 flex items-center justify-between gap-12 relative z-10">
          {/* Left side - Typography */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-[#1a3a5c] mb-4 leading-none">
              54
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a3a5c] mb-2 tracking-wide">
              DÂN TỘC
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a3a5c] tracking-wide">
              VIỆT NAM
            </h2>
            
            {/* Decorative lines */}
            <div className="mt-8 space-y-2">
              <div className="h-1 w-32 bg-red-600"></div>
              <div className="h-1 w-24 bg-yellow-500"></div>
            </div>
          </div>

          {/* Right side - Image collage */}
          <div className="hidden lg:flex items-center gap-4">
            {groups.slice(0, 4).map((group, index) => (
              <div
                key={group.id}
                className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                style={{
                  width: '180px',
                  height: index % 2 === 0 ? '400px' : '350px',
                  marginTop: index % 2 === 0 ? '0' : '50px'
                }}
              >
                <img
                  src={group.thumbnail}
                  alt={group.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Ethnic Groups Grid */}
      <section className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group) => (
            <Link
              key={group.id}
              to={`/dan-toc/${group.id}`}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[3/4]"
            >
              {/* Image */}
              <img
                src={group.thumbnail}
                alt={group.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-3xl font-bold mb-2 uppercase tracking-wider">
                  {group.name}
                </h3>
                <p className="text-sm opacity-90">
                  {group.population.toLocaleString('vi-VN')} người
                </p>
                <p className="text-xs opacity-75 mt-1">
                  {group.regions[0]}
                </p>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-yellow-400 transition-colors duration-300 rounded-lg"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-8 text-center">
          <p className="text-sm opacity-75">
            © 2026 - Sản phẩm sáng tạo môn Chủ nghĩa Khoa học Xã hội
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
