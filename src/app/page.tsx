/* axiom — home. One job: show what the library is, then get out of
   the way. Hero → stack marquee → four curated family passes → a
   single browse strip. The full catalogue lives at /library. */

import { Hero, StackMarquee } from "@/components/site/hero";
import { FamilyRows } from "@/components/site/rows";
import { BrowseStrip } from "@/components/site/browse-strip";
import type { FamilyId } from "@/lib/registry";

const CURATED: FamilyId[] = ["buttons", "textfx", "motion3d", "galleries"];

export default function Home() {
  return (
    <main id="top" className="flex flex-1 flex-col">
      <Hero />
      <StackMarquee />
      <FamilyRows families={CURATED} />
      <BrowseStrip />
    </main>
  );
}
