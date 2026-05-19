import { redirect } from "next/navigation";

/** Checkout lives on `/cart` (multi-step). */
export default function CartDeliveryRedirectPage() {
  redirect("/cart");
}
