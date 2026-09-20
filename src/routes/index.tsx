import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import workBeard from "@/assets/work-beard.jpg";
import workCrop from "@/assets/work-crop.jpg";
import workFade from "@/assets/work-fade.jpg";
import workTools from "@/assets/work-tools.jpg";
import storefront from "@/assets/storefront.jpg";
import { BookingPanel } from "@/components/booking-panel";
import { Reveal, Rule } from "@/components/reveal";
import { BARBERS, HOURS, SERVICE_GROUPS, SHOP } from "@/lib/shop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Halve & Hatch — Barber Shop on Mercer Street" },
      {
        name: "description",
        content:
          "Straight-razor fades, hot-towel shaves and a chair that waits for you. Book online or walk in — Halve & Hatch, 1420 Mercer Street.",
      },
      { property: "og:title", content: "Halve & Hatch — Barber Shop on Mercer Street" },
      {
        property: "og:description",
        content:
          "Straight-razor fades, hot-towel shaves and a chair that waits for you. Book online or walk in.",
      },
      { property: "og:type", content: "business.business" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WORK = [
  { src: workFade, alt: "A crisp skin fade, cropped close", label: "Skin fade" },
  { src: workBeard, alt: "A sculpted beard after a hot towel shave", label: "Beard sculpt" },
  { src: workCrop, alt: "A textured crop seen from the side", label: "Textured crop" },
  { src: workTools, alt: "A straight razor and comb on a leather strop", label: "The tools" },
];

function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [presetService, setPresetService] = useState<string | null>(null);

  const openBooking = (serviceId: string | null = null) => {
    setPresetService(serviceId);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-40 border-b border-bone/10 bg-espresso/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="pole block h-8 w-2 rounded-full" aria-hidden="true" />
            <span className="font-display text-2xl tracking-wide text-bone-2">
              {SHOP.name.toUpperCase()}
            </span>
          </div>
          <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-bone/60 md:flex">
            <a className="transition-colors hover:text-bone-2" href="#menu">
              Menu
            </a>
            <a className="transition-colors hover:text-bone-2" href="#barbers">
              Barbers
            </a>
            <a className="transition-colors hover:text-bone-2" href="#hours">
              Hours
            </a>
          </nav>
          <button
            onClick={() => openBooking()}
            className="rounded-full bg-brass px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-espresso transition-colors hover:bg-bone-2"
          >
            Book a chair
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,oklch(0.655_0.1099_74.61/0.28),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_120%,oklch(0.3913_0.1235_29.55/0.22),transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 md:pt-24">
          <p className="rise mb-6 font-mono text-xs uppercase tracking-[0.3em] text-brass">
            {SHOP.tagline}
          </p>
          <h1 className="rise animate-[hh-rise_0.8s_cubic-bezier(0.3,0.7,0,1)_0.05s_both] font-display text-[clamp(3.5rem,15vw,12rem)] leading-[0.82] tracking-tight text-bone-2">
            HALVE
            <br />
            <span className="text-brass">&amp;</span> HATCH
          </h1>
          <div className="mt-10 flex flex-col gap-8 border-t border-bone/15 pt-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[46ch] text-pretty text-base leading-relaxed text-bone/70">
              {SHOP.blurb}
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => openBooking()}
                className="rounded-full bg-oxblood px-7 py-4 font-mono text-sm font-medium uppercase tracking-[0.15em] text-bone-2 transition-colors hover:bg-bone-2 hover:text-espresso"
              >
                Book a chair
              </button>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone/50">
                Walk-ins welcome
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="section-pad border-t border-bone/10">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12 flex items-end justify-between">
            <h2 className="font-display text-5xl tracking-tight text-bone-2">The Menu</h2>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone/50">
              Prices in USD
            </span>
          </Reveal>
          <Rule />
          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {SERVICE_GROUPS.map((group, groupIndex) => (
              <Reveal key={group.label} delay={groupIndex * 90}>
                <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-brass">
                  {group.label}
                </h3>
                <ul className="space-y-4 text-lg text-bone/85">
                  {group.services.map((service) => (
                    <li key={service.id}>
                      <button
                        onClick={() => openBooking(service.id)}
                        className="group flex w-full items-baseline gap-3 text-left"
                      >
                        <span className="shrink-0 transition-colors group-hover:text-bone-2">
                          {service.name}
                        </span>
                        <span className="leader" />
                        <span className="font-mono text-brass">${service.price}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="barbers" className="section-pad border-t border-bone/10 bg-espresso-2">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="mb-12 font-display text-5xl tracking-tight text-bone-2">The Barbers</h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {BARBERS.map((person, index) => (
              <Reveal key={person.id} delay={index * 90}>
                <figure className="group">
                  <div className="overflow-hidden rounded-[min(1vw,12px)] ring-1 ring-bone/10 transition-transform duration-500 ease-[cubic-bezier(0.3,0.7,0,1)] group-hover:-translate-y-2">
                    <img
                      src={person.photo}
                      alt={`${person.name}, ${person.role}`}
                      width={1088}
                      height={1440}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <p className="font-display text-2xl tracking-wide text-bone-2">{person.name}</p>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
                      {person.role}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-bone/10">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="mb-12 font-display text-5xl tracking-tight text-bone-2">Recent Work</h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {WORK.map((item, index) => (
              <Reveal key={item.label} delay={index * 70}>
                <div className="group overflow-hidden rounded-[min(1vw,12px)] ring-1 ring-bone/10">
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.3,0.7,0,1)] group-hover:scale-[1.04]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="hours" className="section-pad border-t border-bone/10 bg-espresso-2">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <Reveal>
            <h2 className="mb-8 font-display text-5xl tracking-tight text-bone-2">
              Hours &amp; Location
            </h2>
            <ul className="space-y-3 text-base text-bone/80">
              {HOURS.map((line) => (
                <li key={line.label} className="flex items-baseline gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone/50">
                    {line.days.length === 4 ? "Tue–Fri" : dayNames(line.days)}
                  </span>
                  <span className="leader" />
                  <span className="font-mono text-bone/60">{line.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base text-bone/70">
              {SHOP.address[0]}
              <br />
              {SHOP.address[1]}
            </p>
            <a
              href={SHOP.phoneHref}
              className="mt-4 inline-block font-mono text-sm tracking-[0.1em] text-brass transition-colors hover:text-bone-2"
            >
              {SHOP.phone}
            </a>
          </Reveal>
          <Reveal delay={120}>
            <img
              src={storefront}
              alt="The Halve & Hatch storefront at dusk, painted glass and a lit barber pole"
              width={1200}
              height={912}
              loading="lazy"
              className="min-h-[320px] w-full rounded-[min(1vw,12px)] object-cover ring-1 ring-bone/10"
            />
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-bone/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
          <span className="pole block h-10 w-2 rounded-full" aria-hidden="true" />
          <p className="font-display text-3xl tracking-wide text-bone-2">
            {SHOP.name.toUpperCase()}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-bone/40">
            © {new Date().getFullYear()} · Walk-ins welcome · {SHOP.phone}
          </p>
        </div>
      </footer>

      <BookingPanel
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        initialServiceId={presetService}
      />
    </div>
  );
}

function dayNames(days: number[]): string {
  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days.map((d) => names[d]).join(", ");
}
