"use client";

import React, { startTransition } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  IconBrandInstagram, 
  IconBrandTwitter, 
  IconBrandYoutube, 
  IconLock,
  IconShieldCheck,
  IconCreditCard,
  IconTruck
} from "@tabler/icons-react";

export function Footer() {
  const router = useRouter();

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
    <footer className="w-full bg-background border-t border-border/40 py-16 px-6 md:px-12 mt-auto font-sans relative z-20 select-none text-left">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        
        {/* Top Fold: Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Column 1: Brand Info & Newsletter (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span 
                onClick={() => startTransition(() => router.push("/"))}
                className="font-sans font-semibold text-lg tracking-[0.25em] uppercase text-foreground cursor-pointer hover:opacity-80 transition-opacity w-fit"
              >
                AURA
              </span>
              <p className="font-sans font-light text-xs text-muted-foreground max-w-[360px] leading-relaxed">
                Timeless spatial products crafted with absolute material precision to elevate and complement physical living environments.
              </p>
            </div>

            {/* Newsletter Subscription using proper shadcn elements */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[9px] tracking-widest text-foreground font-bold uppercase">
                SUBSCRIBE TO BRIEFINGS
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-[380px]">
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter email address"
                  className="rounded-md font-mono text-[10px] tracking-wider placeholder:text-muted-foreground/35 uppercase border-foreground/10 focus-visible:ring-foreground/20 h-10"
                />
                <Button 
                  type="submit" 
                  variant="default"
                  className="font-mono text-[10px] tracking-widest uppercase px-5 font-bold h-10 cursor-pointer"
                >
                  JOIN
                </Button>
              </form>
              <p className="font-mono text-[8.5px] tracking-wider text-muted-foreground/50 uppercase">
                Get priority releases, material schedules, and early briefings.
              </p>
            </div>
          </div>

          {/* Column 2: Shop Spectrums (2 Columns) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="font-mono text-[9px] tracking-widest text-foreground font-bold uppercase">
              SPECTRUMS
            </span>
            <ul className="flex flex-col gap-2.5 font-sans font-light text-xs text-muted-foreground uppercase">
              <li>
                <button
                  onClick={() => startTransition(() => router.push("/"))}
                  className="hover:text-foreground hover:underline transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
                >
                  Shop All
                </button>
              </li>
              <li>
                <button
                  onClick={() => startTransition(() => router.push("/category/electronics"))}
                  className="hover:text-foreground hover:underline transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
                >
                  Audio
                </button>
              </li>
              <li>
                <button
                  onClick={() => startTransition(() => router.push("/category/living"))}
                  className="hover:text-foreground hover:underline transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
                >
                  Living
                </button>
              </li>
              <li>
                <button
                  onClick={() => startTransition(() => router.push("/category/writing"))}
                  className="hover:text-foreground hover:underline transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
                >
                  Tactile
                </button>
              </li>
              <li>
                <button
                  onClick={() => startTransition(() => router.push("/category/wellness"))}
                  className="hover:text-foreground hover:underline transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
                >
                  Wellness
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service (2 Columns) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="font-mono text-[9px] tracking-widest text-foreground font-bold uppercase">
              CUSTOMER CARE
            </span>
            <ul className="flex flex-col gap-2.5 font-sans font-light text-xs text-muted-foreground uppercase">
              <li className="cursor-help hover:text-foreground transition-colors">Shipping & Delivery</li>
              <li className="cursor-help hover:text-foreground transition-colors">Returns & Refunds</li>
              <li className="cursor-help hover:text-foreground transition-colors">Order Tracking</li>
              <li className="cursor-help hover:text-foreground transition-colors">Secure Checkout</li>
              <li className="cursor-help hover:text-foreground transition-colors">Product Care Index</li>
            </ul>
          </div>

          {/* Column 4: Outpost Info & Socials (3 Columns) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[9px] tracking-widest text-foreground font-bold uppercase">
                THE STUDIO
              </span>
              <p className="font-sans font-light text-xs text-muted-foreground leading-relaxed uppercase">
                Aura HQ Outpost<br />
                820 Flagship Avenue<br />
                Los Angeles, CA 90001
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] tracking-widest text-foreground font-bold uppercase">
                CONNECT
              </span>
              <div className="flex gap-4 text-muted-foreground">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" title="Instagram">
                  <IconBrandInstagram className="w-5 h-5 stroke-[1.5]" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" title="Twitter">
                  <IconBrandTwitter className="w-5 h-5 stroke-[1.5]" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" title="YouTube">
                  <IconBrandYoutube className="w-5 h-5 stroke-[1.5]" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Separator using proper shadcn component */}
        <Separator className="bg-border/60" />

        {/* Middle Fold: Premium Store Features & Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2 select-none">
          <div className="flex items-center gap-3">
            <IconTruck className="w-5 h-5 text-muted-foreground stroke-[1.2]" />
            <div className="flex flex-col text-left">
              <span className="font-sans text-[11px] font-semibold text-foreground uppercase">FREE SHIPPING</span>
              <span className="font-mono text-[9px] text-muted-foreground uppercase mt-0.5">ON ORDERS OVER ₹15,000</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IconLock className="w-5 h-5 text-muted-foreground stroke-[1.2]" />
            <div className="flex flex-col text-left">
              <span className="font-sans text-[11px] font-semibold text-foreground uppercase">SECURE PAYMENT</span>
              <span className="font-mono text-[9px] text-muted-foreground uppercase mt-0.5">256-BIT ENCRYPTED SSL</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IconShieldCheck className="w-5 h-5 text-muted-foreground stroke-[1.2]" />
            <div className="flex flex-col text-left">
              <span className="font-sans text-[11px] font-semibold text-foreground uppercase">AUTHENTIC ORIGINAL</span>
              <span className="font-mono text-[9px] text-muted-foreground uppercase mt-0.5">DIRECT FROM ARCHIVE</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IconCreditCard className="w-5 h-5 text-muted-foreground stroke-[1.2]" />
            <div className="flex flex-col text-left">
              <span className="font-sans text-[11px] font-semibold text-foreground uppercase">FLEXIBLE PAY</span>
              <span className="font-mono text-[9px] text-muted-foreground uppercase mt-0.5">AMEX, VISA, APPLE PAY</span>
            </div>
          </div>
        </div>

        {/* Separator using proper shadcn component */}
        <Separator className="bg-border/60" />

        {/* Bottom Fold: Meta copyright, status badging and systems checks */}
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:gap-4 md:text-left text-muted-foreground/60 font-mono text-[9px] tracking-[0.18em] uppercase">
          <span className="max-w-[min(100%,28rem)] leading-relaxed">
            © 2026 AURA ARCHIVES INC. ALL RIGHTS RESERVED.
          </span>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-end sm:gap-x-4 sm:gap-y-2 w-full md:w-auto">
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hidden sm:inline text-foreground/20 select-none" aria-hidden>
              •
            </span>
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hidden sm:inline text-foreground/20 select-none" aria-hidden>
              •
            </span>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 px-2.5 py-0.5 font-mono text-store-min tracking-[0.15em] hover:bg-emerald-500/10 shrink-0">
              SYSTEM STATUS: ONLINE
            </Badge>
          </div>
        </div>

      </div>
    </footer>
  );
}
