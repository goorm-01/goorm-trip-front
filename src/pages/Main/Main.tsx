import React from 'react';
import { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import FilterTabs from './components/FilterTabs/FilterTabs';
import type { FilterCategory } from './components/FilterTabs/FilterTabs';
import ProductList from './components/ProductList/ProductList';
import PopularProducts from './components/PopularProducts/PopularProducts';
import { COLORS } from '../../styles/Colors';

import { MOCK_PRODUCTS } from '../../api/mockData';
import type { Product } from '../../types/product';
import CalendarModal from '../../components/common/CalendarModal/CalendarModal';

export default function Main() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<FilterCategory>('전체');
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<{
    product: Product;
    quantity: number;
    type: 'cart' | 'reserve';
  } | null>(null);

  const handleDateConfirm = (date: string) => {
    if (!pendingItem) return;

    console.log({
      product_id: pendingItem.product.product_id,
      quantity: pendingItem.quantity,
      departure_date: date,
      type: pendingItem.type,
    });

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

      <main className='px-4 py-8 mx-auto max-w-7xl'>
        <PopularProducts
          products={MOCK_PRODUCTS}
          count={5}
          onAddToCart={(product, quantity) => {
            setPendingItem({ product, quantity, type: 'cart' });
            setDateModalOpen(true);
          }}
          onReserve={(product, quantity) => {
            setPendingItem({ product, quantity, type: 'reserve' });
            setDateModalOpen(true);
          }}
        />
        <ProductList
          products={MOCK_PRODUCTS}
          category={category}
          search={search}
          onAddToCart={(product, quantity) => {
            setPendingItem({ product, quantity, type: 'cart' });
            setDateModalOpen(true);
          }}
          onReserve={(product, quantity) => {
            setPendingItem({ product, quantity, type: 'reserve' });
            setDateModalOpen(true);
          }}
        />
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
