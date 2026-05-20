"use client";

import * as m from "motion/react-m";
import type { UseCheckoutReturn } from "@/hooks/use-checkout";
import { CheckoutDeliveryForm } from "./checkout-delivery-form";
import { CheckoutDeliveryRoutingMap } from "./checkout-delivery-routing-map";

type Props = { checkout: UseCheckoutReturn };

export function CheckoutDeliveryStep({ checkout }: Props) {
  const {
    deliveryForm,
    updateDeliveryField,
    proceedToPayment,
    returnToBagFromDelivery,
  } = checkout;

  return (
    <m.div
      key="step-2"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16"
    >
      <CheckoutDeliveryForm
        deliveryForm={deliveryForm}
        updateDeliveryField={updateDeliveryField}
        proceedToPayment={proceedToPayment}
        returnToBagFromDelivery={returnToBagFromDelivery}
      />
      <CheckoutDeliveryRoutingMap deliveryForm={deliveryForm} />
    </m.div>
  );
}
