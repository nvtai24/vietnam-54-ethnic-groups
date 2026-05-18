import { Link } from 'react-router-dom';
import ethnicGroupsData from '../data/ethnicGroups.json';
import type { EthnicGroup } from '../types/EthnicGroup';
import './HomePage.css';

const HomePage = () => {
  const groups = ethnicGroupsData.groups as EthnicGroup[];

  return (
    <div className="home-page">
      <header className="header">
        <div className="header-content">
          <h1 className="main-title">54 Dân Tộc Việt Nam</h1>
          <p className="subtitle">Khám phá bản sắc văn hóa đa dạng của các dân tộc Việt Nam</p>
        </div>
        <div className="header-pattern"></div>
      </header>

      <main className="main-content">
        <div className="intro-section">
          <p className="intro-text">
            Việt Nam là quốc gia đa dân tộc với 54 dân tộc anh em cùng chung sống, 
            mỗi dân tộc đều có nét văn hóa độc đáo, góp phần tạo nên bức tranh văn hóa 
            phong phú và đa sắc màu của đất nước.
          </p>
        </div>

        <div className="ethnic-grid">
          {groups.map((group) => (
            <Link 
              to={`/dan-toc/${group.id}`} 
              key={group.id} 
              className="ethnic-card"
            >
              <div className="card-image">
                <img src={group.thumbnail} alt={group.name} />
                <div className="card-overlay"></div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{group.name}</h3>
                <p className="card-population">
                  Dân số: {group.population.toLocaleString('vi-VN')} người
                </p>
                <p className="card-region">
                  {group.regions.join(', ')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 - Sản phẩm sáng tạo môn Chủ nghĩa Khoa học Xã hội</p>
      </footer>
    </div>
  );
};

export default HomePage;
