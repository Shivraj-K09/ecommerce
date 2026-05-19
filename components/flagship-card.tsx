import React, { startTransition, ViewTransition, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/data";
import { formatInr } from "@/lib/money";
import { AmbientVisualizer } from "@/components/ambient-visualizer";
import { Button } from "@/components/ui/button";
import { IconShoppingBag, IconEye } from "@tabler/icons-react";
import Image from "next/image";

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
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const activeTheme = mounted ? theme : "dark";
  
  const isHovered = hoveredPanel === idx;
  const isAnyHovered = hoveredPanel !== null;

  return (
    <motion.div
      onMouseEnter={() => setHoveredPanel(idx)}
      onMouseLeave={() => setHoveredPanel(null)}
      onClick={() => {
        setIsTransitioning(true);
        startTransition(() => {
          router.push(`/category/${product.category}/product/${product.id}`);
        });
      }}
      className="relative min-w-0 flex-1 basis-0 border-b md:border-b-0 md:border-r last:border-r-0 border-border overflow-hidden group flex flex-col justify-between p-8 bg-card hover:bg-muted/10 transition-all duration-500 cursor-pointer"
      animate={{
        flexGrow: isHovered ? 1.45 : isAnyHovered ? 0.85 : 1,
        flexShrink: 1,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      
      {/* 
        ================= FULL-BLEED IMMERSIVE BACKGROUND (NEXT/IMAGE) =================
        Uses next/image wrapped inside a motion.div for high-performance responsive scaling
        and instant preloading (priority) for the primary flagship models.
      */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden transition-all duration-700">
        
        {/* Soft fading vignette to ensure 100% text contrast at top and bottom edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/15 to-background/95 z-10 pointer-events-none" />
        
        {/* Optimized Next.js image component with hardware-accelerated Framer Motion scaling */}
        <motion.div
          className="w-full h-full relative"
          animate={{
            scale: isHovered ? 1.03 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SafeTransition name={isTransitioning ? `product-image-${product.id}` : undefined}>
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority={idx < 2}
                loading={idx < 2 ? "eager" : "lazy"}
                className="object-cover origin-center transition-opacity duration-700"
                sizes="(max-w-768px) 100vw, 25vw"
                style={{ 
                  mixBlendMode: activeTheme === "dark" ? "normal" : "multiply",
                  filter: activeTheme === "dark" ? "brightness(0.85) contrast(1.05)" : "brightness(0.98) contrast(1.01)",
                  opacity: isHovered 
                    ? (activeTheme === "dark" ? 0.6 : 0.95) 
                    : (activeTheme === "dark" ? 0.45 : 0.85)
                }}
              />
            </div>
          </SafeTransition>
        </motion.div>
      </div>

      {/* Themed Canvas Ambient Visualizer layer (Sits above background image, below text elements) */}
      <AmbientVisualizer 
        type={product.id} 
        isHovered={isHovered} 
        theme={activeTheme || "dark"} 
      />

      {/* 
        ================= CARD TOP SECTION =================
        Renders metadata clean and sharp directly on the upper vignette boundary.
      */}
      <div className="z-20 relative flex items-center justify-between">
        <span className="font-mono text-store-min tracking-[0.2em] text-muted-foreground uppercase">
          {product.category}
        </span>
        <SafeTransition name={isTransitioning ? `product-price-${product.id}` : undefined}>
          <span className="font-sans text-base sm:text-lg tracking-wide font-light text-foreground">
            {formatInr(product.price)}
          </span>
        </SafeTransition>
      </div>

      {/* 
        ================= CARD CENTER AREA (EMPTY SPACER) =================
        Keeps the mid and upper portions completely clear of overlapping text.
        This lets the glowing ambient canvas visualizer and massive background 
        Next.js image remain 100% visible and uncluttered.
      */}
      <div className="flex-1 min-h-[140px] md:min-h-[220px]" />

      {/* 
        ================= CARD BOTTOM CONTAINER =================
        Protected by the solid bottom vignette mask. Housing the main typography, 
        collapsible description, specs list, and standard Shadcn BUY NOW CTA.
      */}
      <div className="z-20 relative mt-auto flex flex-col gap-4">
        
        {/* Animated Typography Block with Layout Propagation */}
        <motion.div layout className="flex flex-col select-none">
          
          {/* Brand Title: Glides upwards beautifully to make room for description */}
          <motion.div layout="position" className="transition-transform duration-300">
            <SafeTransition name={isTransitioning ? `product-name-${product.id}` : undefined}>
              <h2 className="font-sans font-semibold text-2xl md:text-3xl lg:text-4xl uppercase tracking-tighter leading-none text-foreground break-words w-full">
                {product.name.split(" ").slice(0, -1).join(" ") || product.name}
                <span className="block font-light text-muted-foreground text-xl md:text-2xl lg:text-3xl tracking-normal mt-1">
                  {product.name.split(" ").slice(-1)[0]}
                </span>
              </h2>
            </SafeTransition>
          </motion.div>

          {/* 
            Description Block:
            Uses AnimatePresence with absolute smooth height & scale transitions.
            Width is set to w-full (no narrow max-width) to prevent text clustering!
          */}
          <AnimatePresence initial={false}>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden w-full"
              >
                <p className="font-sans text-sm leading-relaxed text-foreground w-full">
                  {product.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
        </motion.div>

        {/* Horizontal Technical specs list (Revealed on hover) */}
        <div className="border-t border-border pt-4 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {Object.entries(product.specifications).slice(0, 2).map(([key, val]) => (
            <div 
              key={key} 
              className="flex justify-between font-mono text-store-min tracking-[0.15em] uppercase text-muted-foreground"
            >
              <span>{key}</span>
              <span className="text-foreground font-semibold">{val}</span>
            </div>
          ))}
        </div>

        {/* Primary CTA button and stock tag */}
        <div className="flex items-center justify-between gap-4 pt-2">
          
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
            <span className="font-mono text-store-min tracking-[0.15em] uppercase text-muted-foreground">
              IN STOCK
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Details Button */}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setIsTransitioning(true);
                startTransition(() => {
                  router.push(`/category/${product.category}/product/${product.id}`);
                });
              }}
              variant="outline"
              size="sm"
              className="font-mono text-[9px] tracking-[0.2em] font-semibold uppercase px-3 h-8 flex items-center gap-1.5 cursor-pointer bg-background/50 hover:bg-background"
            >
              VIEW
              <IconEye className="w-3.5 h-3.5 stroke-[1.5]" />
            </Button>

            {/* Buy Now Button */}
            <Button
              onClick={(e) => {
                setIsTransitioning(true);
                handleAddDirect(product, e);
              }}
              variant="default"
              size="sm"
              className="font-mono text-[9px] tracking-[0.2em] font-semibold uppercase px-3 h-8 flex items-center gap-1.5 cursor-pointer"
            >
              BUY NOW
              <IconShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
            </Button>
          </div>

        </div>
      </div>

    </motion.div>
  );
}
