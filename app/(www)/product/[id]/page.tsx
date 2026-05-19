"use client";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
export default function OldProductPage({ params, }: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = use(params);
    const router = useRouter();
    useEffect(() => {
        const product = PRODUCTS.find((p) => p.id === id);
        if (product) {
            router.replace(`/category/${product.category}/product/${product.id}`);
        }
        else {
            router.replace("/");
        }
    }, [id, router]);
    return (<div className="h-screen w-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-[1.5px] bg-foreground animate-pulse"/>
        <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
          ROUTING — OPTIMIZING INTERFACES
        </p>
      </div>
    </div>);
}
