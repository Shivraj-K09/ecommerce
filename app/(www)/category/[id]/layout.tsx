import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CATEGORY_METADATA } from "@/lib/data";

export default async function CategorySegmentLayout({ children, params, }: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    if (id === "all") {
        redirect("/");
    }
    return children;
}

export async function generateMetadata({ params, }: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const meta = CATEGORY_METADATA[id];
    if (!meta) {
        return { title: "Category" };
    }
    return {
        title: meta.title.replace(/\s+/g, " ").trim(),
        description: meta.subtitle,
    };
}
