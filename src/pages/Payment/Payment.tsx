import { useMemo, useState, type ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import BookerInfoForm from './components/BookerInfoForm';
import BookingItemsSection from './components/BookingItemsSection';
import PaymentHeader from './components/PaymentHeader';
import PaymentSummary from './components/PaymentSummary';
import TermsAgreement from './components/TermsAgreement';
import { useGetCartItems } from '../../hooks/api/useCartApi';
import { useCreateOrderPreview } from '../../hooks/api/useOrderApi';
import { useProcessPayment } from '../../hooks/api/usePaymentApi';
import { COLORS } from '../../styles/Colors';
import type { CartItem } from '../../types/api';
import type {
  BookingTerm,
  PaymentItem,
  PaymentFormData,
  TermsAccepted,
} from '../../types/payment';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    data: cartResponse,
    isLoading: isCartLoading,
    error: cartError,
  } = useGetCartItems();
  const createOrderPreview = useCreateOrderPreview();
  const processPayment = useProcessPayment();

  const previewItems = useMemo(
    () => mapPreviewItemsToPaymentItems(extractPreviewItems(location.state)),
    [location.state],
  );
  const cartItems = useMemo(
    () => mapCartItemsToPaymentItems(extractCartItems(cartResponse)),
    [cartResponse],
  );
  const bookingItems = useMemo(
    () => (previewItems.length > 0 ? previewItems : cartItems),
    [previewItems, cartItems],
  );
  const isPreviewFlow = previewItems.length > 0;

  const [selectedItems, setSelectedItems] = useState<Record<number, boolean>>(
    {},
  );
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  // 예약자 입력 폼 상태
  const [formData, setFormData] = useState<PaymentFormData>({
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
  });
  // 약관 동의 상태
  const [termsAccepted, setTermsAccepted] = useState<TermsAccepted>({
    cancellation: false,
    refund: false,
    all: false,
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const defaultSelectedItems = useMemo(
    () =>
      bookingItems.reduce<Record<number, boolean>>((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {}),
    [bookingItems],
  );

  const defaultQuantities = useMemo(
    () =>
      bookingItems.reduce<Record<number, number>>((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {}),
    [bookingItems],
  );

  const effectiveSelectedItems = useMemo(
    () => ({ ...defaultSelectedItems, ...selectedItems }),
    [defaultSelectedItems, selectedItems],
  );

  const effectiveQuantities = useMemo(
    () => ({ ...defaultQuantities, ...quantities }),
    [defaultQuantities, quantities],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const nextValue = name === 'phone' ? value.replace(/\D/g, '') : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleTermsChange = (term: BookingTerm) => {
    if (term === 'all') {
      const newValue = !termsAccepted.all;
      setTermsAccepted({
        cancellation: newValue,
        refund: newValue,
        all: newValue,
      });
      return;
    }

    const next = { ...termsAccepted, [term]: !termsAccepted[term] };
    next.all = next.cancellation && next.refund;
    setTermsAccepted(next);
  };

  const handleItemCheckChange = (itemId: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !effectiveSelectedItems[itemId],
    }));
  };

  const handleQuantityChange = (itemId: number, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemId] ?? 1;
      const nextValue = Math.max(1, current + delta);
      return { ...prev, [itemId]: nextValue };
    });
  };

  const selectedPaymentItems = useMemo(() => {
    return bookingItems
      .filter((item) => effectiveSelectedItems[item.id])
      .map((item) => ({
        ...item,
        quantity: quantities[item.id] ?? item.quantity,
      }));
  }, [bookingItems, effectiveSelectedItems, quantities]);

  const selectedTotal = useMemo(() => {
    return bookingItems.reduce((acc, item) => {
      if (!effectiveSelectedItems[item.id]) {
        return acc;
      }
      const quantity = quantities[item.id] ?? item.quantity;
      return acc + item.unitPrice * quantity;
    }, 0);
  }, [bookingItems, effectiveSelectedItems, quantities]);

  const validateBeforeSubmit = () => {
    const hasSelectedItems = bookingItems.some(
      (item) => effectiveSelectedItems[item.id],
    );
    if (!hasSelectedItems) {
      return '최소 1개 이상의 상품을 선택해주세요.';
    }
    if (!formData.lastName || !formData.firstName || !formData.phone) {
      return '예약자 정보를 모두 입력해주세요.';
    }
    if (!isValidEmail(formData.email)) {
      return '유효한 이메일 형식으로 입력해주세요. (예: user@example.com)';
    }
    if (!termsAccepted.cancellation || !termsAccepted.refund) {
      return '필수 약관에 동의해주세요.';
    }
    if (bookingItems.length === 0) {
      return '결제할 상품이 없습니다.';
    }
    return null;
  };

  const handleSubmitPayment = async () => {
    setSubmitError(null);

    const validationError = validateBeforeSubmit();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    try {
      const selectedBookingItems = bookingItems.filter(
        (item) => effectiveSelectedItems[item.id],
      );

      // 주문 미리보기 생성 payload
      const previewResponse = await createOrderPreview.mutateAsync({
        products: selectedBookingItems.map((item) => ({
          product_id: item.productId,
          quantity: quantities[item.id] ?? item.quantity,
          departure_date: item.departureDate,
        })),
      });

      const orderId = extractOrderId(previewResponse);

      if (!orderId) {
        setSubmitError(
          '주문 정보 생성에 실패했습니다. 응답 형식을 확인해주세요.',
        );
        return;
      }

      // 결제 요청 payload
      await processPayment.mutateAsync({
        order_id: orderId,
        total_amount: selectedTotal,
        payment_method: 'CARD',
      });
    } catch {
      setSubmitError(
        '결제 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      );
    }
  };

  const isSubmitting = createOrderPreview.isPending || processPayment.isPending;

  return (
    <div
      className='min-h-screen w-full'
      style={{
        backgroundColor: COLORS.BG_PRIMARY,
        color: COLORS.TEXT_PRIMARY,
      }}
    >
      <div className='mx-auto flex w-full max-w-[1512px] flex-col items-center'>
        <PaymentHeader
          total={`₩ ${selectedTotal.toLocaleString('ko-KR')}`}
          onBack={() => navigate(-1)}
        />

        <div
          className='h-px w-full'
          style={{ backgroundColor: COLORS.INFO_BOX }}
        />

        <div className='flex w-full flex-col gap-10 overflow-y-auto px-6 py-8 md:px-[150px]'>
          <BookingItemsSection
            items={bookingItems}
            selectedItems={effectiveSelectedItems}
            quantities={effectiveQuantities}
            onToggleItem={handleItemCheckChange}
            onQuantityChange={handleQuantityChange}
          />
          {!isPreviewFlow && isCartLoading ? (
            <p className='text-sm' style={{ color: COLORS.TEXT_SUB }}>
              장바구니 불러오는 중...
            </p>
          ) : null}
          {!isPreviewFlow && cartError ? (
            <p className='text-sm' style={{ color: COLORS.NOTIFICATION }}>
              장바구니를 불러오지 못했습니다.
            </p>
          ) : null}
          {!isPreviewFlow &&
          !isCartLoading &&
          !cartError &&
          bookingItems.length === 0 ? (
            <p className='text-sm' style={{ color: COLORS.TEXT_SUB }}>
              장바구니가 비어 있습니다.
            </p>
          ) : null}

          <div
            className='h-px w-full'
            style={{ backgroundColor: COLORS.INFO_BOX }}
          />

          <section className='grid grid-cols-1 gap-8 xl:grid-cols-[1fr_349px]'>
            <div className='flex flex-col gap-8'>
              <BookerInfoForm
                formData={formData}
                onInputChange={handleInputChange}
              />
              <TermsAgreement
                termsAccepted={termsAccepted}
                onTermsChange={handleTermsChange}
              />
            </div>

            <PaymentSummary
              items={selectedPaymentItems}
              total={`${selectedTotal.toLocaleString('ko-KR')} 원`}
              isSubmitting={isSubmitting}
              submitError={submitError}
              onSubmit={handleSubmitPayment}
            />
          </section>

          <div
            className='h-px w-full'
            style={{ backgroundColor: COLORS.INFO_BOX }}
          />

          <footer className='pb-8 text-base' style={{ color: COLORS.TEXT_SUB }}>
            Copyright @Groom-01
          </footer>
        </div>
      </div>
    </div>
  );
}

function extractOrderId(data: unknown): string | null {
  if (typeof data !== 'object' || data === null) {
    return null;
  }

  const source = data as Record<string, unknown>;
  // 백엔드 응답 포맷별 주문번호 후보 키
  const candidates = [
    source.order_id,
    source.orderId,
    source.order_number,
    source.orderNumber,
    (source.data as Record<string, unknown> | undefined)?.order_id,
    (source.data as Record<string, unknown> | undefined)?.orderId,
    (source.data as Record<string, unknown> | undefined)?.order_number,
    (source.data as Record<string, unknown> | undefined)?.orderNumber,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.length > 0) {
      return candidate;
    }
    if (typeof candidate === 'number') {
      return String(candidate);
    }
  }

  return null;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function extractCartItems(data: unknown): CartItem[] {
  if (typeof data !== 'object' || data === null) {
    return [];
  }

  const source = data as Record<string, unknown>;
  const rawData = source.data;
  if (Array.isArray(rawData)) {
    return rawData.filter(isCartItem);
  }

  if (typeof rawData !== 'object' || rawData === null) {
    return [];
  }

  const cartItems = (rawData as Record<string, unknown>).cart_items;
  if (!Array.isArray(cartItems)) {
    return [];
  }

  return cartItems.filter(isCartItem);
}

function isCartItem(item: unknown): item is CartItem {
  if (typeof item !== 'object' || item === null) {
    return false;
  }

  const target = item as Record<string, unknown>;
  return (
    typeof target.cart_id === 'number' &&
    typeof target.product_id === 'number' &&
    typeof target.product_name === 'string' &&
    typeof target.price === 'number' &&
    typeof target.quantity === 'number' &&
    typeof target.image === 'string' &&
    typeof target.departure_date === 'string'
  );
}

function mapCartItemsToPaymentItems(cartItems: CartItem[]): PaymentItem[] {
  return cartItems.map((item) => ({
    id: item.cart_id,
    productId: item.product_id,
    image: item.image,
    title: item.product_name,
    departureDate: item.departure_date,
    unitPrice: item.price,
    quantity: item.quantity,
  }));
}

function extractPreviewItems(state: unknown): unknown[] {
  if (typeof state !== 'object' || state === null) {
    return [];
  }

  const source = state as Record<string, unknown>;
  const previewItems = source.previewItems;
  return Array.isArray(previewItems) ? previewItems : [];
}

function mapPreviewItemsToPaymentItems(previewItems: unknown[]): PaymentItem[] {
  return previewItems
    .map((item, index) => toPaymentItem(item, index))
    .filter((item): item is PaymentItem => item !== null);
}

function toPaymentItem(item: unknown, index: number): PaymentItem | null {
  if (typeof item !== 'object' || item === null) {
    return null;
  }

  const source = item as Record<string, unknown>;
  const productName = source.product_name;
  const price = source.price;
  const quantity = source.quantity;
  const departureDate = source.departure_date;
  const productId = source.product_id;

  if (
    typeof productName !== 'string' ||
    typeof price !== 'number' ||
    typeof quantity !== 'number' ||
    typeof departureDate !== 'string' ||
    typeof productId !== 'number'
  ) {
    return null;
  }

  const cartId = source.cart_id;
  const id = typeof cartId === 'number' ? cartId : -(index + 1);

  return {
    id,
    productId,
    image: typeof source.image === 'string' ? source.image : '',
    title: productName,
    departureDate,
    unitPrice: price,
    quantity,
  };
}
