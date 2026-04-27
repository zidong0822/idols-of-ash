import { ContentPageLayout } from "@/components/ContentPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Read the rules and guidelines for using the Idols of Ash website and its game pages.",
    alternates: {
        canonical: "/terms-of-service",
    },
};

export default function TermsOfService() {
    return (
        <ContentPageLayout title="Terms of Service">
            <p>
                By accessing or using Idols of Ash, you agree to these terms. If you do not agree with them, you should stop using the site.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Use Of The Site</h2>
            <p>
                Idols of Ash is intended for lawful personal use. You agree not to misuse the site, interfere with its operation, attempt to bypass access restrictions, or use automated methods to damage, overload, or disrupt the service.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Game Content And External Sources</h2>
            <p>
                Some pages on the site include embedded or externally delivered game content. We may organize, describe, or link to these experiences, but we do not guarantee the continued availability of any third-party source. External game providers may change, restrict, remove, or update their content without notice.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property</h2>
            <p>
                Unless otherwise stated, the site layout, original page text, branding, and other original site materials are owned by Idols of Ash or used with permission. Individual game names, trademarks, logos, and related assets remain the property of their respective owners.
            </p>

            <div className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border-main)]/50 text-[var(--color-text-muted)] my-6">
                <p className="font-bold text-white mb-2">You must not:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Republish or redistribute original site content as if it were your own.</li>
                    <li>Use the site in a way that breaks laws or infringes the rights of others.</li>
                    <li>Attempt to interfere with site performance, security, or availability.</li>
                    <li>Misrepresent your relationship with Idols of Ash, its content, or the games presented on the site.</li>
                </ul>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">No Guarantee Of Availability</h2>
            <p>
                We try to keep the site accurate and available, but we do not guarantee uninterrupted access, complete accuracy, or permanent availability of every page, embed, or linked resource.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Changes To These Terms</h2>
            <p>
                We may update these Terms of Service as the site evolves. Continued use of the site after changes are published means you accept the updated terms.
            </p>
        </ContentPageLayout>
    );
}
