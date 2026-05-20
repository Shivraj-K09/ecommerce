import Image from "next/image";
import { PRODUCTS } from "@/lib/data";
import { HomeFlagshipSectionClient } from "./home-flagship-section-client";

const FLAGSHIP_IDS = ["headphones", "keyboard", "carafe", "incense"] as const;

export function HomeFlagshipSection() {
  const products = FLAGSHIP_IDS.map(
    (id) => PRODUCTS.find((product) => product.id === id) ?? PRODUCTS[0],
  );

  const images = products.map((product, idx) => (
    <Image
      key={product.id}
      src={product.image}
      alt={product.name}
      fill
      priority={idx === 0}
      fetchPriority={idx === 0 ? "high" : "auto"}
      loading={idx === 0 ? "eager" : "lazy"}
      className="origin-center object-cover"
      sizes="(max-width: 768px) 100vw, 25vw"
    />
  ));

  return (
    <HomeFlagshipSectionClient products={products} images={images} />
  );
}
