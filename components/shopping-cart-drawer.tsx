"use client";
import React, { startTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { formatInr } from "@/lib/money";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, } from "@/components/ui/sheet";
import { IconShoppingBag, IconArrowRight, IconTrash, } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
export function ShoppingCartDrawer() {
    const router = useRouter();
    const cart = useStore((state) => state.cart);
    const isCartOpen = useStore((state) => state.isCartOpen);
    const setCartOpen = useStore((state) => state.setCartOpen);
    const removeFromCart = useStore((state) => state.removeFromCart);
    const updateQuantity = useStore((state) => state.updateQuantity);
    const clearCart = useStore((state) => state.clearCart);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
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
              <SheetDescription className="hidden">
                Luxury shopping cart product list
              </SheetDescription>
            </SheetHeader>

            
            <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-32 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-full border border-foreground/5 flex items-center justify-center mb-6 bg-foreground/2">
                      <IconShoppingBag className="w-4 h-4 text-muted-foreground/60 stroke-[1.5]"/>
                    </div>
                    <p className="font-sans font-light text-[10px] tracking-[0.3em] text-foreground uppercase">
                      BAG IS EMPTY
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-3 max-w-[200px] leading-relaxed font-light font-mono lowercase">
                      your shopping bag is currently empty.
                    </p>
                  </motion.div>) : (cart.map((item, idx) => (<motion.div key={`cart-item-${item.product.id}-${item.selectedColor}-${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="group flex gap-5 pb-6 border-b border-foreground/5 last:border-b-0 last:pb-0">
                      
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
                              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)} className="hover:text-muted-foreground/70 transition-colors px-1 cursor-pointer">
                                -
                              </button>
                              <span className="font-bold">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)} className="hover:text-muted-foreground/70 transition-colors px-1 cursor-pointer">
                                +
                              </button>
                            </div>
                          </div>

                          
                          <button onClick={() => removeFromCart(item.product.id, item.selectedColor)} className="text-muted-foreground/40 hover:text-destructive transition-colors cursor-pointer py-1 flex items-center justify-center" aria-label="Remove item">
                            <IconTrash className="w-3.5 h-3.5 stroke-[1.5]"/>
                          </button>
                        </div>
                      </div>
                    </motion.div>)))}
              </AnimatePresence>
            </div>
          </div>

          
          <div className="px-8 py-8 border-t border-foreground/5 bg-background/10">
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
              <button onClick={() => {
            if (cart.length === 0)
                return;
            setCartOpen(false);
            startTransition(() => {
                router.push("/cart");
            });
        }} disabled={cart.length === 0} className="w-full bg-foreground text-background hover:bg-foreground/90 disabled:opacity-30 disabled:cursor-not-allowed font-mono text-[10px] uppercase tracking-[0.3em] py-5 h-12 rounded-none transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md">
                PROCEED TO CHECKOUT
                <IconArrowRight className="w-3 h-3 stroke-[1.5]"/>
              </button>

              {cart.length > 0 && (<button onClick={clearCart} className="font-mono text-store-min tracking-[0.25em] text-muted-foreground/50 hover:text-destructive/80 transition-colors uppercase py-2 text-center underline-offset-4 hover:underline cursor-pointer">
                  EMPTY SHOPPING BAG
                </button>)}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>);
}
