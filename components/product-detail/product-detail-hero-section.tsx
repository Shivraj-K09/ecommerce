"use client";

import { ViewTransition } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABEL_NAMES } from "@/lib/data";
import { formatInr } from "@/lib/money";
import type { Product } from "@/lib/data";
import type { ProductExtension } from "@/lib/product-extensions";

type Props = {
  product: Product;
  ext: ProductExtension;
  activeImage: string;
  onSelectImage: (imageUrl: string) => void;
  originalPrice: number;
  discountAmount: number;
  onGoBack: () => void;
  onGoHome: () => void;
  onGoCategory: () => void;
  onBuyNow: () => void;
  onAddToBag: () => void;
};

export function ProductDetailHeroSection({
  product,
  ext,
  activeImage,
  onSelectImage,
  originalPrice,
  discountAmount,
  onGoBack,
  onGoHome,
  onGoCategory,
  onBuyNow,
  onAddToBag,
}: Props) {
  return (
    <>
      <div className="mb-3 select-none">
        <button
          type="button"
          onClick={onGoBack}
          className="group text-foreground hover:text-foreground/75 focus-visible:ring-ring/50 flex w-fit cursor-pointer items-center gap-2 border-none bg-transparent p-0 font-mono text-[9px] font-semibold tracking-[0.2em] uppercase transition-colors select-none focus-visible:ring-3 focus-visible:outline-none"
        >
          <IconArrowLeft className="size-3.5 stroke-[1.8] transition-transform duration-300 group-hover:-translate-x-1" />
          <span>BACK TO COLLECTION</span>
        </button>
      </div>

      <nav
        aria-label="Breadcrumb"
        className="text-muted-foreground/60 mb-5 flex items-center gap-2 font-mono text-[9px] tracking-widest uppercase select-none"
      >
        <button
          type="button"
          className="hover:text-foreground text-muted-foreground/60 cursor-pointer border-0 bg-transparent p-0 font-mono text-[9px] tracking-widest uppercase transition-colors"
          onClick={onGoHome}
        >
          HOME
        </button>
        <span>/</span>
        <button
          type="button"
          className="hover:text-foreground text-muted-foreground/60 cursor-pointer border-0 bg-transparent p-0 font-mono text-[9px] tracking-widest uppercase transition-colors"
          onClick={onGoCategory}
        >
          {CATEGORY_LABEL_NAMES[product.category] || product.category}
        </button>
        <span>/</span>
        <span className="text-foreground font-semibold" aria-current="page">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="flex h-full flex-col justify-between gap-4 lg:col-span-7">
          <div className="bg-muted/15 border-foreground/4 relative aspect-[1.4] w-full overflow-hidden rounded-lg border select-none">
            <AnimatePresence mode="wait">
              <m.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative h-full w-full"
              >
                <ViewTransition
                  name={`product-image-${product.id}`}
                  share="morph"
                  default="none"
                >
                  <div className="absolute inset-0 h-full w-full">
                    <Image
                      src={activeImage}
                      alt={product.name}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </ViewTransition>
              </m.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {ext.gallery.map((imgUrl, thumbIndex) => (
              <button
                key={imgUrl}
                type="button"
                onClick={() => onSelectImage(imgUrl)}
                aria-pressed={activeImage === imgUrl}
                aria-label={`View ${product.name}, image ${thumbIndex + 1}`}
                className={`bg-muted/10 focus-visible:ring-ring/50 relative aspect-[1.4] cursor-pointer overflow-hidden rounded-md border transition-all duration-200 focus-visible:ring-3 focus-visible:outline-none ${
                  activeImage === imgUrl
                    ? "border-foreground scale-[0.98]"
                    : "border-foreground/5 hover:border-foreground/20 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`${product.name} angle ${thumbIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex h-full flex-col justify-between py-1 text-left lg:col-span-5">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-muted-foreground font-mono text-[9px] font-semibold tracking-[0.3em] uppercase">
                {CATEGORY_LABEL_NAMES[product.category] || product.category}
              </span>
              <ViewTransition
                name={`product-name-${product.id}`}
                share="morph"
                default="none"
              >
                <h1 className="text-foreground font-sans text-3xl leading-tight font-light tracking-tight uppercase md:text-4xl">
                  {product.name}
                </h1>
              </ViewTransition>
            </div>

            <div className="flex items-baseline gap-4 select-none">
              <ViewTransition
                name={`product-price-${product.id}`}
                share="morph"
                default="none"
              >
                <span className="text-foreground font-sans text-5xl font-light tracking-tighter md:text-6xl">
                  {formatInr(product.price)}
                </span>
              </ViewTransition>
              <span className="text-muted-foreground/50 font-mono text-sm line-through">
                {formatInr(originalPrice)}
              </span>
              <span className="rounded-sm bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-wider text-emerald-600 dark:text-emerald-400">
                SAVE {formatInr(discountAmount)} OFF
              </span>
            </div>

            <div className="text-foreground/80 flex flex-col gap-2 font-sans text-sm leading-relaxed font-light">
              <p>{product.description}</p>
              <p>
                suspending the generators inside custom floating tension
                matrices to minimize frequency spikes and eliminate background
                noise completely.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="mt-2 flex flex-col gap-3">
              <Button
                onClick={onBuyNow}
                variant="default"
                size="lg"
                className="w-full cursor-pointer rounded-md py-6 font-mono text-[10px] font-semibold tracking-[0.2em] uppercase select-none"
              >
                BUY NOW
              </Button>
              <Button
                onClick={onAddToBag}
                variant="outline"
                size="lg"
                className="w-full cursor-pointer rounded-md py-6 font-mono text-[10px] font-semibold tracking-[0.2em] uppercase select-none"
              >
                ADD TO BAG
              </Button>
            </div>

            <div className="border-foreground/5 grid grid-cols-2 gap-3.5 border-t pt-4 text-left">
              {ext.badges.map((badge, idx) => {
                const colors = [
                  {
                    bg: "bg-amber-500/10 dark:bg-amber-500/5",
                    border: "border-amber-500/10",
                    icon: "text-amber-500",
                  },
                  {
                    bg: "bg-emerald-500/10 dark:bg-emerald-500/5",
                    border: "border-emerald-500/10",
                    icon: "text-emerald-500",
                  },
                  {
                    bg: "bg-sky-500/10 dark:bg-sky-500/5",
                    border: "border-sky-500/10",
                    icon: "text-sky-500",
                  },
                  {
                    bg: "bg-violet-500/10 dark:bg-violet-500/5",
                    border: "border-violet-500/10",
                    icon: "text-violet-500",
                  },
                ][idx % 4];

                return (
                  <div
                    key={badge.label}
                    className={`flex gap-3 rounded-lg border p-3 ${colors.bg} ${colors.border} transition-all duration-200`}
                  >
                    <div className="bg-background border-foreground/5 flex size-8 shrink-0 items-center justify-center rounded border shadow-xs">
                      <badge.icon
                        className={`size-3.5 ${colors.icon} stroke-[1.5]`}
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-foreground font-mono text-[8.5px] font-semibold tracking-wider uppercase">
                        {badge.label}
                      </span>
                      <span className="text-muted-foreground mt-0.5 font-sans text-[10px] leading-relaxed font-light">
                        {badge.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
