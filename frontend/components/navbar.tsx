"use client";

import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (href.startsWith("/#")) {
            const id = href.slice(2);
            if (pathname === "/") {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                router.push("/");
                setTimeout(() => {
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 300);
            }
        } else if (href === "/") {
            if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                router.push("/");
            }
        } else {
            router.push(href);
        }
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            className="text-sm tracking-wide text-neutral-500 transition-colors hover:text-neutral-900"
        >
            {children}
        </a>
    );
}

export default function Navbar() {
    const { locale, setLocale, t } = useLanguage();

    const toggleLang = () => {
        setLocale(locale === "en" ? "es" : "en");
    };

    return (
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-neutral-200/40 bg-white/80 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between px-10">
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="font-playfair text-xl font-medium tracking-tight text-neutral-900"
                >
                    ThreadLodge
                </a>
                <div className="flex items-center gap-6">
                    <NavLink href="/">{t("nav.home")}</NavLink>
                    <NavLink href="/#habitaciones">{t("nav.rooms")}</NavLink>
                    <NavLink href="/#contacto">{t("nav.contact")}</NavLink>

                    {/* Language toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLang}
                        className="ml-2 gap-1.5 rounded-full border border-neutral-200 px-3 text-xs font-medium text-neutral-600 transition-all hover:border-neutral-400 hover:text-neutral-900"
                    >
                        <Globe className="h-3.5 w-3.5" />
                        {locale === "en" ? "ES" : "EN"}
                    </Button>
                </div>
            </div>
        </nav>
    );
}
