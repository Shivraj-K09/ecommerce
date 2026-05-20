import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PRODUCTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Product",
  description: "View product details in the AURA catalog.",
};

export default async function LegacyProductRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (product) {
    redirect(`/category/${product.category}/product/${product.id}`);
  }
  redirect("/");
}
