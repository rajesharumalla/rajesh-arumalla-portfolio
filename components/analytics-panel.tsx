"use client";

import { motion } from "framer-motion";
import { Activity, Globe2, RefreshCw, X } from "lucide-react";

const countries = [
  { flag: "IN", name: "India", value: 42, color: "bg-cyan" },
  { flag: "US", name: "United States", value: 18, color: "bg-lime" },
  { flag: "BD", name: "Bangladesh", value: 9, color: "bg-amber" },
  { flag: "PK", name: "Pakistan", value: 7, color: "bg-magenta" },
  { flag: "NG", name: "Nigeria", value: 5, color: "bg-cyan" },
];

const devices = [
  { label: "Windows", value: 63, accent: "bg-[#caa7ff]", icon: "⊞" },
  { label: "Mac", value: 17, accent: "bg-amber", icon: "●" },
  { label: "Android", value: 10, accent: "bg-slate-400", icon: "◇" },
  { label: "GNU/Linux", value: 5, accent: "bg-cyan", icon: "◬" },
  { label: "iOS", value: 4, accent: "bg-[#caa7ff]", icon: "▣" },
  { label: "Ubuntu", value: 1, accent: "bg-magenta", icon: "◆" },
];

export function AnalyticsPanel() {
  return (
    <section id="analytics" className="section-shell py-24">
      <div className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">Live Analytics Mockup</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">Yes, this can be added.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            This is a live-looking analytics module for the portfolio UI. It can stay as a beautiful simulated panel,
            or later connect to Vercel Analytics, Google Analytics, Plausible, or a tiny custom API.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {["Realtime", "Countries", "Devices", "OS", "Visitor Flow"].map((item) => (
              <span key={item} className="rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-cyan">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          className="glass overflow-hidden rounded-lg border-cyan/25 bg-[#101415]/90"
          data-cursor="magnetic"
        >
          <div className="flex items-center justify-between border-b border-white/10 bg-cyan/5 p-5">
            <div className="flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyan/35 bg-cyan/10 text-cyan">
                <Activity size={20} />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-white">Portfolio Analytics</h3>
                <p className="font-mono text-xs text-slate-400">rajesh-arumalla.tech - real-time</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-lime/30 bg-lime/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-lime">
                ● Live
              </span>
              <button className="focus-ring grid h-8 w-8 place-items-center rounded-md border border-white/10 text-slate-400 transition hover:text-cyan" type="button" aria-label="Refresh analytics">
                <RefreshCw size={14} />
              </button>
              <button className="focus-ring grid h-8 w-8 place-items-center rounded-md border border-white/10 text-slate-400 transition hover:text-magenta" type="button" aria-label="Close analytics">
                <X size={15} />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["This Month", "206", "page views", "text-lime"],
                ["All Time", "899", "total views", "text-cyan"],
              ].map(([label, value, caption, color]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
                  <p className={`mt-5 font-mono text-3xl font-bold ${color}`}>{value}</p>
                  <p className="mt-2 font-mono text-xs text-slate-400">{caption}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="mb-4 flex items-center gap-3">
                <Globe2 size={16} className="text-slate-400" />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Audience - Countries</p>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <div className="space-y-4">
                {countries.map((country, index) => (
                  <div key={country.name} className="grid grid-cols-[18px_42px_1fr_100px_36px] items-center gap-3 font-mono text-xs text-slate-300">
                    <span className="text-slate-500">{index + 1}</span>
                    <span className="rounded bg-white/10 px-1.5 py-1 text-center text-[10px] text-white">{country.flag}</span>
                    <span className="truncate">{country.name}</span>
                    <span className="h-1 overflow-hidden rounded-full bg-white/10">
                      <motion.span
                        className={`block h-full rounded-full ${country.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${country.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.08 }}
                      />
                    </span>
                    <span className="text-right text-slate-400">{country.value}%</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 font-mono text-xs text-cyan">+ 26 more countries</p>
            </div>

            <div className="mt-9">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-slate-400">▣</span>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Devices - OS</p>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {devices.map((device) => (
                  <div key={device.label} className="rounded-lg border border-white/10 bg-white/[0.045] p-3">
                    <div className="flex items-center justify-between gap-3 font-mono text-xs text-slate-300">
                      <span className="flex items-center gap-2">
                        <span className="text-base text-white">{device.icon}</span>
                        {device.label}
                      </span>
                      <span className="text-slate-500">{device.value}%</span>
                    </div>
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                      <motion.span
                        className={`block h-full rounded-full ${device.accent}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${device.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
