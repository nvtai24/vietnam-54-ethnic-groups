import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import DataValidator from './components/DataValidator';
import ScrollToTop from './components/ScrollToTop';
import BackgroundMusic from './components/BackgroundMusic';
import './App.css';

function App() {
  return (
    <>
      <DataValidator />
      <BackgroundMusic />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dan-toc/:id" element={<DetailPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
