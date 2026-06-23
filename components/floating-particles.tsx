"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 19) % 100}%`,
  delay: (index % 9) * 0.45,
  size: 3 + (index % 4),
  color: index % 3 === 0 ? "#55f7e7" : index % 3 === 1 ? "#ff4ed8" : "#ffc857",
}));

export function FloatingParticles() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 18px ${particle.color}`,
          }}
          animate={{
            y: [-16, 18, -16],
            x: [-8, 10, -8],
            opacity: [0.16, 0.82, 0.16],
            scale: [0.8, 1.25, 0.8],
          }}
          transition={{
            duration: 5 + (particle.id % 6),
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
