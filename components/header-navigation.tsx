"use client";
import React, { useState, useEffect, startTransition } from "react";
import { useTheme } from "next-themes";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/data";
import { ShoppingBag, Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
    all: "SHOP ALL",
    electronics: "AUDIO & TECH",
    living: "LIVING",
    writing: "TACTILE",
    wellness: "WELLNESS",
};
export function HeaderNavigation() {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
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
    const handleCategoryClick = (catId: string) => {
        startTransition(() => {
            if (catId === "all") {
                router.push("/");
            }
            else {
                router.push(`/category/${catId}`);
            }
        });
    };
    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);
    return (<header className="sticky top-0 pt-3 pb-4 flex items-center justify-between px-12 z-50 bg-background/85 backdrop-blur-md transition-all duration-500">
      
      <button onClick={() => router.push("/")} className="flex flex-col select-none w-1/4 cursor-pointer text-left focus:outline-none bg-transparent border-0 p-0">
        <span className="font-sans font-semibold text-xl tracking-[0.25em] uppercase hover:opacity-80 transition-opacity">
          AURA
        </span>
      </button>

      <nav className="hidden lg:flex items-center justify-center gap-10 w-2/4">
        {CATEGORIES.map((cat) => (<button key={cat.id} onClick={() => handleCategoryClick(cat.id)} className={`font-mono text-[10.5px] tracking-[0.22em] uppercase transition-colors duration-300 relative py-2 cursor-pointer ${activeCategory === cat.id
                ? "text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"}`}>
            {CATEGORY_DISPLAY_NAMES[cat.id] || cat.name}
            {activeCategory === cat.id && (<motion.div layoutId="activeCategoryIndicator" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-foreground" transition={{ type: "spring", stiffness: 350, damping: 30 }}/>)}
          </button>))}
      </nav>

      
      <div className="flex items-center justify-end gap-6 w-1/4">
        
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2.5 hover:bg-muted rounded-full transition-colors duration-300 cursor-pointer" aria-label="Toggle Theme" title="Toggle theme (Shortcut: D)">
          {!mounted ? (<div className="w-4.5 h-4.5"/>) : theme === "dark" ? (<Sun className="w-4.5 h-4.5 text-muted-foreground hover:text-foreground transition-colors"/>) : (<Moon className="w-4.5 h-4.5 text-muted-foreground hover:text-foreground transition-colors"/>)}
        </button>

        
        <Button onClick={() => {
            startTransition(() => {
                router.push("/cart");
            });
        }} variant="ghost" size="sm" className="relative flex items-center gap-2 hover:bg-muted rounded-lg transition-all duration-300 cursor-pointer px-3 py-2">
          <ShoppingBag className="w-4.5 h-4.5 text-muted-foreground"/>
          <span className="font-mono text-[10px] tracking-widest text-foreground font-semibold">
            {mounted ? totalItems : 0}
          </span>
          {mounted && totalItems > 0 && (<span className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-foreground rounded-full animate-pulse"/>)}
        </Button>
      </div>
    </header>);
}
