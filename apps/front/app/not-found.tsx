'use client'

import PageContent from "@/components/globals/PageContent";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <PageContent>
                <div className="flex flex-col items-center gap-8 text-center">
                    <h1 className="text-6xl font-bold text-primary">404</h1>
                    <h2 className="text-3xl font-bold">Page non trouvée</h2>
                    <p className="text-lg text-gray-600 max-w-md">
                        Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
                    </p>
                    <Link
                        href="/"
                        className="mt-4 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Retour à l&apos;accueil
                    </Link>
                </div>
            </PageContent>
        </div>
    );
}
