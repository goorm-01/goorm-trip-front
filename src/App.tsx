import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { COLORS } from './styles/Colors';
import Main from './pages/Main.jsx';
import Product from './pages/Product/Product.js';
import TestApi from './pages/TestApi'; // 추가

export default function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

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
        <Route path='/test' element={<TestApi />} /> {/* 추가 */}
      </Routes>
    </div>
  );
}
