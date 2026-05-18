import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ethnicGroupsData from '../data/ethnicGroups.json';
import type { EthnicGroup } from '../types/EthnicGroup';

const sectionTitles = {
  overview: 'Tổng quan',
  culture: 'Văn hóa truyền thống',
  media: 'Tư liệu nghe nhìn',
};

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
      <main className="min-h-screen bg-[#eef4ef] flex flex-col items-center justify-center p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b2636]">
          Không tìm thấy
        </p>
        <h1 className="mt-3 text-4xl font-black text-[#17324d]">
          Không tìm thấy thông tin dân tộc
        </h1>
        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-full bg-[#17324d] px-6 py-3 font-semibold text-[#eef4ef] transition-colors hover:bg-[#9b2636]"
        >
          Quay về trang chủ
        </Link>
      </main>
    );
  }

  const heroImage = allImages[currentImageIndex] || group.thumbnail;
  const supportingImage = allImages[(currentImageIndex + 1) % allImages.length] || heroImage;
  const cultureImage = allImages[(currentImageIndex + 2) % allImages.length] || heroImage;
  const identityImage = allImages[(currentImageIndex + 3) % allImages.length] || heroImage;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <main className="min-h-screen bg-[#eef4ef] text-[#17324d]">
      <section className="relative min-h-[720px] overflow-hidden bg-[#13293d]">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,41,61,0.9)_0%,rgba(19,41,61,0.7)_42%,rgba(19,41,61,0.32)_100%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,41,61,0.38)_0%,rgba(19,41,61,0.08)_42%,rgba(238,244,239,0.9)_100%)]"></div>

        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl flex-col px-6 py-6 md:px-10 lg:px-12">
          <nav className="flex items-center gap-3 text-sm font-semibold text-[#eef4ef]/78">
            <Link to="/" className="transition-colors hover:text-[#d8aa45]">
              Trang chủ
            </Link>
            <span className="text-[#d8aa45]">/</span>
            <span className="text-[#eef4ef]">{group.name}</span>
          </nav>

          <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#d8aa45]">
                54 dân tộc Việt Nam
              </p>
              <h1 className="mt-5 text-6xl font-black uppercase leading-none text-[#eef4ef] drop-shadow-[0_10px_28px_rgba(0,0,0,0.28)] md:text-8xl">
                {group.name}
              </h1>
              {group.otherNames && group.otherNames.length > 0 && (
                <p className="mt-5 text-lg font-medium text-[#eef4ef]/82 md:text-xl">
                  Tên gọi khác: {group.otherNames.join(', ')}
                </p>
              )}
              <p className="mt-8 max-w-xl text-lg leading-8 text-[#eef4ef]/86">
                {group.description}
              </p>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-[0_28px_70px_rgba(0,0,0,0.35)]">
                <img
                  src={heroImage}
                  alt={`Hình ảnh dân tộc ${group.name}`}
                  className="h-[420px] w-full object-cover md:h-[520px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13293d]/72 via-transparent to-transparent"></div>

                {allImages.length > 1 && (
                  <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
                    <button
                      type="button"
                      onClick={prevImage}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#eef4ef]/45 bg-[#13293d]/70 text-3xl leading-none text-[#eef4ef] transition-colors hover:bg-[#9b2636] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d8aa45]/70"
                      aria-label="Xem ảnh trước"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#eef4ef]/45 bg-[#13293d]/70 text-3xl leading-none text-[#eef4ef] transition-colors hover:bg-[#9b2636] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d8aa45]/70"
                      aria-label="Xem ảnh tiếp theo"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>

              {allImages.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {allImages.slice(0, 4).map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-20 overflow-hidden rounded-lg border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-[#d8aa45] opacity-100'
                          : 'border-[#eef4ef]/35 opacity-[0.72] hover:opacity-100'
                      }`}
                      aria-label={`Xem ảnh ${index + 1}`}
                    >
                      <img src={image} alt="" className="h-full w-full object-cover" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-20 px-6 md:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            ['Dân số', `${group.population.toLocaleString('vi-VN')} người`],
            ['Khu vực sinh sống', group.regions.join(', ')],
            ['Ngôn ngữ', group.language],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-[#d8aa45]/24 bg-[#17324d] p-5 text-[#eef4ef] shadow-[0_18px_45px_rgba(19,41,61,0.2)]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d8aa45]">{label}</p>
              <p className="mt-3 text-lg font-semibold leading-7">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-xl shadow-[0_18px_48px_rgba(19,41,61,0.16)]">
            <img src={supportingImage} alt="" className="h-full min-h-[420px] w-full object-cover" aria-hidden="true" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9b2636]">
              {sectionTitles.overview}
            </p>
            <h2 className="mt-3 text-4xl font-black text-[#17324d] md:text-5xl">
              Câu chuyện hình thành và phát triển
            </h2>
            <div className="mt-5 h-1 w-28 bg-[#d8aa45]"></div>
            <p className="mt-8 text-lg leading-8 text-[#17324d]/78">{group.history}</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#13293d] px-6 py-16 text-[#eef4ef] md:px-10 lg:px-12">
        <img src={identityImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.18]" aria-hidden="true" />
        <div className="absolute inset-0 bg-[#13293d]/88"></div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8aa45]">Bản sắc</p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">Đặc điểm nhận dạng</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#eef4ef]/72">
              Những nét tính cách, giá trị cộng đồng và dấu ấn văn hóa thường được nhắc đến khi nói về dân tộc {group.name}.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {group.characteristics.map((char, index) => (
              <div
                key={char}
                className="rounded-lg border border-[#eef4ef]/12 bg-[#eef4ef]/8 p-5 backdrop-blur-sm"
              >
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#d8aa45]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 text-lg font-semibold leading-7">{char}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9b2636]">
                {sectionTitles.culture}
              </p>
              <h2 className="mt-3 text-4xl font-black text-[#17324d] md:text-5xl">
                Đời sống văn hóa
              </h2>
            </div>
            <p className="text-lg leading-8 text-[#17324d]/72">
              Các nhóm thông tin được đặt cạnh hình ảnh để phần chi tiết dễ quét hơn, đồng thời vẫn giữ cảm giác giàu chất liệu văn hóa.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              ['Lễ hội', group.culture.festivals],
              ['Phong tục tập quán', group.culture.customs],
              ['Ẩm thực', group.culture.cuisine],
            ].map(([title, items], index) => (
              <article key={title as string} className="overflow-hidden rounded-lg bg-white shadow-[0_16px_42px_rgba(19,41,61,0.12)]">
                <img
                  src={allImages[(index + 1) % allImages.length] || cultureImage}
                  alt=""
                  className="h-44 w-full object-cover"
                  aria-hidden="true"
                />
                <div className="p-5">
                  <h3 className="text-2xl font-black text-[#17324d]">{title as string}</h3>
                  <ul className="mt-4 space-y-3 text-[#17324d]/74">
                    {(items as string[]).map((item) => (
                      <li key={item} className="border-l-2 border-[#d8aa45] pl-3 leading-7">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <article className="grid overflow-hidden rounded-lg bg-white shadow-[0_16px_42px_rgba(19,41,61,0.12)] md:grid-cols-[0.9fr_1.1fr]">
              <img src={cultureImage} alt="" className="h-full min-h-[260px] w-full object-cover" aria-hidden="true" />
              <div className="p-6">
                <h3 className="text-2xl font-black text-[#17324d]">Trang phục truyền thống</h3>
                <p className="mt-4 leading-8 text-[#17324d]/74">{group.culture.clothing}</p>
              </div>
            </article>

            <article className="grid overflow-hidden rounded-lg bg-white shadow-[0_16px_42px_rgba(19,41,61,0.12)] md:grid-cols-[0.9fr_1.1fr]">
              <img src={supportingImage} alt="" className="h-full min-h-[260px] w-full object-cover" aria-hidden="true" />
              <div className="p-6">
                <h3 className="text-2xl font-black text-[#17324d]">Nhà ở</h3>
                <p className="mt-4 leading-8 text-[#17324d]/74">{group.culture.housing}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {((group.music && group.music.length > 0) || (group.videos && group.videos.length > 0)) && (
        <section className="bg-[#17324d] px-6 py-16 text-[#eef4ef] md:px-10 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8aa45]">
              {sectionTitles.media}
            </p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">Âm nhạc và video</h2>

            {group.music && group.music.length > 0 && (
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {group.music.map((music) => (
                  <article key={music.title} className="rounded-lg border border-[#eef4ef]/12 bg-[#eef4ef]/8 p-5">
                    <h3 className="text-2xl font-black">{music.title}</h3>
                    <p className="mt-3 text-[#eef4ef]/72">{music.description}</p>
                    <audio controls className="mt-5 w-full">
                      <source src={music.url} type="audio/mpeg" />
                      Trình duyệt của bạn không hỗ trợ phát âm thanh.
                    </audio>
                  </article>
                ))}
              </div>
            )}

            {group.videos && group.videos.length > 0 && (
              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                {group.videos.map((video) => (
                  <article key={video.title} className="overflow-hidden rounded-lg bg-[#eef4ef] text-[#17324d]">
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
                      <h3 className="text-2xl font-black">{video.title}</h3>
                      <p className="mt-2 text-[#17324d]/72">{video.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="px-6 py-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/"
            className="inline-flex items-center rounded-full bg-[#17324d] px-6 py-3 font-semibold text-[#eef4ef] shadow-[0_12px_30px_rgba(19,41,61,0.18)] transition-colors hover:bg-[#9b2636] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d8aa45]/70"
          >
            Quay về trang chủ
          </Link>
        </div>
      </section>
    </main>
  );
};

export default DetailPage;
