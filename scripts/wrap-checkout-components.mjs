import fs from "fs";
import path from "path";

const dir = "components/checkout";

function stripStepWrapper(body, stepNum) {
    let b = body.trim();
    const re = new RegExp(`^\\s*\\{step === ${stepNum} && \\(`);
    b = b.replace(re, "");
    if (b.endsWith(")}")) {
        b = b.slice(0, -2).trimEnd();
    }
    return b.trim();
}

function wrap(name, file, stepNum, extraImports = "") {
    let body = fs.readFileSync(path.join(dir, file), "utf8");
    body = stripStepWrapper(body, stepNum);
    const destructured = getDestructured(name);
    const content = `"use client";

import * as m from "motion/react-m";
import type { UseCheckoutReturn } from "@/hooks/use-checkout";
${extraImports}

type Props = { checkout: UseCheckoutReturn };

export function ${name}({ checkout }: Props) {
  const {
    ${destructured}
  } = checkout;

  return (
${body
    .split("\n")
    .map((l) => `    ${l}`)
    .join("\n")}
  );
}
`;
    fs.writeFileSync(path.join(dir, file), content);
}

function getDestructured(name) {
    const common = "cart, push, updateQuantity, removeFromCart";
    if (name === "CheckoutStepsNav") {
        return "step, cart, deliveryForm, goToStep1, goToStep2, goToStep3";
    }
    if (name === "CheckoutBagStep") {
        return `${common}, subtotal, shippingCost, promoDiscount, total, appliedPromo, promoCode, shippingOption, navigateHome, selectStandardShipping, selectExpressShipping, handleRemovePromo, handleApplyPromo, handlePromoCodeChange, proceedToDelivery`;
    }
    if (name === "CheckoutDeliveryStep") {
        return "deliveryForm, updateDeliveryField, proceedToPayment, returnToBagFromDelivery";
    }
    if (name === "CheckoutPaymentStep") {
        return "paymentForm, isFlipped, isProcessingPayment, handleFinalPayment, handleCardholderFocus, handlePaymentCardholderChange, handlePaymentNumberChange, handlePaymentExpiryChange, handlePaymentCvcChange, handleCvcFieldFocus, handleCvcFieldBlur, togglePaymentCardFlip, handlePaymentCardVisualizerKeyDown, returnToDeliveryFromPayment";
    }
    if (name === "CheckoutSuccessStep") {
        return "receiptData, navigateHome";
    }
    return common;
}

let nav = fs.readFileSync(path.join(dir, "checkout-steps-nav.tsx"), "utf8").trim();
nav = nav.replace(/\)\s*\}\s*$/, "");
fs.writeFileSync(
    path.join(dir, "checkout-steps-nav.tsx"),
    `"use client";

import type { UseCheckoutReturn } from "@/hooks/use-checkout";

type Props = { checkout: UseCheckoutReturn };

export function CheckoutStepsNav({ checkout }: Props) {
  const { step, cart, deliveryForm, goToStep1, goToStep2, goToStep3 } = checkout;
  return (
${nav
    .split("\n")
    .map((l) => `    ${l}`)
    .join("\n")}
  );
}
`,
);

wrap(
    "CheckoutBagStep",
    "checkout-bag-step.tsx",
    1,
    `import { Button } from "@/components/ui/button";
import { CartBagLine } from "@/components/cart-bag-line";
import {
  formatInr,
  FREE_SHIPPING_THRESHOLD_INR,
  SHIPPING_STANDARD_INR,
  SHIPPING_EXPRESS_INR,
} from "@/lib/money";`,
);

wrap("CheckoutDeliveryStep", "checkout-delivery-step.tsx", 2, "");
let del = fs.readFileSync(path.join(dir, "checkout-delivery-step.tsx"), "utf8");
del = del.replace(
    /onChange=\{handleDeliveryNameChange\}/g,
    "onChange={(e) => updateDeliveryField('name', e.target.value)}",
);
del = del.replace(
    /onChange=\{handleDeliveryEmailChange\}/g,
    "onChange={(e) => updateDeliveryField('email', e.target.value)}",
);
del = del.replace(
    /onChange=\{handleDeliveryAddressChange\}/g,
    "onChange={(e) => updateDeliveryField('address', e.target.value)}",
);
del = del.replace(
    /onChange=\{handleDeliveryCityChange\}/g,
    "onChange={(e) => updateDeliveryField('city', e.target.value)}",
);
del = del.replace(
    /onChange=\{handleDeliveryZipChange\}/g,
    "onChange={(e) => updateDeliveryField('zip', e.target.value)}",
);
fs.writeFileSync(path.join(dir, "checkout-delivery-step.tsx"), del);

wrap("CheckoutPaymentStep", "checkout-payment-step.tsx", 3, "");
wrap(
    "CheckoutSuccessStep",
    "checkout-success-step.tsx",
    4,
    `import { IconCheck } from "@tabler/icons-react";
import { formatInr } from "@/lib/money";`,
);

console.log("wrapped checkout components");
