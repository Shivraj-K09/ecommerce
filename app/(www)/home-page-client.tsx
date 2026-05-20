"use client";

import { startTransition } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { HomeProductRails } from "./home-product-rails";

const ShoppingCartDrawer = dynamic(
  () =>
    import("@/components/shopping-cart-drawer").then(
      (module) => module.ShoppingCartDrawer,
    ),
  { ssr: false },
);

export function HomePage() {
  const { push } = useRouter();

  const audioProducts = PRODUCTS.filter((p) => p.category === "electronics");
  const livingProducts = PRODUCTS.filter((p) => p.category === "living");
  const writingProducts = PRODUCTS.filter((p) => p.category === "writing");
  const wellnessProducts = PRODUCTS.filter((p) => p.category === "wellness");

  function exploreElectronics() {
    startTransition(() => {
      push("/category/electronics");
    });
  }

  function exploreLiving() {
    startTransition(() => {
      push("/category/living");
    });
  }

  function exploreWriting() {
    startTransition(() => {
      push("/category/writing");
    });
  }

  function exploreWellness() {
    startTransition(() => {
      push("/category/wellness");
    });
  }

  return (
    <>
      <section
        className="home-product-rails relative z-20 flex w-full flex-col gap-28 px-6 py-24 md:px-12"
        aria-label="Product collections"
      >
        <HomeProductRails
          audioProducts={audioProducts}
          livingProducts={livingProducts}
          writingProducts={writingProducts}
          wellnessProducts={wellnessProducts}
          onExploreElectronics={exploreElectronics}
          onExploreLiving={exploreLiving}
          onExploreWriting={exploreWriting}
          onExploreWellness={exploreWellness}
        />
      </section>

      <ShoppingCartDrawer />
    </>
  );
}
