"use client";

import { LazyMotion, domAnimation } from "motion/react";
import { HeaderNavigation } from "@/components/header-navigation";
import { Footer } from "@/components/footer";

export function StorefrontShell({ children }: { children: React.ReactNode }) {
    return (<LazyMotion features={domAnimation} strict>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500">
        <HeaderNavigation />
        <main className="flex-1 flex flex-col relative z-20">{children}</main>
        <Footer />
      </div>
    </LazyMotion>);
}
