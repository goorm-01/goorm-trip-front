import { Routes, Route } from 'react-router-dom';
import { COLORS } from './styles/Colors';
import Main from './pages/Main/Main';
import Product from './pages/Product/Product.js';
import useKakaoLoader from './hooks/useKakaoLoader';

export default function App() {
  useKakaoLoader();

  return (
    <div
      style={{
        backgroundColor: COLORS.BG_PRIMARY,
        color: COLORS.TEXT_PRIMARY,
      }}
    >
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/product/:productId' element={<Product />} />
      </Routes>
    </div>
  );
}
