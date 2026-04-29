import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { idolsOfAshAchievements, idolsOfAshConfirmedAchievements } from "@/data/games";

export const metadata: Metadata = {
    title: "Idols of Ash Achievements",
    description: "Track Idols of Ash achievement progress with practical cleanup priorities and run-consistency notes.",
    alternates: {
        canonical: "/games/idols-of-ash/achievements",
    },
    openGraph: {
        title: "Idols of Ash Achievements",
        description: "Track Idols of Ash achievement progress with practical cleanup priorities and run-consistency notes.",
        url: "https://idols-of-ash.org/games/idols-of-ash/achievements",
        images: ["/games/covers/idols-of-ash.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Idols of Ash Achievements",
        description: "Track Idols of Ash achievement progress with practical cleanup priorities and run-consistency notes.",
        images: ["/games/covers/idols-of-ash.png"],
    },
};

export default function IdolsOfAshAchievementsPage() {
    return (
        <div className="space-y-6">
            <div className="max-w-4xl mx-auto">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Idols of Ash", href: "/games/idols-of-ash" },
                        { label: "Achievements" },
                    ]}
                />
            </div>

            <ContentPageLayout title="Idols of Ash Achievements">
                <p>
                    This page is organized as a practical completion tracker. The goal is to separate progression runs,
                    challenge-condition attempts, and final cleanup so each session has a clear objective.
                </p>

                <div className="space-y-6">
                    {idolsOfAshAchievements.map((achievement) => (
                        <section key={achievement.title} className="rounded-xl border border-[var(--color-border-main)]/30 bg-black/10 p-5">
                            <h2 className="text-2xl font-bold text-white">{achievement.title}</h2>
                            <p className="mt-3">{achievement.description}</p>
                            <p className="mt-3 text-[var(--color-primary)]">
                                <strong>Tracking tip:</strong> {achievement.tip}
                            </p>
                        </section>
                    ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Confirmed achievement names seen in public sources</h2>
                <p>
                    Use this checklist as a stable reference during cleanup. It is designed to prevent repeated
                    attempts caused by unclear tracking.
                </p>
                <div className="grid md:grid-cols-2 gap-3 not-prose mt-6">
                    {idolsOfAshConfirmedAchievements.map((achievement) => (
                        <div key={achievement} className="rounded-xl border border-[var(--color-border-main)]/30 bg-black/10 px-4 py-3 text-sm text-white">
                            {achievement}
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-white">What players are struggling with</h2>
                <p>
                    Most completion slowdowns come from mixing challenge constraints into normal progression attempts.
                    Keep standard runs focused on consistency, then isolate special-condition goals in dedicated passes.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Follow-up paths</h2>
                <p>
                    If completion stalls, return to the guide page and tighten route execution first. Most achievement
                    friction drops after movement consistency improves.
                </p>

                <div className="grid md:grid-cols-3 gap-4 not-prose mt-8">
                    <Link href="/games/idols-of-ash/guide" className="rounded-xl border border-[var(--color-border-main)]/50 bg-[var(--color-card)] p-5 text-white hover:opacity-90 transition-opacity">
                        <strong>Return to Guide</strong>
                        <p className="text-sm text-[var(--color-text-main)]/80 mt-2">Refine your progression route before doing achievement cleanup.</p>
                    </Link>
                    <Link href="/games/idols-of-ash" className="rounded-xl border border-[var(--color-border-main)]/50 bg-[var(--color-card)] p-5 text-white hover:opacity-90 transition-opacity">
                        <strong>Back to Game Page</strong>
                        <p className="text-sm text-[var(--color-text-main)]/80 mt-2">Keep direct play one click away while you track completion work.</p>
                    </Link>
                    <Link href="/games/idols-of-ash/wiki" className="rounded-xl border border-[var(--color-border-main)]/50 bg-[var(--color-card)] p-5 text-white hover:opacity-90 transition-opacity">
                        <strong>Open Wiki</strong>
                        <p className="text-sm text-[var(--color-text-main)]/80 mt-2">Use quick references for systems and route logic between attempts.</p>
                    </Link>
                </div>
            </ContentPageLayout>
        </div>
    );
}
