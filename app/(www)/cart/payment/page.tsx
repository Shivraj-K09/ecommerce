import { redirect } from "next/navigation";

/** Checkout lives on `/cart` (multi-step). */
export default function CartPaymentRedirectPage() {
  redirect("/cart");
}
