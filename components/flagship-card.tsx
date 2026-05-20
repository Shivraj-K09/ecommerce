"use client";

import React, { startTransition, ViewTransition, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/data";
import { formatInr } from "@/lib/money";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Button } from "@/components/ui/button";
import { IconShoppingBag, IconEye } from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const AmbientVisualizer = dynamic(
  () =>
    import("@/components/ambient-visualizer").then(
      (module) => module.AmbientVisualizer,
    ),
  { ssr: false },
);
interface FlagshipCardProps {
  product: Product;
  idx: number;
  hoveredPanel: number | null;
  setHoveredPanel: (idx: number | null) => void;
  handleAddDirect: (product: Product, e: React.MouseEvent) => void;
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

export function FlagshipCard({
  product,
  idx,
  hoveredPanel,
  setHoveredPanel,
  handleAddDirect,
}: FlagshipCardProps) {
  const { theme } = useTheme();
  const { push } = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);

    return () => clearTimeout(timer);
  }, []);
  const activeTheme = mounted ? theme : "dark";
  const prefersReducedMotion = usePrefersReducedMotion();
  const isHovered = hoveredPanel === idx;
  const isAnyHovered = hoveredPanel !== null;
  const showAmbientVisualizer = isHovered && !prefersReducedMotion;

  function handlePanelEnter() {
    setHoveredPanel(idx);
  }

  function handlePanelLeave() {
    setHoveredPanel(null);
  }

  function handlePanelNavigate() {
    setIsTransitioning(true);
    startTransition(() => {
      push(`/category/${product.category}/product/${product.id}`);
    });
  }

  function handleViewClick(e: React.MouseEvent) {
    e.stopPropagation();
    setIsTransitioning(true);
    startTransition(() => {
      push(`/category/${product.category}/product/${product.id}`);
    });
  }

  function handleBuyClick(e: React.MouseEvent) {
    setIsTransitioning(true);
    handleAddDirect(product, e);
  }

  function handlePanelKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePanelNavigate();
    }
  }

  return (
    <div
      onMouseEnter={handlePanelEnter}
      onMouseLeave={handlePanelLeave}
      onClick={handlePanelNavigate}
      onKeyDown={handlePanelKeyDown}
      tabIndex={0}
      role="group"
      aria-label={`${product.name}, ${formatInr(product.price)}`}
      className={cn(
        "border-border group bg-card hover:bg-muted/10 focus-visible:ring-ring/50 relative flex min-w-0 basis-0 cursor-pointer flex-col justify-between overflow-hidden border-b p-8 transition-[flex-grow] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] last:border-r-0 focus-visible:ring-3 focus-visible:outline-none md:border-r md:border-b-0",
        prefersReducedMotion || !isAnyHovered
          ? "flex-1"
          : isHovered
            ? "flex-[1.45_1_0%]"
            : "flex-[0.85_1_0%]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-all duration-700 select-none">
        <div className="from-background/90 via-background/15 to-background/95 pointer-events-none absolute inset-0 z-10 bg-linear-to-b" />

        <div
          className={cn(
            "relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isHovered && !prefersReducedMotion && "scale-[1.03]",
          )}
        >
          <SafeTransition
            name={isTransitioning ? `product-image-${product.id}` : undefined}
          >
            <div className="absolute inset-0 h-full w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority={idx === 0}
                fetchPriority={idx === 0 ? "high" : "auto"}
                loading="eager"
                className="origin-center object-cover transition-opacity duration-700"
                sizes="(max-w-768px) 100vw, 25vw"
                style={{
                  mixBlendMode: activeTheme === "dark" ? "normal" : "multiply",
                  filter:
                    activeTheme === "dark"
                      ? "brightness(0.85) contrast(1.05)"
                      : "brightness(0.98) contrast(1.01)",
                  opacity: isHovered
                    ? activeTheme === "dark"
                      ? 0.6
                      : 0.95
                    : activeTheme === "dark"
                      ? 0.45
                      : 0.85,
                }}
              />
            </div>
          </SafeTransition>
        </div>
      </div>

      {showAmbientVisualizer ? (
        <AmbientVisualizer
          type={product.id}
          isHovered={isHovered}
          theme={activeTheme || "dark"}
        />
      ) : null}
      <div className="relative z-20 flex items-center justify-between">
        <span className="text-store-min text-muted-foreground font-mono tracking-[0.2em] uppercase">
          {product.category}
        </span>
        <SafeTransition
          name={isTransitioning ? `product-price-${product.id}` : undefined}
        >
          <span className="text-foreground font-sans text-base font-light tracking-wide sm:text-lg">
            {formatInr(product.price)}
          </span>
        </SafeTransition>
      </div>

      <div className="min-h-[140px] flex-1 md:min-h-[220px]" />

      <div className="relative z-20 mt-auto flex flex-col gap-4">
        <div className="flex flex-col select-none">
          <div className="transition-transform duration-300">
            <SafeTransition
              name={isTransitioning ? `product-name-${product.id}` : undefined}
            >
              <h2 className="text-foreground w-full font-sans text-2xl leading-none font-semibold tracking-tighter wrap-break-word uppercase md:text-3xl lg:text-4xl">
                {product.name.split(" ").slice(0, -1).join(" ") || product.name}
                <span className="text-muted-foreground mt-1 block text-xl font-light tracking-normal md:text-2xl lg:text-3xl">
                  {product.name.split(" ").slice(-1)[0]}
                </span>
              </h2>
            </SafeTransition>
          </div>

          <AnimatePresence initial={false}>
            {isHovered && (
              <m.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full overflow-hidden"
              >
                <p className="text-foreground w-full font-sans text-sm leading-relaxed">
                  {product.description}
                </p>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-border flex flex-col gap-1.5 border-t pt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {Object.entries(product.specifications)
            .slice(0, 2)
            .map(([key, val]) => (
              <div
                key={key}
                className="text-store-min text-muted-foreground flex justify-between font-mono tracking-[0.15em] uppercase"
              >
                <span>{key}</span>
                <span className="text-foreground font-semibold">{val}</span>
              </div>
            ))}
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="bg-foreground size-1.5 animate-pulse rounded-full" />
            <span className="text-store-min text-muted-foreground font-mono tracking-[0.15em] uppercase">
              IN STOCK
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleViewClick}
              variant="outline"
              size="sm"
              className="bg-background/50 hover:bg-background flex h-8 cursor-pointer items-center gap-1.5 px-3 font-mono text-[9px] font-semibold tracking-[0.2em] uppercase"
            >
              VIEW
              <IconEye className="size-3.5 stroke-[1.5]" />
            </Button>

            <Button
              onClick={handleBuyClick}
              variant="default"
              size="sm"
              className="flex h-8 cursor-pointer items-center gap-1.5 px-3 font-mono text-[9px] font-semibold tracking-[0.2em] uppercase"
            >
              BUY NOW
              <IconShoppingBag className="size-3.5 stroke-[1.5]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
