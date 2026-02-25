import { useState } from 'react';
import type { Product } from '../../../../types/product';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface PopularProductsProps {
    products: Product[];
    count?: number;
}

export default function PopularProducts({ products, count = 5 }: PopularProductsProps) {
    const displayProducts = products.slice(0, count);
    const [index, setIndex] = useState(0);

    const handlePrev = () => setIndex(i => (i - 1 + displayProducts.length) % displayProducts.length);
    const handleNext = () => setIndex(i => (i + 1) % displayProducts.length);

    const current = displayProducts[index];

    return (
        <section
            aria-label="인기 상품"
            className="relative w-full h-80 rounded-2xl overflow-hidden mb-8"
        >
            {/* 배경 이미지 */}
            <img
                src={current.image}
                alt={current.product_name}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* 하단 그라디언트 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* 상품 정보 */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                    {current.category}
                </span>
                <h2 className="mt-2 text-xl font-bold line-clamp-1">{current.product_name}</h2>
                <div className="flex items-center justify-between mt-1">
                    <p className="text-lg font-semibold">{current.price.toLocaleString()}원</p>
                    <span className="text-sm text-white/70">{index + 1} / {displayProducts.length}</span>
                </div>
            </div>

            {/* 이전 버튼 */}
            <button
                aria-label="이전 슬라이드"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/30 backdrop-blur-sm      
    rounded-full text-white hover:bg-white/50 transition-colors cursor-pointer"
            >
                <IoChevronBack />
            </button>

            {/* 다음 버튼 */}
            <button
                aria-label="다음 슬라이드"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/30 backdrop-blur-sm     
    rounded-full text-white hover:bg-white/50 transition-colors cursor-pointer"
            >
                <IoChevronForward />
            </button>
        </section>
    );
}