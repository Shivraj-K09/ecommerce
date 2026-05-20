export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    rating: number;
    reviewsCount: number;
    description: string;
    features: string[];
    image: string;
    specifications: Record<string, string>;
    colors: {
        name: string;
        hex: string;
    }[];
    isNew?: boolean;
    isFeatured?: boolean;
}
export const CATEGORY_METADATA: Record<string, {
    title: string;
    subtitle: string;
    tagline: string;
    image: string;
}> = {
    all: {
        title: "SHOP ALL PRODUCTS",
        subtitle: "THE COMPLETE ARCHIVE OF PREMIUM MODERN PRODUCTS",
        tagline: "FULL ARCHIVE CATALOG",
        image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1800&auto=format&fit=crop",
    },
    electronics: {
        title: "AUDIO & TECH",
        subtitle: "PROFESSIONAL REFERENCE AUDIO & HIGH-FIDELITY SOUND PRODUCTS",
        tagline: "HIGH-PERFORMANCE CYBERNETICS",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1800&auto=format&fit=crop",
    },
    living: {
        title: "HOME & LIVING",
        subtitle: "ARCHITECTURAL HOMEGOODS & SEAMLESS ACCESSORIES",
        tagline: "ORGANIC SPATIAL ALIGNMENT",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1800&auto=format&fit=crop",
    },
    writing: {
        title: "TACTILE WRITING",
        subtitle: "CNC-MACHINED WRITING INSTRUMENTS & WEIGHTED PEN SHIFTS",
        tagline: "TACTILE PRECISION FLUIDITY",
        image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1800&auto=format&fit=crop",
    },
    wellness: {
        title: "WELLNESS & AROMA",
        subtitle: "NATURAL FRAGRANCE CORE EMITTERS & CEREMONIAL TEXTURES",
        tagline: "SENSORY REST & MEDITATION",
        image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=1800&auto=format&fit=crop",
    },
};
export const CATEGORY_LABEL_NAMES: Record<string, string> = {
    electronics: "AUDIO & TECH",
    living: "LIVING",
    writing: "TACTILE",
    wellness: "WELLNESS",
};

export const CATEGORIES = [
    { id: "all", name: "All Products" },
    { id: "electronics", name: "Audio & Tech" },
    { id: "living", name: "Home & Living" },
    { id: "writing", name: "Tactile Writing" },
    { id: "wellness", name: "Wellness & Aroma" }
];
export const PRODUCTS: Product[] = [
    {
        id: "headphones",
        name: "Aetheria Reference Headphones",
        category: "electronics",
        price: 650,
        rating: 4.9,
        reviewsCount: 32,
        description: "Surgical steel and planar magnetic acoustics.",
        features: ["Planar magnetic synthesis", "Aniline leather"],
        image: "/products/headphones.png",
        specifications: { "Driver": "90mm", "Impedance": "32 Ohms" },
        colors: [{ name: "Obsidian", hex: "#171717" }]
    },
    {
        id: "keyboard",
        name: "Onyx Mechanical Keyboard",
        category: "electronics",
        price: 420,
        rating: 4.8,
        reviewsCount: 18,
        description: "Anodized aluminum gasket-mounted keyboard.",
        features: ["CNC milled frame", "Lubricated linears"],
        image: "/products/keyboard.png",
        specifications: { "Layout": "75% US", "Switches": "Silent Linear" },
        colors: [{ name: "Stealth Black", hex: "#171717" }]
    },
    {
        id: "mouse",
        name: "Apex Wireless Mouse",
        category: "electronics",
        price: 180,
        rating: 4.7,
        reviewsCount: 12,
        description: "Sintered zirconium shell precision tracking mouse.",
        features: ["Ceramic glides", "8000Hz polling rate"],
        image: "/products/keyboard.png",
        specifications: { "Sensor": "Optical 32k", "Weight": "55g" },
        colors: [{ name: "Titanium", hex: "#b45309" }]
    },
    {
        id: "monitors",
        name: "Horizon Studio Monitors",
        category: "electronics",
        price: 1250,
        rating: 5.0,
        reviewsCount: 8,
        description: "Active bi-amplified studio monitor system.",
        features: ["Ribbon tweeter", "DSP room correction"],
        image: "/products/headphones.png",
        specifications: { "Power": "150W", "Inputs": "XLR / TRS" },
        colors: [{ name: "Obsidian", hex: "#171717" }]
    },
    {
        id: "powerbank",
        name: "Nomad Leather Power Capsule",
        category: "electronics",
        price: 140,
        rating: 4.6,
        reviewsCount: 22,
        description: "Horween leather wrapped high-speed backup charger.",
        features: ["MagSafe aligned", "100W Power Delivery"],
        image: "/products/headphones.png",
        specifications: { "Capacity": "20000mAh", "Ports": "Dual USB-C" },
        colors: [{ name: "Obsidian", hex: "#171717" }]
    },
    {
        id: "stand",
        name: "Axis Headphone Stand",
        category: "electronics",
        price: 110,
        rating: 4.8,
        reviewsCount: 14,
        description: "Heavy aluminum display stand with walnut resting pad.",
        features: ["Integrated cable management", "Suede base"],
        image: "/products/headphones.png",
        specifications: { "Material": "Walnut & Steel", "Height": "28cm" },
        colors: [{ name: "Obsidian", hex: "#171717" }]
    },
    {
        id: "carafe",
        name: "Helix Water Carafe",
        category: "living",
        price: 220,
        rating: 5.0,
        reviewsCount: 14,
        description: "Mouth-blown lead-free crystalline carafe.",
        features: ["Lead-free crystal", "Surgical steel collar"],
        image: "/products/carafe.png",
        specifications: { "Volume": "1.2L", "Origin": "Denmark" },
        colors: [{ name: "Surgical Steel", hex: "#e2e8f0" }]
    },
    {
        id: "deskmat",
        name: "Monolith Desk Mat",
        category: "living",
        price: 290,
        rating: 4.9,
        reviewsCount: 57,
        description: "Premium merino wool felt and aniline leather rail.",
        features: ["Merino wool", "Magnetic alignment rail"],
        image: "/products/carafe.png",
        specifications: { "Dimensions": "900x400mm", "Thickness": "4.5mm" },
        colors: [{ name: "Charcoal", hex: "#7c2d12" }]
    },
    {
        id: "vase",
        name: "Terra Clay Vase",
        category: "living",
        price: 195,
        rating: 4.7,
        reviewsCount: 9,
        description: "Hand-thrown sand clay sculptural dry vase.",
        features: ["Natural unglazed finish", "Architectural shape"],
        image: "/products/carafe.png",
        specifications: { "Material": "Terracotta", "Height": "32cm" },
        colors: [{ name: "Earthy Slate", hex: "#7c2d12" }]
    },
    {
        id: "blanket",
        name: "Aero Wool Blanket",
        category: "living",
        price: 340,
        rating: 4.9,
        reviewsCount: 31,
        description: "Ultra-soft alpaca and virgin merino wool throw blanket.",
        features: ["Hypoallergenic weave", "Loomed in Italy"],
        image: "/products/carafe.png",
        specifications: { "Blend": "70% Alpaca / 30% Merino", "Size": "140x200cm" },
        colors: [{ name: "Natural Ivory", hex: "#fafaf9" }]
    },
    {
        id: "coasters",
        name: "Aura Concrete Coasters",
        category: "living",
        price: 75,
        rating: 4.8,
        reviewsCount: 16,
        description: "Set of four raw concrete coasters with cork bottom pads.",
        features: ["Individually cast", "Water-resistant seal"],
        image: "/products/carafe.png",
        specifications: { "Quantity": "4-pack", "Diameter": "10cm" },
        colors: [{ name: "Raw Concrete", hex: "#94a3b8" }]
    },
    {
        id: "bowl",
        name: "Stella Brass Bowl",
        category: "living",
        price: 260,
        rating: 5.0,
        reviewsCount: 6,
        description: "Geometric hand-spun solid brass display bowl.",
        features: ["Solid C260 brass", "Anti-oxidant layer"],
        image: "/products/carafe.png",
        specifications: { "Weight": "1.2kg", "Diameter": "24cm" },
        colors: [{ name: "Raw Brass", hex: "#b45309" }]
    },
    {
        id: "pen",
        name: "Horizon Brass Writer",
        category: "writing",
        price: 150,
        rating: 4.6,
        reviewsCount: 89,
        description: "CNC-machined solid raw brass fluid pen.",
        features: ["Hydraulic damped pen", "Magnetic cap"],
        image: "/products/pen.png",
        specifications: { "Weight": "48g", "Refill": "Horizon 0.5mm" },
        colors: [{ name: "Raw Brass", hex: "#b45309" }]
    },
    {
        id: "anchor",
        name: "Chronos Page Anchor",
        category: "writing",
        price: 85,
        rating: 4.9,
        reviewsCount: 42,
        description: "Solid raw copper page anchor for seamless reading.",
        features: ["Hand polished copper", "Fits any book size"],
        image: "/products/pen.png",
        specifications: { "Material": "C110 Copper", "Length": "12cm" },
        colors: [{ name: "Polished Copper", hex: "#b45309" }]
    },
    {
        id: "journal",
        name: "Codex Leather Journal",
        category: "writing",
        price: 120,
        rating: 4.8,
        reviewsCount: 29,
        description: "Refillable vegetable-tanned leather wrap journal.",
        features: ["Lay-flat book binding", "120gsm fountain-pen paper"],
        image: "/products/pen.png",
        specifications: { "Sheets": "160 dotted", "Size": "A5 Slim" },
        colors: [{ name: "Tan Leather", hex: "#7c2d12" }]
    },
    {
        id: "tray",
        name: "Minimal Walnut Tray",
        category: "writing",
        price: 135,
        rating: 4.7,
        reviewsCount: 15,
        description: "Solid American walnut desk tray with milled utility slots.",
        features: ["FSC certified timber", "Polished brass rails"],
        image: "/products/pen.png",
        specifications: { "Timber": "Walnut", "Dimensions": "300x120mm" },
        colors: [{ name: "Walnut", hex: "#7c2d12" }]
    },
    {
        id: "ruler",
        name: "Tokyo Brass Ruler",
        category: "writing",
        price: 65,
        rating: 4.8,
        reviewsCount: 38,
        description: "CNC engraved raw brass 15cm geometric ruler.",
        features: ["Deep etched markings", "Tactile solid weight"],
        image: "/products/pen.png",
        specifications: { "Scale": "15cm / 6in", "Thickness": "3mm" },
        colors: [{ name: "Raw Brass", hex: "#b45309" }]
    },
    {
        id: "paperweight",
        name: "Stellar Solid Brass Weight",
        category: "writing",
        price: 95,
        rating: 4.9,
        reviewsCount: 11,
        description: "Solid spun brass spherical desk alignment paperweight.",
        features: ["Spun raw brass", "Felt bottom lining"],
        image: "/products/pen.png",
        specifications: { "Diameter": "60mm", "Weight": "850g" },
        colors: [{ name: "Raw Brass", hex: "#b45309" }]
    },
    {
        id: "incense",
        name: "Basalt Incense Burner",
        category: "wellness",
        price: 180,
        rating: 4.7,
        reviewsCount: 45,
        description: "Volcanic basalt monolithic aroma diffuser core.",
        features: ["Basalt stone casing", "Thermal element"],
        image: "/products/incense.png",
        specifications: { "Power": "USB-C", "Battery": "8 sessions" },
        colors: [{ name: "Volcanic Grey", hex: "#374151" }]
    },
    {
        id: "diffuser",
        name: "Somnia Sleep Oil Diffuser",
        category: "wellness",
        price: 240,
        rating: 4.9,
        reviewsCount: 23,
        description: "Silent ultrasonic nebulizing raw stoneware diffuser.",
        features: ["Stoneware ceramic dome", "Waterless technology"],
        image: "/products/incense.png",
        specifications: { "Coverage": "40m²", "Modes": "3 interval streams" },
        colors: [{ name: "Sandy Stoneware", hex: "#fafaf9" }]
    },
    {
        id: "candle",
        name: "Solis Soy Candle",
        category: "wellness",
        price: 85,
        rating: 4.8,
        reviewsCount: 61,
        description: "Organic coconut-soy wax candle hand poured in stoneware.",
        features: ["Natural essential oils", "Double organic wood wicks"],
        image: "/products/incense.png",
        specifications: { "Burn Time": "60 hours", "Weight": "280g" },
        colors: [{ name: "Sandy Stoneware", hex: "#fafaf9" }]
    },
    {
        id: "matchaset",
        name: "Matcha Ceramic Whisk Set",
        category: "wellness",
        price: 160,
        rating: 5.0,
        reviewsCount: 19,
        description: "Complete ceremonial Japanese matcha bowl and bamboo whisk.",
        features: ["Hand glazed stoneware bowl", "100-prong bamboo whisk"],
        image: "/products/incense.png",
        specifications: { "Origin": "Kyoto, Japan", "Material": "Clay & Bamboo" },
        colors: [{ name: "Speckled White", hex: "#fafaf9" }]
    },
    {
        id: "mist",
        name: "Aura Sleep Mist",
        category: "wellness",
        price: 48,
        rating: 4.7,
        reviewsCount: 52,
        description: "Organic lavender, vetiver and cedarwood pillow spray.",
        features: ["100% natural distillates", "Promotes delta-wave sleep"],
        image: "/products/incense.png",
        specifications: { "Volume": "100ml", "Bottle": "Violet amber glass" },
        colors: [{ name: "Amber Glass", hex: "#7c2d12" }]
    },
    {
        id: "pumice",
        name: "Terra Bath Pumice Block",
        category: "wellness",
        price: 35,
        rating: 4.6,
        reviewsCount: 71,
        description: "Organic porous bath scrub block sculpted from dark pumice.",
        features: ["Sculpted volcanic pumice", "Cotton hanging loop"],
        image: "/products/incense.png",
        specifications: { "Material": "Natural Pumice", "Length": "14cm" },
        colors: [{ name: "Charcoal Grey", hex: "#374151" }]
    }
];
