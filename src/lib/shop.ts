import barberDeshawn from "@/assets/barber-deshawn.jpg";
import barberMarco from "@/assets/barber-marco.jpg";
import barberSaul from "@/assets/barber-saul.jpg";

export const SHOP = {
  name: "Halve & Hatch",
  tagline: "Est. 2011 · A barbershop, not a salon",
  blurb:
    "Straight-razor fades, hot towels, and a chair that waits for you. No rush, no noise — just a clean cut on a quiet corner of the block.",
  address: ["1420 Mercer Street", "Corner of 5th & Mercer"],
  phone: "(555) 014-2260",
  phoneHref: "tel:+15550142260",
};

export type Service = {
  id: string;
  name: string;
  price: number;
  minutes: number;
};

export const SERVICE_GROUPS: { label: string; services: Service[] }[] = [
  {
    label: "Cuts",
    services: [
      { id: "classic-cut", name: "Classic Cut", price: 38, minutes: 45 },
      { id: "skin-fade", name: "Skin Fade", price: 44, minutes: 60 },
      { id: "scissor-cut", name: "Scissor Cut", price: 42, minutes: 50 },
      { id: "beard-sculpt", name: "Beard Sculpt", price: 28, minutes: 30 },
    ],
  },
  {
    label: "Rituals",
    services: [
      { id: "hot-towel-shave", name: "Hot Towel Shave", price: 46, minutes: 45 },
      { id: "cut-and-shave", name: "Cut & Shave", price: 72, minutes: 90 },
      { id: "grey-blend", name: "Grey Blend", price: 34, minutes: 40 },
      { id: "the-full-half", name: "The Full Half", price: 95, minutes: 120 },
    ],
  },
];

export const ALL_SERVICES: Service[] = SERVICE_GROUPS.flatMap((g) => g.services);

export type Barber = {
  id: string;
  name: string;
  role: string;
  photo: string;
};

export const BARBERS: Barber[] = [
  { id: "marco", name: "Marco Reyes", role: "Master Barber", photo: barberMarco },
  { id: "deshawn", name: "Deshawn Cole", role: "Fades & Lineups", photo: barberDeshawn },
  { id: "saul", name: "Saul Okafor", role: "Shaves & Rituals", photo: barberSaul },
];

/** Opening windows in 24h decimal hours. `null` means the shop is dark. */
export const HOURS: { label: string; days: number[]; open: number | null; close: number }[] = [
  { label: "Closed", days: [1], open: null, close: 0 },
  { label: "9am – 7pm", days: [2, 3, 4, 5], open: 9, close: 19 },
  { label: "8am – 6pm", days: [6], open: 8, close: 18 },
  { label: "10am – 4pm", days: [0], open: 10, close: 16 },
];

export function windowFor(date: Date): { open: number; close: number; label: string } | null {
  const entry = HOURS.find((h) => h.days.includes(date.getDay()));
  if (!entry || entry.open === null) return null;
  return { open: entry.open, close: entry.close, label: entry.label };
}

export function hoursLine(date: Date): string {
  return windowFor(date)?.label ?? "Closed";
}

/** Small, stable hash so fake availability doesn't reshuffle on every render. */
function seed(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type Slot = { at: string; hour: number; minute: number; taken: boolean };

export function slotsFor(date: Date, barberId: string): Slot[] {
  const win = windowFor(date);
  if (!win) return [];
  const dayKey = date.toISOString().slice(0, 10);
  const slots: Slot[] = [];
  for (let t = win.open * 60; t + 30 <= win.close * 60; t += 30) {
    const hour = Math.floor(t / 60);
    const minute = t % 60;
    const at = formatTime(hour, minute);
    const taken = seed(`${dayKey}|${barberId}|${at}`) % 10 < 4;
    slots.push({ at, hour, minute, taken });
  }
  return slots;
}

export function formatTime(hour: number, minute: number): string {
  const suffix = hour >= 12 ? "pm" : "am";
  const base = hour % 12 === 0 ? 12 : hour % 12;
  return `${base}:${minute.toString().padStart(2, "0")}${suffix}`;
}

/** The next `count` days the shop is actually open, starting today. */
export function upcomingDays(count = 10): Date[] {
  const out: Date[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  let guard = 0;
  while (out.length < count && guard < 40) {
    if (windowFor(cursor)) out.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
    guard++;
  }
  return out;
}
