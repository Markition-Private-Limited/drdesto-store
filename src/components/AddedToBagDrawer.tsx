"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus } from "lucide-react";

function parsePrice(price: string): number {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export type BagProduct = {
  brand: string;
  name: string;
  price: string;
  image: string;
};

export default function AddedToBagDrawer({
  open,
  onClose,
  product,
  qty,
  onQtyChange,
}: {
  open: boolean;
  onClose: () => void;
  product: BagProduct;
  qty: number;
  onQtyChange: (qty: number) => void;
}) {
  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const unitPrice = parsePrice(product.price);
  const subtotal = (unitPrice * qty).toFixed(unitPrice % 1 === 0 ? 0 : 2);

  return (
    <div
      className={`fixed inset-0 z-[100] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[580px] flex-col overflow-y-auto bg-cream px-6 py-8 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] sm:px-10 sm:py-10 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold tracking-[0.3em] text-gold">
            ADDED TO YOUR BEAUTY BAG
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-ink transition-colors hover:text-gold"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-6 border-t border-ink/10" />

        <div className="mt-8 grid grid-cols-[140px_1fr] gap-6">
          <div className="relative aspect-square w-full overflow-hidden bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="140px"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-semibold tracking-[0.3em] text-gold">
              {product.brand}
            </p>
            <h2 className="mt-2 font-display text-2xl leading-snug text-ink">
              {product.name}
            </h2>
            <p className="mt-4 text-lg text-ink">{product.price}</p>

            <div className="mt-6 flex w-fit items-center border border-ink/20">
              <button
                type="button"
                onClick={() => onQtyChange(Math.max(1, qty - 1))}
                className="px-3 py-3 text-ink/50 transition-colors hover:text-ink"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm text-ink">{qty}</span>
              <button
                type="button"
                onClick={() => onQtyChange(qty + 1)}
                className="px-3 py-3 text-ink/50 transition-colors hover:text-ink"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-ink/10 pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-ink">
              Items subtotal &nbsp;&middot;&nbsp; AED
            </p>
            <p className="text-xl text-ink">{subtotal}</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink/50">
            Delivery and any applicable taxes are confirmed at checkout.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <Link
            href="/cart"
            className="flex w-full items-center justify-center bg-ink py-4 text-xs font-semibold tracking-[0.2em] text-cream transition-opacity hover:opacity-80"
          >
            VIEW BAG
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex w-full items-center justify-center border border-ink py-4 text-xs font-semibold tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            CONTINUE SHOPPING
          </button>
        </div>

        <p className="mt-10 text-sm text-ink/50">
          A considered addition to your daily routine.
        </p>
      </div>
    </div>
  );
}
