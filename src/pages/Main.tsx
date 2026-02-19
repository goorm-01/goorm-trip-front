import React from 'react';
import { useState } from 'react';
import SearchBar from '../components/searchbar/SearchBar';
import FilterTabs from '../components/filtertabs/FilterTabs';
import type { FilterCategory } from '../components/filtertabs/FilterTabs';

export default function Main() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<FilterCategory>('전체');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">goorm-trip</h1>
          <SearchBar value={search} onSearch={setSearch} />
          <div className="mt-4">
            <FilterTabs selected={category} onSelect={setCategory} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <p>검색어: {search}</p>
        <p>카테고리: {category}</p>
      </main>
    </div>
  );
}
