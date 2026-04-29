"use client";

import { type FormEvent, useEffect, useState, useTransition } from "react";

type CommentItem = {
	id: number;
	gameSlug: string;
	authorName: string;
	content: string;
	createdAt: string;
};

interface CommentsSectionProps {
	gameSlug: string;
	gameTitle: string;
}

interface CommentsResponse {
	comments: CommentItem[];
}

interface CreateCommentResponse {
	comment: CommentItem;
}

const MAX_NAME_LENGTH = 40;
const MAX_CONTENT_LENGTH = 1000;

function formatTimestamp(iso: string): string {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) {
		return "Unknown time";
	}
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	}).format(date);
}

export function CommentsSection({ gameSlug, gameTitle }: CommentsSectionProps) {
	const [comments, setComments] = useState<CommentItem[]>([]);
	const [name, setName] = useState("");
	const [content, setContent] = useState("");
	const [botField, setBotField] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitMessage, setSubmitMessage] = useState<string | null>(null);

	useEffect(() => {
		let canceled = false;

		async function loadComments() {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch(
					`/api/comments?gameSlug=${encodeURIComponent(gameSlug)}&limit=50`,
					{
						method: "GET",
						cache: "no-store",
					},
				);
				const data = (await response.json()) as CommentsResponse & { error?: string };
				if (!response.ok) {
					throw new Error(data.error ?? "Failed to load comments.");
				}
				if (!canceled) {
					setComments(data.comments ?? []);
				}
			} catch (err) {
				const message = err instanceof Error ? err.message : "Failed to load comments.";
				if (!canceled) {
					setError(message);
				}
			} finally {
				if (!canceled) {
					setIsLoading(false);
				}
			}
		}

		loadComments();

		return () => {
			canceled = true;
		};
	}, [gameSlug]);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setSubmitError(null);
		setSubmitMessage(null);

		if (botField.trim().length > 0) {
			setSubmitMessage("Submitted.");
			return;
		}

		const authorName = name.trim();
		const messageContent = content.trim();

		if (!authorName || authorName.length > MAX_NAME_LENGTH) {
			setSubmitError(`Name must be 1-${MAX_NAME_LENGTH} characters.`);
			return;
		}
		if (!messageContent || messageContent.length > MAX_CONTENT_LENGTH) {
			setSubmitError(`Comment must be 1-${MAX_CONTENT_LENGTH} characters.`);
			return;
		}

		startTransition(async () => {
			try {
				const response = await fetch("/api/comments", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						gameSlug,
						authorName,
						content: messageContent,
					}),
				});
				const data = (await response.json()) as CreateCommentResponse & { error?: string };
				if (!response.ok) {
					throw new Error(data.error ?? "Failed to post comment.");
				}
				setComments((prev) => [data.comment, ...prev]);
				setContent("");
				setSubmitMessage("Comment posted.");
			} catch (err) {
				const message = err instanceof Error ? err.message : "Failed to post comment.";
				setSubmitError(message);
			}
		});
	}

	return (
		<section className="max-w-5xl mx-auto bg-[var(--color-surface)]/40 p-6 sm:p-8 rounded-xl border border-[var(--color-border-main)]/30">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-white">Player Comments</h2>
				<p className="text-sm text-[var(--color-text-muted)] mt-2">
					Share your notes for {gameTitle}. Keep feedback useful for the next player.
				</p>
				<p className="text-xs text-[var(--color-text-muted)]/80 mt-2">
					Comments may be reviewed or removed if they look like spam, abuse, or unrelated submissions.
				</p>
			</div>

			<form className="space-y-4" onSubmit={handleSubmit}>
				<div className="grid md:grid-cols-2 gap-4">
					<label className="space-y-2">
						<span className="text-sm text-[var(--color-text-muted)]">Name</span>
						<input
							value={name}
							onChange={(event) => setName(event.target.value)}
							maxLength={MAX_NAME_LENGTH}
							required
							className="w-full rounded-lg bg-black/20 border border-[var(--color-border-main)]/50 px-3 py-2 text-sm text-white outline-none focus:border-[var(--color-secondary)]"
						/>
					</label>
					<label className="space-y-2 hidden" aria-hidden>
						<span>Website</span>
						<input
							value={botField}
							onChange={(event) => setBotField(event.target.value)}
							tabIndex={-1}
							autoComplete="off"
						/>
					</label>
				</div>

				<label className="space-y-2 block">
					<span className="text-sm text-[var(--color-text-muted)]">Comment</span>
					<textarea
						value={content}
						onChange={(event) => setContent(event.target.value)}
						maxLength={MAX_CONTENT_LENGTH}
						required
						rows={4}
						className="w-full rounded-lg bg-black/20 border border-[var(--color-border-main)]/50 px-3 py-2 text-sm text-white outline-none focus:border-[var(--color-secondary)]"
					/>
				</label>

				<div className="flex flex-wrap items-center gap-3">
					<button
						type="submit"
						disabled={isPending}
						className="px-4 py-2 rounded bg-[var(--color-cta)] text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
					>
						{isPending ? "Posting..." : "Post Comment"}
					</button>
					{submitMessage ? (
						<p className="text-xs text-emerald-300">{submitMessage}</p>
					) : null}
					{submitError ? (
						<p className="text-xs text-rose-300">{submitError}</p>
					) : null}
				</div>
			</form>

			<div className="mt-8 border-t border-[var(--color-border-main)]/30 pt-6 space-y-4">
				{isLoading ? <p className="text-sm text-[var(--color-text-muted)]">Loading comments...</p> : null}
				{error ? <p className="text-sm text-rose-300">{error}</p> : null}
				{!isLoading && !error && comments.length === 0 ? (
					<p className="text-sm text-[var(--color-text-muted)]">No comments yet.</p>
				) : null}

				{comments.map((comment) => (
					<article
						key={comment.id}
						className="rounded-xl border border-[var(--color-border-main)]/40 bg-black/15 p-4"
					>
						<div className="flex flex-wrap items-center justify-between gap-2">
							<h3 className="font-bold text-white text-sm">{comment.authorName}</h3>
							<p className="text-xs text-[var(--color-text-muted)]">{formatTimestamp(comment.createdAt)}</p>
						</div>
						<p className="text-sm text-[var(--color-text-main)]/90 mt-3 whitespace-pre-wrap">
							{comment.content}
						</p>
					</article>
				))}
			</div>
		</section>
	);
}
