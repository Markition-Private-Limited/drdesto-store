import type { Metadata } from "next";
import CartContent from "@/components/CartContent";

export const metadata: Metadata = {
  title: "Your Beauty Bag | Dr Desta Store",
  description: "Review your selected beauty essentials before checkout.",
};

export default function CartPage() {
  return <CartContent />;
}
