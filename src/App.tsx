import { Routes, Route } from 'react-router-dom';
import { COLORS } from './styles/Colors';
import Main from './pages/Main.jsx';
import Product from './pages/Product/Product.js';

export default function App() {
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
      </Routes>
    </div>
  );
}
