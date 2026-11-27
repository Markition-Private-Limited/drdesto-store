"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import SearchOverlay from "@/components/SearchOverlay";

const LEFT_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "Skincare", href: "/category/skincare" },
  { label: "Haircare", href: "/category/haircare" },
  { label: "Body Care", href: "/category/body-care" },
];

const RIGHT_LINKS = [
  { label: "Sunscreen", href: "/category/sunscreen" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Offers", href: "/offers" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

type MegaMenuColumn = {
  header: string;
  links: { label: string; href: string }[];
};

type MegaMenu = {
  columns: MegaMenuColumn[];
  image: string;
  imageAlt: string;
};

const MEGA_MENUS: Record<string, MegaMenu> = {
  Skincare: {
    columns: [
      {
        header: "SHOP SKINCARE",
        links: [
          { label: "All Skincare", href: "/category/skincare" },
          { label: "Cleansers", href: "/category/skincare/cleansers" },
          { label: "Face Creams", href: "/category/skincare/face-creams" },
          { label: "Serums & Treatments", href: "/category/skincare/serums-treatments" },
        ],
      },
      {
        header: "COMPLETE YOUR ROUTINE",
        links: [
          { label: "Facial Oils", href: "/category/skincare/facial-oils" },
          { label: "Sunscreens", href: "/category/sunscreen" },
          { label: "Masks & Exfoliants", href: "/category/skincare/masks-exfoliants" },
        ],
      },
    ],
    image: "/nav/skincare-menu.jpg",
    imageAlt: "Woman with glowing skin touching her cheek",
  },
  Haircare: {
    columns: [
      {
        header: "SHOP HAIRCARE",
        links: [
          { label: "All Haircare", href: "/category/haircare" },
          { label: "Shampoos", href: "/category/haircare/shampoos" },
          { label: "Conditioners", href: "/category/haircare/conditioners" },
          { label: "Hair Oils", href: "/category/haircare/hair-oils" },
        ],
      },
      {
        header: "MORE CARE",
        links: [
          { label: "Hair Masks & Treatments", href: "/category/haircare/masks-treatments" },
          { label: "Hair Growth Products", href: "/category/haircare/growth-products" },
        ],
      },
    ],
    image: "/nav/haircare-menu.jpg",
    imageAlt: "Woman with long wavy hair looking over her shoulder",
  },
  "Body Care": {
    columns: [
      {
        header: "SHOP BODY CARE",
        links: [
          { label: "Body Care", href: "/category/body-care" },
          { label: "Body Lotions", href: "/category/body-care/body-lotions" },
          { label: "Body Creams", href: "/category/body-care/body-creams" },
          { label: "Soaps & Cleansers", href: "/category/body-care/soaps-cleansers" },
        ],
      },
    ],
    image: "/nav/bodycare-menu.jpg",
    imageAlt: "Dropper bottle, pump bottle and jar styled on stone",
  },
};

type NavbarProps = {
  /** Renders the nav row with a transparent background so it can float over a hero image. */
  transparent?: boolean;
  /** Background color of the header/nav row when not transparent. Defaults to cream. */
  bg?: "cream" | "white";
};

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className={`fixed inset-0 z-[200] lg:hidden ${open ? "" : "pointer-events-none"}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-[360px] overflow-y-auto bg-cream shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <p className="text-xs font-semibold tracking-[0.3em] text-gold">MENU</p>
          <button type="button" onClick={onClose} aria-label="Close menu" className="text-ink">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <ul className="px-6 py-4">
          {ALL_LINKS.map((link) => {
            const menu = MEGA_MENUS[link.label];
            const isExpanded = expanded === link.label;
            return (
              <li key={link.href} className="border-b border-ink/10">
                {menu ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setExpanded(isExpanded ? null : link.label)}
                      className="flex w-full items-center justify-between py-4 text-left text-base text-ink"
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        strokeWidth={1.5}
                        className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="pb-4 pl-4">
                        {menu.columns.map((col) => (
                          <div key={col.header} className="mb-4">
                            <p className="text-[11px] font-semibold tracking-[0.2em] text-ink/40">
                              {col.header}
                            </p>
                            <ul className="mt-2 space-y-3">
                              {col.links.map((l) => (
                                <li key={l.href}>
                                  <Link
                                    href={l.href}
                                    onClick={onClose}
                                    className="text-sm text-ink/80 hover:text-gold"
                                  >
                                    {l.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-4 text-base text-ink hover:text-gold"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function Navbar({ transparent = false, bg = "cream" }: NavbarProps) {
  const bgClass = bg === "white" ? "bg-white" : "bg-cream";
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { totalCount } = useCart();

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenuNow = (label: string | null) => {
    clearCloseTimer();
    setIsClosing(false);
    setOpenMenu(label);
  };

  const closeMenu = () => {
    if (!openMenu) return;
    clearCloseTimer();
    setIsClosing(true);
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
      setIsClosing(false);
    }, 180);
  };

  const activeMenu = openMenu ? MEGA_MENUS[openMenu] : null;

  return (
    <header
      className={
        transparent
          ? "absolute inset-x-0 top-0 z-50"
          : `relative z-50 border-b border-ink/10 ${bgClass}`
      }
    >
      {activeMenu && (
        <div
          className={
            "fixed inset-0 z-30 bg-ink/10 backdrop-blur-md transition-opacity duration-200 " +
            (isClosing ? "opacity-0" : "opacity-100")
          }
          onClick={closeMenu}
        />
      )}

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <div className="relative z-50" onMouseLeave={closeMenu}>
        <div className="relative z-50 bg-ink">
        <div className="relative mx-auto flex max-w-[1800px] items-center justify-center px-4 py-2.5 sm:px-10">
          <p className="truncate px-20 text-center text-[11px] text-cream/90 sm:px-0 sm:text-xs">
            Discover beauty essentials for your everyday routine.
          </p>
          <div className="absolute right-4 flex items-center gap-4 text-cream sm:right-10 sm:gap-5">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="transition-colors hover:text-gold"
            >
              <Search size={16} strokeWidth={1.5} />
            </button>
            <button aria-label="Account" className="hidden transition-colors hover:text-gold sm:block">
              <User size={16} strokeWidth={1.5} />
            </button>
            <Link
              href="/cart"
              aria-label="Cart"
              className="flex items-center gap-1 transition-colors hover:text-gold"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              <span className="text-[11px] text-gold">{totalCount}</span>
            </Link>
          </div>
        </div>
      </div>

      <nav
        className={
          "relative z-50 " +
          (transparent
            ? "border-b border-white/15 bg-white/12 backdrop-blur-md"
            : bgClass)
        }
      >
        <ul className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-2.5 text-sm font-medium text-ink sm:px-10">
          <li className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="text-ink"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </li>

          {LEFT_LINKS.map((link, i) => {
            const menu = MEGA_MENUS[link.label];
            return (
              <li
                key={link.href}
                className="hidden lg:block"
                onMouseEnter={() => (menu ? openMenuNow(link.label) : closeMenu())}
              >
                <Link
                  href={link.href}
                  className={
                    (i === 0 ? "" : "text-ink/80 ") +
                    "transition-colors hover:text-gold" +
                    (openMenu === link.label ? " text-gold" : "")
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}

          <li onMouseEnter={closeMenu}>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Dr Desta Store — Cosmetic and Beauty"
                width={819}
                height={933}
                priority
                className="h-12 w-auto object-contain sm:h-16 lg:h-20"
              />
            </Link>
          </li>

          {RIGHT_LINKS.map((link) => (
            <li key={link.href} className="hidden lg:block" onMouseEnter={closeMenu}>
              <Link href={link.href} className="text-ink/80 transition-colors hover:text-gold">
                {link.label}
              </Link>
            </li>
          ))}

          {/* Spacer to balance the hamburger button on mobile, keeping the logo centered */}
          <li className="lg:hidden" aria-hidden="true">
            <span className="inline-block h-[22px] w-[22px]" />
          </li>
        </ul>

        {!transparent && <div className="mx-6 border-t border-ink/10 sm:mx-10" />}

        {activeMenu && (
          <div
            key={openMenu}
            className={
              (isClosing ? "animate-dropdown-fall" : "animate-dropdown-rise") +
              " absolute inset-x-0 top-full hidden border-t border-ink/10 bg-cream shadow-xl lg:block"
            }
          >
            <div className="relative mx-auto flex max-w-[1800px] justify-between gap-10 px-6 py-9 sm:px-10 lg:px-24">
              <div className="flex gap-16">
                {activeMenu.columns.map((col) => (
                  <div key={col.header} className="w-[230px] shrink-0">
                    <p className="text-xs font-semibold tracking-[0.25em] text-gold">
                      {col.header}
                    </p>
                    <ul className="mt-5 space-y-4">
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={closeMenu}
                            className="text-base text-ink/90 transition-colors hover:text-gold"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="relative h-[260px] w-[340px] shrink-0 overflow-hidden">
                <Image
                  src={activeMenu.image}
                  alt={activeMenu.imageAlt}
                  fill
                  sizes="340px"
                  className="object-cover"
                />
              </div>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="absolute bottom-5 right-6 flex h-9 w-9 items-center justify-center text-ink/60 transition-colors hover:text-ink sm:right-10 lg:right-24"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}
      </nav>
      </div>
    </header>
  );
}
