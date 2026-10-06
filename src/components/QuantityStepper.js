"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "./icons";

// Input jumlah dengan tombol - dan +. Nilainya dipegang oleh komponen induk:
//   const [qty, setQty] = useState(1);
//   <QuantityStepper value={qty} onChange={setQty} max={product.stock} />
export default function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  // Teks sementara saat pengguna mengetik (boleh kosong), null = tampilkan nilai asli
  const [draft, setDraft] = useState(null);
  const shown = draft ?? String(value);

  const clamp = (n) => Math.min(max, Math.max(min, n));

  // Dipanggil saat selesai mengetik: ubah teks jadi angka yang valid
  function commit() {
    if (draft !== null) {
      const n = parseInt(draft, 10);
      onChange(Number.isNaN(n) ? value : clamp(n));
      setDraft(null);
    }
  }

  const buttonClass =
    "rounded-md text-accent transition-colors enabled:cursor-pointer enabled:hover:bg-black/10 disabled:cursor-not-allowed disabled:text-accent/35";

  return (
    <div className="flex w-fit gap-2 rounded-xl border-2 border-accent p-1 transition-colors focus-within:border-accent-hover">
      <button
        type="button"
        aria-label="Kurangi jumlah"
        disabled={value <= min}
        onClick={() => onChange(clamp(value - 1))}
        className={buttonClass}
      >
        <MinusIcon className="size-6 shrink-0" />
      </button>

      <input
        type="text"
        inputMode="numeric"
        aria-label="Jumlah"
        value={shown}
        onChange={(e) => setDraft(e.target.value.replace(/\D/g, ""))}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
        // Lebar mengikuti jumlah digit: satu karakter tambahan sebagai ruang napas
        style={{ width: `${Math.max(shown.length, 1) + 1}ch` }}
        className="bg-transparent text-center focus:outline-none"
      />

      <button
        type="button"
        aria-label="Tambah jumlah"
        disabled={value >= max}
        onClick={() => onChange(clamp(value + 1))}
        className={buttonClass}
      >
        <PlusIcon className="size-6 shrink-0" />
      </button>
    </div>
  );
}
