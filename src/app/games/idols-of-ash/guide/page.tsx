import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { idolsOfAshGadgets, idolsOfAshGuideSections } from "@/data/games";

export const metadata: Metadata = {
    title: "Idols of Ash Guide",
    description: "Use this Idols of Ash guide to improve grappling movement, reduce run-breaking mistakes, and survive deeper descent routes.",
    alternates: {
        canonical: "/games/idols-of-ash/guide",
    },
    openGraph: {
        title: "Idols of Ash Guide",
        description: "Use this Idols of Ash guide to improve grappling movement, reduce run-breaking mistakes, and survive deeper descent routes.",
        url: "https://idols-of-ash.org/games/idols-of-ash/guide",
        images: ["/games/covers/idols-of-ash.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Idols of Ash Guide",
        description: "Use this Idols of Ash guide to improve grappling movement, reduce run-breaking mistakes, and survive deeper descent routes.",
        images: ["/games/covers/idols-of-ash.png"],
    },
};

export default function IdolsOfAshGuidePage() {
    return (
        <div className="space-y-6">
            <div className="max-w-4xl mx-auto">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Games", href: "/popular-games" },
                        { label: "Idols of Ash", href: "/games/idols-of-ash" },
                        { label: "Guide" },
                    ]}
                />
            </div>

            <ContentPageLayout title="Idols of Ash Guide">
                <p>
                    This page is a practical movement guide for Idols of Ash. The goal is to help you survive longer
                    runs by improving route reading, grapple timing, and recovery decisions under pressure.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-white">What is confirmed before you even start?</h2>
                <p>
                    Idols of Ash is played from a first-person view and focuses on descending through hostile space
                    with movement precision. The fastest way to improve is treating each failed run as route data:
                    where the line broke, where camera control failed, and where you committed too early.
                </p>

                {idolsOfAshGuideSections.map((section) => (
                    <section key={section.title}>
                        <h2 className="text-2xl font-bold mt-8 mb-4 text-white">{section.title}</h2>
                        <p>{section.body}</p>
                    </section>
                ))}

                <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Movement Checklist Before Every Push</h2>
                <p>
                    Before attempting a deeper route, run a quick check: identify your next stable anchor, decide your
                    recovery angle if the line drifts, and avoid entering a segment without a safe correction option.
                </p>
                <div className="space-y-4 not-prose mt-6">
                    {idolsOfAshGadgets.map((gadget) => (
                        <article key={gadget.name} className="rounded-xl border border-[var(--color-border-main)]/30 bg-black/10 p-5">
                            <h3 className="text-xl font-bold text-white">{gadget.name}</h3>
                            <p className="text-[var(--color-text-main)]/85 mt-2">{gadget.description}</p>
                        </article>
                    ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Common Mistakes That End Runs</h2>
                <p>
                    Most failed attempts come from over-correcting during unstable swings, taking rushed lines after a
                    near miss, or moving the camera too aggressively in tight sections. Slower and cleaner input usually
                    beats risky speed until a route is fully learned.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-white">How To Practice Efficiently</h2>
                <p>
                    Use short practice blocks and isolate high-failure segments. Once a segment is stable, reconnect it
                    into a full descent attempt. This keeps progress measurable and avoids repeating long runs with the
                    same unaddressed mistakes.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Use the right page for the right task</h2>
                <p>
                    Keep the game page open for direct play loops. Use this guide for execution and route planning,
                    switch to achievements when you are doing completion cleanup, and use the wiki for quick reference.
                </p>

                <div className="grid md:grid-cols-3 gap-4 not-prose mt-8">
                    <Link href="/games/idols-of-ash" className="rounded-xl border border-[var(--color-border-main)]/50 bg-[var(--color-card)] p-5 text-white hover:opacity-90 transition-opacity">
                        <strong>Main Game Page</strong>
                        <p className="text-sm text-[var(--color-text-main)]/80 mt-2">Play Idols of Ash directly and use it as your main entry point.</p>
                    </Link>
                    <Link href="/games/idols-of-ash/achievements" className="rounded-xl border border-[var(--color-border-main)]/50 bg-[var(--color-card)] p-5 text-white hover:opacity-90 transition-opacity">
                        <strong>Achievement Notes</strong>
                        <p className="text-sm text-[var(--color-text-main)]/80 mt-2">Review the achievement route and cleanup priorities after your main run.</p>
                    </Link>
                    <Link href="/games/idols-of-ash/wiki" className="rounded-xl border border-[var(--color-border-main)]/50 bg-[var(--color-card)] p-5 text-white hover:opacity-90 transition-opacity">
                        <strong>Wiki</strong>
                        <p className="text-sm text-[var(--color-text-main)]/80 mt-2">Use the quick-reference page for core systems and run orientation.</p>
                    </Link>
                </div>
            </ContentPageLayout>
        </div>
    );
}
