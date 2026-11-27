"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import ProductReviewsSection from "@/components/ProductReviewsSection";
import type { Product } from "@/components/ProductCard";
import { PRODUCT_DETAILS } from "@/data/productDetails";
import { useCart } from "@/context/CartContext";

type DetailItem = { title: string; content: string };

function getDetailItems(product: Product): DetailItem[] {
  const detail = PRODUCT_DETAILS[product.href];
  const desc = product.description.replace(/\.\.\.$/, "");

  return [
    {
      title: "Overview & description",
      content: detail?.overview ?? desc,
    },
    {
      title: "Key benefits",
      content: detail?.keyBenefits ?? "Contact the store to confirm the specific benefits of this product.",
    },
    {
      title: "Ingredients / product details",
      content: detail?.ingredients ?? "Contact the store for the full ingredient list of this product.",
    },
    {
      title: "How to use",
      content:
        detail?.howToUse ?? "Contact the store for directions on how to use this product correctly.",
    },
    {
      title: "Product specifications",
      content:
        detail?.specifications ?? `Brand: ${product.brand}. Contact the store for size and formula details.`,
    },
    {
      title: "Customer reviews",
      content: detail?.reviews ?? "No reviews have been published for this product.",
    },
    {
      title: "FAQs",
      content:
        detail?.faqs ?? "Need help choosing? Our team can assist with questions about this product.",
    },
  ];
}

function DetailList({ items }: { items: DetailItem[] }) {
  return (
    <div className="border-t border-ink/10">
      {items.map((item) => (
        <div key={item.title} className="border-b border-ink/10 py-5">
          <h3 className="text-base text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.content}</p>
        </div>
      ))}
    </div>
  );
}

function getDetailImage(image: string): string {
  const match = image.match(/\/products\/(\d+)-/);
  if (!match) return image;
  // Cache-bust with the catalog image's own filename, so swapping a
  // product's photo (which changes `image`) also busts the browser's
  // cached copy of the derived zoom image, without renaming files.
  return `/products/${match[1]}-zoom.png?v=${encodeURIComponent(image)}`;
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const detailItems = getDetailItems(product);
  const [detailImage, setDetailImage] = useState(() => getDetailImage(product.image));

  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1800px] px-6 pt-6 sm:px-10">
        <nav className="text-xs text-ink/50">
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          {" / "}
          <Link href="/shop" className="hover:text-gold">
            Shop All
          </Link>
          {" / "}
          <span className="text-ink">DR DESTA SELECTION</span>
        </nav>
      </div>

      {/* Hero — image left, info right */}
      <div className="mx-auto max-w-[1800px] px-6 py-10 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Product image */}
          <div>
            <div className="relative aspect-square w-full overflow-hidden bg-white">
              <Image
                src={detailImage}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                quality={95}
                className="object-contain"
                priority
                onError={() => setDetailImage(product.image)}
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold tracking-[0.3em] text-gold">
              {product.brand}
            </p>
            <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-ink/60">
              {product.description.replace(/\.\.\.$/, "")}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-2xl font-semibold text-ink">
                {product.price}
              </span>
              {product.oldPrice && (
                <span className="text-base text-ink/40 line-through">
                  {product.oldPrice}
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-ink/50">In stock</p>

            {/* Qty + Add to cart */}
            <div className="mt-6 flex gap-3">
              <div className="flex items-center border border-ink/20">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-3 text-ink/50 transition-colors hover:text-ink"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm text-ink">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-3 text-ink/50 transition-colors hover:text-ink"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                type="button"
                onClick={() =>
                  addItem(
                    {
                      href: product.href,
                      name: product.name,
                      brand: product.brand,
                      price: product.price,
                      image: product.image,
                    },
                    qty
                  )
                }
                className="flex-1 bg-ink py-3 text-xs font-semibold tracking-[0.2em] text-cream transition-opacity hover:opacity-80"
              >
                ADD TO CART
              </button>
            </div>

            <div className="mt-6 space-y-1 border-t border-ink/10 pt-6 text-xs text-ink/40">
              <p>Delivery charges are confirmed after your address is entered.</p>
              <p>
                Questions about this product?{" "}
                <Link href="/contact" className="underline hover:text-ink">
                  Contact our team.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* A CLOSER LOOK */}
      <Reveal className="border-t border-ink/10">
        <div className="mx-auto max-w-[1800px] px-6 py-16 sm:px-10 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-ink/40">
                A CLOSER LOOK
              </p>
              <h2 className="mt-6 font-display text-3xl italic leading-snug text-ink sm:text-4xl">
                Considered care.
                <br />
                The details that matter.
              </h2>
            </div>
            <div>
              <DetailList items={detailItems} />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Description / Reviews */}
      <div className="border-t border-ink/10 py-16 lg:py-20">
        <ProductReviewsSection
          productName={product.name}
          description={product.description.replace(/\.\.\.$/, "")}
        />
      </div>

      {/* You may also like */}
      <div className="border-t border-ink/10 bg-cream">
        <div className="mx-auto max-w-[1800px] px-6 pb-20 pt-16 sm:px-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-gold">
                THE REST OF YOUR ROUTINE
              </p>
              <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
                You may also like.
              </h2>
            </div>
            <Link
              href="/shop"
              className="flex shrink-0 items-center gap-1.5 border border-ink px-4 py-2 text-[11px] font-semibold tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              VIEW ALL →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.href} product={p} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
