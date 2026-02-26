import { useState } from 'react';
import { COLORS } from '../../../styles/Colors';
import type { ProductDetail } from '../../../types/api';
import { useCreateOrderPreview } from '../../../hooks/api/useOrderApi';
import { useAddToCart } from '../../../hooks/api/useCartApi';
import QuantityControl from '../../../components/common/QuantityControl/QuantityControl';
import ReservationButton from './ReservationButton';
import CalendarModal from '../../../components/common/CalendarModal/CalendarModal';

interface ProductInfoProps {
  product: ProductDetail;
  product_id: number;
}

export default function ProductInfo({ product, product_id }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<{
    product: ProductDetail;
    quantity: number;
    type: 'cart' | 'reserve';
  } | null>(null);

  const addToCartMutation = useAddToCart();
  const createOrderMutation = useCreateOrderPreview();

  const handleDateConfirm = (date: string) => {
    if (!pendingItem) return;

    if (pendingItem.type === 'cart') {
      addToCartMutation.mutate(
        {
          product_id: product_id,
          quantity: pendingItem.quantity,
          departure_date: date,
        },
        {
          onSuccess: (data) => {
            console.log('장바구니 추가 성공:', data);
            // 장바구니 페이지(모달) 열기
          },
          onError: (error) => {
            console.error('장바구니 추가 실패:', error);
          },
        },
      );
    } else if (pendingItem.type === 'reserve') {
      createOrderMutation.mutate(
        {
          products: [
            {
              product_id: product_id,
              quantity: pendingItem.quantity,
              departure_date: date,
            },
          ],
        },
        {
          onSuccess: (data) => {
            console.log('주문 생성 성공:', data);
            // 결제 페이지로 이동
          },
          onError: (error) => {
            console.error('주문 생성 실패:', error);
          },
        },
      );
    }

    setDateModalOpen(false);
    setPendingItem(null);
  };

  const hasImage = product.images && product.images.length > 0;

  return (
    <div
      className='py-8 border-b-[2px]'
      style={{ borderColor: COLORS.SEARCH_BG }}
    >
      <div id='Top' className='flex justify-between'>
        <div id='TopLeft'>
          <div className='font-semibold text-[20px]'>
            {product.product_name}
          </div>
          <div className='flex items-center gap-3 mt-2'>
            <div
              className='flex px-2 font-medium text-[14px] py-1 rounded-[5px]'
              style={{
                backgroundColor: COLORS.CATEGORY_BG,
                color: COLORS.CATEGORY_TEXT,
              }}
            >
              {product.category}
            </div>
          </div>
        </div>

        <div id='Right' className='flex'>
          {hasImage ? (
            <img
              src={product.images[0]}
              className='rounded-lg w-44'
              alt={product.product_name}
            />
          ) : (
            <div
              className='flex items-center justify-center h-32 rounded-lg w-44'
              style={{ backgroundColor: COLORS.CHECKBOX }}
            ></div>
          )}
        </div>
      </div>

      <div
        id='Bottom'
        className='flex items-center justify-between w-full mt-10'
      >
        <div id='Left' className='flex items-center gap-6'>
          <QuantityControl quantity={quantity} onChange={setQuantity} />

          <div className='flex font-bold text-[25px]'>
            ₩ {product.price.toLocaleString()}
          </div>
        </div>

        <div id='Right' className='flex w-[45%] items-center'>
          <ReservationButton
            product={product}
            quantity={quantity}
            onAddToCart={(product, quantity) => {
              setPendingItem({ product, quantity, type: 'cart' });
              setDateModalOpen(true);
            }}
            onReserve={(product, quantity) => {
              setPendingItem({ product, quantity, type: 'reserve' });
              setDateModalOpen(true);
            }}
          />
        </div>
      </div>
      <CalendarModal
        isOpen={dateModalOpen}
        onConfirm={handleDateConfirm}
        onClose={() => {
          setDateModalOpen(false);
          setPendingItem(null);
        }}
      />
    </div>
  );
}
