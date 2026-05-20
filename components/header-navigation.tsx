"use client";
import React, { useState, useEffect, startTransition } from "react";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/data";
import { ShoppingBag } from "lucide-react";
import * as m from "motion/react-m";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
    all: "SHOP ALL",
    electronics: "AUDIO & TECH",
    living: "LIVING",
    writing: "TACTILE",
    wellness: "WELLNESS",
};

type CategoryRow = (typeof CATEGORIES)[number];

function CategoryNavItem({ cat, activeCategory, label, onSelect, }: {
    cat: CategoryRow;
    activeCategory: string;
    label: string;
    onSelect: (id: string) => void;
}) {
    function handleClick() {
        onSelect(cat.id);
    }

    const isActive = activeCategory === cat.id;

    return (<button type="button" onClick={handleClick} aria-current={isActive ? "page" : undefined} className={`font-mono text-[10.5px] tracking-[0.22em] uppercase transition-colors duration-300 relative py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${isActive
            ? "text-foreground font-semibold"
            : "text-muted-foreground hover:text-foreground"}`}>
      {label}
      {isActive && (<m.div layoutId="activeCategoryIndicator" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-foreground" transition={{ type: "spring", stiffness: 350, damping: 30 }}/>)}
    </button>);
}

export function HeaderNavigation() {
    const { push } = useRouter();
    const pathname = usePathname() || "";
    const [mounted, setMounted] = useState(false);
    const cart = useStore((state) => state.cart);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let activeCategory = "";
    if (pathname === "/") {
        activeCategory = "all";
    }
    else if (pathname.startsWith("/category/")) {
        const parts = pathname.split("/");
        if (parts.length >= 3) {
            activeCategory = parts[2];
        }
    }

    function handleCategoryClick(catId: string) {
        startTransition(() => {
            if (catId === "all") {
                push("/");
            }
            else {
                push(`/category/${catId}`);
            }
        });
    }

    function handleLogoClick() {
        push("/");
    }

    function handleOpenCart() {
        startTransition(() => {
            push("/cart");
        });
    }

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);

        return () => clearTimeout(timer);
    }, []);
    const cartLabel = mounted
        ? totalItems === 0
            ? "Open shopping bag, empty"
            : `Open shopping bag, ${totalItems} item${totalItems === 1 ? "" : "s"}`
        : "Open shopping bag";

    return (<header className="sticky top-0 pt-3 pb-4 flex items-center justify-between px-12 z-50 bg-background/85 backdrop-blur-md transition-all duration-500">
      <nav aria-label="Primary categories" className="sr-only">
        {CATEGORIES.map((cat) => (<CategoryNavItem key={`sr-${cat.id}`} cat={cat} activeCategory={activeCategory} label={CATEGORY_DISPLAY_NAMES[cat.id] || cat.name} onSelect={handleCategoryClick}/>))}
      </nav>
      <button type="button" onClick={handleLogoClick} aria-label="AURA home" className="flex flex-col select-none w-1/4 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 bg-transparent border-0 p-0">
        <span className="font-sans font-semibold text-xl tracking-[0.25em] uppercase hover:opacity-80 transition-opacity">
          AURA
        </span>
      </button>

      <nav aria-label="Primary" className="hidden lg:flex items-center justify-center gap-10 w-2/4">
        {CATEGORIES.map((cat) => (<CategoryNavItem key={cat.id} cat={cat} activeCategory={activeCategory} label={CATEGORY_DISPLAY_NAMES[cat.id] || cat.name} onSelect={handleCategoryClick}/>))}
      </nav>

      <div className="flex items-center justify-end gap-6 w-1/4">
        <Button type="button" onClick={handleOpenCart} variant="ghost" size="sm" aria-label={cartLabel} className="relative flex items-center gap-2 hover:bg-muted rounded-lg transition-all duration-300 cursor-pointer px-3 py-2">
          <ShoppingBag className="size-4.5 text-muted-foreground" aria-hidden="true"/>
          <span className="font-mono text-[10px] tracking-widest text-foreground font-semibold" aria-hidden="true">
            {mounted ? totalItems : 0}
          </span>
          {mounted && totalItems > 0 && (<span className="absolute top-1 right-1.5 size-1.5 bg-foreground rounded-full animate-pulse"/>)}
        </Button>
      </div>
    </header>);
}
