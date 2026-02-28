import type { CartItem } from '../../../types/api';
import type { PaymentItem } from '../../../types/payment';

export function extractOrderId(data: unknown): string | null {
  if (typeof data !== 'object' || data === null) {
    return null;
  }

  const source = data as Record<string, unknown>;
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

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
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

  if (typeof rawData !== 'object' || rawData === null) {
    return [];
  }

  const cartItems = (rawData as Record<string, unknown>).cart_items;
  if (!Array.isArray(cartItems)) {
    return [];
  }

  return cartItems as CartItem[];
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

  const source = state as Record<string, unknown>;
  const previewItems = source.previewItems;
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
