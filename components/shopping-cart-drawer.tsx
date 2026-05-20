"use client";
import React, { startTransition } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { formatInr } from "@/lib/money";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { IconShoppingBag, IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { CartDrawerLine } from "@/components/cart-drawer-line";
export function ShoppingCartDrawer() {
  const { push } = useRouter();
  const cart = useStore((state) => state.cart);
  const isCartOpen = useStore((state) => state.isCartOpen);
  const setCartOpen = useStore((state) => state.setCartOpen);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const clearCart = useStore((state) => state.clearCart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  function handleProceedToCheckout() {
    if (cart.length === 0) return;
    setCartOpen(false);
    startTransition(() => {
      push("/cart");
    });
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent
        side="right"
        className="bg-background/98 dark:bg-background/98 border-foreground/5 z-100 flex h-full w-full flex-col justify-between border-l p-0 shadow-2xl backdrop-blur-3xl sm:max-w-[450px]"
      >
        <div className="flex h-full flex-col justify-between overflow-hidden">
          <div className="flex h-full flex-col overflow-hidden">
            <SheetHeader className="border-foreground/5 bg-background/20 border-b p-5">
              <div className="flex items-baseline justify-between">
                <SheetTitle className="text-foreground font-sans text-[11px] font-light tracking-[0.4em] uppercase">
                  Shopping Bag
                </SheetTitle>
                <span className="text-muted-foreground/80 mr-5 font-mono text-[9px] tracking-[0.2em] uppercase">
                  [{totalItems} ITEMS]
                </span>
              </div>
              <SheetDescription className="sr-only">
                Items in your shopping bag and checkout summary
              </SheetDescription>
            </SheetHeader>

            <div className="custom-scrollbar flex flex-1 flex-col gap-8 overflow-y-auto p-8">
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-32 text-center"
                  >
                    <div className="border-foreground/5 bg-foreground/2 mb-6 flex size-10 items-center justify-center rounded-full border">
                      <IconShoppingBag className="text-muted-foreground/60 size-4 stroke-[1.5]" />
                    </div>
                    <p className="text-foreground font-sans text-[10px] font-light tracking-[0.3em] uppercase">
                      BAG IS EMPTY
                    </p>
                    <p className="text-muted-foreground mt-3 max-w-[200px] font-mono text-[11px] leading-relaxed font-light lowercase">
                      your shopping bag is currently empty.
                    </p>
                  </m.div>
                ) : (
                  cart.map((item) => (
                    <CartDrawerLine
                      key={`${item.product.id}-${item.selectedColor ?? "default"}`}
                      item={item}
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="border-foreground/5 bg-background/10 border-t p-8">
            <div className="text-muted-foreground mb-6 flex flex-col gap-4 font-mono text-[9px] tracking-widest uppercase">
              <div className="flex justify-between">
                <span>ITEMS TOTAL</span>
                <span className="text-foreground">{totalItems} ITEMS</span>
              </div>
              <div className="flex justify-between">
                <span>SHIPPING</span>
                <span className="text-foreground">AT CHECKOUT</span>
              </div>
              <div className="border-foreground/5 text-foreground flex justify-between border-t pt-4">
                <span className="font-medium tracking-[0.25em]">
                  TOTAL AMOUNT
                </span>
                <span className="text-xs font-normal">
                  {formatInr(cartSubtotal)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleProceedToCheckout}
                disabled={cart.length === 0}
                className="bg-foreground text-background hover:bg-foreground/90 flex h-12 w-full transform cursor-pointer items-center justify-center gap-2 rounded-none py-5 font-mono text-[10px] tracking-[0.3em] uppercase shadow-md transition-all duration-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-30"
              >
                PROCEED TO CHECKOUT
                <IconArrowRight className="size-3 stroke-[1.5]" />
              </button>

              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-store-min text-muted-foreground/50 hover:text-destructive/80 cursor-pointer py-2 text-center font-mono tracking-[0.25em] uppercase underline-offset-4 transition-colors hover:underline"
                >
                  EMPTY SHOPPING BAG
                </button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
