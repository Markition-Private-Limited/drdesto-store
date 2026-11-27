import Image from "next/image";
import Link from "next/link";

const BRANDS = [
  { name: "CeraVe", href: "/brand/cerave" },
  { name: "Anua", href: "/brand/anua" },
  { name: "The Ordinary", href: "/brand/the-ordinary" },
  { name: "Eucerin", href: "/brand/eucerin" },
  { name: "Mielle", href: "/brand/mielle" },
  { name: "Shiseido", href: "/brand/shiseido" },
];

export default function BrandCollectionSection() {
  return (
    <section className="bg-cream pb-20">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10">
        <div className="border-t border-ink/10 pt-16">
          <p className="text-xs font-semibold tracking-[0.3em] text-gold">
            FAMILIAR NAMES. FRESH DISCOVERIES.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-x-2 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:justify-start sm:gap-x-36">
            {BRANDS.map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border border-ink/10 bg-white/40 px-2.5 py-1.5 font-display text-sm font-medium text-ink shadow-sm backdrop-blur-sm transition-colors hover:border-gold/30 hover:bg-white/70 hover:text-gold sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-xl sm:shadow-none sm:backdrop-blur-none sm:hover:border-0 sm:hover:bg-transparent"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-[320px] w-full overflow-hidden lg:h-[480px]">
          <Image
            src="/sections/beauty-collection.jpg"
            alt="Dropper bottle, pump bottle and jar styled on stone with soft linen curtains"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center bg-[#ece6de] px-8 py-14 sm:px-14 lg:px-24">
          <p className="text-xs font-semibold tracking-[0.3em] text-gold">
            THE EVERYDAY BEAUTY COLLECTION
          </p>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Your beauty essentials, all in one place.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/60">
            From everyday skincare to haircare favorites, discover products for the routines you
            love.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex w-fit items-center bg-ink px-8 py-4 text-xs font-semibold tracking-[0.2em] text-cream transition-colors hover:bg-gold"
          >
            EXPLORE ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
}
