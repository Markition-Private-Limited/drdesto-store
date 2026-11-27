import type { Metadata } from "next";
import OrderConfirmationContent from "@/components/OrderConfirmationContent";

export const metadata: Metadata = {
  title: "Order Confirmation | Dr Desta Store",
  description: "A simulated order confirmation for the Dr Desta Store checkout prototype.",
};

export default function OrderConfirmationPage() {
  return <OrderConfirmationContent />;
}
