"use client";

import * as m from "motion/react-m";
import type { DeliveryForm } from "@/lib/checkout/types";

const ROUTING_GRID_ROWS = 8;
const ROUTING_GRID_COLS = 8;

type Props = {
  deliveryForm: DeliveryForm;
};

export function CheckoutDeliveryRoutingMap({ deliveryForm }: Props) {
  return (
    <div className="flex flex-col gap-4 text-left lg:col-span-6">
      <span className="text-muted-foreground font-mono text-[9px] font-bold tracking-widest uppercase">
        TRANSIT TELEMETRY: REAL-TIME ROUTING MAP
      </span>

      <div className="border-foreground/10 relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden border bg-[#0E0E0E] dark:bg-[#070707]">
        <div className="pointer-events-none absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20">
          {Array.from({ length: ROUTING_GRID_ROWS }, (_, row) =>
            Array.from({ length: ROUTING_GRID_COLS }, (_, col) => (
              <div
                key={`routing-grid-${row}-${col}`}
                className="border-foreground/6 h-full w-full border"
              />
            )),
          )}
        </div>

        <svg
          className="stroke-foreground/45 absolute inset-0 h-full w-full fill-none stroke-[0.85] opacity-35"
          viewBox="0 0 400 400"
        >
          <circle
            cx="200"
            cy="200"
            r="160"
            strokeDasharray="3, 3"
            className="stroke-foreground/15"
          />
          <circle
            cx="200"
            cy="200"
            r="90"
            strokeDasharray="1, 4"
            className="stroke-foreground/15"
          />
          <line
            x1="200"
            y1="0"
            x2="200"
            y2="400"
            className="stroke-foreground/10"
          />
          <line
            x1="0"
            y1="200"
            x2="400"
            y2="200"
            className="stroke-foreground/10"
          />
          <path d="M 0,100 Q 150,150 200,200 T 400,300" />
          <path
            d="M 50,400 Q 180,240 280,120 T 350,0"
            className="stroke-foreground/20"
          />
          <path d="M 120,0 C 180,180 200,220 400,150" />
          <path
            d="M 0,280 C 180,310 240,180 320,400"
            className="stroke-foreground/15"
          />

          {deliveryForm.address && (
            <m.path
              d="M 200,200 L 280,120"
              fill="none"
              className="stroke-emerald-500 stroke-[1.8]"
              strokeDasharray="4, 4"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 4,
              }}
            />
          )}

          <g transform="translate(200, 200)">
            <circle
              r="5"
              fill="#0A0A0A"
              stroke="var(--foreground)"
              strokeWidth="1.5"
            />
            <circle r="1.5" fill="var(--foreground)" />

            <rect
              x="-42"
              y="10"
              width="84"
              height="13"
              fill="#0A0A0A"
              stroke="var(--foreground)"
              strokeWidth="0.5"
              opacity="0.9"
            />
            <text
              x="0"
              y="18"
              fontFamily="monospace"
              fontSize="6.5"
              fill="var(--foreground)"
              textAnchor="middle"
              letterSpacing="0.8"
              fontWeight="bold"
            >
              AURA WAREHOUSE
            </text>
          </g>

          {deliveryForm.address && (
            <g transform="translate(280, 120)">
              <circle r="12" fill="rgba(16, 185, 129, 0.2)">
                <animate
                  attributeName="r"
                  values="6;14;6"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;0;0.7"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.2" />

              <rect
                x="-35"
                y="10"
                width="70"
                height="13"
                fill="#0E0E0E"
                stroke="rgba(16, 185, 129, 0.3)"
                strokeWidth="0.5"
                opacity="0.9"
              />
              <text
                x="0"
                y="18"
                fontFamily="monospace"
                fontSize="6.5"
                fill="#10B981"
                textAnchor="middle"
                letterSpacing="0.5"
                fontWeight="bold"
              >
                {deliveryForm.city
                  ? deliveryForm.city.toUpperCase().slice(0, 12)
                  : "DESTINATION"}
              </text>
            </g>
          )}
        </svg>

        <div className="border-foreground/10 text-muted-foreground absolute right-4 bottom-4 left-4 flex items-center justify-between border bg-[#0A0A0A]/95 px-4 py-3 font-mono text-[9px] tracking-wider uppercase select-none">
          <div className="flex flex-col gap-0.5">
            <span>COORD: 34.0522° N, 118.2437° W</span>
            <span className="text-foreground">
              ROUTE:{" "}
              {deliveryForm.address ? "LOCKED & CALCULATED" : "AWAITING ADDR"}
            </span>
          </div>
          {deliveryForm.address ? (
            <span className="animate-pulse font-bold text-emerald-500">
              LIVE GPS READY
            </span>
          ) : (
            <span className="text-muted-foreground/40 font-bold">STANDBY</span>
          )}
        </div>
      </div>
    </div>
  );
}
