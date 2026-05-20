"use client";
import React, { startTransition, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const { push } = useRouter();
  const addToCart = useStore((state) => state.addToCart);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const resolvedCategoryId = categoryId || product.category;
  const productHref = `/category/${resolvedCategoryId}/product/${product.id}`;
  const handleAddDirect = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.colors[0]?.name);
    toast.success("ADDED TO BAG", {
      description: `${product.name} is now in your shopping bag.`,
    });
    setIsTransitioning(true);
    startTransition(() => {
      push("/cart");
    });
  };

  const handleViewDirect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTransitioning(true);
    startTransition(() => {
      push(productHref);
    });
  };

  function handleProductLinkClick() {
    setIsTransitioning(true);
  }

  return (
    <article
      className={`group hover:border-foreground/5 relative flex aspect-3/4 w-full flex-col overflow-hidden rounded-2xl border border-transparent bg-[#f4f3ef] shadow-sm transition-all duration-500 select-none dark:bg-[#161615] ${className || ""}`}
    >
      <Link
        href={productHref}
        onClick={handleProductLinkClick}
        className="focus-visible:ring-ring/50 absolute inset-0 z-10 rounded-2xl focus-visible:ring-3 focus-visible:outline-none"
        aria-label={`View ${product.name}`}
      />

      <SafeTransition
        name={
          disableTransitionNames || !isTransitioning
            ? undefined
            : `product-image-${product.id}`
        }
      >
        <div className="pointer-events-none absolute inset-0 h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="pointer-events-none object-cover transition-transform duration-700 ease-out select-none group-hover:scale-[1.04]"
            sizes="(max-w-768px) 100vw, 20vw"
            loading="lazy"
          />
        </div>
      </SafeTransition>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[60%] bg-linear-to-t from-black/90 via-black/45 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-start p-4 text-left text-white sm:p-5">
        <span className="text-store-min font-mono tracking-[0.25em] text-white/70 uppercase">
          {CATEGORY_LABEL_NAMES[product.category] || product.category}
        </span>

        <SafeTransition
          name={
            disableTransitionNames || !isTransitioning
              ? undefined
              : `product-name-${product.id}`
          }
        >
          <h3 className="mt-1 line-clamp-1 font-sans text-[12px] leading-snug font-light tracking-wide text-white sm:text-[13px]">
            {product.name}
          </h3>
        </SafeTransition>

        <SafeTransition
          name={
            disableTransitionNames || !isTransitioning
              ? undefined
              : `product-price-${product.id}`
          }
        >
          <span className="mt-1 font-mono text-[15px] font-light tracking-wider text-white sm:text-[16px]">
            {formatInr(product.price)}
          </span>
        </SafeTransition>

        <div className="pointer-events-auto relative z-30 mt-3.5 flex w-full gap-2 select-none">
          <button
            type="button"
            onClick={handleViewDirect}
            aria-label={`View ${product.name}`}
            className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-sm border-[0.5px] border-white/20 bg-white/10 py-2 font-mono text-[8.5px] tracking-[0.2em] text-white uppercase shadow-sm transition-all duration-300 hover:bg-white hover:text-black active:scale-[0.99]"
          >
            VIEW
            <IconEye className="size-3 stroke-[1.2]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={handleAddDirect}
            aria-label={`Add ${product.name} to bag`}
            className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-sm border-[0.5px] border-white/20 bg-transparent py-2 font-mono text-[8.5px] tracking-[0.2em] text-white uppercase shadow-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black active:scale-[0.99]"
          >
            BUY
            <IconShoppingBag
              className="size-3 stroke-[1.2]"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
