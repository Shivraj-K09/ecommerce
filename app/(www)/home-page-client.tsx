"use client";
import React, { useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { PRODUCTS, Product } from "@/lib/data";
import { FlagshipCard } from "@/components/flagship-card";
import { ShoppingCartDrawer } from "@/components/shopping-cart-drawer";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import {
  IconArrowUpRight,
  IconCpu,
  IconHome,
  IconPencil,
  IconActivity,
} from "@tabler/icons-react";
export function HomePage() {
  const { push } = useRouter();
  const addToCart = useStore((state) => state.addToCart);
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

      <section className="relative z-20 flex w-full flex-col gap-28 px-6 py-24 md:px-12">
        <div className="flex flex-col gap-8">
          <div className="flex items-end justify-between border-b border-zinc-200 pb-5 dark:border-zinc-800/80">
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center gap-2">
                <IconCpu className="size-4 text-zinc-400 dark:text-zinc-600" />
                <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-zinc-400 uppercase dark:text-zinc-500">
                  [ SPECTRUM 01 / ACOUSTICS & CYBERNETICS ]
                </span>
              </div>
              <h2 className="font-sans text-xl font-medium tracking-wider uppercase md:text-2xl">
                Audio & Tech
              </h2>
            </div>
            <button
              type="button"
              onClick={exploreElectronics}
              className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 font-mono text-[9.5px] tracking-widest uppercase transition-colors"
            >
              EXPLORE INDEX <IconArrowUpRight className="size-3.5" />
            </button>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
            {audioProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryId="electronics"
                disableTransitionNames={true}
                className="mx-auto w-full max-w-[420px]"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-end justify-between border-b border-zinc-200 pb-5 dark:border-zinc-800/80">
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center gap-2">
                <IconHome className="size-4 text-zinc-400 dark:text-zinc-600" />
                <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-zinc-400 uppercase dark:text-zinc-500">
                  [ SPECTRUM 02 / ORGANIC SPATIAL ALIGNMENT ]
                </span>
              </div>
              <h2 className="font-sans text-xl font-medium tracking-wider uppercase md:text-2xl">
                Home & Living
              </h2>
            </div>
            <button
              type="button"
              onClick={exploreLiving}
              className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 font-mono text-[9.5px] tracking-widest uppercase transition-colors"
            >
              EXPLORE INDEX <IconArrowUpRight className="size-3.5" />
            </button>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
            {livingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryId="living"
                disableTransitionNames={true}
                className="mx-auto w-full max-w-[420px]"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-end justify-between border-b border-zinc-200 pb-5 dark:border-zinc-800/80">
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center gap-2">
                <IconPencil className="size-4 text-zinc-400 dark:text-zinc-600" />
                <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-zinc-400 uppercase dark:text-zinc-500">
                  [ SPECTRUM 03 / TACTILE INSTRUMENTS & DRAFTS ]
                </span>
              </div>
              <h2 className="font-sans text-xl font-medium tracking-wider uppercase md:text-2xl">
                Tactile Writing
              </h2>
            </div>
            <button
              type="button"
              onClick={exploreWriting}
              className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 font-mono text-[9.5px] tracking-widest uppercase transition-colors"
            >
              EXPLORE INDEX <IconArrowUpRight className="size-3.5" />
            </button>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
            {writingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryId="writing"
                disableTransitionNames={true}
                className="mx-auto w-full max-w-[420px]"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-end justify-between border-b border-zinc-200 pb-5 dark:border-zinc-800/80">
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center gap-2">
                <IconActivity className="size-4 text-zinc-400 dark:text-zinc-600" />
                <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-zinc-400 uppercase dark:text-zinc-500">
                  [ SPECTRUM 04 / SENSORY CALM & BOTANICAL AURA ]
                </span>
              </div>
              <h2 className="font-sans text-xl font-medium tracking-wider uppercase md:text-2xl">
                Wellness & Aroma
              </h2>
            </div>
            <button
              type="button"
              onClick={exploreWellness}
              className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 font-mono text-[9.5px] tracking-widest uppercase transition-colors"
            >
              EXPLORE INDEX <IconArrowUpRight className="size-3.5" />
            </button>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
            {wellnessProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryId="wellness"
                disableTransitionNames={true}
                className="mx-auto w-full max-w-[420px]"
              />
            ))}
          </div>
        </div>
      </section>

      <ShoppingCartDrawer />
    </div>
  );
}
