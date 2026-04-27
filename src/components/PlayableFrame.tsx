"use client";

import { useRef } from "react";
import { Maximize2 } from "lucide-react";

interface PlayableFrameProps {
    iframeSrc: string;
    title: string;
}

export function PlayableFrame({ iframeSrc, title }: PlayableFrameProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleFullscreen = async () => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        if (document.fullscreenElement) {
            await document.exitFullscreen();
            return;
        }

        await container.requestFullscreen();
    };

    return (
        <div ref={containerRef} className="relative w-full aspect-[16/9] bg-black">
            <iframe
                src={iframeSrc}
                className="absolute top-0 left-0 w-full h-full border-0"
                title={`${title} Gameplay`}
                allow="fullscreen"
                allowFullScreen
            />
            <button
                type="button"
                onClick={handleFullscreen}
                className="absolute top-3 right-3 z-10 inline-flex items-center gap-2 rounded-sm border border-[rgba(229,221,210,0.2)] bg-black/55 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition-colors hover:bg-black/75"
                aria-label={`Toggle fullscreen for ${title}`}
                title="Fullscreen"
            >
                <Maximize2 className="h-4 w-4" />
                <span className="hidden sm:inline">Fullscreen</span>
            </button>
        </div>
    );
}
