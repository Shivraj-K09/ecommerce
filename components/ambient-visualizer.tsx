"use client";

import { useRef, useEffect } from "react";
import { drawAmbientFrame } from "@/lib/ambient-visualizer/draw-frame";
import type {
  AmbientMouseState,
  AmbientVisualizerState,
} from "@/lib/ambient-visualizer/types";

interface AmbientVisualizerProps {
  type: string;
  isHovered: boolean;
  theme: string;
}

export function AmbientVisualizer({
  type,
  isHovered,
  theme,
}: AmbientVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<AmbientMouseState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });
  const stateRef = useRef<AmbientVisualizerState>({
    initialized: false,
    ripples: [],
    bubbles: [],
    smokeParticles: [],
    keyGrid: [],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    const dprInit = window.devicePixelRatio;
    canvas.width = canvas.offsetWidth * dprInit;
    canvas.height = canvas.offsetHeight * dprInit;
    ctx.scale(dprInit, dprInit);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      const context = canvas.getContext("2d");
      if (context) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(dpr, dpr);
      }
    };

    window.addEventListener("resize", handleResize);
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", handleMouseMove);
    mouseRef.current.x = canvas.offsetWidth / 2;
    mouseRef.current.y = canvas.offsetHeight / 2;
    mouseRef.current.targetX = canvas.offsetWidth / 2;
    mouseRef.current.targetY = canvas.offsetHeight / 2;
    const isDark = theme === "dark";
    const state = stateRef.current;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    if (!state.initialized && w > 0 && h > 0) {
      state.bubbles = Array.from({ length: 18 }, () => ({
        x: Math.random() * w,
        y: h + Math.random() * 40,
        size: Math.random() * 2.5 + 1,
        speedY: Math.random() * 0.4 + 0.2,
        swing: Math.random() * 1.5 + 0.5,
        phase: Math.random() * Math.PI * 2,
      }));
      const gridRows = 8;
      const gridCols = 8;
      state.keyGrid = [];
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          state.keyGrid.push({
            cx: (w / (gridCols + 1)) * (c + 1),
            cy: (h / (gridRows + 1)) * (r + 1),
            activeIntensity: 0,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
      state.initialized = true;
    }

    let frame = 0;
    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      if (width === 0 || height === 0) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;
      frame++;
      drawAmbientFrame({
        ctx,
        w: width,
        h: height,
        type,
        isHovered,
        isDark,
        frame,
        state,
        mouse,
      });
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      parent?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [type, isHovered, theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-70 transition-opacity duration-500 group-hover:opacity-100"
    />
  );
}
