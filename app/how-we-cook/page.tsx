import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { GrillHeaderArt } from "@/components/art/HeaderArt";
import { Process } from "@/components/sections/Pages";
import { Promises, Ribbon, Statement } from "@/components/sections/Story";
import { BookCta } from "@/components/sections/Static";

export const metadata: Metadata = {
  title: "How we cook",
  description: "Beef ground every morning, buns baked in-house, sauces made by hand and everything finished over real charcoal. Here's how a Bunfire day runs.",
  alternates: { canonical: "/how-we-cook" },
};

export default function HowWeCookPage() {
  return (
    <>
      <PageHeader
        lines={["Real fire.", "Real food.", "Every day."]}
        script="no shortcuts"
        badge="Since 2011"
        lede={
          <p>
            <strong>Bunfire started as one charcoal grill at the Old Market.</strong> We still cook the same way: start early,
            make it ourselves, and let the coals do the rest.
          </p>
        }
        art={<GrillHeaderArt />}
      />
      <Process />
      <Ribbon />
      <Promises />
      <Statement />
      <BookCta />
    </>
  );
}
