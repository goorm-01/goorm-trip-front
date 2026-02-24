import type { BookingItem, PaymentItem } from './types';

export const bookingItems: BookingItem[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=400&q=80',
    title: '제주도 3박 4일 투어',
    date: '26.02.18~26.02.22',
    price: '₩ 890,000',
    quantity: 2,
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    title: '동굴 투명 카약 체험',
    date: '26.02.19',
    price: '₩ 42,000',
    quantity: 2,
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=400&q=80',
    title: '애월 스쿠버 다이빙',
    date: '26.02.20',
    price: '₩ 54,000',
    quantity: 2,
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=400&q=80',
    title: '애월 스쿠버 다이빙',
    date: '26.02.20',
    price: '₩ 54,000',
    quantity: 2,
  },
];

export const paymentItems: PaymentItem[] = [
  { id: 1, name: '동굴 투명 카약 체험', quantity: 2, price: '84,000 원' },
  { id: 2, name: '애월 스쿠버 다이빙', quantity: 2, price: '108,000 원' },
  { id: 3, name: '제주도 3박 4일 투어', quantity: 2, price: '890,000 원' },
];

export const PAYMENT_TOTAL = '1,972,000 원';
export const PAYMENT_TOTAL_WITH_SYMBOL = '₩ 1,972,000';
