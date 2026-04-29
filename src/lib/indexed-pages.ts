export const indexedGameSlugs = [
    "idols-of-ash",
    "bullet-train-ii",
    "zone-survival-artifact-hunt",
] as const;

export function isIndexedGameSlug(slug: string) {
    return indexedGameSlugs.includes(slug as (typeof indexedGameSlugs)[number]);
}
