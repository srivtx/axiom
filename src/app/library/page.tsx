import type { Metadata } from "next";
import { Catalogue } from "@/components/site/catalogue";

export const metadata: Metadata = {
  title: "Library — every live primitive | axiom",
  description:
    "Browse all axiom primitives: ambient backgrounds, tactile buttons, kinetic type, isometric stages, galleries, loaders and more. Every tile is the component itself, live.",
};

export default function LibraryPage() {
  return (
    <main className="flex flex-1 flex-col pt-16">
      <Catalogue />
    </main>
  );
}
