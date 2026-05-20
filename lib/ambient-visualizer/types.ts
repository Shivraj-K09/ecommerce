export type AmbientVisualizerState = {
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
};

export type AmbientMouseState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
};

export type DrawAmbientFrameArgs = {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  type: string;
  isHovered: boolean;
  isDark: boolean;
  frame: number;
  state: AmbientVisualizerState;
  mouse: AmbientMouseState;
};
