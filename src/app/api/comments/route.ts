import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

type CommentRow = {
	id: number;
	game_slug: string;
	author_name: string;
	content: string;
	created_at: string;
};

type CommentItem = {
	id: number;
	gameSlug: string;
	authorName: string;
	content: string;
	createdAt: string;
};

const GAME_SLUG_PATTERN = /^[a-z0-9-]{1,80}$/;
const MAX_NAME_LENGTH = 40;
const MAX_CONTENT_LENGTH = 1000;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

function normalizeLimit(raw: string | null): number {
	const parsed = Number.parseInt(raw ?? "", 10);
	if (!Number.isFinite(parsed) || parsed <= 0) {
		return DEFAULT_LIMIT;
	}
	return Math.min(parsed, MAX_LIMIT);
}

function toCommentItem(row: CommentRow): CommentItem {
	return {
		id: row.id,
		gameSlug: row.game_slug,
		authorName: row.author_name,
		content: row.content,
		createdAt: row.created_at,
	};
}

async function getDb() {
	const { env } = await getCloudflareContext({ async: true });
	const db = (env as CloudflareEnv & { DB?: D1Database }).DB;
	return db;
}

export async function GET(request: NextRequest) {
	const db = await getDb();
	if (!db) {
		return NextResponse.json(
			{ error: "Comments storage is not configured." },
			{ status: 503 },
		);
	}

	const gameSlug = request.nextUrl.searchParams.get("gameSlug")?.trim();
	if (!gameSlug || !GAME_SLUG_PATTERN.test(gameSlug)) {
		return NextResponse.json(
			{ error: "Invalid gameSlug. Use lowercase letters, digits, and hyphens." },
			{ status: 400 },
		);
	}

	const limit = normalizeLimit(request.nextUrl.searchParams.get("limit"));

	const result = await db
		.prepare(
			`SELECT id, game_slug, author_name, content, created_at
			 FROM comments
			 WHERE game_slug = ?
			 ORDER BY id DESC
			 LIMIT ?`,
		)
		.bind(gameSlug, limit)
		.all<CommentRow>();

	const comments = (result.results ?? []).map(toCommentItem);
	return NextResponse.json({ comments });
}

export async function POST(request: NextRequest) {
	const db = await getDb();
	if (!db) {
		return NextResponse.json(
			{ error: "Comments storage is not configured." },
			{ status: 503 },
		);
	}

	let payload: unknown;
	try {
		payload = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
	}

	const body = payload as {
		gameSlug?: unknown;
		authorName?: unknown;
		content?: unknown;
	};

	const gameSlug =
		typeof body.gameSlug === "string" ? body.gameSlug.trim().toLowerCase() : "";
	const authorName =
		typeof body.authorName === "string" ? body.authorName.trim() : "";
	const content = typeof body.content === "string" ? body.content.trim() : "";

	if (!GAME_SLUG_PATTERN.test(gameSlug)) {
		return NextResponse.json(
			{ error: "Invalid gameSlug. Use lowercase letters, digits, and hyphens." },
			{ status: 400 },
		);
	}
	if (authorName.length === 0 || authorName.length > MAX_NAME_LENGTH) {
		return NextResponse.json(
			{ error: `authorName must be 1-${MAX_NAME_LENGTH} characters.` },
			{ status: 400 },
		);
	}
	if (content.length === 0 || content.length > MAX_CONTENT_LENGTH) {
		return NextResponse.json(
			{ error: `content must be 1-${MAX_CONTENT_LENGTH} characters.` },
			{ status: 400 },
		);
	}

	const insert = await db
		.prepare(
			`INSERT INTO comments (game_slug, author_name, content)
			 VALUES (?, ?, ?)`,
		)
		.bind(gameSlug, authorName, content)
		.run();

	const insertedId = Number(insert.meta.last_row_id ?? 0);
	if (!Number.isInteger(insertedId) || insertedId <= 0) {
		return NextResponse.json({ error: "Failed to create comment." }, { status: 500 });
	}

	const inserted = await db
		.prepare(
			`SELECT id, game_slug, author_name, content, created_at
			 FROM comments
			 WHERE id = ?
			 LIMIT 1`,
		)
		.bind(insertedId)
		.first<CommentRow>();

	if (!inserted) {
		return NextResponse.json({ error: "Failed to read created comment." }, { status: 500 });
	}

	return NextResponse.json({ comment: toCommentItem(inserted) }, { status: 201 });
}
