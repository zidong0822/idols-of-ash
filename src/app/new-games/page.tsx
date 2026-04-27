import type { Metadata } from "next";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { GameGridSection } from "@/components/GameGridSection";
import { getGamesByFlag } from "@/data/games";

export const metadata: Metadata = {
    title: "New Games",
    description: "Discover the newest browser games added to Idols of Ash, including current breakout releases.",
    alternates: {
        canonical: "/new-games",
    },
};

export default function NewGamesPage() {
    const games = getGamesByFlag("isNew");

    return (
        <ContentPageLayout title="New Games">
            <p>
                Fresh titles deserve their own landing space. This page stays as a clean browse surface, and the
                individual game pages handle the iframe play view after the click-through.
            </p>
            <div className="not-prose mt-8">
                <GameGridSection
                    title="Latest Additions"
                    games={games}
                    subtitle="Click any game card to open its detail page. Playable titles use the same large iframe presentation as the homepage."
                />
            </div>
        </ContentPageLayout>
    );
}
