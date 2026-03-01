import { useNavigate } from 'react-router-dom';

import CartItem from './CartItem';
import { useGetCartItems, useDeleteCartItem } from '../../hooks/api/useCartApi';
import { COLORS } from '../../styles/Colors';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCartItems();
  const { mutate: deleteItem } = useDeleteCartItem();

  const items = data?.data ?? [];
  const totalPrice = items.reduce((sum, item) => sum + item.total_price, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/30 z-40'
          onClick={onClose}
          data-testid='cart-overlay'
        />
      )}
      <div
        data-testid='cart-panel'
        className={`fixed right-0 top-0 h-full w-96 shadow-xl z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: COLORS.BG_PRIMARY }}
      >
        {/* 헤더 */}
        <div
          className='flex items-center justify-between p-4 border-b'
          style={{ borderColor: COLORS.INFO_BOX }}
        >
          <h2 className='text-lg font-bold'>장바구니</h2>
          <button
            type='button'
            aria-label='장바구니 닫기'
            onClick={onClose}
            className='text-2xl leading-none'
            style={{ color: COLORS.TEXT_SUB }}
          >
            &times;
          </button>
        </div>

        {/* 바디 */}
        <div className='flex-1 overflow-y-auto px-4'>
          {isLoading ? (
            <p className='text-center mt-10' style={{ color: COLORS.TEXT_SUB }}>
              불러오는 중...
            </p>
          ) : items.length === 0 ? (
            <p className='text-center mt-10' style={{ color: COLORS.TEXT_SUB }}>
              장바구니가 비어있습니다
            </p>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.cart_id}
                item={item}
                onRemove={(cartId) => deleteItem(cartId)}
              />
            ))
          )}
        </div>

        {/* 푸터 */}
        <div className='border-t p-4' style={{ borderColor: COLORS.INFO_BOX }}>
          <div className='flex items-center justify-between mb-3'>
            <span className='text-sm' style={{ color: COLORS.TEXT_SUB }}>
              {totalItems}건의 여행 상품
            </span>
            <span
              className='text-lg font-bold'
              style={{ color: COLORS.BUTTON_MAIN }}
            >
              {totalPrice.toLocaleString()}원
            </span>
          </div>
          <button
            type='button'
            aria-label='결제하기'
            onClick={() => {
              onClose();
              navigate('/payment');
            }}
            className='w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium'
          >
            결제하기
          </button>
        </div>
      </div>
    </>
  );
}
