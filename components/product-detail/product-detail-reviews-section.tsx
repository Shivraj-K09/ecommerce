"use client";

import { useRef } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { IconStar, IconCircleCheck, IconArrowRight } from "@tabler/icons-react";
import type { ProductExtension } from "@/lib/product-extensions";

type ReviewTab = "top" | "moderate" | "bad";

type Props = {
  ext: ProductExtension;
  reviewTab: ReviewTab;
  onReviewTabChange: (tab: ReviewTab) => void;
};

export function ProductDetailReviewsSection({
  ext,
  reviewTab,
  onReviewTabChange,
}: Props) {
  const reviewsScrollRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: "left" | "right") => {
    if (reviewsScrollRef.current) {
      const scrollAmount = 360;
      reviewsScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollReviewsPrev = () => {
    scrollReviews("left");
  };

  const scrollReviewsNext = () => {
    scrollReviews("right");
  };

  return (
    <div className="border-foreground/5 mt-20 border-t pt-14">
      <div className="mb-8 flex items-center justify-between select-none">
        <div className="flex flex-col items-start text-left">
          <span className="text-muted-foreground bg-foreground/5 rounded-sm px-3 py-1 font-mono text-[8.5px] font-semibold tracking-[0.3em] uppercase">
            COLLECTIVE SATISFACTION
          </span>
          <h2 className="text-foreground mt-3 font-sans text-2xl font-light tracking-tight uppercase md:text-3xl">
            VERIFIED USER AUDITS
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollReviewsPrev}
            aria-label="Scroll reviews left"
            className="border-foreground/10 hover:border-foreground/35 text-foreground hover:bg-foreground/2 focus-visible:ring-ring/50 flex size-10 cursor-pointer items-center justify-center rounded-full border transition-all focus-visible:ring-3 focus-visible:outline-none active:scale-95"
          >
            <IconArrowRight className="size-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={scrollReviewsNext}
            aria-label="Scroll reviews right"
            className="border-foreground/10 hover:border-foreground/35 text-foreground hover:bg-foreground/2 focus-visible:ring-ring/50 flex size-10 cursor-pointer items-center justify-center rounded-full border transition-all focus-visible:ring-3 focus-visible:outline-none active:scale-95"
          >
            <IconArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Review categories"
        className="border-foreground/5 mb-8 flex justify-start gap-6 border-b select-none"
      >
        {(["top", "moderate", "bad"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={reviewTab === tab}
            onClick={() => onReviewTabChange(tab)}
            className={`focus-visible:ring-ring/50 relative cursor-pointer pb-3 text-left font-mono text-[9.5px] tracking-[0.2em] uppercase transition-colors focus-visible:ring-3 focus-visible:outline-none ${
              reviewTab === tab
                ? "text-foreground font-semibold"
                : "text-muted-foreground/50 hover:text-foreground"
            }`}
          >
            {tab === "top"
              ? "TOP AUDITS"
              : tab === "moderate"
                ? "MODERATE"
                : "CRITICAL"}
            {reviewTab === tab && (
              <m.div
                layoutId="activeReviewTabLine"
                className="bg-foreground absolute inset-x-0 bottom-0 h-[1.5px]"
                transition={{ duration: 0.15 }}
              />
            )}
          </button>
        ))}
      </div>

      <div
        className="relative w-full text-left"
        role="tabpanel"
        aria-label="Customer reviews"
      >
        <AnimatePresence mode="wait">
          <m.div
            key={reviewTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            ref={reviewsScrollRef}
            className="flex w-full snap-x snap-mandatory scrollbar-none gap-6 overflow-x-auto pb-4 select-none [&::-webkit-scrollbar]:hidden"
          >
            {ext.reviews[reviewTab].map((rev) => {
              const initials = rev.author
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();
              const avatarColor =
                rev.rating >= 4
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : rev.rating >= 3
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "bg-sky-500/10 text-sky-600 dark:text-sky-400";

              return (
                <div
                  key={`${reviewTab}-${rev.author}-${rev.date}-${rev.title}`}
                  className="border-foreground/4 bg-foreground/1 hover:border-foreground/10 flex w-[300px] shrink-0 snap-start flex-col justify-between gap-4 rounded-xl border p-6 transition-all duration-300 md:w-[350px]"
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-8 rounded-full ${avatarColor} flex shrink-0 items-center justify-center font-mono text-[10px] font-semibold`}
                        >
                          {initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-foreground font-sans text-xs font-medium">
                            {rev.author}
                          </span>
                          <span className="text-store-min text-muted-foreground/60 font-mono">
                            {rev.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center text-amber-500">
                        {([1, 2, 3, 4, 5] as const).map((starLevel) => (
                          <IconStar
                            key={`${rev.author}-${rev.date}-star-${starLevel}`}
                            className={`size-3 ${starLevel <= rev.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground/20"}`}
                          />
                        ))}
                      </div>
                    </div>

                    <h4 className="text-foreground mt-1 font-sans text-xs font-semibold">
                      {rev.title}
                    </h4>
                    <p className="text-foreground/80 font-sans text-xs leading-relaxed font-light">
                      {rev.content}
                    </p>
                  </div>

                  <div className="border-foreground/3 text-store-min flex items-center gap-1.5 border-t pt-3 font-mono font-semibold tracking-widest text-emerald-600 uppercase select-none dark:text-emerald-400">
                    <IconCircleCheck className="size-3.5" />
                    <span>VERIFIED PRODUCT ADHERENCE</span>
                  </div>
                </div>
              );
            })}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
