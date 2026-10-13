import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { MapHeaderArt } from "@/components/art/HeaderArt";
import { GoodToKnow } from "@/components/sections/Pages";
import { BookCta, Locations } from "@/components/sections/Static";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find a Bunfire near you: Old Market, Riverside and Station Square. Opening hours, directions and table booking.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        lines={["Three grills.", "One fire."]}
        script="come hungry"
        badge="Open daily from noon"
        lede={
          <p>
            <strong>Walk in, book ahead or order for collection.</strong> Every location runs the same menu off the same
            charcoal, with its own room to eat in.
          </p>
        }
        art={<MapHeaderArt />}
      />
      <Locations title={null} />
      <GoodToKnow />
      <BookCta />
    </>
  );
}
