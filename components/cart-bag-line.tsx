"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { CATEGORY_LABEL_NAMES } from "@/lib/data";
import { formatInr } from "@/lib/money";
import type { CartItem } from "@/lib/store";

type CartBagLineProps = {
  item: CartItem;
  push: (href: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string) => void;
  removeFromCart: (productId: string, color?: string) => void;
};

export function CartBagLine({
  item,
  updateQuantity,
  removeFromCart,
}: CartBagLineProps) {
  const productPath = `/category/${item.product.category}/product/${item.product.id}`;

  function handleDecrement() {
    updateQuantity(item.product.id, item.quantity - 1, item.selectedColor);
  }

  function handleIncrement() {
    updateQuantity(item.product.id, item.quantity + 1, item.selectedColor);
  }

  function handleRemoveLine() {
    removeFromCart(item.product.id, item.selectedColor);
    toast.info("Removed from bag");
  }

  return (
    <div className="border-foreground/10 flex gap-6 border-b py-6 md:gap-8">
      <ViewTransition
        name={`product-image-${item.product.id}`}
        share="morph"
        default="none"
      >
        <Link
          href={productPath}
          className="bg-muted/5 border-foreground/5 focus-visible:ring-ring/50 relative block aspect-3/4 w-24 shrink-0 cursor-pointer border focus-visible:ring-3 focus-visible:outline-none md:w-28"
        >
          <Image
            src={item.product.image}
            alt={item.product.name}
            fill
            loading="lazy"
            className="object-cover"
            sizes="112px"
          />
        </Link>
      </ViewTransition>

      <div className="flex flex-1 flex-col justify-between text-left">
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
              {CATEGORY_LABEL_NAMES[item.product.category] ||
                item.product.category}
            </span>

            <ViewTransition
              name={`product-price-${item.product.id}`}
              share="morph"
              default="none"
            >
              <span className="text-foreground font-mono text-xs tracking-wider md:text-sm">
                {formatInr(item.product.price * item.quantity)}
              </span>
            </ViewTransition>
          </div>

          <ViewTransition
            name={`product-name-${item.product.id}`}
            share="morph"
            default="none"
          >
            <h3 className="mt-1 font-sans text-base font-light tracking-wider uppercase md:text-lg">
              <Link
                href={productPath}
                className="text-foreground hover:text-muted-foreground focus-visible:ring-ring/50 transition-colors focus-visible:ring-3 focus-visible:outline-none"
              >
                {item.product.name}
              </Link>
            </h3>
          </ViewTransition>

          {item.selectedColor && (
            <span className="text-muted-foreground mt-1 font-mono text-[10px] tracking-widest uppercase">
              COLOR: {item.selectedColor}
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div
            className="flex items-center gap-4"
            role="group"
            aria-label={`Quantity for ${item.product.name}`}
          >
            <button
              type="button"
              onClick={handleDecrement}
              aria-label={`Decrease quantity of ${item.product.name}`}
              className="text-muted-foreground hover:text-foreground cursor-pointer p-1 font-mono text-sm transition-colors"
            >
              −
            </button>
            <span
              className="text-foreground min-w-[16px] text-center font-mono text-[11px] font-semibold"
              aria-live="polite"
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label={`Increase quantity of ${item.product.name}`}
              className="text-muted-foreground hover:text-foreground cursor-pointer p-1 font-mono text-sm transition-colors"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleRemoveLine}
            className="text-muted-foreground hover:text-destructive cursor-pointer font-mono text-[9px] tracking-widest uppercase transition-colors hover:underline"
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}
