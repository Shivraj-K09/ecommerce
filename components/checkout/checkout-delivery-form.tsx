"use client";

import type { FormEvent } from "react";
import type { DeliveryForm } from "@/lib/checkout/types";

type Props = {
  deliveryForm: DeliveryForm;
  updateDeliveryField: (field: keyof DeliveryForm, value: string) => void;
  proceedToPayment: (event: FormEvent) => void;
  returnToBagFromDelivery: () => void;
};

export function CheckoutDeliveryForm({
  deliveryForm,
  updateDeliveryField,
  proceedToPayment,
  returnToBagFromDelivery,
}: Props) {
  return (
    <div className="flex flex-col text-left lg:col-span-6">
      <h2 className="text-foreground mb-6 font-sans text-2xl font-light tracking-wider uppercase">
        DELIVERY DETAILS
      </h2>

      <form onSubmit={proceedToPayment} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="delivery-name"
            className="text-muted-foreground font-mono text-[9px] font-semibold tracking-widest uppercase"
          >
            Full Name *
          </label>
          <input
            id="delivery-name"
            type="text"
            required
            placeholder="Cardholder or receiver name"
            value={deliveryForm.name}
            onChange={(e) => updateDeliveryField("name", e.target.value)}
            className="border-foreground/20 focus:border-foreground/80 w-full rounded-none border-b bg-transparent py-3 text-sm font-light outline-hidden"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="delivery-email"
            className="text-muted-foreground font-mono text-[9px] font-semibold tracking-widest uppercase"
          >
            Email Address *
          </label>
          <input
            id="delivery-email"
            type="email"
            required
            placeholder="receiver@gmail.com"
            value={deliveryForm.email}
            onChange={(e) => updateDeliveryField("email", e.target.value)}
            className="border-foreground/20 focus:border-foreground/80 w-full rounded-none border-b bg-transparent py-3 text-sm font-light outline-hidden"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="delivery-address"
            className="text-muted-foreground font-mono text-[9px] font-semibold tracking-widest uppercase"
          >
            Shipping Address *
          </label>
          <input
            id="delivery-address"
            type="text"
            required
            placeholder="123 Aura Ave, Suite A"
            value={deliveryForm.address}
            onChange={(e) => updateDeliveryField("address", e.target.value)}
            className="border-foreground/20 focus:border-foreground/80 w-full rounded-none border-b bg-transparent py-3 text-sm font-light outline-hidden"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="delivery-city"
              className="text-muted-foreground font-mono text-[9px] font-semibold tracking-widest uppercase"
            >
              City
            </label>
            <input
              id="delivery-city"
              type="text"
              placeholder="Los Angeles"
              value={deliveryForm.city}
              onChange={(e) => updateDeliveryField("city", e.target.value)}
              className="border-foreground/20 focus:border-foreground/80 w-full rounded-none border-b bg-transparent py-3 text-sm font-light outline-hidden"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="delivery-zip"
              className="text-muted-foreground font-mono text-[9px] font-semibold tracking-widest uppercase"
            >
              Zip Code
            </label>
            <input
              id="delivery-zip"
              type="text"
              placeholder="90001"
              value={deliveryForm.zip}
              onChange={(e) => updateDeliveryField("zip", e.target.value)}
              className="border-foreground/20 focus:border-foreground/80 w-full rounded-none border-b bg-transparent py-3 text-sm font-light outline-hidden"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <button
            type="submit"
            className="bg-foreground text-background hover:bg-foreground/90 w-full cursor-pointer rounded-none py-5 font-mono text-xs font-semibold tracking-[0.25em] uppercase transition-colors"
          >
            PROCEED TO PAYMENT
          </button>

          <button
            type="button"
            onClick={returnToBagFromDelivery}
            className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center justify-center gap-2 border-none bg-transparent py-1 font-mono text-[10px] tracking-wider uppercase transition-colors"
          >
            Return to Bag selection
          </button>
        </div>
      </form>
    </div>
  );
}
