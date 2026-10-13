import Hero from "@/components/sections/Hero";
import { Intro, Ribbon, Statement } from "@/components/sections/Story";
import { LocationsTeaser, MenuTeaser } from "@/components/sections/Pages";
import { BookCta } from "@/components/sections/Static";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Ribbon />
      <MenuTeaser />
      <Statement />
      <LocationsTeaser />
      <BookCta />
    </>
  );
}
