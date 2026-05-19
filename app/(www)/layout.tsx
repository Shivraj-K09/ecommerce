"use client";
import React from "react";
import { HeaderNavigation } from "@/components/header-navigation";
import { Footer } from "@/components/footer";
export default function StorefrontLayout({ children, }: {
    children: React.ReactNode;
}) {
    return (<div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500">
      <HeaderNavigation />
      <main className="flex-1 flex flex-col relative z-20">{children}</main>
      <Footer />
    </div>);
}
