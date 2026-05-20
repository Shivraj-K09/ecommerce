"use client";

import { LazyMotion, domAnimation } from "motion/react";
import { usePathname } from "next/navigation";
import { HeaderNavigation } from "@/components/header-navigation";
import { Footer, type FooterWidth } from "@/components/footer";

function resolveFooterLayout(pathname: string): {
    showFooter: boolean;
    footerWidth: FooterWidth;
} {
    if (pathname.startsWith("/cart")) {
        return { showFooter: false, footerWidth: "default" };
    }
    if (/^\/category\/[^/]+\/product\//.test(pathname)) {
        return { showFooter: true, footerWidth: "product" };
    }
    if (pathname.startsWith("/category/")) {
        return { showFooter: true, footerWidth: "category" };
    }
    return { showFooter: true, footerWidth: "default" };
}

export function StorefrontShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname() ?? "";
    const { showFooter, footerWidth } = resolveFooterLayout(pathname);

    return (<LazyMotion features={domAnimation} strict>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:ring-3 focus:ring-ring/50">
          Skip to main content
        </a>
        <HeaderNavigation />
        <main id="main-content" className="flex-1 flex flex-col relative z-20">{children}</main>
        {showFooter ? <Footer width={footerWidth} /> : null}
      </div>
    </LazyMotion>);
}
