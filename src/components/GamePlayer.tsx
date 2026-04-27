"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { PlayableFrame } from "@/components/PlayableFrame";

interface GamePlayerProps {
    /** iframe 游戏地址 */
    iframeSrc: string;
    /** 封面图路径 */
    coverImg: string;
    /** 游戏标题 */
    title: string;
}

/**
 * 游戏播放器组件：初始显示封面和 Play Now 按钮，
 * 点击后才加载 iframe，节省页面初始加载资源。
 */
export function GamePlayer({ iframeSrc, coverImg, title }: GamePlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    if (isPlaying) {
        return <PlayableFrame iframeSrc={iframeSrc} title={title} />;
    }

    return (
        <div
            className="relative w-full aspect-[16/9] cursor-pointer group overflow-hidden"
            onClick={() => setIsPlaying(true)}
        >
            {/* 模糊背景层 */}
            <img
                src={coverImg}
                alt={`${title} background`}
                className="absolute inset-0 w-full h-full object-cover blur-md scale-110 brightness-[0.22] saturate-[0.7]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(111,19,15,0.08),transparent_28%),linear-gradient(180deg,rgba(5,4,4,0.18),rgba(5,4,4,0.72))]" />

            {/* 居中内容区 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
                {/* 封面图 */}
                <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-md overflow-hidden shadow-2xl shadow-[rgba(75,10,8,0.45)] ring-1 ring-[rgba(213,189,157,0.18)]">
                    <img
                        src={coverImg}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                {/* Play Now 按钮 */}
                <button
                    className="flex items-center gap-3 px-10 py-3.5 rounded-sm text-white font-semibold text-lg tracking-[0.08em] uppercase
                               bg-gradient-to-r from-[#45100d] via-[var(--color-cta)] to-[#a26c39]
                               shadow-[0_0_28px_rgba(111,19,15,0.35)]
                               ring-1 ring-[rgba(214,194,171,0.2)]
                               hover:shadow-[0_0_40px_rgba(111,19,15,0.45)]
                               hover:scale-105 active:scale-95
                               transition-all duration-300 ease-out"
                >
                    Play Now
                    <Play className="w-5 h-5 fill-white" />
                </button>
            </div>
        </div>
    );
}
