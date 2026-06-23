"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { damping: 24, stiffness: 240, mass: 0.35 });
  const ringY = useSpring(cursorY, { damping: 24, stiffness: 240, mass: 0.35 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncEnabled = () => setEnabled(finePointer.matches && !reducedMotion.matches);
    syncEnabled();
    finePointer.addEventListener("change", syncEnabled);
    reducedMotion.addEventListener("change", syncEnabled);

    const move = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      dotX.set(event.clientX);
      dotY.set(event.clientY);
    };

    const pointerDown = () => setPressed(true);
    const pointerUp = () => setPressed(false);

    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, [data-cursor='magnetic'], input, textarea")));
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointerup", pointerUp);

    return () => {
      finePointer.removeEventListener("change", syncEnabled);
      reducedMotion.removeEventListener("change", syncEnabled);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointerup", pointerUp);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  useEffect(() => {
    document.documentElement.classList.toggle("cursor-active", enabled);
    return () => document.documentElement.classList.remove("cursor-active");
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-12 w-12 rounded-full border border-cyan/40 mix-blend-screen"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: pressed ? 0.74 : hovering ? 1.72 : 1,
          borderColor: hovering ? "rgba(255, 78, 216, 0.78)" : "rgba(85, 247, 231, 0.42)",
          backgroundColor: hovering ? "rgba(255, 78, 216, 0.08)" : "rgba(85, 247, 231, 0.02)",
        }}
        transition={{ duration: 0.22 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[91] h-2 w-2 rounded-full bg-cyan shadow-[0_0_18px_#55f7e7]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hovering ? 0.45 : pressed ? 1.6 : 1 }}
      />
    </>
  );
}
