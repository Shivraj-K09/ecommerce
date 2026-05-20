"use client";

import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/data";
import {
  IconArrowUpRight,
  IconCpu,
  IconHome,
  IconPencil,
  IconActivity,
} from "@tabler/icons-react";

type RailProps = {
  products: Product[];
  categoryId: string;
  onExplore: () => void;
};

function ProductRail({
  icon: Icon,
  spectrumLabel,
  title,
  products,
  categoryId,
  onExplore,
}: RailProps & {
  icon: typeof IconCpu;
  spectrumLabel: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between border-b border-zinc-200 pb-5 dark:border-zinc-800/80">
        <div className="flex flex-col gap-2 text-left">
          <div className="flex items-center gap-2">
            <Icon className="text-muted-foreground size-4" aria-hidden="true" />
            <span className="text-muted-foreground font-mono text-[9px] font-bold tracking-[0.25em] uppercase">
              {spectrumLabel}
            </span>
          </div>
          <h2 className="font-sans text-xl font-medium tracking-wider uppercase md:text-2xl">
            {title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onExplore}
          className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 font-mono text-[9.5px] tracking-widest uppercase transition-colors"
        >
          EXPLORE INDEX{" "}
          <IconArrowUpRight className="size-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categoryId={categoryId}
            disableTransitionNames={true}
            className="mx-auto w-full max-w-[420px]"
          />
        ))}
      </div>
    </div>
  );
}

type Props = {
  audioProducts: Product[];
  livingProducts: Product[];
  writingProducts: Product[];
  wellnessProducts: Product[];
  onExploreElectronics: () => void;
  onExploreLiving: () => void;
  onExploreWriting: () => void;
  onExploreWellness: () => void;
};

export function HomeProductRails({
  audioProducts,
  livingProducts,
  writingProducts,
  wellnessProducts,
  onExploreElectronics,
  onExploreLiving,
  onExploreWriting,
  onExploreWellness,
}: Props) {
  return (
    <>
      <ProductRail
        icon={IconCpu}
        spectrumLabel="[ SPECTRUM 01 / ACOUSTICS & CYBERNETICS ]"
        title="Audio & Tech"
        products={audioProducts}
        categoryId="electronics"
        onExplore={onExploreElectronics}
      />
      <ProductRail
        icon={IconHome}
        spectrumLabel="[ SPECTRUM 02 / ORGANIC SPATIAL ALIGNMENT ]"
        title="Home & Living"
        products={livingProducts}
        categoryId="living"
        onExplore={onExploreLiving}
      />
      <ProductRail
        icon={IconPencil}
        spectrumLabel="[ SPECTRUM 03 / TACTILE INSTRUMENTS & DRAFTS ]"
        title="Tactile Writing"
        products={writingProducts}
        categoryId="writing"
        onExplore={onExploreWriting}
      />
      <ProductRail
        icon={IconActivity}
        spectrumLabel="[ SPECTRUM 04 / SENSORY CALM & BOTANICAL AURA ]"
        title="Wellness & Aroma"
        products={wellnessProducts}
        categoryId="wellness"
        onExplore={onExploreWellness}
      />
    </>
  );
}
