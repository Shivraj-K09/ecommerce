"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import {
    calculateCheckoutTotal,
    calculateShippingCost,
} from "@/lib/checkout/calculate-totals";
import { formatCardNumber, formatExpiry } from "@/lib/checkout/payment-format";
import type {
    CheckoutStep,
    DeliveryForm,
    PaymentForm,
    ReceiptData,
    ShippingOption,
} from "@/lib/checkout/types";

const emptyDelivery: DeliveryForm = {
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
};

const emptyPayment: PaymentForm = {
    cardholder: "",
    number: "",
    expiry: "",
    cvc: "",
};

const emptyReceipt: ReceiptData = {
    items: [],
    subtotal: 0,
    shippingCost: 0,
    total: 0,
    address: "",
    shippingSpeed: "",
};

export function useCheckout() {
    const { push } = useRouter();
    const cart = useStore((state) => state.cart);
    const updateQuantity = useStore((state) => state.updateQuantity);
    const removeFromCart = useStore((state) => state.removeFromCart);
    const clearCart = useStore((state) => state.clearCart);

    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<CheckoutStep>(1);
    const [shippingOption, setShippingOption] = useState<ShippingOption>("standard");
    const [promoCode, setPromoCode] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
    const [deliveryForm, setDeliveryForm] = useState<DeliveryForm>(emptyDelivery);
    const [paymentForm, setPaymentForm] = useState<PaymentForm>(emptyPayment);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [receiptData, setReceiptData] = useState<ReceiptData>(emptyReceipt);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    const subtotal = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
    );
    const shippingCost = calculateShippingCost(subtotal, shippingOption);
    const { promoDiscount, total } = calculateCheckoutTotal(
        subtotal,
        shippingCost,
        discountPercent,
    );

    function handleApplyPromo(e: React.FormEvent) {
        e.preventDefault();
        if (!promoCode.trim()) return;
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
    }

    function proceedToDelivery() {
        if (cart.length === 0) return;
        setStep(2);
    }

    function proceedToPayment(e: React.FormEvent) {
        e.preventDefault();
        if (!deliveryForm.name || !deliveryForm.email || !deliveryForm.address) {
            toast.error("Please fill in all required delivery fields");
            return;
        }
        setStep(3);
    }

    function handleFinalPayment(e: React.FormEvent) {
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
                shippingSpeed:
                    shippingOption === "standard"
                        ? "Standard Courier (3-5 Days)"
                        : "Express Courier (Next Day)",
            });
            clearCart();
            setStep(4);
            toast.success("Payment Received Successfully");
        }, 2000);
    }

    function navigateHome() {
        startTransition(() => {
            push("/");
        });
    }

    function goToStep1() {
        setStep(1);
    }

    function goToStep2() {
        if (cart.length > 0) setStep(2);
    }

    function goToStep3() {
        if (cart.length > 0 && deliveryForm.name) setStep(3);
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

    function updateDeliveryField(field: keyof DeliveryForm, value: string) {
        setDeliveryForm((prev) => ({ ...prev, [field]: value }));
    }

    function returnToBagFromDelivery() {
        setStep(1);
    }

    function handleCardholderFocus() {
        setIsFlipped(false);
    }

    function handlePaymentNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPaymentForm((prev) => ({
            ...prev,
            number: formatCardNumber(e.target.value),
        }));
    }

    function handlePaymentExpiryChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPaymentForm((prev) => ({
            ...prev,
            expiry: formatExpiry(e.target.value),
        }));
    }

    function handlePaymentCvcChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPaymentForm((prev) => ({
            ...prev,
            cvc: e.target.value.replace(/[^0-9]/g, ""),
        }));
    }

    function handlePaymentCardholderChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPaymentForm((prev) => ({
            ...prev,
            cardholder: e.target.value.toUpperCase(),
        }));
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

    return {
        mounted,
        push,
        cart,
        updateQuantity,
        removeFromCart,
        step,
        shippingOption,
        promoCode,
        appliedPromo,
        deliveryForm,
        paymentForm,
        isFlipped,
        isProcessingPayment,
        receiptData,
        subtotal,
        shippingCost,
        promoDiscount,
        total,
        handleApplyPromo,
        proceedToDelivery,
        proceedToPayment,
        handleFinalPayment,
        navigateHome,
        goToStep1,
        goToStep2,
        goToStep3,
        selectStandardShipping,
        selectExpressShipping,
        handleRemovePromo,
        handlePromoCodeChange,
        updateDeliveryField,
        returnToBagFromDelivery,
        handleCardholderFocus,
        handlePaymentNumberChange,
        handlePaymentExpiryChange,
        handlePaymentCvcChange,
        handlePaymentCardholderChange,
        handleCvcFieldFocus,
        handleCvcFieldBlur,
        togglePaymentCardFlip,
        handlePaymentCardVisualizerKeyDown,
        returnToDeliveryFromPayment,
    };
}

export type UseCheckoutReturn = ReturnType<typeof useCheckout>;
