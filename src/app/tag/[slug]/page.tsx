import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GameGridSection } from "@/components/GameGridSection";
import { StructuredData } from "@/components/StructuredData";
import { categoryMetadata, getGamesByCategory } from "@/data/games";
import { buildBreadcrumbSchema, buildItemListSchema, toAbsoluteUrl } from "@/lib/schema";

interface TagPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return Object.keys(categoryMetadata).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = categoryMetadata[slug];

    if (!category) {
        return {};
    }

    return {
        title: category.title,
        description: category.description,
        alternates: {
            canonical: `/tag/${slug}`,
        },
    };
}

export default async function TagPage({ params }: TagPageProps) {
    const { slug } = await params;
    const category = categoryMetadata[slug];

    if (!category) {
        notFound();
    }

    const games = getGamesByCategory(slug);
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Tags", href: "/popular-games" },
        { label: category.title },
    ];
    const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
    const itemListSchema = buildItemListSchema(
        category.title,
        games.map((game) => ({
            name: game.title,
            url: toAbsoluteUrl(`/games/${game.slug}`),
            image: toAbsoluteUrl(game.img),
        })),
        `/tag/${slug}`
    );

    return (
        <div className="space-y-6">
            <StructuredData data={[breadcrumbSchema, itemListSchema]} />
            <div className="max-w-5xl mx-auto">
                <Breadcrumbs items={breadcrumbItems} />
            </div>

            <section className="max-w-5xl mx-auto rounded-2xl border border-[var(--color-border-main)]/40 bg-[var(--color-surface)]/50 p-6 sm:p-8">
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-wider">{category.title}</h1>
                <p className="text-[var(--color-text-muted)] mt-4 max-w-3xl">{category.description}</p>
            </section>

            <GameGridSection title={category.title} games={games} />
        </div>
    );
}
