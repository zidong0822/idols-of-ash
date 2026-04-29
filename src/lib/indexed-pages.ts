export const indexedGameSlugs = [
    "arrow-escape-puzzle",
    "robbery-duel",
    "stickman-kart-hero",
    "royal-story",
    "mazes-draw-the-path",
    "defence-wall",
    "idols-of-ash",
    "bullet-train-ii",
    "zone-survival-artifact-hunt",
    "obbyroads-io",
] as const;

export function isIndexedGameSlug(slug: string) {
    return indexedGameSlugs.includes(slug as (typeof indexedGameSlugs)[number]);
}
