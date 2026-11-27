"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import type { CartItem } from "@/context/CartContext";
import {
  ORDER_CONFIRMATION_STORAGE_KEY,
  ORDER_REVIEW_STORAGE_KEY,
  generateOrderNumber,
  type OrderReviewData,
} from "@/lib/orderReview";

const FALLBACK_ITEMS: CartItem[] = [
  {
    href: "/product/cerave-foaming-cleanser-with-hyaluronic-acid",
    name: "Cerave Foaming Cleanser with Hyaluronic Acid",
    brand: "CERAVE",
    price: "AED 50",
    image: "/products/2757-shop5.png",
    qty: 1,
  },
];

const DEFAULT_DATA: OrderReviewData = {
  customerName: "Amina Hassan",
  email: "amina@example.com",
  country: "United Arab Emirates",
  paymentLabel: "Credit / Debit Cards",
  items: FALLBACK_ITEMS,
  subtotal: 50,
  fee: 0,
  feeLabel: "",
  total: 50,
};

function parsePrice(price: string): number {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatAmount(n: number): string {
  return n.toFixed(n % 1 === 0 ? 0 : 2);
}

export default function OrderReviewContent() {
  const router = useRouter();
  const [data, setData] = useState<OrderReviewData>(DEFAULT_DATA);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(ORDER_REVIEW_STORAGE_KEY);
      if (raw) setData(JSON.parse(raw));
    } catch {
      // ignore corrupt storage, keep defaults
    }
  }, []);

  const totalQty = data.items.reduce((sum, item) => sum + item.qty, 0);
  const firstItemName = data.items[0]?.name ?? "";

  const handlePlaceOrder = () => {
    try {
      sessionStorage.setItem(
        ORDER_CONFIRMATION_STORAGE_KEY,
        JSON.stringify({ ...data, orderNumber: generateOrderNumber() })
      );
    } catch {
      // ignore storage errors
    }
    router.push("/checkout/confirmation");
  };

  return (
    <div className="flex min-h-full flex-col bg-cream">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-6 sm:px-10">
          <Link href="/checkout" className="text-sm text-ink/70 transition-colors hover:text-ink">
            &larr; Back to checkout
          </Link>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Dr Desta Store — Cosmetic and Beauty"
              width={819}
              height={933}
              priority
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="text-xs tracking-[0.25em] text-ink/50">CHECKOUT / PROTOTYPE</p>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-[1800px] px-6 pt-10 pb-24 sm:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_440px]">
            <div className="max-w-[640px] space-y-8">
              <div>
                <p className="text-xs tracking-[0.2em] text-ink/40">
                  ILLUSTRATIVE CHECKOUT &middot; {firstItemName.toUpperCase()} &middot;{" "}
                  {totalQty} ITEM{totalQty > 1 ? "S" : ""}
                </p>
                <p className="mt-6 text-xs font-semibold tracking-[0.3em] text-gold">
                  YOUR ORDER
                </p>
                <h1 className="mt-4 font-display text-5xl text-ink sm:text-6xl">
                  Order review
                </h1>
                <p className="mt-4 text-base text-ink/60">
                  A few considered steps, then back to your day.
                </p>
              </div>

              <section>
                <p className="text-xs font-semibold tracking-[0.3em] text-gold">CUSTOMER</p>
                <p className="mt-4 text-sm text-ink">
                  {data.customerName} &middot; {data.email}
                </p>
                <p className="mt-1 text-sm text-ink/40">Illustrative customer details</p>
              </section>

              <section className="border-t border-ink/10 pt-8">
                <p className="text-xs font-semibold tracking-[0.3em] text-gold">
                  SHIPPING ADDRESS
                </p>
                <p className="mt-4 text-sm text-ink">Your entered address</p>
                <p className="mt-1 text-sm text-ink/40">{data.country}</p>
              </section>

              <section className="border-t border-ink/10 pt-8">
                <p className="text-xs font-semibold tracking-[0.3em] text-gold">DELIVERY</p>
                <p className="mt-4 text-sm text-ink">
                  Store delivery &middot; Charge to be confirmed
                </p>
              </section>

              <section className="border-t border-ink/10 pt-8">
                <p className="text-xs font-semibold tracking-[0.3em] text-gold">PAYMENT</p>
                <p className="mt-4 text-sm text-ink">
                  {data.paymentLabel} &middot; Prototype only
                </p>
              </section>

              <div className="border-t border-ink/10 pt-8">
                <p className="text-xs leading-relaxed text-ink/40">
                  By placing your order, you agree to the Terms &amp; Conditions.
                  <br />
                  Prototype only — no order or payment will be processed.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full bg-ink py-4 text-xs font-semibold tracking-[0.2em] text-cream transition-opacity hover:opacity-80"
              >
                PLACE ORDER
              </button>
            </div>

            <div className="h-fit bg-cream-dark p-8 lg:mt-10">
              <p className="text-xs font-semibold tracking-[0.3em] text-gold">
                YOUR BEAUTY BAG
              </p>

              <div className="mt-6 space-y-6">
                {data.items.map((item) => (
                  <div key={item.href}>
                    <h3 className="font-display text-xl leading-snug text-ink">
                      {item.name}
                    </h3>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-ink/60">Quantity</span>
                      <span className="text-ink">{item.qty}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-ink/60">Unit price &nbsp;&middot;&nbsp; AED</span>
                      <span className="text-ink">{formatAmount(parsePrice(item.price))}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-6">
                <p className="text-sm text-ink">Items subtotal &nbsp;&middot;&nbsp; AED</p>
                <p className="text-xl text-ink">{formatAmount(data.subtotal)}</p>
              </div>

              {data.fee > 0 && (
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-ink/60">{data.feeLabel}</span>
                  <span className="text-ink">AED {formatAmount(data.fee)}</span>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-ink/60">Delivery</span>
                <span className="text-ink/60">To be confirmed</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-ink/60">Tax</span>
                <span className="text-ink/60">Where applicable</span>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-ink/40">
                Final total is confirmed once delivery and any applicable taxes have
                been calculated.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
