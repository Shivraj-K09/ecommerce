"use client";

import { use, useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCartDrawer } from "@/components/shopping-cart-drawer";
import { ProductDetailHeroSection } from "@/components/product-detail/product-detail-hero-section";
import { ProductDetailStorySection } from "@/components/product-detail/product-detail-story-section";
import { ProductDetailReviewsSection } from "@/components/product-detail/product-detail-reviews-section";
import { ProductDetailRelatedSection } from "@/components/product-detail/product-detail-related-section";
import { PRODUCTS } from "@/lib/data";
import { getProductExtension } from "@/lib/product-extensions";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export function ProductDetailPageClient({
  params,
}: {
  params: Promise<{
    id: string;
    productId: string;
  }>;
}) {
  const { productId } = use(params);
  const { push } = useRouter();
  const addToCart = useStore((state) => state.addToCart);
  const product = PRODUCTS.find((p) => p.id === productId);
  const [activeImage, setActiveImage] = useState(product?.image || "");
  const [selectedColor] = useState(product?.colors?.[0]?.name || "");
  const [reviewTab, setReviewTab] = useState<"top" | "moderate" | "bad">("top");

  if (!product) {
    return (
      <div className="bg-background flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground font-mono text-xs tracking-[0.25em] uppercase">
            PRODUCT NOT FOUND
          </p>
        </div>
      </div>
    );
  }

  const ext = getProductExtension(product.id, product.category);
  const discountAmount = Math.round(
    product.price * (ext.discountPercent / 100),
  );
  const originalPrice = product.price + discountAmount;
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );

  const handleAddAction = (directCheckout = false) => {
    addToCart(product, selectedColor);
    toast.success("ADDED TO BAG", {
      description: `${product.name} (${selectedColor || "Standard"}) has been added.`,
    });
    if (directCheckout) {
      startTransition(() => {
        push("/cart");
      });
    }
  };

  const goBackToCollection = () => {
    startTransition(() => {
      push(`/category/${product.category}`);
    });
  };

  const goCrumbsHome = () => {
    push("/");
  };

  const goCrumbsCategory = () => {
    startTransition(() => {
      push(`/category/${product.category}`);
    });
  };

  const handleBuyNow = () => {
    handleAddAction(true);
  };

  const handleAddToBagOnly = () => {
    handleAddAction(false);
  };

  return (
    <div className="bg-background text-foreground relative w-full overflow-x-hidden pb-12 font-sans select-none">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--theme-glow,rgba(0,0,0,0.03)))]" />
      </div>

      <div className="relative z-20 mx-auto mt-8 w-full max-w-[1360px] px-6 md:px-12">
        <ProductDetailHeroSection
          product={product}
          ext={ext}
          activeImage={activeImage}
          onSelectImage={setActiveImage}
          originalPrice={originalPrice}
          discountAmount={discountAmount}
          onGoBack={goBackToCollection}
          onGoHome={goCrumbsHome}
          onGoCategory={goCrumbsCategory}
          onBuyNow={handleBuyNow}
          onAddToBag={handleAddToBagOnly}
        />
        <ProductDetailStorySection ext={ext} />
        <ProductDetailReviewsSection
          ext={ext}
          reviewTab={reviewTab}
          onReviewTabChange={setReviewTab}
        />
        <ProductDetailRelatedSection relatedProducts={relatedProducts} />
      </div>

      <ShoppingCartDrawer />
    </div>
  );
}
