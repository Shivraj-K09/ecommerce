"use client";
import React, { startTransition, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { IconCheck } from "@tabler/icons-react";
import { formatInr, FREE_SHIPPING_THRESHOLD_INR, SHIPPING_EXPRESS_INR, SHIPPING_STANDARD_INR, } from "@/lib/money";
import { CartBagLine } from "@/components/cart-bag-line";
export default function CartPage() {
    const { push } = useRouter();
    const [mounted, setMounted] = useState(false);
    const cart = useStore((state) => state.cart);
    const updateQuantity = useStore((state) => state.updateQuantity);
    const removeFromCart = useStore((state) => state.removeFromCart);
    const clearCart = useStore((state) => state.clearCart);
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [shippingOption, setShippingOption] = useState<"standard" | "express">("standard");
    const [promoCode, setPromoCode] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
    const [deliveryForm, setDeliveryForm] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
    });
    const [paymentForm, setPaymentForm] = useState({
        cardholder: "",
        number: "",
        expiry: "",
        cvc: "",
    });
    const [isFlipped, setIsFlipped] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [receiptData, setReceiptData] = useState({
        items: [] as typeof cart,
        subtotal: 0,
        shippingCost: 0,
        total: 0,
        address: "",
        shippingSpeed: "",
    });
    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);
    if (!mounted) {
        return (<div className="h-screen w-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-[1px] bg-foreground"/>
          <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            LOADING CHECKOUT
          </p>
        </div>
      </div>);
    }
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD_INR
        ? 0
        : shippingOption === "standard"
            ? SHIPPING_STANDARD_INR
            : SHIPPING_EXPRESS_INR;
    const promoDiscount = subtotal * (discountPercent / 100);
    const total = Math.max(0, subtotal + shippingCost - promoDiscount);
    const handleApplyPromo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!promoCode.trim())
            return;
        const normalized = promoCode.trim().toUpperCase();
        if (normalized === "AURA20") {
            setDiscountPercent(20);
            setAppliedPromo("AURA20 (20% OFF)");
            toast.success("Promo code applied");
            setPromoCode("");
        }
        else if (normalized === "MINIMAL") {
            setDiscountPercent(10);
            setAppliedPromo("MINIMAL (10% OFF)");
            toast.success("Promo code applied");
            setPromoCode("");
        }
        else {
            toast.error("Invalid promo code");
        }
    };
    const proceedToDelivery = () => {
        if (cart.length === 0)
            return;
        setStep(2);
    };
    const proceedToPayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!deliveryForm.name || !deliveryForm.email || !deliveryForm.address) {
            toast.error("Please fill in all required delivery fields");
            return;
        }
        setStep(3);
    };
    const handleFinalPayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!paymentForm.cardholder || !paymentForm.number || !paymentForm.cvc) {
            toast.error("Please fill in all card details");
            return;
        }
        setIsProcessingPayment(true);
        toast.info("Connecting securely to payment gateway...");
        setTimeout(() => {
            setIsProcessingPayment(false);
            setReceiptData({
                items: [...cart],
                subtotal,
                shippingCost,
                total,
                address: `${deliveryForm.address}, ${deliveryForm.city || ""} ${deliveryForm.zip || ""}`,
                shippingSpeed: shippingOption === "standard" ? "Standard Courier (3-5 Days)" : "Express Courier (Next Day)",
            });
            clearCart();
            setStep(4);
            toast.success("Payment Received Successfully");
        }, 2000);
    };
    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || "";
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length > 0) {
            return parts.join(" ");
        }
        else {
            return v;
        }
    };
    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        if (v.length >= 2) {
            return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
        }
        return v;
    };
    function navigateHome() {
        startTransition(() => {
            push("/");
        });
    }
    function goToStep1() {
        setStep(1);
    }
    function goToStep2() {
        if (cart.length > 0)
            setStep(2);
    }
    function goToStep3() {
        if (cart.length > 0 && deliveryForm.name)
            setStep(3);
    }
    function selectStandardShipping() {
        setShippingOption("standard");
    }
    function selectExpressShipping() {
        setShippingOption("express");
    }
    function handleRemovePromo() {
        setDiscountPercent(0);
        setAppliedPromo(null);
        toast.info("Promo code removed");
    }
    function handlePromoCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPromoCode(e.target.value);
    }
    function handleDeliveryNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDeliveryForm((prev) => ({ ...prev, name: e.target.value }));
    }
    function handleDeliveryEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDeliveryForm((prev) => ({ ...prev, email: e.target.value }));
    }
    function handleDeliveryAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDeliveryForm((prev) => ({ ...prev, address: e.target.value }));
    }
    function handleDeliveryCityChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDeliveryForm((prev) => ({ ...prev, city: e.target.value }));
    }
    function handleDeliveryZipChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDeliveryForm((prev) => ({ ...prev, zip: e.target.value }));
    }
    function returnToBagFromDelivery() {
        setStep(1);
    }
    function handleCardholderFocus() {
        setIsFlipped(false);
    }
    function handlePaymentNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPaymentForm((prev) => ({ ...prev, number: formatCardNumber(e.target.value) }));
    }
    function handlePaymentExpiryChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPaymentForm((prev) => ({ ...prev, expiry: formatExpiry(e.target.value) }));
    }
    function handlePaymentCvcChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPaymentForm((prev) => ({ ...prev, cvc: e.target.value.replace(/[^0-9]/g, "") }));
    }
    function handlePaymentCardholderChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPaymentForm((prev) => ({ ...prev, cardholder: e.target.value.toUpperCase() }));
    }
    function handleCvcFieldFocus() {
        setIsFlipped(true);
    }
    function handleCvcFieldBlur() {
        setIsFlipped(false);
    }
    function togglePaymentCardFlip() {
        setIsFlipped((prev) => !prev);
    }
    function handlePaymentCardVisualizerKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            togglePaymentCardFlip();
        }
    }
    function returnToDeliveryFromPayment() {
        setStep(2);
    }
    return (<div className="relative w-full bg-background text-foreground overflow-x-hidden font-sans select-none flex flex-col pb-20 transition-colors duration-500">

      
      <div className="w-full max-w-[1120px] mx-auto px-6 mt-8 relative z-20 flex-1 flex flex-col">
        
        
        {step < 4 && (<div className="flex flex-col gap-6 mb-10">
            <div className="flex items-center gap-12 font-mono text-[10px] tracking-widest text-muted-foreground/45 border-b border-foreground/10 pb-5 justify-center sm:justify-start">
              <button type="button" onClick={goToStep1} className={`transition-colors duration-300 cursor-pointer ${step === 1 ? "text-foreground font-bold" : "hover:text-foreground"}`}>
                1. BAG
              </button>
              <span className="size-1 rounded-full bg-foreground/20"/>
              <button type="button" onClick={goToStep2} disabled={cart.length === 0} className={`transition-colors duration-300 ${step === 2 ? "text-foreground font-bold cursor-pointer" : step > 2 ? "text-foreground cursor-pointer" : "cursor-not-allowed"}`}>
                2. DELIVERY
              </button>
              <span className="size-1 rounded-full bg-foreground/20"/>
              <button type="button" onClick={goToStep3} disabled={cart.length === 0 || !deliveryForm.name} className={`transition-colors duration-300 ${step === 3 ? "text-foreground font-bold cursor-pointer" : "cursor-not-allowed"}`}>
                3. PAYMENT
              </button>
            </div>
          </div>)}

        <AnimatePresence mode="wait">
          
          {step === 1 && (<m.div key="step-1" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} className="flex-1 flex flex-col">
              {cart.length === 0 ? (<div className="flex-1 flex flex-col items-center justify-center text-center py-28">
                  <h2 className="font-sans font-light text-xl tracking-wider text-foreground uppercase">
                    YOUR BAG IS EMPTY
                  </h2>
                  <p className="font-sans font-light text-sm text-muted-foreground mt-2 max-w-[360px] leading-relaxed">
                    Explore our minimalist pieces to curate your flagship collection.
                  </p>
                  <Button onClick={navigateHome} variant="outline" className="mt-8 font-mono text-[10px] tracking-widest uppercase rounded-none border-foreground/20 hover:border-foreground transition-colors px-6 py-5 cursor-pointer">
                    BROWSE collections
                  </Button>
                </div>) : (<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  
                  
                  <div className="lg:col-span-8 flex flex-col">
                    <h2 className="font-sans font-light text-2xl uppercase tracking-wider text-foreground mb-6 text-left">
                      YOUR SELECTION
                    </h2>

                    <div className="flex flex-col border-t border-foreground/10">
                      {cart.map((item) => (<CartBagLine key={`${item.product.id}-${item.selectedColor}`} item={item} push={push} updateQuantity={updateQuantity} removeFromCart={removeFromCart}/>))}
                    </div>
                  </div>

                  
                  <div className="lg:col-span-4 flex flex-col gap-10 text-left">
                    <div className="flex flex-col gap-6">
                      <h3 className="font-sans font-light text-base uppercase tracking-wider text-foreground pb-4 border-b border-foreground/10">
                        SUMMARY
                      </h3>

                      <div className="flex flex-col gap-4 font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
                        <div className="flex justify-between">
                          <span>SUBTOTAL</span>
                          <span className="text-foreground">{formatInr(subtotal)}</span>
                        </div>

                        <div className="flex justify-between border-t border-foreground/5 pt-4">
                          <span>SHIPPING</span>
                          <span className="text-foreground">
                            {shippingCost === 0
                    ? "COMPLIMENTARY"
                    : formatInr(shippingCost)}
                          </span>
                        </div>

                        {appliedPromo && (<div className="flex justify-between border-t border-foreground/5 pt-4 text-emerald-600 dark:text-emerald-400">
                            <span>SAVINGS</span>
                            <span>-{formatInr(promoDiscount)}</span>
                          </div>)}

                        <div className="flex justify-between border-t border-foreground/10 pt-5 text-foreground text-sm font-semibold">
                          <span>TOTAL</span>
                          <span>{formatInr(total)}</span>
                        </div>
                      </div>
                    </div>

                    
                    <div className="flex flex-col gap-3">
                      <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground font-bold">
                        DELIVERY SPEED
                      </span>
                      
                      <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-wider">
                        <button type="button" onClick={selectStandardShipping} className={`flex justify-between p-3.5 border transition-all cursor-pointer rounded-none text-left ${shippingOption === "standard"
                    ? "border-foreground text-foreground bg-foreground/[0.02]"
                    : "border-foreground/10 text-muted-foreground hover:border-foreground/30 bg-transparent"}`}>
                          <span>STANDARD / 3-5 DAYS</span>
                          <span>
                            {subtotal >= FREE_SHIPPING_THRESHOLD_INR
                    ? "INCLUDED"
                    : formatInr(SHIPPING_STANDARD_INR)}
                          </span>
                        </button>

                        <button type="button" onClick={selectExpressShipping} className={`flex justify-between p-3.5 border transition-all cursor-pointer rounded-none text-left ${shippingOption === "express"
                    ? "border-foreground text-foreground bg-foreground/[0.02]"
                    : "border-foreground/10 text-muted-foreground hover:border-foreground/30 bg-transparent"}`}>
                          <span>EXPRESS / NEXT DAY</span>
                          <span>{formatInr(SHIPPING_EXPRESS_INR)}</span>
                        </button>
                      </div>
                    </div>

                    
                    <div className="flex flex-col gap-3">
                      <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground font-bold">
                        PROMO CODE
                      </span>

                      {appliedPromo ? (<div className="flex justify-between items-center border border-emerald-500/20 p-3 bg-emerald-500/[0.02]">
                          <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold">
                            {appliedPromo}
                          </span>
                          <button type="button" onClick={handleRemovePromo} className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-bold cursor-pointer hover:underline">
                            [REMOVE]
                          </button>
                        </div>) : (<form onSubmit={handleApplyPromo} className="flex gap-2">
                          <input type="text" placeholder="PROMO CODE (AURA20)" value={promoCode} onChange={handlePromoCodeChange} className="flex-1 bg-transparent border-b border-foreground/20 focus:border-foreground/70 py-2.5 font-mono text-[10px] tracking-widest uppercase placeholder:text-muted-foreground/30 outline-hidden transition-colors rounded-none"/>
                          <button type="submit" className="px-4 py-2.5 border border-foreground/20 hover:border-foreground hover:bg-foreground/[0.02] rounded-none font-mono text-[10px] uppercase tracking-widest font-semibold cursor-pointer transition-all text-foreground">
                            APPLY
                          </button>
                        </form>)}
                    </div>

                    
                    <div className="flex flex-col gap-3">
                      <button onClick={proceedToDelivery} className="w-full bg-foreground text-background hover:bg-foreground/90 font-mono text-xs uppercase tracking-[0.25em] py-5 font-semibold transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center">
                        PROCEED TO DELIVERY
                      </button>

                      <p className="font-mono text-[9px] tracking-widest text-muted-foreground/60 text-center uppercase leading-relaxed">
                        Secure luxury checkout with complementary returns
                      </p>
                    </div>

                  </div>

                </div>)}
            </m.div>)}

          
          {step === 2 && (<m.div key="step-2" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              <div className="lg:col-span-6 flex flex-col text-left">
                <h2 className="font-sans font-light text-2xl uppercase tracking-wider text-foreground mb-6">
                  DELIVERY DETAILS
                </h2>

                <form onSubmit={proceedToPayment} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="delivery-name" className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold">
                      Full Name *
                    </label>
                    <input id="delivery-name" type="text" required placeholder="Cardholder or receiver name" value={deliveryForm.name} onChange={handleDeliveryNameChange} className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light"/>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="delivery-email" className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold">
                      Email Address *
                    </label>
                    <input id="delivery-email" type="email" required placeholder="receiver@gmail.com" value={deliveryForm.email} onChange={handleDeliveryEmailChange} className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light"/>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="delivery-address" className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold">
                      Shipping Address *
                    </label>
                    <input id="delivery-address" type="text" required placeholder="123 Aura Ave, Suite A" value={deliveryForm.address} onChange={handleDeliveryAddressChange} className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light"/>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="delivery-city" className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold">
                        City
                      </label>
                      <input id="delivery-city" type="text" placeholder="Los Angeles" value={deliveryForm.city} onChange={handleDeliveryCityChange} className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light"/>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="delivery-zip" className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold">
                        Zip Code
                      </label>
                      <input id="delivery-zip" type="text" placeholder="90001" value={deliveryForm.zip} onChange={handleDeliveryZipChange} className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light"/>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-6">
                    <button type="submit" className="w-full bg-foreground text-background font-mono text-xs uppercase tracking-[0.25em] py-5 font-semibold hover:bg-foreground/90 transition-colors cursor-pointer rounded-none">
                      PROCEED TO PAYMENT
                    </button>

                    <button type="button" onClick={returnToBagFromDelivery} className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none py-1">
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
                    {Array.from({ length: 64 }).map((_, i) => (<div key={i} className="border border-foreground/[0.06] w-full h-full"/>))}
                  </div>

                  
                  <svg className="absolute inset-0 w-full h-full opacity-35 stroke-foreground/45 stroke-[0.85] fill-none" viewBox="0 0 400 400">
                    <circle cx="200" cy="200" r="160" strokeDasharray="3, 3" className="stroke-foreground/15"/>
                    <circle cx="200" cy="200" r="90" strokeDasharray="1, 4" className="stroke-foreground/15"/>
                    <line x1="200" y1="0" x2="200" y2="400" className="stroke-foreground/10"/>
                    <line x1="0" y1="200" x2="400" y2="200" className="stroke-foreground/10"/>
                    <path d="M 0,100 Q 150,150 200,200 T 400,300"/>
                    <path d="M 50,400 Q 180,240 280,120 T 350,0" className="stroke-foreground/20"/>
                    <path d="M 120,0 C 180,180 200,220 400,150"/>
                    <path d="M 0,280 C 180,310 240,180 320,400" className="stroke-foreground/15"/>

                    
                    {deliveryForm.address && (<m.path d="M 200,200 L 280,120" fill="none" className="stroke-emerald-500 stroke-[1.8]" strokeDasharray="4, 4" initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, ease: "linear", duration: 4 }}/>)}

                    
                    <g transform="translate(200, 200)">
                      <circle r="5" fill="#0A0A0A" stroke="var(--foreground)" strokeWidth="1.5"/>
                      <circle r="1.5" fill="var(--foreground)"/>
                      
                      <rect x="-42" y="10" width="84" height="13" fill="#0A0A0A" stroke="var(--foreground)" strokeWidth="0.5" opacity="0.9"/>
                      <text x="0" y="18" fontFamily="monospace" fontSize="6.5" fill="var(--foreground)" textAnchor="middle" letterSpacing="0.8" fontWeight="bold">
                        AURA WAREHOUSE
                      </text>
                    </g>

                    
                    {deliveryForm.address && (<g transform="translate(280, 120)">
                        <circle r="12" fill="rgba(16, 185, 129, 0.2)">
                          <animate attributeName="r" values="6;14;6" dur="2.5s" repeatCount="indefinite"/>
                          <animate attributeName="opacity" values="0.7;0;0.7" dur="2.5s" repeatCount="indefinite"/>
                        </circle>
                        <circle r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.2"/>
                        
                        <rect x="-35" y="10" width="70" height="13" fill="#0E0E0E" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="0.5" opacity="0.9"/>
                        <text x="0" y="18" fontFamily="monospace" fontSize="6.5" fill="#10B981" textAnchor="middle" letterSpacing="0.5" fontWeight="bold">
                          {deliveryForm.city ? deliveryForm.city.toUpperCase().slice(0, 12) : "DESTINATION"}
                        </text>
                      </g>)}
                  </svg>

                  
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0A0A0A]/95 border border-foreground/10 px-4 py-3 font-mono text-[9px] tracking-wider uppercase flex items-center justify-between text-muted-foreground select-none">
                    <div className="flex flex-col gap-0.5">
                      <span>COORD: 34.0522° N, 118.2437° W</span>
                      <span className="text-foreground">
                        ROUTE: {deliveryForm.address ? "LOCKED & CALCULATED" : "AWAITING ADDR"}
                      </span>
                    </div>
                    {deliveryForm.address ? (<span className="text-emerald-500 animate-pulse font-bold">LIVE GPS READY</span>) : (<span className="text-muted-foreground/40 font-bold">STANDBY</span>)}
                  </div>

                </div>
              </div>
            </m.div>)}

          
          {step === 3 && (<m.div key="step-3" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              <div className="lg:col-span-6 flex flex-col text-left">
                <h2 className="font-sans font-light text-2xl uppercase tracking-wider text-foreground mb-6">
                  SECURE PAYMENT
                </h2>

                <form onSubmit={handleFinalPayment} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="payment-cardholder" className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold">
                      Cardholder Name *
                    </label>
                    <input id="payment-cardholder" type="text" required placeholder="Name as it appears on credit card" value={paymentForm.cardholder} onFocus={handleCardholderFocus} onChange={handlePaymentCardholderChange} className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light uppercase"/>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="payment-number" className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold">
                      Card Number *
                    </label>
                    <input id="payment-number" type="text" required placeholder="0000 0000 0000 0000" maxLength={19} value={paymentForm.number} onFocus={handleCardholderFocus} onChange={handlePaymentNumberChange} className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light font-mono"/>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="payment-expiry" className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold">
                        Expiration MM/YY
                      </label>
                      <input id="payment-expiry" type="text" placeholder="MM/YY" maxLength={5} value={paymentForm.expiry} onFocus={handleCardholderFocus} onChange={handlePaymentExpiryChange} className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light font-mono"/>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="payment-cvc" className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-semibold">
                        Security CVC *
                      </label>
                      <input id="payment-cvc" type="password" required placeholder="000" maxLength={3} value={paymentForm.cvc} onFocus={handleCvcFieldFocus} onBlur={handleCvcFieldBlur} onChange={handlePaymentCvcChange} className="bg-transparent border-b border-foreground/20 focus:border-foreground/80 py-3 text-sm outline-hidden rounded-none w-full font-light font-mono"/>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-6">
                    <button type="submit" disabled={isProcessingPayment} className="w-full bg-foreground text-background font-mono text-xs uppercase tracking-[0.25em] py-5 font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-50 cursor-pointer rounded-none flex items-center justify-center gap-2">
                      {isProcessingPayment ? (<>
                          <span className="size-3.5 border-2 border-background border-t-transparent rounded-full animate-spin"/>
                          <span>PROCESSING PAYMENT…</span>
                        </>) : (<span>COMPLETE ORDER</span>)}
                    </button>

                    <button type="button" onClick={returnToDeliveryFromPayment} className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none py-1">
                      Return to delivery information
                    </button>
                  </div>
                </form>
              </div>

              
              <div className="lg:col-span-6 flex flex-col items-center justify-start gap-6 select-none">
                <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase font-bold self-start">
                  INTERACTIVE CARD SECURE VISUALIZER
                </span>

                
                <div role="button" tabIndex={0} onClick={togglePaymentCardFlip} onKeyDown={handlePaymentCardVisualizerKeyDown} className="w-full max-w-[360px] aspect-[1.586/1] cursor-pointer outline-offset-2 rounded-2xl" style={{ perspective: "1000px" }}>
                  <m.div animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ type: "spring", stiffness: 220, damping: 26 }} className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
                    
                    
                    <div className="absolute inset-0 w-full h-full rounded-2xl p-6 text-white flex flex-col justify-between overflow-hidden shadow-2xl border border-white/20" style={{
                backfaceVisibility: "hidden",
                background: "linear-gradient(135deg, #161616 0%, #2A241A 50%, #0A0A0A 100%)",
            }}>
                      
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent rotate-12 -translate-y-1/2 scale-150 pointer-events-none animate-pulse"/>
                      <div className="absolute top-0 right-0 size-44 bg-white/[0.02] rounded-full blur-2xl pointer-events-none"/>
                      
                      
                      <div className="flex justify-between items-start">
                        
                        <div className="w-10 h-7 rounded bg-radial from-[#FEEFB3] to-[#D5A03A] relative overflow-hidden flex flex-col justify-between p-1.5 border border-[#D5A03A]/70 shadow-inner">
                          <div className="w-full h-[0.5px] bg-[#B08127]/50"/>
                          <div className="w-full h-[0.5px] bg-[#B08127]/50"/>
                          <div className="absolute top-0 bottom-0 left-1/3 w-[0.5px] bg-[#B08127]/50"/>
                          <div className="absolute top-0 bottom-0 right-1/3 w-[0.5px] bg-[#B08127]/50"/>
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
                            <div className="size-5.5 rounded-full border border-[#D5A03A] bg-[#D5A03A]/20"/>
                            <div className="size-5.5 rounded-full border border-[#E9B646] bg-[#E9B646]/30"/>
                          </div>
                        </div>
                      </div>

                    </div>

                    
                    <div className="absolute inset-0 w-full h-full rounded-2xl text-white flex flex-col justify-between py-6 overflow-hidden shadow-2xl border border-white/20" style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "linear-gradient(135deg, #0D0D0D 0%, #171717 100%)",
            }}>
                      
                      <div className="w-full h-11 bg-black/90 mt-1"/>

                      
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
                        Secure transaction processed using 256-bit encrypted SSL network. AURA flagships will never store credit card records.
                      </div>

                    </div>

                  </m.div>
                </div>

                <p className="font-mono text-[9px] tracking-widest text-muted-foreground/60 uppercase">
                  Card visualizer auto-flips to show CVC code security
                </p>
              </div>

            </m.div>)}

          
          {step === 4 && (<m.div key="step-4" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 350, damping: 28 }} className="w-full max-w-[640px] mx-auto text-center py-16 flex flex-col items-center justify-center select-none">
              <div className="size-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-6">
                <IconCheck className="size-8 stroke-[2.5]"/>
              </div>

              <h1 className="font-sans font-light text-3xl uppercase tracking-wider text-foreground">
                ORDER SECURED & PAID
              </h1>
              
              <p className="font-sans font-light text-sm text-muted-foreground mt-3 max-w-[360px] leading-relaxed">
                Thank you for your purchase. Your payment has been received and verified successfully.
              </p>

              
              <div className="w-full border-t border-b border-foreground/10 py-6 mt-8 flex flex-col gap-4 text-left">
                <span className="font-mono text-[10px] tracking-widest text-foreground font-bold uppercase">
                  ORDER RECEIPT
                </span>

                <div className="flex flex-col gap-2 text-xs font-mono text-muted-foreground uppercase">
                  {receiptData.items.map((item) => (<div key={`${item.product.id}-${item.selectedColor}`} className="flex justify-between">
                      <span className="truncate max-w-[70%]">
                        {item.product.name} (x{item.quantity})
                      </span>
                      <span className="text-foreground">
                        {formatInr(item.product.price * item.quantity)}
                      </span>
                    </div>))}
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
                  <span className="text-muted-foreground">SHIPPING LOCATION:</span>
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

              <button type="button" onClick={navigateHome} className="mt-10 bg-foreground text-background font-mono text-xs uppercase tracking-[0.25em] py-5 px-8 font-semibold hover:bg-foreground/90 transition-colors cursor-pointer rounded-none">
                RETURN TO FLAGSHIPS
              </button>

            </m.div>)}
        </AnimatePresence>

      </div>
    </div>);
}
