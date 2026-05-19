"use client";
import React, { use, useState, useEffect, startTransition, } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCartDrawer } from "@/components/shopping-cart-drawer";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS, CATEGORY_METADATA } from "@/lib/data";
import Image from "next/image";
export default function CategoryPage({ params, }: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = use(params);
    const router = useRouter();
    const [priceFilter, setPriceFilter] = useState<"all" | "under-150" | "under-300" | "over-300">("all");
    const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">("featured");
    useEffect(() => {
        if (id === "all") {
            router.replace("/");
        }
    }, [id, router]);
    const meta = CATEGORY_METADATA[id] || CATEGORY_METADATA.all;
    const handlePriceFilterChange = (filter: "all" | "under-150" | "under-300" | "over-300") => {
        startTransition(() => {
            setPriceFilter(filter);
        });
    };
    const handleSortChange = (sort: "featured" | "price-low" | "price-high") => {
        startTransition(() => {
            setSortBy(sort);
        });
    };
    const categoryProducts = id === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === id);
    const filteredProducts = categoryProducts.filter((product) => {
        if (priceFilter === "under-150")
            return product.price < 150;
        if (priceFilter === "under-300")
            return product.price < 300;
        if (priceFilter === "over-300")
            return product.price >= 300;
        return true;
    });
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "price-low")
            return a.price - b.price;
        if (sortBy === "price-high")
            return b.price - a.price;
        return 0;
    });
    return (<div className="relative w-full bg-background text-foreground overflow-x-hidden font-sans select-none transition-colors duration-500 flex flex-col">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-muted/30 via-transparent to-transparent pointer-events-none"/>
      </div>

      
      <div className="relative w-full h-[520px] shrink-0 overflow-hidden bg-card z-20 flex items-center justify-center">
        
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent opacity-30 z-15 pointer-events-none"/>

        
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-10 text-background fill-current z-25 pointer-events-none transition-colors duration-500">
          <path d="M0,100 L1000,100 L1000,0 C750,80 250,80 0,0 Z"/>
        </svg>

        
        <div className="absolute inset-0 bg-black/20 dark:bg-black/35 z-10 pointer-events-none"/>

        
        <Image src={meta.image} alt={meta.title} fill priority className="object-cover select-none pointer-events-none" sizes="100vw" style={{
            filter: "brightness(0.9) contrast(1.02)",
        }}/>

        
        <div className="z-20 relative flex flex-col items-center text-center px-6">
          <span className="font-mono text-[9px] tracking-[0.25em] text-white/95 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            {meta.tagline}
          </span>

          <h1 className="font-sans font-semibold text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.15em] text-white mt-3 leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {meta.title}
          </h1>

          <p className="font-mono text-[10px] tracking-[0.2em] text-white/75 uppercase max-w-[580px] leading-relaxed mt-5 border-t border-white/20 pt-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            {meta.subtitle}
          </p>
        </div>
      </div>

      
      <p className="z-30 mx-auto w-full max-w-[1600px] px-4 pt-5 pb-0 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground lg:hidden" role="note">
        Price &amp; sort — next section
      </p>

      
      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-10 lg:py-24 z-30 flex-1 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
        
        <div className="col-span-1 flex flex-col gap-6 lg:gap-12 lg:sticky lg:top-32 h-fit select-none">
          
          <div className="border-b border-border/40 pb-4 lg:pb-5">
            <span className="font-mono text-[9.5px] tracking-[0.25em] text-muted-foreground/80 uppercase">
              CATALOG CAPACITY
            </span>
            <div className="font-sans text-[12.5px] tracking-wider text-foreground font-semibold mt-1">
              [ {categoryProducts.length} PREMIUM PRODUCTS ]
            </div>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 lg:gap-12">
          
          <div className="flex flex-col gap-2 sm:gap-3">
            <span className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground/80 uppercase mb-1">
              PRICE LIMITS
            </span>

            <button type="button" onClick={() => handlePriceFilterChange("all")} className={`font-mono text-[10.5px] tracking-widest uppercase text-left transition-all duration-300 py-1 cursor-pointer flex items-center gap-2 focus:outline-none ${priceFilter === "all"
            ? "text-foreground font-semibold translate-x-1"
            : "text-muted-foreground hover:text-foreground"}`}>
              {priceFilter === "all" && (<span className="w-1 h-1 rounded-full bg-foreground"/>)}
              ALL PRICE SPECTRUMS
            </button>

            <button type="button" onClick={() => handlePriceFilterChange("under-150")} className={`font-mono text-[10.5px] tracking-widest uppercase text-left transition-all duration-300 py-1 cursor-pointer flex items-center gap-2 focus:outline-none ${priceFilter === "under-150"
            ? "text-foreground font-semibold translate-x-1"
            : "text-muted-foreground hover:text-foreground"}`}>
              {priceFilter === "under-150" && (<span className="w-1 h-1 rounded-full bg-foreground"/>)}
              UNDER $150
            </button>

            <button type="button" onClick={() => handlePriceFilterChange("under-300")} className={`font-mono text-[10.5px] tracking-widest uppercase text-left transition-all duration-300 py-1 cursor-pointer flex items-center gap-2 focus:outline-none ${priceFilter === "under-300"
            ? "text-foreground font-semibold translate-x-1"
            : "text-muted-foreground hover:text-foreground"}`}>
              {priceFilter === "under-300" && (<span className="w-1 h-1 rounded-full bg-foreground"/>)}
              UNDER $300
            </button>

            <button type="button" onClick={() => handlePriceFilterChange("over-300")} className={`font-mono text-[10.5px] tracking-widest uppercase text-left transition-all duration-300 py-1 cursor-pointer flex items-center gap-2 focus:outline-none ${priceFilter === "over-300"
            ? "text-foreground font-semibold translate-x-1"
            : "text-muted-foreground hover:text-foreground"}`}>
              {priceFilter === "over-300" && (<span className="w-1 h-1 rounded-full bg-foreground"/>)}
              OVER $300
            </button>
          </div>

          
          <div className="flex flex-col gap-2 sm:gap-3">
            <span className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground/80 uppercase mb-1">
              CHRONOLOGY SORT
            </span>

            <button type="button" onClick={() => handleSortChange("featured")} className={`font-mono text-[10.5px] tracking-widest uppercase text-left transition-all duration-300 py-1 cursor-pointer flex items-center gap-2 focus:outline-none ${sortBy === "featured"
            ? "text-foreground font-semibold translate-x-1"
            : "text-muted-foreground hover:text-foreground"}`}>
              {sortBy === "featured" && (<span className="w-1 h-1 rounded-full bg-foreground"/>)}
              DEFAULT FEATURED
            </button>

            <button type="button" onClick={() => handleSortChange("price-low")} className={`font-mono text-[10.5px] tracking-widest uppercase text-left transition-all duration-300 py-1 cursor-pointer flex items-center gap-2 focus:outline-none ${sortBy === "price-low"
            ? "text-foreground font-semibold translate-x-1"
            : "text-muted-foreground hover:text-foreground"}`}>
              {sortBy === "price-low" && (<span className="w-1 h-1 rounded-full bg-foreground"/>)}
              PRICE: LOW TO HIGH
            </button>

            <button type="button" onClick={() => handleSortChange("price-high")} className={`font-mono text-[10.5px] tracking-widest uppercase text-left transition-all duration-300 py-1 cursor-pointer flex items-center gap-2 focus:outline-none ${sortBy === "price-high"
            ? "text-foreground font-semibold translate-x-1"
            : "text-muted-foreground hover:text-foreground"}`}>
              {sortBy === "price-high" && (<span className="w-1 h-1 rounded-full bg-foreground"/>)}
              PRICE: HIGH TO LOW
            </button>
          </div>
          </div>
        </div>

        
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-8 lg:gap-10 min-h-0">
          {sortedProducts.length === 0 ? (<div className="w-full py-20 flex flex-col items-center justify-center border border-dashed border-border/40">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                NO PRODUCTS MATCH THE SELECTED FILTERS.
              </span>
              <button type="button" onClick={() => {
                handlePriceFilterChange("all");
                handleSortChange("featured");
            }} className="mt-4 font-mono text-[9px] tracking-widest uppercase text-foreground hover:underline cursor-pointer">
                RESET FILTERS
              </button>
            </div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (<ProductCard key={product.id} product={product} categoryId={id}/>))}
            </div>)}
        </div>
      </div>

      <ShoppingCartDrawer />
    </div>);
}
