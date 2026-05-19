import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/data";

export async function generateMetadata({ params, }: {
    params: Promise<{ productId: string }>;
}): Promise<Metadata> {
    const { productId } = await params;
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) {
        return { title: "Product" };
    }
    return {
        title: product.name,
        description: product.description,
    };
}

export default function ProductDetailSegmentLayout({ children }: {
    children: React.ReactNode;
}) {
    return children;
}
