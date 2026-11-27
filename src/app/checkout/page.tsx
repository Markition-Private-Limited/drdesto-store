import type { Metadata } from "next";
import CheckoutContent from "@/components/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout | Dr Desta Store",
  description: "Illustrative checkout prototype for Dr Desta Store.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
