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
    cart,
    push,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingCost,
    promoDiscount,
    total,
    appliedPromo,
    promoCode,
    shippingOption,
    navigateHome,
    selectStandardShipping,
    selectExpressShipping,
    handleRemovePromo,
    handleApplyPromo,
    handlePromoCodeChange,
    proceedToDelivery,
  } = checkout;

  return (
    <m.div
      key="step-1"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
      className="flex flex-1 flex-col"
    >
      {cart.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-28 text-center">
          <h2 className="text-foreground font-sans text-xl font-light tracking-wider uppercase">
            YOUR BAG IS EMPTY
          </h2>
          <p className="text-muted-foreground mt-2 max-w-[360px] font-sans text-sm leading-relaxed font-light">
            Explore our minimalist pieces to curate your flagship collection.
          </p>
          <Button
            onClick={navigateHome}
            variant="outline"
            className="border-foreground/20 hover:border-foreground mt-8 cursor-pointer rounded-none px-6 py-5 font-mono text-[10px] tracking-widest uppercase transition-colors"
          >
            BROWSE collections
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-8">
            <h2 className="text-foreground mb-6 text-left font-sans text-2xl font-light tracking-wider uppercase">
              YOUR SELECTION
            </h2>

            <div className="border-foreground/10 flex flex-col border-t">
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

          <div className="flex flex-col gap-10 text-left lg:col-span-4">
            <div className="flex flex-col gap-6">
              <h3 className="text-foreground border-foreground/10 border-b pb-4 font-sans text-base font-light tracking-wider uppercase">
                SUMMARY
              </h3>

              <div className="text-muted-foreground flex flex-col gap-4 font-mono text-[11px] tracking-widest uppercase">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-foreground">{formatInr(subtotal)}</span>
                </div>

                <div className="border-foreground/5 flex justify-between border-t pt-4">
                  <span>SHIPPING</span>
                  <span className="text-foreground">
                    {shippingCost === 0
                      ? "COMPLIMENTARY"
                      : formatInr(shippingCost)}
                  </span>
                </div>

                {appliedPromo && (
                  <div className="border-foreground/5 flex justify-between border-t pt-4 text-emerald-600 dark:text-emerald-400">
                    <span>SAVINGS</span>
                    <span>-{formatInr(promoDiscount)}</span>
                  </div>
                )}

                <div className="border-foreground/10 text-foreground flex justify-between border-t pt-5 text-sm font-semibold">
                  <span>TOTAL</span>
                  <span>{formatInr(total)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-muted-foreground font-mono text-[9px] font-bold tracking-widest uppercase">
                DELIVERY SPEED
              </span>

              <div className="flex flex-col gap-2 font-mono text-[10px] tracking-wider uppercase">
                <button
                  type="button"
                  onClick={selectStandardShipping}
                  aria-pressed={shippingOption === "standard"}
                  className={`flex cursor-pointer justify-between rounded-none border p-3.5 text-left transition-all ${
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
                  className={`flex cursor-pointer justify-between rounded-none border p-3.5 text-left transition-all ${
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
              <span className="text-muted-foreground font-mono text-[9px] font-bold tracking-widest uppercase">
                PROMO CODE
              </span>

              {appliedPromo ? (
                <div className="flex items-center justify-between border border-emerald-500/20 bg-emerald-500/2 p-3">
                  <span className="font-mono text-[10px] font-semibold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                    {appliedPromo}
                  </span>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="cursor-pointer font-mono text-[9px] font-bold tracking-widest text-emerald-600 uppercase hover:underline dark:text-emerald-400"
                  >
                    [REMOVE]
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <label htmlFor="promo-code" className="sr-only">
                    Promo code
                  </label>
                  <input
                    id="promo-code"
                    type="text"
                    placeholder="PROMO CODE (AURA20)"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    className="border-foreground/20 focus:border-foreground/70 placeholder:text-muted-foreground/30 focus-visible:ring-ring/50 flex-1 rounded-none border-b bg-transparent py-2.5 font-mono text-[10px] tracking-widest uppercase transition-colors outline-none focus-visible:ring-3"
                  />
                  <button
                    type="submit"
                    className="border-foreground/20 hover:border-foreground hover:bg-foreground/2 text-foreground cursor-pointer rounded-none border px-4 py-2.5 font-mono text-[10px] font-semibold tracking-widest uppercase transition-all"
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
                className="bg-foreground text-background hover:bg-foreground/90 flex w-full cursor-pointer items-center justify-center rounded-none py-5 font-mono text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300"
              >
                PROCEED TO DELIVERY
              </button>

              <p className="text-muted-foreground/60 text-center font-mono text-[9px] leading-relaxed tracking-widest uppercase">
                Secure luxury checkout with complementary returns
              </p>
            </div>
          </div>
        </div>
      )}
    </m.div>
  );
}
