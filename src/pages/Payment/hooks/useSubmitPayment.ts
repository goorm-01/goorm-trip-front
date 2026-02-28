import { useState } from 'react';

import { useCreateOrderPreview } from '../../../hooks/api/useOrderApi';
import { useProcessPayment } from '../../../hooks/api/usePaymentApi';
import type {
  PaymentFormData,
  PaymentItem,
  TermsAccepted,
} from '../../../types/payment';
import {
  extractOrderId,
  toTwelveDigitOrderNumber,
} from '../utils/paymentUtils';
import { validatePaymentSubmission } from '../utils/paymentValidators';

interface UseSubmitPaymentArgs {
  bookingItems: PaymentItem[];
  effectiveSelectedItems: Record<number, boolean>;
  effectiveQuantities: Record<number, number>;
  formData: PaymentFormData;
  termsAccepted: TermsAccepted;
  selectedTotal: number;
}

export function useSubmitPayment({
  bookingItems,
  effectiveSelectedItems,
  effectiveQuantities,
  formData,
  termsAccepted,
  selectedTotal,
}: UseSubmitPaymentArgs) {
  const createOrderPreview = useCreateOrderPreview();
  const processPayment = useProcessPayment();

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<
    string | null
  >(null);

  const handleSubmitPayment = async () => {
    setSubmitError(null);

    const validationError = validatePaymentSubmission({
      bookingItems,
      selectedItems: effectiveSelectedItems,
      formData,
      termsAccepted,
    });

    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    try {
      const selectedBookingItems = bookingItems.filter(
        (item) => effectiveSelectedItems[item.id],
      );

      const previewResponse = await createOrderPreview.mutateAsync({
        products: selectedBookingItems.map((item) => ({
          product_id: item.productId,
          quantity: effectiveQuantities[item.id] ?? item.quantity,
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

      const paymentResponse = await processPayment.mutateAsync({
        order_id: orderId,
        total_amount: selectedTotal,
        payment_method: 'CARD',
      });

      const finalizedOrderId = extractOrderId(paymentResponse) ?? orderId;
      setCompletedOrderNumber(toTwelveDigitOrderNumber(finalizedOrderId));
    } catch {
      setSubmitError(
        '결제 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      );
    }
  };

  const isSubmitting = createOrderPreview.isPending || processPayment.isPending;

  return {
    submitError,
    completedOrderNumber,
    handleSubmitPayment,
    isSubmitting,
  };
}
