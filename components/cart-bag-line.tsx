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
    <div className="flex gap-6 md:gap-8 py-6 border-b border-foreground/10">
      <ViewTransition
        name={`product-image-${item.product.id}`}
        share="morph"
        default="none"
      >
        <Link
          href={productPath}
          className="relative block w-24 md:w-28 aspect-3/4 bg-muted/5 border border-foreground/5 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Image
            src={item.product.image}
            alt={item.product.name}
            fill
            priority
            className="object-cover"
            sizes="112px"
          />
        </Link>
      </ViewTransition>

      <div className="flex-1 flex flex-col justify-between text-left">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-baseline gap-4">
            <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              {CATEGORY_LABEL_NAMES[item.product.category] ||
                item.product.category}
            </span>

            <ViewTransition
              name={`product-price-${item.product.id}`}
              share="morph"
              default="none"
            >
              <span className="font-mono text-xs md:text-sm tracking-wider text-foreground">
                {formatInr(item.product.price * item.quantity)}
              </span>
            </ViewTransition>
          </div>

          <ViewTransition
            name={`product-name-${item.product.id}`}
            share="morph"
            default="none"
          >
            <h3 className="font-sans font-light text-base md:text-lg uppercase tracking-wider mt-1">
              <Link
                href={productPath}
                className="text-foreground hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {item.product.name}
              </Link>
            </h3>
          </ViewTransition>

          {item.selectedColor && (
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mt-1">
              COLOR: {item.selectedColor}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-6">
          <div
            className="flex items-center gap-4"
            role="group"
            aria-label={`Quantity for ${item.product.name}`}
          >
            <button
              type="button"
              onClick={handleDecrement}
              aria-label={`Decrease quantity of ${item.product.name}`}
              className="font-mono text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors p-1"
            >
              —
            </button>
            <span
              className="font-mono text-[11px] text-foreground font-semibold min-w-[16px] text-center"
              aria-live="polite"
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label={`Increase quantity of ${item.product.name}`}
              className="font-mono text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors p-1"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleRemoveLine}
            className="font-mono text-[9px] tracking-widest text-muted-foreground hover:text-destructive hover:underline transition-colors uppercase cursor-pointer"
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}

