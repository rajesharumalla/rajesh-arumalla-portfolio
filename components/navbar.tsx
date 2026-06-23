"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { navItems, profile } from "@/lib/portfolio-data";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan/10 bg-void/70 backdrop-blur-xl">
      <nav className="section-shell flex h-16 items-center justify-between">
        <a href="#home" className="focus-ring flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.18em]">
          <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_18px_#55f7e7]" />
          {profile.handle}
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring font-mono text-xs uppercase tracking-[0.16em] text-slate-300 transition hover:text-cyan"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="focus-ring grid h-10 w-10 place-items-center border border-cyan/20 bg-white/5 text-cyan md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-cyan/10 bg-void/95 md:hidden"
          >
            <div className="section-shell grid gap-2 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring border border-cyan/10 px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
