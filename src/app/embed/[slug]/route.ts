import { NextResponse } from "next/server";
import { getGameBySlug } from "@/data/games";
import { isIndexedGameSlug } from "@/lib/indexed-pages";

interface EmbedRouteProps {
    params: Promise<{
        slug: string;
    }>;
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

export async function GET(_request: Request, { params }: EmbedRouteProps) {
    const { slug } = await params;

    if (!isIndexedGameSlug(slug)) {
        return new NextResponse("Not found", { status: 404 });
    }

    const game = getGameBySlug(slug);

    if (!game || !game.iframeSrc || game.embedEnabled === false) {
        return new NextResponse("Not found", { status: 404 });
    }

    const title = escapeHtml(`${game.title} Gameplay`);
    const iframeSrc = escapeHtml(game.iframeSrc);

    return new NextResponse(
        `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>${title}</title>
  <style>
    html, body {
      margin: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #000;
    }
    iframe {
      display: block;
      width: 100vw;
      height: 100vh;
      border: 0;
      background: #000;
    }
  </style>
</head>
<body>
  <iframe src="${iframeSrc}" title="${title}" allowfullscreen></iframe>
</body>
</html>`,
        {
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "Cache-Control": "public, max-age=300",
            },
        }
    );
}
