"use client";

import * as m from "motion/react-m";
import type { UseCheckoutReturn } from "@/hooks/use-checkout";
import { IconCheck } from "@tabler/icons-react";
import { formatInr } from "@/lib/money";

type Props = { checkout: UseCheckoutReturn };

export function CheckoutSuccessStep({ checkout }: Props) {
  const { receiptData, navigateHome } = checkout;

  return (
    <m.div
      key="step-4"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className="mx-auto flex w-full max-w-[640px] flex-col items-center justify-center py-16 text-center select-none"
    >
      <div className="mb-6 flex size-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
        <IconCheck className="size-8 stroke-[2.5]" />
      </div>

      <h1 className="text-foreground font-sans text-3xl font-light tracking-wider uppercase">
        ORDER SECURED & PAID
      </h1>

      <p className="text-muted-foreground mt-3 max-w-[360px] font-sans text-sm leading-relaxed font-light">
        Thank you for your purchase. Your payment has been received and verified
        successfully.
      </p>

      <div className="border-foreground/10 mt-8 flex w-full flex-col gap-4 border-t border-b py-6 text-left">
        <span className="text-foreground font-mono text-[10px] font-bold tracking-widest uppercase">
          ORDER RECEIPT
        </span>

        <div className="text-muted-foreground flex flex-col gap-2 font-mono text-xs uppercase">
          {receiptData.items.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedColor}`}
              className="flex justify-between"
            >
              <span className="max-w-[70%] truncate">
                {item.product.name} (x{item.quantity})
              </span>
              <span className="text-foreground">
                {formatInr(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-foreground/5 text-muted-foreground flex flex-col gap-2 border-t pt-4 font-mono text-xs uppercase">
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

          <div className="border-foreground/10 text-foreground flex justify-between border-t pt-3 text-sm font-bold">
            <span>TOTAL CHARGED</span>
            <span>{formatInr(receiptData.total)}</span>
          </div>
        </div>

        <div className="border-foreground/5 flex flex-col gap-1.5 border-t pt-4 font-mono text-xs uppercase">
          <span className="text-muted-foreground">SHIPPING LOCATION:</span>
          <span className="text-foreground leading-relaxed font-semibold">
            {receiptData.address || "Aura Flagships Hub"}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 font-mono text-xs uppercase">
          <span className="text-muted-foreground">SHIPPING SPEED:</span>
          <span className="text-foreground font-semibold">
            {receiptData.shippingSpeed}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={navigateHome}
        className="bg-foreground text-background hover:bg-foreground/90 mt-10 cursor-pointer rounded-none px-8 py-5 font-mono text-xs font-semibold tracking-[0.25em] uppercase transition-colors"
      >
        RETURN TO FLAGSHIPS
      </button>
    </m.div>
  );
}
