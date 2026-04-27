import type { Metadata } from "next";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { GameGridSection } from "@/components/GameGridSection";
import { getGamesByFlag } from "@/data/games";

export const metadata: Metadata = {
    title: "Popular Games",
    description: "Explore popular browser games on Idols of Ash, from current viral titles to evergreen player favorites.",
    alternates: {
        canonical: "/popular-games",
    },
};

export default function PopularGamesPage() {
    const games = getGamesByFlag("isPopular");

    return (
        <ContentPageLayout title="Popular Games">
            <p>
                Popular games pages give the site a reusable aggregation pattern. They also help strong game pages pass
                traffic and internal authority into the rest of the library.
            </p>
            <div className="not-prose mt-8">
                <GameGridSection
                    title="Most Played"
                    games={games}
                    subtitle="Click any game card to open its detail page. Playable titles use the same large iframe presentation as the homepage."
                />
            </div>
        </ContentPageLayout>
    );
}
