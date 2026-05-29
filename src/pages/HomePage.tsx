import { useMemo, useState, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import ethnicGroupsData from "../data/ethnicGroups.json";
import type { EthnicGroup } from "../types/EthnicGroup";

const posterWords = [
  "54 DÂN TỘC ANH EM",
  "MỘT VIỆT NAM",
  "BẢN SẮC VÙNG MIỀN",
  "TRUYỀN THỐNG SỐNG ĐỘNG",
  "ĐOÀN KẾT CỘNG ĐỒNG",
  "SẮC MÀU TRANG PHỤC",
  "TIẾNG NÓI QUÊ HƯƠNG",
  "LỄ HỘI BỐN MÙA",
  "NÉT ĐẸP NÚI RỪNG",
  "VĂN HÓA ĐỒNG BẰNG",
  "DẤU ẤN CAO NGUYÊN",
  "KHÔNG GIAN CỒNG CHIÊNG",
  "CHỢ PHIÊN VÙNG CAO",
  "NHỊP SỐNG BẢN LÀNG",
  "DI SẢN CHA ÔNG",
  "HÀNH TRÌNH KHÁM PHÁ",
];
const heroYoutubeEmbedUrl =
  "https://www.youtube.com/embed/TY48IDOxLx8?autoplay=0&mute=0&loop=1&playlist=TY48IDOxLx8";

const homepageImages = {
  heroBackground:
    // "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/486972708_957258559896882_1352296246954997528_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeHuDyembE6FaTbnum64nLg-HSIB7f7DIFkdIgHt_sMgWQXuMgHipjPOZDZVPyC2e7l8qvaWtm9Hoork-E3ay7Gk&_nc_ohc=ZUgr_qMnh6YQ7kNvwHdymmh&_nc_oc=AdpVkJfzSDrxX80RtPDqHiU9VMtijoGIm7NKV62NiSOlx5smmCOnQict3GiknTAqllE&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=ufSiFwqwGEZucS4Ep_-wPQ&_nc_ss=7a2a8&oh=00_Af53BZTp1bMMt8w-m5mutNKkSQ2NTqtUZGBXcNPambvHeA&oe=6A170E79",
    // "/Gemini_Generated_Image_u3xtl0u3xtl0u3xt.png",
    "/ChatGPT Image May 23, 2026, 11_10_55 AM.png",
  videoFallback:
    "https://www.kidsup.net/wp-content/uploads/2025/09/cac-dan-toc-tren-dat-nuoc-viet-nam.jpg",
  groupsBackground:
    "https://ttgdtxtanyen.bacninh.edu.vn/upload/39331/20250425/12_005ad.png",
};

const HomePage = () => {
  const groups = (ethnicGroupsData.groups as EthnicGroup[]).sort(
    (a, b) => a.orderNo - b.orderNo,
  );
  const carouselGroups = [...groups, ...groups];
  const fallbackImage = homepageImages.heroBackground;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [hideContent, setHideContent] = useState(false);

  const regionOptions = useMemo(
    () =>
      Array.from(new Set(groups.flatMap((group) => group.regions))).sort(
        (a, b) => a.localeCompare(b, "vi"),
      ),
    [groups],
  );

  const filteredGroups = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase("vi-VN");

    return groups.filter((group) => {
      const searchableText = [
        group.name,
        ...(group.otherNames || []),
        group.language,
        ...group.regions,
      ]
        .join(" ")
        .toLocaleLowerCase("vi-VN");

      const matchesSearch =
        !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesRegion =
        selectedRegion === "all" || group.regions.includes(selectedRegion);

      return matchesSearch && matchesRegion;
    });
  }, [groups, searchTerm, selectedRegion]);

  const hasActiveFilters =
    searchTerm.trim().length > 0 || selectedRegion !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedRegion("all");
  };

  const handleImageFallback = (event: SyntheticEvent<HTMLImageElement>) => {
    if (fallbackImage && event.currentTarget.src !== fallbackImage) {
      event.currentTarget.src = fallbackImage;
      return;
    }

    event.currentTarget.style.opacity = "0";
  };

  return (
    <div className="min-h-screen bg-[#f6f2ea] text-[#15110f]">
      <section className="relative isolate min-h-screen overflow-hidden bg-[#15110f]">
        <img
          src={homepageImages.heroBackground}
          alt=""
          className={`absolute inset-0 h-full w-full scale-105 object-cover saturate-100 contrast-105 transition-opacity duration-500 ${hideContent ? "opacity-100" : "opacity-58"}`}
          aria-hidden="true"
        />
        <div
          className={`absolute inset-0 bg-[#15110f]/25 transition-opacity duration-500 ${hideContent ? "opacity-0" : "opacity-100"}`}
        ></div>
        <div
          className={`absolute inset-0 bg-[#f3dfbd]/50 transition-opacity duration-500 ${hideContent ? "opacity-0" : "opacity-100"}`}
        ></div>
        <div
          className={`paper-grain absolute inset-0 transition-opacity duration-500 ${hideContent ? "opacity-0" : "opacity-100"}`}
        ></div>
        <div
          className={`absolute inset-x-5 top-5 bottom-5 border-2 border-[#b0160b]/80 sm:inset-x-7 sm:top-7 sm:bottom-7 transition-opacity duration-500 ${hideContent ? "opacity-0" : "opacity-100"}`}
        ></div>

        <button
          type="button"
          onClick={() => setHideContent((v) => !v)}
          aria-label={hideContent ? "Hiện nội dung" : "Ẩn nội dung"}
          title={hideContent ? "Hiện nội dung" : "Ẩn nội dung"}
          className="fixed bottom-6 right-20 z-50 flex h-12 w-12 items-center justify-center border-2 border-primary bg-ink text-paper shadow-[0_4px_24px_rgba(176,22,11,0.35)] transition hover:bg-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            {hideContent ? (
              <>
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
              </>
            ) : (
              <path fillRule="evenodd" d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577A11.217 11.217 0 0112 3.75c4.5 0 8.336 2.55 10.364 6.306a11.21 11.21 0 01.312 2.497zM15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243zM6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.396-.12.82 0 1.216A11.249 11.249 0 0012 20.25a11.21 11.21 0 004.52-.935l-2.429-2.43A3.75 3.75 0 016.75 12z" clipRule="evenodd" />
            )}
          </svg>
        </button>

        <div
          className={`relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-5 py-8 sm:px-12 sm:py-10 lg:px-16 transition-opacity duration-500 ${hideContent ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <header className="relative z-20 flex items-start justify-between gap-6 text-[0.68rem] font-black uppercase leading-none tracking-normal text-[#15110f]">
            <div>
              <p>Vietnam 54 Ethnic Groups</p>
              <p className="mt-1 text-[#b0160b]">Digital culture archive</p>
            </div>
            <nav
              className="hidden items-center gap-5 sm:flex"
              aria-label="Homepage sections"
            >
              <a href="#explore" className="transition hover:text-[#b0160b]">
                Khám phá
              </a>
              <a href="#groups" className="transition hover:text-[#b0160b]">
                Danh sách
              </a>
            </nav>
          </header>

          <div className="relative z-20 grid flex-1 items-center gap-6 py-6 sm:gap-10 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(440px,620px)] lg:gap-14 lg:py-8">
            <div className="max-w-[820px]">
              <div className="mb-6 flex flex-wrap items-center gap-3 text-[0.68rem] font-black uppercase leading-none text-[#b0160b]">
                <span className="border-2 border-[#b0160b] px-3 py-2">
                  54 dân tộc
                </span>
                <span className="h-[2px] w-16 bg-[#b0160b]"></span>
                <span>Digital culture archive</span>
              </div>

              <h1 className="poster-title font-black uppercase leading-[0.78] text-[#b0160b]">
                Việt Nam
              </h1>

              <div className="mt-6 grid gap-5 border-l-4 border-[#b0160b] pl-5 sm:mt-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] md:items-end">
                <p className="text-sm font-bold leading-[1.4] text-[#15110f] sm:text-base">
                  Một bản đồ văn hóa sống động của các cộng đồng trên dải đất
                  hình chữ S.
                </p>
                <div className="hidden md:block md:text-right">
                  <p className="text-sm font-bold leading-[1.4] text-[#15110f] sm:text-base">
                    Khám phá trang phục, lễ hội, ngôn ngữ và đời sống của từng
                    dân tộc.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative w-full min-w-0 lg:justify-self-end">
              <div className="absolute -right-4 top-6 hidden h-[82%] w-16 rotate-2 bg-[#b0160b] shadow-[0_16px_32px_rgba(176,22,11,0.18)] sm:block"></div>
              <div className="relative w-full overflow-hidden border-2 border-ink bg-paper/95 p-2 shadow-[0_24px_70px_rgba(21,17,15,0.18)] lg:max-w-155">
                <div className="flex items-center justify-between border-b-2 border-[#15110f] px-3 py-2 text-[0.62rem] font-black uppercase leading-none text-[#15110f]">
                  <span>Video tư liệu</span>
                  <span className="text-[#b0160b]">54 dân tộc anh em</span>
                </div>
                <div className="relative mt-2 aspect-video overflow-hidden border-2 border-[#b0160b] bg-[#15110f]">
                  {heroYoutubeEmbedUrl ? (
                    <iframe
                      src={heroYoutubeEmbedUrl}
                      title="Video giới thiệu văn hóa các dân tộc Việt Nam"
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={homepageImages.videoFallback}
                        alt="Phong cảnh Việt Nam"
                        className="h-full w-full object-cover grayscale-[12%] contrast-110"
                        onError={handleImageFallback}
                      />
                      <div className="absolute inset-0 bg-[#15110f]/28"></div>
                      <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-[#f8f4ec] bg-[#b0160b] text-2xl font-black leading-none text-[#f8f4ec]">
                        Play
                      </div>
                    </>
                  )}
                </div>
                <div
                  className="mt-2 overflow-hidden border-2 border-[#b0160b] bg-[#b0160b] py-3 text-[0.74rem] font-black uppercase leading-none text-[#f8f4ec]"
                  aria-label="54 dân tộc anh em, một Việt Nam"
                >
                  <div className="poster-marquee flex w-max gap-5">
                    {[...posterWords, ...posterWords].map((word, index) => (
                      <span key={`video-${word}-${index}`}>{word}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-20 hidden items-end justify-between gap-6 text-[0.62rem] font-black uppercase leading-none text-ink sm:flex">
            <p>Since 2026</p>
            <p>vietnam-54ethnic-groups</p>
          </div>

          {/* Scroll mouse icon - centered on screen */}
          <a
            href="#groups"
            className="absolute left-1/2 bottom-12 z-30 -translate-x-1/2 transition hover:opacity-70"
            aria-label="Cuộn xuống để khám phá"
          >
            <div className="scroll-down-mouse">
              <div className="scroll-down-mouse-body">
                <span className="scroll-down-mouse-wheel"></span>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section
        id="explore"
        className="relative isolate overflow-hidden bg-[#7f1008] px-6 py-10 text-[#f8f4ec] sm:px-10"
      >
        <div className="paper-grain absolute inset-0 opacity-35"></div>

        <div className="relative z-10 mx-auto grid max-w-[1280px] gap-6 md:grid-cols-[0.72fr_1.28fr] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f8f4ec]/70">
              Tiêu điểm
            </p>
            <h2 className="mt-2 max-w-[520px] text-4xl font-black uppercase leading-[0.88] tracking-normal sm:text-6xl">
              Bản sắc trong từng miền đất
            </h2>
          </div>
          <div
            className="ethnic-carousel overflow-hidden border-y border-[#f8f4ec]/42 py-2"
            aria-label="Carousel các dân tộc"
          >
            <div className="ethnic-carousel-track flex w-max gap-3">
              {carouselGroups.map((group, index) => {
                const isDuplicate = index >= groups.length;

                return (
                  <Link
                    key={`${group.id}-${isDuplicate ? "duplicate" : "original"}`}
                    to={`/dan-toc/${group.id}`}
                    aria-hidden={isDuplicate}
                    tabIndex={isDuplicate ? -1 : undefined}
                    className="group w-[190px] shrink-0 border border-[#f8f4ec]/42 bg-[#f8f4ec] text-[#15110f] transition hover:-translate-y-1 hover:bg-[#15110f] hover:text-[#f8f4ec] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#f8f4ec]/35 sm:w-[210px] lg:w-[230px]"
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
                      <h3 className="text-2xl font-black uppercase leading-none tracking-normal">
                        {group.name}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        id="groups"
        className="relative isolate overflow-hidden bg-[#f8f4ec] px-6 py-12 sm:px-10"
      >
        <img
          src={homepageImages.groupsBackground}
          alt=""
          className="absolute inset-0 h-full w-full object-cover saturate-110 contrast-105"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#f3dfbd]/82"></div>
        <div className="paper-grain absolute inset-0 opacity-40"></div>
        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div className="mb-8 grid gap-6 border-y-2 border-[#b0160b] py-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">
                Tra cứu dân tộc
              </p>
              <h2 className="mt-3 text-4xl font-black uppercase leading-[0.88] tracking-normal text-[#b0160b] sm:text-6xl">
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
              Hiển thị{" "}
              <span className="text-[#b0160b]">{filteredGroups.length}</span>/
              {groups.length} dân tộc
            </span>
            {hasActiveFilters && (
              <span className="bg-[#b0160b] px-3 py-2 text-[#f8f4ec]">
                Đang lọc kết quả
              </span>
            )}
          </div>

          {filteredGroups.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
              {filteredGroups.map((group) => (
                <Link
                  key={group.id}
                  to={`/dan-toc/${group.id}`}
                  className="group bg-white text-[#15110f] shadow-[0_10px_26px_rgba(21,17,15,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(176,22,11,0.2)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#b0160b]/25"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#15110f]">
                    <img
                      src={group.thumbnail}
                      alt={group.name}
                      className="h-full w-full object-cover grayscale-[10%] transition duration-500 group-hover:scale-110 group-hover:grayscale-0"
                      onError={handleImageFallback}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(21,17,15,0.72)_100%)]"></div>
                    {/* <div className="absolute bottom-0 left-0 right-0 p-4 text-[#f8f4ec]">
                      <h3 className="text-2xl font-black uppercase leading-none tracking-normal">
                        {group.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[0.68rem] font-bold uppercase leading-tight text-[#f8f4ec]/78">
                        {group.regions[0]}
                      </p>
                    </div> */}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border-2 border-[#b0160b] bg-white px-6 py-14 text-center text-[#15110f]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">
                Không có kết quả
              </p>
              <h3 className="mt-3 text-3xl font-black uppercase leading-none tracking-normal">
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

      <section className="bg-[#f8f4ec] px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex justify-center">
            <img
              src="/spst.png"
              alt="Sản phẩm sáng tạo"
              className="max-w-full h-auto"
              onError={handleImageFallback}
            />
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-[#b0160b] bg-[#f8f4ec] px-6 py-8 text-center text-[#15110f] sm:px-10">
        <p className="text-xs font-black uppercase tracking-[0.14em]">
          © 2026 - Sản phẩm sáng tạo môn Chủ nghĩa Xã hội Khoa học
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
