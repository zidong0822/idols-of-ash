import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { idolsOfAshFaqs } from "@/data/games";

export const metadata: Metadata = {
    title: "Idols of Ash FAQ",
    description: "Quick answers for common Idols of Ash questions about gameplay, progression, and where to start.",
    alternates: {
        canonical: "/games/idols-of-ash/faq",
    },
    openGraph: {
        title: "Idols of Ash FAQ",
        description: "Quick answers for common Idols of Ash questions about gameplay, progression, and where to start.",
        url: "https://idols-of-ash.org/games/idols-of-ash/faq",
        images: ["/games/covers/idols-of-ash.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Idols of Ash FAQ",
        description: "Quick answers for common Idols of Ash questions about gameplay, progression, and where to start.",
        images: ["/games/covers/idols-of-ash.png"],
    },
};

export default function ScritchyScratchyFaqPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: idolsOfAshFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <div className="space-y-6">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="max-w-4xl mx-auto">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Games", href: "/popular-games" },
                        { label: "Idols of Ash", href: "/games/idols-of-ash" },
                        { label: "FAQ" },
                    ]}
                />
            </div>

            <ContentPageLayout title="Idols of Ash FAQ">
                <p>
                    These answers are built from the official store listing plus the first wave of launch discussion, so
                    they focus on the questions players actually asked rather than generic filler.
                </p>
                {idolsOfAshFaqs.map((faq) => (
                    <section key={faq.question}>
                        <h2 className="text-2xl font-bold mt-8 mb-4 text-white">{faq.question}</h2>
                        <p>{faq.answer}</p>
                    </section>
                ))}
            </ContentPageLayout>
        </div>
    );
}
