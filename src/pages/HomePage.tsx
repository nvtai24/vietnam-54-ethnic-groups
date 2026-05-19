import { useMemo, useState, type SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import ethnicGroupsData from '../data/ethnicGroups.json';
import type { EthnicGroup } from '../types/EthnicGroup';

const posterWords = ['BẢN SẮC', '54 DÂN TỘC', 'VIỆT NAM', 'ĐOÀN KẾT', 'TRUYỀN THỐNG'];

const featuredGroupIds = ['kinh', 'tay', 'thai', 'muong'];

const HomePage = () => {
  const groups = ethnicGroupsData.groups as EthnicGroup[];
  const heroGroup = groups[0];
  const heroBackground = heroGroup?.images?.[2] || heroGroup?.thumbnail;
  const heroPortrait = heroGroup?.images?.[0] || heroGroup?.thumbnail;
  const fallbackImage = heroBackground || heroPortrait;
  const featuredGroups = featuredGroupIds
    .map((id) => groups.find((group) => group.id === id))
    .filter(Boolean) as EthnicGroup[];

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

  const handleImageFallback = (event: SyntheticEvent<HTMLImageElement>) => {
    if (fallbackImage && event.currentTarget.src !== fallbackImage) {
      event.currentTarget.src = fallbackImage;
      return;
    }

    event.currentTarget.style.opacity = '0';
  };

  return (
    <div className="min-h-screen bg-[#f6f2ea] text-[#15110f]">
      <section className="relative isolate overflow-hidden border-[14px] border-[#f6f2ea] bg-[#f8f4ec] min-h-screen">
        <div className="paper-grain absolute inset-0"></div>
        <div className="absolute inset-x-5 top-5 bottom-5 border-2 border-[#b0160b] sm:inset-x-7 sm:top-7 sm:bottom-7"></div>
        <img
          src={heroBackground}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.11] saturate-0 contrast-125"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#f8f4ec]/80"></div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-8 py-10 sm:px-12 lg:px-16">
          <header className="relative z-20 flex items-start justify-between gap-6 text-[0.68rem] font-black uppercase leading-none tracking-[-0.01em] text-[#15110f]">
            <div>
              <p>Vietnam 54 Ethnic Groups</p>
              <p className="mt-1 text-[#b0160b]">Digital culture archive</p>
            </div>
            <nav className="hidden items-center gap-5 sm:flex" aria-label="Homepage sections">
              <a href="#explore" className="transition hover:text-[#b0160b]">
                Khám phá
              </a>
              <a href="#groups" className="transition hover:text-[#b0160b]">
                Danh sách
              </a>
            </nav>
          </header>

          <div className="relative z-20 grid flex-1 items-center gap-8 py-12 lg:grid-cols-[1fr_minmax(260px,380px)_1fr] lg:py-4">
            <div className="order-2 max-w-[300px] self-end text-left lg:order-1">
              <p className="text-[0.78rem] font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-sm">
                Một bản đồ văn hóa sống động của các cộng đồng trên dải đất hình chữ S.
              </p>
              <div className="mt-6 h-1 w-24 bg-[#b0160b]"></div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[330px] sm:max-w-[360px]">
                <div className="absolute -inset-x-8 top-8 z-0 h-28 rotate-[-4deg] bg-[#b0160b] shadow-[0_16px_32px_rgba(176,22,11,0.2)]"></div>
                <img
                  src={heroPortrait}
                  alt="Phong cảnh Việt Nam"
                  className="relative z-10 h-full w-full object-cover grayscale-[12%] contrast-110 shadow-[0_24px_70px_rgba(21,17,15,0.28)]"
                  onError={handleImageFallback}
                />
                <div className="absolute -top-8 left-1/2 z-20 w-[56%] -translate-x-1/2 bg-[#b0160b] px-5 py-4 text-center text-4xl font-black leading-none text-[#f8f4ec] shadow-[0_18px_28px_rgba(176,22,11,0.28)] sm:text-5xl">
                  54
                </div>
                <div className="absolute -bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap bg-[#15110f] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#f8f4ec]">
                  Dân tộc anh em
                </div>
              </div>
            </div>

            <div className="order-3 max-w-[300px] justify-self-end text-right lg:self-end lg:pb-14">
              <p className="text-[0.78rem] font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-sm">
                Khám phá trang phục, lễ hội, ngôn ngữ và đời sống của từng dân tộc.
              </p>
              <a
                href="#groups"
                className="mt-6 inline-flex h-11 items-center border-2 border-[#b0160b] bg-[#b0160b] px-5 text-xs font-black uppercase tracking-[0.14em] text-[#f8f4ec] transition hover:bg-transparent hover:text-[#b0160b]"
              >
                Bắt đầu
              </a>
            </div>
          </div>

          <h1 className="poster-title pointer-events-none absolute left-1/2 top-1/2 z-[1] w-[92vw] -translate-x-1/2 -translate-y-1/2 text-center font-black uppercase leading-[0.75] text-[#b0160b]">
            Việt Nam
          </h1>

          <div className="relative z-20 flex items-end justify-between gap-6 text-[0.62rem] font-black uppercase leading-none text-[#15110f]">
            <p>Since 2026</p>
            <div className="hidden max-w-[520px] overflow-hidden md:block">
              <div className="poster-marquee flex w-max gap-5">
                {[...posterWords, ...posterWords].map((word, index) => (
                  <span key={`${word}-${index}`}>{word}</span>
                ))}
              </div>
            </div>
            <p>vietnam-54ethnic-groups</p>
          </div>
        </div>
      </section>

      <section id="explore" className="bg-[#b0160b] px-6 py-10 text-[#f8f4ec] sm:px-10">
        <div className="mx-auto grid max-w-[1280px] gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f8f4ec]/70">Tiêu điểm</p>
            <h2 className="mt-2 max-w-[520px] text-4xl font-black uppercase leading-[0.88] tracking-[-0.04em] sm:text-6xl">
              Bản sắc trong từng miền đất
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredGroups.map((group, index) => (
              <Link
                key={group.id}
                to={`/dan-toc/${group.id}`}
                className="group border border-[#f8f4ec]/42 bg-[#f8f4ec] text-[#15110f] transition hover:-translate-y-1 hover:bg-[#15110f] hover:text-[#f8f4ec]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#15110f]">
                  <img
                    src={group.thumbnail}
                    alt={group.name}
                    className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-110 group-hover:opacity-75"
                    onError={handleImageFallback}
                  />
                </div>
                <div className="p-4">
                  <p className="text-[0.64rem] font-black uppercase tracking-[0.16em] text-[#b0160b] group-hover:text-[#f8f4ec]/72">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 text-2xl font-black uppercase leading-none tracking-[-0.04em]">
                    {group.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="groups" className="relative overflow-hidden bg-[#f8f4ec] px-6 py-12 sm:px-10">
        <div className="paper-grain absolute inset-0"></div>
        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div className="mb-8 grid gap-6 border-y-2 border-[#b0160b] py-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">Tra cứu dân tộc</p>
              <h2 className="mt-3 text-4xl font-black uppercase leading-[0.88] tracking-[-0.04em] text-[#b0160b] sm:text-6xl">
                Danh sách 54 dân tộc
              </h2>
            </div>

            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
              <label className="block">
                <span className="sr-only">Tìm kiếm dân tộc</span>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Tìm dân tộc, khu vực, ngôn ngữ..."
                  className="h-12 w-full border-2 border-[#15110f] bg-white px-4 text-sm font-bold text-[#15110f] outline-none transition placeholder:text-[#15110f]/44 focus:border-[#b0160b] focus:ring-4 focus:ring-[#b0160b]/15"
                />
              </label>

              <label className="block">
                <span className="sr-only">Lọc theo khu vực</span>
                <select
                  value={selectedRegion}
                  onChange={(event) => setSelectedRegion(event.target.value)}
                  className="h-12 w-full border-2 border-[#15110f] bg-white px-4 text-sm font-bold text-[#15110f] outline-none transition focus:border-[#b0160b] focus:ring-4 focus:ring-[#b0160b]/15"
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
                className="h-12 border-2 border-[#15110f] bg-[#15110f] px-5 text-xs font-black uppercase tracking-[0.12em] text-[#f8f4ec] transition hover:border-[#b0160b] hover:bg-[#b0160b] disabled:cursor-not-allowed disabled:border-[#15110f]/20 disabled:bg-[#15110f]/15 disabled:text-[#15110f]/38"
              >
                Xóa lọc
              </button>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs font-black uppercase tracking-[0.13em] text-[#15110f]">
            <span>
              Hiển thị <span className="text-[#b0160b]">{filteredGroups.length}</span>/{groups.length} dân tộc
            </span>
            {hasActiveFilters && <span className="bg-[#b0160b] px-3 py-2 text-[#f8f4ec]">Đang lọc kết quả</span>}
          </div>

          {filteredGroups.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
              {filteredGroups.map((group, index) => (
                <Link
                  key={group.id}
                  to={`/dan-toc/${group.id}`}
                  className="group bg-white text-[#15110f] shadow-[0_10px_26px_rgba(21,17,15,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(176,22,11,0.2)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#b0160b]/25"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#15110f]">
                    <img
                      src={group.thumbnail}
                      alt={group.name}
                      className="h-full w-full object-cover grayscale-[10%] transition duration-500 group-hover:scale-110 group-hover:grayscale-0"
                      onError={handleImageFallback}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(21,17,15,0.72)_100%)]"></div>
                    <span className="absolute left-3 top-3 bg-[#b0160b] px-2 py-1 text-[0.62rem] font-black text-[#f8f4ec]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-[#f8f4ec]">
                      <h3 className="text-2xl font-black uppercase leading-none tracking-[-0.04em]">
                        {group.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[0.68rem] font-bold uppercase leading-tight text-[#f8f4ec]/78">
                        {group.regions[0]}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border-2 border-[#b0160b] bg-white px-6 py-14 text-center text-[#15110f]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">Không có kết quả</p>
              <h3 className="mt-3 text-3xl font-black uppercase leading-none tracking-[-0.04em]">
                Không tìm thấy dân tộc phù hợp
              </h3>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 border-2 border-[#b0160b] bg-[#b0160b] px-6 py-3 text-xs font-black uppercase tracking-[0.13em] text-[#f8f4ec] transition hover:bg-transparent hover:text-[#b0160b]"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t-2 border-[#b0160b] bg-[#f8f4ec] px-6 py-8 text-center text-[#15110f] sm:px-10">
        <p className="text-xs font-black uppercase tracking-[0.14em]">
          © 2026 - Sản phẩm sáng tạo môn Chủ nghĩa Khoa học Xã hội
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
