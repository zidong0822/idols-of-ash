import { Game } from "@/data/games";
import { GameCard } from "@/components/GameCard";

interface GameGridSectionProps {
    title: string;
    games: Game[];
    subtitle?: string;
}

export function GameGridSection({ title, games, subtitle }: GameGridSectionProps) {
    return (
        <section className="pt-6 border-t border-[var(--color-border-main)]/50">
            <div className="flex justify-between items-end mb-6 gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide border-l-4 border-[var(--color-cta)] pl-3">
                        {title}
                    </h2>
                    {subtitle ? (
                        <p className="text-sm text-[var(--color-text-muted)] mt-2">{subtitle}</p>
                    ) : null}
                </div>
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
                {games.map((game) => (
                    <GameCard key={game.slug} game={game} />
                ))}
            </div>
        </section>
    );
}

