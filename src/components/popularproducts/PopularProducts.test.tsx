import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PopularProducts from './PopularProducts';
import type { Product } from '../../types/product';

const SAMPLE_PRODUCTS: Product[] = [
    {
        product_id: 1, product_name: '제주도 3박 4일 여행', category: '자연관광', price: 890000, image:
            'https://placehold.co/400x300?text=제주'
    },
    {
        product_id: 2, product_name: '부산 당일치기', category: '도시여행', price: 230000, image:
            'https://placehold.co/400x300?text=부산'
    },
    {
        product_id: 3, product_name: '강릉 3박 4일 여행', category: '도시여행', price: 660000, image:
            'https://placehold.co/400x300?text=강릉'
    },
];

test('슬라이더가 렌더링된다', () => {
    render(<PopularProducts products={SAMPLE_PRODUCTS} />);
    expect(screen.getByRole('region', { name: '인기 상품' })).toBeInTheDocument();
});

test('첫 번째 상품이 표시된다', () => {
    render(<PopularProducts products={SAMPLE_PRODUCTS} />);
    expect(screen.getByText('제주도 3박 4일 여행')).toBeInTheDocument();
});

test('다음 버튼 클릭 시 다음 상품으로 이동한다', async () => {
    const user = userEvent.setup();
    render(<PopularProducts products={SAMPLE_PRODUCTS} />);

    await user.click(screen.getByRole('button', { name: '다음 슬라이드' }));
    expect(screen.getByText('부산 당일치기')).toBeInTheDocument();
});

test('이전 버튼 클릭 시 이전 상품으로 이동한다', async () => {
    const user = userEvent.setup();
    render(<PopularProducts products={SAMPLE_PRODUCTS} />);

    await user.click(screen.getByRole('button', { name: '다음 슬라이드' }));
    await user.click(screen.getByRole('button', { name: '이전 슬라이드' }));
    expect(screen.getByText('제주도 3박 4일 여행')).toBeInTheDocument();
});

test('마지막 슬라이드에서 다음 클릭 시 첫 번째로 돌아간다', async () => {
    const user = userEvent.setup();
    render(<PopularProducts products={SAMPLE_PRODUCTS} />);

    await user.click(screen.getByRole('button', { name: '다음 슬라이드' }));
    await user.click(screen.getByRole('button', { name: '다음 슬라이드' }));
    await user.click(screen.getByRole('button', { name: '다음 슬라이드' }));
    expect(screen.getByText('제주도 3박 4일 여행')).toBeInTheDocument();
});

test('첫 번째 슬라이드에서 이전 클릭 시 마지막으로 돌아간다', async () => {
    const user = userEvent.setup();
    render(<PopularProducts products={SAMPLE_PRODUCTS} />);

    await user.click(screen.getByRole('button', { name: '이전 슬라이드' }));
    expect(screen.getByText('강릉 3박 4일 여행')).toBeInTheDocument();
});

test('현재 슬라이드 인디케이터가 표시된다', () => {
    render(<PopularProducts products={SAMPLE_PRODUCTS} />);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
});