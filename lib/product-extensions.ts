import React from "react";
import {
  IconTruck,
  IconShieldCheck,
  IconArrowBackUp,
  IconCoins,
} from "@tabler/icons-react";
export interface ReviewItem {
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
}
export interface ProductExtension {
  discountPercent: number;
  gallery: string[];
  badges: {
    label: string;
    icon: React.ComponentType<{
      className?: string;
    }>;
    description: string;
  }[];
  storyHeadline: string;
  storySub: string;
  storyBody1: string;
  storyBody2: string;
  storyQuote: string;
  specs: {
    label: string;
    value: string;
  }[];
  reviews: {
    top: ReviewItem[];
    moderate: ReviewItem[];
    bad: ReviewItem[];
  };
}
export const PRODUCT_EXTENSIONS: Record<string, ProductExtension> = {
  headphones: {
    discountPercent: 15,
    gallery: [
      "/products/headphones.webp",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop",
    ],
    badges: [
      {
        label: "Complimentary Delivery",
        icon: IconTruck,
        description: "Insured express courier delivery worldwide.",
      },
      {
        label: "2-Year Warranty",
        icon: IconShieldCheck,
        description: "Full cover repair and component protection.",
      },
      {
        label: "30-Day Returns",
        icon: IconArrowBackUp,
        description: "Complimentary return pickup & 100% refund.",
      },
      {
        label: "Pay on Delivery",
        icon: IconCoins,
        description: "Available for selected regional zones.",
      },
    ],
    storyHeadline: "PLANAR MAGNETICS - SURGICAL STEEL SOUNDFIELDS",
    storySub: "THE AURA AETHERIA REFERENCE IN ACOUSTIC PURITY",
    storyBody1:
      "Engineering sound is an act of structural patience. The Aetheria Reference Headphones utilize pure, hand-tensioned planar magnetic ribbons suspended between heavy neodymium configurations. The surgical-grade steel frame houses these acoustic generators inside custom-tuned chambers, eliminating back-wave distortion entirely.",
    storyBody2:
      "We wrap every contact element in full-aniline leather, allowing natural thermoregulation during extended studio monitor operations. Designed in our Copenhagen sound lab to replicate the absolute flat-response profile of professional midfield monitoring configurations.",
    storyQuote:
      "“Replicates the absolute acoustic environment of a Danish concert hall in high-fidelity monitor format.” — Sound Architect Magazine",
    specs: [
      { label: "Transducer Type", value: "Planar Magnetic 90mm" },
      { label: "Frequency Range", value: "4Hz - 54kHz" },
      { label: "Acoustic Pattern", value: "Open-Back Floating Chamber" },
      { label: "Weight Profile", value: "390g Composite Steel" },
    ],
    reviews: {
      top: [
        {
          author: "Evelyn K.",
          rating: 5,
          date: "May 12, 2026",
          title: "Acoustic Nirvana",
          content:
            "The planar magnetic drivers provide a soundstage so wide it genuinely feels like sitting in an acoustic chamber. The surgical steel is premium and substantial.",
        },
        {
          author: "Marcus V.",
          rating: 5,
          date: "April 28, 2026",
          title: "Uncompromising Detail",
          content:
            "Flat-response is exactly what they promised. Ideal for reference mixing. Best aesthetic design on the market.",
        },
        {
          author: "Clara S.",
          rating: 5,
          date: "May 15, 2026",
          title: "Absolute Clarity",
          content:
            "Instruments occupy their own exact placement in the soundstage. No muddy overlaps, just pure architectural frequencies.",
        },
        {
          author: "Nils A.",
          rating: 5,
          date: "May 10, 2026",
          title: "Stunning Danish Finish",
          content:
            "The full-aniline leather cushions feel magnificent and adjust automatically. A triumph of aesthetic design and acoustic integrity.",
        },
      ],
      moderate: [
        {
          author: "David T.",
          rating: 4,
          date: "May 03, 2026",
          title: "Magnificent But Heavy",
          content:
            "Sound quality is unbeatable, but the surgical steel headband gets a bit heavy after a solid 6-hour reference session. Perfect for short listening.",
        },
        {
          author: "Sophia L.",
          rating: 4,
          date: "May 07, 2026",
          title: "Need Clean Amp Power",
          content:
            "They sound incredibly clean but demand a proper headphone amplifier to shine. Connected directly to phone output, volume is low.",
        },
        {
          author: "Victor M.",
          rating: 4,
          date: "April 20, 2026",
          title: "Exceptional Design",
          content:
            "The industrial structure is gorgeous. It sits perfectly on my desk like a sculpture when not in use. Scent profile of the leather is prominent.",
        },
      ],
      bad: [
        {
          author: "Julian R.",
          rating: 3,
          date: "March 15, 2026",
          title: "Not for Casual Listening",
          content:
            "Extremely flat sound. If you are expecting boosted consumer bass, look elsewhere. These are strictly flat studio monitors.",
        },
        {
          author: "Oliver D.",
          rating: 2,
          date: "March 10, 2026",
          title: "No Noise Isolation",
          content:
            "Open-back design means there is zero isolation. Everyone around me in the studio can hear what I am listing to. Strictly for quiet rooms.",
        },
        {
          author: "Emma P.",
          rating: 3,
          date: "Feb 28, 2026",
          title: "Clamping Pressure",
          content:
            "The steel band applies quite a bit of pressure against the jawline. Extremely pure reproduction but comfort requires breaks.",
        },
      ],
    },
  },
  keyboard: {
    discountPercent: 20,
    gallery: [
      "/products/keyboard.webp",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop",
    ],
    badges: [
      {
        label: "Express Shipping",
        icon: IconTruck,
        description: "Dispatched within 24 hours of purchase.",
      },
      {
        label: "1-Year Warranty",
        icon: IconShieldCheck,
        description: "Covers key switches and controller PCB.",
      },
      {
        label: "14-Day Returns",
        icon: IconArrowBackUp,
        description: "Complimentary return shipping.",
      },
      {
        label: "Pay on Delivery",
        icon: IconCoins,
        description: "Secure escrow pay upon arrival.",
      },
    ],
    storyHeadline: "ANODIZED CORES - LUBRICATED LINEAR FLUIDITY",
    storySub: "A BALANCED TACTILE SYMPHONY FOR DISCERNING TYPISTS",
    storyBody1:
      "Every strike must feel uniform. The Onyx Mechanical Keyboard is milled from a solid billet of 6063 aerospace aluminum, sandblasted with high-grade glass beads, and finished with a hard-anodized oxide shell. The gasket-mounted plate suspends switches on high-density foam tabs to compress vertical resonance.",
    storyBody2:
      "We hand-lubricate every switch core and gold-plated spring with Krytox stabilizers, creating an acoustic profile reminiscent of rain on slate. The layout is optimized to clean up desk surfaces and align hands on a perfect baseline.",
    storyQuote:
      "“The benchmark for high-fidelity mechanical feedback. It feels less like an input device and more like a musical instrument.” — Workspace Guild",
    specs: [
      { label: "Mounting Style", value: "Double Gasket Suspended" },
      { label: "Switch Typology", value: "Stealth Linear 45g" },
      { label: "Frame Material", value: "CNC Milled Aluminum 6063" },
      { label: "Connectivity", value: "Braided Detachable USB-C" },
    ],
    reviews: {
      top: [
        {
          author: "Sarah L.",
          rating: 5,
          date: "May 08, 2026",
          title: "Acoustic Masterpiece",
          content:
            "The sound of these switches is absolutely incredible. Sounds like soft wood droplets. Typing is incredibly therapeutic.",
        },
        {
          author: "Elias M.",
          rating: 5,
          date: "May 14, 2026",
          title: "Incredible Tactile Feel",
          content:
            "The linear keys glide effortlessly. The Krytox stabilizer is expertly done, absolutely zero rattle on the spacebar.",
        },
        {
          author: "Fiona C.",
          rating: 5,
          date: "April 30, 2026",
          title: "Billet Perfection",
          content:
            "The hand-anodized finish is completely immaculate. Solid weight, beautifully minimal on my dark oak table.",
        },
      ],
      moderate: [
        {
          author: "Liam H.",
          rating: 4,
          date: "April 19, 2026",
          title: "Stunning, Heavy Board",
          content:
            "The weight is substantial, so it stays firmly on the desk. Software configuration took a minute, but overall a spectacular piece of desk hardware.",
        },
        {
          author: "Aria J.",
          rating: 4,
          date: "April 25, 2026",
          title: "Premium Wired Utility",
          content:
            "Purely wired layout, which guarantees zero latency. Cable sleeve is beautifully braided and flush.",
        },
      ],
      bad: [
        {
          author: "Aaron P.",
          rating: 2,
          date: "February 22, 2026",
          title: "No Bluetooth Option",
          content:
            "For $420 I expected multi-device Bluetooth. It is purely wired. Beautiful, but missing wireless features.",
        },
        {
          author: "Devon S.",
          rating: 3,
          date: "March 05, 2026",
          title: "Very Heavy to Travel With",
          content:
            "Industrial design is gorgeous, but this solid aluminum chassis is way too heavy if you need to travel. Purely for permanent desks.",
        },
      ],
    },
  },
  carafe: {
    discountPercent: 10,
    gallery: [
      "/products/carafe.webp",
      "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=600&auto=format&fit=crop",
    ],
    badges: [
      {
        label: "Fragile Delivery",
        icon: IconTruck,
        description: "Double-reinforced wooden box transport.",
      },
      {
        label: "Glass Protection",
        icon: IconShieldCheck,
        description: "Lifetime replacement for thermal breakage.",
      },
      {
        label: "30-Day Returns",
        icon: IconArrowBackUp,
        description: "100% complimentary returns.",
      },
      {
        label: "Secure Escrow",
        icon: IconCoins,
        description: "Cash and digital pay upon delivery.",
      },
    ],
    storyHeadline: "MOUTH-BLOWN MONOLITHS - LIQUID GEOMETRY",
    storySub: "REDEFINING THE VISUAL ART OF DECANTATION AND FLUID MOTION",
    storyBody1:
      "Aeration is a visual event. The Helix Water Carafe is individually mouth-blown by master glass artisans in Denmark from lead-free crystalline silicate. The spiral fluid channel is engineered to funnel water along a high-velocity curve, encouraging ambient oxygenation as liquid exits the spout.",
    storyBody2:
      "Finished with a laser-etched brushed steel collar that matches modern kitchen aesthetics, this carafe acts as a sculptural centerpoint on any architectural table setting.",
    storyQuote:
      "“An absolute table monolith. Elevates pure crystal-water decantation to a high performance kinetic showcase.” — Design Digest",
    specs: [
      { label: "Glass Composition", value: "Crystalline Lead-Free" },
      { label: "Capacity Volume", value: "1.2 Liters" },
      { label: "Collar Component", value: "Brushed Surgical Steel" },
      { label: "Thermal Threshold", value: "0°C to 110°C Safe" },
    ],
    reviews: {
      top: [
        {
          author: "Sophia M.",
          rating: 5,
          date: "May 10, 2026",
          title: "Table Sculpture",
          content:
            "Absolutely gorgeous. The glass is thin but feels incredibly strong. The steel neck is perfectly flush.",
        },
        {
          author: "Julian K.",
          rating: 5,
          date: "May 12, 2026",
          title: "Hypnotic Flow Rate",
          content:
            "Watching the water funnel along the crystalline spiral channel is genuinely hypnotic. An extraordinary table highlight.",
        },
        {
          author: "Isabella B.",
          rating: 5,
          date: "April 29, 2026",
          title: "Masterful Mouthblown Craft",
          content:
            "The optical clarity is stunning. There is an organic thickness variation that reveals handblown heritage.",
        },
      ],
      moderate: [
        {
          author: "Lucas G.",
          rating: 4,
          date: "May 01, 2026",
          title: "Pours Well, Hard to Clean",
          content:
            "Aeration flow is flawless. Cleaning the bottom requires a specialized long glass brush though.",
        },
        {
          author: "Matthias S.",
          rating: 4,
          date: "April 18, 2026",
          title: "Stunning Aesthetic",
          content:
            "The aerating funnel channel acts as an immediate ice-breaker when guests arrive. Sits elegantly alongside matte black studio monitors.",
        },
      ],
      bad: [
        {
          author: "Henrik B.",
          rating: 3,
          date: "March 30, 2026",
          title: "Extremely Fragile Feel",
          content:
            "Looks like modern art, but I am terrified of cracking it every time I put it in the copper sink. Handle with extreme caution.",
        },
        {
          author: "Laura N.",
          rating: 3,
          date: "March 12, 2026",
          title: "Condensation Build-Up",
          content:
            "Decanting cold water creates substantial condensation on the outer crystalline shell, hiding the helical channel view. Better for ambient temperature liquids.",
        },
      ],
    },
  },
  incense: {
    discountPercent: 25,
    gallery: [
      "/products/incense.webp",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop",
    ],
    badges: [
      {
        label: "Insured Courier",
        icon: IconTruck,
        description: "Insured transport with real-time temperature tracking.",
      },
      {
        label: "Core Protection",
        icon: IconShieldCheck,
        description: "3-year warranty on electronic thermal modules.",
      },
      {
        label: "30-Day Guarantee",
        icon: IconArrowBackUp,
        description: "Completely free return collection.",
      },
      {
        label: "Pay on Delivery",
        icon: IconCoins,
        description: "Flexible payment options at doorstep.",
      },
    ],
    storyHeadline: "VOLCANIC DIFFUSION - THERMO-ELEMENT AROMATICS",
    storySub: "PURE ATMOSPHERIC PRESENCE INSPIRED BY INACTIVE BASALT CORES",
    storyBody1:
      "Scent should rise, not burn. The Basalt Incense Burner utilizes volcanic stone extracted from inactive basaltic core fields. The natural micro-pores of the stone act as molecular dispersion channels when subjected to our low-heat internal element, vaporizing clean plant resins without standard combustion smoke.",
    storyBody2:
      "We carved the monolithic shell inside a local stone refinery to ensure raw architectural edges, creating a piece that anchors spatial mindfulness.",
    storyQuote:
      "“Diffuses pure organic elements flawlessly. The volcanic stone block commands a powerful presence on any minimal surface.” — Minimalist Living",
    specs: [
      { label: "Diffusion Core", value: "Micro-Porous Basaltic Monolith" },
      { label: "Heating Mechanism", value: "Ultralow Thermal Vaporization" },
      { label: "Chamber Shell", value: "Solid Hand-Carved Volcanic Rock" },
      { label: "Charging Module", value: "Detachable Magnetic USB-C" },
    ],
    reviews: {
      top: [
        {
          author: "Liam F.",
          rating: 5,
          date: "May 14, 2026",
          title: "Scent Artistry",
          content:
            "A absolute masterpiece of minimalist spatial presence. The slow diffusion creates a completely therapeutic scent profile without any combustion smoke.",
        },
        {
          author: "Freja H.",
          rating: 5,
          date: "May 16, 2026",
          title: "Atmospheric Bliss",
          content:
            "Absolutely lovely. Vaporizing clean organic copal resin on this warm basaltic stone is an extraordinary experience. Zero soot or burning smell.",
        },
        {
          author: "Oliver G.",
          rating: 5,
          date: "May 08, 2026",
          title: "Stunning Monolith",
          content:
            "The raw volcanic texture is outstanding. It looks incredibly heavy, grounding, and matches perfectly in my workspace.",
        },
      ],
      moderate: [
        {
          author: "Elena R.",
          rating: 4,
          date: "May 02, 2026",
          title: "Stunning Stone, Slow Charge",
          content:
            "The hand-carved stone block is exceptionally heavy and anchors my living room. Magnetic charging is a bit slow but functions fine.",
        },
        {
          author: "Tobias K.",
          rating: 4,
          date: "April 24, 2026",
          title: "Subtle Warm Glow",
          content:
            "Diffusion is clean and creates a quiet, lingering ambient scent. Charging cable could be slightly longer.",
        },
      ],
      bad: [
        {
          author: "Gavin D.",
          rating: 3,
          date: "April 18, 2026",
          title: "Resin Reloading Necessary",
          content:
            "Very unique and elegant block, but you must reload pure plant resins frequently compared to standard high-smoke stick options.",
        },
        {
          author: "Karla T.",
          rating: 3,
          date: "April 02, 2026",
          title: "Extremely Heavy Stone",
          content:
            "Be extremely careful unpacking this block. It is made of solid basaltic volcanic stone and weighs a ton. Not easily portable.",
        },
      ],
    },
  },
};

export function getProductExtension(
  productId: string,
  productCategory: string,
): ProductExtension {
  if (PRODUCT_EXTENSIONS[productId]) {
    return PRODUCT_EXTENSIONS[productId];
  }

  const isAudio = productCategory === "electronics";
  const isLiving = productCategory === "living";
  const discount = 15;
  const gallery = [
    isAudio
      ? "/products/headphones.webp"
      : isLiving
        ? "/products/carafe.webp"
        : "/products/pen.webp",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop",
  ];
  const storyHeadline = "ARCHITECTURAL PRECISION - MATERIAL HONESTY";
  const storySub =
    "A HIGHER HARMONY BETWEEN EVERYDAY UTILITY AND STRUCTURAL BEAUTY";
  const storyBody1 =
    "Material honesty is our primary design tenet. We craft each item utilizing custom composites and refined metals, establishing an organic spatial connection that grounds your daily workflows and elevates the sensory feedback of regular operation.";
  const storyBody2 =
    "Through deliberate reduction and premium hand-finishing, this item offers unparalleled long-term durability while establishing an elegant tactile touchpoint on your desk or tabletop.";
  const storyQuote =
    "“Minimal styling executed to absolute perfection. Unmatched material solidity.” — Workspace Archiving";
  return {
    discountPercent: discount,
    gallery,
    badges: [
      {
        label: "Complimentary Shipping",
        icon: IconTruck,
        description: "Worldwide express courier delivery.",
      },
      {
        label: "1-Year Warranty",
        icon: IconShieldCheck,
        description: "Guaranteed structural protection.",
      },
      {
        label: "14-Day Returns",
        icon: IconArrowBackUp,
        description: "Complimentary return shipping.",
      },
      {
        label: "COD Available",
        icon: IconCoins,
        description: "Pay upon physical delivery.",
      },
    ],
    storyHeadline,
    storySub,
    storyBody1,
    storyBody2,
    storyQuote,
    specs: [
      { label: "Material Composition", value: "Premium Composite & Alloy" },
      { label: "Origin of Craft", value: "Handcrafted Studio" },
      { label: "Finish Quality", value: "Satin Anti-Oxidant Protective Coat" },
    ],
    reviews: {
      top: [
        {
          author: "Henry J.",
          rating: 5,
          date: "May 11, 2026",
          title: "Sublime Aesthetic",
          content:
            "The geometric styling is absolute perfection. It performs flawlessly and looks stunning in my workspace.",
        },
        {
          author: "Isabel L.",
          rating: 5,
          date: "May 15, 2026",
          title: "Unmatched Craftsmanship",
          content:
            "Stunning piece of design work. Excellent attention to structural finishes and minimalist balance.",
        },
      ],
      moderate: [
        {
          author: "Emma S.",
          rating: 4,
          date: "May 06, 2026",
          title: "Great, Lightweight",
          content:
            "Feels premium and delivers exactly what is advertised. Very happy with the minimalist design.",
        },
        {
          author: "Daniel V.",
          rating: 4,
          date: "April 26, 2026",
          title: "Highly Functional Concept",
          content:
            "Very satisfied with the material weight and tactile response. Takes up minimal desk real estate.",
        },
      ],
      bad: [
        {
          author: "Thomas K.",
          rating: 3,
          date: "April 12, 2026",
          title: "Decent but Pricey",
          content:
            "Design is very neat, but the premium markup is high. Ideal for absolute minimal collectors.",
        },
        {
          author: "Rachel F.",
          rating: 3,
          date: "March 18, 2026",
          title: "A bit smaller than expected",
          content:
            "Beautifully crafted piece, but dimensions are slightly smaller than the visuals suggested. Check product specifications first.",
        },
      ],
    },
  };
}
