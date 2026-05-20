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

function CategoryNavItem({
  cat,
  activeCategory,
  label,
  onSelect,
}: {
  cat: CategoryRow;
  activeCategory: string;
  label: string;
  onSelect: (id: string) => void;
}) {
  function selectCategory() {
    onSelect(cat.id);
  }

  const isActive = activeCategory === cat.id;

  return (
    <button
      type="button"
      onClick={selectCategory}
      aria-current={isActive ? "page" : undefined}
      className={`focus-visible:ring-ring/50 relative cursor-pointer py-2 font-mono text-[10.5px] tracking-[0.22em] uppercase transition-colors duration-300 focus-visible:ring-3 focus-visible:outline-none ${
        isActive
          ? "text-foreground font-semibold"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      {isActive && (
        <m.div
          layoutId="activeCategoryIndicator"
          className="bg-foreground absolute right-0 bottom-0 left-0 h-[1.5px]"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </button>
  );
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
  } else if (pathname.startsWith("/category/")) {
    const parts = pathname.split("/");
    if (parts.length >= 3) {
      activeCategory = parts[2];
    }
  }

  function handleCategoryClick(catId: string) {
    startTransition(() => {
      if (catId === "all") {
        push("/");
      } else {
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

  return (
    <header className="bg-background/85 sticky top-0 z-50 flex items-center justify-between px-12 pt-3 pb-4 backdrop-blur-md transition-all duration-500">
      <nav aria-label="Primary categories" className="sr-only">
        {CATEGORIES.map((cat) => (
          <CategoryNavItem
            key={`sr-${cat.id}`}
            cat={cat}
            activeCategory={activeCategory}
            label={CATEGORY_DISPLAY_NAMES[cat.id] || cat.name}
            onSelect={handleCategoryClick}
          />
        ))}
      </nav>
      <button
        type="button"
        onClick={handleLogoClick}
        aria-label="AURA home"
        className="focus-visible:ring-ring/50 flex w-1/4 cursor-pointer flex-col border-0 bg-transparent p-0 text-left select-none focus-visible:ring-3 focus-visible:outline-none"
      >
        <span className="font-sans text-xl font-semibold tracking-[0.25em] uppercase transition-opacity hover:opacity-80">
          AURA
        </span>
      </button>

      <nav
        aria-label="Primary"
        className="hidden w-2/4 items-center justify-center gap-10 lg:flex"
      >
        {CATEGORIES.map((cat) => (
          <CategoryNavItem
            key={cat.id}
            cat={cat}
            activeCategory={activeCategory}
            label={CATEGORY_DISPLAY_NAMES[cat.id] || cat.name}
            onSelect={handleCategoryClick}
          />
        ))}
      </nav>

      <div className="flex w-1/4 items-center justify-end gap-6">
        <Button
          type="button"
          onClick={handleOpenCart}
          variant="ghost"
          size="sm"
          aria-label={cartLabel}
          className="hover:bg-muted relative flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300"
        >
          <ShoppingBag
            className="text-muted-foreground size-4.5"
            aria-hidden="true"
          />
          <span
            className="text-foreground font-mono text-[10px] font-semibold tracking-widest"
            aria-hidden="true"
          >
            {mounted ? totalItems : 0}
          </span>
          {mounted && totalItems > 0 && (
            <span className="bg-foreground absolute top-1 right-1.5 size-1.5 animate-pulse rounded-full" />
          )}
        </Button>
      </div>
    </header>
  );
}
