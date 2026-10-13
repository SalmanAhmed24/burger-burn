import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { MenuHeaderArt } from "@/components/art/HeaderArt";
import { FullMenu } from "@/components/sections/Pages";
import { BookCta } from "@/components/sections/Static";

export const metadata: Metadata = {
  title: "Menu",
  description: "Smash burgers, charcoal-grilled skewers and chicken, hand-cut fries and thick shakes. See the full Bunfire menu with prices.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        lines={["Smashed.", "Grilled.", "Shaken."]}
        script="and served hot"
        badge="16 things worth ordering"
        lede={
          <p>
            <strong>Everything here is made the day you eat it.</strong> Burgers are smashed to order, the grill runs on real
            charcoal, and the shakes are blended with proper ice cream.
          </p>
        }
        art={<MenuHeaderArt />}
      />
      <FullMenu />
      <BookCta />
    </>
  );
}
