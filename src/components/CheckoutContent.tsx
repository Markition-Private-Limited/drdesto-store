"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useCart, type CartItem } from "@/context/CartContext";
import { ORDER_REVIEW_STORAGE_KEY, type OrderReviewData } from "@/lib/orderReview";

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

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit / Debit Cards",
    badges: ["AMEX", "DISCOVER", "VISA", "MASTERCARD"],
  },
  {
    id: "check",
    label: "Check payments",
    description:
      "Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.",
  },
  {
    id: "bank",
    label: "Direct bank transfer",
    description:
      "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
  },
  {
    id: "cod",
    label: "Cash on delivery",
    description: "Pay with cash upon delivery.",
    fee: 20,
  },
] as const;

type PaymentMethod = (typeof PAYMENT_METHODS)[number]["id"];

function parsePrice(price: string): number {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatAmount(n: number): string {
  return n.toFixed(n % 1 === 0 ? 0 : 2);
}

export default function CheckoutContent() {
  const router = useRouter();
  const { items } = useCart();
  const [shipToDifferent, setShipToDifferent] = useState(false);
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [coupon, setCoupon] = useState("");

  const cartItems = items.length > 0 ? items : FALLBACK_ITEMS;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.qty,
    0
  );
  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === payment)!;
  const codFee = "fee" in selectedMethod ? selectedMethod.fee : 0;
  const total = subtotal + codFee;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const firstName = (data.get("firstName") as string) || "Amina";
    const lastName = (data.get("lastName") as string) || "Hassan";
    const email = (data.get("email") as string) || "amina@example.com";
    const country = (data.get("country") as string) || "United Arab Emirates";

    const payload: OrderReviewData = {
      customerName: `${firstName} ${lastName}`.trim(),
      email,
      country,
      paymentLabel: selectedMethod.label,
      items: cartItems,
      subtotal,
      fee: codFee,
      feeLabel: selectedMethod.label,
      total,
    };

    try {
      sessionStorage.setItem(ORDER_REVIEW_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore storage errors
    }

    router.push("/checkout/review");
  };

  return (
    <div className="flex min-h-full flex-col bg-cream">
      <header className="border-b border-ink/10">
        <div className="relative mx-auto flex max-w-[1800px] items-center justify-between px-6 py-6 sm:px-10">
          <Link href="/cart" className="text-sm text-ink/70 transition-colors hover:text-ink">
            &larr; Continue shopping
          </Link>
          <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/logo.png"
              alt="Dr Desta Store — Cosmetic and Beauty"
              width={819}
              height={933}
              priority
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="hidden text-xs tracking-[0.25em] text-ink/50 sm:block">CHECKOUT / PROTOTYPE</p>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-[1800px] px-6 pt-10 pb-24 sm:px-10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_440px]"
          >
            <div className="max-w-[640px] space-y-12">
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-gold">YOUR ORDER</p>
                <h1 className="mt-4 font-display text-5xl text-ink sm:text-6xl">Checkout</h1>
                <p className="mt-4 text-base text-ink/60">
                  Checkout as a guest, or sign in to your account.
                </p>
              </div>

              <section>
                <h2 className="font-display text-3xl text-ink">Contact</h2>
                <div className="mt-6">
                  <label htmlFor="email" className="text-sm text-ink">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    defaultValue="amina@example.com"
                    className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
                  />
                </div>
              </section>

              <section>
                <h2 className="font-display text-3xl text-ink">Billing details</h2>
                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="text-sm text-ink">
                        First name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        defaultValue="Amina"
                        className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="text-sm text-ink">
                        Last name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        defaultValue="Hassan"
                        className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="text-sm text-ink">
                      Country / Region
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      defaultValue="United Arab Emirates"
                      className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="street" className="text-sm text-ink">
                      Street address
                    </label>
                    <input
                      id="street"
                      type="text"
                      placeholder="House number and street name"
                      className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="apartment" className="text-sm text-ink">
                      Apartment, suite, unit, etc.{" "}
                      <span className="text-ink/40">(optional)</span>
                    </label>
                    <input
                      id="apartment"
                      type="text"
                      className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="city" className="text-sm text-ink">
                        Town / City
                      </label>
                      <input
                        id="city"
                        type="text"
                        className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="text-sm text-ink">
                        State / County
                      </label>
                      <input
                        id="state"
                        type="text"
                        className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="text-sm text-ink">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="text"
                      defaultValue="+971 •• ••• ••••"
                      className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none"
                    />
                  </div>

                  <label className="flex items-center gap-3 text-sm text-ink">
                    <input
                      type="checkbox"
                      checked={shipToDifferent}
                      onChange={(e) => setShipToDifferent(e.target.checked)}
                      className="h-4 w-4 accent-gold"
                    />
                    Ship to a different address?
                  </label>

                  {shipToDifferent && (
                    <div className="border border-ink/10 bg-white p-6">
                      <p className="text-sm text-ink/60">
                        Shipping address fields would appear here.
                      </p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="notes" className="text-sm text-ink">
                      Order notes <span className="text-ink/40">(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      rows={4}
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      className="mt-2 w-full resize-none border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-3xl text-ink">Shipping</h2>
                <div className="mt-6 flex items-center justify-between border border-gold bg-gold/5 px-5 py-4">
                  <label className="flex items-center gap-3 text-sm text-ink">
                    <input
                      type="radio"
                      name="shipping"
                      defaultChecked
                      className="h-4 w-4 accent-gold"
                    />
                    Flat rate
                  </label>
                </div>
              </section>

              <section>
                <h2 className="font-display text-3xl text-ink">Payment</h2>
                <div className="mt-6 border border-ink/10">
                  {PAYMENT_METHODS.map((method, i) => (
                    <div
                      key={method.id}
                      className={i > 0 ? "border-t border-ink/10" : ""}
                    >
                      <label
                        className={`flex cursor-pointer items-center justify-between px-5 py-4 text-sm text-ink ${
                          payment === method.id ? "bg-gold/5" : ""
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            checked={payment === method.id}
                            onChange={() => setPayment(method.id)}
                            className="h-4 w-4 accent-gold"
                          />
                          {method.label}
                        </span>
                        {"badges" in method && (
                          <span className="flex items-center gap-1.5">
                            {method.badges.map((badge) => (
                              <span
                                key={badge}
                                className="rounded-sm border border-ink/15 bg-white px-2 py-1 text-[9px] font-semibold tracking-[0.1em] text-ink/50"
                              >
                                {badge}
                              </span>
                            ))}
                          </span>
                        )}
                      </label>

                      {method.id === "card" && payment === "card" && (
                        <div className="space-y-6 border-t border-ink/10 bg-white px-5 py-6">
                          <div>
                            <label htmlFor="cardNumber" className="text-sm text-ink">
                              Card number
                            </label>
                            <input
                              id="cardNumber"
                              type="text"
                              placeholder="1234 1234 1234 1234"
                              className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                              <label htmlFor="expiry" className="text-sm text-ink">
                                Expiration date
                              </label>
                              <input
                                id="expiry"
                                type="text"
                                placeholder="MM / YY"
                                className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
                              />
                            </div>
                            <div>
                              <label htmlFor="cvc" className="text-sm text-ink">
                                Security code
                              </label>
                              <input
                                id="cvc"
                                type="text"
                                placeholder="CVC"
                                className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {"description" in method && payment === method.id && (
                        <div className="border-t border-ink/10 bg-white px-5 py-6">
                          <p className="text-sm leading-relaxed text-ink/60">
                            {method.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <label className="flex items-center gap-3 text-sm text-ink">
                <input type="checkbox" className="h-4 w-4 accent-gold" />
                Subscribe to our newsletter
              </label>

              <p className="text-xs text-ink/40">
                Illustrative checkout details. No information is submitted.
              </p>

              <button
                type="submit"
                className="w-full bg-ink py-4 text-xs font-semibold tracking-[0.2em] text-cream transition-opacity hover:opacity-80"
              >
                REVIEW ORDER
              </button>
            </div>

            <div className="h-fit bg-cream-dark p-8 lg:sticky lg:top-24 lg:mt-10 lg:self-start">
              <p className="text-xs font-semibold tracking-[0.3em] text-gold">
                YOUR BEAUTY BAG
              </p>

              <div className="mt-6 max-h-[320px] space-y-5 overflow-y-auto pr-1">
                {cartItems.map((cartItem) => (
                  <div key={cartItem.href} className="flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-ink/10 bg-white">
                      <Image
                        src={cartItem.image}
                        alt={cartItem.name}
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-semibold text-cream">
                        {cartItem.qty}
                      </span>
                    </div>
                    <p className="flex-1 text-sm text-ink">{cartItem.name}</p>
                    <p className="shrink-0 text-sm text-ink">
                      AED {formatAmount(parsePrice(cartItem.price) * cartItem.qty)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
                />
                <button
                  type="button"
                  className="shrink-0 bg-ink px-6 py-3 text-xs font-semibold tracking-[0.2em] text-cream transition-opacity hover:opacity-80"
                >
                  APPLY
                </button>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-6 text-sm">
                <span className="text-ink/60">Subtotal</span>
                <span className="text-ink">AED {formatAmount(subtotal)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-ink/60">Shipping</span>
                <span className="text-ink/60">Flat rate</span>
              </div>
              {codFee > 0 && (
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-ink/60">Cash on delivery</span>
                  <span className="text-ink">AED {formatAmount(codFee)}</span>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-6">
                <p className="text-sm text-ink">Total</p>
                <p className="text-xl text-ink">AED {formatAmount(total)}</p>
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-ink py-4 text-xs font-semibold tracking-[0.2em] text-cream transition-opacity hover:opacity-80"
              >
                REVIEW ORDER
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
