"use client";

import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Globe2,
  Laptop,
  Monitor,
  RefreshCw,
  Smartphone,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type MetricItem = {
  label: string;
  value: number;
};

type AnalyticsData = {
  monthViews: number;
  totalViews: number;
  countries: MetricItem[];
  devices: MetricItem[];
  isDemo: boolean;
};

const fallbackAnalytics: AnalyticsData = {
  monthViews: 5,
  totalViews: 977,
  countries: [
    { label: "India", value: 42 },
    { label: "United States", value: 8 },
    { label: "Bangladesh", value: 6 },
    { label: "Pakistan", value: 5 },
    { label: "Nigeria", value: 3 },
  ],
  devices: [
    { label: "Windows", value: 63 },
    { label: "Mac", value: 17 },
    { label: "Android", value: 10 },
    { label: "GNU/Linux", value: 5 },
    { label: "iOS", value: 4 },
    { label: "Ubuntu", value: 1 },
  ],
  isDemo: true,
};

const countryCodes: Record<string, string> = {
  India: "IN",
  "United States": "US",
  Bangladesh: "BD",
  Pakistan: "PK",
  Nigeria: "NG",
  Unknown: "--",
};

const deviceIcons: Record<string, typeof Monitor> = {
  Windows: Monitor,
  Mac: Laptop,
  Android: Smartphone,
  iOS: Smartphone,
};

const accentClasses = [
  "bg-cyan",
  "bg-lime",
  "bg-amber",
  "bg-magenta",
  "bg-[#caa7ff]",
  "bg-slate-400",
];

function detectDevice() {
  const userAgent = navigator.userAgent;

  if (/Android/i.test(userAgent)) return "Android";
  if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS";
  if (/Ubuntu/i.test(userAgent)) return "Ubuntu";
  if (/Linux/i.test(userAgent)) return "GNU/Linux";
  if (/Mac/i.test(userAgent)) return "Mac";
  if (/Windows/i.test(userAgent)) return "Windows";

  return "Unknown";
}

function normalizePercentages(items: MetricItem[]) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  if (total <= 0) {
    return [];
  }

  return items.map((item) => ({
    ...item,
    value: Math.max(1, Math.round((item.value / total) * 100)),
  }));
}

async function requestAnalytics(method: "GET" | "POST", device?: string) {
  const response = await fetch("/api/analytics", {
    method,
    headers: {
      "content-type": "application/json",
    },
    body: method === "POST" ? JSON.stringify({ device }) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load analytics");
  }

  return (await response.json()) as AnalyticsData;
}

export function AnalyticsPanel() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<AnalyticsData>(fallbackAnalytics);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const nextData = await requestAnalytics("GET");
      setData(nextData);
    } catch {
      setData(fallbackAnalytics);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const sessionKey = "portfolio-visitor-counted";

    async function trackVisit() {
      try {
        if (sessionStorage.getItem(sessionKey)) {
          await refresh();
          return;
        }

        const nextData = await requestAnalytics("POST", detectDevice());
        sessionStorage.setItem(sessionKey, "true");
        setData(nextData);
      } catch {
        setData(fallbackAnalytics);
      }
    }

    trackVisit();
  }, [refresh]);

  const countries = useMemo(() => normalizePercentages(data.countries), [data.countries]);
  const devices = useMemo(() => normalizePercentages(data.devices), [data.devices]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className="focus-ring fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-cyan/35 bg-cyan/10 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-cyan shadow-glow backdrop-blur-xl transition hover:bg-cyan/15"
        aria-label="Open visitor analytics"
      >
        <Activity size={17} />
        Visitors
      </motion.button>

      {open ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-void/60 backdrop-blur-sm">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close analytics overlay"
            onClick={() => setOpen(false)}
          />

          <motion.aside
            initial={{ x: 460, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 460, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="relative z-10 h-full w-full max-w-[460px] overflow-y-auto border-l border-cyan/30 bg-[#0d1112]/95 shadow-[0_0_80px_rgba(85,247,231,0.16)]"
            aria-label="Live analytics report"
          >
            <header className="flex items-center justify-between border-b border-white/10 bg-cyan/5 p-5">
              <div className="flex min-w-0 items-center gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-cyan/35 bg-cyan/10 text-cyan">
                  <Activity size={20} />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate font-display text-xl font-bold text-white">Live Analytics</h2>
                  <p className="truncate font-mono text-xs text-slate-400">rajesh-arumalla.tech - real-time</p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span className="rounded-full border border-lime/30 bg-lime/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-lime">
                  Live
                </span>
                <button
                  className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-white/10 text-slate-400 transition hover:text-cyan"
                  type="button"
                  aria-label="Refresh analytics"
                  onClick={refresh}
                >
                  <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
                <button
                  className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-white/10 text-slate-400 transition hover:text-magenta"
                  type="button"
                  aria-label="Close analytics"
                  onClick={() => setOpen(false)}
                >
                  <X size={15} />
                </button>
              </div>
            </header>

            <div className="space-y-8 p-6">
              {data.isDemo ? (
                <p className="rounded-lg border border-amber/20 bg-amber/10 px-4 py-3 font-mono text-xs leading-6 text-amber">
                  Demo data is showing. Add Upstash Redis env vars in Vercel to collect real visitors.
                </p>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["This Month", data.monthViews, "page views", "text-lime"],
                  ["All Time", data.totalViews, "total views", "text-cyan"],
                ].map(([label, value, caption, color]) => (
                  <div key={label} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
                    <p className={`mt-5 font-mono text-3xl font-bold ${color}`}>{value}</p>
                    <p className="mt-2 font-mono text-xs text-slate-400">{caption}</p>
                  </div>
                ))}
              </div>

              <ReportSection icon={Globe2} title="Audience - Countries">
                <div className="space-y-4">
                  {countries.slice(0, 6).map((country, index) => (
                    <div
                      key={country.label}
                      className="grid grid-cols-[18px_42px_minmax(0,1fr)_100px_38px] items-center gap-3 font-mono text-xs text-slate-300"
                    >
                      <span className="text-slate-500">{index + 1}</span>
                      <span className="rounded bg-white/10 px-1.5 py-1 text-center text-[10px] text-white">
                        {countryCodes[country.label] ?? country.label.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="truncate">{country.label}</span>
                      <span className="h-1 overflow-hidden rounded-full bg-white/10">
                        <motion.span
                          className={`block h-full rounded-full ${accentClasses[index % accentClasses.length]}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${country.value}%` }}
                          transition={{ duration: 0.55, delay: index * 0.04 }}
                        />
                      </span>
                      <span className="text-right text-slate-400">{country.value}%</span>
                    </div>
                  ))}
                </div>
              </ReportSection>

              <ReportSection icon={BarChart3} title="Devices - OS">
                <div className="grid gap-3 sm:grid-cols-2">
                  {devices.slice(0, 6).map((device, index) => {
                    const Icon = deviceIcons[device.label] ?? Monitor;

                    return (
                      <div key={device.label} className="rounded-lg border border-white/10 bg-white/[0.045] p-3">
                        <div className="flex items-center justify-between gap-3 font-mono text-xs text-slate-300">
                          <span className="flex min-w-0 items-center gap-2">
                            <Icon className="shrink-0 text-cyan" size={16} />
                            <span className="truncate">{device.label}</span>
                          </span>
                          <span className="text-slate-500">{device.value}%</span>
                        </div>
                        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                          <motion.span
                            className={`block h-full rounded-full ${accentClasses[(index + 2) % accentClasses.length]}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${device.value}%` }}
                            transition={{ duration: 0.55 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ReportSection>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </>
  );
}

function ReportSection({
  children,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  icon: typeof Globe2;
  title: string;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <Icon size={16} className="text-slate-400" />
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">{title}</p>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      {children}
    </section>
  );
}
