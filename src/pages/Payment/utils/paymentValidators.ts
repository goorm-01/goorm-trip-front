import type {
  PaymentFormData,
  PaymentItem,
  TermsAccepted,
} from '../../../types/payment';

interface ValidatePaymentSubmissionArgs {
  bookingItems: PaymentItem[];
  selectedItems: Record<number, boolean>;
  formData: PaymentFormData;
  termsAccepted: TermsAccepted;
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export function validatePaymentSubmission({
  bookingItems,
  selectedItems,
  formData,
  termsAccepted,
}: ValidatePaymentSubmissionArgs): string | null {
  const hasSelectedItems = bookingItems.some((item) => selectedItems[item.id]);

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
}
