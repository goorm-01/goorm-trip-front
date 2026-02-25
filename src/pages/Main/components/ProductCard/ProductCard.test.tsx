import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard';
import type { Product } from '../../../../types/product';

const SAMPLE_PRODUCT: Product = {
  product_id: 1,
  product_name: '제주도 3박 4일 여행',
  category: '자연관광',
  price: 890000,
  image: 'https://placehold.co/400x300?text=제주3박4일',
};

test('상품 이미지가 렌더링된다', () => {
  render(
    <ProductCard
      product={SAMPLE_PRODUCT}
      onAddToCart={() => {}}
      onReserve={() => {}}
    />,
  );
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', SAMPLE_PRODUCT.image);
  expect(img).toHaveAttribute('alt', SAMPLE_PRODUCT.product_name);
});

test('상품명이 렌더링된다', () => {
  render(
    <ProductCard
      product={SAMPLE_PRODUCT}
      onAddToCart={() => {}}
      onReserve={() => {}}
    />,
  );
  expect(screen.getByText('제주도 3박 4일 여행')).toBeInTheDocument();
});

test('카테고리가 렌더링된다', () => {
  render(
    <ProductCard
      product={SAMPLE_PRODUCT}
      onAddToCart={() => {}}
      onReserve={() => {}}
    />,
  );
  expect(screen.getByText('자연관광')).toBeInTheDocument();
});

test('가격이 원화로 렌더링된다', () => {
  render(
    <ProductCard
      product={SAMPLE_PRODUCT}
      onAddToCart={() => {}}
      onReserve={() => {}}
    />,
  );
  expect(screen.getByText('890,000원')).toBeInTheDocument();
});

test('장바구니에 담기 버튼이 렌더링된다', () => {
  render(
    <ProductCard
      product={SAMPLE_PRODUCT}
      onAddToCart={() => {}}
      onReserve={() => {}}
    />,
  );
  expect(
    screen.getByRole('button', { name: '장바구니에 추가' }),
  ).toBeInTheDocument();
});

test('장바구니에 담기 클릭 시 onAddToCart가 호출된다', async () => {
  const handleAddToCart = vi.fn();
  const user = userEvent.setup();
  render(
    <ProductCard
      product={SAMPLE_PRODUCT}
      onAddToCart={handleAddToCart}
      onReserve={() => {}}
    />,
  );

  await user.click(screen.getByRole('button', { name: '장바구니에 추가' }));
  expect(handleAddToCart).toHaveBeenCalledWith(SAMPLE_PRODUCT, 1);
});

test('예약하기 버튼이 렌더링된다', () => {
  render(
    <ProductCard
      product={SAMPLE_PRODUCT}
      onAddToCart={() => {}}
      onReserve={() => {}}
    />,
  );
  expect(screen.getByRole('button', { name: '예약하기' })).toBeInTheDocument();
});

test('예약하기 버튼 클릭 시 onReserve가 호출된다', async () => {
  const handleReserve = vi.fn();
  const user = userEvent.setup();
  render(
    <ProductCard
      product={SAMPLE_PRODUCT}
      onAddToCart={() => {}}
      onReserve={handleReserve}
    />,
  );

  await user.click(screen.getByRole('button', { name: '예약하기' }));
  expect(handleReserve).toHaveBeenCalledWith(SAMPLE_PRODUCT, 1);
});

test('수량 변경 후 장바구니 담기 클릭 시 변경된 수량으로 호출된다', async () => {
  const handleAddToCart = vi.fn();
  const user = userEvent.setup();
  render(
    <ProductCard
      product={SAMPLE_PRODUCT}
      onAddToCart={handleAddToCart}
      onReserve={() => {}}
    />,
  );

  await user.click(screen.getByRole('button', { name: '수량 증가' }));
  await user.click(screen.getByRole('button', { name: '장바구니에 추가' }));
  expect(handleAddToCart).toHaveBeenCalledWith(SAMPLE_PRODUCT, 2);
});

test('수량 변경 후 예약하기 클릭 시 변경된 수량으로 호출된다', async () => {
  const handleReserve = vi.fn();
  const user = userEvent.setup();
  render(
    <ProductCard
      product={SAMPLE_PRODUCT}
      onAddToCart={() => {}}
      onReserve={handleReserve}
    />,
  );

  await user.click(screen.getByRole('button', { name: '수량 증가' }));
  await user.click(screen.getByRole('button', { name: '예약하기' }));
  expect(handleReserve).toHaveBeenCalledWith(SAMPLE_PRODUCT, 2);
});
