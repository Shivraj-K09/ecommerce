"use client";

import Image from "next/image";
import { IconVolume, IconActivity } from "@tabler/icons-react";
import type { ProductExtension } from "@/lib/product-extensions";

type Props = {
  ext: ProductExtension;
};

export function ProductDetailStorySection({ ext }: Props) {
  return (
    <div className="border-foreground/5 mt-20 border-t pt-14">
      <div className="mb-10 flex flex-col items-start text-left select-none">
        <span className="text-muted-foreground bg-foreground/5 rounded-sm px-3 py-1.5 font-mono text-[8.5px] font-semibold tracking-[0.35em] uppercase">
          THE DESIGN PROTOCOL
        </span>
        <h2 className="text-foreground mt-4 max-w-4xl font-sans text-3xl leading-[1.1] font-light tracking-tighter uppercase md:text-4xl lg:text-5xl">
          Uncompromising Material Precision. <br />
          <span className="text-muted-foreground/60 font-serif lowercase italic">
            sculpted for the modern workspace archive.
          </span>
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-6 text-left lg:col-span-7">
          <span className="text-muted-foreground/80 font-mono text-[9px] font-semibold tracking-[0.25em] uppercase">
            {ext.storySub}
          </span>

          <h3 className="text-foreground border-foreground/5 border-b pb-3 font-sans text-xl leading-tight font-light tracking-tight uppercase md:text-2xl">
            {ext.storyHeadline}
          </h3>

          <div className="border-foreground/30 my-2 border-l py-1 pl-6">
            <p className="text-foreground/90 font-serif text-lg leading-relaxed font-light italic">
              {ext.storyQuote}
            </p>
          </div>

          <div className="text-foreground/80 grid grid-cols-1 gap-8 font-sans text-sm leading-relaxed font-light md:grid-cols-2">
            <p>{ext.storyBody1}</p>
            <p>{ext.storyBody2}</p>
          </div>

          <div className="border-foreground/5 text-muted-foreground/80 mt-4 flex gap-8 border-t pt-6 font-mono text-[9px] tracking-wider uppercase select-none">
            <div className="flex items-center gap-2">
              <IconVolume className="text-foreground/80 size-4 stroke-[1.2]" />
              <span>ACOUSTICS CALIBRATED</span>
            </div>
            <div className="flex items-center gap-2">
              <IconActivity className="text-foreground/80 size-4 stroke-[1.2]" />
              <span>SPECTRUM TESTED</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="border-foreground/4 bg-muted/20 relative aspect-4/3 overflow-hidden rounded-lg border select-none">
            <Image
              src={ext.gallery[1]}
              alt="Story detail"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          <div className="pt-2">
            <div className="text-foreground border-foreground/10 mb-4 border-b pb-2 font-mono text-[9px] font-semibold tracking-[0.25em] uppercase select-none">
              TECHNICAL SCHEDULING
            </div>
            <div className="flex flex-col text-left">
              {ext.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="border-foreground/5 text-foreground/80 flex items-center justify-between border-b py-3 font-sans text-xs font-light"
                >
                  <span className="text-muted-foreground font-mono text-[8.5px] tracking-wider uppercase">
                    {spec.label}
                  </span>
                  <span className="text-foreground font-medium">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
