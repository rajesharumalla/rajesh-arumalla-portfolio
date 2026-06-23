"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, BrainCircuit, Code2, Database, Download, MapPin, Radio, Send, Workflow } from "lucide-react";
import { AnalyticsPanel } from "@/components/analytics-panel";
import { CustomCursor } from "@/components/custom-cursor";
import { FloatingParticles } from "@/components/floating-particles";
import { Navbar } from "@/components/navbar";
import { SectionHeading } from "@/components/section-heading";
import { Starfield } from "@/components/starfield";
import {
  certifications,
  contactLinks,
  heroSkills,
  profile,
  projects,
  skillGroups,
  timeline,
} from "@/lib/portfolio-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const reactiveTabs = [
  {
    id: "automation",
    label: "Automation",
    icon: Workflow,
    title: "Workflow systems that run without babysitting.",
    body: "I connect APIs, normalize messy payloads, score useful signals, deduplicate state, and deliver alerts through webhooks.",
    metrics: ["4h schedules", "REST APIs", "Discord alerts"],
  },
  {
    id: "ai",
    label: "AI / ML",
    icon: BrainCircuit,
    title: "Model-minded products with practical output.",
    body: "My focus is applying Python, data preprocessing, ML fundamentals, and LLM APIs to workflows that solve concrete problems.",
    metrics: ["Python", "Scikit-learn", "GPT-3 APIs"],
  },
  {
    id: "data",
    label: "Data",
    icon: Database,
    title: "Clean analysis from raw signals.",
    body: "I use Pandas, NumPy, SQL, Excel, Power BI, and IBM Cognos to inspect data, create reports, and make decisions easier to see.",
    metrics: ["SQL", "Power BI", "Cognos"],
  },
  {
    id: "systems",
    label: "Systems",
    icon: Code2,
    title: "Low-level discipline, high-level product sense.",
    body: "Firmware and C projects taught me state machines, modular drivers, persistence, and debugging habits that carry into every app.",
    metrics: ["C firmware", "I2C", "State machines"],
  },
];

export default function Home() {
  return (
    <main id="home" className="relative min-h-screen overflow-hidden">
      <Starfield />
      <FloatingParticles />
      <CustomCursor />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key="portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <Projects />
          <ReactiveTabs />
          <AnalyticsPanel />
          <Persona />
          <Timeline />
          <Skills />
          <Credentials />
          <Contact />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

function Hero() {
  return (
    <section className="section-shell flex min-h-screen items-center pb-20 pt-28">
      <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.08 }}>
          <motion.div
            variants={fadeUp}
            className="mb-5 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan"
          >
            <span className="h-px w-10 bg-cyan/50" />
            {profile.location} - AI/ML - Automation
          </motion.div>

          <motion.p variants={fadeUp} className="mb-2 text-lg text-slate-300">
            Hello! I&apos;m
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl font-bold leading-[0.95] text-white sm:text-7xl lg:text-8xl"
          >
            Rajesh <span className="text-stroke block">Arumalla</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {profile.summary} I build pipelines that collect, filter, score, notify, and keep getting sharper.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a
              className="focus-ring group inline-flex items-center gap-2 border border-cyan bg-cyan px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-void shadow-glow transition hover:bg-transparent hover:text-cyan"
              href="#contact"
            >
              Reach Out <Send size={16} />
            </a>
            <a
              className="focus-ring inline-flex items-center gap-2 border border-white/15 bg-white/5 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-magenta hover:text-magenta"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              Get Source <ArrowUpRight size={16} />
            </a>
            <a
              className="focus-ring inline-flex items-center gap-2 border border-white/15 bg-white/5 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-amber hover:text-amber"
              href={`mailto:${profile.email}`}
            >
              Resume & CV <Download size={16} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="glass scanline relative min-h-[430px] overflow-hidden rounded-lg p-5"
        >
          <div className="absolute inset-8 rounded-full border border-cyan/15" />
          <div className="absolute inset-16 rounded-full border border-magenta/15" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan/40"
          />
          <div className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan/25 bg-void/70 text-center shadow-glow">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-amber">Developer</p>
              <p className="mt-2 font-display text-2xl font-bold text-white">AI x API</p>
            </div>
          </div>
          {heroSkills.map((skill, index) => (
            <motion.span
              key={skill}
              className="absolute rounded-full border border-cyan/20 bg-void/75 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.13em] text-cyan shadow-glow"
              style={{
                left: `${12 + ((index * 31) % 68)}%`,
                top: `${10 + ((index * 23) % 72)}%`,
              }}
              animate={{ y: [0, index % 2 ? 12 : -12, 0], opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 4 + (index % 4), repeat: Infinity, ease: "easeInOut" }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-shell py-24">
      <SectionHeading eyebrow="Featured Work" title="Projects" />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: index % 2 ? -2 : 2 }}
              className="glass focus-ring group min-h-[300px] rounded-lg p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center border border-cyan/25 bg-cyan/10 text-cyan">
                  <Icon size={22} />
                </span>
                <ArrowUpRight className="text-slate-500 transition group-hover:text-magenta" size={20} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-white">{project.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-cyan/15 bg-cyan/5 px-2.5 py-1 font-mono text-[11px] text-cyan">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}

function ReactiveTabs() {
  const [activeTab, setActiveTab] = useState(reactiveTabs[0]);
  const ActiveIcon = activeTab.icon;

  return (
    <section className="section-shell py-24">
      <SectionHeading eyebrow="Reactive Tabs" title="Choose The Signal" />
      <div className="glass overflow-hidden rounded-lg p-4 sm:p-6" data-cursor="magnetic">
        <div className="relative grid gap-3 sm:grid-cols-4">
          {reactiveTabs.map((tab) => {
            const Icon = tab.icon;
            const selected = tab.id === activeTab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`focus-ring relative min-h-16 overflow-hidden border px-4 py-3 text-left transition ${
                  selected
                    ? "border-cyan/50 text-white"
                    : "border-white/10 bg-white/[0.025] text-slate-400 hover:border-magenta/35 hover:text-magenta"
                }`}
              >
                {selected ? (
                  <motion.span
                    layoutId="tab-active-bg"
                    className="absolute inset-0 bg-cyan/10"
                    transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
                  />
                ) : null}
                <span className="relative z-10 flex items-center gap-3">
                  <Icon size={18} className={selected ? "text-cyan" : ""} />
                  <span className="font-mono text-xs uppercase tracking-[0.16em]">{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(10px)" }}
            transition={{ duration: 0.28 }}
            className="mt-6 grid gap-6 border border-cyan/10 bg-void/45 p-5 sm:grid-cols-[0.7fr_1.3fr] sm:p-6"
          >
            <div className="grid min-h-52 place-items-center border border-white/10 bg-white/[0.025]">
              <motion.div
                animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative grid h-40 w-40 place-items-center rounded-full border border-cyan/30"
              >
                <span className="absolute inset-5 rounded-full border border-magenta/25" />
                <span className="absolute inset-10 rounded-full border border-amber/20" />
                <ActiveIcon className="relative text-cyan drop-shadow-[0_0_18px_rgba(85,247,231,0.7)]" size={52} />
              </motion.div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">/ {activeTab.label}</p>
              <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">{activeTab.title}</h3>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{activeTab.body}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {activeTab.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-cyan"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Persona() {
  return (
    <section id="persona" className="section-shell py-24">
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="glass rounded-lg p-6"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">Location - Hover To Explore</p>
          <div className="mt-8 grid min-h-72 place-items-center border border-cyan/10 bg-void/45">
            <motion.div whileHover={{ scale: 1.05 }} className="text-center">
              <MapPin className="mx-auto text-magenta" size={42} />
              <h2 className="mt-4 font-display text-5xl font-bold text-white">INDIA</h2>
              <p className="mt-3 font-mono text-sm text-cyan">{profile.coordinates}</p>
              <p className="mt-1 font-mono text-sm text-slate-400">{profile.timezone}</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="glass rounded-lg p-6 sm:p-8"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">/ About</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white">Who I Am</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            I&apos;m Rajesh, a Chennai-based AI/Data Science graduate focused on intelligent automation, data
            workflows, and practical ML-powered products. I like systems that are clean enough to debug and useful
            enough to run on a schedule.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Growth", "Self-driven builder with projects shipped beyond coursework."],
              ["Focus", "API integration, scoring logic, validation, and webhook delivery."],
              ["Craft", "Production-minded workflows with clear state and secure secrets."],
            ].map(([label, text]) => (
              <div key={label} className="border border-white/10 bg-white/[0.03] p-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-amber">{label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section id="timeline" className="section-shell py-24">
      <SectionHeading eyebrow="Education & Work" title="Experience" />
      <div className="relative border-l border-cyan/20 pl-6">
        {timeline.map((item, index) => (
          <motion.div
            key={item.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: index * 0.08 }}
            className="relative mb-10 last:mb-0"
          >
            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-amber bg-void shadow-[0_0_18px_#ffc857]" />
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber">{item.date}</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-white">{item.title}</h3>
            <p className="mt-1 text-cyan">{item.org}</p>
            <p className="mt-4 max-w-3xl leading-7 text-slate-300">{item.detail}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="border border-magenta/20 bg-magenta/5 px-2.5 py-1 font-mono text-[11px] text-magenta">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section-shell py-24">
      <SectionHeading eyebrow="Skills - Workflow - Identity" title="Toolbox" />
      <div className="mb-8 overflow-hidden border-y border-cyan/10 py-4">
        <motion.div
          className="flex w-max gap-8 font-mono text-sm uppercase tracking-[0.16em] text-slate-400"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...heroSkills, ...heroSkills, ...heroSkills].map((skill, index) => (
            <span key={`${skill}-${index}`}>
              <span className="text-cyan">{skill}</span> / Ready
            </span>
          ))}
        </motion.div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={group.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-lg p-5"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center border border-cyan/20 bg-cyan/10 text-cyan">
                  <Icon size={19} />
                </span>
                <h3 className="font-display text-xl font-semibold text-white">{group.label}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1.5 font-mono text-[11px] text-cyan shadow-[0_0_18px_rgba(85,247,231,0.08)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section id="credentials" className="section-shell py-24">
      <SectionHeading eyebrow="Credentials" title="Certifications" />
      <div className="grid gap-3 md:grid-cols-2">
        {certifications.map((certification, index) => (
          <motion.div
            key={certification}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: index * 0.04 }}
            className="glass flex items-start gap-4 rounded-lg p-5"
          >
            <Radio className="mt-1 shrink-0 text-amber" size={18} />
            <p className="leading-7 text-slate-200">{certification}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-shell pb-12 pt-24">
      <div className="glass scanline rounded-lg p-7 text-center sm:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">Hit Me Up</p>
        <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">Let&apos;s build something.</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
          Open to fresher AI/ML Engineer roles, data analytics work, and intelligent application integrations.
          Email is the fastest route.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="focus-ring inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-white transition hover:border-cyan hover:text-cyan"
              >
                <Icon size={16} />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-3 py-8 font-mono text-xs uppercase tracking-[0.16em] text-slate-500">
        <span>© 2026 RAJESH ARUMALLA</span>
        <span>{profile.location} - {profile.timezone}</span>
      </footer>
    </section>
  );
}
