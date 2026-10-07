import { CartIcon, FavoriteIcon, AccountIcon, HistoryIcon, DiscountIcon } from "@/components/icons";

export const navigations = [
    { label: "Keranjang", href: "/keranjang", Icon: CartIcon },
    { label: "Favorit", href: "/favorit", Icon: FavoriteIcon },
    { label: "Riwayat transaksi", href: "/transaksi", Icon: HistoryIcon },
    { label: "Akun", href: "/akun", Icon: AccountIcon },
];

export const BANNERS = [
  {
    id: "diskon",
    title: "Diskon Spesial",
    subtitle: "Potongan harga untuk koleksi pilihan",
    cta: "Lihat promo",
    href: "/produk?promo=diskon",
    span: "md:col-span-1",
    tone: "bg-highlight text-highlight-foreground",
    Icon: DiscountIcon,
  },
  {
    id: "terbaru",
    title: "Koleksi Terbaru",
    subtitle: "Barang-barang langka yang baru saja tiba",
    cta: "Jelajahi koleksi",
    href: "/produk?urut=terbaru",
    span: "md:col-span-2",
    tone: "bg-accent text-white",
    Icon: CartIcon,
  },
  {
    id: "langka",
    title: "Edisi Langka",
    subtitle: "Stok terbatas. Siapa cepat dia dapat",
    cta: "Buru sekarang",
    href: "/produk?label=langka",
    span: "md:col-span-2",
    tone: "bg-foreground text-background",
    Icon: FavoriteIcon,
  },
  {
    id: "bekas",
    title: "Buku & Komik Bekas",
    subtitle: "Temukan cetakan lawas",
    cta: "Lihat semua",
    href: "/produk?kategori=buku-bekas",
    span: "md:col-span-1",
    tone: "bg-surface-2 text-foreground border border-border",
    Icon: HistoryIcon,
  },
];


// Data dummy Relicto untuk mengerjakan UI frontend sebelum database siap.
// Bentuk data sengaja meniru tabel Supabase (products, product_images, categories)
// supaya nanti cukup mengganti sumbernya tanpa mengubah komponen.
// Field bertanda "[UI]" belum ada di tabel dan hanya untuk kebutuhan tampilan.

/* ---------- Helper ---------- */

export const SHIPPING_COST = 15000;
export const FREE_SHIPPING_MIN = 500000;

export function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatTanggal(iso) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

// Gambar placeholder (data URI SVG). Pakai dengan <img> biasa,
// atau <Image unoptimized /> kalau memakai next/image.
export function placeholderImage(label, hue = 170) {
  const safe = String(label).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">` +
    `<rect width="400" height="400" fill="hsl(${hue} 28% 90%)"/>` +
    `<rect x="48" y="48" width="304" height="304" rx="28" fill="hsl(${hue} 32% 80%)"/>` +
    `<text x="200" y="208" text-anchor="middle" font-family="system-ui,sans-serif" font-size="26" fill="hsl(${hue} 40% 24%)">${safe}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* ---------- Kategori ---------- */

export const categories = [
  { id: 1, name: "Buku Bekas", slug: "buku-bekas", sort_order: 1, hue: 28 },
  { id: 2, name: "Action Figure", slug: "action-figure", sort_order: 2, hue: 350 },
  { id: 3, name: "Model Kit", slug: "model-kit", sort_order: 3, hue: 215 },
  { id: 4, name: "Trading Card", slug: "trading-card", sort_order: 4, hue: 270 },
  { id: 5, name: "Blind Box", slug: "blind-box", sort_order: 5, hue: 320 },
  { id: 6, name: "Stationery Estetik", slug: "stationery", sort_order: 6, hue: 160 },
  { id: 7, name: "Diecast Miniatur", slug: "diecast", sort_order: 7, hue: 8 },
  { id: 8, name: "Aksesoris & Display", slug: "aksesori-display", sort_order: 8, hue: 190 },
];

const hueOf = (slug) => categories.find((c) => c.slug === slug)?.hue ?? 170;

/* ---------- Produk ---------- */

function makeProduct(p) {
  const hue = hueOf(p.category_slug);
  return {
    discount_percent: 0, // [UI]
    label: null, // [UI] "langka" | null
    rating: 4.5, // [UI]
    sold: 0, // [UI]
    ...p,
    product_images: [1, 2, 3].map((n, i) => ({
      url: placeholderImage(`${p.id} · Foto ${n}`, hue),
      sort_order: i,
    })),
  };
}

const additionalProductCatalog = {
  "buku-bekas": {
    names: ["Komik Petualangan", "Novel Misteri", "Buku Cerita Klasik", "Komik Fantasi"],
    price: 85000,
    description: "Buku koleksi dalam kondisi terawat, cocok untuk melengkapi koleksi bacaan klasik.",
  },
  "action-figure": {
    names: ["Figure Pahlawan Galaksi", "Figure Ksatria Legendaris", "Mini Figure Robot", "Patung Karakter Fantasi"],
    price: 320000,
    description: "Figur koleksi dengan detail menarik, dilengkapi kemasan untuk dipajang atau disimpan.",
  },
  "model-kit": {
    names: ["Model Kit Robot", "Model Kit Pesawat", "Model Kit Kendaraan Tempur", "Model Kit Kapal Eksplorasi"],
    price: 245000,
    description: "Kit rakitan dengan komponen detail untuk kolektor dan penggemar model miniatur.",
  },
  "trading-card": {
    names: ["Kartu Naga Elemental", "Kartu Pahlawan Legendaris", "Kartu Koleksi Holografik", "Paket Kartu Petualangan"],
    price: 75000,
    description: "Kartu koleksi disimpan dalam pelindung untuk membantu menjaga kondisi permukaannya.",
  },
  "blind-box": {
    names: ["Blind Box Hewan Imut", "Blind Box Petualangan", "Miniatur Misteri", "Blind Box Dunia Fantasi"],
    price: 95000,
    description: "Figur kejutan dengan desain acak, cocok untuk dikoleksi atau dijadikan hadiah.",
  },
  stationery: {
    names: ["Notebook Ilustrasi", "Set Pulpen Warna", "Sticker Koleksi", "Memo Pad Estetik"],
    price: 42000,
    description: "Perlengkapan tulis dengan desain menarik untuk kebutuhan harian dan koleksi.",
  },
  diecast: {
    names: ["Die-cast Mobil Sport", "Die-cast Mobil Klasik", "Die-cast Kendaraan Balap", "Die-cast Truk Mini"],
    price: 175000,
    description: "Miniatur kendaraan dengan detail eksterior dan roda yang dapat berputar.",
  },
  "aksesori-display": {
    names: ["Stand Display Akrilik", "Kotak Pelindung Koleksi", "Rak Miniatur", "Sleeve Koleksi Premium"],
    price: 55000,
    description: "Aksesori untuk menyimpan, melindungi, atau memajang koleksi kesayangan.",
  },
};

export const products = [
  makeProduct({ id: "ITM_1", name: "Komik Petualangan Samurai Jilid 1 (Cetakan 1998)", price: 185000, stock: 1, category_slug: "buku-bekas", label: "langka", condition: "Bekas - Baik", rating: 4.9, sold: 3, created_at: "2026-09-30T08:00:00Z",
    description: "Cetakan pertama tahun 1998 dengan sampul asli yang masih utuh. Ada sedikit pudar di bagian punggung buku, halaman dalam bersih tanpa coretan. Cocok untuk kolektor komik klasik." }),
  makeProduct({ id: "ITM_2", name: "Novel Fantasi Klasik Hardcover", price: 120000, stock: 3, category_slug: "buku-bekas", condition: "Bekas - Mint", rating: 4.7, sold: 12, created_at: "2026-09-26T08:00:00Z",
    description: "Edisi sampul keras dengan ilustrasi peta di halaman awal. Kondisi hampir seperti baru, disimpan di rak kaca dan tidak pernah dilipat." }),
  makeProduct({ id: "ITM_3", name: "Action Figure Ksatria Baja Skala 1:12", price: 450000, discount_percent: 15, stock: 5, category_slug: "action-figure", condition: "Baru", rating: 4.8, sold: 27, created_at: "2026-10-02T08:00:00Z",
    description: "Figur artikulasi penuh dengan 24 titik gerak, dilengkapi pedang, perisai, dan tiga pasang tangan pengganti. Tinggi sekitar 16 cm, dikemas dalam kotak window box." }),
  makeProduct({ id: "ITM_4", name: "Statue Naga Resin Edisi Terbatas", price: 1250000, stock: 1, category_slug: "action-figure", label: "langka", condition: "Baru", rating: 5.0, sold: 1, created_at: "2026-10-01T08:00:00Z",
    description: "Patung resin dicat tangan, nomor produksi 37 dari 100 unit. Tinggi 28 cm dengan alas kayu. Dilengkapi sertifikat keaslian bernomor." }),
  makeProduct({ id: "ITM_5", name: "Model Kit Robot Tempur Skala 1/144", price: 275000, stock: 8, category_slug: "model-kit", condition: "Baru", rating: 4.6, sold: 41, created_at: "2026-09-28T08:00:00Z",
    description: "Kit rakitan snap-fit tanpa lem, sudah berwarna sebagian. Isi satu runner senjata tambahan dan stiker air untuk detail. Cocok untuk pemula sampai menengah." }),
  makeProduct({ id: "ITM_6", name: "Die-cast Mobil Klasik Skala 1:43", price: 165000, discount_percent: 10, stock: 12, category_slug: "diecast", condition: "Baru", rating: 4.5, sold: 33, created_at: "2026-09-20T08:00:00Z",
    description: "Miniatur logam dengan pintu yang bisa dibuka dan roda berputar. Disertai kotak akrilik kecil untuk dipajang." }),
  makeProduct({ id: "ITM_7", name: "Starter Deck Penyihir (60 Kartu)", price: 95000, stock: 20, category_slug: "trading-card", condition: "Baru", rating: 4.4, sold: 58, created_at: "2026-09-18T08:00:00Z",
    description: "Dek siap main berisi 60 kartu, buku panduan singkat, dan satu kartu promo eksklusif. Cocok untuk yang baru mulai mengoleksi dan bermain." }),
  makeProduct({ id: "ITM_8", name: "Kartu Holo Naga Emas (Single)", price: 650000, stock: 1, category_slug: "trading-card", label: "langka", condition: "Mint", rating: 5.0, sold: 2, created_at: "2026-10-03T08:00:00Z",
    description: "Kartu langka berlapis holografik, sudah dimasukkan ke sleeve dan toploader sejak dibuka dari booster. Tanpa goresan di permukaan maupun sudut." }),
  makeProduct({ id: "ITM_9", name: "Blind Box Seri Kucing Astronot", price: 89000, stock: 30, category_slug: "blind-box", condition: "Baru", rating: 4.7, sold: 120, created_at: "2026-09-25T08:00:00Z",
    description: "Satu kotak berisi satu figur acak dari 12 desain, termasuk satu varian rahasia. Tinggi figur sekitar 7 cm." }),
  makeProduct({ id: "ITM_10", name: "Dino Mini Set 6 Pcs", price: 135000, discount_percent: 20, stock: 14, category_slug: "blind-box", condition: "Baru", rating: 4.3, sold: 64, created_at: "2026-09-12T08:00:00Z",
    description: "Enam figur dinosaurus mini dengan detail tekstur kulit. Bahan PVC aman, ukuran 5 sampai 8 cm." }),
  makeProduct({ id: "ITM_11", name: "Notebook Sampul Kain Vintage", price: 58000, stock: 40, category_slug: "stationery", condition: "Baru", rating: 4.6, sold: 88, created_at: "2026-09-10T08:00:00Z",
    description: "Buku catatan A5, 160 halaman kertas krem tanpa garis, jilid benang dengan sampul kain bermotif." }),
  makeProduct({ id: "ITM_12", name: "Set Sticker Holografik Retro", price: 35000, stock: 60, category_slug: "stationery", condition: "Baru", rating: 4.5, sold: 150, created_at: "2026-09-08T08:00:00Z",
    description: "Isi 30 lembar sticker tahan air dengan efek holografik. Desain bertema arcade dan kaset." }),
  makeProduct({ id: "ITM_13", name: "Die-cast Mobil Balap Edisi Langka Skala 1:18", price: 520000, stock: 2, category_slug: "diecast", label: "langka", condition: "Baru", rating: 4.9, sold: 6, created_at: "2026-09-29T08:00:00Z",
    description: "Replika mobil balap skala besar dengan kap mesin dan pintu yang bisa dibuka, interior detail, dan ban karet. Produksi terbatas, dilengkapi kotak asli dan sertifikat." }),
  makeProduct({ id: "ITM_14", name: "Model Kit Pesawat Tempur Skala 1/72", price: 240000, stock: 6, category_slug: "model-kit", condition: "Baru", rating: 4.5, sold: 14, created_at: "2026-09-15T08:00:00Z",
    description: "Kit plastik injeksi lengkap dengan kanopi transparan dan decal air. Perlu lem dan cat, cocok untuk perakit tingkat menengah." }),
  makeProduct({ id: "ITM_15", name: "Rak Display Akrilik 3 Tingkat", price: 210000, discount_percent: 5, stock: 9, category_slug: "aksesori-display", condition: "Baru", rating: 4.7, sold: 36, created_at: "2026-09-05T08:00:00Z",
    description: "Rak transparan dengan penutup debu, muat sekitar 6 figur ukuran 10 sampai 15 cm. Mudah dirakit tanpa alat." }),
  makeProduct({ id: "ITM_16", name: "Sleeve Kartu Premium (100 pcs)", price: 45000, stock: 50, category_slug: "aksesori-display", condition: "Baru", rating: 4.4, sold: 210, created_at: "2026-09-02T08:00:00Z",
    description: "Sleeve bening tebal bebas asam untuk kartu ukuran standar. Melindungi dari goresan, debu, dan lecet." }),
  ...Array.from({ length: 84 }, (_, index) => {
    const id = index + 17;
    const category = categories[index % categories.length];
    const catalog = additionalProductCatalog[category.slug];
    const name = catalog.names[Math.floor(index / categories.length) % catalog.names.length];
    const discount_percent = [0, 0, 10, 0, 15][id % 5];
    const day = (id * 7) % 35 + 1;

    return makeProduct({
      id: `ITM_${id}`,
      name: `${name} - Koleksi ${id}`,
      price: Math.round((catalog.price * (85 + ((id * 13) % 31))) / 100 / 1000) * 1000,
      stock: (id * 11) % 50 + 1,
      category_slug: category.slug,
      condition: category.slug === "buku-bekas" ? "Bekas - Baik" : "Baru",
      discount_percent,
      label: id % 13 === 0 ? "langka" : null,
      rating: Number((4 + ((id * 7) % 10) / 10).toFixed(1)),
      sold: (id * 17) % 250,
      created_at: new Date(Date.UTC(2026, 8, day, 8)).toISOString(),
      description: catalog.description,
    });
  }),
];

export const reviews = [
  { product_id: "ITM_3", author: "Dimas", rating: 5, date: "2026-10-03", comment: "Sendinya lentur dan detailnya rapi. Pengemasan aman sekali." },
  { product_id: "ITM_3", author: "Sari", rating: 4, date: "2026-09-29", comment: "Bagus, tapi tangan pengganti agak ketat saat dipasang." },
  { product_id: "ITM_5", author: "Bayu", rating: 5, date: "2026-09-30", comment: "Gampang dirakit, potongan runner bersih. Recommended untuk pemula." },
  { product_id: "ITM_7", author: "Nadia", rating: 4, date: "2026-09-27", comment: "Dek langsung bisa dipakai main, kartu promonya bagus." },
  { product_id: "ITM_9", author: "Rina", rating: 5, date: "2026-10-01", comment: "Dapat varian rahasia! Seneng banget." },
  { product_id: "ITM_9", author: "Fajar", rating: 4, date: "2026-09-28", comment: "Lucu, kualitas cat rapi. Dapat desain yang sama dengan koleksi lama." },
  { product_id: "ITM_11", author: "Alya", rating: 5, date: "2026-09-22", comment: "Kertasnya enak ditulis, sampulnya cantik." },
  { product_id: "ITM_2", author: "Hendra", rating: 5, date: "2026-09-27", comment: "Kondisi sesuai deskripsi, hampir seperti baru." },
];

/* ---------- Fungsi data produk ---------- */

export function finalPrice(product) {
  return Math.round(product.price * (1 - (product.discount_percent || 0) / 100));
}

export function getProduct(id) {
  return products.find((p) => p.id === id) ?? null;
}

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug) ?? null;
}

export function getRelatedProducts(id, limit = 4) {
  const current = getProduct(id);
  if (!current) return [];
  return products.filter((p) => p.id !== id && p.category_slug === current.category_slug).slice(0, limit);
}

export function getProductReviews(id) {
  return reviews.filter((r) => r.product_id === id);
}

// Meniru parameter alamat yang dipakai banner: ?kategori= ?urut= ?label= ?promo= ?q=
export function searchProducts({ q = "", kategori, urut = "terbaru", label, promo } = {}) {
  let result = products.filter((p) => {
    if (kategori && p.category_slug !== kategori) return false;
    if (label && p.label !== label) return false;
    if (promo === "diskon" && !p.discount_percent) return false;
    if (q) {
      const keyword = q.trim().toLowerCase();
      const kategoriNama = getCategory(p.category_slug)?.name.toLowerCase() ?? "";
      const haystack = `${p.name} ${p.description} ${kategoriNama}`.toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }
    return true;
  });

  const sorters = {
    terbaru: (a, b) => new Date(b.created_at) - new Date(a.created_at),
    termurah: (a, b) => finalPrice(a) - finalPrice(b),
    termahal: (a, b) => finalPrice(b) - finalPrice(a),
    terlaris: (a, b) => b.sold - a.sold,
  };
  return result.sort(sorters[urut] ?? sorters.terbaru);
}

/* ---------- Favorit & keranjang ---------- */

export const favoriteIds = ["ITM_4", "ITM_8", "ITM_5", "ITM_9"];

export function getFavorites() {
  return favoriteIds.map(getProduct).filter(Boolean);
}

export const cartItems = [
  { product_id: "ITM_3", qty: 1 },
  { product_id: "ITM_9", qty: 2 },
  { product_id: "ITM_16", qty: 1 },
];

// Gabungkan item keranjang dengan data produknya
export function getCartDetails(items = cartItems) {
  return items
    .map((item) => {
      const product = getProduct(item.product_id);
      if (!product) return null;
      const unitPrice = finalPrice(product);
      return { ...item, product, unitPrice, lineTotal: unitPrice * item.qty };
    })
    .filter(Boolean);
}

export const vouchers = [
  { code: "RELICTO10", title: "Diskon 10%", description: "Min. belanja Rp200.000, maks. potongan Rp50.000", type: "percent", value: 10, min_spend: 200000, max_discount: 50000, valid_until: "2026-12-31" },
  { code: "KOLEKTOR25K", title: "Potongan Rp25.000", description: "Min. belanja Rp300.000", type: "fixed", value: 25000, min_spend: 300000, max_discount: 25000, valid_until: "2026-11-30" },
  { code: "HEMAT15", title: "Potongan Rp15.000", description: "Min. belanja Rp100.000", type: "fixed", value: 15000, min_spend: 100000, max_discount: 15000, valid_until: "2026-10-31" },
];

export function cartSummary(details, voucherCode) {
  const subtotal = details.reduce((sum, d) => sum + d.lineTotal, 0);
  const voucher = vouchers.find((v) => v.code === voucherCode);
  let discount = 0;
  if (voucher && subtotal >= voucher.min_spend) {
    discount = voucher.type === "percent" ? Math.min(Math.round((subtotal * voucher.value) / 100), voucher.max_discount) : voucher.value;
  }
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST;
  return { subtotal, discount, shipping, total: subtotal - discount + shipping, voucher: discount > 0 ? voucher : null };
}

/* ---------- Akun ---------- */

export const user = {
  id: "user-demo-1",
  name: "Pengguna Demo",
  email: "demo@relicto.id",
  phone: "0812-3456-7890",
  joined_at: "2026-08-14T00:00:00Z",
  role: "buyer",
};

export const addresses = [
  { id: 1, label: "Rumah", recipient: "Pengguna Demo", phone: "0812-3456-7890", street: "Jl. Contoh Raya No. 12, RT 03/RW 05", district: "Cilandak", city: "Jakarta Selatan", province: "DKI Jakarta", postal_code: "12430", is_default: true },
  { id: 2, label: "Kantor", recipient: "Pengguna Demo", phone: "0812-3456-7890", street: "Jl. Percobaan Blok B No. 7", district: "Kebayoran Baru", city: "Jakarta Selatan", province: "DKI Jakarta", postal_code: "12120", is_default: false },
];

export const paymentMethods = [
  { id: 1, type: "Transfer Bank", name: "Bank Contoh", detail: "**** 4417", is_default: true },
  { id: 2, type: "E-Wallet", name: "Dompet Digital", detail: "0812-****-7890", is_default: false },
  { id: 3, type: "COD", name: "Bayar di Tempat", detail: "Tersedia untuk Jabodetabek", is_default: false },
];

export const ORDER_STATUS = {
  menunggu: "Menunggu Pembayaran",
  dikemas: "Dikemas",
  dikirim: "Dikirim",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
};

const rawOrders = [
  { id: "ORD-20261003-001", created_at: "2026-10-03T14:20:00Z", status: "dikemas", payment: "Transfer Bank", address_id: 1, tracking: null, discount: 0,
    items: [{ product_id: "ITM_5", qty: 1 }, { product_id: "ITM_16", qty: 2 }] },
  { id: "ORD-20260928-004", created_at: "2026-09-28T09:05:00Z", status: "dikirim", payment: "E-Wallet", address_id: 1, tracking: "RLC829104772", discount: 15000,
    items: [{ product_id: "ITM_9", qty: 2 }, { product_id: "ITM_11", qty: 1 }] },
  { id: "ORD-20260915-002", created_at: "2026-09-15T19:40:00Z", status: "selesai", payment: "Transfer Bank", address_id: 2, tracking: "RLC771203958", discount: 0,
    items: [{ product_id: "ITM_2", qty: 1 }, { product_id: "ITM_1", qty: 1 }] },
  { id: "ORD-20260901-003", created_at: "2026-09-01T11:10:00Z", status: "dibatalkan", payment: "COD", address_id: 1, tracking: null, discount: 0,
    items: [{ product_id: "ITM_13", qty: 1 }] },
];

// Harga item dikunci saat pesanan dibuat; total dihitung otomatis
export const orders = rawOrders.map((o) => {
  const items = o.items.map((i) => {
    const product = getProduct(i.product_id);
    return { ...i, product, price: finalPrice(product) };
  });
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST;
  return { ...o, items, subtotal, shipping, total: subtotal - o.discount + shipping, address: addresses.find((a) => a.id === o.address_id) };
});

export function getOrder(id) {
  return orders.find((o) => o.id === id) ?? null;
}