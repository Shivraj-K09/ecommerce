import type { Metadata } from "next";
import { HomePage } from "./home-page-client";

export const metadata: Metadata = {
  title: "Shop Curated Objects",
  description:
    "Discover flagship audio, living, tactile, and wellness objects curated for modern spaces.",
};

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/products/headphones.webp"
        fetchPriority="high"
      />
      <HomePage />
    </>
  );
}
