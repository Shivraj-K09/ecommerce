"use client";

import type { UseCheckoutReturn } from "@/hooks/use-checkout";

type Props = { checkout: UseCheckoutReturn };

export function CheckoutStepsNav({ checkout }: Props) {
  const { step, cart, deliveryForm, goToStep1, goToStep2, goToStep3 } = checkout;

  return (
    <div className="flex flex-col gap-6 mb-10">
                <div className="flex items-center gap-12 font-mono text-[10px] tracking-widest text-muted-foreground/45 border-b border-foreground/10 pb-5 justify-center sm:justify-start">
                  <button
                    type="button"
                    onClick={goToStep1}
                    aria-current={step === 1 ? "step" : undefined}
                    className={`transition-colors duration-300 cursor-pointer ${step === 1 ? "text-foreground font-bold" : "hover:text-foreground"}`}
                  >
                    1. BAG
                  </button>
                  <span className="size-1 rounded-full bg-foreground/20" />
                  <button
                    type="button"
                    onClick={goToStep2}
                    disabled={cart.length === 0}
                    aria-current={step === 2 ? "step" : undefined}
                    className={`transition-colors duration-300 ${step === 2 ? "text-foreground font-bold cursor-pointer" : step > 2 ? "text-foreground cursor-pointer" : "cursor-not-allowed"}`}
                  >
                    2. DELIVERY
                  </button>
                  <span className="size-1 rounded-full bg-foreground/20" />
                  <button
                    type="button"
                    onClick={goToStep3}
                    disabled={cart.length === 0 || !deliveryForm.name}
                    aria-current={step === 3 ? "step" : undefined}
                    className={`transition-colors duration-300 ${step === 3 ? "text-foreground font-bold cursor-pointer" : "cursor-not-allowed"}`}
                  >
                    3. PAYMENT
                  </button>
                </div>
              </div>
            
  );
}
