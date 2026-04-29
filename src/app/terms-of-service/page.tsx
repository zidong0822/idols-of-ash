import { Metadata } from "next";
import Link from "next/link";
import { ContentPageLayout } from "@/components/ContentPageLayout";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Read the terms of service for using Idols of Ash, including embedded game pages and comment features.",
    alternates: {
        canonical: "/terms-of-service",
    },
};

export default function TermsOfServicePage() {
    return (
        <ContentPageLayout title="Terms of Service">
            <p>
                These Terms of Service govern your use of <strong>Idols of Ash</strong>. By using the site, you agree
                to use it lawfully, responsibly, and in a way that does not disrupt the experience for other visitors.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Site Purpose</h2>
            <p>
                Idols of Ash publishes browser-game pages, reference content, and player support material. We aim to
                keep information accurate and useful, but page content may change as games, embeds, or public source
                information evolve.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Acceptable Use</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)]">
                <li>Do not misuse the site, attempt to disrupt access, or interfere with embedded content.</li>
                <li>Do not post spam, abusive comments, misleading information, or unlawful material.</li>
                <li>Do not attempt to scrape, overload, or automate site features in a harmful way.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Comments And Submissions</h2>
            <p>
                If you submit a comment or feedback item, you are responsible for the content you provide. We may
                moderate, remove, or limit content that appears low-quality, unsafe, deceptive, or unrelated to the
                page where it was posted.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Third-Party Content</h2>
            <p>
                Some pages include external embeds or references to third-party game providers. We do not control every
                aspect of those services, and their availability, performance, or policies may change without notice.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">No Guarantee Of Availability</h2>
            <p>
                We work to keep pages online and usable, but we do not guarantee uninterrupted availability, permanent
                access to any specific embed, or error-free operation across every browser or device.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Intellectual Property</h2>
            <p>
                Game trademarks, publisher names, screenshots, and embedded content may belong to their respective
                owners. Site-specific editorial text, page organization, and original support content belong to Idols
                of Ash unless stated otherwise.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Policy Changes</h2>
            <p>
                We may revise these terms as the site changes. Continued use of the site after updates means you accept
                the revised terms.
            </p>

            <p className="mt-8">
                For related details, review our{" "}
                <Link href="/privacy-policy" className="text-[var(--color-cta)] hover:text-white transition-colors">
                    Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/contact" className="text-[var(--color-cta)] hover:text-white transition-colors">
                    Contact
                </Link>{" "}
                page.
            </p>
        </ContentPageLayout>
    );
}
