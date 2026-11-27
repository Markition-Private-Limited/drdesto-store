import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCatalogGrid from "@/components/ProductCatalogGrid";
import Reveal from "@/components/Reveal";
import { getProductsByBrand } from "@/data/products";

export const PAGE_SIZE = 16;

type BrandContentProps = {
  brandSlug: string; // e.g. "cerave"
  page: number;
  basePath: string; // e.g. "/brand/cerave"
  displayName: string; // e.g. "CeraVe"
};

export function getBrandTotalPages(brandSlug: string) {
  const count = getProductsByBrand(brandSlug).length;
  return Math.max(1, Math.ceil(count / PAGE_SIZE));
}

export function isValidBrandPage(brandSlug: string, page: number) {
  return Number.isInteger(page) && page >= 1 && page <= getBrandTotalPages(brandSlug);
}

export default function BrandContent({ brandSlug, page, basePath, displayName }: BrandContentProps) {
  const allProducts = getProductsByBrand(brandSlug);

  return (
    <div className="flex min-h-full flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-[1800px] px-6 pt-6 sm:px-10">
          <nav className="text-xs text-ink/50">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/shop" className="hover:text-gold">
              Shop
            </Link>{" "}
            / <span className="text-ink">{displayName}</span>
          </nav>
        </div>

        <Reveal className="mx-auto max-w-[1800px] px-6 pt-8 pb-10 sm:px-10">
          <p className="text-xs font-semibold tracking-[0.3em] text-gold">BRAND</p>
          <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">{displayName}</h1>
          <p className="mt-4 max-w-xl text-base text-ink/60">
            Explore the full {displayName} collection, curated for your everyday routine.
          </p>
        </Reveal>

        <div className="mx-auto max-w-[1800px] px-6 pb-16 sm:px-10">
          {allProducts.length > 0 ? (
            <ProductCatalogGrid
              allProducts={allProducts}
              page={page}
              pageSize={PAGE_SIZE}
              basePath={basePath}
            />
          ) : (
            <p className="border-t border-ink/10 py-10 text-base text-ink/60">
              No {displayName} products are available right now. Check back soon.
            </p>
          )}

          <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-10 sm:flex-row sm:items-center">
            <p className="font-display text-lg italic text-ink/70">Keep exploring</p>
            <Link
              href="/shop"
              className="flex shrink-0 items-center gap-1.5 border border-ink px-4 py-2 text-[11px] font-semibold tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              SHOP ALL
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
