"use client";

import { startTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { HomeFlagshipGrid } from "@/components/home-flagship-grid";

type Props = {
  products: Product[];
  images: React.ReactNode[];
};

export function HomeFlagshipSectionClient({ products, images }: Props) {
  const { push } = useRouter();
  const addToCart = useStore((state) => state.addToCart);

  const handleAddDirect = useCallback(
    (product: Product, e: React.MouseEvent) => {
      e.stopPropagation();
      addToCart(product, product.colors[0]?.name);
      toast.success("ADDED TO BAG", {
        description: `${product.name} is now in your shopping bag.`,
      });
      startTransition(() => {
        push("/cart");
      });
    },
    [addToCart, push],
  );

  return (
    <HomeFlagshipGrid
      products={products}
      images={images}
      onAddDirect={handleAddDirect}
    />
  );
}
