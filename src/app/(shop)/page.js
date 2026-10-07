import Image from "next/image";
import HeroBanners from "@/components/HeroBanners";
import { categories } from "@/lib/data";
import Link from "next/link";
import { categoryIcons } from "@/components/category-icons";
import Recommendation from "@/components/productsCard";

export default function Home() {
  return (
    <div>
      {/* Rekomendasi Banner*/}
      <div className="bg-surface mb-12">
        <HeroBanners className="shrink-0" />
      </div>

      {/* Content */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8">
        {/* Kategori */}
        <div className="mb-12">
          <p className="font-bold text-2xl md:text-3xl mb-4 underline underline-offset-4 decoration-accent">Kategori</p>
          <div className="grid gap-3 grid-cols-8 sm:grid-cols-4 bg-surface rounded-xl py-6 px-6">
            {categories.map((c) => {
              const Icon = categoryIcons[c.slug];
              return (
                <Link
                  key={c.id}
                  href={`/cari?kategori=${c.slug}`}
                  className="flex justify-center flex-col items-center p-2 border-border border-2 rounded-2xl text-lg
                  hover:bg-black/5 hover:shadow-lg hover:underline underline-offset-2 decoration-2 decoration-accent
                  transition-all
                  "
                >
                  {Icon && <Icon className="size-10 text-foreground" />}
                  {c.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Rekomendasi produk */}
        <div className="mb-12">
          <p className="font-bold text-2xl md:text-3xl mb-4 underline underline-offset-4 decoration-accent">Rekomendasi</p>
          <Recommendation />
        </div>
      </div>
    </div>
  );
}
