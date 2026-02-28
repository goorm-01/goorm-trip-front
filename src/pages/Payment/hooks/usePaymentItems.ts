import { useMemo } from 'react';

import { useGetCartItems } from '../../../hooks/api/useCartApi';
import {
  extractCartItems,
  extractPreviewItems,
  mapCartItemsToPaymentItems,
  mapPreviewItemsToPaymentItems,
} from '../utils/paymentUtils';

export function usePaymentItems(locationState: unknown) {
  const {
    data: cartResponse,
    isLoading: isCartLoading,
    error: cartError,
  } = useGetCartItems();

  const previewItems = useMemo(
    () => mapPreviewItemsToPaymentItems(extractPreviewItems(locationState)),
    [locationState],
  );
  const cartItems = useMemo(
    () => mapCartItemsToPaymentItems(extractCartItems(cartResponse)),
    [cartResponse],
  );
  const bookingItems = useMemo(
    () => (previewItems.length > 0 ? previewItems : cartItems),
    [previewItems, cartItems],
  );
  const isPreviewFlow = previewItems.length > 0;

  return { bookingItems, isPreviewFlow, isCartLoading, cartError };
}
