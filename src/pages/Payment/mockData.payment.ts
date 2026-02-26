import type { BookingItem } from '../../types/payment';
import { MOCK_PRODUCTS } from '../../api/mockData';

function formatBookingDate(date: Date) {
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
}

function addDays(baseDate: Date, days: number) {
  const next = new Date(baseDate);
  next.setDate(next.getDate() + days);
  return next;
}

function formatBookingPrice(price: number) {
  return `₩ ${price.toLocaleString('ko-KR')}`;
}

const BASE_BOOKING_DATE = new Date();
BASE_BOOKING_DATE.setHours(0, 0, 0, 0);

export const MOCK_BOOKING_ITEMS: BookingItem[] = MOCK_PRODUCTS.slice(0, 4).map(
  (product, index) => {
    const startDate = addDays(BASE_BOOKING_DATE, index + 1);
    const endDate = addDays(startDate, 4);
    const date =
      index === 0
        ? `${formatBookingDate(startDate)}~${formatBookingDate(endDate)}`
        : formatBookingDate(startDate);

    return {
      id: product.product_id,
      image: product.image,
      title: product.product_name,
      date,
      price: formatBookingPrice(product.price),
      quantity: 2,
    };
  },
);
