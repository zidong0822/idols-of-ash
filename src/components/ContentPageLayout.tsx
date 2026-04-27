import React from 'react';

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
}

export function ContentPageLayout({ title, children }: PageLayoutProps) {
    return (
        <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 space-y-8">
            {/* Title treatment kept stark and low-glow to match the game's tone. */}
            <h1 className="text-3xl sm:text-5xl font-black text-center text-white mb-12 tracking-wider drop-shadow-[0_0_15px_rgba(111,19,15,0.35)]">
                {title}
            </h1>

            <article className="bg-[var(--color-surface)]/60 backdrop-blur-lg border border-[var(--color-border-main)]/50 rounded-2xl p-6 sm:p-10 shadow-2xl text-[var(--color-text-main)] prose prose-invert max-w-none leading-relaxed">
                {children}
            </article>
        </div>
    );
}
