import { useMemo, useState, type SyntheticEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import ethnicGroupsData from '../data/ethnicGroups.json';
import type { EthnicGroup } from '../types/EthnicGroup';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const group = (ethnicGroupsData.groups as EthnicGroup[]).find((item) => item.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = useMemo(() => {
    if (!group) {
      return [];
    }

    return [group.thumbnail, ...group.images].filter(Boolean);
  }, [group]);

  if (!group) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f8f4ec] p-8 text-center text-[#15110f]">
        <div className="paper-grain absolute inset-0"></div>
        <div className="relative z-10 max-w-xl border-2 border-[#b0160b] bg-[#f8f4ec] p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">Không tìm thấy</p>
          <h1 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.04em] text-[#b0160b]">
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

  const handleImageFallback = (event: SyntheticEvent<HTMLImageElement>) => {
    if (fallbackImage && event.currentTarget.src !== fallbackImage) {
      event.currentTarget.src = fallbackImage;
      return;
    }

    event.currentTarget.style.opacity = '0';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <main className="min-h-screen bg-[#f6f2ea] text-[#15110f]">
      <section className="relative isolate overflow-hidden border-[14px] border-[#f6f2ea] bg-[#f8f4ec]">
        <div className="paper-grain absolute inset-0"></div>
        <div className="absolute inset-x-5 top-5 bottom-5 border-2 border-[#b0160b] sm:inset-x-7 sm:top-7 sm:bottom-7"></div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-8 py-10 sm:px-12 lg:px-16">
          <nav className="relative z-30 flex items-start justify-between gap-6 text-[0.68rem] font-black uppercase leading-none tracking-[-0.01em]">
            <Link to="/" className="transition hover:text-[#b0160b]">
              Trang chủ
            </Link>
            <span className="text-[#b0160b]">54 dân tộc Việt Nam</span>
            <span>{group.name}</span>
          </nav>

          <div className="relative grid flex-1 items-center gap-8 py-12 lg:grid-cols-[0.75fr_1fr_0.75fr]">
            <div className="relative z-20 max-w-[330px] self-end">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">Dân tộc</p>
              <h1 className="mt-4 text-[clamp(4.2rem,13vw,11rem)] font-black uppercase leading-[0.72] tracking-[-0.08em] text-[#b0160b]">
                {group.name}
              </h1>
              {group.otherNames && group.otherNames.length > 0 && (
                <p className="mt-5 text-sm font-black uppercase leading-tight">
                  Tên gọi khác: {group.otherNames.join(', ')}
                </p>
              )}
              <div className="mt-6 h-1 w-24 bg-[#b0160b]"></div>
            </div>

            <div className="relative z-20 mx-auto w-full max-w-[440px]">
              <div className="absolute -left-8 top-8 h-28 w-44 -rotate-6 bg-[#b0160b]"></div>
              <button
                type="button"
                onClick={nextImage}
                className="group relative block aspect-[4/5] w-full bg-[#15110f] shadow-[0_26px_70px_rgba(21,17,15,0.28)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#b0160b]/35"
                aria-label="Đổi ảnh chính"
              >
                <img
                  src={heroImage}
                  alt={`Hình ảnh dân tộc ${group.name}`}
                  className="h-full w-full object-cover grayscale-[42%] contrast-110 transition duration-500 group-hover:grayscale-0"
                  onError={handleImageFallback}
                />
                <span className="absolute bottom-4 right-4 bg-[#b0160b] px-3 py-2 text-[0.62rem] font-black uppercase tracking-[0.14em] text-[#f8f4ec]">
                  Click đổi ảnh
                </span>
              </button>
              {allImages.length > 1 && (
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={prevImage}
                    className="flex h-10 w-10 items-center justify-center border-2 border-[#15110f] bg-[#f8f4ec] text-2xl font-black leading-none transition hover:border-[#b0160b] hover:bg-[#b0160b] hover:text-[#f8f4ec]"
                    aria-label="Xem ảnh trước"
                  >
                    ‹
                  </button>
                  {allImages.slice(0, 4).map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-10 w-10 border-2 transition ${
                        index === currentImageIndex
                          ? 'border-[#b0160b]'
                          : 'border-[#15110f]/25 opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Xem ảnh ${index + 1}`}
                    >
                      <img src={image} alt="" className="h-full w-full object-cover" onError={handleImageFallback} />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={nextImage}
                    className="flex h-10 w-10 items-center justify-center border-2 border-[#15110f] bg-[#f8f4ec] text-2xl font-black leading-none transition hover:border-[#b0160b] hover:bg-[#b0160b] hover:text-[#f8f4ec]"
                    aria-label="Xem ảnh tiếp theo"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>

            <div className="relative z-20 max-w-[360px] justify-self-end text-right lg:self-end lg:pb-16">
              <p className="text-sm font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-lg">
                {group.description}
              </p>
              <div className="mt-7 grid gap-3 text-left">
                {[
                  ['Dân số', `${group.population.toLocaleString('vi-VN')} người`],
                  ['Ngôn ngữ', group.language],
                  ['Khu vực', group.regions.join(', ')],
                ].map(([label, value]) => (
                  <div key={label} className="border-t-2 border-[#15110f] pt-3">
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-[#b0160b]">{label}</p>
                    <p className="mt-1 text-sm font-black uppercase leading-tight">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="relative z-20 text-[0.62rem] font-black uppercase leading-none">vietnam-54ethnic-groups</p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f8f4ec] px-6 py-14 sm:px-10">
        <div className="paper-grain absolute inset-0"></div>
        <div className="relative z-10 mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h2 className="max-w-[760px] text-[clamp(3rem,8vw,7.2rem)] font-black uppercase leading-[0.82] tracking-[-0.07em] text-[#b0160b]">
              Văn hóa {group.name}
            </h2>
            <p className="mt-8 max-w-[360px] text-xl font-black uppercase leading-[0.95] tracking-[-0.04em]">
              Câu chuyện hình thành, phát triển và dấu ấn cộng đồng.
            </p>
            <p className="mt-8 max-w-[720px] text-sm font-bold leading-6">{group.history}</p>
          </div>

          <div className="grid gap-4">
            <img
              src={sideImage}
              alt=""
              className="ml-auto aspect-[4/3] w-full max-w-[300px] object-cover grayscale contrast-110"
              aria-hidden="true"
              onError={handleImageFallback}
            />
            <img
              src={wideImage}
              alt=""
              className="aspect-[16/10] w-full object-cover grayscale contrast-110"
              aria-hidden="true"
              onError={handleImageFallback}
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f8f4ec] px-6 py-14 sm:px-10">
        <div className="paper-grain absolute inset-0"></div>
        <div className="relative z-10 mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[0.8fr_1.2fr]">
            <img
              src={accentImage}
              alt=""
              className="aspect-[4/3] w-full object-cover grayscale contrast-110 sm:mt-12"
              aria-hidden="true"
              onError={handleImageFallback}
            />
            <img
              src={heroImage}
              alt=""
              className="aspect-[4/5] w-full object-cover grayscale contrast-110"
              aria-hidden="true"
              onError={handleImageFallback}
            />
          </div>

          <div>
            <p className="ml-auto max-w-[320px] text-right text-xs font-bold italic leading-4">
              Trang phục là một trong những tín hiệu thị giác mạnh nhất để nhận diện bản sắc, lối sống và thẩm mỹ của cộng đồng.
            </p>
            <h2 className="mt-28 text-right text-[clamp(3.4rem,8vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.07em] text-[#b0160b]">
              Trang phục truyền thống
            </h2>
            <p className="mt-6 text-sm font-bold leading-6">{group.culture.clothing}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#b0160b] px-6 py-12 text-[#f8f4ec] sm:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f8f4ec]/70">Đời sống</p>
              <h2 className="mt-3 text-5xl font-black uppercase leading-[0.82] tracking-[-0.06em] sm:text-7xl">
                Lễ hội, phong tục, ẩm thực
              </h2>
            </div>
            <p className="max-w-[620px] text-sm font-bold leading-6 text-[#f8f4ec]/86">
              Các lớp văn hóa được trình bày thành từng mảng ngắn để dễ đọc, giống một trang tạp chí hơn là một bảng thông tin khô.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ['Lễ hội', group.culture.festivals],
              ['Phong tục', group.culture.customs],
              ['Ẩm thực', group.culture.cuisine],
            ].map(([title, items], index) => (
              <article key={title as string} className="bg-[#f8f4ec] text-[#15110f]">
                <div className="border-b-2 border-[#b0160b] px-5 py-4">
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#b0160b]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 text-3xl font-black uppercase leading-none tracking-[-0.04em]">
                    {title as string}
                  </h3>
                </div>
                <ul className="space-y-0 p-5 text-sm font-bold leading-6">
                  {(items as string[]).map((item) => (
                    <li key={item} className="border-b border-[#15110f]/18 py-3 last:border-b-0">
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
        <div className="relative z-10 mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-black uppercase leading-[0.82] tracking-[-0.07em] text-[#b0160b]">
              Bản sắc cộng đồng
            </h2>
            <p className="mt-7 text-sm font-bold leading-6">{group.culture.housing}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {group.characteristics.map((char, index) => (
              <div key={char} className="border-2 border-[#15110f] bg-[#f8f4ec] p-5">
                <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#b0160b]">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-4 text-xl font-black uppercase leading-none tracking-[-0.04em]">{char}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {((group.music && group.music.length > 0) || (group.videos && group.videos.length > 0)) && (
        <section className="bg-[#15110f] px-6 py-14 text-[#f8f4ec] sm:px-10">
          <div className="mx-auto max-w-[1280px]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">Tư liệu nghe nhìn</p>
            <h2 className="mt-3 text-5xl font-black uppercase leading-[0.82] tracking-[-0.06em] sm:text-7xl">
              Âm nhạc và video
            </h2>

            {group.music && group.music.length > 0 && (
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {group.music.map((music) => (
                  <article key={music.title} className="border-2 border-[#f8f4ec]/24 p-5">
                    <h3 className="text-2xl font-black uppercase leading-none tracking-[-0.04em]">{music.title}</h3>
                    <p className="mt-3 text-sm font-bold leading-6 text-[#f8f4ec]/70">{music.description}</p>
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
                      <h3 className="text-2xl font-black uppercase leading-none tracking-[-0.04em]">{video.title}</h3>
                      <p className="mt-3 text-sm font-bold leading-6 text-[#15110f]/70">{video.description}</p>
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
