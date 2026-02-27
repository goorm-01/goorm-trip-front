import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import CartFloatingButton from './CartFloatingButton';
import { useGetCartItems } from '../../hooks/api/useCartApi';

vi.mock('../../hooks/api/useCartApi', () => ({
  useGetCartItems: vi.fn(),
}));

test('장바구니 버튼이 렌더링된다', () => {
  vi.mocked(useGetCartItems).mockReturnValue({
    data: { data: [] },
    isLoading: false,
  } as unknown as ReturnType<typeof useGetCartItems>);

  render(<CartFloatingButton onClick={() => {}} />);
  expect(
    screen.getByRole('button', { name: '장바구니 열기' }),
  ).toBeInTheDocument();
});

test('아이템이 있을 때 뱃지에 총 수량이 표시된다', () => {
  vi.mocked(useGetCartItems).mockReturnValue({
    data: {
      data: [
        {
          cart_id: 1,
          product_name: '제주도 여행',
          price: 890000,
          quantity: 2,
          total_price: 1780000,
          image: '',
          category: '자연관광',
          departure_date: '2026-03-01',
        },
        {
          cart_id: 2,
          product_name: '부산 여행',
          price: 230000,
          quantity: 1,
          total_price: 230000,
          image: '',
          category: '도시여행',
          departure_date: '2026-03-05',
        },
      ],
    },
    isLoading: false,
  } as unknown as ReturnType<typeof useGetCartItems>);

  render(<CartFloatingButton onClick={() => {}} />);
  // quantity 합산: 2 + 1 = 3
  expect(screen.getByTestId('cart-badge')).toHaveTextContent('3');
});

test('아이템이 없을 때 뱃지가 표시되지 않는다', () => {
  vi.mocked(useGetCartItems).mockReturnValue({
    data: { data: [] },
    isLoading: false,
  } as unknown as ReturnType<typeof useGetCartItems>);

  render(<CartFloatingButton onClick={() => {}} />);
  expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument();
});

test('클릭 시 onClick이 호출된다', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  vi.mocked(useGetCartItems).mockReturnValue({
    data: { data: [] },
    isLoading: false,
  } as unknown as ReturnType<typeof useGetCartItems>);

  render(<CartFloatingButton onClick={handleClick} />);
  await user.click(screen.getByRole('button', { name: '장바구니 열기' }));
  expect(handleClick).toHaveBeenCalled();
});
