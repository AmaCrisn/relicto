'use client'

import ProductsResult from "@/components/productsCard";
import { useSearchParams } from "next/navigation";

export default function cari() {
    const params = useSearchParams();
    const category = params.get("kategori");
    const cari = params.get("cari");
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                {!cari && category 
                ?<h1 className="font-bold mb-4">Produk Kategori "{category}"</h1>
                :<h1 className="font-bold mb-4">Hasil Pencarian "{cari}"</h1>}
                
                <ProductsResult type="search" keyword={cari} kategori={category}/>
            </div>
        </div>
    );
}