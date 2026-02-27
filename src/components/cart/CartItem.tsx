import type { CartItem as CartItemType } from '../../types/api';
import { COLORS } from '../../styles/Colors';

interface CartItemProps {
  item: CartItemType;
  onRemove: (cartId: number) => void;
}

export default function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <div
      className='flex items-center gap-4 py-4 border-b border-gray-100'
      style={{ borderColor: COLORS.INFO_BOX }}
    >
      {/* 이미지 */}
      <div className='w-20 h-20 shrink-0 rounded-lg overflow-hidden'>
        <img
          src={item.image}
          alt={item.product_name}
          className='w-full h-full object-cover'
        />
      </div>

      {/* 정보 */}
      <div className='flex-1 flex flex-col gap-1'>
        <p className='font-semibold text-sm line-clamp-1'>
          {item.product_name}
        </p>
        <p className='text-xs' style={{ color: COLORS.TEXT_SUB }}>
          {item.category}
        </p>
        <p className='text-xs' style={{ color: COLORS.TEXT_SUB }}>
          {item.departure_date}
        </p>
        <div className='flex items-center justify-between mt-1'>
          <span className='text-xs' style={{ color: COLORS.TEXT_SUB }}>
            {item.quantity}명
          </span>
          <span
            className='text-sm font-bold'
            style={{ color: COLORS.BUTTON_MAIN }}
          >
            {item.total_price.toLocaleString()}원
          </span>
        </div>
      </div>

      {/* 삭제 버튼 */}
      <button
        type='button'
        aria-label='삭제'
        onClick={() => onRemove(item.cart_id)}
        className='text-gray-400 hover:text-red-500 transition-colors text-lg leading-none'
      >
        ×
      </button>
    </div>
  );
}
