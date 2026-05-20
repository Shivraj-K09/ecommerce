"use client";

import * as m from "motion/react-m";
import type { UseCheckoutReturn } from "@/hooks/use-checkout";

type Props = { checkout: UseCheckoutReturn };

export function CheckoutPaymentStep({ checkout }: Props) {
  const {
    paymentForm,
    isFlipped,
    isProcessingPayment,
    handleFinalPayment,
    handleCardholderFocus,
    handlePaymentCardholderChange,
    handlePaymentNumberChange,
    handlePaymentExpiryChange,
    handlePaymentCvcChange,
    handleCvcFieldFocus,
    handleCvcFieldBlur,
    togglePaymentCardFlip,
    handlePaymentCardVisualizerKeyDown,
    returnToDeliveryFromPayment,
  } = checkout;

  return (
    <m.div
      key="step-3"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16"
    >
      <div className="flex flex-col text-left lg:col-span-6">
        <h2 className="text-foreground mb-6 font-sans text-2xl font-light tracking-wider uppercase">
          SECURE PAYMENT
        </h2>

        <form onSubmit={handleFinalPayment} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="payment-cardholder"
              className="text-muted-foreground font-mono text-[9px] font-semibold tracking-widest uppercase"
            >
              Cardholder Name *
            </label>
            <input
              id="payment-cardholder"
              type="text"
              required
              placeholder="Name as it appears on credit card"
              value={paymentForm.cardholder}
              onFocus={handleCardholderFocus}
              onChange={handlePaymentCardholderChange}
              className="border-foreground/20 focus:border-foreground/80 w-full rounded-none border-b bg-transparent py-3 text-sm font-light uppercase outline-hidden"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="payment-number"
              className="text-muted-foreground font-mono text-[9px] font-semibold tracking-widest uppercase"
            >
              Card Number *
            </label>
            <input
              id="payment-number"
              type="text"
              required
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              value={paymentForm.number}
              onFocus={handleCardholderFocus}
              onChange={handlePaymentNumberChange}
              className="border-foreground/20 focus:border-foreground/80 w-full rounded-none border-b bg-transparent py-3 font-mono text-sm font-light outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="payment-expiry"
                className="text-muted-foreground font-mono text-[9px] font-semibold tracking-widest uppercase"
              >
                Expiration MM/YY
              </label>
              <input
                id="payment-expiry"
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                value={paymentForm.expiry}
                onFocus={handleCardholderFocus}
                onChange={handlePaymentExpiryChange}
                className="border-foreground/20 focus:border-foreground/80 w-full rounded-none border-b bg-transparent py-3 font-mono text-sm font-light outline-hidden"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="payment-cvc"
                className="text-muted-foreground font-mono text-[9px] font-semibold tracking-widest uppercase"
              >
                Security CVC *
              </label>
              <input
                id="payment-cvc"
                type="password"
                required
                placeholder="000"
                maxLength={3}
                value={paymentForm.cvc}
                onFocus={handleCvcFieldFocus}
                onBlur={handleCvcFieldBlur}
                onChange={handlePaymentCvcChange}
                className="border-foreground/20 focus:border-foreground/80 w-full rounded-none border-b bg-transparent py-3 font-mono text-sm font-light outline-hidden"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <button
              type="submit"
              disabled={isProcessingPayment}
              className="bg-foreground text-background hover:bg-foreground/90 flex w-full cursor-pointer items-center justify-center gap-2 rounded-none py-5 font-mono text-xs font-semibold tracking-[0.25em] uppercase transition-colors disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <>
                  <span className="border-background size-3.5 animate-spin rounded-full border-2 border-t-transparent" />
                  <span>PROCESSING PAYMENT…</span>
                </>
              ) : (
                <span>COMPLETE ORDER</span>
              )}
            </button>

            <button
              type="button"
              onClick={returnToDeliveryFromPayment}
              className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center justify-center gap-2 border-none bg-transparent py-1 font-mono text-[10px] tracking-wider uppercase transition-colors"
            >
              Return to delivery information
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col items-center justify-start gap-6 select-none lg:col-span-6">
        <span className="text-muted-foreground self-start font-mono text-[9px] font-bold tracking-widest uppercase">
          INTERACTIVE CARD SECURE VISUALIZER
        </span>

        <div
          role="button"
          tabIndex={0}
          onClick={togglePaymentCardFlip}
          onKeyDown={handlePaymentCardVisualizerKeyDown}
          aria-label="Flip payment card preview"
          className="focus-visible:ring-ring/50 aspect-[1.586/1] w-full max-w-[360px] cursor-pointer rounded-2xl outline-offset-2 focus-visible:ring-3 focus-visible:outline-none"
          style={{ perspective: "1000px" }}
        >
          <m.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/20 p-6 text-white shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
                background:
                  "linear-gradient(135deg, #161616 0%, #2A241A 50%, #0A0A0A 100%)",
              }}
            >
              <div className="pointer-events-none absolute inset-0 -translate-y-1/2 scale-150 rotate-12 animate-pulse bg-linear-to-tr from-transparent via-white/4 to-transparent" />
              <div className="pointer-events-none absolute top-0 right-0 size-44 rounded-full bg-white/2 blur-2xl" />

              <div className="flex items-start justify-between">
                <div className="relative flex h-7 w-10 flex-col justify-between overflow-hidden rounded border border-[#D5A03A]/70 bg-radial from-[#FEEFB3] to-[#D5A03A] p-1.5 shadow-inner">
                  <div className="h-[0.5px] w-full bg-[#B08127]/50" />
                  <div className="h-[0.5px] w-full bg-[#B08127]/50" />
                  <div className="absolute top-0 bottom-0 left-1/3 w-[0.5px] bg-[#B08127]/50" />
                  <div className="absolute top-0 right-1/3 bottom-0 w-[0.5px] bg-[#B08127]/50" />
                </div>

                <span className="font-sans text-sm font-semibold tracking-[0.3em] text-white/95 uppercase drop-shadow-xs">
                  AURA
                </span>
              </div>

              <div className="py-2 text-left font-mono text-lg font-semibold tracking-[0.18em] text-white/95 md:text-xl">
                {paymentForm.number || "•••• •••• •••• ••••"}
              </div>

              <div className="flex items-end justify-between text-left">
                <div className="flex max-w-[70%] flex-col">
                  <span className="text-store-min font-mono tracking-widest text-white/40 uppercase">
                    CARDHOLDER
                  </span>
                  <span className="truncate font-mono text-xs font-semibold tracking-wider text-white/95 uppercase">
                    {paymentForm.cardholder || "YOUR NAME"}
                  </span>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-col text-right">
                    <span className="text-store-min font-mono tracking-widest text-white/40 uppercase">
                      EXPIRES
                    </span>
                    <span className="font-mono text-xs font-semibold tracking-wider text-white/95">
                      {paymentForm.expiry || "MM/YY"}
                    </span>
                  </div>

                  <div className="mb-0.5 flex shrink-0 gap-x-2.5 opacity-90">
                    <div className="size-5.5 rounded-full border border-[#D5A03A] bg-[#D5A03A]/20" />
                    <div className="size-5.5 rounded-full border border-[#E9B646] bg-[#E9B646]/30" />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/20 py-6 text-white shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "linear-gradient(135deg, #0D0D0D 0%, #171717 100%)",
              }}
            >
              <div className="mt-1 h-11 w-full bg-black/90" />

              <div className="mt-2 flex flex-col gap-2 px-6 text-left">
                <span className="text-store-min font-mono tracking-widest text-white/40 uppercase">
                  AUTHORIZED SIGNATURE
                </span>

                <div className="flex items-center gap-3">
                  <div className="relative flex h-8 flex-1 items-center justify-start border border-white/5 bg-neutral-800/40 px-3 font-mono text-[10px] tracking-wider text-white/60 italic opacity-80">
                    aura secure check
                  </div>

                  <div className="flex h-8 w-12 items-center justify-center rounded bg-white font-mono text-xs font-bold text-black">
                    {paymentForm.cvc || "•••"}
                  </div>
                </div>
              </div>

              <div className="text-store-min mt-1 px-6 text-left font-mono leading-relaxed tracking-wide text-white/20 uppercase">
                Secure transaction processed using 256-bit encrypted SSL
                network. AURA flagships will never store credit card records.
              </div>
            </div>
          </m.div>
        </div>

        <p className="text-muted-foreground/60 font-mono text-[9px] tracking-widest uppercase">
          Card visualizer auto-flips to show CVC code security
        </p>
      </div>
    </m.div>
  );
}
