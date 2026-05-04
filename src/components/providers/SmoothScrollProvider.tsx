"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

type Props = { children: React.ReactNode };

export function SmoothScrollProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Prevent conflict with native smooth scroll
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";

    // Check if we're in the browser
    if (typeof window === "undefined") {
      console.warn("SmoothScrollProvider: Not in browser environment");
      return;
    }

    try {
      console.log("SmoothScrollProvider: Initializing Lenis...");

      const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.5,
        wheelMultiplier: 1,
      });

      lenisRef.current = lenis;

      // Verify Lenis is working
      console.log("SmoothScrollProvider: Lenis initialized", lenis);

      const raf = (time: number) => {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      };

      rafRef.current = requestAnimationFrame(raf);
    } catch (error) {
      console.error("SmoothScrollProvider: Failed to initialize Lenis:", error);
      // Fallback: restore native scroll behavior
      document.documentElement.style.scrollBehavior = "smooth";
    }

    return () => {
      console.log("SmoothScrollProvider: Cleaning up Lenis...");
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      document.documentElement.style.scrollBehavior = "";
      document.body.style.scrollBehavior = "";
    };
  }, []);

  return <>{children}</>;
}
