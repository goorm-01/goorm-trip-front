import type { CartItem } from '../../../types/api';
import type { PaymentItem } from '../../../types/payment';

export function extractOrderId(data: unknown): string | null {
  const source = data as {
    order_id: string | number;
    data: { order_id: string | number };
  };
  const orderId = source.order_id || source.data.order_id;
  return orderId ? String(orderId) : null;
}

export function toTwelveDigitOrderNumber(orderId: string) {
  const digits = orderId.replace(/\D/g, '');

  if (digits.length >= 12) {
    return digits.slice(0, 12);
  }

  return digits.padStart(12, '0');
}

export function extractCartItems(data: unknown): CartItem[] {
  const response = data as { data: CartItem[] };
  return response.data;
}

export function mapCartItemsToPaymentItems(
  cartItems: CartItem[],
): PaymentItem[] {
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

export function extractPreviewItems(state: unknown): unknown[] {
  const locationState = state as { previewItems: PreviewItem[] };
  return locationState.previewItems;
}

export function mapPreviewItemsToPaymentItems(
  previewItems: PreviewItem[],
): PaymentItem[] {
  return previewItems.map((item) => ({
    id: item.id,
    productId: item.product_id,
    image: item.image,
    title: item.product_name,
    departureDate: item.departure_date,
    unitPrice: item.price,
    quantity: item.quantity,
  }));
}

interface PreviewItem {
  id: number;
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  departure_date: string;
  image: string;
}
