"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BANNERS } from "@/lib/data";

function Banner({ title, subtitle, cta, href, span, tone, Icon, image }) {
  return (
    <Link
      href={href}
      className={`group relative flex h-44 w-[85%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl p-6 transition-shadow hover:shadow-lg md:h-auto md:w-auto md:shrink ${span} ${image ? "bg-foreground text-white" : tone
        }`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 768px) 66vw, 85vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}

      {Icon && (
        <Icon className="pointer-events-none absolute -bottom-6 -right-6 size-40 opacity-15" />
      )}

      <div className="relative z-10 flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold md:text-3xl">{title}</h2>
        <p className="max-w-sm text-sm opacity-90">{subtitle}</p>
        <span className="mt-2 text-sm font-semibold underline-offset-2 group-hover:underline">
          {cta} →
        </span>
      </div>
    </Link>
  );
}

export default function HeroBanners() {
  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Lebar satu langkah geser = lebar banner + jarak antar-banner
  function getStep() {
    const el = scrollerRef.current;
    const first = el?.children[0];
    if (!el || !first) return 1;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return first.offsetWidth + gap;
  }

  function onScroll() {
    const el = scrollerRef.current;
    setActive(Math.round(el.scrollLeft / getStep()));
  }

  function goTo(index) {
    scrollerRef.current?.scrollTo({ left: index * getStep(), behavior: "smooth" });
  }

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(min-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      const el = scrollerRef.current;
      const current = Math.round(el.scrollLeft / getStep());
      const next = (current + 1) % BANNERS.length;
      goTo(next);
    }, 4000);

    return () => clearInterval(id);
  }, [paused]);

  return (
    <section aria-label="Promo dan koleksi pilihan" className="mx-auto w-full max-w-7xl py-6 px-8">
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        tabIndex={0}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-4 px-4 scrollbar-none [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:scroll-pl-8 sm:px-8 md:mx-0 md:grid md:auto-rows-60 md:grid-cols-3 md:snap-none md:overflow-visible md:px-0"
      >
        {BANNERS.map((banner) => (
          <Banner key={banner.id} {...banner} />
        ))}
      </div>

      {/* Penanda posisi carousel — hanya di layar kecil */}
      <div className="mt-3 flex justify-center gap-2 md:hidden">
        {BANNERS.map((banner, i) => (
          <button
            key={banner.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Banner ${i + 1}`}
            aria-current={i === active}
            className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-accent" : "w-2 bg-border"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
