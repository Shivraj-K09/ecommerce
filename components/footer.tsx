"use client";
import React, { startTransition } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconLock,
  IconShieldCheck,
  IconCreditCard,
  IconTruck,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type FooterWidth = "default" | "category" | "product";

const footerInnerWidth: Record<FooterWidth, string> = {
  default: "w-full px-6 md:px-12",
  category: "max-w-[1600px] px-4 sm:px-8 lg:px-16",
  product: "max-w-[1360px] px-6 md:px-12",
};

export function Footer({ width = "default" }: { width?: FooterWidth }) {
  const { push } = useRouter();

  function goHome() {
    startTransition(() => {
      push("/");
    });
  }

  function goElectronics() {
    startTransition(() => {
      push("/category/electronics");
    });
  }

  function goLiving() {
    startTransition(() => {
      push("/category/living");
    });
  }

  function goWriting() {
    startTransition(() => {
      push("/category/writing");
    });
  }

  function goWellness() {
    startTransition(() => {
      push("/category/wellness");
    });
  }

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    if (email) {
      toast.success("SUBSCRIBED SUCCESSFULLY", {
        description: "You have been added to the AURA archival newsletter.",
      });
      e.currentTarget.reset();
    }
  };

  return (
    <footer className="bg-background border-border/40 relative z-20 mt-auto w-full border-t py-16 text-left font-sans select-none">
      <div
        className={cn(
          "mx-auto flex w-full flex-col gap-12",
          footerInnerWidth[width],
        )}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={goHome}
                className="text-foreground inline-flex min-h-11 min-w-11 cursor-pointer items-center border-0 bg-transparent p-0 text-left font-sans text-lg font-semibold tracking-[0.25em] uppercase transition-opacity hover:opacity-80"
              >
                AURA
              </button>
              <p className="text-muted-foreground max-w-[360px] font-sans text-xs leading-relaxed font-light">
                Timeless spatial products crafted with absolute material
                precision to elevate and complement physical living
                environments.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-foreground font-mono text-[9px] font-bold tracking-widest uppercase">
                SUBSCRIBE TO BRIEFINGS
              </span>
              <form
                onSubmit={handleSubscribe}
                className="flex max-w-[380px] gap-2"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address for newsletter
                </label>
                <Input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Enter email address"
                  className="placeholder:text-muted-foreground/70 border-foreground/10 focus-visible:ring-foreground/20 h-10 rounded-md font-mono text-[10px] tracking-wider uppercase"
                />
                <Button
                  type="submit"
                  variant="default"
                  className="h-10 cursor-pointer px-5 font-mono text-[10px] font-bold tracking-widest uppercase"
                >
                  JOIN
                </Button>
              </form>
              <p className="text-muted-foreground font-mono text-[9px] tracking-wider uppercase">
                Get priority releases, material schedules, and early briefings.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-2">
            <span className="text-foreground font-mono text-[9px] font-bold tracking-widest uppercase">
              SPECTRUMS
            </span>
            <ul className="text-muted-foreground flex flex-col gap-1 font-sans text-xs font-light uppercase">
              <li>
                <button
                  type="button"
                  onClick={goHome}
                  className="hover:text-foreground inline-flex min-h-11 cursor-pointer items-center border-none bg-transparent px-1 py-2 text-left transition-colors hover:underline"
                >
                  Shop All
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={goElectronics}
                  className="hover:text-foreground inline-flex min-h-11 cursor-pointer items-center border-none bg-transparent px-1 py-2 text-left transition-colors hover:underline"
                >
                  Audio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={goLiving}
                  className="hover:text-foreground inline-flex min-h-11 cursor-pointer items-center border-none bg-transparent px-1 py-2 text-left transition-colors hover:underline"
                >
                  Living
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={goWriting}
                  className="hover:text-foreground inline-flex min-h-11 cursor-pointer items-center border-none bg-transparent px-1 py-2 text-left transition-colors hover:underline"
                >
                  Tactile
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={goWellness}
                  className="hover:text-foreground inline-flex min-h-11 cursor-pointer items-center border-none bg-transparent px-1 py-2 text-left transition-colors hover:underline"
                >
                  Wellness
                </button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-2">
            <span className="text-foreground font-mono text-[9px] font-bold tracking-widest uppercase">
              CUSTOMER CARE
            </span>
            <ul className="text-muted-foreground flex flex-col gap-2.5 font-sans text-xs font-light uppercase">
              <li className="hover:text-foreground cursor-help transition-colors">
                Shipping & Delivery
              </li>
              <li className="hover:text-foreground cursor-help transition-colors">
                Returns & Refunds
              </li>
              <li className="hover:text-foreground cursor-help transition-colors">
                Order Tracking
              </li>
              <li className="hover:text-foreground cursor-help transition-colors">
                Secure Checkout
              </li>
              <li className="hover:text-foreground cursor-help transition-colors">
                Product Care Index
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-3">
            <div className="flex flex-col gap-3">
              <span className="text-foreground font-mono text-[9px] font-bold tracking-widest uppercase">
                THE STUDIO
              </span>
              <p className="text-muted-foreground font-sans text-xs leading-relaxed font-light uppercase">
                Aura HQ Outpost
                <br />
                820 Flagship Avenue
                <br />
                Los Angeles, CA 90001
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-foreground font-mono text-[9px] font-bold tracking-widest uppercase">
                CONNECT
              </span>
              <div className="text-muted-foreground flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                  aria-label="AURA on Instagram"
                >
                  <IconBrandInstagram
                    className="size-5 stroke-[1.5]"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                  aria-label="AURA on Twitter"
                >
                  <IconBrandTwitter
                    className="size-5 stroke-[1.5]"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                  aria-label="AURA on YouTube"
                >
                  <IconBrandYoutube
                    className="size-5 stroke-[1.5]"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-border/60" />

        <div className="grid grid-cols-2 gap-6 py-2 select-none md:grid-cols-4">
          <div className="flex items-center gap-3">
            <IconTruck className="text-muted-foreground size-5 stroke-[1.2]" />
            <div className="flex flex-col text-left">
              <span className="text-foreground font-sans text-[11px] font-semibold uppercase">
                FREE SHIPPING
              </span>
              <span className="text-muted-foreground mt-0.5 font-mono text-[9px] uppercase">
                ON ORDERS OVER ₹15,000
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IconLock className="text-muted-foreground size-5 stroke-[1.2]" />
            <div className="flex flex-col text-left">
              <span className="text-foreground font-sans text-[11px] font-semibold uppercase">
                SECURE PAYMENT
              </span>
              <span className="text-muted-foreground mt-0.5 font-mono text-[9px] uppercase">
                256-BIT ENCRYPTED SSL
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IconShieldCheck className="text-muted-foreground size-5 stroke-[1.2]" />
            <div className="flex flex-col text-left">
              <span className="text-foreground font-sans text-[11px] font-semibold uppercase">
                AUTHENTIC ORIGINAL
              </span>
              <span className="text-muted-foreground mt-0.5 font-mono text-[9px] uppercase">
                DIRECT FROM ARCHIVE
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IconCreditCard className="text-muted-foreground size-5 stroke-[1.2]" />
            <div className="flex flex-col text-left">
              <span className="text-foreground font-sans text-[11px] font-semibold uppercase">
                FLEXIBLE PAY
              </span>
              <span className="text-muted-foreground mt-0.5 font-mono text-[9px] uppercase">
                AMEX, VISA, APPLE PAY
              </span>
            </div>
          </div>
        </div>

        <Separator className="bg-border/60" />

        <div className="text-muted-foreground flex flex-col items-center gap-6 text-center font-mono text-[9px] tracking-[0.18em] uppercase md:flex-row md:items-center md:justify-between md:gap-4 md:text-left">
          <span className="max-w-[min(100%,28rem)] leading-relaxed">
            © 2026 AURA ARCHIVES INC. ALL RIGHTS RESERVED.
          </span>
          <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4 sm:gap-y-2 md:w-auto md:justify-end">
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center border-0 bg-transparent px-3 transition-colors"
            >
              Privacy Policy
            </button>

            <button
              type="button"
              className="text-muted-foreground hover:text-foreground inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center border-0 bg-transparent px-3 transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
