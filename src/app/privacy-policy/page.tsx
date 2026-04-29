import { Metadata } from "next";
import Link from "next/link";
import { ContentPageLayout } from "@/components/ContentPageLayout";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Read the privacy policy for Idols of Ash, including analytics, embedded game content, and comment handling.",
    alternates: {
        canonical: "/privacy-policy",
    },
};

export default function PrivacyPolicyPage() {
    return (
        <ContentPageLayout title="Privacy Policy">
            <p>
                This Privacy Policy explains what information <strong>Idols of Ash</strong> may collect, how that
                information is used, and what visitors should expect when browsing game pages, support content, and
                comment features on this site.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Information We Collect</h2>
            <p>
                We collect limited technical data needed to operate the site, understand traffic trends, and keep
                pages functioning. That may include analytics events, approximate device or browser information,
                referrer data, and standard server-side request logs.
            </p>
            <p>
                If you submit a comment, we store the name you enter, the text of your comment, and the timestamp
                associated with that submission.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">How We Use Information</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)]">
                <li>To operate, secure, and improve the site.</li>
                <li>To understand which pages and content formats are useful to visitors.</li>
                <li>To detect abuse, spam, or misuse of interactive features such as comments.</li>
                <li>To review correction requests, gameplay notes, or page-quality issues submitted by visitors.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Analytics And Advertising</h2>
            <p>
                We may use analytics tools to understand page performance and visitor behavior at an aggregate level.
                We may also use advertising partners, including Google, to serve ads on some pages.
            </p>
            <p>
                Advertising providers may use cookies or similar technologies to deliver, measure, or limit ads. If
                advertising is active on the site, those providers may process technical browsing information in
                accordance with their own policies.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Embedded Game Content</h2>
            <p>
                Some game pages load playable browser content from third-party sources inside embedded frames. When you
                start a game, the external provider may collect technical information according to its own privacy
                practices. We recommend reviewing the relevant provider policy when that matters to you.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Comments And User Content</h2>
            <p>
                Comments are intended for useful player notes, corrections, and page-specific feedback. We may review,
                limit, or remove submissions that appear abusive, irrelevant, automated, deceptive, or unsafe.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Data Retention</h2>
            <p>
                We keep operational logs and submitted comments for as long as they remain useful for site operations,
                moderation, analytics, or record-keeping, unless a shorter period is required by law or an item is
                removed during maintenance.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Your Choices</h2>
            <p>
                You can choose not to submit comments or other optional information. You may also block cookies or
                limit analytics through your browser settings, though some site features may work differently as a
                result.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Policy Updates</h2>
            <p>
                We may update this policy when the site structure, providers, or data practices change. Material
                revisions will be reflected on this page.
            </p>

            <p className="mt-8">
                For site policies and reporting paths, also review the{" "}
                <Link href="/terms-of-service" className="text-[var(--color-cta)] hover:text-white transition-colors">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/contact" className="text-[var(--color-cta)] hover:text-white transition-colors">
                    Contact
                </Link>{" "}
                pages.
            </p>
        </ContentPageLayout>
    );
}
