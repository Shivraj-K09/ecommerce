"use client";
import React, { useState, useEffect, startTransition } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { PRODUCTS, Product } from "@/lib/data";
import { FlagshipCard } from "@/components/flagship-card";
import { ShoppingCartDrawer } from "@/components/shopping-cart-drawer";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import { IconArrowUpRight, IconCpu, IconHome, IconPencil, IconActivity } from "@tabler/icons-react";
export default function Home() {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const addToCart = useStore((state) => state.addToCart);
    const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);
    const [flagshipIds] = useState<string[]>([
        "headphones",
        "keyboard",
        "carafe",
        "incense",
    ]);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const activeEl = document.activeElement;
            if (activeEl &&
                (activeEl.tagName === "INPUT" ||
                    activeEl.tagName === "TEXTAREA" ||
                    activeEl.hasAttribute("contenteditable"))) {
                return;
            }
            if (e.key.toLowerCase() === "d") {
                e.preventDefault();
                const nextTheme = theme === "dark" ? "light" : "dark";
                setTheme(nextTheme);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [theme, setTheme]);
    const handleAddDirect = (product: Product, e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product, product.colors[0]?.name);
        toast.success("ADDED TO BAG", {
            description: `${product.name} is now in your shopping bag.`,
        });
        startTransition(() => {
            router.push("/cart");
        });
    };
    const activeFlagshipProducts = flagshipIds.map((id) => PRODUCTS.find((p) => p.id === id) || PRODUCTS[0]);
    const audioProducts = PRODUCTS.filter((p) => p.category === "electronics");
    const livingProducts = PRODUCTS.filter((p) => p.category === "living");
    const writingProducts = PRODUCTS.filter((p) => p.category === "writing");
    const wellnessProducts = PRODUCTS.filter((p) => p.category === "wellness");
    return (<div className="relative w-full bg-background text-foreground overflow-x-hidden font-sans select-none transition-colors duration-500 flex flex-col">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-muted/30 via-transparent to-transparent pointer-events-none"/>
      </div>

      
      <main className="flex w-full min-w-0 flex-col md:flex-row md:items-stretch h-[74vh] min-h-[580px] border-y border-border bg-card relative z-20 mt-5">
        {activeFlagshipProducts.map((product, idx) => (<FlagshipCard key={product.id} product={product} idx={idx} hoveredPanel={hoveredPanel} setHoveredPanel={setHoveredPanel} handleAddDirect={handleAddDirect}/>))}
      </main>

      
      <section className="w-full px-6 md:px-12 py-24 relative z-20 flex flex-col gap-28">
        
        
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center gap-2">
                <IconCpu className="w-4 h-4 text-zinc-400 dark:text-zinc-600"/>
                <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-400 dark:text-zinc-500 uppercase font-bold">
                  [ SPECTRUM 01 / ACOUSTICS & CYBERNETICS ]
                </span>
              </div>
              <h2 className="font-sans font-medium text-xl md:text-2xl uppercase tracking-wider">
                Audio & Tech
              </h2>
            </div>
            <button onClick={() => startTransition(() => router.push("/category/electronics"))} className="font-mono text-[9.5px] tracking-widest text-muted-foreground hover:text-foreground uppercase flex items-center gap-1.5 transition-colors cursor-pointer">
              EXPLORE INDEX <IconArrowUpRight className="w-3.5 h-3.5"/>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 w-full">
            {audioProducts.map((product) => (<ProductCard key={product.id} product={product} categoryId="electronics" disableTransitionNames={true} className="w-full max-w-[420px] mx-auto"/>))}
          </div>
        </div>

        
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center gap-2">
                <IconHome className="w-4 h-4 text-zinc-400 dark:text-zinc-600"/>
                <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-400 dark:text-zinc-500 uppercase font-bold">
                  [ SPECTRUM 02 / ORGANIC SPATIAL ALIGNMENT ]
                </span>
              </div>
              <h2 className="font-sans font-medium text-xl md:text-2xl uppercase tracking-wider">
                Home & Living
              </h2>
            </div>
            <button onClick={() => startTransition(() => router.push("/category/living"))} className="font-mono text-[9.5px] tracking-widest text-muted-foreground hover:text-foreground uppercase flex items-center gap-1.5 transition-colors cursor-pointer">
              EXPLORE INDEX <IconArrowUpRight className="w-3.5 h-3.5"/>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 w-full">
            {livingProducts.map((product) => (<ProductCard key={product.id} product={product} categoryId="living" disableTransitionNames={true} className="w-full max-w-[420px] mx-auto"/>))}
          </div>
        </div>

        
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center gap-2">
                <IconPencil className="w-4 h-4 text-zinc-400 dark:text-zinc-600"/>
                <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-400 dark:text-zinc-500 uppercase font-bold">
                  [ SPECTRUM 03 / TACTILE INSTRUMENTS & DRAFTS ]
                </span>
              </div>
              <h2 className="font-sans font-medium text-xl md:text-2xl uppercase tracking-wider">
                Tactile Writing
              </h2>
            </div>
            <button onClick={() => startTransition(() => router.push("/category/writing"))} className="font-mono text-[9.5px] tracking-widest text-muted-foreground hover:text-foreground uppercase flex items-center gap-1.5 transition-colors cursor-pointer">
              EXPLORE INDEX <IconArrowUpRight className="w-3.5 h-3.5"/>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 w-full">
            {writingProducts.map((product) => (<ProductCard key={product.id} product={product} categoryId="writing" disableTransitionNames={true} className="w-full max-w-[420px] mx-auto"/>))}
          </div>
        </div>

        
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center gap-2">
                <IconActivity className="w-4 h-4 text-zinc-400 dark:text-zinc-600"/>
                <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-400 dark:text-zinc-500 uppercase font-bold">
                  [ SPECTRUM 04 / SENSORY CALM & BOTANICAL AURA ]
                </span>
              </div>
              <h2 className="font-sans font-medium text-xl md:text-2xl uppercase tracking-wider">
                Wellness & Aroma
              </h2>
            </div>
            <button onClick={() => startTransition(() => router.push("/category/wellness"))} className="font-mono text-[9.5px] tracking-widest text-muted-foreground hover:text-foreground uppercase flex items-center gap-1.5 transition-colors cursor-pointer">
              EXPLORE INDEX <IconArrowUpRight className="w-3.5 h-3.5"/>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 w-full">
            {wellnessProducts.map((product) => (<ProductCard key={product.id} product={product} categoryId="wellness" disableTransitionNames={true} className="w-full max-w-[420px] mx-auto"/>))}
          </div>
        </div>

      </section>

      <ShoppingCartDrawer />
    </div>);
}
