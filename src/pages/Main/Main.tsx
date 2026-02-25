import React from 'react';
import { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import FilterTabs from './components/FilterTabs/FilterTabs';
import type { FilterCategory } from './components/FilterTabs/FilterTabs';
import ProductList from './components/ProductList/ProductList';
import PopularProducts from './components/PopularProducts/PopularProducts';
import { COLORS } from '../../styles/Colors';

import { MOCK_PRODUCTS } from '../../api/mockData';

export default function Main() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<FilterCategory>('전체');

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: COLORS.BG_PRIMARY }}
    >
      <header
        className="shadow-sm"
        style={{ backgroundColor: COLORS.BG_PRIMARY }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">goorm-trip</h1>
          <SearchBar value={search} onSearch={setSearch} />
          <div className="mt-4">
            <FilterTabs selected={category} onSelect={setCategory} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <PopularProducts products={MOCK_PRODUCTS} count={5} />
        <ProductList
          products={MOCK_PRODUCTS}
          category={category}
          search={search}
          onAddToCart={(product, quantity) => console.log('장바구니에 담기 : ', product, quantity)}
          onReserve={(product, quantity) => console.log('예약하기:', product, quantity)}
        />
      </main>
    </div>
  );
}
