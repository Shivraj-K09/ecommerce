"use client";
import React, { use, useState, useRef, ViewTransition, startTransition } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCartDrawer } from "@/components/shopping-cart-drawer";
import { PRODUCTS, CATEGORY_LABEL_NAMES } from "@/lib/data";
import { formatInr } from "@/lib/money";
import { getProductExtension } from "@/lib/product-extensions";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ProductCard } from "@/components/product-card";
import { IconStar, IconCircleCheck, IconArrowRight, IconArrowLeft, IconVolume, IconActivity, } from "@tabler/icons-react";
export default function ProductDetailPage({ params, }: {
    params: Promise<{
        id: string;
        productId: string;
    }>;
}) {
    const { productId } = use(params);
    const router = useRouter();
    const addToCart = useStore((state) => state.addToCart);
    const product = PRODUCTS.find((p) => p.id === productId);
    const [activeImage, setActiveImage] = useState(product?.image || "");
    const [selectedColor] = useState(product?.colors?.[0]?.name || "");
    const [reviewTab, setReviewTab] = useState<"top" | "moderate" | "bad">("top");
    const scrollRef = useRef<HTMLDivElement>(null);
    const reviewsScrollRef = useRef<HTMLDivElement>(null);
    const handleScroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };
    const handleReviewsScroll = (direction: "left" | "right") => {
        if (reviewsScrollRef.current) {
            const scrollAmount = 360;
            reviewsScrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };
    if (!product) {
        return (<div className="h-screen w-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
            PRODUCT NOT FOUND
          </p>
        </div>
      </div>);
    }
    const ext = getProductExtension(product.id, product.category);
    const discountAmount = Math.round(product.price * (ext.discountPercent / 100));
    const originalPrice = product.price + discountAmount;
    const handleAddAction = (directCheckout = false) => {
        addToCart(product, selectedColor);
        toast.success("ADDED TO BAG", {
            description: `${product.name} (${selectedColor || "Standard"}) has been added.`,
        });
        if (directCheckout) {
            startTransition(() => {
                router.push("/cart");
            });
        }
    };
    const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category);
    return (<div className="relative w-full bg-background text-foreground overflow-x-hidden font-sans select-none pb-12">
      
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--theme-glow,rgba(0,0,0,0.03)))] pointer-events-none"/>
      </div>

      
      <div className="w-full max-w-[1360px] mx-auto px-6 md:px-12 mt-8 relative z-20">
        
        
        <div className="mb-3 select-none">
          <button onClick={() => startTransition(() => router.push(`/category/${product.category}`))} className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground hover:text-foreground/75 transition-colors cursor-pointer select-none bg-transparent border-none p-0 outline-none w-fit font-semibold">
            <IconArrowLeft className="w-3.5 h-3.5 stroke-[1.8] transition-transform duration-300 group-hover:-translate-x-1"/>
            <span>BACK TO COLLECTION</span>
          </button>
        </div>

        
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 mb-5 select-none">
          <span className="hover:text-foreground cursor-pointer transition-colors" onClick={() => router.push("/")}>
            HOME
          </span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer transition-colors" onClick={() => startTransition(() => router.push(`/category/${product.category}`))}>
            {CATEGORY_LABEL_NAMES[product.category] || product.category}
          </span>
          <span>/</span>
          <span className="text-foreground font-semibold">{product.name}</span>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          
          <div className="lg:col-span-7 flex flex-col gap-4 justify-between h-full">
            <div className="relative w-full aspect-[1.4] bg-muted/15 border border-foreground/[0.04] rounded-lg overflow-hidden select-none">
              <AnimatePresence mode="wait">
                <motion.div key={activeImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="w-full h-full relative">
                  <ViewTransition name={`product-image-${product.id}`} share="morph" default="none">
                    <div className="absolute inset-0 w-full h-full">
                      <Image src={activeImage} alt={product.name} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw"/>
                    </div>
                  </ViewTransition>
                </motion.div>
              </AnimatePresence>
            </div>

            
            <div className="grid grid-cols-4 gap-3">
              {ext.gallery.map((imgUrl, i) => (<button key={`thumb-${i}`} onClick={() => setActiveImage(imgUrl)} className={`relative aspect-[1.4] overflow-hidden rounded-md bg-muted/10 border transition-all duration-200 cursor-pointer ${activeImage === imgUrl
                ? "border-foreground scale-[0.98]"
                : "border-foreground/5 opacity-70 hover:opacity-100 hover:border-foreground/20"}`}>
                  <Image src={imgUrl} alt={`Angle detail ${i + 1}`} fill className="object-cover" sizes="150px"/>
                </button>))}
            </div>
          </div>

          
          <div className="lg:col-span-5 flex flex-col justify-between h-full py-1 text-left">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase font-semibold">
                  {CATEGORY_LABEL_NAMES[product.category] || product.category}
                </span>
                <ViewTransition name={`product-name-${product.id}`} share="morph" default="none">
                  <h1 className="font-sans font-light text-3xl md:text-4xl uppercase tracking-tight leading-tight text-foreground">
                    {product.name}
                  </h1>
                </ViewTransition>
              </div>

              
              <div className="flex items-baseline gap-4 select-none">
                <ViewTransition name={`product-price-${product.id}`} share="morph" default="none">
                  <span className="font-sans font-light text-5xl md:text-6xl tracking-tighter text-foreground">
                    {formatInr(product.price)}
                  </span>
                </ViewTransition>
                <span className="font-mono text-sm text-muted-foreground/50 line-through">
                  {formatInr(originalPrice)}
                </span>
                <span className="font-mono text-[9.5px] tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-sm">
                  SAVE {formatInr(discountAmount)} OFF
                </span>
              </div>

              
              <div className="flex flex-col gap-2 text-foreground/80 font-sans text-sm font-light leading-relaxed">
                <p>{product.description}</p>
                <p>suspending the generators inside custom floating tension matrices to minimize frequency spikes and eliminate background noise completely.</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-3 mt-2">
                <Button onClick={() => handleAddAction(true)} variant="default" size="lg" className="w-full font-mono text-[10px] tracking-[0.2em] uppercase py-6 rounded-md select-none font-semibold cursor-pointer">
                  BUY NOW
                </Button>
                <Button onClick={() => handleAddAction(false)} variant="outline" size="lg" className="w-full font-mono text-[10px] tracking-[0.2em] uppercase py-6 rounded-md select-none font-semibold cursor-pointer">
                  ADD TO BAG
                </Button>
              </div>

              
              <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-foreground/5 text-left">
                {ext.badges.map((badge, idx) => {
            const colors = [
                { bg: "bg-amber-500/10 dark:bg-amber-500/5", border: "border-amber-500/10", icon: "text-amber-500" },
                { bg: "bg-emerald-500/10 dark:bg-emerald-500/5", border: "border-emerald-500/10", icon: "text-emerald-500" },
                { bg: "bg-sky-500/10 dark:bg-sky-500/5", border: "border-sky-500/10", icon: "text-sky-500" },
                { bg: "bg-violet-500/10 dark:bg-violet-500/5", border: "border-violet-500/10", icon: "text-violet-500" },
            ][idx % 4];
            return (<div key={`badge-${idx}`} className={`flex gap-3 p-3 rounded-lg border ${colors.bg} ${colors.border} transition-all duration-200`}>
                      <div className="w-8 h-8 rounded bg-background flex items-center justify-center shrink-0 border border-foreground/5 shadow-xs">
                        <badge.icon className={`w-3.5 h-3.5 ${colors.icon} stroke-[1.5]`}/>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-mono text-[8.5px] tracking-wider text-foreground font-semibold uppercase">
                          {badge.label}
                        </span>
                        <span className="font-sans text-[10px] leading-relaxed text-muted-foreground mt-0.5 font-light">
                          {badge.description}
                        </span>
                      </div>
                    </div>);
        })}
              </div>
            </div>

          </div>
        </div>

        
        <div className="mt-20 border-t border-foreground/5 pt-14">
          <div className="flex flex-col items-start text-left mb-10 select-none">
            <span className="font-mono text-[8.5px] tracking-[0.35em] text-muted-foreground uppercase bg-foreground/5 px-3 py-1.5 rounded-sm font-semibold">
              THE DESIGN PROTOCOL
            </span>
            <h2 className="font-sans font-light text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter mt-4 text-foreground leading-[1.1] max-w-4xl">
              Uncompromising Material Precision. <br />
              <span className="font-serif italic text-muted-foreground/60 lowercase">sculpted for the modern workspace archive.</span>
            </h2>
          </div>

          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
            
            
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <span className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground/80 uppercase font-semibold">
                {ext.storySub}
              </span>

              <h3 className="font-sans text-xl md:text-2xl font-light uppercase tracking-tight text-foreground leading-tight pb-3 border-b border-foreground/5">
                {ext.storyHeadline}
              </h3>

              
              <div className="border-l border-foreground/30 pl-6 py-1 my-2">
                <p className="font-serif italic text-lg text-foreground/90 leading-relaxed font-light">
                  {ext.storyQuote}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-sm font-light text-foreground/80 leading-relaxed">
                <p>{ext.storyBody1}</p>
                <p>{ext.storyBody2}</p>
              </div>

              <div className="flex gap-8 mt-4 pt-6 border-t border-foreground/5 font-mono text-[9px] tracking-wider text-muted-foreground/80 uppercase select-none">
                <div className="flex items-center gap-2">
                  <IconVolume className="w-4 h-4 text-foreground/80 stroke-[1.2]"/>
                  <span>ACOUSTICS CALIBRATED</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconActivity className="w-4 h-4 text-foreground/80 stroke-[1.2]"/>
                  <span>SPECTRUM TESTED</span>
                </div>
              </div>
            </div>

            
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-foreground/[0.04] bg-muted/20 select-none">
                <Image src={ext.gallery[1]} alt="Story detail" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw"/>
              </div>

              
              <div className="pt-2">
                <div className="font-mono text-[9px] tracking-[0.25em] text-foreground uppercase mb-4 select-none font-semibold pb-2 border-b border-foreground/10">
                  TECHNICAL SCHEDULING
                </div>
                <div className="flex flex-col text-left">
                  {ext.specs.map((spec, i) => (<div key={`spec-${i}`} className="flex justify-between items-center py-3 border-b border-foreground/5 font-sans text-xs font-light text-foreground/80">
                      <span className="font-mono text-[8.5px] tracking-wider text-muted-foreground uppercase">
                        {spec.label}
                      </span>
                      <span className="font-medium text-foreground">
                        {spec.value}
                      </span>
                    </div>))}
                </div>
              </div>

            </div>
          </div>
        </div>

        
        <div className="mt-20 border-t border-foreground/5 pt-14">
          <div className="flex items-center justify-between mb-8 select-none">
            <div className="flex flex-col items-start text-left">
              <span className="font-mono text-[8.5px] tracking-[0.3em] text-muted-foreground uppercase bg-foreground/5 px-3 py-1 rounded-sm font-semibold">
                COLLECTIVE SATISFACTION
              </span>
              <h2 className="font-sans font-light text-2xl md:text-3xl uppercase tracking-tight mt-3 text-foreground">
                VERIFIED USER AUDITS
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={() => handleReviewsScroll("left")} className="w-10 h-10 rounded-full border border-foreground/10 hover:border-foreground/35 flex items-center justify-center text-foreground hover:bg-foreground/[0.02] active:scale-95 transition-all cursor-pointer" title="Scroll Left">
                <IconArrowRight className="w-4 h-4 rotate-180"/>
              </button>
              <button onClick={() => handleReviewsScroll("right")} className="w-10 h-10 rounded-full border border-foreground/10 hover:border-foreground/35 flex items-center justify-center text-foreground hover:bg-foreground/[0.02] active:scale-95 transition-all cursor-pointer" title="Scroll Right">
                <IconArrowRight className="w-4 h-4"/>
              </button>
            </div>
          </div>

          
          <div className="flex justify-start gap-6 border-b border-foreground/5 mb-8 select-none">
            {(["top", "moderate", "bad"] as const).map((tab) => (<button key={tab} onClick={() => setReviewTab(tab)} className={`pb-3 font-mono text-[9.5px] tracking-[0.2em] uppercase text-left cursor-pointer transition-colors relative ${reviewTab === tab
                ? "text-foreground font-semibold"
                : "text-muted-foreground/50 hover:text-foreground"}`}>
                {tab === "top"
                ? "TOP AUDITS"
                : tab === "moderate"
                    ? "MODERATE"
                    : "CRITICAL"}
                {reviewTab === tab && (<motion.div layoutId="activeReviewTabLine" className="absolute bottom-0 inset-x-0 h-[1.5px] bg-foreground" transition={{ duration: 0.15 }}/>)}
              </button>))}
          </div>

          
          <div className="relative w-full text-left">
            <AnimatePresence mode="wait">
              <motion.div key={reviewTab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }} ref={reviewsScrollRef} className="flex overflow-x-auto gap-6 scrollbar-none [&::-webkit-scrollbar]:hidden snap-x snap-mandatory pb-4 w-full select-none">
                {ext.reviews[reviewTab].map((rev, idx) => {
            const initials = rev.author
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();
            const avatarColor = [
                "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                "bg-sky-500/10 text-sky-600 dark:text-sky-400",
                "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
            ][idx % 4];
            return (<div key={`review-${reviewTab}-${idx}`} className="p-6 border border-foreground/[0.04] bg-foreground/[0.01] rounded-xl flex flex-col justify-between gap-4 transition-all duration-300 hover:border-foreground/10 w-[300px] md:w-[350px] shrink-0 snap-start">
                      <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex items-center gap-3">
                            
                            <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center font-mono text-[10px] font-semibold shrink-0`}>
                              {initials}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-sans text-xs font-medium text-foreground">
                                {rev.author}
                              </span>
                              <span className="font-mono text-store-min text-muted-foreground/60">
                                {rev.date}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center text-amber-500 shrink-0">
                            {[...Array(5)].map((_, i) => (<IconStar key={i} className={`w-3 h-3 ${i < rev.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground/20"}`}/>))}
                          </div>
                        </div>

                        <h4 className="font-sans text-xs font-semibold text-foreground mt-1">
                          {rev.title}
                        </h4>
                        <p className="font-sans font-light text-xs leading-relaxed text-foreground/80">
                          {rev.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 pt-3 border-t border-foreground/[0.03] font-mono text-store-min tracking-widest text-emerald-600 dark:text-emerald-400 uppercase select-none font-semibold">
                        <IconCircleCheck className="w-3.5 h-3.5"/>
                        <span>VERIFIED PRODUCT ADHERENCE</span>
                      </div>
                    </div>);
        })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        
        {relatedProducts.length > 0 && (<div className="mt-20 border-t border-foreground/5 pt-14">
            
            
            <div className="flex items-center justify-between mb-6 select-none">
              <div className="flex flex-col text-left">
                <span className="font-mono text-[8.5px] tracking-[0.25em] text-muted-foreground uppercase font-semibold">
                  SIMILAR ARCHIVES
                </span>
                <h3 className="font-sans font-light text-xl md:text-2xl uppercase tracking-wide mt-1 text-foreground">
                  RELATABLE PRODUCTS
                </h3>
              </div>
              
              <div className="flex items-center gap-2">
                <button onClick={() => handleScroll("left")} className="w-10 h-10 rounded-full border border-foreground/10 hover:border-foreground/35 flex items-center justify-center text-foreground hover:bg-foreground/[0.02] active:scale-95 transition-all cursor-pointer" title="Scroll Left">
                  <IconArrowRight className="w-4 h-4 rotate-180"/>
                </button>
                <button onClick={() => handleScroll("right")} className="w-10 h-10 rounded-full border border-foreground/10 hover:border-foreground/35 flex items-center justify-center text-foreground hover:bg-foreground/[0.02] active:scale-95 transition-all cursor-pointer" title="Scroll Right">
                  <IconArrowRight className="w-4 h-4"/>
                </button>
              </div>
            </div>

            
            <div ref={scrollRef} className="flex overflow-x-auto gap-6 scrollbar-none [&::-webkit-scrollbar]:hidden snap-x snap-mandatory pb-4 w-full select-none">
              {relatedProducts.map((p) => (<div key={p.id} className="w-[260px] md:w-[280px] shrink-0 snap-start">
                  <ProductCard product={p} categoryId={p.category}/>
                </div>))}
            </div>
          </div>)}

      </div>

      <ShoppingCartDrawer />
    </div>);
}
