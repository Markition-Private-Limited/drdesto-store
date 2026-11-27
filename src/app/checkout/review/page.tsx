import type { Metadata } from "next";
import OrderReviewContent from "@/components/OrderReviewContent";

export const metadata: Metadata = {
  title: "Order Review | Dr Desta Store",
  description: "Review your illustrative order before checkout.",
};

export default function OrderReviewPage() {
  return <OrderReviewContent />;
}
