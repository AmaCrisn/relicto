'use client'

import Link from "next/link";
import { navigations } from "@/lib/data"
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 shadow shadow-accent bg-surface">
            <nav className="mx-auto px-8 py-5 flex max-w-6xl justify-between items-center">
                <Link href="/" className="font-display font-bold text-lg">Relicto</Link>

                {/* Sections */}
                <ul className="hidden sm:flex gap-1 text-sm">
                    {
                        navigations.map((link) => {
                            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`rounded-xl px-3 py-1.5 transition-colors ${isActive
                                            ? "bg-foreground text-background"
                                            : "text-muted hover:text-foreground"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>

                {/* Hamburger button — visible only on small screens */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="sm:hidden flex flex-col gap-1.5 p-2 hover:cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <span className={`h-0.5 w-6 bg-(--text) transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`h-0.5 w-6 bg-(--text) transition-opacity ${isOpen ? "opacity-0" : ""}`} />
                    <span className={`h-0.5 w-6 bg-(--text) transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </nav>

            {isOpen && (
                <ul className="sm:hidden flex flex-col gap-1 border-t border-border px-4 py-4">
                    {navigations.map((link) => {
                        const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-2 transition-colors rounded-xl ${isActive
                                        ? "bg-foreground text-background"
                                        : "text-muted hover:text-foreground"}`}>
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </header>
    )
}