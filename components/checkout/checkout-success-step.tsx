"use client";

import * as m from "motion/react-m";
import type { UseCheckoutReturn } from "@/hooks/use-checkout";
import { IconCheck } from "@tabler/icons-react";
import { formatInr } from "@/lib/money";

type Props = { checkout: UseCheckoutReturn };

export function CheckoutSuccessStep({ checkout }: Props) {
  const {
    receiptData, navigateHome
  } = checkout;

  return (
    <m.div
                  key="step-4"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className="w-full max-w-[640px] mx-auto text-center py-16 flex flex-col items-center justify-center select-none"
                >
                  <div className="size-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-6">
                    <IconCheck className="size-8 stroke-[2.5]" />
                  </div>
    
                  <h1 className="font-sans font-light text-3xl uppercase tracking-wider text-foreground">
                    ORDER SECURED & PAID
                  </h1>
    
                  <p className="font-sans font-light text-sm text-muted-foreground mt-3 max-w-[360px] leading-relaxed">
                    Thank you for your purchase. Your payment has been received and
                    verified successfully.
                  </p>
    
                  <div className="w-full border-t border-b border-foreground/10 py-6 mt-8 flex flex-col gap-4 text-left">
                    <span className="font-mono text-[10px] tracking-widest text-foreground font-bold uppercase">
                      ORDER RECEIPT
                    </span>
    
                    <div className="flex flex-col gap-2 text-xs font-mono text-muted-foreground uppercase">
                      {receiptData.items.map((item) => (
                        <div
                          key={`${item.product.id}-${item.selectedColor}`}
                          className="flex justify-between"
                        >
                          <span className="truncate max-w-[70%]">
                            {item.product.name} (x{item.quantity})
                          </span>
                          <span className="text-foreground">
                            {formatInr(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
    
                    <div className="flex flex-col gap-2 border-t border-foreground/5 pt-4 text-xs font-mono text-muted-foreground uppercase">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="text-foreground">
                          {formatInr(receiptData.subtotal)}
                        </span>
                      </div>
    
                      <div className="flex justify-between">
                        <span>Shipping Speed</span>
                        <span className="text-foreground">
                          {receiptData.shippingCost === 0
                            ? "COMPLIMENTARY"
                            : formatInr(receiptData.shippingCost)}
                        </span>
                      </div>
    
                      <div className="flex justify-between border-t border-foreground/10 pt-3 text-sm text-foreground font-bold">
                        <span>TOTAL CHARGED</span>
                        <span>{formatInr(receiptData.total)}</span>
                      </div>
                    </div>
    
                    <div className="flex flex-col gap-1.5 border-t border-foreground/5 pt-4 text-xs font-mono uppercase">
                      <span className="text-muted-foreground">
                        SHIPPING LOCATION:
                      </span>
                      <span className="text-foreground font-semibold leading-relaxed">
                        {receiptData.address || "Aura Flagships Hub"}
                      </span>
                    </div>
    
                    <div className="flex flex-col gap-1.5 text-xs font-mono uppercase">
                      <span className="text-muted-foreground">SHIPPING SPEED:</span>
                      <span className="text-foreground font-semibold">
                        {receiptData.shippingSpeed}
                      </span>
                    </div>
                  </div>
    
                  <button
                    type="button"
                    onClick={navigateHome}
                    className="mt-10 bg-foreground text-background font-mono text-xs uppercase tracking-[0.25em] py-5 px-8 font-semibold hover:bg-foreground/90 transition-colors cursor-pointer rounded-none"
                  >
                    RETURN TO FLAGSHIPS
                  </button>
                </m.div>
  );
}
