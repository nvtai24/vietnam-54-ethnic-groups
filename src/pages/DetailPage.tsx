import { useMemo, useState, type SyntheticEvent } from "react";
import { Link, useParams } from "react-router-dom";
import ethnicGroupsData from "../data/ethnicGroups.json";
import type { EthnicGroupsData } from "../types/EthnicGroup";

const data = ethnicGroupsData as EthnicGroupsData;

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const groups = data.groups;
  const detailPage = data.detailPage;
  const group = groups.find((item) => item.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredLifeImage, setHoveredLifeImage] = useState<{
    image: string;
    section: string;
  } | null>(null);

  const detailImages = useMemo(() => {
    if (!group) {
      return [];
    }

    return Array.from(new Set(group.images.filter(Boolean)));
  }, [group]);

  if (!group) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f8f4ec] p-8 text-center text-[#15110f]">
        <div className="paper-grain absolute inset-0"></div>
        <div className="relative z-10 max-w-xl border-2 border-[#b0160b] bg-[#f8f4ec] p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">
            {detailPage.notFound.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-black uppercase leading-none text-[#b0160b]">
            {detailPage.notFound.title}
          </h1>
          <Link
            to="/"
            className="mt-8 inline-flex border-2 border-[#b0160b] bg-[#b0160b] px-6 py-3 text-xs font-black uppercase tracking-[0.13em] text-[#f8f4ec] transition hover:bg-transparent hover:text-[#b0160b]"
          >
            {detailPage.notFound.backLabel}
          </Link>
        </div>
      </main>
    );
  }

  const fallbackImage =
    detailImages[0] ||
    group.history.imageUrls[0] ||
    group.culture.clothingImage ||
    group.thumbnail;
  const heroImage = detailImages[currentImageIndex] || fallbackImage;
  const historyImageUrls = group.history.imageUrls;
  const clothingImage = group.culture.clothingImage;
  const housingImage = group.culture.housingImage;
  const galleryImages = detailImages.slice(0, 6);
  const hasGallery = detailImages.length > 1;
  const videosToShow =
    group.videos && group.videos.length > 0
      ? group.videos
      : [detailPage.mediaSection.defaultVideo];

  const infoStats = [
    [
      detailPage.statLabels.population,
      `${group.population.toLocaleString("vi-VN")} ${detailPage.statLabels.populationUnit}`,
    ],
    [detailPage.statLabels.language, group.language],
    [detailPage.statLabels.regions, group.regions.join(", ")],
  ];

  const cultureSections = [
    [detailPage.materialCultureSection.clothingTitle, group.culture.clothing],
    [detailPage.materialCultureSection.housingTitle, group.culture.housing],
  ];

  const lifeSections = [
    {
      title: detailPage.lifeSection.festivalTitle,
      items: group.culture.festivals,
    },
    {
      title: detailPage.lifeSection.customTitle,
      items: group.culture.customs,
    },
    {
      title: detailPage.lifeSection.cuisineTitle,
      items: group.culture.cuisine,
    },
  ];

  const handleImageFallback = (event: SyntheticEvent<HTMLImageElement>) => {
    if (fallbackImage && event.currentTarget.src !== fallbackImage) {
      event.currentTarget.src = fallbackImage;
      return;
    }

    event.currentTarget.style.opacity = "0";
  };

  const nextImage = () => {
    if (!detailImages.length) {
      return;
    }

    setCurrentImageIndex((prev) => (prev + 1) % detailImages.length);
  };

  const prevImage = () => {
    if (!detailImages.length) {
      return;
    }

    setCurrentImageIndex(
      (prev) => (prev - 1 + detailImages.length) % detailImages.length,
    );
  };

  return (
    <main className="min-h-screen bg-[#f6f2ea] text-[#15110f]">
      <section className="relative isolate overflow-hidden bg-[#f8f4ec] px-6 py-6 sm:px-10">
        <img
          src={group.thumbnail}
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-36 saturate-105 contrast-105"
          aria-hidden="true"
          onError={handleImageFallback}
        />
        <div className="absolute inset-0 bg-[#f8f4ec]/52"></div>
        <div className="paper-grain absolute inset-0"></div>
        <div className="absolute inset-x-4 top-4 bottom-4 border-2 border-[#b0160b]/80 sm:inset-x-7 sm:top-7 sm:bottom-7"></div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1360px] flex-col">
          <nav className="flex items-start justify-between gap-5 px-2 py-5 text-[0.68rem] font-black uppercase leading-none text-[#15110f]">
            <Link to="/" className="transition hover:text-[#b0160b]">
              {detailPage.navigation.homeLabel}
            </Link>
            <span className="text-[#b0160b]">
              {detailPage.navigation.collectionLabel}
            </span>
            <span className="hidden sm:inline">{group.name}</span>
          </nav>

          <div className="grid flex-1 items-center gap-8 py-7 lg:grid-cols-[minmax(0,0.86fr)_minmax(480px,1fr)] lg:gap-12">
            <div className="px-2">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">
                {detailPage.hero.eyebrow}
              </p>
              <h1 className="mt-4 text-6xl font-black uppercase leading-[0.82] text-[#b0160b] sm:text-8xl lg:text-9xl">
                {group.name}
              </h1>

              {group.otherNames && group.otherNames.length > 0 && (
                <p className="mt-5 max-w-[640px] text-sm font-black uppercase leading-tight text-[#15110f]">
                  {detailPage.hero.otherNamesLabel}:{" "}
                  {group.otherNames.join(", ")}
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
                    alt={`${detailPage.imageLabels.mainImageAltPrefix} ${group.name}`}
                    className="h-full w-full object-cover contrast-105 transition duration-500"
                    onError={handleImageFallback}
                  />
                  {hasGallery && (
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button
                        type="button"
                        onClick={prevImage}
                        className="grid h-10 w-10 place-items-center border-2 border-[#f8f4ec] bg-[#15110f]/76 text-2xl font-black leading-none text-[#f8f4ec] transition hover:bg-[#b0160b]"
                        aria-label={detailPage.imageLabels.previousImage}
                      >
                        {detailPage.imageLabels.previousImageSymbol}
                      </button>
                      <button
                        type="button"
                        onClick={nextImage}
                        className="grid h-10 w-10 place-items-center border-2 border-[#f8f4ec] bg-[#15110f]/76 text-2xl font-black leading-none text-[#f8f4ec] transition hover:bg-[#b0160b]"
                        aria-label={detailPage.imageLabels.nextImage}
                      >
                        {detailPage.imageLabels.nextImageSymbol}
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
                        aria-label={`${detailPage.imageLabels.thumbnailImagePrefix} ${index + 1}`}
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
            {detailPage.footerLabel}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f8f4ec] px-6 py-14 sm:px-10">
        <div className="paper-grain absolute inset-0"></div>
        <div className="relative z-10 mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">
              {detailPage.historySection.eyebrow}
            </p>
            <h2 className="mt-3 text-5xl font-black uppercase leading-[0.88] text-[#b0160b] sm:text-7xl">
              {detailPage.historySection.title}
            </h2>
            <p className="mt-7 max-w-[760px] text-base font-bold leading-7">
              {group.history.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
            <img
              src={historyImageUrls[0]}
              alt=""
              className="aspect-[4/5] w-full object-cover contrast-105 sm:mt-12"
              aria-hidden="true"
              onError={handleImageFallback}
            />
            <img
              src={historyImageUrls[1]}
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
              src={clothingImage}
              alt=""
              className="aspect-[4/3] w-full object-cover contrast-105"
              aria-hidden="true"
              onError={handleImageFallback}
            />
            <img
              src={housingImage}
              alt=""
              className="aspect-[4/5] w-full object-cover contrast-105 sm:mt-12"
              aria-hidden="true"
              onError={handleImageFallback}
            />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">
              {detailPage.materialCultureSection.eyebrow}
            </p>
            <h2 className="mt-3 text-5xl font-black uppercase leading-[0.88] text-[#b0160b] sm:text-7xl">
              {detailPage.materialCultureSection.title}
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

      <section className="bg-[#b0160b] px-6 py-12 text-[#f8f4ec] sm:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f8f4ec]/72">
                {detailPage.lifeSection.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight sm:text-5xl">
                {detailPage.lifeSection.title}
              </h2>
            </div>
            <p className="max-w-[760px] text-base font-bold leading-7 text-[#f8f4ec]/86">
              {detailPage.lifeSection.description}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {lifeSections.map((section) => {
              const sectionTitle = section.title;
              const activeImage =
                hoveredLifeImage?.section === sectionTitle
                  ? hoveredLifeImage.image
                  : "";

              return (
                <article
                  key={sectionTitle}
                  className="relative isolate overflow-hidden border-2 border-[#f8f4ec] bg-[#f8f4ec] text-[#15110f] transition duration-300"
                  onMouseLeave={() => setHoveredLifeImage(null)}
                  style={
                    activeImage
                      ? {
                          backgroundImage: `url("${activeImage}")`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }
                      : undefined
                  }
                >
                  {activeImage && (
                    <>
                      <div className="absolute inset-0 z-0 bg-[#15110f]/56"></div>
                      <div className="paper-grain absolute inset-0 z-0 opacity-35"></div>
                    </>
                  )}
                  <div
                    className={`relative z-10 border-b-2 px-5 py-4 transition ${
                      activeImage
                        ? "border-[#f8f4ec]/72 text-[#f8f4ec]"
                        : "border-[#b0160b]"
                    }`}
                  >
                    <h3 className="text-3xl font-black uppercase leading-none">
                      {sectionTitle}
                    </h3>
                  </div>
                  <ul
                    className={`relative z-10 p-5 text-sm font-bold leading-6 transition ${
                      activeImage ? "text-[#f8f4ec]" : ""
                    }`}
                  >
                    {section.items.map((item) => (
                      <li
                        key={item.name}
                        className={`border-b py-1 last:border-b-0 ${
                          activeImage
                            ? "border-[#f8f4ec]/28"
                            : "border-[#15110f]/18"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setHoveredLifeImage({
                              image: item.imageUrl,
                              section: sectionTitle,
                            })
                          }
                          onBlur={() => setHoveredLifeImage(null)}
                          onFocus={() =>
                            setHoveredLifeImage({
                              image: item.imageUrl,
                              section: sectionTitle,
                            })
                          }
                          onMouseEnter={() =>
                            setHoveredLifeImage({
                              image: item.imageUrl,
                              section: sectionTitle,
                            })
                          }
                          className={`block w-full px-2 py-3 text-left font-bold transition ${
                            activeImage
                              ? "hover:bg-[#f8f4ec]/14 focus-visible:bg-[#f8f4ec]/14"
                              : "hover:bg-[#b0160b] hover:text-[#f8f4ec] focus-visible:bg-[#b0160b] focus-visible:text-[#f8f4ec]"
                          } focus:outline-none`}
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f8f4ec] px-6 py-14 sm:px-10">
        <div className="paper-grain absolute inset-0"></div>
        <div className="relative z-10 mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">
              {detailPage.identitySection.eyebrow}
            </p>
            <h2 className="mt-3 text-5xl font-black uppercase leading-[0.88] text-[#b0160b] sm:text-7xl">
              {detailPage.identitySection.title}
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

      <section className="relative overflow-hidden bg-[#efe2cd] px-6 py-14 sm:px-10">
        <div className="paper-grain absolute inset-0 opacity-35"></div>
        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b0160b]">
                {detailPage.mediaSection.eyebrow}
              </p>
              <h2 className="mt-3 text-5xl font-black uppercase leading-[0.88] text-[#b0160b] sm:text-7xl">
                {detailPage.mediaSection.title}
              </h2>
            </div>
            <p className="max-w-[680px] text-base font-bold leading-7">
              {detailPage.mediaSection.description}
            </p>
          </div>

          <article className="mt-10 overflow-hidden border-2 border-[#15110f] bg-[#f8f4ec] text-[#15110f]">
            <div className="relative aspect-video overflow-hidden bg-[#15110f]">
              <iframe
                src={videosToShow[0].url}
                title={videosToShow[0].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              ></iframe>
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-black uppercase leading-tight">
                {videosToShow[0].title}
              </h3>
              <p className="mt-3 text-sm font-bold leading-6 text-[#15110f]/70">
                {videosToShow[0].description}
              </p>
            </div>
          </article>
        </div>
      </section>

      <footer className="border-t-2 border-[#b0160b] bg-[#f8f4ec] px-6 py-8 text-center sm:px-10">
        <Link
          to="/"
          className="inline-flex border-2 border-[#b0160b] bg-[#b0160b] px-6 py-3 text-xs font-black uppercase tracking-[0.13em] text-[#f8f4ec] transition hover:bg-transparent hover:text-[#b0160b]"
        >
          {detailPage.actions.backHome}
        </Link>
      </footer>
    </main>
  );
};

export default DetailPage;
