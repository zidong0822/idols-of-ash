import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { StructuredData } from "@/components/StructuredData";
import { getGameBySlug, idolsOfAshGadgets, idolsOfAshWikiSections } from "@/data/games";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
    title: "Idols of Ash Wiki",
    description: "Use this Idols of Ash wiki as a quick reference for movement fundamentals, route logic, and survival-focused progression.",
    alternates: {
        canonical: "/games/idols-of-ash/wiki",
    },
    openGraph: {
        title: "Idols of Ash Wiki",
        description: "Use this Idols of Ash wiki as a quick reference for movement fundamentals, route logic, and survival-focused progression.",
        url: "https://idols-of-ash.org/games/idols-of-ash/wiki",
        images: ["/games/covers/idols-of-ash.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Idols of Ash Wiki",
        description: "Use this Idols of Ash wiki as a quick reference for movement fundamentals, route logic, and survival-focused progression.",
        images: ["/games/covers/idols-of-ash.png"],
    },
};

export default function IdolsOfAshWikiPage() {
    const game = getGameBySlug("idols-of-ash");
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Idols of Ash", href: "/games/idols-of-ash" },
        { label: "Wiki" },
    ];

    return (
        <div className="space-y-6">
            <StructuredData data={buildBreadcrumbSchema(breadcrumbItems)} />
            <div className="max-w-4xl mx-auto">
                <Breadcrumbs items={breadcrumbItems} />
            </div>

            <ContentPageLayout title="Idols of Ash Wiki">
                <p>
                    This wiki is designed for fast lookup. It covers the key ideas behind safe descent, movement
                    consistency, and route discipline without forcing you through a full long-form walkthrough.
                </p>

                {game ? (
                    <section>
                        <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Store snapshot</h2>
                        <p>
                            Idols of Ash is developed by {game.developer}. This page focuses on practical play signals:
                            movement quality, route control, and reducing avoidable failures in high-pressure segments.
                        </p>
                    </section>
                ) : null}

                {idolsOfAshWikiSections.map((section) => (
                    <section key={section.title}>
                        <h2 className="text-2xl font-bold mt-8 mb-4 text-white">{section.title}</h2>
                        <p>{section.body}</p>
                    </section>
                ))}

                <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Gadget reference</h2>
                <div className="space-y-4 not-prose mt-6">
                    {idolsOfAshGadgets.map((gadget) => (
                        <article key={gadget.name} className="rounded-xl border border-[var(--color-border-main)]/30 bg-black/10 p-5">
                            <h3 className="text-xl font-bold text-white">{gadget.name}</h3>
                            <p className="text-[var(--color-text-main)]/85 mt-2">{gadget.description}</p>
                        </article>
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-4 not-prose mt-8">
                    <Link href="/games/idols-of-ash" className="rounded-xl border border-[var(--color-border-main)]/50 bg-[var(--color-card)] p-5 text-white hover:opacity-90 transition-opacity">
                        <strong>Main Game Page</strong>
                        <p className="text-sm text-[var(--color-text-main)]/80 mt-2">Return to direct play and the main game summary.</p>
                    </Link>
                    <Link href="/games/idols-of-ash/guide" className="rounded-xl border border-[var(--color-border-main)]/50 bg-[var(--color-card)] p-5 text-white hover:opacity-90 transition-opacity">
                        <strong>Guide</strong>
                        <p className="text-sm text-[var(--color-text-main)]/80 mt-2">Move into full progression and route planning.</p>
                    </Link>
                    <Link href="/games/idols-of-ash/achievements" className="rounded-xl border border-[var(--color-border-main)]/50 bg-[var(--color-card)] p-5 text-white hover:opacity-90 transition-opacity">
                        <strong>Achievements</strong>
                        <p className="text-sm text-[var(--color-text-main)]/80 mt-2">Switch to completion tracking once your movement route is stable.</p>
                    </Link>
                </div>
            </ContentPageLayout>
        </div>
    );
}
