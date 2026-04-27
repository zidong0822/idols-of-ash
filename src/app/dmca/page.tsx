import { ContentPageLayout } from "@/components/ContentPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "DMCA Policy",
    description: "Read the Digital Millennium Copyright Act policy for Idols of Ash and how to submit a notice.",
    alternates: {
        canonical: "/dmca",
    },
};

export default function DMCA() {
    return (
        <ContentPageLayout title="DMCA Policy">
            <p>
                Idols of Ash respects the intellectual property rights of others and expects others to respect our rights as well. If you believe material available on the site infringes your copyright, you may submit a DMCA notice for review.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">How To Submit A Notice</h2>
            <p>
                If you are a copyright owner or authorized to act on behalf of one, please send a clear written notice to our designated DMCA contact:
            </p>

            <p className="mt-4">
                <a href="mailto:dmca@idols-of-ash.org" className="text-[var(--color-primary)] hover:underline">
                    dmca@idols-of-ash.org
                </a>
            </p>

            <div className="p-6 bg-[var(--color-card)] rounded-xl border border-[var(--color-border-main)]/50 text-[var(--color-text-muted)] space-y-3">
                <p>Please include the following in your notice:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li>A description of the copyrighted work you claim has been infringed.</li>
                    <li>The exact URL or material on the site that you believe is infringing.</li>
                    <li>Your name, mailing address, telephone number, and email address.</li>
                    <li>A statement that you have a good faith belief the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
                    <li>A statement that the information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or authorized to act on the owner&apos;s behalf.</li>
                </ul>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">What Happens Next</h2>
            <p>
                Once we receive a valid notice, we will review the claim and take appropriate action, which may include removing or disabling access to the material while the issue is investigated.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Important Note</h2>
            <p>
                Because some pages on Idols of Ash may include third-party embeds or externally served game content, please identify the exact page and material involved so we can review the request efficiently.
            </p>
        </ContentPageLayout>
    );
}
