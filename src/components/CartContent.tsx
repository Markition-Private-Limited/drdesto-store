"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { useCart } from "@/context/CartContext";

function parsePrice(price: string): number {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatAmount(n: number): string {
  return n.toFixed(n % 1 === 0 ? 0 : 2);
}

export default function CartContent() {
  const { items, updateQty, removeItem } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.qty,
    0
  );

  const handleApplyCode = () => {
    if (!coupon.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    setCouponError("Invalid or expired coupon code.");
  };

  return (
    <div className="flex min-h-full flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-[1800px] px-6 pt-10 pb-20 sm:px-10">
          <p className="text-xs font-semibold tracking-[0.3em] text-gold">YOUR BEAUTY BAG</p>
          <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            Your everyday, considered.
          </h1>
          <p className="mt-4 text-base text-ink/60">Review your selected beauty essential.</p>

          {items.length === 0 ? (
            <Reveal className="mt-20 flex flex-col items-center justify-center border border-ink/10 bg-white py-20 text-center">
              <ShoppingBag size={32} strokeWidth={1.25} className="text-ink/30" />
              <p className="mt-6 font-display text-2xl text-ink">Your beauty bag is empty.</p>
              <p className="mt-2 text-sm text-ink/50">
                Explore the collection and find something you&rsquo;ll love.
              </p>
              <Link
                href="/shop"
                className="mt-8 inline-flex w-fit items-center bg-ink px-8 py-4 text-xs font-semibold tracking-[0.2em] text-cream transition-colors hover:bg-gold"
              >
                SHOP ALL
              </Link>
            </Reveal>
          ) : (
            <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_440px]">
              <div className="mx-auto flex w-full max-w-[820px] flex-col gap-10">
                {items.map((item) => (
                  <Reveal key={item.href} className="grid grid-cols-1 gap-6 sm:grid-cols-[320px_1fr] sm:gap-10">
                    <Link
                      href={item.href}
                      className="relative aspect-[320/400] w-full max-w-[260px] overflow-hidden sm:max-w-[320px]"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="250px"
                        className="object-contain"
                      />
                    </Link>

                    <div className="flex flex-col pt-8 sm:pt-12">
                      <p className="text-xs font-semibold tracking-[0.3em] text-gold">
                        {item.brand}
                      </p>
                      <Link href={item.href}>
                        <h2 className="mt-2 font-display text-2xl leading-snug text-ink transition-colors hover:text-gold">
                          {item.name}
                        </h2>
                      </Link>
                      <p className="mt-4 text-lg text-ink">{item.price}</p>

                      <div className="mt-6 flex w-fit items-center border border-ink/20">
                        <button
                          type="button"
                          onClick={() => updateQty(item.href, item.qty - 1)}
                          className="px-3 py-3 text-ink/50 transition-colors hover:text-ink"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm text-ink">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.href, item.qty + 1)}
                          className="px-3 py-3 text-ink/50 transition-colors hover:text-ink"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="mt-6 flex items-center gap-6">
                        <button
                          type="button"
                          onClick={() => removeItem(item.href)}
                          className="text-sm text-ink/50 underline-offset-2 transition-colors hover:text-ink hover:underline"
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-1.5 text-sm text-ink/50 transition-colors hover:text-ink"
                        >
                          <Heart size={14} strokeWidth={1.5} />
                          Save for later
                        </button>
                      </div>
                    </div>
                  </Reveal>
                ))}

                <Link
                  href="/shop"
                  className="mt-4 flex w-full items-center justify-center border border-ink py-4 text-xs font-semibold tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-cream"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>

              <Reveal className="h-fit bg-cream p-8">
                <p className="text-xs font-semibold tracking-[0.3em] text-gold">ORDER SUMMARY</p>

                {items.length > 1 && (
                  <div className="mt-6 flex flex-col gap-4">
                    {items.map((item) => (
                      <div key={item.href} className="flex items-start justify-between gap-4">
                        <p className="text-sm text-ink">{item.name}</p>
                        <p className="shrink-0 text-right text-sm text-ink/50">
                          AED {item.price.replace(/[^0-9.]/g, "")} &middot; Quantity {item.qty}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`flex items-center justify-between ${
                    items.length > 1 ? "mt-6 border-t border-ink/10 pt-6" : "mt-6"
                  }`}
                >
                  <p className="text-sm text-ink">Items subtotal &nbsp;&middot;&nbsp; AED</p>
                  <p className="text-xl text-ink">{formatAmount(subtotal)}</p>
                </div>

                <div className="mt-6 border-t border-ink/10 pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink/60">Shipping</span>
                    <span className="text-ink/60">To be confirmed</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-ink/60">Taxes</span>
                    <span className="text-ink/60">Where applicable</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-ink/60">Discount</span>
                    <span className="text-ink/60">No code applied</span>
                  </div>
                </div>

                <div className="mt-8">
                  <label htmlFor="coupon" className="text-sm text-ink">
                    Coupon code
                  </label>
                  <input
                    id="coupon"
                    type="text"
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      if (couponError) setCouponError(null);
                    }}
                    placeholder="Enter a code"
                    className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
                  />
                  {couponError && (
                    <p className="mt-2 text-xs text-red-700/80">{couponError}</p>
                  )}
                  <button
                    type="button"
                    onClick={handleApplyCode}
                    className="mt-3 w-full border border-ink py-3 text-xs font-semibold tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-cream"
                  >
                    APPLY CODE
                  </button>
                </div>

                <Link
                  href="/checkout"
                  className="mt-8 flex w-full items-center justify-center bg-ink py-4 text-xs font-semibold tracking-[0.2em] text-cream transition-opacity hover:opacity-80"
                >
                  PROCEED TO CHECKOUT
                </Link>
                <p className="mt-4 text-xs leading-relaxed text-ink/40">
                  Prototype note: checkout previews the CeraVe cleanser sample order.
                </p>
              </Reveal>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
