"use client";
import React, { startTransition } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { formatInr } from "@/lib/money";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, } from "@/components/ui/sheet";
import { IconShoppingBag, IconArrowRight, } from "@tabler/icons-react";
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
    const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    function handleProceedToCheckout() {
        if (cart.length === 0)
            return;
        setCartOpen(false);
        startTransition(() => {
            push("/cart");
        });
    }

    return (<Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-[450px] p-0 flex flex-col justify-between h-full bg-background/98 dark:bg-background/98 backdrop-blur-3xl border-l border-foreground/5 shadow-2xl z-100">
        
        <div className="flex flex-col h-full justify-between overflow-hidden">
          <div className="flex flex-col h-full overflow-hidden">
            <SheetHeader className="p-5 border-b border-foreground/5 bg-background/20">
              <div className="flex items-baseline justify-between">
                <SheetTitle className="font-sans font-light text-[11px] tracking-[0.4em] uppercase text-foreground">
                  Shopping Bag
                </SheetTitle>
                <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/80 uppercase mr-5">
                  [{totalItems} ITEMS]
                </span>
              </div>
              <SheetDescription className="sr-only">
                Items in your shopping bag and checkout summary
              </SheetDescription>
            </SheetHeader>

            
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (<m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-32 flex flex-col items-center justify-center text-center">
                    <div className="size-10 rounded-full border border-foreground/5 flex items-center justify-center mb-6 bg-foreground/2">
                      <IconShoppingBag className="size-4 text-muted-foreground/60 stroke-[1.5]"/>
                    </div>
                    <p className="font-sans font-light text-[10px] tracking-[0.3em] text-foreground uppercase">
                      BAG IS EMPTY
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-3 max-w-[200px] leading-relaxed font-light font-mono lowercase">
                      your shopping bag is currently empty.
                    </p>
                  </m.div>) : (cart.map((item) => (<CartDrawerLine key={`${item.product.id}-${item.selectedColor ?? "default"}`} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart}/>)))}
              </AnimatePresence>
            </div>
          </div>

          
          <div className="p-8 border-t border-foreground/5 bg-background/10">
            <div className="flex flex-col gap-4 font-mono text-[9px] uppercase text-muted-foreground tracking-widest mb-6">
              <div className="flex justify-between">
                <span>ITEMS TOTAL</span>
                <span className="text-foreground">{totalItems} ITEMS</span>
              </div>
              <div className="flex justify-between">
                <span>SHIPPING</span>
                <span className="text-foreground">AT CHECKOUT</span>
              </div>
              <div className="flex justify-between border-t border-foreground/5 pt-4 text-foreground">
                <span className="font-medium tracking-[0.25em]">
                  TOTAL AMOUNT
                </span>
                <span className="font-normal text-xs">
                  {formatInr(cartSubtotal)}
                </span>
              </div>
            </div>

            
            <div className="flex flex-col gap-3">
              <button type="button" onClick={handleProceedToCheckout} disabled={cart.length === 0} className="w-full bg-foreground text-background hover:bg-foreground/90 disabled:opacity-30 disabled:cursor-not-allowed font-mono text-[10px] uppercase tracking-[0.3em] py-5 h-12 rounded-none transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md">
                PROCEED TO CHECKOUT
                <IconArrowRight className="size-3 stroke-[1.5]"/>
              </button>

              {cart.length > 0 && (<button type="button" onClick={clearCart} className="font-mono text-store-min tracking-[0.25em] text-muted-foreground/50 hover:text-destructive/80 transition-colors uppercase py-2 text-center underline-offset-4 hover:underline cursor-pointer">
                  EMPTY SHOPPING BAG
                </button>)}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>);
}
