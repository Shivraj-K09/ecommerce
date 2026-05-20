import {
    FREE_SHIPPING_THRESHOLD_INR,
    SHIPPING_EXPRESS_INR,
    SHIPPING_STANDARD_INR,
} from "@/lib/money";
import type { ShippingOption } from "@/lib/checkout/types";

export function calculateShippingCost(subtotal: number, shippingOption: ShippingOption) {
    if (subtotal >= FREE_SHIPPING_THRESHOLD_INR) {
        return 0;
    }
    return shippingOption === "standard" ? SHIPPING_STANDARD_INR : SHIPPING_EXPRESS_INR;
}

export function calculateCheckoutTotal(subtotal: number, shippingCost: number, discountPercent: number) {
    const promoDiscount = subtotal * (discountPercent / 100);
    return {
        promoDiscount,
        total: Math.max(0, subtotal + shippingCost - promoDiscount),
    };
}
