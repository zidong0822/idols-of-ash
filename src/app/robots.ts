import { MetadataRoute } from "next";

const baseUrl = "https://idols-of-ash.org";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
