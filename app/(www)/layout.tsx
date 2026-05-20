import type { Metadata } from "next";
import { StorefrontShell } from "@/components/storefront-shell";

export const metadata: Metadata = {
  title: {
    default: "AURA — Timeless Objects & Spatial Archives",
    template: "%s · AURA",
  },
  description:
    "An archive of curated everyday objects crafted with material precision to complement and elevate physical living environments.",
};

export default function StorefrontRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StorefrontShell>{children}</StorefrontShell>;
}
