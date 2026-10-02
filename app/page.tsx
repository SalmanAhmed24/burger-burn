import { BookingProvider } from "@/components/Booking";
import { MotionProvider } from "@/components/MotionProvider";
import { Header } from "@/components/Header";
import Hero from "@/components/sections/Hero";
import { Intro, Promises, Ribbon, Statement } from "@/components/sections/Story";
import { FloatingNav, MenuSection } from "@/components/sections/Commerce";
import { BookCta, Footer, Locations } from "@/components/sections/Static";

export default function Home() {
  return (
    <MotionProvider>
    <BookingProvider>
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <Ribbon />
        <Promises />
        <Statement />
        <MenuSection />
        <Locations />
        <BookCta />
      </main>
      <Footer />
      <FloatingNav />
    </BookingProvider>
    </MotionProvider>
  );
}
