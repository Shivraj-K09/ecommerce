"use client";

import * as m from "motion/react-m";
import type { UseCheckoutReturn } from "@/hooks/use-checkout";
import { Button } from "@/components/ui/button";
import { CartBagLine } from "@/components/cart-bag-line";
import {
  formatInr,
  FREE_SHIPPING_THRESHOLD_INR,
  SHIPPING_STANDARD_INR,
  SHIPPING_EXPRESS_INR,
} from "@/lib/money";

type Props = { checkout: UseCheckoutReturn };

export function CheckoutBagStep({ checkout }: Props) {
  const {
    cart, push, updateQuantity, removeFromCart, subtotal, shippingCost, promoDiscount, total, appliedPromo, promoCode, shippingOption, navigateHome, selectStandardShipping, selectExpressShipping, handleRemovePromo, handleApplyPromo, handlePromoCodeChange, proceedToDelivery
  } = checkout;

  return (
    <m.div
                  key="step-1"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col"
                >
                  {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-28">
                      <h2 className="font-sans font-light text-xl tracking-wider text-foreground uppercase">
                        YOUR BAG IS EMPTY
                      </h2>
                      <p className="font-sans font-light text-sm text-muted-foreground mt-2 max-w-[360px] leading-relaxed">
                        Explore our minimalist pieces to curate your flagship
                        collection.
                      </p>
                      <Button
                        onClick={navigateHome}
                        variant="outline"
                        className="mt-8 font-mono text-[10px] tracking-widest uppercase rounded-none border-foreground/20 hover:border-foreground transition-colors px-6 py-5 cursor-pointer"
                      >
                        BROWSE collections
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                      <div className="lg:col-span-8 flex flex-col">
                        <h2 className="font-sans font-light text-2xl uppercase tracking-wider text-foreground mb-6 text-left">
                          YOUR SELECTION
                        </h2>
    
                        <div className="flex flex-col border-t border-foreground/10">
                          {cart.map((item) => (
                            <CartBagLine
                              key={`${item.product.id}-${item.selectedColor}`}
                              item={item}
                              push={push}
                              updateQuantity={updateQuantity}
                              removeFromCart={removeFromCart}
                            />
                          ))}
                        </div>
                      </div>
    
                      <div className="lg:col-span-4 flex flex-col gap-10 text-left">
                        <div className="flex flex-col gap-6">
                          <h3 className="font-sans font-light text-base uppercase tracking-wider text-foreground pb-4 border-b border-foreground/10">
                            SUMMARY
                          </h3>
    
                          <div className="flex flex-col gap-4 font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
                            <div className="flex justify-between">
                              <span>SUBTOTAL</span>
                              <span className="text-foreground">
                                {formatInr(subtotal)}
                              </span>
                            </div>
    
                            <div className="flex justify-between border-t border-foreground/5 pt-4">
                              <span>SHIPPING</span>
                              <span className="text-foreground">
                                {shippingCost === 0
                                  ? "COMPLIMENTARY"
                                  : formatInr(shippingCost)}
                              </span>
                            </div>
    
                            {appliedPromo && (
                              <div className="flex justify-between border-t border-foreground/5 pt-4 text-emerald-600 dark:text-emerald-400">
                                <span>SAVINGS</span>
                                <span>-{formatInr(promoDiscount)}</span>
                              </div>
                            )}
    
                            <div className="flex justify-between border-t border-foreground/10 pt-5 text-foreground text-sm font-semibold">
                              <span>TOTAL</span>
                              <span>{formatInr(total)}</span>
                            </div>
                          </div>
                        </div>
    
                        <div className="flex flex-col gap-3">
                          <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground font-bold">
                            DELIVERY SPEED
                          </span>
    
                          <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-wider">
                            <button
                              type="button"
                              onClick={selectStandardShipping}
                              aria-pressed={shippingOption === "standard"}
                              className={`flex justify-between p-3.5 border transition-all cursor-pointer rounded-none text-left ${
                                shippingOption === "standard"
                                  ? "border-foreground text-foreground bg-foreground/2"
                                  : "border-foreground/10 text-muted-foreground hover:border-foreground/30 bg-transparent"
                              }`}
                            >
                              <span>STANDARD / 3-5 DAYS</span>
                              <span>
                                {subtotal >= FREE_SHIPPING_THRESHOLD_INR
                                  ? "INCLUDED"
                                  : formatInr(SHIPPING_STANDARD_INR)}
                              </span>
                            </button>
    
                            <button
                              type="button"
                              onClick={selectExpressShipping}
                              aria-pressed={shippingOption === "express"}
                              className={`flex justify-between p-3.5 border transition-all cursor-pointer rounded-none text-left ${
                                shippingOption === "express"
                                  ? "border-foreground text-foreground bg-foreground/2"
                                  : "border-foreground/10 text-muted-foreground hover:border-foreground/30 bg-transparent"
                              }`}
                            >
                              <span>EXPRESS / NEXT DAY</span>
                              <span>{formatInr(SHIPPING_EXPRESS_INR)}</span>
                            </button>
                          </div>
                        </div>
    
                        <div className="flex flex-col gap-3">
                          <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground font-bold">
                            PROMO CODE
                          </span>
    
                          {appliedPromo ? (
                            <div className="flex justify-between items-center border border-emerald-500/20 p-3 bg-emerald-500/2">
                              <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold">
                                {appliedPromo}
                              </span>
                              <button
                                type="button"
                                onClick={handleRemovePromo}
                                className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-bold cursor-pointer hover:underline"
                              >
                                [REMOVE]
                              </button>
                            </div>
                          ) : (
                            <form
                              onSubmit={handleApplyPromo}
                              className="flex gap-2"
                            >
                              <label htmlFor="promo-code" className="sr-only">
                                Promo code
                              </label>
                              <input
                                id="promo-code"
                                type="text"
                                placeholder="PROMO CODE (AURA20)"
                                value={promoCode}
                                onChange={handlePromoCodeChange}
                                className="flex-1 bg-transparent border-b border-foreground/20 focus:border-foreground/70 py-2.5 font-mono text-[10px] tracking-widest uppercase placeholder:text-muted-foreground/30 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 transition-colors rounded-none"
                              />
                              <button
                                type="submit"
                                className="px-4 py-2.5 border border-foreground/20 hover:border-foreground hover:bg-foreground/2 rounded-none font-mono text-[10px] uppercase tracking-widest font-semibold cursor-pointer transition-all text-foreground"
                              >
                                APPLY
                              </button>
                            </form>
                          )}
                        </div>
    
                        <div className="flex flex-col gap-3">
                          <button
                            type="button"
                            onClick={proceedToDelivery}
                            className="w-full bg-foreground text-background hover:bg-foreground/90 font-mono text-xs uppercase tracking-[0.25em] py-5 font-semibold transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center"
                          >
                            PROCEED TO DELIVERY
                          </button>
    
                          <p className="font-mono text-[9px] tracking-widest text-muted-foreground/60 text-center uppercase leading-relaxed">
                            Secure luxury checkout with complementary returns
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </m.div>
  );
}
