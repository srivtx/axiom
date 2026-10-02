"use client";

/* axiom / cards — PointerCard, HaloCard, StackDeck, VoiceCard */

import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── PointerCard ───────────────────────────────────────────── */
export function PointerCard({ variant = "spotlight", title = "Pointer Card" }: { variant?: string; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const edge = variant === "edge";
  const onMove = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", `${e.clientX - r.left}px`);
    el.style.setProperty("--py", `${e.clientY - r.top}px`);
  }, []);
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      tabIndex={0}
      className={cn(
        "pc-card group relative h-52 w-full max-w-72 overflow-hidden rounded-xl bg-[#0b0b10] p-5",
        "ring-1 ring-white/10 transition-shadow duration-300 hover:shadow-[0_20px_60px_-24px_rgba(139,92,246,.35)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background: edge
            ? "radial-gradient(340px circle at var(--px) var(--py), rgba(139,92,246,.2), transparent 45%)"
            : "radial-gradient(180px circle at var(--px) var(--py), rgba(255,255,255,.14), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          padding: "1px",
          background: edge
            ? "radial-gradient(220px circle at var(--px) var(--py), rgba(167,139,250,.9), transparent 55%)"
            : "radial-gradient(160px circle at var(--px) var(--py), rgba(255,255,255,.5), transparent 60%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          borderRadius: "inherit",
        }}
      />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-violet-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">{title}</span>
        </div>
        <div>
          <p className="text-lg font-semibold tracking-tight text-neutral-100">Move your pointer</p>
          <p className="mt-1 text-sm leading-relaxed text-neutral-400">
            The highlight tracks the cursor; the border ignites nearest to it.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── HaloCard ──────────────────────────────────────────────── */
export function HaloCard({ variant = "orbit", title = "Halo Card" }: { variant?: string; title?: string }) {
  const hoverOnly = variant === "hover";
  return (
    <div className="relative w-full max-w-72 overflow-hidden rounded-xl bg-[#0b0b10] ring-1 ring-white/10">
      {!hoverOnly && (
        <span aria-hidden className="ax-beam rounded-xl" style={{ "--beam-dur": "6s" } as React.CSSProperties} />
      )}
      <div
        className={cn(
          "group relative z-10 flex h-52 flex-col justify-between p-5",
          hoverOnly && "transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(167,139,250,.4)]",
        )}
      >
        {hoverOnly && (
          <span aria-hidden className="ax-beam opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl" style={{ "--beam-dur": "3s" } as React.CSSProperties} />
        )}
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">{title}</span>
        </div>
        <div>
          <p className="text-lg font-semibold tracking-tight text-neutral-100">One ornament, fully spent</p>
          <p className="mt-1 text-sm leading-relaxed text-neutral-400">
            {hoverOnly ? "Beam rides the outline only while engaged." : "A 42px gradient beam laps the border on a 6s clock."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── StackDeck ─────────────────────────────────────────────── */
const SPRING = "linear(0, 0.79 14.4%, 1.026 22.4%, 1.164 31.2%, 1.207 38.2%, 1.208 46.2%, 1.033 80%, 1)";

export function StackDeck({ variant = "avatars" }: { variant?: string }) {
  const tickets = variant === "tickets";
  const [hovered, setHovered] = useState<number | null>(null);
  const items = ["KX", "AR", "MZ", "TL", "EV"];
  const push = 16;
  return (
    <div
      className="flex w-full items-center justify-center py-10"
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((it, i) => {
        const engaged = hovered === i;
        const dx =
          hovered === null ? 0 : i === hovered ? 0 : i > hovered ? Math.min(push * (items.length - i - 1), 24) : -Math.min(push * i, 24);
        return (
          <div
            key={it}
            onMouseEnter={() => setHovered(i)}
            onFocus={() => setHovered(i)}
            tabIndex={0}
            className={cn(
              "relative flex items-center justify-center isolate transition-all duration-700",
              tickets
                ? "h-20 w-16 rounded-lg bg-[#14141b] ring-1 ring-white/15"
                : "size-14 rounded-full bg-[#171721] ring-2 ring-[#050507]",
            )}
            style={{
              marginLeft: i === 0 ? 0 : tickets ? -12 : -18,
              transform: `translateX(${dx}px) scale(${engaged ? 1.22 : 1})`,
              transitionTimingFunction: SPRING,
              zIndex: engaged ? 40 : i,
              background: engaged
                ? "linear-gradient(135deg, rgba(139,92,246,.5), rgba(232,121,249,.35))"
                : undefined,
              boxShadow: engaged ? "0 16px 40px -16px rgba(139,92,246,.7)" : undefined,
            }}
          >
            <span className={cn("font-semibold tracking-tight", tickets ? "text-xs" : "text-sm", "text-neutral-200")}>
              {it}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── VoiceCard ─────────────────────────────────────────────── */
export function VoiceCard({ variant = "metric" }: { variant?: string }) {
  const metric = variant === "metric";
  return (
    <div className="relative w-full max-w-80 overflow-hidden rounded-xl bg-[#0b0b10] ring-1 ring-white/10">
      <span aria-hidden className="ax-beam rounded-xl" style={{ "--beam-dur": "9s" } as React.CSSProperties} />
      <div className="relative z-10 flex h-56 flex-col justify-between p-6">
        {metric ? (
          <>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">voice · metric</span>
              <div className="flex -space-x-2.5">
                {["A", "M", "J"].map((a) => (
                  <span
                    key={a}
                    className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[10px] font-bold text-white ring-2 ring-[#0b0b10]"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <motion.div
              className="flex items-baseline gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="text-5xl font-semibold tracking-tighter text-neutral-50 tabular-nums">99.98</span>
              <span className="text-xl text-violet-300">%</span>
            </motion.div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.3 }}
                >
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                </motion.span>
              ))}
              <span className="ml-2 text-xs text-neutral-400">uptime, 12 months running</span>
            </div>
          </>
        ) : (
          <>
            <Quote className="size-5 text-violet-300/70" />
            <p className="text-[15px] leading-relaxed text-neutral-200">
              “It stopped feeling like a component library and started feeling like a
              materials catalog. Every surface has intent.”
            </p>
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold text-white">
                RD
              </span>
              <div>
                <p className="text-sm font-medium text-neutral-100">Rae Delgado</p>
                <p className="text-xs text-neutral-500">Design engineer, Halcyon</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
