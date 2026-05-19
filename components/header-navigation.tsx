"use client";
import React, { useState, useEffect, startTransition } from "react";
import { useTheme } from "next-themes";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/data";
import { ShoppingBag, Sun, Moon } from "lucide-react";
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
    return (<button type="button" onClick={handleClick} className={`font-mono text-[10.5px] tracking-[0.22em] uppercase transition-colors duration-300 relative py-2 cursor-pointer ${isActive
            ? "text-foreground font-semibold"
            : "text-muted-foreground hover:text-foreground"}`}>
      {label}
      {isActive && (<m.div layoutId="activeCategoryIndicator" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-foreground" transition={{ type: "spring", stiffness: 350, damping: 30 }}/>)}
    </button>);
}

export function HeaderNavigation() {
    const { theme, setTheme } = useTheme();
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

    function handleToggleTheme() {
        setTheme(theme === "dark" ? "light" : "dark");
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
    return (<header className="sticky top-0 pt-3 pb-4 flex items-center justify-between px-12 z-50 bg-background/85 backdrop-blur-md transition-all duration-500">
      <button type="button" onClick={handleLogoClick} className="flex flex-col select-none w-1/4 cursor-pointer text-left focus:outline-none bg-transparent border-0 p-0">
        <span className="font-sans font-semibold text-xl tracking-[0.25em] uppercase hover:opacity-80 transition-opacity">
          AURA
        </span>
      </button>

      <nav className="hidden lg:flex items-center justify-center gap-10 w-2/4">
        {CATEGORIES.map((cat) => (<CategoryNavItem key={cat.id} cat={cat} activeCategory={activeCategory} label={CATEGORY_DISPLAY_NAMES[cat.id] || cat.name} onSelect={handleCategoryClick}/>))}
      </nav>

      <div className="flex items-center justify-end gap-6 w-1/4">
        <button type="button" onClick={handleToggleTheme} className="p-2.5 hover:bg-muted rounded-full transition-colors duration-300 cursor-pointer" aria-label="Toggle Theme" title="Toggle theme (Shortcut: D)">
          {!mounted ? (<div className="size-4.5"/>) : theme === "dark" ? (<Sun className="size-4.5 text-muted-foreground hover:text-foreground transition-colors"/>) : (<Moon className="size-4.5 text-muted-foreground hover:text-foreground transition-colors"/>)}
        </button>

        <Button type="button" onClick={handleOpenCart} variant="ghost" size="sm" className="relative flex items-center gap-2 hover:bg-muted rounded-lg transition-all duration-300 cursor-pointer px-3 py-2">
          <ShoppingBag className="size-4.5 text-muted-foreground"/>
          <span className="font-mono text-[10px] tracking-widest text-foreground font-semibold">
            {mounted ? totalItems : 0}
          </span>
          {mounted && totalItems > 0 && (<span className="absolute top-1 right-1.5 size-1.5 bg-foreground rounded-full animate-pulse"/>)}
        </Button>
      </div>
    </header>);
}
