import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PRODUCTS } from "@/data/products";
import ProductDetailView from "./ProductDetailView";

function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.href === `/product/${slug}`) ?? null;
}

function getRelatedProducts(slug: string) {
  const product = getProductBySlug(slug);
  const others = PRODUCTS.filter((p) => p.href !== `/product/${slug}`);
  if (!product) return others.slice(0, 4);

  const related = others.filter((p) =>
    p.categories?.some((c) => product.categories?.includes(c))
  );
  const unrelated = others.filter(
    (p) => !p.categories?.some((c) => product.categories?.includes(c))
  );
  return [...related, ...unrelated].slice(0, 4);
}

export const instant = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.href.replace("/product/", ""),
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);

  return (
    <div className="flex min-h-full flex-col bg-white">
      <Navbar bg="white" />
      <main className="flex-1">
        <ProductDetailView product={product} relatedProducts={related} />
      </main>
      <Footer />
    </div>
  );
}
