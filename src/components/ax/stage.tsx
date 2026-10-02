"use client";

/* axiom / DemoStage — maps a registry entry + variant to its live renderer.
   Every demo is the real component, not a screenshot. */

import React from "react";
import { Sheen, Sweep, Halo, Notch, Pop, Candy } from "./buttons";
import { FlipCycle, MorphStream, Cascade, Glitch, RollDigits } from "./textfx";
import { Corona, Flux, TraceGrid, BeamLines, AuroraVeil } from "./ambience";
import { PointerCard, HaloCard, StackDeck, VoiceCard } from "./cards";
import { IsoStage, TiltCard, Ribbon, OrbitCam } from "./motion3d";
import { OrbitGallery, DiagonalRail, CursorTrail } from "./galleries";
import { NotchBar, SpotBar, GlassDock } from "./navigation";
import { Kinetic, Shutter, OrbitDot } from "./loaders";
import { GooSearch, TypeDeck } from "./inputs";
import { PlayerDeck, OrbitSystem, PeekFolder } from "./showcase";

export function DemoStage({
  comp,
  variant,
  big = false,
}: {
  comp: string;
  variant: string;
  big?: boolean;
}) {
  switch (comp) {
    /* ambience */
    case "corona":
      return <Corona variant={variant} className={big ? "h-96 w-full" : "h-full w-full"} />;
    case "flux":
      return <Flux variant={variant} className={big ? "h-96 w-full" : "h-full w-full"} />;
    case "tracegrid":
      return <TraceGrid variant={variant} className={big ? "h-96 w-full" : "h-full w-full"} />;
    case "beamlines":
      return <BeamLines variant={variant} className={big ? "h-96 w-full" : "h-full w-full"} />;
    case "auroraveil":
      return <AuroraVeil variant={variant} className={big ? "h-96 w-full" : "h-full w-full"} />;

    /* buttons */
    case "sheen":
      return <Sheen variant={variant} />;
    case "sweep":
      return <Sweep variant={variant} />;
    case "halo":
      return <Halo variant={variant} />;
    case "notchbtn":
      return <Notch variant={variant} />;
    case "pop":
      return <Pop variant={variant} />;
    case "candy":
      return <Candy variant={variant} />;

    /* cards */
    case "pointercard":
      return <PointerCard variant={variant} />;
    case "halocard":
      return <HaloCard variant={variant} />;
    case "deck":
      return <StackDeck variant={variant} />;
    case "voicecard":
      return <VoiceCard variant={variant} />;

    /* textfx */
    case "flipcycle":
      return <FlipCycle variant={variant} />;
    case "morphstream":
      return <MorphStream variant={variant} />;
    case "cascade":
      return <Cascade variant={variant} />;
    case "glitch":
      return <Glitch variant={variant} />;
    case "rolldigits":
      return <RollDigits variant={variant} />;

    /* motion3d */
    case "isostage":
      return <IsoStage variant={variant} />;
    case "tiltcard":
      return <TiltCard variant={variant} />;
    case "ribbon":
      return <Ribbon variant={variant} />;
    case "orbitcam":
      return (
        <div className="flex items-center justify-center py-6">
          <OrbitCam variant={variant} size={big ? 200 : 128} />
        </div>
      );

    /* galleries */
    case "orbitgal":
      return <OrbitGallery variant={variant} />;
    case "diagonalrail":
      return <DiagonalRail variant={variant} />;
    case "cursortrail":
      return <CursorTrail variant={variant} />;

    /* navigation */
    case "notchbar":
      return <NotchBar variant={variant} />;
    case "spotbar":
      return <SpotBar variant={variant} />;
    case "glassdock":
      return <GlassDock variant={variant} />;

    /* loaders */
    case "kinetic":
      return <Kinetic variant={variant} />;
    case "shutter":
      return <Shutter variant={variant} />;
    case "orbitdot":
      return <OrbitDot variant={variant} />;

    /* inputs */
    case "goosearch":
      return <GooSearch variant={variant} />;
    case "typedeck":
      return <TypeDeck variant={variant} />;

    /* showcase */
    case "playerdeck":
      return <PlayerDeck variant={variant} />;
    case "orbitsys":
      return <OrbitSystem variant={variant} />;
    case "peekfolder":
      return <PeekFolder variant={variant} />;

    default:
      return (
        <span className="text-sm text-neutral-500">missing demo: {comp}</span>
      );
  }
}
