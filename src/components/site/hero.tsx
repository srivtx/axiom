"use client";

/* axiom / hero — 44/56 split. The stage is a dark island holding a
   living collage: the tilt specimen at center, satellites on their
   own float clocks, the whole field answering the pointer with
   depth parallax. The FIELD tile is not decoration — it reads the
   actual spring values driving the parallax. Every tile is a real
   technique from the library — the hero demos the product. */

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, Github, Star } from "lucide-react";
import { TiltCard } from "@/components/ax/motion3d";
import { StackDeck } from "@/components/ax/cards";
import { FlipCycle } from "@/components/ax/textfx";
import { COUNTS } from "@/lib/registry";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.21, 0.6, 0.35, 1] as const },
});

/* one satellite chrome — every float tile shares this exact recipe,
   so the cluster reads as one instrument, not mixed leftovers */
const SATELLITE =
  "rounded-xl bg-white/[0.03] ring-1 ring-white/10 backdrop-blur-sm shadow-[0_16px_40px_-18px_rgba(0,0,0,0.75)]";

export function Hero() {
  const reduce = useReducedMotion();

  /* ── pointer parallax rig ─────────────────────────────── */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 90, damping: 20, mass: 0.6 });

  const stageRef = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (reduce) return;
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  /* cluster tilt — subtle, capped at ±3.5deg */
  const cry = useTransform(sx, (v) => v * 3.5);
  const crx = useTransform(sy, (v) => -v * 3.5);

  /* per-tile parallax at different depths */
  const flipX = useTransform(sx, (v) => v * 26);
  const flipY = useTransform(sy, (v) => v * 26);
  const teleX = useTransform(sx, (v) => v * 44);
  const teleY = useTransform(sy, (v) => v * 44);
  const deckX = useTransform(sx, (v) => v * 20);
  const deckY = useTransform(sy, (v) => v * 20);
  const beamX = useTransform(sx, (v) => v * 34);
  const beamY = useTransform(sy, (v) => v * 34);
  const cardX = useTransform(sx, (v) => v * 9);
  const cardY = useTransform(sy, (v) => v * 9);

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="ax-aurora" />
      <div aria-hidden className="ax-grid absolute inset-0 opacity-70 sm:opacity-100" />

      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-12 px-5 pb-24 pt-20 sm:px-6 lg:grid-cols-[44%_56%] lg:gap-0 lg:pb-28 lg:px-10 lg:pt-24">
        {/* ── copy column ─────────────────────────────────── */}
        <div className="relative z-10 flex max-w-xl flex-col gap-6 sm:gap-7">
          <motion.div
            {...fade(0)}
            className="w-fit max-w-full"
          >
            <Link
              href="/changelog"
              className="group relative inline-flex w-fit max-w-full items-center gap-2.5 rounded-full bg-secondary py-1 pl-2 pr-4 ring-1 ring-border transition-colors hover:ring-ring/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex h-6 shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-2.5 text-[11px] font-semibold text-white">
                v3
              </span>
              <span className="truncate text-xs font-medium tracking-tight text-muted-foreground">
                a page for every primitive
              </span>
              <ArrowRight className="size-3.5 shrink-0 text-muted-foreground/70 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.h1
            {...fade(0.08)}
            className="text-balance text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-5xl sm:leading-[1.05] xl:text-[3.4rem]"
          >
            Precision-cut
            <br />
            <span className="ax-grad">interface primitives</span>
            <br />
            for product surfaces.
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="max-w-md text-pretty text-[15px] leading-relaxed tracking-tight text-muted-foreground"
          >
            Every stage is the component itself — live, interactive, zero
            screenshots. {COUNTS.entries} primitives, {COUNTS.families} families,
            each with its own page and variant forms.
          </motion.p>

          <motion.div {...fade(0.24)} className="flex flex-wrap items-center gap-3">
            <Link
              href="/library"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-6 text-[15px] font-semibold text-background shadow-lg shadow-foreground/20 transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] sm:w-auto"
            >
              Browse the library
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a
              href="https://github.com/srivtx/axiom"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-card px-6 text-[15px] font-semibold text-foreground ring-1 ring-foreground/15 shadow-sm transition-all duration-200 hover:bg-accent hover:shadow-md hover:ring-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] sm:w-auto"
            >
              <Github className="size-4" />
              View on GitHub
            </a>
          </motion.div>

          <motion.div
            {...fade(0.32)}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-4 text-xs font-medium tracking-tight text-muted-foreground sm:gap-x-4"
          >
            <span className="flex items-center gap-1.5">
              <Star className="size-3.5 fill-amber-500 text-amber-500" />
              MIT licensed
            </span>
            <span className="hidden h-3.5 w-px bg-border sm:block" />
            <span>TypeScript strict</span>
            <span className="hidden h-3.5 w-px bg-border sm:block" />
            <span>Tailwind v4</span>
            <span className="hidden h-3.5 w-px bg-border sm:block" />
            <span>0 raster images</span>
          </motion.div>
        </div>

        {/* ── stage column — the living collage ──────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.6, 0.35, 1] }}
          className="ax-stage ax-seat relative h-[440px] overflow-hidden rounded-2xl sm:h-[500px] lg:h-[560px]"
        >
          <div
            ref={stageRef}
            onPointerMove={onMove}
            onPointerLeave={reset}
            className="absolute inset-0"
            style={{ perspective: 1400 }}
          >
            {/* vignette + floor glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 62%, rgba(139,92,246,.13), transparent 45%), radial-gradient(circle at 50% 120%, rgba(232,121,249,.1), transparent 55%)",
              }}
            />

            {/* the tilt cluster — tilts with the pointer */}
            <motion.div
              className="absolute inset-0"
              style={{ rotateX: crx, rotateY: cry, transformStyle: "preserve-3d" }}
            >
              {/* center — the tilt specimen (real component, hover it) */}
              <motion.div
                style={{ x: cardX, y: cardY }}
                className="absolute left-1/2 top-1/2 w-[72%] max-w-[340px] -translate-x-1/2 -translate-y-1/2 sm:w-[60%] lg:w-[64%]"
              >
                <div className="scale-[0.82] [filter:drop-shadow(0_28px_48px_rgba(0,0,0,0.55))] sm:scale-90 lg:scale-100">
                  <TiltCard variant="badge" title="axiom / specimen" />
                </div>
              </motion.div>

              {/* satellite — kinetic type (upper left) */}
              <motion.div
                style={{ x: flipX, y: flipY }}
                className="absolute left-[6%] top-[12%] hidden sm:block lg:left-[8%]"
              >
                <Float dur={11} amp={8} reduce={!!reduce}>
                  <div className={`${SATELLITE} overflow-hidden px-4 py-3.5`}>
                    <p className="ax-label text-white/45">kinetic type</p>
                    <div className="mt-1 origin-left scale-[0.58]">
                      <FlipCycle variant="slow" text="type" />
                    </div>
                  </div>
                </Float>
              </motion.div>

              {/* satellite — live field telemetry (upper right).
                  Reports the actual spring values driving this
                  collage — an instrument, not an ornament. */}
              <motion.div
                style={{ x: teleX, y: teleY }}
                className="absolute right-[5%] top-[14%] hidden sm:block lg:right-[8%] lg:top-[15%]"
              >
                <Float dur={13} amp={10} reduce={!!reduce}>
                  <FieldTile sx={sx} sy={sy} />
                </Float>
              </motion.div>

              {/* satellite — avatar deck (lower left) */}
              <motion.div
                style={{ x: deckX, y: deckY }}
                className="absolute bottom-[13%] left-[6%] hidden sm:block lg:bottom-[14%] lg:left-[8%]"
              >
                <Float dur={9} amp={6} reduce={!!reduce}>
                  <div className={`${SATELLITE} w-44 overflow-hidden px-2 py-1.5`}>
                    <p className="px-1.5 pt-1 ax-label text-white/45">stack deck</p>
                    <div className="origin-top scale-[0.72]">
                      <StackDeck variant="avatars" />
                    </div>
                  </div>
                </Float>
              </motion.div>

              {/* satellite — beam chip (lower right) */}
              <motion.div
                style={{ x: beamX, y: beamY }}
                className="absolute bottom-[13%] right-[7%] hidden sm:block lg:bottom-[14%] lg:right-[9%]"
              >
                <Float dur={15} amp={7} reduce={!!reduce}>
                  <div className="relative rounded-full bg-white/[0.03] px-4 py-2.5 ring-1 ring-white/10 backdrop-blur-sm shadow-[0_16px_40px_-18px_rgba(0,0,0,0.75)]">
                    <span
                      aria-hidden
                      className="ax-beam rounded-full"
                      style={{ "--beam-dur": "4.5s" } as React.CSSProperties}
                    />
                    <span className="relative flex items-center gap-2 ax-label text-white/60">
                      <span className="size-1.5 animate-pulse rounded-full bg-emerald-400/80" />
                      every tile live
                    </span>
                  </div>
                </Float>
              </motion.div>
            </motion.div>

            {/* mobile row — two satellites under the card */}
            <div className="absolute inset-x-8 bottom-16 flex items-center justify-center gap-8 sm:hidden">
              <div className="scale-[0.55] origin-center">
                <FlipCycle variant="slow" text="type" />
              </div>
              <FieldTile sx={sx} sy={sy} compact />
            </div>
          </div>

          {/* stage label — instructional, one line, mono, quiet */}
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap ax-label text-white/50">
            hover the card · it tilts
          </span>

          <style>{`
            @keyframes ax-hero-orb {
              0% { transform: rotate(0deg) scale(1); }
              50% { transform: rotate(180deg) scale(.62); }
              100% { transform: rotate(360deg) scale(1); }
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}

/* ── field telemetry tile ─────────────────────────────────
   Renders the live spring inputs as tabular numerals. The hero
   advertises "the field answers" — this tile proves it. */
function FieldTile({
  sx,
  sy,
  compact = false,
}: {
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  compact?: boolean;
}) {
  const fmt = (v: number) =>
    `${v < 0 ? "−" : "+"}${Math.abs(v).toFixed(2)}`;
  const fx = useTransform(sx, fmt);
  const fy = useTransform(sy, fmt);
  return (
    <div
      className={`${
        compact ? "px-3.5 py-2.5" : "px-4 py-3.5"
      } ${SATELLITE}`}
    >
      <p className="ax-label text-white/45">field</p>
      <div className="mt-2 flex items-center justify-between gap-6 font-mono text-xs tabular-nums font-medium leading-none text-white/80">
        <span className="flex items-center gap-1.5">
          <span className="text-white/45">x</span>
          <motion.span className="text-violet-300">{fx}</motion.span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-white/45">y</span>
          <motion.span className="text-fuchsia-300">{fy}</motion.span>
        </span>
      </div>
    </div>
  );
}

/* idle float on an independent clock, nested so it never fights
   the parallax translate on the parent */
function Float({
  dur,
  amp,
  reduce,
  children,
}: {
  dur: number;
  amp: number;
  reduce: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -amp, 0] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* slow marquee band of the stack that powers the primitives */
export function StackMarquee() {
  const items = [
    "Next.js 16",
    "React 19",
    "Tailwind CSS v4",
    "framer-motion 12",
    "TypeScript 5",
    "Geist",
    "lucide",
    "Radix primitives",
    "CSS @property",
    "offset-path",
    "conic-gradient",
    "preserve-3d",
  ];
  return (
    <div className="ax-marquee-host relative overflow-hidden border-y border-border bg-background py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent sm:w-32" />
      <div className="ax-marquee flex w-max items-center gap-12 pr-12">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center gap-3 text-xs font-medium tracking-tight text-muted-foreground">
            <span className="size-1 rounded-full bg-primary/50" />
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
