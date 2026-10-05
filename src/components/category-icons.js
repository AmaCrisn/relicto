// Ikon kategori Relicto (JavaScript/JSX). Gaya sama dengan ikon antarmuka:
// garis 24x24, warna mengikuti teks (currentColor), jadi ubah lewat kelas Tailwind:
//   <BookIcon className="size-8 text-foreground" />

function Icon({ children, className = "size-6", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export const BookIcon = (props) => (
  <Icon {...props}>
    <path d="M12 6.5C10.4 5.4 8.2 5 5.5 5H4v12.5h1.5c2.7 0 4.9.4 6.5 1.5 1.6-1.1 3.8-1.5 6.5-1.5H20V5h-1.5c-2.7 0-4.9.4-6.5 1.5z" />
    <path d="M12 6.5V19" />
  </Icon>
);

export const FigureIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="5.2" r="2.4" />
    <rect x="9.5" y="8.5" width="5" height="6" rx="1.5" />
    <path d="M9.5 10l-3 3.5M14.5 10l3 3.5" />
    <path d="M10.5 14.5 9.5 21M13.5 14.5l1 6.5" />
    <path d="M6.5 21.5h11" />
  </Icon>
);

export const ModelKitIcon = (props) => (
  <Icon {...props}>
    <rect x="5" y="8" width="14" height="10" rx="3" />
    <path d="M12 8V4.8" />
    <circle cx="12" cy="3.9" r="1" />
    <circle cx="9.2" cy="12.6" r="1.2" />
    <circle cx="14.8" cy="12.6" r="1.2" />
    <path d="M9.5 15.7h5" />
    <path d="M3 11.5v3.5M21 11.5v3.5" />
  </Icon>
);

export const TradingCardIcon = (props) => (
  <Icon {...props}>
    <rect x="7" y="3" width="13" height="17" rx="2.5" />
    <path d="M7 3h-.5A2.5 2.5 0 0 0 4 5.5v12A2.5 2.5 0 0 0 6.5 20H7" />
    <path d="M13.5 7l1.4 3.1 3.1 1.4-3.1 1.4-1.4 3.1-1.4-3.1-3.1-1.4 3.1-1.4z" />
  </Icon>
);

export const BlindBoxIcon = (props) => (
  <Icon {...props}>
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M9.8 9.6a2.3 2.3 0 0 1 4.4.7c0 1.5-2.2 1.9-2.2 3.3" />
    <path d="M12 16.4h.01" />
  </Icon>
);

export const StationeryIcon = (props) => (
  <Icon {...props}>
    <path d="M4 20l1.2-4.6L16.4 4.2a2.12 2.12 0 0 1 3 3L8.2 18.8z" />
    <path d="M14.4 6.2l3.4 3.4M5.2 15.4l3.4 3.4" />
  </Icon>
);

export const DiecastIcon = (props) => (
  <Icon {...props}>
    <path d="M3 16.8v-3.2l2.6-.9 2.2-3.4h6.4l3 3.4 3.7.8v3.3" />
    <path d="M3 16.8h2.1M9.3 16.8h5.4M18.9 16.8h2" />
    <path d="M5.6 12.7h11.6M11 9.3v3.4" />
    <circle cx="7.2" cy="16.8" r="2.1" />
    <circle cx="16.8" cy="16.8" r="2.1" />
  </Icon>
);

export const DisplayIcon = (props) => (
  <Icon {...props}>
    <rect x="3.5" y="3" width="17" height="18" rx="2" />
    <path d="M3.5 12h17" />
    <circle cx="9" cy="8.4" r="2.3" />
    <rect x="13.2" y="6" width="4" height="5" rx="0.8" />
    <rect x="7" y="15.2" width="4" height="4.8" rx="0.8" />
    <circle cx="15.6" cy="17.7" r="2.3" />
  </Icon>
);

// Pemetaan slug kategori -> ikon, supaya grid kategori bisa langsung memakainya
export const categoryIcons = {
  "buku-bekas": BookIcon,
  "action-figure": FigureIcon,
  "model-kit": ModelKitIcon,
  "trading-card": TradingCardIcon,
  "blind-box": BlindBoxIcon,
  "stationery": StationeryIcon,
  "diecast": DiecastIcon,
  "aksesori-display": DisplayIcon,
};