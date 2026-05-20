"use client";

import { useRef } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/data";

type Props = {
  relatedProducts: Product[];
};

export function ProductDetailRelatedSection({ relatedProducts }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRelated = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRelatedPrev = () => {
    scrollRelated("left");
  };

  const scrollRelatedNext = () => {
    scrollRelated("right");
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="border-foreground/5 mt-20 border-t pt-14">
      <div className="mb-6 flex items-center justify-between select-none">
        <div className="flex flex-col text-left">
          <span className="text-muted-foreground font-mono text-[8.5px] font-semibold tracking-[0.25em] uppercase">
            SIMILAR ARCHIVES
          </span>
          <h3 className="text-foreground mt-1 font-sans text-xl font-light tracking-wide uppercase md:text-2xl">
            RELATABLE PRODUCTS
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollRelatedPrev}
            aria-label="Scroll related products left"
            className="border-foreground/10 hover:border-foreground/35 text-foreground hover:bg-foreground/2 focus-visible:ring-ring/50 flex size-10 cursor-pointer items-center justify-center rounded-full border transition-all focus-visible:ring-3 focus-visible:outline-none active:scale-95"
          >
            <IconArrowRight className="size-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={scrollRelatedNext}
            aria-label="Scroll related products right"
            className="border-foreground/10 hover:border-foreground/35 text-foreground hover:bg-foreground/2 focus-visible:ring-ring/50 flex size-10 cursor-pointer items-center justify-center rounded-full border transition-all focus-visible:ring-3 focus-visible:outline-none active:scale-95"
          >
            <IconArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex w-full snap-x snap-mandatory scrollbar-none gap-6 overflow-x-auto pb-4 select-none [&::-webkit-scrollbar]:hidden"
      >
        {relatedProducts.map((p) => (
          <div
            key={p.id}
            className="w-[260px] shrink-0 snap-start md:w-[280px]"
          >
            <ProductCard product={p} categoryId={p.category} />
          </div>
        ))}
      </div>
    </div>
  );
}
