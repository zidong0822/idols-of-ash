import React from 'react';
import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-[var(--color-border-main)]/50 bg-[#0d0a09] mt-20 pt-16 pb-8 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
                {/* Brand & Rights Area */}
                <div className="md:max-w-sm space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[var(--color-cta)] to-[var(--color-secondary)] shadow-[0_0_15px_rgba(111,19,15,0.38)] flex items-center justify-center">
                            <span className="text-white text-sm font-bold font-sans">I</span>
                        </div>
                        <span className="text-2xl font-black gradient-text tracking-[0.12em]">Idols of Ash</span>
                    </div>
                    <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                        Your ultimate destination for the first-person horror parkour game. Experience Schmovement and survive the cursed environment.
                    </p>
                    <div className="pt-4 text-xs text-[var(--color-text-muted)]/70">
                        © {currentYear} Idols of Ash. All rights reserved.
                    </div>
                </div>

                {/* Links Area */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-16">
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wider">PAGES</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="text-[var(--color-text-muted)] hover:text-white transition-colors">Home Page</Link></li>
                            <li><Link href="/games/idols-of-ash" className="text-[var(--color-text-muted)] hover:text-white transition-colors">Idols of Ash</Link></li>
                            <li><Link href="/games/bullet-train-ii" className="text-[var(--color-text-muted)] hover:text-white transition-colors">Bullet Train II</Link></li>
                            <li><Link href="/games/zone-survival-artifact-hunt" className="text-[var(--color-text-muted)] hover:text-white transition-colors">Zone Survival Artifact Hunt</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wider">SUPPORT</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about-us" className="text-[var(--color-text-muted)] hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/how-we-review-games" className="text-[var(--color-text-muted)] hover:text-white transition-colors">How We Review Games</Link></li>
                            <li><Link href="/contact" className="text-[var(--color-text-muted)] hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/privacy-policy" className="text-[var(--color-text-muted)] hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="text-[var(--color-text-muted)] hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wider">RESOURCES</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/games/idols-of-ash/guide" className="text-[var(--color-text-muted)] hover:text-white transition-colors">Guide</Link></li>
                            <li><Link href="/games/idols-of-ash/achievements" className="text-[var(--color-text-muted)] hover:text-white transition-colors">Achievements</Link></li>
                            <li><Link href="/games/idols-of-ash/wiki" className="text-[var(--color-text-muted)] hover:text-white transition-colors">Wiki</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
