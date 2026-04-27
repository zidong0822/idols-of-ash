import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-muted)]">
            <ol className="flex flex-wrap items-center gap-2">
                {items.map((item, index) => (
                    <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                        {item.href ? (
                            <Link href={item.href} className="hover:text-white transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-white">{item.label}</span>
                        )}
                        {index < items.length - 1 ? <span>/</span> : null}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
