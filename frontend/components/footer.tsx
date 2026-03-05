"use client";

import { useLanguage } from "@/components/language-provider";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="border-t border-neutral-200/60 bg-neutral-50">
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="flex flex-col items-center gap-4 text-center">
                    <span className="font-playfair text-lg font-semibold text-neutral-800">
                        ThreadLodge
                    </span>
                    <p className="max-w-md text-sm leading-relaxed text-neutral-500">
                        {t("footer.desc")}
                    </p>
                    <p className="text-xs text-neutral-400">
                        © {new Date().getFullYear()} ThreadLodge. {t("footer.rights")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
