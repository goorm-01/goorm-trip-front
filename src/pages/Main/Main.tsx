import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FilterTabs from './components/FilterTabs/FilterTabs';
import type { FilterCategory } from './components/FilterTabs/FilterTabs';
import PopularProducts from './components/PopularProducts/PopularProducts';
import ProductList from './components/ProductList/ProductList';
import SearchBar from './components/SearchBar/SearchBar';
import CalendarModal from '../../components/common/CalendarModal/CalendarModal';
import { useAddToCart } from '../../hooks/api/useCartApi';
import { useCreateOrderPreview } from '../../hooks/api/useOrderApi';
import { useGetAllProducts } from '../../hooks/api/useProductApi';
import { COLORS } from '../../styles/Colors';
import type { Product } from '../../types/product';

export default function Main() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<FilterCategory>('전체');
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<{
    product: Product;
    quantity: number;
    type: 'cart' | 'reserve';
  } | null>(null);

  const { data, isLoading } = useGetAllProducts();
  const products: Product[] = data?.data ?? [];

  const { mutate: addToCart } = useAddToCart();
  const { mutate: createOrderPreview } = useCreateOrderPreview();

  const handleAddToCart = (product: Product, quantity: number) => {
    setPendingItem({ product, quantity, type: 'cart' });
    setDateModalOpen(true);
  };

  const handleReserve = (product: Product, quantity: number) => {
    setPendingItem({ product, quantity, type: 'reserve' });
    setDateModalOpen(true);
  };

  const handleDateConfirm = (date: string) => {
    if (!pendingItem) return;

    if (pendingItem.type === 'cart') {
      addToCart(
        {
          product_id: pendingItem.product.product_id,
          quantity: pendingItem.quantity,
          departure_date: date,
        },
        {
          onSuccess: (res) => console.log('장바구니 추가 성공', res),
          onError: (err) => console.error('장바구니 추가 실패', err),
        },
      );
    } else {
      createOrderPreview(
        {
          products: [
            {
              product_id: pendingItem.product.product_id,
              quantity: pendingItem.quantity,
              departure_date: date,
            },
          ],
        },
        {
          onSuccess: () => {
            navigate('/payment');
          },
        },
      );
    }

    setDateModalOpen(false);
    setPendingItem(null);
  };

  return (
    <div
      className='min-h-screen'
      style={{ backgroundColor: COLORS.BG_PRIMARY }}
    >
      <header
        className='shadow-sm'
        style={{ backgroundColor: COLORS.BG_PRIMARY }}
      >
        <div className='px-4 py-6 mx-auto max-w-7xl'>
          <div className='flex gap-2'>
            <div className='text-3xl'>☁️</div>
            <h1 className='mb-4 text-2xl font-bold'>GoormTrip</h1>
          </div>
          <SearchBar value={search} onSearch={setSearch} />
          <div className='mt-4'>
            <FilterTabs selected={category} onSelect={setCategory} />
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4 py-8'>
        {isLoading ? (
          <p className='text-center py-20' style={{ color: COLORS.TEXT_SUB }}>
            상품을 불러오는 중...
          </p>
        ) : (
          <>
            <PopularProducts
              products={products}
              count={5}
              onAddToCart={handleAddToCart}
              onReserve={handleReserve}
            />
            <ProductList
              products={products}
              category={category}
              search={search}
              onAddToCart={handleAddToCart}
              onReserve={handleReserve}
            />
          </>
        )}
      </main>

      <CalendarModal
        isOpen={dateModalOpen}
        onConfirm={handleDateConfirm}
        onClose={() => {
          setDateModalOpen(false);
          setPendingItem(null);
        }}
      />
    </div>
  );
}
