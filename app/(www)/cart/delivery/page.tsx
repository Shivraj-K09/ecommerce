import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Delivery",
  description: "Checkout delivery step for your AURA order.",
};

export default function CartDeliveryRedirectPage() {
  redirect("/cart");
}
