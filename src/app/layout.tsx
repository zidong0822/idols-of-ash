import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';

const displayFont = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    variable: "--font-display",
    display: "swap",
});

const bodyFont = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Idols of Ash - Play Online Unblocked (No Download)",
    description: "Play Idols of Ash unblocked in your browser. Experience this viral first-person horror climbing game with zero downloads. Master Schmovement & survive.",
    keywords: ["idols of ash", "unblocked", "no download", "horror parkour", "browser game", "first person"],
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
        title: "Idols of Ash | Free First-Person Horror Parkour Game",
        description: "Play Idols of Ash, a dark fantasy first-person horror and parkour game. Experience the thrill of 'Schmovement' and survive.",
        siteName: "Idols of Ash",
        images: ["/games/covers/idols-of-ash.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Idols of Ash | Free First-Person Horror Parkour Game",
        description: "Play Idols of Ash, a dark fantasy first-person horror and parkour game.",
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
        <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
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
                            <a href="/hot-games" className="px-3 py-2 rounded-sm border border-[var(--color-border-main)]/80 text-[var(--color-text-main)] hover:text-white hover:bg-[var(--color-card)] transition-colors">
                                Hot Games
                            </a>
                            <Link href="/" className="px-3 py-2 rounded-sm border border-[var(--color-border-main)]/80 text-[var(--color-text-main)] hover:text-white hover:bg-[var(--color-card)] transition-colors">
                                Idols of Ash
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
