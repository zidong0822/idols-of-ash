import type { Metadata } from "next";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { GameGridSection } from "@/components/GameGridSection";
import { getGamesByFlag } from "@/data/games";

export const metadata: Metadata = {
    title: "Hot Games",
    description: "Browse the hottest games on Idols of Ash, including breakout browser hits and current player favorites.",
    alternates: {
        canonical: "/hot-games",
    },
};

export default function HotGamesPage() {
    const games = getGamesByFlag("isHot");

    return (
        <ContentPageLayout title="Hot Games">
            <p>
                These are the titles currently pulling the most attention across the site. The page stays focused on
                browse-and-click discovery, while individual game pages handle the playable iframe view.
            </p>
            <div className="not-prose mt-8">
                <GameGridSection
                    title="Trending Right Now"
                    games={games}
                    subtitle="Click any game card to open its detail page. Playable titles use the same large iframe presentation as the homepage."
                />
            </div>
        </ContentPageLayout>
    );
}
