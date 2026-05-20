import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse AURA product categories and collections.",
};

export default function CategoryIndexPage() {
  redirect("/category/all");
}
