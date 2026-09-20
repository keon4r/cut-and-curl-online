import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ALL_SERVICES,
  BARBERS,
  SERVICE_GROUPS,
  SHOP,
  slotsFor,
  upcomingDays,
} from "@/lib/shop";

const STEPS = ["Service", "Barber", "Time"] as const;

const dayLabel = (date: Date) => date.toLocaleDateString("en-US", { weekday: "short" });
const dateLabel = (date: Date) => date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

export function BookingPanel({
  open,
  onOpenChange,
  initialServiceId = null,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialServiceId?: string | null;
}) {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [barberId, setBarberId] = useState("any");
  const [days, setDays] = useState<Date[]>([]);
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDays(upcomingDays(10));
    setDayIndex(0);
    setSlot(null);
    setDone(false);
    if (initialServiceId) {
      setServiceId(initialServiceId);
      setStep(1);
    } else {
      setServiceId(null);
      setStep(0);
    }
  }, [open, initialServiceId]);

  const service = ALL_SERVICES.find((s) => s.id === serviceId) ?? null;
  const barber = BARBERS.find((b) => b.id === barberId) ?? null;
  const day = days[dayIndex];
  const slots = day ? slotsFor(day, barberId) : [];

  const reset = () => {
    setStep(0);
    setServiceId(null);
    setBarberId("any");
    setSlot(null);
    setDone(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            "fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-bone/10 bg-espresso-2",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
            "duration-500 ease-[cubic-bezier(0.3,0.7,0,1)]",
          )}
        >
          <Dialog.Title className="sr-only">Book a chair at {SHOP.name}</Dialog.Title>
          <Dialog.Description className="sr-only">
            Choose a service, a barber, and a time.
          </Dialog.Description>

          <div className="flex items-center justify-between border-b border-bone/10 px-6 py-5">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-xl tracking-wide text-bone-2">
                {done ? "Chair booked" : "Book a chair"}
              </span>
              {!done && (
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                  {String(step + 1).padStart(2, "0")} / 03
                </span>
              )}
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/50 transition-colors hover:text-bone-2"
            >
              Close
            </button>
          </div>

          {done ? (
            <div className="flex flex-1 flex-col justify-center gap-6 px-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-brass">
                You're in the book
              </p>
              <p className="font-display text-4xl leading-tight tracking-wide text-bone-2">
                {service?.name}
                <br />
                with {barber ? barber.name : "the next open chair"}
              </p>
              <p className="font-mono text-sm tracking-[0.1em] text-bone/70">
                {day ? `${dayLabel(day)} ${dateLabel(day)}` : ""} · {slot}
              </p>
              <p className="max-w-[38ch] text-sm leading-relaxed text-bone/60">
                Walk in a few minutes early. If the street is busy we'll still find you a chair —
                call {SHOP.phone} and we'll hold it.
              </p>
              <button
                onClick={reset}
                className="mt-2 self-start rounded-full bg-brass px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.15em] text-espresso transition-colors hover:bg-bone-2"
              >
                Book another
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-4 border-b border-bone/10 px-6 py-3">
                {STEPS.map((label, i) => (
                  <button
                    key={label}
                    onClick={() => i < step && setStep(i)}
                    className={cn(
                      "font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
                      i === step
                        ? "text-brass"
                        : i < step
                          ? "text-bone/60 hover:text-bone-2"
                          : "text-bone/25",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                {step === 0 && (
                  <div className="space-y-8">
                    {SERVICE_GROUPS.map((group) => (
                      <div key={group.label}>
                        <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-brass">
                          {group.label}
                        </h3>
                        <ul className="space-y-1">
                          {group.services.map((item) => (
                            <li key={item.id}>
                              <button
                                onClick={() => {
                                  setServiceId(item.id);
                                  setStep(1);
                                }}
                                className={cn(
                                  "group flex w-full items-baseline gap-3 py-2 text-left text-base transition-colors",
                                  serviceId === item.id ? "text-bone-2" : "text-bone/80 hover:text-bone-2",
                                )}
                              >
                                <span className="shrink-0">{item.name}</span>
                                <span className="leader" />
                                <span className="font-mono text-sm text-brass">${item.price}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setBarberId("any");
                        setStep(2);
                      }}
                      className="flex w-full items-baseline gap-3 border-b border-bone/10 py-3 text-left text-base text-bone/80 transition-colors hover:text-bone-2"
                    >
                      <span>Next open chair</span>
                      <span className="leader" />
                      <span className="font-mono text-xs text-brass">fastest</span>
                    </button>
                    {BARBERS.map((person) => (
                      <button
                        key={person.id}
                        onClick={() => {
                          setBarberId(person.id);
                          setStep(2);
                        }}
                        className="flex w-full items-center gap-4 border-b border-bone/10 py-3 text-left transition-colors hover:bg-bone/5"
                      >
                        <img
                          src={person.photo}
                          alt={person.name}
                          width={1088}
                          height={1440}
                          loading="lazy"
                          className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-bone/15"
                        />
                        <span className="flex-1">
                          <span className="block font-display text-lg tracking-wide text-bone-2">
                            {person.name}
                          </span>
                          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                            {person.role}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-4">
                      {days.map((date, i) => (
                        <button
                          key={date.toISOString()}
                          onClick={() => {
                            setDayIndex(i);
                            setSlot(null);
                          }}
                          className={cn(
                            "shrink-0 rounded-[min(1vw,10px)] px-4 py-3 text-center transition-colors",
                            i === dayIndex
                              ? "bg-oxblood text-bone-2 ring-1 ring-oxblood-2/60"
                              : "bg-bone/5 text-bone/70 ring-1 ring-bone/10 hover:bg-bone/10",
                          )}
                        >
                          <span className="block font-mono text-[10px] uppercase tracking-[0.2em]">
                            {dayLabel(date)}
                          </span>
                          <span className="mt-1 block text-sm text-bone-2">{dateLabel(date)}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {slots.map((item) => (
                        <button
                          key={item.at}
                          disabled={item.taken}
                          onClick={() => setSlot(item.at)}
                          className={cn(
                            "rounded-[min(1vw,8px)] px-2 py-2.5 font-mono text-xs tracking-[0.05em] transition-colors",
                            item.taken
                              ? "cursor-not-allowed bg-bone/5 text-bone/20 line-through"
                              : slot === item.at
                                ? "bg-brass text-espresso"
                                : "bg-bone/5 text-bone/80 ring-1 ring-bone/10 hover:bg-bone/10",
                          )}
                        >
                          {item.at}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-bone/10 px-6 py-5">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45">
                  {service ? service.name : "No service yet"}
                  {" · "}
                  {barber ? barber.name : "Next open chair"}
                  {slot ? ` · ${slot}` : ""}
                </p>
                {step === 2 && slot ? (
                  <button
                    onClick={() => setDone(true)}
                    className="w-full rounded-full bg-oxblood px-6 py-4 font-mono text-sm font-medium uppercase tracking-[0.15em] text-bone-2 ring-1 ring-oxblood-2/60 transition-colors hover:bg-oxblood-2"
                  >
                    Confirm booking
                  </button>
                ) : (
                  <button
                    onClick={() => setStep((s) => Math.min(2, s + 1))}
                    disabled={step > 0 && !service}
                    className="w-full rounded-full bg-brass px-6 py-4 font-mono text-sm font-medium uppercase tracking-[0.15em] text-espresso transition-colors hover:bg-bone-2 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {step === 0 ? "Choose a barber" : step === 1 ? "Pick a time" : "Pick a time"}
                  </button>
                )}
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
