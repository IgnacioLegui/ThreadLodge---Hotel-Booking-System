"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { CalendarIcon, ArrowRight, Star, Shield, Sparkles } from "lucide-react";
import RoomCarousel from "@/components/room-carousel";
import ScrollAnimate from "@/components/scroll-animate";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useLanguage } from "@/components/language-provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function HomePage() {
  const router = useRouter();
  const { locale, t } = useLanguage();
  const dateLocale = locale === "es" ? es : enUS;

  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();

  const handleSearch = () => {
    if (!checkIn || !checkOut) return;
    const ci = format(checkIn, "yyyy-MM-dd");
    const co = format(checkOut, "yyyy-MM-dd");
    router.push(`/habitaciones/${ci}/${co}`);
  };

  const today = new Date();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-neutral-950">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 transition-transform duration-[20000ms] hover:scale-110"
          style={{ backgroundImage: "url('/images/hotel-hero.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/40 to-neutral-950" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <ScrollAnimate animation="fade" duration={1000}>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
              {t("hero.tag")}
            </p>
          </ScrollAnimate>

          <ScrollAnimate animation="fade-up" delay={200} duration={1000}>
            <h1 className="font-playfair text-5xl font-light leading-tight text-white md:text-7xl">
              {t("hero.title1")}
              <br />
              <span className="italic">{t("hero.title2")}</span>
            </h1>
          </ScrollAnimate>

          <ScrollAnimate animation="fade-up" delay={400} duration={1000}>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-neutral-400">
              {t("hero.subtitle")}
            </p>
          </ScrollAnimate>

          {/* Search Bar */}
          <ScrollAnimate animation="fade-up" delay={600} duration={1000}>
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="flex flex-col items-stretch gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.08] sm:flex-row sm:items-center">
                {/* Check-in */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-12 flex-1 justify-start gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-normal text-neutral-300 transition-all hover:bg-white/10 hover:text-white"
                    >
                      <CalendarIcon className="h-4 w-4 text-neutral-500" />
                      {checkIn
                        ? format(checkIn, "dd MMM yyyy", { locale: dateLocale })
                        : t("hero.checkin")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      locale={dateLocale}
                      onSelect={(date) => {
                        setCheckIn(date);
                        if (date && checkOut && date >= checkOut) {
                          setCheckOut(undefined);
                        }
                      }}
                      disabled={(date) => date < today}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {/* Check-out */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-12 flex-1 justify-start gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-normal text-neutral-300 transition-all hover:bg-white/10 hover:text-white"
                    >
                      <CalendarIcon className="h-4 w-4 text-neutral-500" />
                      {checkOut
                        ? format(checkOut, "dd MMM yyyy", { locale: dateLocale })
                        : t("hero.checkout")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      locale={dateLocale}
                      onSelect={setCheckOut}
                      disabled={(date) =>
                        date < today || (checkIn ? date <= checkIn : false)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {/* Search button */}
                <Button
                  onClick={handleSearch}
                  disabled={!checkIn || !checkOut}
                  className="group h-12 gap-2 rounded-xl bg-white px-6 text-sm font-medium text-neutral-900 transition-all duration-300 hover:bg-neutral-100 hover:shadow-lg hover:shadow-white/10 disabled:opacity-40"
                >
                  {t("hero.search")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </ScrollAnimate>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500">
              {t("hero.scroll")}
            </span>
            <div className="h-8 w-[1px] animate-pulse bg-gradient-to-b from-neutral-500 to-transparent" />
          </div>
        </div>
      </section>

      {/* Habitaciones Section */}
      <section id="habitaciones" className="scroll-mt-20 bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollAnimate animation="fade-up">
            <div className="mb-12 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
                {t("rooms.tag")}
              </p>
              <h2 className="mt-3 font-playfair text-3xl font-light text-neutral-900">
                {t("rooms.title")}
              </h2>
            </div>
          </ScrollAnimate>

          {/* Room Photo Carousel */}
          <ScrollAnimate animation="zoom" duration={900}>
            <div className="mb-20 pb-6">
              <RoomCarousel />
            </div>
          </ScrollAnimate>

          <ScrollAnimate animation="fade-up">
            <div className="mb-16 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
                {t("rooms.whyTag")}
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                icon: Star,
                title: t("rooms.feature1.title"),
                desc: t("rooms.feature1.desc"),
              },
              {
                icon: Shield,
                title: t("rooms.feature2.title"),
                desc: t("rooms.feature2.desc"),
              },
              {
                icon: Sparkles,
                title: t("rooms.feature3.title"),
                desc: t("rooms.feature3.desc"),
              },
            ].map((feature, i) => (
              <ScrollAnimate key={i} animation="fade-up" delay={i * 150}>
                <div className="group text-center">
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 transition-all duration-300 group-hover:bg-neutral-900 group-hover:shadow-lg">
                    <feature.icon className="h-5 w-5 text-neutral-600 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold tracking-wide text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-500">
                    {feature.desc}
                  </p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="scroll-mt-20 border-t border-neutral-100 bg-neutral-50 py-24">
        <ScrollAnimate animation="fade-up">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
              {t("contact.tag")}
            </p>
            <h2 className="mt-3 font-playfair text-3xl font-light text-neutral-900">
              {t("contact.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
              {t("contact.subtitle")}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
              <a
                href="mailto:reservas@threadlodge.com"
                className="text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900"
              >
                reservas@threadlodge.com
              </a>
              <span className="hidden text-neutral-300 sm:inline">|</span>
              <span className="text-sm font-medium text-neutral-700">
                +54 11 5555-0100
              </span>
            </div>
          </div>
        </ScrollAnimate>
      </section>
    </div>
  );
}
