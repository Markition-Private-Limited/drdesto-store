import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  { name: "Skincare", href: "/category/skincare", image: "/categories/all-skincare.png" },
  { name: "Haircare", href: "/category/haircare", image: "/categories/all-haircare.png" },
  { name: "Body care", href: "/category/body-care", image: "/categories/body-care.png" },
  { name: "Sunscreen", href: "/category/sunscreen", image: "/categories/sunscreens.png" },
  { name: "Face creams", href: "/category/skincare/face-creams", image: "/categories/face-creams.png" },
  {
    name: "Serums & treatments",
    href: "/category/skincare/serums-treatments",
    image: "/categories/serums-and-treatments.png",
  },
  {
    name: "Shampoos & conditioners",
    href: "/category/haircare/shampoos",
    image: "/categories/shampoos.png",
  },
  { name: "Facial oils", href: "/category/skincare/facial-oils", image: "/categories/facial-oils.png" },
];

export default function CategorySection() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-gold">
              FIND YOUR EVERYDAY
            </p>
            <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
              A little care for every part of you.
            </h2>
          </div>

          <Link
            href="/shop"
            className="flex shrink-0 items-center gap-1.5 border border-ink px-4 py-2 text-[11px] font-semibold tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            VIEW ALL
            <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group flex flex-col overflow-hidden border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-44 w-full overflow-hidden bg-white">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="px-4 py-5">
                <h3 className="break-words font-display text-xl text-ink sm:text-2xl">
                  {category.name}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.15em] text-gold">
                  SHOP CATEGORY
                  <ArrowUpRight size={13} strokeWidth={1.75} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
