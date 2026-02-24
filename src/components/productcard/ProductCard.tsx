import { useState } from 'react';
import type { Product } from '../../types/product';
import QuantityControl from '../quantitycontrol/QuantityControl';
import { COLORS } from '../../styles/Colors';
import { AiOutlineShopping } from "react-icons/ai";

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product, quantity: number) => void;
    onReserve: (product: Product, quantity: number) => void;
}

export default function ProductCard({ product, onAddToCart, onReserve }: ProductCardProps) {
    const [quantity, setQuantity] = useState(1);
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            style={{ backgroundColor: COLORS.BG_PRIMARY }}
        >
            {/* 상단: 이미지(좌) + 상품정보(우) */}
            <div className="flex flex-1">
                <div
                    className="w-36 h-36 shrink-0 m-5 rounded-lg overflow-hidden"
                    style={{ backgroundColor: COLORS.DESCRIPTION_BG }}
                >
                    <img src={product.image} alt={product.product_name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 py-5 pr-5 flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold text-base line-clamp-1">{product.product_name}</h3>
                        <span
                            className="text-sm"
                            style={{ color: COLORS.TEXT_SUB }}
                        >
                            {product.category}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold whitespace-nowrap" style={{ color: COLORS.BUTTON_MAIN }}>{product.price.toLocaleString()}원</span>
                        <QuantityControl quantity={quantity} onChange={setQuantity} />
                    </div>
                </div>
            </div>
            {/* 하단: 장바구니 + 예약하기 */}
            <div className="flex items-center gap-3 px-5 pb-5 pt-3 border-t border-gray-100">
                <button
                    type="button"
                    aria-label="장바구니에 추가"
                    onClick={() => onAddToCart(product, quantity)}
                    className="p-2 border rounded-lg transition-colors"
                    style={{ borderColor: hovered ? COLORS.CART : COLORS.INFO_BOX, color: hovered ? COLORS.BUTTON_MAIN : COLORS.TEXT_SUB }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <AiOutlineShopping style={{ width: '24px', height: '24px' }} />
                </button>
                <button
                    type="button"
                    onClick={() => onReserve(product, quantity)}
                    className="flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                    예약하기
                </button>
            </div>
        </div>
    );
}
