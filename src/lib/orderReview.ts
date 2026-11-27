import type { CartItem } from "@/context/CartContext";

export const ORDER_REVIEW_STORAGE_KEY = "dr-desta-order-review";
export const ORDER_CONFIRMATION_STORAGE_KEY = "dr-desta-order-confirmation";

export type OrderReviewData = {
  customerName: string;
  email: string;
  country: string;
  paymentLabel: string;
  items: CartItem[];
  subtotal: number;
  fee: number;
  feeLabel: string;
  total: number;
};

export type OrderConfirmationData = OrderReviewData & {
  orderNumber: string;
};

export function generateOrderNumber(): string {
  return `DDS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
