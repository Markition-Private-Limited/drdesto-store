"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useCart } from "@/context/CartContext";

export type Product = {
  name: string;
  brand: string;
  description: string;
  price: string;
  oldPrice: string;
  image: string;
  href: string;
  available?: boolean;
  categories?: string[];
};

type ProductCardProps = {
  product: Product;
  delay?: number;
};

export default function ProductCard({ product, delay = 0 }: ProductCardProps) {
  const available = product.available ?? true;
  const { addItem } = useCart();

  return (
    <Reveal delay={delay} className="h-full">
      <div className="group flex h-full flex-col bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={product.href} className="relative block bg-white">
        <span className="absolute left-3 top-3 z-10 bg-cream px-2 py-1 text-[10px] font-semibold tracking-[0.1em] text-gold">
          SALE
        </span>
        <div className="relative h-40 w-full overflow-hidden sm:h-60">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <p className="line-clamp-1 text-[11px] font-semibold tracking-[0.15em] text-ink/50">
          {product.brand}
        </p>
        <Link href={product.href}>
          <h3 className="mt-1.5 line-clamp-1 text-base text-ink transition-colors hover:text-gold">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-1 text-sm text-ink/50 sm:mt-6">{product.description}</p>

        {available ? (
          <div className="mt-1.5 flex items-center gap-3">
            <span className="text-sm font-semibold text-ink">{product.price}</span>
            <span className="text-sm text-ink/35 line-through">{product.oldPrice}</span>
          </div>
        ) : (
          <div className="mt-1.5">
            <span className="text-sm text-ink/40">Currently unavailable</span>
          </div>
        )}

        {available ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(
                {
                  href: product.href,
                  name: product.name,
                  brand: product.brand,
                  price: product.price,
                  image: product.image,
                },
                1
              );
            }}
            className="mt-1.5 w-full border border-ink py-2.5 text-[11px] font-semibold tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            ADD TO CART
          </button>
        ) : (
          <Link
            href={product.href}
            className="mt-1.5 block w-full border border-ink py-2.5 text-center text-[11px] font-semibold tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            VIEW PRODUCT
          </Link>
        )}
      </div>
      </div>
    </Reveal>
  );
}
