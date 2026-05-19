"use client";
import React, { useRef, useEffect } from "react";
interface AmbientVisualizerProps {
    type: string;
    isHovered: boolean;
    theme: string;
}
export function AmbientVisualizer({ type, isHovered, theme }: AmbientVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
    const stateRef = useRef<{
        initialized: boolean;
        ripples: {
            r: number;
            alpha: number;
            maxR: number;
            speed: number;
        }[];
        bubbles: {
            x: number;
            y: number;
            size: number;
            speedY: number;
            swing: number;
            phase: number;
        }[];
        smokeParticles: {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            alpha: number;
            life: number;
            maxLife: number;
        }[];
        keyGrid: {
            cx: number;
            cy: number;
            activeIntensity: number;
            phase: number;
        }[];
    }>({
        initialized: false,
        ripples: [],
        bubbles: [],
        smokeParticles: [],
        keyGrid: []
    });
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        let animationId: number;
        const dprInit = window.devicePixelRatio;
        canvas.width = canvas.offsetWidth * dprInit;
        canvas.height = canvas.offsetHeight * dprInit;
        ctx.scale(dprInit, dprInit);
        const handleResize = () => {
            if (!canvas)
                return;
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
                phase: Math.random() * Math.PI * 2
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
                        phase: Math.random() * Math.PI * 2
                    });
                }
            }
            state.initialized = true;
        }
        let frame = 0;
        const draw = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            if (w === 0 || h === 0) {
                animationId = requestAnimationFrame(draw);
                return;
            }
            ctx.clearRect(0, 0, w, h);
            const mouse = mouseRef.current;
            mouse.x += (mouse.targetX - mouse.x) * 0.1;
            mouse.y += (mouse.targetY - mouse.y) * 0.1;
            frame++;
            if (type === "headphones") {
                const centerX = w * 0.45;
                const centerY = h * 0.45;
                if (isHovered && frame % 55 === 0) {
                    state.ripples.push({
                        r: 10,
                        alpha: 0.25,
                        maxR: Math.max(w, h) * 0.6,
                        speed: 1.2
                    });
                }
                else if (!isHovered && frame % 120 === 0) {
                    state.ripples.push({
                        r: 10,
                        alpha: 0.1,
                        maxR: Math.max(w, h) * 0.4,
                        speed: 0.6
                    });
                }
                ctx.lineWidth = 0.75;
                state.ripples.forEach((ripple, idx) => {
                    ripple.r += ripple.speed;
                    ripple.alpha -= 0.0025;
                    if (ripple.alpha <= 0 || ripple.r >= ripple.maxR) {
                        state.ripples.splice(idx, 1);
                        return;
                    }
                    ctx.strokeStyle = isDark
                        ? `rgba(255, 255, 255, ${ripple.alpha})`
                        : `rgba(0, 0, 0, ${ripple.alpha * 0.7})`;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, ripple.r, 0, Math.PI * 2);
                    ctx.stroke();
                });
                ctx.beginPath();
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)";
                for (let x = 16; x < w - 16; x++) {
                    const sine1 = Math.sin(x * 0.015 + frame * 0.02) * (isHovered ? 12 : 5);
                    const sine2 = Math.sin(x * 0.005 - frame * 0.01) * (isHovered ? 8 : 3);
                    const y = h * 0.7 + sine1 + sine2;
                    if (x === 16)
                        ctx.moveTo(x, y);
                    else
                        ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            else if (type === "keyboard") {
                state.keyGrid.forEach((point) => {
                    const dist = Math.hypot(mouse.x - point.cx, mouse.y - point.cy);
                    const targetIntensity = isHovered && dist < 70 ? (1 - dist / 70) * 0.45 : 0.05;
                    point.activeIntensity += (targetIntensity - point.activeIntensity) * 0.1;
                    point.phase += 0.01;
                    const dynamicRadius = 1 + point.activeIntensity * 2;
                    const alpha = point.activeIntensity + Math.sin(point.phase) * 0.02;
                    ctx.fillStyle = isDark
                        ? `rgba(255, 255, 255, ${Math.max(0.02, alpha)})`
                        : `rgba(0, 0, 0, ${Math.max(0.015, alpha * 0.6)})`;
                    ctx.beginPath();
                    ctx.arc(point.cx, point.cy, dynamicRadius, 0, Math.PI * 2);
                    ctx.fill();
                    if (point.activeIntensity > 0.15) {
                        ctx.strokeStyle = isDark
                            ? `rgba(255, 255, 255, ${point.activeIntensity * 0.1})`
                            : `rgba(0, 0, 0, ${point.activeIntensity * 0.08})`;
                        ctx.lineWidth = 0.3;
                        ctx.beginPath();
                        ctx.moveTo(point.cx - 10, point.cy);
                        ctx.lineTo(point.cx + 10, point.cy);
                        ctx.moveTo(point.cx, point.cy - 10);
                        ctx.lineTo(point.cx, point.cy + 10);
                        ctx.stroke();
                    }
                });
            }
            else if (type === "carafe") {
                const waveHeight = isHovered ? 8 : 4;
                const waveY = h * 0.85;
                ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.01)";
                ctx.beginPath();
                ctx.moveTo(0, h);
                for (let x = 0; x <= w; x++) {
                    const y = waveY + Math.sin(x * 0.01 + frame * 0.015) * waveHeight;
                    ctx.lineTo(x, y);
                }
                ctx.lineTo(w, h);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.015)";
                ctx.beginPath();
                ctx.moveTo(0, h);
                for (let x = 0; x <= w; x++) {
                    const y = waveY + 2 + Math.sin(x * 0.015 - frame * 0.025 + Math.PI) * (waveHeight * 0.8);
                    ctx.lineTo(x, y);
                }
                ctx.lineTo(w, h);
                ctx.closePath();
                ctx.fill();
                state.bubbles.forEach((bubble) => {
                    const currentSpeed = isHovered ? bubble.speedY * 1.8 : bubble.speedY;
                    bubble.y -= currentSpeed;
                    bubble.phase += 0.025;
                    const xOffset = Math.sin(bubble.phase) * bubble.swing;
                    const currentX = bubble.x + xOffset;
                    if (bubble.y < h * 0.2) {
                        bubble.y = h + Math.random() * 20;
                        bubble.x = Math.random() * w;
                    }
                    ctx.strokeStyle = isDark
                        ? `rgba(255, 255, 255, ${isHovered ? 0.22 : 0.1})`
                        : `rgba(0, 0, 0, ${isHovered ? 0.15 : 0.07})`;
                    ctx.lineWidth = 0.55;
                    ctx.beginPath();
                    ctx.arc(currentX, bubble.y, bubble.size, 0, Math.PI * 2);
                    ctx.stroke();
                    if (isHovered && bubble.size > 2) {
                        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)";
                        ctx.beginPath();
                        ctx.arc(currentX - bubble.size * 0.3, bubble.y - bubble.size * 0.3, 0.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });
            }
            else if (type === "incense") {
                const maxParticles = isHovered ? 40 : 20;
                if (state.smokeParticles.length < maxParticles && frame % (isHovered ? 12 : 24) === 0) {
                    state.smokeParticles.push({
                        x: w * 0.5 + (Math.random() * 8 - 4),
                        y: h * 0.72,
                        vx: Math.random() * 0.2 - 0.1,
                        vy: -(Math.random() * 0.35 + 0.15),
                        size: Math.random() * 4 + 2,
                        alpha: 0.12,
                        life: 0,
                        maxLife: Math.random() * 200 + 150
                    });
                }
                state.smokeParticles.forEach((p, idx) => {
                    p.life++;
                    if (p.life >= p.maxLife) {
                        state.smokeParticles.splice(idx, 1);
                        return;
                    }
                    const waveDrift = Math.sin(p.life * 0.02 + idx) * 0.08;
                    p.vx += waveDrift;
                    if (isHovered) {
                        const dx = mouse.x - p.x;
                        const dy = mouse.y - p.y;
                        const dist = Math.hypot(dx, dy);
                        if (dist < 80) {
                            p.vx += (dx / dist) * 0.015;
                            p.vy += (dy / dist) * 0.01;
                        }
                    }
                    p.x += p.vx;
                    p.y += p.vy;
                    const sizeRatio = p.life / p.maxLife;
                    const currentSize = p.size * (1 + sizeRatio * 3.5);
                    const currentAlpha = p.alpha * (1 - sizeRatio);
                    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize);
                    if (isDark) {
                        grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
                        grad.addColorStop(0.5, `rgba(255, 255, 255, ${currentAlpha * 0.3})`);
                        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
                    }
                    else {
                        grad.addColorStop(0, `rgba(0, 0, 0, ${currentAlpha * 0.8})`);
                        grad.addColorStop(0.5, `rgba(0, 0, 0, ${currentAlpha * 0.2})`);
                        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
                    }
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
                    ctx.fill();
                });
            }
            animationId = requestAnimationFrame(draw);
        };
        draw();
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
            parent?.removeEventListener("mousemove", handleMouseMove);
        };
    }, [type, isHovered, theme]);
    return (<canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500"/>);
}
