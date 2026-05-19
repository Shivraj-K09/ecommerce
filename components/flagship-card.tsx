import React, { startTransition, ViewTransition, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
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
function SafeTransition({ children, name, }: {
    children: React.ReactNode;
    name?: string;
}) {
    if (!name)
        return <>{children}</>;
    return (<ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>);
}
export function FlagshipCard({ product, idx, hoveredPanel, setHoveredPanel, handleAddDirect, }: FlagshipCardProps) {
    const { theme } = useTheme();
    const { push } = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [mounted, setMounted] = useState(false);
    React.useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);
    const activeTheme = mounted ? theme : "dark";
    const isHovered = hoveredPanel === idx;
    const isAnyHovered = hoveredPanel !== null;

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

    return (<m.div onMouseEnter={handlePanelEnter} onMouseLeave={handlePanelLeave} onClick={handlePanelNavigate} className="relative min-w-0 flex-1 basis-0 border-b md:border-b-0 md:border-r last:border-r-0 border-border overflow-hidden group flex flex-col justify-between p-8 bg-card hover:bg-muted/10 transition-all duration-500 cursor-pointer" animate={{
            flexGrow: isHovered ? 1.45 : isAnyHovered ? 0.85 : 1,
            flexShrink: 1,
        }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden transition-all duration-700">
        <div className="absolute inset-0 bg-linear-to-b from-background/90 via-background/15 to-background/95 z-10 pointer-events-none"/>

        <m.div className="w-full h-full relative" animate={{
            scale: isHovered ? 1.03 : 1,
        }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <SafeTransition name={isTransitioning ? `product-image-${product.id}` : undefined}>
            <div className="absolute inset-0 w-full h-full">
              <Image src={product.image} alt={product.name} fill priority={idx < 2} loading={idx < 2 ? "eager" : "lazy"} className="object-cover origin-center transition-opacity duration-700" sizes="(max-w-768px) 100vw, 25vw" style={{
            mixBlendMode: activeTheme === "dark" ? "normal" : "multiply",
            filter: activeTheme === "dark"
                ? "brightness(0.85) contrast(1.05)"
                : "brightness(0.98) contrast(1.01)",
            opacity: isHovered
                ? activeTheme === "dark"
                    ? 0.6
                    : 0.95
                : activeTheme === "dark"
                    ? 0.45
                    : 0.85,
        }}/>
            </div>
          </SafeTransition>
        </m.div>
      </div>

      <AmbientVisualizer type={product.id} isHovered={isHovered} theme={activeTheme || "dark"}/>
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

      <div className="flex-1 min-h-[140px] md:min-h-[220px]"/>

      <div className="z-20 relative mt-auto flex flex-col gap-4">
        <m.div layout className="flex flex-col select-none">
          <m.div layout="position" className="transition-transform duration-300">
            <SafeTransition name={isTransitioning ? `product-name-${product.id}` : undefined}>
              <h2 className="font-sans font-semibold text-2xl md:text-3xl lg:text-4xl uppercase tracking-tighter leading-none text-foreground wrap-break-word w-full">
                {product.name.split(" ").slice(0, -1).join(" ") || product.name}
                <span className="block font-light text-muted-foreground text-xl md:text-2xl lg:text-3xl tracking-normal mt-1">
                  {product.name.split(" ").slice(-1)[0]}
                </span>
              </h2>
            </SafeTransition>
          </m.div>

          <AnimatePresence initial={false}>
            {isHovered && (<m.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: "auto", marginTop: 16 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden w-full">
                <p className="font-sans text-sm leading-relaxed text-foreground w-full">
                  {product.description}
                </p>
              </m.div>)}
          </AnimatePresence>
        </m.div>

        <div className="border-t border-border pt-4 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {Object.entries(product.specifications)
            .slice(0, 2)
            .map(([key, val]) => (<div key={key} className="flex justify-between font-mono text-store-min tracking-[0.15em] uppercase text-muted-foreground">
                <span>{key}</span>
                <span className="text-foreground font-semibold">{val}</span>
              </div>))}
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-foreground animate-pulse"/>
            <span className="font-mono text-store-min tracking-[0.15em] uppercase text-muted-foreground">
              IN STOCK
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleViewClick} variant="outline" size="sm" className="font-mono text-[9px] tracking-[0.2em] font-semibold uppercase px-3 h-8 flex items-center gap-1.5 cursor-pointer bg-background/50 hover:bg-background">
              VIEW
              <IconEye className="size-3.5 stroke-[1.5]"/>
            </Button>

            <Button onClick={handleBuyClick} variant="default" size="sm" className="font-mono text-[9px] tracking-[0.2em] font-semibold uppercase px-3 h-8 flex items-center gap-1.5 cursor-pointer">
              BUY NOW
              <IconShoppingBag className="size-3.5 stroke-[1.5]"/>
            </Button>
          </div>
        </div>
      </div>
    </m.div>);
}
