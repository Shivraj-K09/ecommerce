"use client";

import { useState } from "react";
import { Product } from "@/lib/data";
import { FlagshipPanelClient } from "@/components/flagship-panel-client";

type Props = {
  products: Product[];
  images: React.ReactNode[];
  onAddDirect: (product: Product, e: React.MouseEvent) => void;
};

export function HomeFlagshipGrid({
  products,
  images,
  onAddDirect,
}: Props) {
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);

  return (
    <section
      aria-label="Featured collections"
      className="border-border bg-card relative z-20 mt-5 flex h-[74vh] min-h-[580px] w-full min-w-0 flex-col border-y md:flex-row md:items-stretch"
    >
      {products.map((product, idx) => (
        <FlagshipPanelClient
          key={product.id}
          product={product}
          idx={idx}
          hoveredPanel={hoveredPanel}
          setHoveredPanel={setHoveredPanel}
          handleAddDirect={onAddDirect}
          image={images[idx]}
        />
      ))}
    </section>
  );
}
