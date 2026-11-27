import Image from "next/image";
import Link from "next/link";

const SHOP_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "All Skincare", href: "/category/skincare" },
  { label: "All Haircare", href: "/category/haircare" },
  { label: "Body Care", href: "/category/body-care" },
  { label: "Sunscreens", href: "/category/sunscreens" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Special Offers", href: "/offers" },
];

const CUSTOMER_CARE_LINKS = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "Track Your Order", href: "/track-order" },
];

const ABOUT_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: "/icons/facebook.png", size: 44 },
  { label: "Instagram", href: "https://instagram.com", icon: "/icons/instagram.png", size: 32 },
  { label: "TikTok", href: "https://tiktok.com", icon: "/icons/tiktok.png", size: 32 },
];

export default function Footer() {
  return (
    <footer className="bg-[#30251d] text-cream">
      <div className="mx-auto max-w-[1800px] px-6 pt-16 pb-8 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-cream/60">DR DESTA STORE</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">
              Good care.
              <br />
              Beautifully simple.
            </h2>
            <div className="mt-10 space-y-1 text-sm text-cream/70">
              <p>+971 50 858 8350</p>
              <p>Destamohammed23@gmail.com</p>
              <p>Ajman Al Karama, United Arab Emirates</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-cream/60">SHOP</p>
            <ul className="mt-6 space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-cream/60">CUSTOMER CARE</p>
            <ul className="mt-6 space-y-3">
              {CUSTOMER_CARE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-cream/60">ABOUT</p>
            <ul className="mt-6 space-y-3">
              {ABOUT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-cream/60">© 2026 Dr Desta Store. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={link.size}
                  height={link.size}
                  style={{ width: link.size, height: link.size }}
                  className="object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
