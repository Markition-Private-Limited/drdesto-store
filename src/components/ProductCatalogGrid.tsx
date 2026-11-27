"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ProductCard, { type Product } from "@/components/ProductCard";

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";
type FilterOption = "all" | "in-stock" | "on-sale";

function parsePrice(price: string): number {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function isOnSale(p: Product): boolean {
  if (!p.oldPrice) return false;
  return parsePrice(p.oldPrice) > parsePrice(p.price);
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
];

const FILTER_OPTIONS: { value: FilterOption; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "in-stock", label: "In Stock Only" },
  { value: "on-sale", label: "On Sale" },
];

export default function ProductCatalogGrid({
  allProducts,
  page,
  pageSize,
  basePath,
}: {
  allProducts: Product[];
  page: number;
  pageSize: number;
  basePath: string;
}) {
  const priceBounds = useMemo(() => {
    if (allProducts.length === 0) return { min: 0, max: 0 };
    const prices = allProducts.map((p) => parsePrice(p.price));
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [allProducts]);

  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [priceMin, setPriceMin] = useState(priceBounds.min);
  const [priceMax, setPriceMax] = useState(priceBounds.max);
  const [clientPage, setClientPage] = useState(page);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const isPriceNarrowed = priceMin > priceBounds.min || priceMax < priceBounds.max;
  const isDefaultView = sortBy === "featured" && filterBy === "all" && !isPriceNarrowed;

  const filtered = useMemo(() => {
    let list = allProducts;
    if (filterBy === "in-stock") list = list.filter((p) => p.available ?? true);
    if (filterBy === "on-sale") list = list.filter(isOnSale);
    list = list.filter((p) => {
      const price = parsePrice(p.price);
      return price >= priceMin && price <= priceMax;
    });
    return list;
  }, [allProducts, filterBy, priceMin, priceMax]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sortBy === "price-asc") list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sortBy === "price-desc") list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    else if (sortBy === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [filtered, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const activePage = isDefaultView ? page : clientPage;
  const safePage = Math.min(Math.max(1, activePage), totalPages);
  const start = (safePage - 1) * pageSize;
  const pageProducts = sorted.slice(start, start + pageSize);
  const rangeStart = sorted.length === 0 ? 0 : start + 1;
  const rangeEnd = Math.min(start + pageSize, sorted.length);

  const selectSort = (value: SortOption) => {
    setSortBy(value);
    setClientPage(1);
    setSortOpen(false);
  };

  const selectFilter = (value: FilterOption) => {
    setFilterBy(value);
    setClientPage(1);
    setFilterOpen(false);
  };

  const sortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Featured";
  const filterLabel = FILTER_OPTIONS.find((o) => o.value === filterBy)?.label ?? "All Products";

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 py-6">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setFilterOpen((o) => !o);
              setSortOpen(false);
            }}
            className={`flex items-center gap-2 border px-4 py-2.5 text-[11px] font-semibold tracking-[0.15em] text-ink transition-colors hover:border-ink ${
              filterBy !== "all" || isPriceNarrowed ? "border-ink" : "border-ink/20"
            }`}
          >
            {filterBy === "all" ? "FILTERS" : filterLabel.toUpperCase()}
            <span className="text-base leading-none">+</span>
          </button>
          {filterOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setFilterOpen(false)} />
              <div className="absolute left-0 top-full z-20 mt-2 w-72 border border-ink/10 bg-white py-2 shadow-lg">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectFilter(opt.value)}
                    className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors hover:bg-cream ${
                      filterBy === opt.value ? "font-semibold text-ink" : "text-ink/70"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}

                <div className="mt-2 border-t border-ink/10 px-4 pb-1 pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold tracking-[0.15em] text-ink">
                      PRICE RANGE
                    </p>
                    <p className="text-xs text-ink/50">
                      AED {priceMin} &ndash; AED {priceMax}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    <div>
                      <label className="text-[11px] text-ink/50">Min</label>
                      <input
                        type="range"
                        min={priceBounds.min}
                        max={priceBounds.max}
                        value={priceMin}
                        onChange={(e) => {
                          const value = Math.min(Number(e.target.value), priceMax);
                          setPriceMin(value);
                          setClientPage(1);
                        }}
                        className="mt-1 w-full accent-ink"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-ink/50">Max</label>
                      <input
                        type="range"
                        min={priceBounds.min}
                        max={priceBounds.max}
                        value={priceMax}
                        onChange={(e) => {
                          const value = Math.max(Number(e.target.value), priceMin);
                          setPriceMax(value);
                          setClientPage(1);
                        }}
                        className="mt-1 w-full accent-ink"
                      />
                    </div>
                  </div>

                  {isPriceNarrowed && (
                    <button
                      type="button"
                      onClick={() => {
                        setPriceMin(priceBounds.min);
                        setPriceMax(priceBounds.max);
                        setClientPage(1);
                      }}
                      className="mt-3 text-xs text-ink/50 underline-offset-2 transition-colors hover:text-ink hover:underline"
                    >
                      Reset price range
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <p className="text-sm text-ink/50">
          {sorted.length} products &middot; Showing {rangeStart}&ndash;{rangeEnd}
        </p>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setSortOpen((o) => !o);
              setFilterOpen(false);
            }}
            className="flex items-center gap-2 border border-ink/20 px-4 py-2.5 text-[11px] font-semibold tracking-[0.15em] text-ink transition-colors hover:border-ink"
          >
            SORT: {sortLabel.toUpperCase()}
            <ChevronDown size={14} strokeWidth={1.5} />
          </button>
          {sortOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-2 w-56 border border-ink/10 bg-white py-2 shadow-lg">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectSort(opt.value)}
                    className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors hover:bg-cream ${
                      sortBy === opt.value ? "font-semibold text-ink" : "text-ink/70"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {pageProducts.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink/50">No products match these filters.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {pageProducts.map((product, i) => (
            <ProductCard key={product.href} product={product} delay={(i % 4) * 80} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            const isActive = p === safePage;
            const activeClass = isActive
              ? "bg-ink text-cream"
              : "border border-ink/20 text-ink hover:border-ink";

            if (isDefaultView) {
              const href = p === 1 ? basePath : `${basePath}/${p}`;
              return (
                <Link
                  key={p}
                  href={href}
                  className={`flex h-9 w-9 items-center justify-center text-sm transition-colors ${activeClass}`}
                >
                  {p}
                </Link>
              );
            }

            return (
              <button
                key={p}
                type="button"
                onClick={() => setClientPage(p)}
                className={`flex h-9 w-9 items-center justify-center text-sm transition-colors ${activeClass}`}
              >
                {p}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
