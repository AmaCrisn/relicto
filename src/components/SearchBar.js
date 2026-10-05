"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TypingSearchInput from "./TypingSearchInput";
import { SearchIcon } from "./icons";

// Sesuaikan dengan alamat halaman katalog Anda
const SEARCH_PATH = "/cari";

// Sementara berupa daftar tetap; nanti bisa diganti hasil query Supabase
const SUGGESTIONS = [
  "Komik edisi pertama",
  "Action figure",
  "Trading card",
  "Model kit",
  "Die-cast miniatur",
  "Stationery estetik",
  "Buku bekas langka",
];

export default function SearchBar({ phrases, onActiveChange }) {
  const router = useRouter();
  const wrapperRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);

  function setOpen(value) {
    setActive(value);
    onActiveChange?.(value); // kabari Navbar agar overlay ikut muncul/hilang
  }

  function submit(text) {
    const keyword = text.trim();
    setOpen(false);
    document.activeElement?.blur();
    if (keyword) {
      router.push(`${SEARCH_PATH}?cari=${encodeURIComponent(keyword)}`);
    }
  }

  const keyword = query.trim().toLowerCase();
  const results = keyword
    ? SUGGESTIONS.filter((s) => s.toLowerCase().includes(keyword))
    : SUGGESTIONS;

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        // tutup hanya jika fokus benar-benar keluar dari area pencarian
        if (!wrapperRef.current.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          e.target.blur?.();
        }
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
      >
        <TypingSearchInput
          phrases={phrases}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {active && (
        <div
          // mencegah input kehilangan fokus saat saran diklik
          onMouseDown={(e) => e.preventDefault()}
          className="absolute inset-x-0 top-full z-50 mt-2 max-h-[50vh] overflow-y-auto overscroll-contain rounded-xl border border-border bg-surface shadow-lg"
        >
          <p className="px-4 pb-1 pt-3 text-xs text-muted">
            {keyword ? "Saran pencarian" : "Pencarian populer"}
          </p>
          <ul className="pb-2">
            {results.length > 0 ? (
              results.map((text) => (
                <li key={text}>
                  <button
                    type="button"
                    onClick={() => submit(text)}
                    className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-foreground transition-colors hover:bg-surface-2"
                  >
                    <SearchIcon className="size-4 shrink-0 text-muted" />
                    {text}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-muted">
                Tidak ada saran untuk &quot;{query}&quot;
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
