import type { CartItem } from "@/lib/store";

export type CheckoutStep = 1 | 2 | 3 | 4;

export type ShippingOption = "standard" | "express";

export type DeliveryForm = {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
};

export type PaymentForm = {
  cardholder: string;
  number: string;
  expiry: string;
  cvc: string;
};

export type ReceiptData = {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  address: string;
  shippingSpeed: string;
};
