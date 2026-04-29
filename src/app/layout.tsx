import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
    title: "Idols of Ash - Browser Game Guides, Play Pages, and Support Content",
    description: "Explore Idols of Ash game pages, browser-playable experiences, practical guides, and support content focused on fast access and clear game information.",
    keywords: ["idols of ash", "browser game", "game guides", "play pages", "horror parkour", "first person"],
    authors: [{ name: "Idols of Ash Team" }],
    creator: "Idols of Ash",
    metadataBase: new URL("https://idols-of-ash.org"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://idols-of-ash.org",
        title: "Idols of Ash | Browser Game Pages, Guides, and Support Content",
        description: "Explore Idols of Ash game pages, browser-playable experiences, practical guides, and support content.",
        siteName: "Idols of Ash",
        images: ["/games/covers/idols-of-ash.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Idols of Ash | Browser Game Pages, Guides, and Support Content",
        description: "Explore Idols of Ash game pages, browser-playable experiences, practical guides, and support content.",
        images: ["/games/covers/idols-of-ash.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="google-adsense-account" content="ca-pub-2692320437029895" />
            </head>
            <body className="antialiased min-h-screen flex text-[var(--color-text-main)] overflow-x-hidden">
                <GoogleAnalytics gaId="G-G1ZQVJ6XZP" />
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2692320437029895"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
                {/* Sidebar Reserved */}
                <Sidebar />

                <div className="flex-1 flex flex-col min-w-0 md:ml-[60px] pb-12">
                    {/* Top Navbar Reserved */}
                    <header className="h-[70px] w-full sticky top-0 z-40 bg-[var(--color-surface)]/88 backdrop-blur-md border-b border-[var(--color-border-main)]/60 flex items-center px-4 justify-between">
                        {/* Mobile Menu & Logo */}
                        <div className="flex items-center gap-4">
                            <button className="md:hidden p-2 text-[var(--color-text-main)] hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                            </button>
                            <Link href="/" className="font-black text-2xl tracking-[0.16em] text-white uppercase gradient-text hover:opacity-90 transition-opacity">
                                Idols of Ash
                            </Link>
                        </div>

                        <div className="hidden sm:flex items-center gap-3 text-sm">
                            <Link href="/" className="px-3 py-2 rounded-sm border border-[var(--color-border-main)]/80 text-[var(--color-text-main)] hover:text-white hover:bg-[var(--color-card)] transition-colors">
                                Home
                            </Link>
                            <Link href="/games/idols-of-ash" className="px-3 py-2 rounded-sm border border-[var(--color-border-main)]/80 text-[var(--color-text-main)] hover:text-white hover:bg-[var(--color-card)] transition-colors">
                                Idols of Ash
                            </Link>
                            <Link href="/games/bullet-train-ii" className="px-3 py-2 rounded-sm border border-[var(--color-border-main)]/80 text-[var(--color-text-main)] hover:text-white hover:bg-[var(--color-card)] transition-colors">
                                Bullet Train II
                            </Link>
                        </div>
                    </header>

                    {/* Main Page Area */}
                    <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
