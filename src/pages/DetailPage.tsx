import { useMemo, useState, type SyntheticEvent } from "react";
import { Link, useParams } from "react-router-dom";
import ethnicGroupsData from "../data/ethnicGroups.json";
import type { EthnicGroup } from "../types/EthnicGroup";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const group = (ethnicGroupsData.groups as EthnicGroup[]).find(
    (item) => item.id === id,
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = useMemo(() => {
    if (!group) {
      return [];
    }

    return Array.from(
      new Set([group.thumbnail, ...group.images].filter(Boolean)),
    );
  }, [group]);

  if (!group) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f8f4ec] p-8 text-center text-[#15110f]">
        <div className="paper-grain absolute inset-0"></div>
        <div className="relative z-10 max-w-xl border-2 border-[#b0160b] bg-[#f8f4ec] p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">
            Không tìm thấy
          </p>
          <h1 className="mt-4 text-4xl font-black uppercase leading-none text-[#b0160b]">
            Không tìm thấy thông tin dân tộc
          </h1>
          <Link
            to="/"
            className="mt-8 inline-flex border-2 border-[#b0160b] bg-[#b0160b] px-6 py-3 text-xs font-black uppercase tracking-[0.13em] text-[#f8f4ec] transition hover:bg-transparent hover:text-[#b0160b]"
          >
            Quay về trang chủ
          </Link>
        </div>
      </main>
    );
  }

  const fallbackImage = allImages[0];
  const heroImage = allImages[currentImageIndex] || fallbackImage;
  const sideImage = allImages[(currentImageIndex + 1) % allImages.length] || heroImage;
  const wideImage = allImages[(currentImageIndex + 2) % allImages.length] || heroImage;
  const accentImage = allImages[(currentImageIndex + 3) % allImages.length] || sideImage;
  const galleryImages = allImages.slice(0, 6);
  const hasGallery = allImages.length > 1;

  const infoStats = [
    ["Dân số", `${group.population.toLocaleString("vi-VN")} người`],
    ["Ngôn ngữ", group.language],
    ["Khu vực", group.regions.join(", ")],
  ];

  const cultureSections = [
    ["Trang phục", group.culture.clothing],
    ["Nhà ở", group.culture.housing],
  ];

  const lifeSections = [
    ["Lễ hội", group.culture.festivals],
    ["Phong tục", group.culture.customs],
    ["Ẩm thực", group.culture.cuisine],
  ];

  const handleImageFallback = (event: SyntheticEvent<HTMLImageElement>) => {
    if (fallbackImage && event.currentTarget.src !== fallbackImage) {
      event.currentTarget.src = fallbackImage;
      return;
    }

    event.currentTarget.style.opacity = "0";
  };

  const nextImage = () => {
    if (!allImages.length) {
      return;
    }

    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    if (!allImages.length) {
      return;
    }

    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <main className="min-h-screen bg-[#f6f2ea] text-[#15110f]">
      <section className="relative isolate overflow-hidden bg-[#f8f4ec] px-6 py-6 sm:px-10">
        <div className="paper-grain absolute inset-0"></div>
        <div className="absolute inset-x-4 top-4 bottom-4 border-2 border-[#b0160b]/80 sm:inset-x-7 sm:top-7 sm:bottom-7"></div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1360px] flex-col">
          <nav className="flex items-start justify-between gap-5 px-2 py-5 text-[0.68rem] font-black uppercase leading-none text-[#15110f]">
            <Link to="/" className="transition hover:text-[#b0160b]">
              Trang chủ
            </Link>
            <span className="text-[#b0160b]">54 dân tộc Việt Nam</span>
            <span className="hidden sm:inline">{group.name}</span>
          </nav>

          <div className="grid flex-1 items-center gap-8 py-7 lg:grid-cols-[minmax(0,0.86fr)_minmax(480px,1fr)] lg:gap-12">
            <div className="px-2">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">
                Hồ sơ dân tộc
              </p>
              <h1 className="mt-4 text-6xl font-black uppercase leading-[0.82] text-[#b0160b] sm:text-8xl lg:text-9xl">
                {group.name}
              </h1>

              {group.otherNames && group.otherNames.length > 0 && (
                <p className="mt-5 max-w-[640px] text-sm font-black uppercase leading-tight text-[#15110f]">
                  Tên gọi khác: {group.otherNames.join(", ")}
                </p>
              )}

              <p className="mt-7 max-w-[680px] text-lg font-black uppercase leading-tight text-[#15110f] sm:text-2xl">
                {group.description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {infoStats.map(([label, value]) => (
                  <div
                    key={label}
                    className="border-2 border-[#15110f] bg-[#f8f4ec] p-4"
                  >
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-[#b0160b]">
                      {label}
                    </p>
                    <p className="mt-3 text-sm font-black uppercase leading-tight">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-2">
              <div className="border-2 border-[#15110f] bg-[#f8f4ec] p-2 shadow-[0_24px_64px_rgba(21,17,15,0.18)]">
                <div className="relative aspect-[5/4] overflow-hidden bg-[#15110f]">
                  <img
                    src={heroImage}
                    alt={`Hình ảnh dân tộc ${group.name}`}
                    className="h-full w-full object-cover contrast-105 transition duration-500"
                    onError={handleImageFallback}
                  />
                  {hasGallery && (
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button
                        type="button"
                        onClick={prevImage}
                        className="grid h-10 w-10 place-items-center border-2 border-[#f8f4ec] bg-[#15110f]/76 text-2xl font-black leading-none text-[#f8f4ec] transition hover:bg-[#b0160b]"
                        aria-label="Xem ảnh trước"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={nextImage}
                        className="grid h-10 w-10 place-items-center border-2 border-[#f8f4ec] bg-[#15110f]/76 text-2xl font-black leading-none text-[#f8f4ec] transition hover:bg-[#b0160b]"
                        aria-label="Xem ảnh tiếp theo"
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>

                {hasGallery && (
                  <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {galleryImages.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-square border-2 bg-[#15110f] transition ${
                          index === currentImageIndex
                            ? "border-[#b0160b] opacity-100"
                            : "border-[#15110f]/18 opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`Xem ảnh ${index + 1}`}
                      >
                        <img
                          src={image}
                          alt=""
                          className="h-full w-full object-cover"
                          onError={handleImageFallback}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="px-2 pb-6 text-[0.62rem] font-black uppercase leading-none">
            vietnam-54ethnic-groups
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f8f4ec] px-6 py-14 sm:px-10">
        <div className="paper-grain absolute inset-0"></div>
        <div className="relative z-10 mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">
              Lịch sử
            </p>
            <h2 className="mt-3 text-5xl font-black uppercase leading-[0.88] text-[#b0160b] sm:text-7xl">
              Dấu mốc cộng đồng
            </h2>
            <p className="mt-7 max-w-[760px] text-base font-bold leading-7">
              {group.history}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
            <img
              src={sideImage}
              alt=""
              className="aspect-[4/5] w-full object-cover contrast-105 sm:mt-12"
              aria-hidden="true"
              onError={handleImageFallback}
            />
            <img
              src={wideImage}
              alt=""
              className="aspect-[4/3] w-full object-cover contrast-105"
              aria-hidden="true"
              onError={handleImageFallback}
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#efe2cd] px-6 py-14 sm:px-10">
        <div className="paper-grain absolute inset-0 opacity-35"></div>
        <div className="relative z-10 mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src={accentImage}
              alt=""
              className="aspect-[4/3] w-full object-cover contrast-105"
              aria-hidden="true"
              onError={handleImageFallback}
            />
            <img
              src={heroImage}
              alt=""
              className="aspect-[4/5] w-full object-cover contrast-105 sm:mt-12"
              aria-hidden="true"
              onError={handleImageFallback}
            />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">
              Văn hóa vật thể
            </p>
            <h2 className="mt-3 text-5xl font-black uppercase leading-[0.88] text-[#b0160b] sm:text-7xl">
              Không gian sống và trang phục
            </h2>
            <div className="mt-8 grid gap-4">
              {cultureSections.map(([title, text]) => (
                <article
                  key={title}
                  className="border-l-4 border-[#b0160b] bg-[#f8f4ec] px-5 py-4"
                >
                  <h3 className="text-2xl font-black uppercase leading-none">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm font-bold leading-6">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#b0160b] px-6 py-14 text-[#f8f4ec] sm:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f8f4ec]/72">
                Đời sống
              </p>
              <h2 className="mt-3 text-5xl font-black uppercase leading-[0.88] sm:text-7xl">
                Lễ hội, phong tục, ẩm thực
              </h2>
            </div>
            <p className="max-w-[680px] text-base font-bold leading-7 text-[#f8f4ec]/86">
              Các thực hành văn hóa được nhóm theo từng chủ đề để dễ quét nhanh
              và vẫn giữ được chiều sâu khi đọc chi tiết.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {lifeSections.map(([title, items]) => (
              <article key={title as string} className="bg-[#f8f4ec] text-[#15110f]">
                <div className="border-b-2 border-[#b0160b] px-5 py-4">
                  <h3 className="text-3xl font-black uppercase leading-none">
                    {title as string}
                  </h3>
                </div>
                <ul className="p-5 text-sm font-bold leading-6">
                  {(items as string[]).map((item) => (
                    <li
                      key={item}
                      className="border-b border-[#15110f]/18 py-3 last:border-b-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f8f4ec] px-6 py-14 sm:px-10">
        <div className="paper-grain absolute inset-0"></div>
        <div className="relative z-10 mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">
              Nhận diện
            </p>
            <h2 className="mt-3 text-5xl font-black uppercase leading-[0.88] text-[#b0160b] sm:text-7xl">
              Bản sắc cộng đồng
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {group.characteristics.map((char) => (
              <div key={char} className="border-2 border-[#15110f] bg-[#f8f4ec] p-5">
                <p className="text-xl font-black uppercase leading-tight">
                  {char}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {((group.music && group.music.length > 0) ||
        (group.videos && group.videos.length > 0)) && (
        <section className="bg-[#15110f] px-6 py-14 text-[#f8f4ec] sm:px-10">
          <div className="mx-auto max-w-[1280px]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">
              Tư liệu nghe nhìn
            </p>
            <h2 className="mt-3 text-5xl font-black uppercase leading-[0.88] sm:text-7xl">
              Âm nhạc và video
            </h2>

            {group.music && group.music.length > 0 && (
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {group.music.map((music) => (
                  <article key={music.title} className="border-2 border-[#f8f4ec]/24 p-5">
                    <h3 className="text-2xl font-black uppercase leading-none">
                      {music.title}
                    </h3>
                    <p className="mt-3 text-sm font-bold leading-6 text-[#f8f4ec]/70">
                      {music.description}
                    </p>
                    <audio controls className="mt-5 w-full">
                      <source src={music.url} type="audio/mpeg" />
                      Trình duyệt của bạn không hỗ trợ phát âm thanh.
                    </audio>
                  </article>
                ))}
              </div>
            )}

            {group.videos && group.videos.length > 0 && (
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {group.videos.map((video) => (
                  <article key={video.title} className="bg-[#f8f4ec] text-[#15110f]">
                    <div className="relative aspect-video overflow-hidden">
                      <iframe
                        src={video.url}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      ></iframe>
                    </div>
                    <div className="p-5">
                      <h3 className="text-2xl font-black uppercase leading-none">
                        {video.title}
                      </h3>
                      <p className="mt-3 text-sm font-bold leading-6 text-[#15110f]/70">
                        {video.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <footer className="border-t-2 border-[#b0160b] bg-[#f8f4ec] px-6 py-8 text-center sm:px-10">
        <Link
          to="/"
          className="inline-flex border-2 border-[#b0160b] bg-[#b0160b] px-6 py-3 text-xs font-black uppercase tracking-[0.13em] text-[#f8f4ec] transition hover:bg-transparent hover:text-[#b0160b]"
        >
          Quay về trang chủ
        </Link>
      </footer>
    </main>
  );
};

export default DetailPage;
