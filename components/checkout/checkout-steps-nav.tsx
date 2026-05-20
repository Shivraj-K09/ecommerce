"use client";

import type { UseCheckoutReturn } from "@/hooks/use-checkout";

type Props = { checkout: UseCheckoutReturn };

export function CheckoutStepsNav({ checkout }: Props) {
  const { step, cart, deliveryForm, goToStep1, goToStep2, goToStep3 } =
    checkout;

  return (
    <div className="mb-10 flex flex-col gap-6">
      <div className="text-muted-foreground/45 border-foreground/10 flex items-center justify-center gap-12 border-b pb-5 font-mono text-[10px] tracking-widest sm:justify-start">
        <button
          type="button"
          onClick={goToStep1}
          aria-current={step === 1 ? "step" : undefined}
          className={`cursor-pointer transition-colors duration-300 ${step === 1 ? "text-foreground font-bold" : "hover:text-foreground"}`}
        >
          1. BAG
        </button>
        <span className="bg-foreground/20 size-1 rounded-full" />
        <button
          type="button"
          onClick={goToStep2}
          disabled={cart.length === 0}
          aria-current={step === 2 ? "step" : undefined}
          className={`transition-colors duration-300 ${step === 2 ? "text-foreground cursor-pointer font-bold" : step > 2 ? "text-foreground cursor-pointer" : "cursor-not-allowed"}`}
        >
          2. DELIVERY
        </button>
        <span className="bg-foreground/20 size-1 rounded-full" />
        <button
          type="button"
          onClick={goToStep3}
          disabled={cart.length === 0 || !deliveryForm.name}
          aria-current={step === 3 ? "step" : undefined}
          className={`transition-colors duration-300 ${step === 3 ? "text-foreground cursor-pointer font-bold" : "cursor-not-allowed"}`}
        >
          3. PAYMENT
        </button>
      </div>
    </div>
  );
}
