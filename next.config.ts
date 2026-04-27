import type { NextConfig } from "next";

const csp = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://html5.gamedistribution.com https://*.gamedistribution.com https://imasdk.googleapis.com",
	"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
	"img-src 'self' data: https:",
	"font-src 'self' https://fonts.gstatic.com",
	"connect-src 'self' https://www.google-analytics.com https://stats.g.doubleclick.net https://*.gamedistribution.com https://html5.gamedistribution.com https://*.crazygames.com https://*.addictinggames.com https://www.gameflare.com https://gameflare.com https://www.miniplay.com https://miniplay.com https://taproad.io https://cartoongames.io https://poki.com https://*.poki.com https://obbyroads.io https://nealfun.app",
	"frame-src 'self' https://files.twoplayergames.org https://idols-of-ash.org https://www.cookie-clicker2.org https://cookieclicker.ee https://games-online.io https://html-classic.itch.zone https://html5.gamemonetize.co https://st.8games.net https://html5.gamedistribution.com https://*.gamedistribution.com https://itch.io https://gamea.azgame.io https://meeland.io https://veck.io https://imasdk.googleapis.com https://*.crazygames.com https://*.addictinggames.com https://fnf.kdata1.com https://www.gameflare.com https://gameflare.com https://www.miniplay.com https://miniplay.com https://taproad.io https://cartoongames.io https://poki.com https://*.poki.com https://gamea.azgame.io https://*.1games.io https://turbowarp.org https://obbyroads.io https://nealfun.app",
	"worker-src 'self' blob:",
	"child-src 'self' blob: https://html5.gamedistribution.com https://*.gamedistribution.com https://www.gameflare.com https://gameflare.com https://www.miniplay.com https://miniplay.com https://taproad.io https://cartoongames.io https://poki.com https://*.poki.com https://turbowarp.org https://obbyroads.io https://nealfun.app",
	"frame-ancestors 'self'",
].join("; ");

const siteCsp = csp;
const embedCsp = csp.replace("frame-ancestors 'self'", "frame-ancestors *");

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: "/:path*",
				has: [{ type: "host", value: "www.idols-of-ash.org" }],
				destination: "https://idols-of-ash.org/:path*",
				permanent: true,
			},
		];
	},
	async headers() {
		return [
			{
				source: "/embed/:path*",
				headers: [
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains; preload",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Content-Security-Policy",
						value: embedCsp,
					},
				],
			},
			{
				source: "/((?!embed/).*)",
				headers: [
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains; preload",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Content-Security-Policy",
						value: siteCsp,
					},
				],
			},
		];
	},
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
