"use client";

/* Small client wrappers that add motion to server-rendered markup.
   The heavy SVG markup stays on the server, so it never ships as JS or hydrates. */

import { useGsapIdle } from "@/lib/useGsapIdle";

type Props = { children: React.ReactNode; as?: "section" | "div" } & React.HTMLAttributes<HTMLElement>;
type AnyRef = React.Ref<HTMLElement & HTMLDivElement>;

/* Intro: headline lines rise out of their masks, plate drifts with scroll. */
export function IntroMotion({ children, as: Tag = "section", ...rest }: Props) {
  const ref = useGsapIdle<HTMLElement>(({ gsap }, root) => {
    gsap.from(root.querySelectorAll(".intro__line"), {
      yPercent: 110,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.1,
      scrollTrigger: { trigger: root.querySelector(".intro__title"), start: "top 80%" },
    });
    gsap.to(root.querySelector(".intro__plate"), {
      yPercent: -8,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
    });
  });
  return <Tag ref={ref as AnyRef} {...rest}>{children}</Tag>;
}

/* Promise cards: line drawings sketch themselves in. */
export function DrawMotion({ children, as: Tag = "section", ...rest }: Props) {
  const ref = useGsapIdle<HTMLElement>(({ gsap }, root) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.querySelector(".promises__grid"), start: "top 70%" } });
    root.querySelectorAll<HTMLElement>(".promise").forEach((card, i) => {
      tl.fromTo(
        card.querySelectorAll(".draw"),
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.12 },
        i * 0.18
      );
    });
  });
  return <Tag ref={ref as AnyRef} {...rest}>{children}</Tag>;
}

/* Statement: words brighten as you scroll through. Colour, not opacity,
   so the dim state still passes large-text contrast. */
export function WordsMotion({ children, as: Tag = "section", ...rest }: Props) {
  const ref = useGsapIdle<HTMLElement>(({ gsap }, root) => {
    gsap.fromTo(
      root.querySelectorAll(".statement__word"),
      { color: "#8FA89D" },
      {
        color: "#FBE6D6",
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: root.querySelector(".statement__text"), start: "top 80%", end: "bottom 45%", scrub: true },
      }
    );
  });
  return <Tag ref={ref as AnyRef} {...rest}>{children}</Tag>;
}

/* Ribbon: the loop runs on the compositor via the Web Animations API
   (no per-frame JS); scroll velocity only nudges its playbackRate. */
export function RibbonMotion({ children, as: Tag = "div", ...rest }: Props) {
  const ref = useGsapIdle<HTMLElement>(({ gsap, ScrollTrigger }, root) => {
    const track = root.querySelector<HTMLElement>(".ribbon__track")!;
    const anim = track.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], {
      duration: 26000,
      iterations: Infinity,
    });
    anim.pause();
    let settle: ReturnType<typeof setTimeout>;
    const st = ScrollTrigger.create({
      trigger: root,
      start: "top bottom+=200",
      end: "bottom top-=200",
      onToggle: (self) => (self.isActive ? anim.play() : anim.pause()),
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-5, 5, self.getVelocity() / 300);
        anim.playbackRate = v < 0 ? Math.min(-1, v) : Math.max(1, v);
        clearTimeout(settle);
        settle = setTimeout(() => (anim.playbackRate = v < 0 ? -1 : 1), 160);
      },
    });
    return () => {
      clearTimeout(settle);
      st.kill();
      anim.cancel();
    };
  });
  return <Tag ref={ref as AnyRef} {...rest}>{children}</Tag>;
}
