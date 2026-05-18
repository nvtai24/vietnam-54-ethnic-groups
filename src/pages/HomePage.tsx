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
  const heroBackground = groups[0]?.images?.[2] || groups[0]?.thumbnail;

  return (
    <div className="min-h-screen bg-[#eef4ef]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#13293d] overflow-hidden">
        <img
          src={heroBackground}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-95"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,244,239,0.92)_0%,rgba(238,244,239,0.76)_40%,rgba(19,41,61,0.34)_100%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,41,61,0.2)_0%,rgba(19,41,61,0.05)_38%,rgba(19,41,61,0.42)_100%)]"></div>

        {/* Decorative sidebar with scrolling text */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 md:w-20 bg-[#7c1f2c] overflow-hidden shadow-[8px_0_30px_rgba(19,41,61,0.22)] z-20"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#d8aa45_0%,#9b2636_42%,#17324d_100%)] opacity-95"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.24),transparent_24%)]"></div>

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
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-[#17324d] mb-4 leading-none drop-shadow-[0_2px_14px_rgba(238,244,239,0.48)]">
              54
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#17324d] mb-2 tracking-wide drop-shadow-[0_2px_12px_rgba(238,244,239,0.4)]">
              DÂN TỘC
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#17324d] tracking-wide drop-shadow-[0_2px_12px_rgba(238,244,239,0.4)]">
              VIỆT NAM
            </h2>
            
            {/* Decorative lines */}
            <div className="mt-8 space-y-2">
              <div className="h-1 w-32 bg-[#9b2636]"></div>
              <div className="h-1 w-24 bg-[#d8aa45]"></div>
            </div>
          </div>

          {/* Right side - Image collage */}
          <div className="hidden lg:flex items-center gap-4">
            {groups.slice(0, 4).map((group, index) => (
              <div
                key={group.id}
                className="relative overflow-hidden rounded-xl shadow-[0_24px_60px_rgba(19,41,61,0.22)] transform hover:scale-105 transition-transform duration-300"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#13293d]/58 via-transparent to-transparent"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#17324d]/45 rounded-full flex items-start justify-center p-2 bg-[#eef4ef]/35">
            <div className="w-1 h-3 bg-[#9b2636] rounded-full"></div>
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
              className="group relative overflow-hidden rounded-lg shadow-[0_16px_40px_rgba(19,41,61,0.14)] hover:shadow-[0_22px_52px_rgba(19,41,61,0.24)] transition-all duration-300 aspect-[3/4] bg-[#17324d]"
            >
              {/* Image */}
              <img
                src={group.thumbnail}
                alt={group.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#13293d]/88 via-[#13293d]/42 to-[#9b2636]/8"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-3xl font-bold mb-2 uppercase tracking-wider">
                  {group.name}
                </h3>
                <p className="text-sm text-[#f6e7ba]">
                  {group.population.toLocaleString('vi-VN')} người
                </p>
                <p className="text-xs text-[#eef4ef]/78 mt-1">
                  {group.regions[0]}
                </p>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#d8aa45] transition-colors duration-300 rounded-lg"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#13293d] text-[#eef4ef] py-8 mt-16 border-t border-[#d8aa45]/30">
        <div className="container mx-auto px-8 text-center">
          <p className="text-sm text-[#eef4ef]/72">
            © 2026 - Sản phẩm sáng tạo môn Chủ nghĩa Khoa học Xã hội
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
