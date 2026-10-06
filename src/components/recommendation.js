'use client'

import Image from "next/image";
import { products, formatRupiah, finalPrice, getRelatedProducts } from "@/lib/data";
import Link from "next/link";
import { FavoriteIcon } from "./icons";
import { useState } from "react";

const showMoreButtonClass = "px-6 py-2 border-accent border-2 rounded-xl text-xl text-accent font-bold hover:cursor-pointer hover:text-accent-hover hover:border-accent-hover hover:bg-black/5 hover:shadow-lg transition-colors";

export default function Recommendation({ id = null } = {}) {
    const filtered = (id !== null ? getRelatedProducts(id, 12) : products);
    const [visibleCount, setVisibleCount] = useState(24);
    const visibleProducts = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;
    return (
        <div>
            <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 shrink-0">
                {visibleProducts.map((prod) => {
                    return (
                        <div key={prod.id} className="relative bg-surface rounded-xl">
                            <button
                                className="group absolute right-2 top-2 z-10 grid size-10 place-items-center rounded-full bg-surface hover:cursor-pointer"
                                aria-label="Tambahkan ke favorit"
                            >
                                <span className="pointer-events-none absolute inset-0 rounded-full bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
                                <FavoriteIcon className="relative z-10 size-6 shrink-0 transition-colors group-hover:text-danger" />
                            </button>

                            <Link href={`/produk?item=${prod.id}`} className="text-sm">
                                <Image
                                    src={prod.product_images?.[0]?.url || "/icon.svg"}
                                    alt={prod.name}
                                    width={400}
                                    height={400}
                                    unoptimized
                                    className="mb-2 aspect-square w-full object-cover rounded-t-xl"
                                />
                                <div className="px-3 pb-3">
                                    <p className="line-clamp-1 truncate mb-6">{prod.name}</p>
                                    <p className="min-h-4 text-muted text-xs line-through">
                                        {prod.discount_percent > 0 ? formatRupiah(prod.price) : null}
                                    </p>
                                    <p className="text-accent font-bold">{formatRupiah(finalPrice(prod))}</p>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>

            {hasMore && (
                <div className="flex justify-center pt-6">
                    <button
                        onClick={() => setVisibleCount((count) => count + 24)}
                        className={showMoreButtonClass}
                    >
                        Tampilkan Lebih Banyak
                    </button>
                </div>
            )}
        </div>
    );
}