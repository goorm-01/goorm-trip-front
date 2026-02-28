import type { CartItem } from '../../../types/api';
import type { PaymentItem } from '../../../types/payment';

export function extractOrderId(data: unknown): string | null {
  if (typeof data !== 'object' || data === null) {
    return null;
  }

  const source = data as Record<string, unknown>;
  const nestedData =
    typeof source.data === 'object' && source.data !== null
      ? (source.data as Record<string, unknown>)
      : undefined;

  const orderId =
    source.order_id ??
    source.orderId ??
    nestedData?.order_id ??
    nestedData?.orderId;

  if (typeof orderId === 'number') {
    return String(orderId);
  }

  return typeof orderId === 'string' && orderId.length > 0 ? orderId : null;
}

export function toTwelveDigitOrderNumber(orderId: string) {
  const digits = orderId.replace(/\D/g, '');

  if (digits.length >= 12) {
    return digits.slice(0, 12);
  }

  return digits.padStart(12, '0');
}

export function extractCartItems(data: unknown): CartItem[] {
  if (typeof data !== 'object' || data === null) {
    return [];
  }

  const source = data as Record<string, unknown>;
  const rawData = source.data;

  if (Array.isArray(rawData)) {
    return rawData as CartItem[];
  }

  if (typeof rawData === 'object' && rawData !== null) {
    const cartItems = (rawData as Record<string, unknown>).cart_items;
    return Array.isArray(cartItems) ? (cartItems as CartItem[]) : [];
  }

  return [];
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
  if (typeof state !== 'object' || state === null) {
    return [];
  }

  const previewItems = (state as Record<string, unknown>).previewItems;
  return Array.isArray(previewItems) ? previewItems : [];
}

export function mapPreviewItemsToPaymentItems(
  previewItems: unknown[],
): PaymentItem[] {
  return previewItems
    .map((item, index) => toPaymentItem(item, index))
    .filter((item): item is PaymentItem => item !== null);
}

function toPaymentItem(item: unknown, index: number): PaymentItem | null {
  if (typeof item !== 'object' || item === null) {
    return null;
  }

  const source = item as Record<string, unknown>;

  if (
    typeof source.product_name !== 'string' ||
    typeof source.price !== 'number' ||
    typeof source.quantity !== 'number' ||
    typeof source.departure_date !== 'string' ||
    typeof source.product_id !== 'number'
  ) {
    return null;
  }

  const id = typeof source.cart_id === 'number' ? source.cart_id : -(index + 1);

  return {
    id,
    productId: source.product_id,
    image: typeof source.image === 'string' ? source.image : '',
    title: source.product_name,
    departureDate: source.departure_date,
    unitPrice: source.price,
    quantity: source.quantity,
  };
}
