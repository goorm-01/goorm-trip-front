import { useMemo } from 'react';

import { useGetCartItems } from '../../../hooks/api/useCartApi';
import {
  extractCartItems,
  extractPreviewItems,
  mapCartItemsToPaymentItems,
  mapPreviewItemsToPaymentItems,
} from '../utils/paymentUtils';

export function usePaymentItems(locationState: unknown) {
  const { data: cartResponse } = useGetCartItems();

  const previewItems = useMemo(
    () => mapPreviewItemsToPaymentItems(extractPreviewItems(locationState)),
    [locationState],
  );
  const cartItems = useMemo(
    () => mapCartItemsToPaymentItems(extractCartItems(cartResponse)),
    [cartResponse],
  );
  const isPreviewFlow = previewItems.length > 0;
  const bookingItems = isPreviewFlow ? previewItems : cartItems;

  return { bookingItems };
}
