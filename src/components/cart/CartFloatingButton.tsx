import { useGetCartItems } from '../../hooks/api/useCartApi';
import { AiOutlineShopping } from 'react-icons/ai';

interface CartFloatingButtonProps {
  onClick: () => void;
}

export default function CartFloatingButton({
  onClick,
}: CartFloatingButtonProps) {
  const { data } = useGetCartItems();
  const items = data?.data ?? [];
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className='fixed bottom-6 right-6 z-30'>
      <button
        type='button'
        aria-label='장바구니 열기'
        onClick={onClick}
        className='relative w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white        
rounded-full shadow-lg transition-colors flex items-center justify-center'
      >
        {/* 장바구니 아이콘 */}
        <AiOutlineShopping style={{ width: '24px', height: '24px' }} />

        {/* 수량 뱃지 */}
        {totalItems > 0 && (
          <span
            data-testid='cart-badge'
            className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs 
font-bold rounded-full flex items-center justify-center'
          >
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
}
