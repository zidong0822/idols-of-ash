import { MetadataRoute } from 'next'
import { categoryMetadata, games } from "@/data/games";

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
            url: `${baseUrl}/hot-games`,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/new-games`,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/popular-games`,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about-us`,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms-of-service`,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact-us`,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/dmca`,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'monthly',
            priority: 0.5,
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
            url: `${baseUrl}/games/idols-of-ash/faq`,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/games/idols-of-ash/wiki`,
            lastModified: new Date("2026-03-30"),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    const gamePages: MetadataRoute.Sitemap = games.map((game) => ({
        url: `${baseUrl}/games/${game.slug}`,
        lastModified: new Date("2026-03-30"),
        changeFrequency: 'weekly',
        priority: game.slug === "idols-of-ash" ? 0.95 : 0.75,
    }));

    const tagPages: MetadataRoute.Sitemap = Object.keys(categoryMetadata).map((slug) => ({
        url: `${baseUrl}/tag/${slug}`,
        lastModified: new Date("2026-03-30"),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));
    
    return [...staticPages, ...gamePages, ...tagPages]
}
