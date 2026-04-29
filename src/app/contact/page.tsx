import { Metadata } from "next";
import Link from "next/link";
import { ContentPageLayout } from "@/components/ContentPageLayout";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contact and reporting guidance for Idols of Ash, including corrections, policy questions, and advertising inquiries.",
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    return (
        <ContentPageLayout title="Contact">
            <p>
                This page explains how to send useful feedback about <strong>Idols of Ash</strong>, including content
                corrections, broken embeds, policy questions, and advertising-related concerns.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Best Way To Report A Page Issue</h2>
            <p>
                For a specific game page, the fastest reporting path is the page comment section. Include the exact URL,
                what appears to be incorrect, and what changed in the game or embed behavior.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">What To Include</h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)]">
                <li>The full page URL.</li>
                <li>A short description of the issue.</li>
                <li>Whether the problem is factual, technical, or policy-related.</li>
                <li>Any source page or observable detail that helps verify the correction.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Advertising And Policy Questions</h2>
            <p>
                If your question is about advertising placement, policy, or disclosure, use this page as the public
                policy reference and include the relevant page URL in your message or report. Requests that lack a page
                reference are slower to review.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Response Expectations</h2>
            <p>
                We prioritize corrections involving broken play pages, inaccurate gameplay claims, or misleading public
                metadata. Lower-priority editorial suggestions may take longer to review.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Related Policies</h2>
            <p>
                Before sending a report, review the{" "}
                <Link href="/about-us" className="text-[var(--color-cta)] hover:text-white transition-colors">
                    About Us
                </Link>
                ,{" "}
                <Link href="/privacy-policy" className="text-[var(--color-cta)] hover:text-white transition-colors">
                    Privacy Policy
                </Link>
                , and{" "}
                <Link href="/terms-of-service" className="text-[var(--color-cta)] hover:text-white transition-colors">
                    Terms of Service
                </Link>{" "}
                pages for editorial and site-operations context.
            </p>
        </ContentPageLayout>
    );
}
