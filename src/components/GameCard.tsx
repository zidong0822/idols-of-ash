import Link from "next/link";
import { Game } from "@/data/games";

interface GameCardProps {
    game: Game;
}

export function GameCard({ game }: GameCardProps) {
    return (
        <Link
            href={`/games/${game.slug}`}
            className="group relative rounded-lg overflow-hidden cursor-pointer border border-[var(--color-border-main)]/40 bg-[var(--color-surface)] hover:border-[var(--color-primary)] glow-border select-none block"
        >
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-black/50">
                <img
                    src={game.img}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-300"
                    loading="lazy"
                />
                <div
                    className={`absolute top-1 left-1 sm:top-2 sm:left-2 px-1.5 py-0.5 sm:px-2 rounded text-[10px] sm:text-xs font-bold text-white tracking-wider z-10 ${
                        game.tag === "HOT"
                            ? "bg-[#8a2f24] shadow-[0_0_8px_rgba(138,47,36,0.65)]"
                            : "bg-[#786244] shadow-[0_0_8px_rgba(181,138,88,0.42)]"
                    }`}
                >
                    {game.tag}
                </div>
            </div>
            <div className="p-2 sm:p-3">
                <h3 className="text-sm font-semibold truncate text-[var(--color-text-main)] group-hover:text-white transition-colors">
                    {game.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">
                    {game.summary}
                </p>
            </div>
        </Link>
    );
}
