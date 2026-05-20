"use client";

import { AnimatePresence } from "motion/react";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutLoading } from "@/components/checkout/checkout-loading";
import { CheckoutStepsNav } from "@/components/checkout/checkout-steps-nav";
import { CheckoutBagStep } from "@/components/checkout/checkout-bag-step";
import { CheckoutDeliveryStep } from "@/components/checkout/checkout-delivery-step";
import { CheckoutPaymentStep } from "@/components/checkout/checkout-payment-step";
import { CheckoutSuccessStep } from "@/components/checkout/checkout-success-step";

export default function CartPage() {
    const checkout = useCheckout();

    if (!checkout.mounted) {
        return <CheckoutLoading />;
    }

    const { step } = checkout;

    return (
        <div className="relative w-full bg-background text-foreground overflow-x-hidden font-sans select-none flex flex-col pb-20 transition-colors duration-500">
            <div className="w-full max-w-[1120px] mx-auto px-6 mt-8 relative z-20 flex-1 flex flex-col">
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
