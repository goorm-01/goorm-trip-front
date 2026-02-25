import type { PaymentItem } from '../types';

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
    <aside className='rounded-xl border border-neutral-200 p-5'>
      <h3 className='mb-4 text-xl font-semibold'>결제 정보</h3>
      <div className='space-y-4'>
        {items.map((item) => (
          <div key={item.id} className='space-y-2'>
            <div className='flex items-center justify-between text-[15px] font-bold text-[#727272]'>
              <span>{item.name}</span>
              <span>{item.quantity}개</span>
            </div>
            <div className='text-right text-base font-bold text-[#3a3a3a]'>
              {item.price}
            </div>
          </div>
        ))}
        <div className='h-px w-full bg-neutral-300' />
        <div className='text-right text-base font-bold'>{total}</div>
      </div>

      <button
        type='button'
        onClick={onSubmit}
        disabled={isSubmitting}
        className='mt-6 h-12 w-full rounded-[10px] bg-[#2a72e5] text-base font-medium text-white'
      >
        {isSubmitting ? '결제 처리중...' : '결제하기'}
      </button>
      {submitError ? (
        <p className='mt-3 text-sm text-[#ff5757]'>{submitError}</p>
      ) : null}
    </aside>
  );
}
