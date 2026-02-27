import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Cart from './Cart';
import { useGetCartItems, useDeleteCartItem } from '../../hooks/api/useCartApi';
import type { CartItem } from '../../types/api';

vi.mock('../../hooks/api/useCartApi');

const SAMPLE_ITEMS: CartItem[] = [
  {
    cart_id: 1,
    product_name: '제주도 3박 4일 여행',
    price: 890000,
    quantity: 2,
    total_price: 1780000,
    image: 'https://placehold.co/400x300',
    category: '자연관광',
    departure_date: '2026-03-01',
  },
  {
    cart_id: 2,
    product_name: '부산 당일치기',
    price: 230000,
    quantity: 1,
    total_price: 230000,
    image: 'https://placehold.co/400x300',
    category: '도시여행',
    departure_date: '2026-03-05',
  },
];

const mockDeleteMutate = vi.fn();

beforeEach(() => {
  vi.mocked(useDeleteCartItem).mockReturnValue({
    mutate: mockDeleteMutate,
  } as unknown as ReturnType<typeof useDeleteCartItem>);
});

test('isOpen이 false이면 패널이 화면 밖으로 이동한다', () => {
  vi.mocked(useGetCartItems).mockReturnValue({
    data: { data: [] },
    isLoading: false,
  } as unknown as ReturnType<typeof useGetCartItems>);

  render(<Cart isOpen={false} onClose={() => {}} />);
  const panel = screen.getByTestId('cart-panel');
  expect(panel.className).toContain('translate-x-full');
});

test('"장바구니" 헤더가 렌더링된다', () => {
  vi.mocked(useGetCartItems).mockReturnValue({
    data: { data: [] },
    isLoading: false,
  } as unknown as ReturnType<typeof useGetCartItems>);

  render(<Cart isOpen={true} onClose={() => {}} />);
  expect(screen.getByText('장바구니')).toBeInTheDocument();
});

test('로딩 중일 때 로딩 메시지를 표시한다', () => {
  vi.mocked(useGetCartItems).mockReturnValue({
    data: undefined,
    isLoading: true,
  } as unknown as ReturnType<typeof useGetCartItems>);

  render(<Cart isOpen={true} onClose={() => {}} />);
  expect(screen.getByText('불러오는 중...')).toBeInTheDocument();
});

test('아이템 목록이 렌더링된다', () => {
  vi.mocked(useGetCartItems).mockReturnValue({
    data: { data: SAMPLE_ITEMS },
    isLoading: false,
  } as unknown as ReturnType<typeof useGetCartItems>);

  render(<Cart isOpen={true} onClose={() => {}} />);
  expect(screen.getByText('제주도 3박 4일 여행')).toBeInTheDocument();
  expect(screen.getByText('부산 당일치기')).toBeInTheDocument();
});

test('비어있을 때 빈 상태 메시지를 표시한다', () => {
  vi.mocked(useGetCartItems).mockReturnValue({
    data: { data: [] },
    isLoading: false,
  } as unknown as ReturnType<typeof useGetCartItems>);

  render(<Cart isOpen={true} onClose={() => {}} />);
  expect(screen.getByText('장바구니가 비어있습니다')).toBeInTheDocument();
});

test('총 가격이 렌더링된다', () => {
  vi.mocked(useGetCartItems).mockReturnValue({
    data: { data: SAMPLE_ITEMS },
    isLoading: false,
  } as unknown as ReturnType<typeof useGetCartItems>);

  render(<Cart isOpen={true} onClose={() => {}} />);
  // 1,780,000 + 230,000 = 2,010,000
  expect(screen.getByText('2,010,000원')).toBeInTheDocument();
});

test('닫기 버튼 클릭 시 onClose를 호출한다', async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();
  vi.mocked(useGetCartItems).mockReturnValue({
    data: { data: [] },
    isLoading: false,
  } as unknown as ReturnType<typeof useGetCartItems>);

  render(<Cart isOpen={true} onClose={onClose} />);
  await user.click(screen.getByRole('button', { name: '장바구니 닫기' }));
  expect(onClose).toHaveBeenCalled();
});

test('오버레이 클릭 시 onClose를 호출한다', async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();
  vi.mocked(useGetCartItems).mockReturnValue({
    data: { data: [] },
    isLoading: false,
  } as unknown as ReturnType<typeof useGetCartItems>);

  render(<Cart isOpen={true} onClose={onClose} />);
  await user.click(screen.getByTestId('cart-overlay'));
  expect(onClose).toHaveBeenCalled();
});

test('결제하기 버튼이 렌더링된다', () => {
  vi.mocked(useGetCartItems).mockReturnValue({
    data: { data: SAMPLE_ITEMS },
    isLoading: false,
  } as unknown as ReturnType<typeof useGetCartItems>);

  render(<Cart isOpen={true} onClose={() => {}} />);
  expect(screen.getByRole('button', { name: '결제하기' })).toBeInTheDocument();
});

test('CartItem 삭제 버튼 클릭 시 mutate가 cart_id와 함께 호출된다', async () => {
  const user = userEvent.setup();
  vi.mocked(useGetCartItems).mockReturnValue({
    data: { data: SAMPLE_ITEMS },
    isLoading: false,
  } as unknown as ReturnType<typeof useGetCartItems>);

  render(<Cart isOpen={true} onClose={() => {}} />);
  const deleteButtons = screen.getAllByRole('button', { name: '삭제' });
  await user.click(deleteButtons[0]);
  expect(mockDeleteMutate).toHaveBeenCalledWith(1);
});
