import { Link } from 'react-router-dom';
import ethnicGroupsData from '../data/ethnicGroups.json';
import type { EthnicGroup } from '../types/EthnicGroup';

const HomePage = () => {
  const groups = ethnicGroupsData.groups as EthnicGroup[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#f7f3e9]">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-primary to-primary-light text-white py-16 px-8 text-center overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
             style={{
               backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.5) 35px, rgba(255,255,255,.5) 70px)'
             }}>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg tracking-wider">
            54 Dân Tộc Việt Nam
          </h1>
          <p className="text-xl md:text-2xl opacity-95 font-light">
            Khám phá bản sắc văn hóa đa dạng của các dân tộc Việt Nam
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro Section */}
        <div className="text-center mb-12">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto italic">
            Việt Nam là quốc gia đa dân tộc với 54 dân tộc anh em cùng chung sống, 
            mỗi dân tộc đều có nét văn hóa độc đáo, góp phần tạo nên bức tranh văn hóa 
            phong phú và đa sắc màu của đất nước.
          </p>
        </div>

        {/* Ethnic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {groups.map((group) => (
            <Link 
              to={`/dan-toc/${group.id}`} 
              key={group.id} 
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary"
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={group.thumbnail} 
                  alt={group.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {group.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  Dân số: {group.population.toLocaleString('vi-VN')} người
                </p>
                <p className="text-gray-500 text-sm">
                  {group.regions.join(', ')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8 mt-16">
        <p className="opacity-90">
          © 2026 - Sản phẩm sáng tạo môn Chủ nghĩa Khoa học Xã hội
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
