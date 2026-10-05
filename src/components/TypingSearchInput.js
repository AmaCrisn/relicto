"use client";

import { useEffect, useState } from "react";
import { SearchIcon } from "@/components/icons";

const DEFAULT_PHRASES = [
  "Cari komik langka...",
  "Cari action figure...",
  "Cari trading card...",
  "Cari stationery...",
];

const STATIC_PLACEHOLDER = "Cari produk di Relicto";

export default function TypingSearchInput({
  phrases = DEFAULT_PHRASES,
  className = "",
  onFocus,
  onBlur,
  ...props
}) {
  // Awal render menampilkan kalimat penuh (aman untuk SSR dan tanpa kedip)
  const [placeholder, setPlaceholder] = useState(phrases[0]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Berhenti saat input difokuskan, atau jika pengguna memilih mengurangi animasi
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let deleting = true; // mulai dengan menghapus kalimat pertama
    let timer;

    function tick() {
      const phrase = phrases[phraseIndex];
      charIndex += deleting ? -1 : 1;
      setPlaceholder(phrase.slice(0, charIndex));

      let delay = deleting ? 35 : 70; // kecepatan hapus dan ketik (ms)
      if (!deleting && charIndex === phrase.length) {
        deleting = true;
        delay = 1500; // jeda saat kalimat sudah lengkap
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400; // jeda sebelum kalimat berikutnya
      }
      timer = setTimeout(tick, delay);
    }

    timer = setTimeout(tick, 1500);
    return () => clearTimeout(timer);
  }, [paused, phrases]);

  return (
    <label className="relative block">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted" />
      <input
        type="search"
        aria-label="Cari produk"
        placeholder={placeholder}
        className={`w-full rounded-lg border border-border bg-surface py-2 pl-10 pr-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none ${className}`}
        onFocus={(e) => {
          setPaused(true);
          setPlaceholder(STATIC_PLACEHOLDER);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          if (!e.target.value) setPaused(false);
          onBlur?.(e);
        }}
        {...props}
      />
    </label>
  );
}
