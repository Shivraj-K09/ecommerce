"use client";

import * as m from "motion/react-m";
import type { UseCheckoutReturn } from "@/hooks/use-checkout";


type Props = { checkout: UseCheckoutReturn };

export function CheckoutPaymentStep({ checkout }: Props) {
  const {
    paymentForm, isFlipped, isProcessingPayment, handleFinalPayment, handleCardholderFocus, handlePaymentCardholderChange, handlePaymentNumberChange, handlePaymentExpiryChange, handlePaymentCvcChange, handleCvcFieldFocus, handleCvcFieldBlur, togglePaymentCardFlip, handlePaymentCardVisualizerKeyDown, returnToDeliveryFromPayment
  } = checkout;

  return (
    <m.div
                  key="step-3"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
                >
                  <div className="lg:col-span-6 flex flex-col text-left">
                    <h2 className="font-sans font-light text-2xl uppercase tracking-wider text-foreground mb-6">
                      SECURE PAYMENT
                    </h2>
    
                    <form
                      onSubmit={handleFinalPayment}
                      className="flex flex-col gap-6"
                    >
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="payment-cardholder"
                          className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold"
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
                          className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light uppercase"
                        />
                      </div>
    
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="payment-number"
                          className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold"
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
                          className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light font-mono"
                        />
                      </div>
    
                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="payment-expiry"
                            className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold"
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
                            className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light font-mono"
                          />
                        </div>
    
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="payment-cvc"
                            className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold"
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
                            className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light font-mono"
                          />
                        </div>
                      </div>
    
                      <div className="flex flex-col gap-4 mt-6">
                        <button
                          type="submit"
                          disabled={isProcessingPayment}
                          className="w-full bg-foreground text-background font-mono text-xs uppercase tracking-[0.25em] py-5 font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-50 cursor-pointer rounded-none flex items-center justify-center gap-2"
                        >
                          {isProcessingPayment ? (
                            <>
                              <span className="size-3.5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                              <span>PROCESSING PAYMENT…</span>
                            </>
                          ) : (
                            <span>COMPLETE ORDER</span>
                          )}
                        </button>
    
                        <button
                          type="button"
                          onClick={returnToDeliveryFromPayment}
                          className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none py-1"
                        >
                          Return to delivery information
                        </button>
                      </div>
                    </form>
                  </div>
    
                  <div className="lg:col-span-6 flex flex-col items-center justify-start gap-6 select-none">
                    <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-bold self-start">
                      INTERACTIVE CARD SECURE VISUALIZER
                    </span>
    
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={togglePaymentCardFlip}
                      onKeyDown={handlePaymentCardVisualizerKeyDown}
                      aria-label="Flip payment card preview"
                      className="w-full max-w-[360px] aspect-[1.586/1] cursor-pointer outline-offset-2 rounded-2xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                      style={{ perspective: "1000px" }}
                    >
                      <m.div
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 26 }}
                        className="w-full h-full relative"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl p-6 text-white flex flex-col justify-between overflow-hidden shadow-2xl border border-white/20"
                          style={{
                            backfaceVisibility: "hidden",
                            background:
                              "linear-gradient(135deg, #161616 0%, #2A241A 50%, #0A0A0A 100%)",
                          }}
                        >
                          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/4 to-transparent rotate-12 -translate-y-1/2 scale-150 pointer-events-none animate-pulse" />
                          <div className="absolute top-0 right-0 size-44 bg-white/2 rounded-full blur-2xl pointer-events-none" />
    
                          <div className="flex justify-between items-start">
                            <div className="w-10 h-7 rounded bg-radial from-[#FEEFB3] to-[#D5A03A] relative overflow-hidden flex flex-col justify-between p-1.5 border border-[#D5A03A]/70 shadow-inner">
                              <div className="w-full h-[0.5px] bg-[#B08127]/50" />
                              <div className="w-full h-[0.5px] bg-[#B08127]/50" />
                              <div className="absolute top-0 bottom-0 left-1/3 w-[0.5px] bg-[#B08127]/50" />
                              <div className="absolute top-0 bottom-0 right-1/3 w-[0.5px] bg-[#B08127]/50" />
                            </div>
    
                            <span className="font-sans font-semibold text-sm tracking-[0.3em] uppercase text-white/95 drop-shadow-xs">
                              AURA
                            </span>
                          </div>
    
                          <div className="font-mono text-lg md:text-xl tracking-[0.18em] text-white/95 text-left py-2 font-semibold">
                            {paymentForm.number || "•••• •••• •••• ••••"}
                          </div>
    
                          <div className="flex justify-between items-end text-left">
                            <div className="flex flex-col max-w-[70%]">
                              <span className="font-mono text-store-min tracking-widest text-white/40 uppercase">
                                CARDHOLDER
                              </span>
                              <span className="font-mono text-xs tracking-wider text-white/95 truncate font-semibold uppercase">
                                {paymentForm.cardholder || "YOUR NAME"}
                              </span>
                            </div>
    
                            <div className="flex justify-between gap-4 items-end">
                              <div className="flex flex-col text-right">
                                <span className="font-mono text-store-min tracking-widest text-white/40 uppercase">
                                  EXPIRES
                                </span>
                                <span className="font-mono text-xs tracking-wider text-white/95 font-semibold">
                                  {paymentForm.expiry || "MM/YY"}
                                </span>
                              </div>
    
                              <div className="flex gap-x-2.5 opacity-90 shrink-0 mb-0.5">
                                <div className="size-5.5 rounded-full border border-[#D5A03A] bg-[#D5A03A]/20" />
                                <div className="size-5.5 rounded-full border border-[#E9B646] bg-[#E9B646]/30" />
                              </div>
                            </div>
                          </div>
                        </div>
    
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl text-white flex flex-col justify-between py-6 overflow-hidden shadow-2xl border border-white/20"
                          style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                            background:
                              "linear-gradient(135deg, #0D0D0D 0%, #171717 100%)",
                          }}
                        >
                          <div className="w-full h-11 bg-black/90 mt-1" />
    
                          <div className="px-6 flex flex-col gap-2 text-left mt-2">
                            <span className="font-mono text-store-min tracking-widest text-white/40 uppercase">
                              AUTHORIZED SIGNATURE
                            </span>
    
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-8 bg-neutral-800/40 border border-white/5 opacity-80 relative flex items-center justify-start px-3 font-mono text-[10px] italic text-white/60 tracking-wider">
                                aura secure check
                              </div>
    
                              <div className="w-12 h-8 bg-white text-black font-mono text-xs font-bold flex items-center justify-center rounded">
                                {paymentForm.cvc || "•••"}
                              </div>
                            </div>
                          </div>
    
                          <div className="px-6 text-store-min text-white/20 font-mono tracking-wide uppercase leading-relaxed text-left mt-1">
                            Secure transaction processed using 256-bit encrypted SSL
                            network. AURA flagships will never store credit card
                            records.
                          </div>
                        </div>
                      </m.div>
                    </div>
    
                    <p className="font-mono text-[9px] tracking-widest text-muted-foreground/60 uppercase">
                      Card visualizer auto-flips to show CVC code security
                    </p>
                  </div>
                </m.div>
  );
}
