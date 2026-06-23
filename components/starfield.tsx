"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  speed: number;
  hue: number;
};

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: Star[] = [];
    let frame = 0;
    let raf = 0;

    const makeStar = (): Star => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.8 + 0.2,
      r: Math.random() * 1.7 + 0.35,
      speed: Math.random() * 0.22 + 0.04,
      hue: Math.random() > 0.68 ? 316 : Math.random() > 0.34 ? 176 : 44,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 720 ? 95 : 170;
      stars = Array.from({ length: count }, makeStar);
    };

    const drawShootingStar = () => {
      const t = (frame % 420) / 420;
      if (t > 0.17) return;
      const x = width * (0.16 + t * 2.2);
      const y = height * (0.08 + t * 1.35);
      const tailX = x - 170;
      const tailY = y - 70;
      const gradient = ctx.createLinearGradient(tailX, tailY, x, y);
      gradient.addColorStop(0, "rgba(85,247,231,0)");
      gradient.addColorStop(1, "rgba(255,255,255,0.8)");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const tick = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(3,5,7,0.24)";
      ctx.fillRect(0, 0, width, height);

      for (const star of stars) {
        star.y += reduced ? 0 : star.speed * star.z;
        star.x += reduced ? 0 : Math.sin((frame + star.y) * 0.002) * 0.05;
        if (star.y > height + 10) {
          star.y = -10;
          star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.fillStyle = `hsla(${star.hue}, 100%, 68%, ${0.22 + star.z * 0.52})`;
        ctx.shadowColor = `hsla(${star.hue}, 100%, 62%, 0.88)`;
        ctx.shadowBlur = 8 * star.z;
        ctx.arc(star.x, star.y, star.r * star.z, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      drawShootingStar();
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="fixed inset-0 -z-20 h-full w-full" />;
}
