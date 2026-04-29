import React from 'react';
import {
    Heart,
    TrainFront,
    Crosshair
} from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
    const menuItems = [
        { icon: <Heart className="w-5 h-5" />, label: "Home", href: "/", ext: "text-[#c8705f]" },
        { icon: <Heart className="w-5 h-5" />, label: "Idols of Ash", href: "/games/idols-of-ash", ext: "text-[var(--color-cta)]" },
        { icon: <TrainFront className="w-5 h-5" />, label: "Bullet Train II", href: "/games/bullet-train-ii", ext: "text-[var(--color-secondary)]" },
        { icon: <Crosshair className="w-5 h-5" />, label: "Zone Survival", href: "/games/zone-survival-artifact-hunt", ext: "text-[#c2a37a]" },
        { icon: <Heart className="w-5 h-5" />, label: "About Us", href: "/about-us", ext: "text-[#8c7b66]" },
        { icon: <Heart className="w-5 h-5" />, label: "Review Method", href: "/how-we-review-games", ext: "text-[#8c7b66]" },
        { icon: <Heart className="w-5 h-5" />, label: "Contact", href: "/contact", ext: "text-[#8c7b66]" },
    ];

    return (
        <>
            <div className="w-[60px] md:w-[60px] hover:w-[220px] shrink-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] bg-[var(--color-surface)]/96 fixed h-full border-r border-[var(--color-border-main)]/50 left-[0px] top-0 hidden md:block group overflow-hidden shadow-[2px_0_24px_rgba(0,0,0,0.55)]">

                {/* Logo Area */}
                <Link
                    href="/"
                    className="h-[70px] w-full flex items-center px-[18px] border-b border-[var(--color-border-main)]/30 group-hover:px-[20px] transition-all hover:bg-[var(--color-card)]/50"
                >
                    <div className="w-7 h-7 rounded-sm shrink-0 flex items-center justify-center border border-[var(--color-border-main)]/50 bg-[linear-gradient(180deg,rgba(138,47,36,0.18),rgba(0,0,0,0.18))] shadow-[0_0_12px_rgba(111,19,15,0.22)]">
                        <span className="font-black text-[13px] leading-none tracking-[0.08em] gradient-text">IA</span>
                    </div>
                    <span className="ml-3 text-xl font-black gradient-text opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-[0.12em] font-display shrink-0">Idols of Ash</span>
                </Link>

                {/* Scrollable Nav Area */}
                <div className="flex flex-col h-[calc(100vh-70px)] overflow-y-auto overflow-x-hidden scrollbar-hide py-4 space-y-6">

                    <nav className="flex flex-col space-y-1 w-[220px] px-2">
                        {menuItems.map((item, idx) => (
                            <Link href={item.href} key={idx} className="flex items-center px-[12px] h-10 rounded-lg hover:bg-[var(--color-card)] transition-colors group/item">
                                <div className={`shrink-0 flex items-center justify-center w-[24px] ${item.ext}`}>
                                    {item.icon}
                                </div>
                                <span className="ml-3 text-[14px] font-semibold text-[var(--color-text-main)] group-hover/item:text-white transition-colors opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}
