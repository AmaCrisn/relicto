'use client'

import Link from "next/link";
import { navigations } from "@/lib/data";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SearchIcon } from "./icons";
import SearchBar from "./SearchBar";

const SEARCH_PHRASES = ["Cari komik...", "Cari figure...", "Cari kartu..."];

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchActive, setSearchActive] = useState(false);

    // Halaman aktif: "/" hanya cocok persis, selain itu cocok jika diawali href-nya
    const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

    // Warna tautan dibuat dari putih + lapisan hitam transparan, sehingga terbaca
    // di latar accent terang (light mode) maupun gelap (dark mode)
    const linkClass = (active) =>
        `transition-colors text-white ${active ? "bg-black/25" : "hover:bg-black/15"}`;

    return (
        <>
            {/* Lapisan gelap di belakang navbar saat pencarian aktif */}
            <div
                aria-hidden="true"
                onClick={() => document.activeElement?.blur()}
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ${searchActive ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
            />

            <header className="sticky top-0 z-50 shadow shadow-accent bg-accent text-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-8">
                    <Link href="/" className="flex items-center gap-3 font-display font-bold">
                        <img
                            src="/icon.svg"
                            alt="Relicto"
                            className="object-contain h-12 w-12"
                        />
                        <p className="text-2xl font-sans text-white sm:text-3xl">Relicto</p>
                    </Link>

                    {/* Pencarian (desktop) */}
                    <div className="hidden min-w-0 sm:block sm:flex-1">
                        <SearchBar phrases={SEARCH_PHRASES} onActiveChange={setSearchActive} />
                    </div>

                    {/* Navigasi (desktop) */}
                    <ul className="hidden items-center gap-2 sm:flex">
                        {navigations.map((link) => {
                            const active = isActive(link.href);
                            const { Icon } = link;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        aria-label={link.label}
                                        aria-current={active ? "page" : undefined}
                                        title={link.label}
                                        className={`flex size-10 items-center justify-center rounded-xl ${linkClass(active)}`}
                                    >
                                        <Icon className="size-8 shrink-0" />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Tombol cari dan hamburger (ponsel) */}
                    <div className="flex items-center gap-5 sm:hidden">
                        <button
                            onClick={() => {
                                setSearchOpen(!searchOpen);
                                setMenuOpen(false);
                            }}
                            aria-label="Cari produk"
                            className="flex items-center text-white"
                        >
                            <SearchIcon className="size-7" />
                        </button>
                        <button
                            onClick={() => {
                                setSearchOpen(false);
                                setMenuOpen(!menuOpen);
                            }}
                            className="flex flex-col gap-1.5 p-2 hover:cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            <span className={`h-0.5 w-6 bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`h-0.5 w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                            <span className={`h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </button>
                    </div>
                </nav>

                {searchOpen && (
                    <div className="flex flex-col gap-1 border-t border-white/20 px-4 py-4 sm:hidden">
                        <SearchBar phrases={SEARCH_PHRASES} onActiveChange={setSearchActive} />
                    </div>
                )}

                {menuOpen && (
                    <ul className="flex flex-col gap-1 border-t border-white/20 px-4 py-4 sm:hidden">
                        {navigations.map((link) => {
                            const active = isActive(link.href);
                            const { Icon } = link;
                            return (
                                <li key={link.href} className="text-lg">
                                    <Link
                                        href={link.href}
                                        aria-current={active ? "page" : undefined}
                                        onClick={() => setMenuOpen(false)}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-2 ${linkClass(active)}`}
                                    >
                                        <Icon className="size-6 shrink-0" />
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </header>
        </>
    )
}