import { Routes, Route } from 'react-router-dom';
import { COLORS } from './styles/Colors';
import Main from './pages/Main/Main';
import Product from './pages/Product/Product';
import Payment from './pages/Payment/Payment';
import useKakaoLoader from './hooks/useKakaoLoader';
import { useState } from 'react';
import Cart from './components/cart/Cart';
import CartFloatingButton from './components/cart/CartFloatingButton';

export default function App() {
  useKakaoLoader();
  const [cartOpen, setCartOpen] = useState(false);

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
        <Route path='/payment' element={<Payment />} />
      </Routes>
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <CartFloatingButton onClick={() => setCartOpen((prev) => !prev)} />
    </div>
  );
}
