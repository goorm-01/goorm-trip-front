import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { COLORS } from './styles/Colors';
import Main from './pages/Main/Main';
import Product from './pages/Product/Product';
import Payment from './pages/Payment/Payment';

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
        <Route path='/product' element={<Product />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
    </div>
  );
}
