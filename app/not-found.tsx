import Link from "next/link";
import { BunBottom, BunTop } from "@/components/art/Ingredients";

export default function NotFound() {
  return (
    <section className="nf" aria-labelledby="nf-title">
      <div className="nf__art" aria-hidden="true">
        <BunTop />
        <BunBottom />
      </div>
      <h1 id="nf-title" className="nf__title">This one fell off the grill.</h1>
      <p className="nf__text">The page you were after isn&apos;t here. The burgers still are.</p>
      <div className="nf__ctas">
        <Link className="btn btn--lime btn--lg" href="/">Back home</Link>
        <Link className="btn btn--cream-outline btn--lg" href="/menu">See the menu</Link>
      </div>
    </section>
  );
}
