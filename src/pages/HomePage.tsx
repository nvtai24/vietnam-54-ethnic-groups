import { useMemo, useState } from 'react';
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

const heroSlideLayouts = [
  { height: '386px', marginTop: '18px' },
  { height: '424px', marginTop: '48px' },
  { height: '414px', marginTop: '-10px' },
  { height: '396px', marginTop: '24px' },
];

const HomePage = () => {
  const groups = ethnicGroupsData.groups as EthnicGroup[];
  const heroBackground = groups[0]?.images?.[2] || groups[0]?.thumbnail;
  const gridBackground = groups[0]?.images?.[1] || heroBackground;
  const heroSlides = useMemo(() => [...groups, ...groups], [groups]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regionOptions = useMemo(
    () => Array.from(new Set(groups.flatMap((group) => group.regions))).sort((a, b) => a.localeCompare(b, 'vi')),
    [groups]
  );

  const filteredGroups = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('vi-VN');

    return groups.filter((group) => {
      const searchableText = [
        group.name,
        ...(group.otherNames || []),
        group.language,
        ...group.regions,
      ]
        .join(' ')
        .toLocaleLowerCase('vi-VN');

      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesRegion = selectedRegion === 'all' || group.regions.includes(selectedRegion);

      return matchesSearch && matchesRegion;
    });
  }, [groups, searchTerm, selectedRegion]);

  const hasActiveFilters = searchTerm.trim().length > 0 || selectedRegion !== 'all';

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('all');
  };

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

          {/* Right side - Image slider */}
          <div className="relative hidden lg:block w-[768px] shrink-0">
            <div className="hero-slider overflow-hidden py-8">
              <div
                className="hero-slider__track"
              >
                {heroSlides.map((group, index) => {
                  const slideIndex = index % groups.length;
                  const isClonedSlide = index >= groups.length;

                  return (
                    <Link
                      key={`${group.id}-${index}`}
                      to={`/dan-toc/${group.id}`}
                      className="group relative block w-[180px] shrink-0 overflow-hidden rounded-xl bg-[#17324d] shadow-[0_24px_60px_rgba(19,41,61,0.22)] transition-transform duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d8aa45]/70"
                      style={heroSlideLayouts[slideIndex % heroSlideLayouts.length]}
                      aria-hidden={isClonedSlide}
                      aria-label={`Xem chi tiết dân tộc ${group.name}`}
                      tabIndex={isClonedSlide ? -1 : undefined}
                    >
                      <img
                        src={group.thumbnail}
                        alt={group.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(event) => {
                          event.currentTarget.style.opacity = '0';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#13293d]/78 via-[#13293d]/18 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-xl font-bold uppercase tracking-wide transition-colors duration-300 group-hover:text-[#d8aa45] group-focus-visible:text-[#d8aa45]">
                          {group.name}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
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
      <section className="relative overflow-hidden py-16">
        <img
          src={gridBackground}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#eef4ef]/88"></div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(238,244,239,0.96)_0%,rgba(238,244,239,0.82)_42%,rgba(19,41,61,0.2)_100%)]"></div>

        <div className="container relative z-10 mx-auto px-8">
          <div className="mb-8 rounded-xl border border-[#d8aa45]/28 bg-[#eef4ef]/88 p-5 shadow-[0_18px_44px_rgba(19,41,61,0.12)] backdrop-blur-md">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b2636]">
                  Tra cứu dân tộc
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#17324d]">
                  Danh sách 54 dân tộc
                </h2>
                <p className="mt-2 text-sm text-[#17324d]/70">
                  Tìm theo tên, tên gọi khác, khu vực hoặc ngôn ngữ.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto] xl:w-[760px]">
                <label className="block">
                  <span className="sr-only">Tìm kiếm dân tộc</span>
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Tìm dân tộc, khu vực, ngôn ngữ..."
                    className="h-12 w-full rounded-lg border border-[#17324d]/16 bg-white/92 px-4 text-sm font-medium text-[#17324d] shadow-sm outline-none transition focus:border-[#d8aa45] focus:ring-4 focus:ring-[#d8aa45]/20"
                  />
                </label>

                <label className="block">
                  <span className="sr-only">Lọc theo khu vực</span>
                  <select
                    value={selectedRegion}
                    onChange={(event) => setSelectedRegion(event.target.value)}
                    className="h-12 w-full rounded-lg border border-[#17324d]/16 bg-white/92 px-4 text-sm font-semibold text-[#17324d] shadow-sm outline-none transition focus:border-[#d8aa45] focus:ring-4 focus:ring-[#d8aa45]/20"
                  >
                    <option value="all">Tất cả khu vực</option>
                    {regionOptions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="h-12 rounded-lg bg-[#17324d] px-5 text-sm font-bold text-[#eef4ef] transition hover:bg-[#9b2636] disabled:cursor-not-allowed disabled:bg-[#17324d]/24 disabled:text-[#17324d]/45"
                >
                  Xóa lọc
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-[#17324d]/72">
              <span className="rounded-full bg-[#17324d]/8 px-4 py-2">
                Hiển thị {filteredGroups.length}/{groups.length} dân tộc
              </span>
              {hasActiveFilters && (
                <span className="rounded-full bg-[#d8aa45]/20 px-4 py-2 text-[#7c1f2c]">
                  Đang lọc kết quả
                </span>
              )}
            </div>
          </div>

          {filteredGroups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {filteredGroups.map((group) => (
              <Link
                key={group.id}
                to={`/dan-toc/${group.id}`}
                className="group relative overflow-hidden rounded-lg shadow-[0_12px_30px_rgba(19,41,61,0.14)] hover:shadow-[0_18px_42px_rgba(19,41,61,0.24)] transition-all duration-300 aspect-[3/4] bg-[#17324d]"
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
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1 uppercase tracking-wide transition-colors duration-300 group-hover:text-[#d8aa45] group-focus-visible:text-[#d8aa45]">
                    {group.name}
                  </h3>
                  <p className="text-xs text-[#f6e7ba]">
                    {group.regions[0]}
                  </p>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#d8aa45] transition-colors duration-300 rounded-lg"></div>
              </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[#d8aa45]/28 bg-[#17324d] px-6 py-14 text-center text-[#eef4ef] shadow-[0_18px_44px_rgba(19,41,61,0.14)]">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8aa45]">
                Không có kết quả
              </p>
              <h3 className="mt-3 text-3xl font-black">
                Không tìm thấy dân tộc phù hợp
              </h3>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-full bg-[#d8aa45] px-6 py-3 text-sm font-bold text-[#17324d] transition hover:bg-[#f6e7ba]"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#13293d] text-[#eef4ef] py-8 border-t border-[#d8aa45]/30">
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
