import ProductCard from '../productcard/ProductCard';
import type { Product } from '../../types/product';
import type { FilterCategory } from '../filtertabs/FilterTabs';

interface ProductListProps {
    products: Product[];
    category: FilterCategory;
    search: string;
    onAddToCart: (product: Product, quantity: number) => void;
    onReserve: (product: Product, quantity: number) => void;
}

export default function ProductList({ products, category, search, onAddToCart, onReserve }: ProductListProps) {
    const filtered = products
        .filter(p => category === '전체' || p.category === category)
        .filter(p => p.product_name.includes(search));

    if (filtered.length === 0) {
        return <p>상품이 없습니다.</p>;
    }

    return (
        <div className="grid grid-cols-3 gap-6">
            {filtered.map(product => (
                <ProductCard
                    key={product.product_id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onReserve={onReserve}
                />
            ))}
        </div>
    );
}