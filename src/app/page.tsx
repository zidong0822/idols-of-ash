import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, Heart, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { GameGridSection } from "@/components/GameGridSection";
import { GamePlayer } from "@/components/GamePlayer";
import { StructuredData } from "@/components/StructuredData";
import { games, getGameBySlug, idolsOfAshGuideSections, getPlayableGameSrc } from "@/data/games";
import { indexedGameSlugs } from "@/lib/indexed-pages";
import { buildItemListSchema, buildWebsiteSchema, toAbsoluteUrl } from "@/lib/schema";



const idolsOfAsh = getGameBySlug("idols-of-ash");

export default function Home() {
    if (!idolsOfAsh) {
        throw new Error("Missing idols-of-ash game data");
    }

    const indexedGames = games.filter((game) => indexedGameSlugs.includes(game.slug as (typeof indexedGameSlugs)[number]));
    const featuredGames = indexedGames.filter((game) => game.slug !== "idols-of-ash");
    const websiteSchema = buildWebsiteSchema();
    const featuredGamesSchema = buildItemListSchema(
        "Featured Games",
        featuredGames.map((game) => ({
            name: game.title,
            url: toAbsoluteUrl(`/games/${game.slug}`),
            image: toAbsoluteUrl(game.img),
        })),
        "/"
    );

    return (
        <div className="w-full space-y-8">
            <StructuredData data={[websiteSchema, featuredGamesSchema]} />
            <section className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-[0_0_30px_rgba(111,19,15,0.22)] bg-[#050404]">
                <GamePlayer
                    iframeSrc={getPlayableGameSrc(idolsOfAsh)!}
                    coverImg={idolsOfAsh.img}
                    title={idolsOfAsh.title}
                />

                <div className="p-4 bg-[var(--color-surface)] flex gap-4 flex-col sm:flex-row justify-between items-start sm:items-center border-t border-[var(--color-border-main)]">
                    <div className="space-y-3">
                        <h1 className="text-2xl sm:text-3xl font-bold gradient-text m-0 tracking-wide select-none uppercase">
                            Idols of Ash
                        </h1>
                        <p className="text-sm text-[var(--color-text-muted)] max-w-2xl">
                            Play Idols of Ash unblocked directly in your browser. This version is optimized with Godot 4.3 WebGL, 
                            guaranteeing a smooth 60FPS experience. No heavy downloads or installation required!
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/games/idols-of-ash"
                                className="px-4 py-2 rounded bg-[var(--color-cta)] text-white font-bold text-sm hover:opacity-90 transition-opacity"
                            >
                                Game Page
                            </Link>
                            <Link
                                href="/games/idols-of-ash/guide"
                                className="px-4 py-2 rounded border border-[var(--color-border-main)] text-white font-bold text-sm hover:bg-[var(--color-card)] transition-colors"
                            >
                                Read Guide
                            </Link>
                            <Link
                                href="/games/idols-of-ash/achievements"
                                className="px-4 py-2 rounded border border-[var(--color-border-main)] text-white font-bold text-sm hover:bg-[var(--color-card)] transition-colors"
                            >
                                Achievements
                            </Link>
                            <Link
                                href="/games/idols-of-ash/wiki"
                                className="px-4 py-2 rounded border border-[var(--color-border-main)] text-white font-bold text-sm hover:bg-[var(--color-card)] transition-colors"
                            >
                                Wiki
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-3 items-center w-full sm:w-auto mt-2 sm:mt-0">
                        <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-[var(--color-card)] hover:bg-[#241917] rounded border border-[var(--color-border-main)] transition-colors text-xs sm:text-sm text-[#b58a58] group">
                            <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-y-0.5 transition-transform" />
                            <span className="hidden xs:inline">115k Like</span>
                        </button>
                        <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-[var(--color-card)] hover:bg-[#241917] rounded border border-[var(--color-border-main)] transition-colors text-xs sm:text-sm text-[#b85c4d] group">
                            <ThumbsDown className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-y-0.5 transition-transform" />
                            <span className="hidden xs:inline">11k Dislike</span>
                        </button>
                        <button className="p-2 sm:p-2.5 bg-[var(--color-card)] hover:bg-[#241917] rounded border border-[var(--color-border-main)] transition-colors text-white hover:text-[#c8705f]" title="Add to Favorites">
                            <Heart className="w-4 h-4" />
                        </button>
                        <button className="p-2 sm:p-2.5 bg-[var(--color-card)] hover:bg-[#241917] rounded border border-[var(--color-border-main)] transition-colors text-white hover:text-[var(--color-secondary)]" title="Share">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 sm:p-2.5 bg-[var(--color-card)] hover:bg-[#241917] rounded border border-[var(--color-border-main)] transition-colors text-white hover:text-[#c29155]" title="Report Bug">
                            <AlertCircle className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            <section className="max-w-5xl mx-auto grid lg:grid-cols-[1.3fr_0.7fr] gap-6">
                <article className="bg-[var(--color-surface)]/40 p-6 sm:p-8 rounded-xl border border-[var(--color-border-main)]/30 text-[var(--color-text-main)]/90 text-sm sm:text-base leading-relaxed space-y-5">
                    <h2 className="text-3xl font-bold gradient-text uppercase tracking-tight">
                        Idols of Ash Is The Ultimate Horror Parkour Experience
                    </h2>
                    <p>
                        Idols of Ash mixes high-speed parkour mechanics with terrifying psychological horror, which is why so
                        many players are now looking for help with the early stages, "Schmovement" techniques, and survival routes.
                        On this site, the homepage stays focused on instant play while the deeper help lives in the game
                        detail pages below.
                    </p>
                    <p>
                        Idols of Ash relies on momentum and precise actions. To survive the descent and escape the Murderpede, follow these essential keyboard controls:
                    </p>
                    <ul className="grid grid-cols-2 gap-3 mt-4 text-[var(--color-text-muted)]">
                        <li><strong className="text-white">W / A / S / D</strong> - Move rapidly</li>
                        <li><strong className="text-white">Mouse Look</strong> - Aim Grappling Hook</li>
                        <li><strong className="text-white">Hold Left Click</strong> - Grapple & Swing</li>
                        <li><strong className="text-white">Spacebar</strong> - Jump</li>
                        <li><strong className="text-white">Left Shift</strong> - Sprint</li>
                        <li><strong className="text-white">ESC</strong> - Settings & Sensitivity</li>
                    </ul>
                </article>

                <aside className="bg-[var(--color-surface)]/40 p-6 rounded-xl border border-[var(--color-border-main)]/30 space-y-4">
                    <h2 className="text-xl font-bold text-white">Quick Paths</h2>
                    <Link href="/games/idols-of-ash" className="block rounded-lg border border-[var(--color-border-main)] p-4 hover:bg-[var(--color-card)] transition-colors">
                        <h3 className="font-bold text-white">Game Page</h3>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">Jump straight into the dedicated Idols of Ash page.</p>
                    </Link>
                    <Link href="/games/idols-of-ash/guide" className="block rounded-lg border border-[var(--color-border-main)] p-4 hover:bg-[var(--color-card)] transition-colors">
                        <h3 className="font-bold text-white">Beginner Guide</h3>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">Follow a cleaner early-game route and progression plan.</p>
                    </Link>
                    <Link href="/games/idols-of-ash/achievements" className="block rounded-lg border border-[var(--color-border-main)] p-4 hover:bg-[var(--color-card)] transition-colors">
                        <h3 className="font-bold text-white">Achievements</h3>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">Track completion goals and end-run cleanup priorities.</p>
                    </Link>
                    <Link href="/games/idols-of-ash/wiki" className="block rounded-lg border border-[var(--color-border-main)] p-4 hover:bg-[var(--color-card)] transition-colors">
                        <h3 className="font-bold text-white">Wiki</h3>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">Use the quick-reference page for loop, systems, and search intent context.</p>
                    </Link>
                </aside>
            </section>

            <section className="max-w-5xl mx-auto bg-[var(--color-surface)]/40 p-6 sm:p-8 rounded-xl border border-[var(--color-border-main)]/30">
                <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    <details className="group border border-[var(--color-border-main)]/40 rounded-lg bg-black/15">
                        <summary className="p-4 font-bold text-white cursor-pointer select-none">Can I play Idols of Ash online for free?</summary>
                        <div className="p-4 pt-0 text-sm text-[var(--color-text-muted)]">
                            Yes! This page offers a fully unblocked, web-optimized embed version of Idols of Ash. You can play it directly in your browser without needing any downloads or client installs.
                        </div>
                    </details>
                    <details className="group border border-[var(--color-border-main)]/40 rounded-lg bg-black/15">
                        <summary className="p-4 font-bold text-white cursor-pointer select-none">Who is the developer of Idols of Ash?</summary>
                        <div className="p-4 pt-0 text-sm text-[var(--color-text-muted)]">
                            Idols of Ash is an independent horror game developed by Leafy Games, built using the Godot engine.
                        </div>
                    </details>
                    <details className="group border border-[var(--color-border-main)]/40 rounded-lg bg-black/15">
                        <summary className="p-4 font-bold text-white cursor-pointer select-none">Is Idols of Ash coming to Steam?</summary>
                        <div className="p-4 pt-0 text-sm text-[var(--color-text-muted)]">
                            Yes, the developer has stated that a full release is "Coming to Steam soon!" Wait for the official downloadable PC versions alongside this optimized browser port.
                        </div>
                    </details>
                </div>
            </section>

            <section className="max-w-5xl mx-auto bg-[var(--color-surface)]/40 p-6 sm:p-8 rounded-xl border border-[var(--color-border-main)]/30">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Guide Highlights</h2>
                        <p className="text-sm text-[var(--color-text-muted)] mt-2">
                            The full guide lives in the dedicated game section, but these are the priorities most players search for first.
                        </p>
                    </div>
                    <Link href="/games/idols-of-ash/guide" className="text-sm text-[var(--color-cta)] hover:text-white transition-colors">
                        Open Full Guide →
                    </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    {idolsOfAshGuideSections.map((section) => (
                        <article key={section.title} className="rounded-xl border border-[var(--color-border-main)]/40 bg-black/15 p-5">
                            <h3 className="text-lg font-bold text-white">{section.title}</h3>
                            <p className="text-sm text-[var(--color-text-muted)] mt-3">{section.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <GameGridSection
                title="Indexed Game Pages"
                games={featuredGames}
                subtitle="Only the currently indexed companion game pages remain linked from the homepage."
            />
        </div>
    );
}
