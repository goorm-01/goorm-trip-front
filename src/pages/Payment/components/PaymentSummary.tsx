import { COLORS } from '../../../styles/Colors';
import type { PaymentItem } from '../../../types/payment';

interface PaymentSummaryProps {
  items: PaymentItem[];
  total: string;
  isSubmitting: boolean;
  submitError: string | null;
  onSubmit: () => void;
}

export default function PaymentSummary({
  items,
  total,
  isSubmitting,
  submitError,
  onSubmit,
}: PaymentSummaryProps) {
  return (
    <aside
      className='inline-flex h-fit flex-col self-start rounded-xl border p-5'
      style={{ borderColor: COLORS.INFO_BOX }}
    >
      <h3 className='mb-4 text-xl font-semibold'>결제 정보</h3>
      <div className='space-y-4'>
        {items.map((item) => (
          <div key={item.id} className='space-y-2'>
            <div
              className='flex items-center justify-between text-[15px] font-bold'
              style={{ color: COLORS.TEXT_SUB }}
            >
              <span>{item.name}</span>
              <span>{item.quantity}개</span>
            </div>
            <div
              className='text-right text-base font-bold'
              style={{ color: COLORS.TEXT_PRIMARY }}
            >
              {item.price}
            </div>
          </div>
        ))}
        <div
          className='h-px w-full'
          style={{ backgroundColor: COLORS.INFO_BOX }}
        />
        <div className='text-right text-base font-bold'>{total}</div>
      </div>

      <button
        type='button'
        onClick={onSubmit}
        disabled={isSubmitting}
        className='mt-6 h-12 w-full rounded-[10px] text-base font-medium text-white'
        style={{ backgroundColor: COLORS.BUTTON_MAIN }}
      >
        {isSubmitting ? '결제 처리중...' : '결제하기'}
      </button>
      {submitError ? (
        <p className='mt-3 text-sm' style={{ color: COLORS.NOTIFICATION }}>
          {submitError}
        </p>
      ) : null}
    </aside>
  );
}
