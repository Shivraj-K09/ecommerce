"use client";
import React, { useState, startTransition } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { PRODUCTS, Product } from "@/lib/data";
import { FlagshipCard } from "@/components/flagship-card";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import { useIdleMount } from "@/hooks/use-idle-mount";

const ShoppingCartDrawer = dynamic(
  () =>
    import("@/components/shopping-cart-drawer").then(
      (module) => module.ShoppingCartDrawer,
    ),
  { ssr: false },
);

const HomeProductRails = dynamic(
  () =>
    import("./home-product-rails").then((module) => module.HomeProductRails),
  { ssr: false },
);
export function HomePage() {
  const { push } = useRouter();
  const addToCart = useStore((state) => state.addToCart);
  const showProductRails = useIdleMount();
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);
  const [flagshipIds] = useState<string[]>([
    "headphones",
    "keyboard",
    "carafe",
    "incense",
  ]);
  const handleAddDirect = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.colors[0]?.name);
    toast.success("ADDED TO BAG", {
      description: `${product.name} is now in your shopping bag.`,
    });
    startTransition(() => {
      push("/cart");
    });
  };

  const activeFlagshipProducts = flagshipIds.map(
    (id) => PRODUCTS.find((p) => p.id === id) || PRODUCTS[0],
  );
  const audioProducts = PRODUCTS.filter((p) => p.category === "electronics");
  const livingProducts = PRODUCTS.filter((p) => p.category === "living");
  const writingProducts = PRODUCTS.filter((p) => p.category === "writing");
  const wellnessProducts = PRODUCTS.filter((p) => p.category === "wellness");
  function exploreElectronics() {
    startTransition(() => {
      push("/category/electronics");
    });
  }

  function exploreLiving() {
    startTransition(() => {
      push("/category/living");
    });
  }

  function exploreWriting() {
    startTransition(() => {
      push("/category/writing");
    });
  }

  function exploreWellness() {
    startTransition(() => {
      push("/category/wellness");
    });
  }

  return (
    <div className="bg-background text-foreground relative flex w-full flex-col overflow-x-hidden font-sans transition-colors duration-500 select-none">
      <h1 className="sr-only">AURA: Curated everyday objects</h1>
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="from-muted/30 pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] via-transparent to-transparent" />
      </div>

      <section
        aria-label="Featured collections"
        className="border-border bg-card relative z-20 mt-5 flex h-[74vh] min-h-[580px] w-full min-w-0 flex-col border-y md:flex-row md:items-stretch"
      >
        {activeFlagshipProducts.map((product, idx) => (
          <FlagshipCard
            key={product.id}
            product={product}
            idx={idx}
            hoveredPanel={hoveredPanel}
            setHoveredPanel={setHoveredPanel}
            handleAddDirect={handleAddDirect}
          />
        ))}
      </section>

      <section
        className="home-product-rails relative z-20 flex w-full flex-col gap-28 px-6 py-24 md:px-12"
        aria-label="Product collections"
      >
        {showProductRails ? (
          <HomeProductRails
            audioProducts={audioProducts}
            livingProducts={livingProducts}
            writingProducts={writingProducts}
            wellnessProducts={wellnessProducts}
            onExploreElectronics={exploreElectronics}
            onExploreLiving={exploreLiving}
            onExploreWriting={exploreWriting}
            onExploreWellness={exploreWellness}
          />
        ) : (
          <div
            className="text-muted-foreground py-8 text-center font-mono text-[10px] tracking-[0.2em] uppercase"
            aria-hidden="true"
          >
            Loading collections
          </div>
        )}
      </section>

      <ShoppingCartDrawer />
    </div>
  );
}
