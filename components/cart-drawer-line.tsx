"use client";

import Image from "next/image";
import * as m from "motion/react-m";
import { IconTrash } from "@tabler/icons-react";
import { formatInr } from "@/lib/money";
import type { CartItem } from "@/lib/store";

type CartDrawerLineProps = {
  item: CartItem;
  updateQuantity: (productId: string, quantity: number, color?: string) => void;
  removeFromCart: (productId: string, color?: string) => void;
};

export function CartDrawerLine({
  item,
  updateQuantity,
  removeFromCart,
}: CartDrawerLineProps) {
  function handleDecrement() {
    updateQuantity(item.product.id, item.quantity - 1, item.selectedColor);
  }

  function handleIncrement() {
    updateQuantity(item.product.id, item.quantity + 1, item.selectedColor);
  }

  function handleRemove() {
    removeFromCart(item.product.id, item.selectedColor);
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="group border-foreground/5 flex gap-5 border-b pb-6 last:border-b-0 last:pb-0"
    >
      <div className="bg-muted border-foreground/5 relative aspect-3/4 w-16 shrink-0 overflow-hidden border">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          loading="lazy"
          className="object-cover transition-opacity duration-300"
          sizes="64px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-4">
            <h4 className="text-foreground truncate font-sans text-[11px] leading-snug font-normal tracking-wider uppercase">
              {item.product.name}
            </h4>
            <span className="text-foreground shrink-0 font-mono text-[11px] font-light">
              {formatInr(item.product.price * item.quantity)}
            </span>
          </div>

          <div className="text-store-min text-muted-foreground/60 mt-0.5 flex items-center gap-2 font-mono tracking-widest uppercase">
            <span>{item.product.category}</span>
            {item.selectedColor && (
              <>
                <span>·</span>
                <span>{item.selectedColor}</span>
              </>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-muted-foreground flex items-center gap-2.5 font-mono text-[9px] tracking-wider select-none">
            <span>QTY</span>
            <div className="text-foreground flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleDecrement}
                aria-label={`Decrease quantity of ${item.product.name}`}
                className="hover:text-muted-foreground/70 cursor-pointer px-1 transition-colors"
              >
                -
              </button>
              <span className="font-bold">{item.quantity}</span>
              <button
                type="button"
                onClick={handleIncrement}
                aria-label={`Increase quantity of ${item.product.name}`}
                className="hover:text-muted-foreground/70 cursor-pointer px-1 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="text-muted-foreground/40 hover:text-destructive flex cursor-pointer items-center justify-center py-1 transition-colors"
            aria-label="Remove item"
          >
            <IconTrash className="size-3.5 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </m.div>
  );
}
