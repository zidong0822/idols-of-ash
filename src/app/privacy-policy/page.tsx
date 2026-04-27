import { ContentPageLayout } from "@/components/ContentPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Learn how Idols of Ash collects, uses, and protects information related to site visits, analytics, advertising, and support requests.",
    alternates: {
        canonical: "/privacy-policy",
    },
};

export default function PrivacyPolicy() {
    return (
        <ContentPageLayout title="Privacy Policy">
            <p>
                This Privacy Policy explains how <strong>Idols of Ash</strong>, accessible at{" "}
                <a href="https://idols-of-ash.org" className="text-[var(--color-primary)] hover:underline">
                    idols-of-ash.org
                </a>
                , collects, uses, and protects information related to your use of the site.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
            <p>
                Like most websites, we may collect standard technical information when you visit the site. This can include IP address, browser type, device information, approximate location, referrer data, visited pages, and timestamps. This information helps us operate, secure, and improve the site.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Analytics</h2>
            <p>
                We use analytics tools to understand how visitors use the site. These tools may collect information such as page views, navigation behavior, session details, and device or browser data. We use this information to improve page quality, navigation, and overall site performance.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Advertising</h2>
            <p>
                The site may display advertising provided by third-party ad services. These services may use cookies, local storage, or similar technologies to deliver ads, measure performance, and limit repetitive ad delivery. Your interactions with these services may be subject to the privacy policies of those providers.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Cookies</h2>
            <p>
                We and our service providers may use cookies and similar technologies to remember preferences, understand traffic patterns, improve site functionality, and support analytics or advertising. You can control cookies through your browser settings, although disabling them may affect some parts of the site.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Embedded And Third-Party Content</h2>
            <p>
                Some game pages on Idols of Ash include embedded or externally served game content. When you use those pages, the third-party source may receive technical information such as your IP address, browser details, and interaction data. Those providers operate under their own privacy practices, which we do not control.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Email And Support Requests</h2>
            <p>
                If you contact us by email, we may retain the information you provide, including your email address and the contents of your message, in order to respond, investigate the issue you reported, and maintain support records.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Children&apos;s Privacy</h2>
            <p>
                Idols of Ash does not knowingly collect personal information from children under the age of 13. If you believe a child has provided personal information to us directly, please contact us and we will review the situation and take appropriate action.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Policy Updates</h2>
            <p>
                We may update this Privacy Policy from time to time as the site changes. If we make material changes, the updated version will appear on this page.
            </p>
        </ContentPageLayout>
    );
}
