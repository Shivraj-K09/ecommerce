"use client";

import React, { startTransition, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ViewTransition } from "react";
import { IconShoppingBag, IconEye } from "@tabler/icons-react";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import { Product, CATEGORY_LABEL_NAMES } from "@/lib/data";
import { formatInr } from "@/lib/money";

interface ProductCardProps {
  product: Product;
  categoryId?: string;
  disableTransitionNames?: boolean;
  className?: string;
}

// A helper wrapper to conditionally apply ViewTransition to avoid duplicate registrations
function SafeTransition({
  children,
  name,
}: {
  children: React.ReactNode;
  name?: string;
}) {
  if (!name) return <>{children}</>;
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}

export function ProductCard({
  product,
  categoryId,
  disableTransitionNames,
  className,
}: ProductCardProps) {
  const router = useRouter();
  const addToCart = useStore((state) => state.addToCart);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Fallback to product category if no active parent categoryId is supplied
  const resolvedCategoryId = categoryId || product.category;

  const handleAddDirect = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.colors[0]?.name);
    toast.success("ADDED TO BAG", {
      description: `${product.name} is now in your shopping bag.`,
    });
    setIsTransitioning(true);
    startTransition(() => {
      router.push("/cart");
    });
  };

  const handleViewDirect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTransitioning(true);
    startTransition(() => {
      router.push(`/category/${resolvedCategoryId}/product/${product.id}`);
    });
  };

  return (
    /* 
      Full-Bleed Cover Card:
      Displays the image covering the entire container (aspect-[3/4])
      using 'object-cover' and no inner padding, as strictly requested by the user.
    */
    <div
      onClick={() => {
        setIsTransitioning(true);
        startTransition(() => {
          router.push(`/category/${resolvedCategoryId}/product/${product.id}`);
        });
      }}
      className={`group relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-[#f4f3ef] dark:bg-[#161615] border border-transparent hover:border-foreground/5 transition-all duration-500 shadow-sm flex flex-col cursor-pointer select-none ${className || ""}`}
    >
      {/* Full-Bleed Product Image - Covering 100% of the Card with 'object-cover' */}
      <SafeTransition
        name={
          disableTransitionNames || !isTransitioning
            ? undefined
            : `product-image-${product.id}`
        }
      >
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-w-768px) 100vw, 20vw"
            loading="lazy"
          />
        </div>
      </SafeTransition>

      {/* 
        Elegant Bottom Dark Vignette:
        Smoothly fades from black/90 to transparent to ensure extreme readability 
        and contrast for the white typography and buttons.
      */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10 pointer-events-none" />

      {/* Overlay Details Panel - Pinned to the Bottom */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-20 flex flex-col items-start text-left text-white">
        {/* Monospace Spaced Category Label */}
        <span className="font-mono text-store-min tracking-[0.25em] text-white/70 uppercase">
          {CATEGORY_LABEL_NAMES[product.category] || product.category}
        </span>

        {/* Sharp Light-Weight Product Name */}
        <SafeTransition
          name={
            disableTransitionNames || !isTransitioning
              ? undefined
              : `product-name-${product.id}`
          }
        >
          <h3 className="font-sans text-[12px] sm:text-[13px] tracking-wide text-white mt-1 font-light leading-snug line-clamp-1">
            {product.name}
          </h3>
        </SafeTransition>

        {/* Monospace Price Tag */}
        <SafeTransition
          name={
            disableTransitionNames || !isTransitioning
              ? undefined
              : `product-price-${product.id}`
          }
        >
          <span className="font-mono text-[15px] sm:text-[16px] tracking-wider text-white mt-1 font-light">
            {formatInr(product.price)}
          </span>
        </SafeTransition>

        {/* Action Buttons Row */}
        <div className="w-full mt-3.5 flex gap-2 select-none">
          {/* View Button */}
          <button
            type="button"
            onClick={handleViewDirect}
            className="flex-1 py-2 bg-white/10 hover:bg-white border-[0.5px] border-white/20 text-white hover:text-black font-mono text-[8.5px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99] shadow-sm rounded-sm"
          >
            VIEW
            <IconEye className="w-3 h-3 stroke-[1.2]" />
          </button>

          {/* Buy Button */}
          <button
            type="button"
            onClick={handleAddDirect}
            className="flex-1 py-2 bg-transparent border-[0.5px] border-white/20 text-white hover:border-white hover:bg-white hover:text-black font-mono text-[8.5px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99] shadow-sm rounded-sm"
          >
            BUY
            <IconShoppingBag className="w-3 h-3 stroke-[1.2]" />
          </button>
        </div>
      </div>
    </div>
  );
}
