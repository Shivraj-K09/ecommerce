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

export function CartDrawerLine({ item, updateQuantity, removeFromCart, }: CartDrawerLineProps) {
    function handleDecrement() {
        updateQuantity(item.product.id, item.quantity - 1, item.selectedColor);
    }

    function handleIncrement() {
        updateQuantity(item.product.id, item.quantity + 1, item.selectedColor);
    }

    function handleRemove() {
        removeFromCart(item.product.id, item.selectedColor);
    }

    return (<m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="group flex gap-5 pb-6 border-b border-foreground/5 last:border-b-0 last:pb-0">
      <div className="w-16 aspect-3/4 bg-muted overflow-hidden relative shrink-0 border border-foreground/5">
        <Image src={item.product.image} alt={item.product.name} fill className="object-cover transition-opacity duration-300" sizes="64px"/>
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start gap-4">
            <h4 className="font-sans text-[11px] font-normal uppercase tracking-wider text-foreground leading-snug truncate">
              {item.product.name}
            </h4>
            <span className="font-mono text-[11px] text-foreground font-light shrink-0">
              {formatInr(item.product.price * item.quantity)}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-store-min tracking-widest text-muted-foreground/60 uppercase mt-0.5">
            <span>{item.product.category}</span>
            {item.selectedColor && (<>
                <span>·</span>
                <span>{item.selectedColor}</span>
              </>)}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2.5 font-mono text-[9px] tracking-wider text-muted-foreground select-none">
            <span>QTY</span>
            <div className="flex items-center gap-1.5 text-foreground">
              <button type="button" onClick={handleDecrement} className="hover:text-muted-foreground/70 transition-colors px-1 cursor-pointer">
                -
              </button>
              <span className="font-bold">{item.quantity}</span>
              <button type="button" onClick={handleIncrement} className="hover:text-muted-foreground/70 transition-colors px-1 cursor-pointer">
                +
              </button>
            </div>
          </div>

          <button type="button" onClick={handleRemove} className="text-muted-foreground/40 hover:text-destructive transition-colors cursor-pointer py-1 flex items-center justify-center" aria-label="Remove item">
            <IconTrash className="size-3.5 stroke-[1.5]"/>
          </button>
        </div>
      </div>
    </m.div>);
}
