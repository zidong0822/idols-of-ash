import { MetadataRoute } from 'next'
import { games } from "@/data/games";
import { indexedGameSlugs } from "@/lib/indexed-pages";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://idols-of-ash.org'
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about-us`,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/games/idols-of-ash/guide`,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/games/idols-of-ash/achievements`,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/games/idols-of-ash/wiki`,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    const gamePages: MetadataRoute.Sitemap = games
        .filter((game) => indexedGameSlugs.includes(game.slug as (typeof indexedGameSlugs)[number]))
        .map((game) => ({
        url: `${baseUrl}/games/${game.slug}`,
        lastModified: new Date("2026-03-30"),
        changeFrequency: 'weekly',
        priority: game.slug === "idols-of-ash" ? 0.95 : 0.75,
    }));
    
    return [...staticPages, ...gamePages]
}
