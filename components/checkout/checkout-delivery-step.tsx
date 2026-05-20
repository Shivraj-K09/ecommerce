"use client";

import * as m from "motion/react-m";
import type { UseCheckoutReturn } from "@/hooks/use-checkout";


type Props = { checkout: UseCheckoutReturn };

export function CheckoutDeliveryStep({ checkout }: Props) {
  const {
    deliveryForm, updateDeliveryField, proceedToPayment, returnToBagFromDelivery
  } = checkout;

  return (
    <m.div
                  key="step-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
                >
                  <div className="lg:col-span-6 flex flex-col text-left">
                    <h2 className="font-sans font-light text-2xl uppercase tracking-wider text-foreground mb-6">
                      DELIVERY DETAILS
                    </h2>
    
                    <form
                      onSubmit={proceedToPayment}
                      className="flex flex-col gap-6"
                    >
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="delivery-name"
                          className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold"
                        >
                          Full Name *
                        </label>
                        <input
                          id="delivery-name"
                          type="text"
                          required
                          placeholder="Cardholder or receiver name"
                          value={deliveryForm.name}
                          onChange={(e) => updateDeliveryField('name', e.target.value)}
                          className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light"
                        />
                      </div>
    
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="delivery-email"
                          className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold"
                        >
                          Email Address *
                        </label>
                        <input
                          id="delivery-email"
                          type="email"
                          required
                          placeholder="receiver@gmail.com"
                          value={deliveryForm.email}
                          onChange={(e) => updateDeliveryField('email', e.target.value)}
                          className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light"
                        />
                      </div>
    
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="delivery-address"
                          className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold"
                        >
                          Shipping Address *
                        </label>
                        <input
                          id="delivery-address"
                          type="text"
                          required
                          placeholder="123 Aura Ave, Suite A"
                          value={deliveryForm.address}
                          onChange={(e) => updateDeliveryField('address', e.target.value)}
                          className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light"
                        />
                      </div>
    
                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="delivery-city"
                            className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold"
                          >
                            City
                          </label>
                          <input
                            id="delivery-city"
                            type="text"
                            placeholder="Los Angeles"
                            value={deliveryForm.city}
                            onChange={(e) => updateDeliveryField('city', e.target.value)}
                            className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light"
                          />
                        </div>
    
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="delivery-zip"
                            className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold"
                          >
                            Zip Code
                          </label>
                          <input
                            id="delivery-zip"
                            type="text"
                            placeholder="90001"
                            value={deliveryForm.zip}
                            onChange={(e) => updateDeliveryField('zip', e.target.value)}
                            className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light"
                          />
                        </div>
                      </div>
    
                      <div className="flex flex-col gap-4 mt-6">
                        <button
                          type="submit"
                          className="w-full bg-foreground text-background font-mono text-xs uppercase tracking-[0.25em] py-5 font-semibold hover:bg-foreground/90 transition-colors cursor-pointer rounded-none"
                        >
                          PROCEED TO PAYMENT
                        </button>
    
                        <button
                          type="button"
                          onClick={returnToBagFromDelivery}
                          className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none py-1"
                        >
                          Return to Bag selection
                        </button>
                      </div>
                    </form>
                  </div>
    
                  <div className="lg:col-span-6 flex flex-col text-left gap-4">
                    <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground font-bold">
                      TRANSIT TELEMETRY: REAL-TIME ROUTING MAP
                    </span>
    
                    <div className="relative w-full aspect-square bg-[#0E0E0E] dark:bg-[#070707] border border-foreground/10 overflow-hidden flex flex-col items-center justify-center">
                      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 pointer-events-none opacity-20">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div
                            key={i}
                            className="border border-foreground/6 w-full h-full"
                          />
                        ))}
                      </div>
    
                      <svg
                        className="absolute inset-0 w-full h-full opacity-35 stroke-foreground/45 stroke-[0.85] fill-none"
                        viewBox="0 0 400 400"
                      >
                        <circle
                          cx="200"
                          cy="200"
                          r="160"
                          strokeDasharray="3, 3"
                          className="stroke-foreground/15"
                        />
                        <circle
                          cx="200"
                          cy="200"
                          r="90"
                          strokeDasharray="1, 4"
                          className="stroke-foreground/15"
                        />
                        <line
                          x1="200"
                          y1="0"
                          x2="200"
                          y2="400"
                          className="stroke-foreground/10"
                        />
                        <line
                          x1="0"
                          y1="200"
                          x2="400"
                          y2="200"
                          className="stroke-foreground/10"
                        />
                        <path d="M 0,100 Q 150,150 200,200 T 400,300" />
                        <path
                          d="M 50,400 Q 180,240 280,120 T 350,0"
                          className="stroke-foreground/20"
                        />
                        <path d="M 120,0 C 180,180 200,220 400,150" />
                        <path
                          d="M 0,280 C 180,310 240,180 320,400"
                          className="stroke-foreground/15"
                        />
    
                        {deliveryForm.address && (
                          <m.path
                            d="M 200,200 L 280,120"
                            fill="none"
                            className="stroke-emerald-500 stroke-[1.8]"
                            strokeDasharray="4, 4"
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{
                              repeat: Infinity,
                              ease: "linear",
                              duration: 4,
                            }}
                          />
                        )}
    
                        <g transform="translate(200, 200)">
                          <circle
                            r="5"
                            fill="#0A0A0A"
                            stroke="var(--foreground)"
                            strokeWidth="1.5"
                          />
                          <circle r="1.5" fill="var(--foreground)" />
    
                          <rect
                            x="-42"
                            y="10"
                            width="84"
                            height="13"
                            fill="#0A0A0A"
                            stroke="var(--foreground)"
                            strokeWidth="0.5"
                            opacity="0.9"
                          />
                          <text
                            x="0"
                            y="18"
                            fontFamily="monospace"
                            fontSize="6.5"
                            fill="var(--foreground)"
                            textAnchor="middle"
                            letterSpacing="0.8"
                            fontWeight="bold"
                          >
                            AURA WAREHOUSE
                          </text>
                        </g>
    
                        {deliveryForm.address && (
                          <g transform="translate(280, 120)">
                            <circle r="12" fill="rgba(16, 185, 129, 0.2)">
                              <animate
                                attributeName="r"
                                values="6;14;6"
                                dur="2.5s"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="opacity"
                                values="0.7;0;0.7"
                                dur="2.5s"
                                repeatCount="indefinite"
                              />
                            </circle>
                            <circle
                              r="4"
                              fill="#10B981"
                              stroke="#FFFFFF"
                              strokeWidth="1.2"
                            />
    
                            <rect
                              x="-35"
                              y="10"
                              width="70"
                              height="13"
                              fill="#0E0E0E"
                              stroke="rgba(16, 185, 129, 0.3)"
                              strokeWidth="0.5"
                              opacity="0.9"
                            />
                            <text
                              x="0"
                              y="18"
                              fontFamily="monospace"
                              fontSize="6.5"
                              fill="#10B981"
                              textAnchor="middle"
                              letterSpacing="0.5"
                              fontWeight="bold"
                            >
                              {deliveryForm.city
                                ? deliveryForm.city.toUpperCase().slice(0, 12)
                                : "DESTINATION"}
                            </text>
                          </g>
                        )}
                      </svg>
    
                      <div className="absolute bottom-4 left-4 right-4 bg-[#0A0A0A]/95 border border-foreground/10 px-4 py-3 font-mono text-[9px] tracking-wider uppercase flex items-center justify-between text-muted-foreground select-none">
                        <div className="flex flex-col gap-0.5">
                          <span>COORD: 34.0522° N, 118.2437° W</span>
                          <span className="text-foreground">
                            ROUTE:{" "}
                            {deliveryForm.address
                              ? "LOCKED & CALCULATED"
                              : "AWAITING ADDR"}
                          </span>
                        </div>
                        {deliveryForm.address ? (
                          <span className="text-emerald-500 animate-pulse font-bold">
                            LIVE GPS READY
                          </span>
                        ) : (
                          <span className="text-muted-foreground/40 font-bold">
                            STANDBY
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </m.div>
  );
}
