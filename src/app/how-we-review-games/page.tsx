import { Metadata } from "next";
import Link from "next/link";
import { ContentPageLayout } from "@/components/ContentPageLayout";

export const metadata: Metadata = {
    title: "How We Review Games",
    description: "See how Idols of Ash evaluates browser-playable games before publishing indexed game pages, guides, and support content.",
    alternates: {
        canonical: "/how-we-review-games",
    },
};

export default function HowWeReviewGamesPage() {
    return (
        <ContentPageLayout title="How We Review Games">
            <p>
                This page explains how <strong>Idols of Ash</strong> reviews browser-playable games before a title is
                published as an indexed game page. The goal is to make each page useful on its own, even before a
                visitor opens a playable frame.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">What We Check First</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)]">
                <li>Whether the game is actually playable in the browser.</li>
                <li>Whether the page premise, controls, and category fit can be verified from direct play or public source material.</li>
                <li>Whether the game offers enough distinct structure to deserve a standalone page instead of a short mention elsewhere.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">How We Write Page-Level Notes</h2>
            <p>
                We do not treat the embed as the whole product. Each indexed page is expected to explain what kind of
                player the game suits, how long the game loop feels in practice, where new players usually struggle,
                and why the title is different from similar browser games.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Signals We Prefer</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)]">
                <li>Visible control schemes, progression loops, combat or puzzle structure, and named features.</li>
                <li>Directly observable pacing, friction points, and session shape from play or source material.</li>
                <li>Publicly visible release, platform, or technology details when those details affect user expectations.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Signals We Avoid</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)]">
                <li>Invented lore, mechanics, or progression claims that cannot be verified.</li>
                <li>Generic filler that could apply to any browser action or puzzle game.</li>
                <li>Publishing an indexed page just because an external embed exists.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">When A Game Gets Indexed</h2>
            <p>
                A game page is more likely to stay indexed when it has a clear editorial layer, distinct player-facing
                notes, and enough factual structure to support guide, FAQ, or comparison content. If a page becomes too
                thin, too stale, or too dependent on unverified claims, we may revise it or remove it from indexed
                navigation until it meets the standard again.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Why This Matters</h2>
            <p>
                A browser game page should help a visitor decide whether the title is worth their time. That means the
                useful part of the page has to begin before the playable frame does.
            </p>

            <p className="mt-8">
                For related policy context, see{" "}
                <Link href="/about-us" className="text-[var(--color-cta)] hover:text-white transition-colors">
                    About Us
                </Link>
                ,{" "}
                <Link href="/contact" className="text-[var(--color-cta)] hover:text-white transition-colors">
                    Contact
                </Link>
                , and{" "}
                <Link href="/privacy-policy" className="text-[var(--color-cta)] hover:text-white transition-colors">
                    Privacy Policy
                </Link>
                .
            </p>
        </ContentPageLayout>
    );
}
