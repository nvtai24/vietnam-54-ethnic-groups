import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import ethnicGroupsData from '../data/ethnicGroups.json';
import type { EthnicGroup } from '../types/EthnicGroup';
import './DetailPage.css';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const group = (ethnicGroupsData.groups as EthnicGroup[]).find(g => g.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!group) {
    return (
      <div className="not-found">
        <h2>Không tìm thấy thông tin dân tộc</h2>
        <Link to="/">Quay về trang chủ</Link>
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
    <div className="detail-page">
      {/* Header với breadcrumb */}
      <div className="detail-header">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span className="separator">›</span>
          <span>{group.name}</span>
        </div>
      </div>

      {/* Hero Section với ảnh carousel */}
      <section className="hero-section">
        <div className="image-carousel">
          <button className="carousel-btn prev" onClick={prevImage}>‹</button>
          <div className="carousel-image">
            <img src={allImages[currentImageIndex]} alt={group.name} />
            <div className="carousel-overlay"></div>
          </div>
          <button className="carousel-btn next" onClick={nextImage}>›</button>
          <div className="carousel-indicators">
            {allImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="hero-content">
          <h1 className="ethnic-name">{group.name}</h1>
          {group.otherNames && group.otherNames.length > 0 && (
            <p className="other-names">({group.otherNames.join(', ')})</p>
          )}
        </div>
      </section>

      {/* Thông tin cơ bản */}
      <section className="info-cards">
        <div className="info-card">
          <div className="info-icon">👥</div>
          <div className="info-content">
            <h3>Dân số</h3>
            <p>{group.population.toLocaleString('vi-VN')} người</p>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon">📍</div>
          <div className="info-content">
            <h3>Khu vực sinh sống</h3>
            <p>{group.regions.join(', ')}</p>
          </div>
        </div>
        <div className="info-card">
          <div className="info-icon">🗣️</div>
          <div className="info-content">
            <h3>Ngôn ngữ</h3>
            <p>{group.language}</p>
          </div>
        </div>
      </section>

      {/* Nội dung chi tiết */}
      <div className="detail-content">
        {/* Giới thiệu */}
        <section className="content-section">
          <h2 className="section-title">Giới thiệu</h2>
          <div className="section-content">
            <p>{group.description}</p>
          </div>
        </section>

        {/* Lịch sử */}
        <section className="content-section">
          <h2 className="section-title">Lịch sử</h2>
          <div className="section-content">
            <p>{group.history}</p>
          </div>
        </section>

        {/* Đặc điểm nhận dạng */}
        <section className="content-section">
          <h2 className="section-title">Đặc điểm nhận dạng</h2>
          <div className="characteristics-grid">
            {group.characteristics.map((char, index) => (
              <div key={index} className="characteristic-item">
                <span className="characteristic-icon">✦</span>
                <span>{char}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Văn hóa */}
        <section className="content-section culture-section">
          <h2 className="section-title">Văn hóa truyền thống</h2>
          
          <div className="culture-grid">
            {/* Lễ hội */}
            <div className="culture-item">
              <h3 className="culture-subtitle">🎊 Lễ hội</h3>
              <ul>
                {group.culture.festivals.map((festival, index) => (
                  <li key={index}>{festival}</li>
                ))}
              </ul>
            </div>

            {/* Phong tục */}
            <div className="culture-item">
              <h3 className="culture-subtitle">🎭 Phong tục tập quán</h3>
              <ul>
                {group.culture.customs.map((custom, index) => (
                  <li key={index}>{custom}</li>
                ))}
              </ul>
            </div>

            {/* Ẩm thực */}
            <div className="culture-item">
              <h3 className="culture-subtitle">🍜 Ẩm thực</h3>
              <ul>
                {group.culture.cuisine.map((food, index) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>
            </div>

            {/* Trang phục */}
            <div className="culture-item full-width">
              <h3 className="culture-subtitle">👘 Trang phục truyền thống</h3>
              <p>{group.culture.clothing}</p>
            </div>

            {/* Nhà ở */}
            <div className="culture-item full-width">
              <h3 className="culture-subtitle">🏠 Nhà ở</h3>
              <p>{group.culture.housing}</p>
            </div>
          </div>
        </section>

        {/* Âm nhạc */}
        {group.music && group.music.length > 0 && (
          <section className="content-section">
            <h2 className="section-title">🎵 Âm nhạc truyền thống</h2>
            <div className="media-grid">
              {group.music.map((music, index) => (
                <div key={index} className="media-item">
                  <h4>{music.title}</h4>
                  <p className="media-description">{music.description}</p>
                  <audio controls className="audio-player">
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
          <section className="content-section">
            <h2 className="section-title">🎬 Video giới thiệu</h2>
            <div className="media-grid">
              {group.videos.map((video, index) => (
                <div key={index} className="media-item">
                  <h4>{video.title}</h4>
                  <p className="media-description">{video.description}</p>
                  <div className="video-container">
                    <iframe
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Back to home button */}
      <div className="back-to-home">
        <Link to="/" className="btn-back">
          ← Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default DetailPage;
