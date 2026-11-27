"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { PRODUCTS } from "@/data/products";

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-ink/40 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="mx-auto mt-24 w-[90%] max-w-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-ink/10 px-6 py-5">
          <Search size={18} strokeWidth={1.5} className="shrink-0 text-ink/40" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands..."
            className="flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink/40"
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="shrink-0 text-ink/50 transition-colors hover:text-ink"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-2 py-2">
          {query.trim() === "" ? (
            <p className="px-4 py-8 text-center text-sm text-ink/50">
              Start typing to search our full catalog.
            </p>
          ) : results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-ink/50">
              No products found for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            results.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                onClick={onClose}
                className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-cream"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold tracking-[0.1em] text-gold">
                    {product.brand}
                  </p>
                  <p className="truncate text-sm text-ink">{product.name}</p>
                  <p className="text-xs text-ink/50">{product.price}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
