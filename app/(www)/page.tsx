import type { Metadata } from "next";
import { HomeFlagshipSection } from "@/components/home-flagship-section";
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
      <div className="bg-background text-foreground relative flex w-full flex-col overflow-x-hidden font-sans transition-colors duration-500 select-none">
        <h1 className="sr-only">AURA: Curated everyday objects</h1>
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="from-muted/30 pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] via-transparent to-transparent" />
        </div>
        <HomeFlagshipSection />
        <HomePage />
      </div>
    </>
  );
}
