import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CommentsSection } from "@/components/CommentsSection";
import { GameGridSection } from "@/components/GameGridSection";
import { GamePlayer } from "@/components/GamePlayer";
import { StructuredData } from "@/components/StructuredData";
import { games, getGameBySlug, idolsOfAshFaqs, getPlayableGameSrc } from "@/data/games";
import { indexedGameSlugs, isIndexedGameSlug } from "@/lib/indexed-pages";
import { buildBreadcrumbSchema, buildItemListSchema, toAbsoluteUrl } from "@/lib/schema";

interface GamePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return indexedGameSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
    const { slug } = await params;

    if (!isIndexedGameSlug(slug)) {
        return {};
    }

    const game = getGameBySlug(slug);

    if (!game) {
        return {};
    }

    return {
        title: game.title,
        description: game.description,
        alternates: {
            canonical: `/games/${game.slug}`,
        },
        openGraph: {
            title: game.title,
            description: game.description,
            url: `https://idols-of-ash.org/games/${game.slug}`,
            images: [game.img],
        },
        twitter: {
            card: "summary_large_image",
            title: game.title,
            description: game.description,
            images: [game.img],
        },
    };
}

export default async function GamePage({ params }: GamePageProps) {
    const { slug } = await params;

    if (!isIndexedGameSlug(slug)) {
        notFound();
    }

    const game = getGameBySlug(slug);

    if (!game) {
        notFound();
    }

    const playableSrc = getPlayableGameSrc(game);
    const relatedGames = games
        .filter((candidate) => isIndexedGameSlug(candidate.slug) && candidate.slug !== game.slug)
        .slice(0, 5);
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: game.title },
    ];
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        name: game.title,
        description: game.description,
        image: game.img.startsWith("http") ? game.img : `https://idols-of-ash.org${game.img}`,
        genre: game.categories,
        url: `https://idols-of-ash.org/games/${game.slug}`,
        playMode: "SinglePlayer",
        applicationCategory: "Game",
    };
    const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
    const relatedGamesSchema = buildItemListSchema(
        `${game.title} Similar Games`,
        relatedGames.map((candidate) => ({
            name: candidate.title,
            url: toAbsoluteUrl(`/games/${candidate.slug}`),
            image: toAbsoluteUrl(candidate.img),
        })),
        `/games/${game.slug}`
    );
    const faqSchema = game.faqItems?.length
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: game.faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                },
            })),
        }
        : null;

    return (
        <div className="space-y-8">
            <StructuredData data={faqSchema ? [jsonLd, breadcrumbSchema, relatedGamesSchema, faqSchema] : [jsonLd, breadcrumbSchema, relatedGamesSchema]} />

            <div className="max-w-5xl mx-auto space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
            </div>

            <section className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-[0_0_30px_rgba(111,19,15,0.22)] bg-[#050404]">
                {playableSrc ? (
                    <GamePlayer iframeSrc={playableSrc} coverImg={game.img} title={game.title} />
                ) : (
                    <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-0 bg-[var(--color-surface)]">
                        <img src={game.img} alt={game.title} className="w-full h-full object-cover min-h-[260px]" />
                        <div className="p-8 flex flex-col justify-center">
                            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-cta)]">{game.tag}</p>
                            <h1 className="text-4xl font-bold text-white mt-3">{game.title}</h1>
                            <p className="text-[var(--color-text-muted)] mt-4">{game.summary}</p>
                        </div>
                    </div>
                )}

                <div className="p-6 sm:p-8 bg-[var(--color-surface)] border-t border-[var(--color-border-main)] space-y-6">
                    <div className="flex flex-wrap items-start justify-between gap-6">
                        <div className="max-w-3xl">
                            <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-cta)]">Game Detail</p>
                            <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">{game.title}</h1>
                            <p className="text-[var(--color-text-muted)] mt-4">{game.description}</p>
                        </div>

                        {game.slug === "idols-of-ash" ? (
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/games/idols-of-ash/guide"
                                    className="px-4 py-2 rounded bg-[var(--color-cta)] text-white font-bold text-sm hover:opacity-90 transition-opacity"
                                >
                                    Read Guide
                                </Link>
                                <Link
                                    href="/games/idols-of-ash/achievements"
                                    className="px-4 py-2 rounded border border-[var(--color-border-main)] text-white font-bold text-sm hover:bg-[var(--color-card)] transition-colors"
                                >
                                    Achievement Notes
                                </Link>
                                <Link
                                    href="/games/idols-of-ash/wiki"
                                    className="px-4 py-2 rounded border border-[var(--color-border-main)] text-white font-bold text-sm hover:bg-[var(--color-card)] transition-colors"
                                >
                                    Wiki
                                </Link>
                            </div>
                        ) : null}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <article className="rounded-xl border border-[var(--color-border-main)]/40 bg-black/15 p-5">
                            <h2 className="text-lg font-bold text-white">Overview</h2>
                            <p className="text-sm text-[var(--color-text-muted)] mt-3">{game.summary}</p>
                        </article>
                        <article className="rounded-xl border border-[var(--color-border-main)]/40 bg-black/15 p-5">
                            <h2 className="text-lg font-bold text-white">Store Facts</h2>
                            <p className="text-sm text-[var(--color-text-muted)] mt-3">
                                {game.releaseDate ? `Released ${game.releaseDate}. ` : ""}
                                {game.achievementCount ? `${game.achievementCount} achievements. ` : ""}
                                {game.reviewSummary ?? "Game page ready for direct play and deeper route pages."}
                            </p>
                        </article>
                        <article className="rounded-xl border border-[var(--color-border-main)]/40 bg-black/15 p-5">
                            <h2 className="text-lg font-bold text-white">Categories</h2>
                            <p className="text-sm text-[var(--color-text-muted)] mt-3">
                                {game.categories.join(", ")}
                            </p>
                        </article>
                    </div>

                    {(game.developer || game.publisher || game.languages?.length || game.features?.length) ? (
                        <div className="grid md:grid-cols-2 gap-4">
                            <article className="rounded-xl border border-[var(--color-border-main)]/40 bg-black/15 p-5">
                                <h2 className="text-lg font-bold text-white">Developer & Publisher</h2>
                                <p className="text-sm text-[var(--color-text-muted)] mt-3">
                                    {game.developer ? `Developer: ${game.developer}. ` : ""}
                                    {game.publisher ? `Publisher: ${game.publisher}.` : ""}
                                </p>
                            </article>
                            <article className="rounded-xl border border-[var(--color-border-main)]/40 bg-black/15 p-5">
                                <h2 className="text-lg font-bold text-white">Supported Setup</h2>
                                <p className="text-sm text-[var(--color-text-muted)] mt-3">
                                    {game.languages?.length ? `Languages: ${game.languages.slice(0, 5).join(", ")}${game.languages.length > 5 ? " and more" : ""}. ` : ""}
                                    {game.features?.length ? `Features: ${game.features.join(", ")}.` : ""}
                                </p>
                            </article>
                        </div>
                    ) : null}

                </div>
            </section>

            {game.slug === "idols-of-ash" ? (
                <section className="max-w-5xl mx-auto bg-[var(--color-surface)]/40 p-6 sm:p-8 rounded-xl border border-[var(--color-border-main)]/30">
                    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Idols of Ash FAQ</h2>
                            <p className="text-sm text-[var(--color-text-muted)] mt-2">
                                A compact set of questions for players arriving from search.
                            </p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {idolsOfAshFaqs.map((faq) => (
                            <article key={faq.question} className="rounded-xl border border-[var(--color-border-main)]/40 bg-black/15 p-5">
                                <h3 className="font-bold text-white">{faq.question}</h3>
                                <p className="text-sm text-[var(--color-text-muted)] mt-3">{faq.answer}</p>
                            </article>
                        ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-[var(--color-border-main)]/30 flex flex-wrap gap-3">
                        <Link href="/games/idols-of-ash/guide" className="text-sm text-[var(--color-cta)] hover:text-white transition-colors">
                            Guide
                        </Link>
                        <Link href="/games/idols-of-ash/achievements" className="text-sm text-[var(--color-cta)] hover:text-white transition-colors">
                            Achievements
                        </Link>
                        <Link href="/games/idols-of-ash/wiki" className="text-sm text-[var(--color-cta)] hover:text-white transition-colors">
                            Wiki
                        </Link>
                    </div>
                </section>
            ) : null}

            {game.slug !== "idols-of-ash" && game.seoSections?.length ? (
                <section className="max-w-5xl mx-auto bg-[var(--color-surface)]/40 p-6 sm:p-8 rounded-xl border border-[var(--color-border-main)]/30 space-y-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                            {game.title} Guide, Gameplay, And Overview
                        </h2>
                        <p className="text-sm text-[var(--color-text-muted)] mt-3 max-w-3xl">
                            This long-form section is based on public game pages and is structured to answer the main search questions around each title.
                        </p>
                    </div>

                    {game.seoSections.map((section) => (
                        <article key={section.title} className="space-y-4">
                            <h3 className="text-xl font-bold text-white">{section.title}</h3>
                            {section.paragraphs.map((paragraph) => (
                                <p key={paragraph} className="text-sm sm:text-base leading-8 text-[var(--color-text-main)]/90">
                                    {paragraph}
                                </p>
                            ))}
                        </article>
                    ))}
                </section>
            ) : null}

            {game.slug !== "idols-of-ash" && game.faqItems?.length ? (
                <section className="max-w-5xl mx-auto bg-[var(--color-surface)]/40 p-6 sm:p-8 rounded-xl border border-[var(--color-border-main)]/30">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white">{game.title} FAQ</h2>
                        <p className="text-sm text-[var(--color-text-muted)] mt-2">
                            Short answers pulled from the public game information used to build this page.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {game.faqItems.map((faq) => (
                            <article key={faq.question} className="rounded-xl border border-[var(--color-border-main)]/40 bg-black/15 p-5">
                                <h3 className="font-bold text-white">{faq.question}</h3>
                                <p className="text-sm text-[var(--color-text-muted)] mt-3">{faq.answer}</p>
                            </article>
                        ))}
                    </div>
                </section>
            ) : null}

            <CommentsSection gameSlug={game.slug} gameTitle={game.title} />

            <GameGridSection
                title="Similar Games"
                games={relatedGames}
                subtitle="Use related game pages to keep the session going without leaving the site."
            />
        </div>
    );
}
