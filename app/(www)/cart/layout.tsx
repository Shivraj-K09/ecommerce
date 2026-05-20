import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CartSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
