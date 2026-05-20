import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Payment",
  description: "Checkout payment step for your AURA order.",
};

export default function CartPaymentRedirectPage() {
  redirect("/cart");
}
