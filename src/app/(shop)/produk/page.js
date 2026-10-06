'use client'

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { finalPrice, formatRupiah, products } from "@/lib/data";
import Recommendation from "@/components/recommendation";
import { CartIcon, DiscountIcon, FavoriteIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { useState } from "react";
import QuantityStepper from "@/components/QuantityStepper";

export default function produk() {
    const [qty, setQty] = useState(1);
    const searchParams = useSearchParams();
    const item = searchParams.get("item");
    const product = products.find((p) => p.id === item);

    return (
        <div className="my-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                {/* Product */}
                <div className="mb-12 grid grid-cols-1 gap-6 rounded-xl bg-surface p-6 lg:grid-cols-2">
                    <Image
                        src={product.product_images?.[0]?.url || "/icon.svg"}
                        alt={product.name}
                        width={500}
                        height={500}
                        unoptimized
                        className="mx-auto aspect-square w-full max-w-md rounded-xl object-cover lg:max-w-none"
                    />

                    <div className="lg:py-4">
                        <div className="mb-4 border-b-2 border-border pb-4">
                            <p className="text-2xl font-bold sm:text-3xl">{product.name}</p>
                            <p className="text-muted">{product.description}</p>
                            <p className="text-muted">Stok: {product.stock}</p>
                        </div>
                        <div className="border-b-2 border-border pb-4 mb-4">
                            <p className="text-2xl text-accent font-bold mb-1">{formatRupiah(finalPrice(product))}</p>
                            {product.discount_percent > 0 ?
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center px-2 py-1 text-danger bg-danger/20 border-2 border-danger/65 rounded-xl">
                                        <DiscountIcon className="size-6 shrink-0 mr-1" />
                                        <p>%{product.discount_percent}</p>
                                    </div>
                                    <p className="line-through text-muted">
                                        {formatRupiah(product.price)}
                                    </p>
                                </div>
                                : null}

                            <QuantityStepper value={qty} onChange={setQty} max={product.stock} />

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-4">
                                <button className="flex justify-center items-center px-6 py-2 rounded-xl max-w-xl
                                border-border border-2 hover:cursor-pointer hover:bg-danger hover:text-white hover:border-danger
                                hover:shadow-lg transition-colors">
                                    <FavoriteIcon className="size-6 shrink-0 mr-2" />
                                    <p className="text-lg">Favorit</p>
                                </button>
                                <button className="flex justify-center items-center px-6 py-2 bg-accent text-white rounded-xl w-full
                                hover:cursor-pointer hover:bg-accent-hover hover:shadow-lg
                                transition-colors">
                                    <CartIcon className="size-6 shrink-0 mr-2" />
                                    <p className="text-lg">+ Keranjang</p>
                                </button>
                            </div>
                        </div>
                        <ul className="grid grid-cols-[max-content_max-content] gap-x-6 gap-y-2">
                            <li className="contents">
                                <p>Rilis</p>
                                <p>{product.created_at}</p>
                            </li>
                            <li className="contents">
                                <p>Kondisi:</p>
                                <p>{product.condition}</p>
                            </li>
                            <li className="contents">
                                <p>Kategori:</p>
                                <Link href={"#"} className="hover:text-accent transition-colors">{product.category_slug}</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Recommendations */}
                <div>
                    <p className="mb-4 text-2xl font-bold underline-offset-4 underline decoration-accent">Produk Serupa</p>
                    <Recommendation id={item} />
                </div>
            </div>
        </div>
    );
}