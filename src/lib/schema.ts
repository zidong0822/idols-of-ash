interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface ListItemInput {
    name: string;
    url: string;
    image?: string;
}

const siteUrl = "https://idols-of-ash.org";

export function toAbsoluteUrl(path: string) {
    if (path.startsWith("http")) {
        return path;
    }

    return `${siteUrl}${path}`;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: item.href ? toAbsoluteUrl(item.href) : undefined,
        })),
    };
}

export function buildItemListSchema(name: string, items: ListItemInput[], url: string) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name,
        url: toAbsoluteUrl(url),
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: item.url,
            name: item.name,
            image: item.image,
        })),
    };
}

export function buildWebsiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Idols of Ash",
        url: siteUrl,
    };
}
