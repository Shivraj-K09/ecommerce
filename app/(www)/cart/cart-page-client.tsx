"use client";

import { AnimatePresence } from "motion/react";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutLoading } from "@/components/checkout/checkout-loading";
import { CheckoutStepsNav } from "@/components/checkout/checkout-steps-nav";
import { CheckoutBagStep } from "@/components/checkout/checkout-bag-step";
import { CheckoutDeliveryStep } from "@/components/checkout/checkout-delivery-step";
import { CheckoutPaymentStep } from "@/components/checkout/checkout-payment-step";
import { CheckoutSuccessStep } from "@/components/checkout/checkout-success-step";

export function CartPageClient() {
  const checkout = useCheckout();

  if (!checkout.mounted) {
    return <CheckoutLoading />;
  }

  const { step } = checkout;

  return (
    <div className="bg-background text-foreground relative flex w-full flex-col overflow-x-hidden pb-20 font-sans transition-colors duration-500 select-none">
      <div className="relative z-20 mx-auto mt-8 flex w-full max-w-[1120px] flex-1 flex-col px-6">
        <h1 className="sr-only">Checkout</h1>
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {step === 1 && "Step 1 of 3: Shopping bag"}
          {step === 2 && "Step 2 of 3: Delivery information"}
          {step === 3 && "Step 3 of 3: Payment"}
          {step === 4 && "Order confirmed"}
        </div>

        {step < 4 && <CheckoutStepsNav checkout={checkout} />}

        <AnimatePresence mode="wait">
          {step === 1 && <CheckoutBagStep checkout={checkout} />}
          {step === 2 && <CheckoutDeliveryStep checkout={checkout} />}
          {step === 3 && <CheckoutPaymentStep checkout={checkout} />}
          {step === 4 && <CheckoutSuccessStep checkout={checkout} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
