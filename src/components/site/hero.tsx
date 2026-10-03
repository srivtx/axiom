"use client";

/* axiom / hero — copy left, a floating instrument cluster right.
   No stage box: the cluster sits in open space on the page's own
   atmosphere. Every pane is glass with its own halo behind it, the
   whole field answers the pointer in depth, and each pane rides
   an idle float on its own clock. The FIELD tile reads the actual
   spring values driving the parallax — an instrument, not an
   ornament. Every pane is a real technique from the library; the
   hero demos the product. */

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

/* halo color passed to .ax-halo via --ax-halo */
const HALO_VIOLET = "var(--ax-halo-a)" as const;
const HALO_SKY = "var(--ax-halo-b)" as const;

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
      <div aria-hidden className="ax-grid absolute inset-0 opacity-60 sm:opacity-90" />

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
              <span className="flex h-6 shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-2.5 text-[11px] font-semibold text-white">
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
            className="text-balance text-[2.35rem] font-semibold leading-[1.06] tracking-[-0.03em] text-foreground sm:text-5xl sm:leading-[1.04] xl:text-[3.4rem]"
          >
            Components that
            <br />
            <span className="ax-grad">demo themselves.</span>
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="max-w-md text-pretty text-[15px] leading-relaxed tracking-tight text-muted-foreground dark:text-foreground/75"
          >
            {COUNTS.entries} motion-built React primitives. Every stage on this
            site is the real component — live, interactive, ready to ship. No
            screenshots, no mockups, nothing faked.
          </motion.p>

          <motion.div {...fade(0.24)} className="flex flex-wrap items-center gap-3">
            <Link
              href="/library"
              className="ax-sheen group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-6 text-[15px] font-semibold text-background shadow-lg shadow-foreground/20 transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] sm:w-auto"
            >
              Browse the library
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a
              href="https://github.com/srivtx/axiom"
              target="_blank"
              rel="noreferrer"
              className="ax-glass inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg px-6 text-[15px] font-semibold text-foreground transition-all duration-200 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] sm:w-auto"
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
            <span>0 raster images</span>
          </motion.div>
        </div>

        {/* ── scene column — the open floating cluster ──── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.21, 0.6, 0.35, 1] }}
          className="relative h-[420px] sm:h-[500px] lg:h-[580px]"
          style={{ perspective: 1400 }}
        >
          <div
            ref={stageRef}
            onPointerMove={onMove}
            onPointerLeave={reset}
            className="absolute inset-0"
          >
            {/* ambient scene light — two large blooms owning the space,
                not any one pane. Violet above the cluster, sky below. */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[38%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
              style={{ background: "radial-gradient(circle, var(--ax-halo-a), transparent 60%)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[2%] right-[6%] h-52 w-64 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(circle, var(--ax-halo-b), transparent 60%)" }}
            />

            {/* studio floor — a perspective grid receding below the
                cluster. Grounds the float without boxing it in. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[-30%] bottom-[-6%] h-[46%] opacity-80"
              style={{
                transform: "perspective(600px) rotateX(58deg)",
                transformOrigin: "50% 0%",
                maskImage: "linear-gradient(to bottom, transparent, black 16%, transparent 94%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent, black 16%, transparent 94%)",
              }}
            >
              <div className="ax-gridlite absolute inset-0" />
            </div>

            <motion.div
              className="absolute inset-0"
              style={{ rotateX: crx, rotateY: cry, transformStyle: "preserve-3d" }}
            >
              {/* center — the tilt specimen, halo behind, altitude below */}
              <motion.div
                style={{ x: cardX, y: cardY }}
                className="absolute left-1/2 top-1/2 w-[74%] max-w-[350px] -translate-x-1/2 -translate-y-1/2"
              >
                <Float dur={10} amp={7} reduce={!!reduce}>
                  <div className="relative [filter:drop-shadow(0_28px_56px_rgba(0,0,0,0.45))]">
                    <span
                      aria-hidden
                      className="ax-halo"
                      style={{ "--ax-halo": HALO_VIOLET } as React.CSSProperties}
                    />
                    <div className="scale-[0.84] sm:scale-90 lg:scale-100">
                      <TiltCard variant="badge" title="axiom / specimen" />
                    </div>
                  </div>
                </Float>
              </motion.div>

              {/* satellite — kinetic type (upper left), tilted pane —
                  the specimen sits in a dark window so the type reads
                  in both themes */}
              <motion.div
                style={{ x: flipX, y: flipY, rotate: -3 }}
                className="absolute left-[4%] top-[9%] hidden sm:block lg:left-[5%]"
              >
                <Float dur={11} amp={8} reduce={!!reduce}>
                  <div className="relative rotate-[-1.5deg]">
                    <span
                      aria-hidden
                      className="ax-halo"
                      style={{ "--ax-halo": HALO_SKY } as React.CSSProperties}
                    />
                    <div className="ax-glass rounded-xl px-4 py-3.5">
                      <p className="ax-label text-muted-foreground">kinetic type</p>
                      <div className="mt-1.5 overflow-hidden rounded-lg bg-[#0a0a11] p-2 ring-1 ring-white/10">
                        <div className="origin-left scale-[0.58]">
                          <FlipCycle variant="slow" text="type" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Float>
              </motion.div>

              {/* satellite — live field telemetry (upper right).
                  Reports the actual spring values driving this
                  cluster — an instrument, not an ornament. */}
              <motion.div
                style={{ x: teleX, y: teleY, rotate: 2.5 }}
                className="absolute right-[4%] top-[12%] hidden sm:block lg:right-[5%] lg:top-[14%]"
              >
                <Float dur={13} amp={10} reduce={!!reduce}>
                  <div className="relative rotate-[1deg]">
                    <span
                      aria-hidden
                      className="ax-halo"
                      style={{ "--ax-halo": HALO_VIOLET } as React.CSSProperties}
                    />
                    <FieldTile sx={sx} sy={sy} />
                  </div>
                </Float>
              </motion.div>

              {/* satellite — avatar deck (lower left), tucked clear of
                  the specimen so the overlap reads as depth, not error */}
              <motion.div
                style={{ x: deckX, y: deckY, rotate: -4 }}
                className="absolute bottom-[7%] left-[2%] hidden sm:block lg:bottom-[8%] lg:left-[3%]"
              >
                <Float dur={9} amp={6} reduce={!!reduce}>
                  <div className="relative">
                    <span
                      aria-hidden
                      className="ax-halo"
                      style={{ "--ax-halo": HALO_SKY } as React.CSSProperties}
                    />
                    <div className="ax-glass w-44 rounded-xl px-2 py-1.5">
                      <p className="px-1.5 pt-1 ax-label text-muted-foreground">stack deck</p>
                      <div className="origin-top scale-[0.72]">
                        <StackDeck variant="avatars" />
                      </div>
                    </div>
                  </div>
                </Float>
              </motion.div>

              {/* satellite — beam chip (lower right) */}
              <motion.div
                style={{ x: beamX, y: beamY, rotate: 3 }}
                className="absolute bottom-[10%] right-[6%] hidden sm:block lg:bottom-[12%] lg:right-[8%]"
              >
                <Float dur={15} amp={7} reduce={!!reduce}>
                  <div className="relative">
                    <span
                      aria-hidden
                      className="ax-halo"
                      style={{ "--ax-halo": HALO_VIOLET } as React.CSSProperties}
                    />
                    <div className="relative rounded-full bg-secondary/70 px-4 py-2.5 ring-1 ring-border backdrop-blur-md">
                      <span
                        aria-hidden
                        className="ax-beam rounded-full"
                        style={{ "--beam-dur": "4.5s" } as React.CSSProperties}
                      />
                      <span className="relative flex items-center gap-2 ax-label text-muted-foreground">
                        <span className="size-1.5 animate-pulse rounded-full bg-emerald-400/80" />
                        every tile live
                      </span>
                    </div>
                  </div>
                </Float>
              </motion.div>
            </motion.div>

            {/* mobile row — two satellites under the card */}
            <div className="absolute inset-x-8 bottom-16 flex items-center justify-center gap-8 sm:hidden">
              <div className="scale-[0.55] origin-center overflow-hidden rounded-lg bg-[#0a0a11] p-2 ring-1 ring-white/10">
                <FlipCycle variant="slow" text="type" />
              </div>
              <FieldTile sx={sx} sy={sy} compact />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── field telemetry tile ─────────────────────────────────
   Renders the live spring inputs as tabular numerals. The hero
   is alive — this tile proves it with the actual numbers. */
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
    <div className={`ax-glass ${compact ? "px-3.5 py-2.5" : "px-4 py-3.5"} rounded-xl`}>
      <p className="ax-label text-muted-foreground">field</p>
      <div className="mt-2 flex items-center justify-between gap-6 font-mono text-xs tabular-nums font-semibold leading-none">
        <span className="flex items-center gap-1.5">
          <span className="text-muted-foreground/80">x</span>
          <motion.span className="text-primary">{fx}</motion.span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-muted-foreground/80">y</span>
          <motion.span className="text-sky-500 dark:text-sky-400">{fy}</motion.span>
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
            <span className="size-1 rounded-full bg-primary/60" />
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
