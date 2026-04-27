import { ContentPageLayout } from "@/components/ContentPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with the Idols of Ash team for support, copyright concerns, business inquiries, or general feedback.",
    alternates: {
        canonical: "/contact-us",
    },
};

export default function ContactUs() {
    return (
        <ContentPageLayout title="Contact Us">
            <p>
                If you need help with the site, want to report a broken game page, have a rights-related concern, or need to discuss a business matter, use the contact points below.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border-main)]">
                    <h3 className="text-xl font-bold text-white mb-2">General & Editorial</h3>
                    <p className="text-[var(--color-text-muted)] mb-4">For general questions, game suggestions, business inquiries, or feedback about the site.</p>
                    <a href="mailto:contact@idols-of-ash.org" className="text-[var(--color-primary)] font-bold hover:underline">contact@idols-of-ash.org</a>
                </div>

                <div className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border-main)]">
                    <h3 className="text-xl font-bold text-white mb-2">Support & Technical</h3>
                    <p className="text-[var(--color-text-muted)] mb-4">For broken embeds, loading issues, incorrect game details, or other technical problems on the site.</p>
                    <a href="mailto:support@idols-of-ash.org" className="text-[var(--color-primary)] font-bold hover:underline">support@idols-of-ash.org</a>
                </div>
            </div>

            <div className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border-main)] mt-8">
                <h3 className="text-xl font-bold text-white mb-2">Copyright & DMCA</h3>
                <p className="text-[var(--color-text-muted)] mb-4">For takedown notices and other rights-related issues, please use our dedicated copyright contact.</p>
                <a href="mailto:dmca@idols-of-ash.org" className="text-[var(--color-primary)] font-bold hover:underline">dmca@idols-of-ash.org</a>
            </div>

            <p className="mt-10 text-sm text-[var(--color-text-muted)] italic text-center">
                Please allow 24 to 48 hours for a response. When reporting a specific problem, include the full page URL and a short description of what happened.
            </p>
        </ContentPageLayout>
    );
}
