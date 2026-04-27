import { ContentPageLayout } from "@/components/ContentPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn more about Idols of Ash, our mission, and how we curate browser-playable game pages, guides, and support content.",
    alternates: {
        canonical: "/about-us",
    },
};

export default function AboutUs() {
    return (
        <ContentPageLayout title="About Us">
            <p>
                <strong>Idols of Ash</strong> is a browser gaming site focused on fast-loading play pages, game discovery, and practical support content around playable web titles.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-4 text-white">Our Mission</h2>
            <p>
                Our goal is to make it easy for players to jump into interesting browser games without unnecessary friction. We organize direct-play pages, category hubs, and lightweight reference content so visitors can find a game, understand what it is, and start playing quickly.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-4 text-white">What We Publish</h2>
            <p>
                The site combines a featured experience around <strong>Idols of Ash</strong> with a wider catalog of browser-playable titles. Alongside the play pages, we publish game descriptions, FAQ content, category pages, and supporting guides intended to answer the most common player questions.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-4 text-white">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)]">
                <li><strong>Fast Access:</strong> We keep the path from landing to play short, especially for visitors who want an immediate browser session.</li>
                <li><strong>Curated Pages:</strong> We focus on titles that are playable in-browser and useful to present with clear descriptions, categorization, and support context.</li>
                <li><strong>Practical Support Content:</strong> We publish guide, FAQ, and reference material where it helps players understand the game or its browser setup.</li>
                <li><strong>Ongoing Maintenance:</strong> We review links, embedded sources, and page content over time to keep the site usable and relevant.</li>
            </ul>
            <h2 className="text-2xl font-bold mt-6 mb-4 text-white">A Note On Content</h2>
            <p>
                We aim to present browser game information clearly and in good faith. If you believe a page is inaccurate, outdated, or contains material that should be reviewed, please contact us and we will take a closer look.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-4 text-white">Editorial Policy</h2>
            <p>
                We prioritize player-first accuracy over volume. Before publishing game-specific claims, we review live play behavior, visible in-page details, and publicly available source pages. We avoid publishing speculative mechanics as facts, and we update or remove content when verification fails.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-4 text-white">Sources And Verification</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)]">
                <li><strong>Primary Inputs:</strong> Live playable embeds, official game pages, and publicly visible release information.</li>
                <li><strong>Page-Level Checks:</strong> We verify core gameplay loop, controls (when available), and category fit before index-focused updates.</li>
                <li><strong>Change Control:</strong> When a page is under review, we may temporarily set it to noindex until the content is corrected.</li>
            </ul>
            <h2 className="text-2xl font-bold mt-6 mb-4 text-white">Corrections And Update Process</h2>
            <p>
                If a page includes outdated or inaccurate details, we revise the content and republish. High-impact corrections are prioritized for gameplay claims, safety notices, and indexing metadata. You can report issues via our contact page and include the exact URL so we can review quickly.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-4 text-white">Commercial Disclosure</h2>
            <p>
                Some pages may include advertising placements. Ads do not determine factual claims in our game descriptions, guides, or support pages.
            </p>
            <p className="mt-8 text-center text-[var(--color-primary)] font-bold">
                Explore, play, and stay moving through Idols of Ash.
            </p>
        </ContentPageLayout>
    );
}
