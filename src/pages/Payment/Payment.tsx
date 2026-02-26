import { useMemo, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateOrderPreview } from '../../hooks/api/useOrderApi';
import { useProcessPayment } from '../../hooks/api/usePaymentApi';
import { MOCK_BOOKING_ITEMS } from './mockData.payment';
import BookerInfoForm from './components/BookerInfoForm';
import BookingItemsSection from './components/BookingItemsSection';
import PaymentHeader from './components/PaymentHeader';
import PaymentSummary from './components/PaymentSummary';
import TermsAgreement from './components/TermsAgreement';
import type {
  BookingTerm,
  PaymentFormData,
  TermsAccepted,
} from '../../types/payment';

export default function Payment() {
  const navigate = useNavigate();
  const createOrderPreview = useCreateOrderPreview();
  const processPayment = useProcessPayment();

  const [selectedItems, setSelectedItems] = useState<Record<number, boolean>>(
    () =>
      MOCK_BOOKING_ITEMS.reduce<Record<number, boolean>>((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {}),
  );
  const [quantities, setQuantities] = useState<Record<number, number>>(() =>
    MOCK_BOOKING_ITEMS.reduce<Record<number, number>>((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {}),
  );
  const [formData, setFormData] = useState<PaymentFormData>({
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
  });
  const [termsAccepted, setTermsAccepted] = useState<TermsAccepted>({
    cancellation: false,
    refund: false,
    all: false,
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setSelectedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleQuantityChange = (itemId: number, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemId] ?? 1;
      const nextValue = Math.max(1, current + delta);
      return { ...prev, [itemId]: nextValue };
    });
  };

  const selectedPaymentItems = useMemo(
    () =>
      MOCK_BOOKING_ITEMS.filter((item) => selectedItems[item.id]).map(
        (item) => {
          const quantity = quantities[item.id] ?? item.quantity;
          const totalPrice = parsePrice(item.price) * quantity;
          return {
            id: item.id,
            name: item.title,
            quantity,
            price: `${totalPrice.toLocaleString('ko-KR')} 원`,
          };
        },
      ),
    [quantities, selectedItems],
  );

  const selectedTotal = useMemo(
    () =>
      MOCK_BOOKING_ITEMS.reduce((acc, item) => {
        if (!selectedItems[item.id]) {
          return acc;
        }
        const quantity = quantities[item.id] ?? item.quantity;
        return acc + parsePrice(item.price) * quantity;
      }, 0),
    [quantities, selectedItems],
  );

  const validateBeforeSubmit = () => {
    const hasSelectedItems = Object.values(selectedItems).some(Boolean);
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
      const selectedBookingItems = MOCK_BOOKING_ITEMS.filter(
        (item) => selectedItems[item.id],
      );

      const previewResponse = await createOrderPreview.mutateAsync({
        products: selectedBookingItems.map((item) => ({
          product_id: item.id,
          quantity: quantities[item.id] ?? item.quantity,
          departure_date: normalizeDate(item.date),
        })),
      });

      const orderId = extractOrderId(previewResponse);

      if (!orderId) {
        setSubmitError(
          '주문 정보 생성에 실패했습니다. 응답 형식을 확인해주세요.',
        );
        return;
      }

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
    <div className='min-h-screen w-full bg-white text-[#191919]'>
      <div className='mx-auto flex w-full max-w-[1512px] flex-col items-center'>
        <PaymentHeader
          total={`₩ ${selectedTotal.toLocaleString('ko-KR')}`}
          onBack={() => navigate(-1)}
        />

        <div className='h-px w-full bg-neutral-200' />

        <div className='flex w-full flex-col gap-10 overflow-y-auto px-6 py-8 md:px-[150px]'>
          <BookingItemsSection
            items={MOCK_BOOKING_ITEMS}
            selectedItems={selectedItems}
            quantities={quantities}
            onToggleItem={handleItemCheckChange}
            onQuantityChange={handleQuantityChange}
          />

          <div className='h-px w-full bg-neutral-200' />

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

          <div className='h-px w-full bg-neutral-200' />

          <footer className='pb-8 text-base text-[#7f7f7f]'>
            Copyright @Groom-01
          </footer>
        </div>
      </div>
    </div>
  );
}

function parsePrice(value: string) {
  return Number(value.replace(/[^\d]/g, ''));
}

function normalizeDate(dateRange: string) {
  const startDate = dateRange.split('~')[0]?.trim() ?? '';
  const [yy, mm, dd] = startDate.split('.');
  const fallbackDate = getTomorrowDate();
  if (!yy || !mm || !dd) {
    return fallbackDate;
  }

  const parsedDate = `20${yy}-${mm}-${dd}`;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const candidate = new Date(parsedDate);
  candidate.setHours(0, 0, 0, 0);

  if (Number.isNaN(candidate.getTime()) || candidate < today) {
    return fallbackDate;
  }

  return parsedDate;
}

function extractOrderId(data: unknown): string | null {
  if (typeof data !== 'object' || data === null) {
    return null;
  }

  const source = data as Record<string, unknown>;
  const candidates = [
    source.order_id,
    source.orderId,
    (source.data as Record<string, unknown> | undefined)?.order_id,
    (source.data as Record<string, unknown> | undefined)?.orderId,
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

function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}
