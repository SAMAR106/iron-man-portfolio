"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FRAME_COUNT_1 = 169;
const FRAME_COUNT_2 = 169;
const TOTAL_FRAMES = FRAME_COUNT_1 + FRAME_COUNT_2;

// Image aspect ratio (landscape)
const IMG_RATIO = 1916 / 1080;

const getFramePath = (index: number) => {
  if (index < FRAME_COUNT_1) {
    return `/frames/frame_${String(index + 1).padStart(4, "0")}.jpg`;
  } else {
    return `/frames2/frame_${String(index - FRAME_COUNT_1 + 1).padStart(4, "0")}.jpg`;
  }
};

export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef(-1);
  const tickingRef = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Preload all frame images
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = img.onerror = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(loadedCount / TOTAL_FRAMES);
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      imgs.push(img);
    }
    framesRef.current = imgs;
    return () => { cancelled = true; };
  }, []);

  // Draw frame with "cover" behavior — fills canvas completely on all devices
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    // "Cover" — scale image to fill canvas completely, crop overflow
    const scale = Math.max(cw / imgW, ch / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = (cw - drawW) / 2;
    const drawY = (ch - drawH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Resize canvas and apply CSS for proper mobile display
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const vv = window.visualViewport;
    const w = vv ? vv.width : window.innerWidth;
    const h = vv ? vv.height : window.innerHeight;
    const isMobile = w <= 768;

    if (isMobile) {
      // Mobile: render canvas at image aspect ratio, fit to viewport WIDTH
      // This shows the FULL image width (less zoom), centered vertically
      const renderW = w * dpr;
      const renderH = (w / IMG_RATIO) * dpr;

      canvas.width = Math.round(renderW);
      canvas.height = Math.round(renderH);
      canvas.style.width = w + "px";
      canvas.style.height = (w / IMG_RATIO) + "px";
      canvas.style.position = "absolute";
      canvas.style.top = "50%";
      canvas.style.left = "0";
      canvas.style.transform = "translateY(-50%)";
      canvas.style.transformOrigin = "center center";
    } else {
      // Desktop: fill the entire viewport (unchanged behavior)
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.style.position = "";
      canvas.style.top = "";
      canvas.style.left = "";
      canvas.style.transform = "";
      canvas.style.transformOrigin = "";
    }

    // Apply DPR scaling
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Redraw current frame
    const frameToDraw = lastFrameRef.current >= 0 ? lastFrameRef.current : 0;
    drawFrame(frameToDraw);
  }, [drawFrame]);

  // Set up resize listeners
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", resizeCanvas);
      vv.addEventListener("scroll", resizeCanvas);
    }
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (vv) {
        vv.removeEventListener("resize", resizeCanvas);
        vv.removeEventListener("scroll", resizeCanvas);
      }
    };
  }, [resizeCanvas]);

  // Draw first frame when loaded
  useEffect(() => {
    if (!loaded) return;
    drawFrame(0);
    lastFrameRef.current = 0;
  }, [loaded, drawFrame]);

  // Scroll-driven frame animation
  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        tickingRef.current = false;
        if (!loaded) return;

        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / scrollable));

        const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));
        if (frameIndex !== lastFrameRef.current) {
          lastFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loaded, drawFrame]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none bg-[#06080d] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="opacity-75 mix-blend-screen"
        style={{
          willChange: "contents",
          transform: "translateZ(0)",
          filter: "brightness(2.0) contrast(1.3) drop-shadow(0 0 15px rgba(34,211,238,0.3))"
        }}
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(6, 8, 13, 0.7) 100%)",
        }}
      />

      {/* Loading screen */}
      {!loaded && (
        <div className="pointer-events-auto absolute inset-0 z-50 flex items-center justify-center bg-[#030712]">
          {/* Jarvis HUD elements */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.4)_0%,transparent_60%)]" />

          <div className="relative flex items-center justify-center w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
            {/* Outer dashed ring */}
            <svg className="absolute w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="0.5" strokeDasharray="4 2 1 2" />
            </svg>

            {/* Middle segmented ring */}
            <svg className="absolute w-[85%] h-[85%] animate-[spin_6s_linear_infinite_reverse]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(34,211,238,0.5)" strokeWidth="1.5" strokeDasharray="20 5 10 5" />
            </svg>

            {/* Inner solid ring with glow */}
            <div className="absolute w-[70%] h-[70%] rounded-full border border-accent/80 shadow-[0_0_20px_rgba(34,211,238,0.6)_inset,0_0_20px_rgba(34,211,238,0.6)]" />

            {/* Center Core */}
            <div className="absolute w-[50%] h-[50%] rounded-full bg-accent/20 backdrop-blur-md animate-pulse-glow flex flex-col items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.4)] border border-white/20">
              <span className="font-mono text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(34,211,238,1)]">
                {Math.round(loadProgress * 100)}<span className="text-xl md:text-2xl text-accent">%</span>
              </span>
              <span className="font-mono text-[9px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-accent mt-2 glow-text">
                J.A.R.V.I.S.
              </span>
            </div>
          </div>

          {/* Bottom Loading Progress Info */}
          <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 w-72 md:w-96">
            <div className="flex justify-between w-full font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent/90 glow-text">
              <span>System Initialization</span>
              <span>{Math.round(loadProgress * 100)}%</span>
            </div>

            {/* Loading Bar */}
            <div className="h-[2px] w-full bg-white/10 relative overflow-hidden rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)] transition-all duration-300"
                style={{ width: `${loadProgress * 100}%` }}
              />
            </div>

            {/* Segments */}
            <div className="w-full grid grid-cols-10 gap-1 mt-1">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`h-1.5 w-full rounded-sm transition-colors duration-200 ${i < (loadProgress * 10) ? 'bg-accent shadow-[0_0_5px_rgba(34,211,238,0.8)]' : 'bg-white/5'}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
