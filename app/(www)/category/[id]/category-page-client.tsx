"use client";
import React, { use, useState, startTransition } from "react";
import { ShoppingCartDrawer } from "@/components/shopping-cart-drawer";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS, CATEGORY_METADATA } from "@/lib/data";
import Image from "next/image";
export function CategoryPageClient({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = use(params);
  const [priceFilter, setPriceFilter] = useState<
    "all" | "under-150" | "under-300" | "over-300"
  >("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">(
    "featured",
  );
  const meta = CATEGORY_METADATA[id] || CATEGORY_METADATA.all;
  const handlePriceFilterChange = (
    filter: "all" | "under-150" | "under-300" | "over-300",
  ) => {
    startTransition(() => {
      setPriceFilter(filter);
    });
  };

  const handleSortChange = (sort: "featured" | "price-low" | "price-high") => {
    startTransition(() => {
      setSortBy(sort);
    });
  };

  const categoryProducts =
    id === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === id);
  const filteredProducts = categoryProducts.filter((product) => {
    if (priceFilter === "under-150") return product.price < 150;
    if (priceFilter === "under-300") return product.price < 300;
    if (priceFilter === "over-300") return product.price >= 300;
    return true;
  });
  const sortedProducts = filteredProducts.toSorted((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });
  function pickPriceAll() {
    handlePriceFilterChange("all");
  }

  function pickPriceUnder150() {
    handlePriceFilterChange("under-150");
  }

  function pickPriceUnder300() {
    handlePriceFilterChange("under-300");
  }

  function pickPriceOver300() {
    handlePriceFilterChange("over-300");
  }

  function pickSortFeatured() {
    handleSortChange("featured");
  }

  function pickSortPriceLow() {
    handleSortChange("price-low");
  }

  function pickSortPriceHigh() {
    handleSortChange("price-high");
  }

  function resetCatalogFilters() {
    handlePriceFilterChange("all");
    handleSortChange("featured");
  }

  return (
    <div className="bg-background text-foreground relative flex w-full flex-col overflow-x-hidden font-sans transition-colors duration-500 select-none">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="from-muted/30 pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] via-transparent to-transparent" />
      </div>

      <div className="bg-card relative z-20 flex h-[520px] w-full shrink-0 items-center justify-center overflow-hidden">
        <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 z-15 h-8 bg-linear-to-t to-transparent opacity-30" />

        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="text-background pointer-events-none absolute bottom-0 left-0 z-25 h-10 w-full fill-current transition-colors duration-500"
        >
          <path d="M0,100 L1000,100 L1000,0 C750,80 250,80 0,0 Z" />
        </svg>

        <div className="pointer-events-none absolute inset-0 z-10 bg-black/20 dark:bg-black/35" />

        <Image
          src={meta.image}
          alt={meta.title}
          fill
          priority
          loading="eager"
          className="pointer-events-none object-cover select-none"
          sizes="100vw"
          style={{
            filter: "brightness(0.9) contrast(1.02)",
          }}
        />

        <div className="relative z-20 flex flex-col items-center px-6 text-center">
          <span className="font-mono text-[9px] tracking-[0.25em] text-white/95 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            {meta.tagline}
          </span>

          <h1 className="mt-3 font-sans text-4xl leading-none font-semibold tracking-[0.15em] text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:text-5xl lg:text-6xl">
            {meta.title}
          </h1>

          <p className="mt-5 max-w-[580px] border-t border-white/20 pt-4 font-mono text-[10px] leading-relaxed tracking-[0.2em] text-white/75 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            {meta.subtitle}
          </p>
        </div>
      </div>

      <p
        className="text-muted-foreground z-30 mx-auto w-full max-w-[1600px] px-4 pt-5 pb-0 text-center font-mono text-[9px] tracking-[0.22em] uppercase lg:hidden"
        role="note"
      >
        Price &amp; sort, next section
      </p>

      <div className="relative z-30 mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 gap-8 px-4 py-10 sm:px-8 lg:grid-cols-5 lg:gap-16 lg:px-16 lg:py-24">
        <div className="col-span-1 flex h-fit flex-col gap-6 select-none lg:sticky lg:top-32 lg:gap-12">
          <div className="border-border/40 border-b pb-4 lg:pb-5">
            <span className="text-muted-foreground/80 font-mono text-[9.5px] tracking-[0.25em] uppercase">
              CATALOG CAPACITY
            </span>
            <div className="text-foreground mt-1 font-sans text-[12.5px] font-semibold tracking-wider">
              [ {categoryProducts.length} PREMIUM PRODUCTS ]
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12">
            <div className="flex flex-col gap-2 sm:gap-3">
              <span className="text-muted-foreground/80 mb-1 font-mono text-[9px] tracking-[0.25em] uppercase">
                PRICE LIMITS
              </span>

              <button
                type="button"
                onClick={pickPriceAll}
                aria-pressed={priceFilter === "all"}
                className={`focus-visible:ring-ring/50 flex cursor-pointer items-center gap-2 py-1 text-left font-mono text-[10.5px] tracking-widest uppercase transition-all duration-300 focus-visible:ring-3 focus-visible:outline-none ${
                  priceFilter === "all"
                    ? "text-foreground translate-x-1 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {priceFilter === "all" && (
                  <span className="bg-foreground size-1 rounded-full" />
                )}
                ALL PRICE SPECTRUMS
              </button>

              <button
                type="button"
                onClick={pickPriceUnder150}
                className={`focus-visible:ring-ring/50 flex cursor-pointer items-center gap-2 py-1 text-left font-mono text-[10.5px] tracking-widest uppercase transition-all duration-300 focus-visible:ring-3 focus-visible:outline-none ${
                  priceFilter === "under-150"
                    ? "text-foreground translate-x-1 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {priceFilter === "under-150" && (
                  <span className="bg-foreground size-1 rounded-full" />
                )}
                UNDER $150
              </button>

              <button
                type="button"
                onClick={pickPriceUnder300}
                className={`focus-visible:ring-ring/50 flex cursor-pointer items-center gap-2 py-1 text-left font-mono text-[10.5px] tracking-widest uppercase transition-all duration-300 focus-visible:ring-3 focus-visible:outline-none ${
                  priceFilter === "under-300"
                    ? "text-foreground translate-x-1 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {priceFilter === "under-300" && (
                  <span className="bg-foreground size-1 rounded-full" />
                )}
                UNDER $300
              </button>

              <button
                type="button"
                onClick={pickPriceOver300}
                className={`focus-visible:ring-ring/50 flex cursor-pointer items-center gap-2 py-1 text-left font-mono text-[10.5px] tracking-widest uppercase transition-all duration-300 focus-visible:ring-3 focus-visible:outline-none ${
                  priceFilter === "over-300"
                    ? "text-foreground translate-x-1 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {priceFilter === "over-300" && (
                  <span className="bg-foreground size-1 rounded-full" />
                )}
                OVER $300
              </button>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
              <span className="text-muted-foreground/80 mb-1 font-mono text-[9px] tracking-[0.25em] uppercase">
                CHRONOLOGY SORT
              </span>

              <button
                type="button"
                onClick={pickSortFeatured}
                aria-pressed={sortBy === "featured"}
                className={`focus-visible:ring-ring/50 flex cursor-pointer items-center gap-2 py-1 text-left font-mono text-[10.5px] tracking-widest uppercase transition-all duration-300 focus-visible:ring-3 focus-visible:outline-none ${
                  sortBy === "featured"
                    ? "text-foreground translate-x-1 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {sortBy === "featured" && (
                  <span className="bg-foreground size-1 rounded-full" />
                )}
                DEFAULT FEATURED
              </button>

              <button
                type="button"
                onClick={pickSortPriceLow}
                className={`focus-visible:ring-ring/50 flex cursor-pointer items-center gap-2 py-1 text-left font-mono text-[10.5px] tracking-widest uppercase transition-all duration-300 focus-visible:ring-3 focus-visible:outline-none ${
                  sortBy === "price-low"
                    ? "text-foreground translate-x-1 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {sortBy === "price-low" && (
                  <span className="bg-foreground size-1 rounded-full" />
                )}
                PRICE: LOW TO HIGH
              </button>

              <button
                type="button"
                onClick={pickSortPriceHigh}
                className={`focus-visible:ring-ring/50 flex cursor-pointer items-center gap-2 py-1 text-left font-mono text-[10.5px] tracking-widest uppercase transition-all duration-300 focus-visible:ring-3 focus-visible:outline-none ${
                  sortBy === "price-high"
                    ? "text-foreground translate-x-1 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {sortBy === "price-high" && (
                  <span className="bg-foreground size-1 rounded-full" />
                )}
                PRICE: HIGH TO LOW
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex min-h-0 flex-col gap-8 lg:col-span-4 lg:gap-10">
          {sortedProducts.length === 0 ? (
            <div className="border-border/40 flex w-full flex-col items-center justify-center border border-dashed py-20">
              <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                NO PRODUCTS MATCH THE SELECTED FILTERS.
              </span>
              <button
                type="button"
                onClick={resetCatalogFilters}
                className="text-foreground mt-4 cursor-pointer font-mono text-[9px] tracking-widest uppercase hover:underline"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categoryId={id}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ShoppingCartDrawer />
    </div>
  );
}
