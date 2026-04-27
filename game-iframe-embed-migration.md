# 游戏 iframe 封装与懒加载迁移手册

本文档总结 Scritchy Scratchy 本次改造方案，供其他游戏站复用。目标是把原来直接写在页面里的第三方游戏 `iframe` URL，统一封装成本站的一层 `/embed/[slug]`，并在游戏页外层增加封面图和 Play 按钮，用户点击后再真正加载游戏。

## 改造目标

- 游戏详情页不直接加载第三方游戏，先展示封面图和 Play 按钮。
- 点击 Play 后再挂载 iframe，减少首屏加载和第三方请求。
- 公开给别人引用的地址统一为本站域名，例如 `https://example.com/embed/obbyroads-io`。
- `/embed/[slug]` 页面只负责全屏承载原始游戏 iframe，不带网站 header、sidebar、footer、广告位或 React 根布局。
- 普通页面禁止被第三方 iframe，只有 `/embed/*` 允许被合作方 iframe。
- 为以后统计 embed 点击、分发游戏、做合作流量打基础。

## 最终架构

本次采用两层结构。

第一层是游戏详情页，例如 `/games/obbyroads-io`：

- 展示游戏封面图。
- 展示和当前网站主题一致的 Play 按钮。
- 点击后加载本站地址 `/embed/obbyroads-io`。

第二层是 embed route，例如 `/embed/obbyroads-io`：

- 返回纯 HTML。
- 页面里只有一个全屏 iframe。
- iframe 的 `src` 指向原始游戏地址，例如 `https://obbyroads.io/`。

核心原则：游戏详情页用本站 `/embed/[slug]`，但 `/embed/[slug]` 内部必须使用原始 `game.iframeSrc`，不能再用 `/embed/[slug]`，否则会递归套娃。

## 数据结构

每个游戏至少保留这些字段：

```ts
interface Game {
  slug: string;
  title: string;
  img: string;
  iframeSrc?: string;
  embedEnabled?: boolean;
}
```

字段说明：

- `slug`：游戏唯一标识，用于 `/games/[slug]` 和 `/embed/[slug]`。
- `title`：游戏标题。
- `img`：封面图。
- `iframeSrc`：原始第三方游戏地址，只在 `/embed/[slug]` 内部使用。
- `embedEnabled`：可选，设为 `false` 时不开放 embed。

如果之前做过自托管或 R2 托管，建议先确认是否真的需要。Scritchy Scratchy 本次最终没有走 `/hosted-games` 或 R2，而是保留原始 iframe URL，只在 `index.html`/页面逻辑外面封装一层本站 `/embed/[slug]`。

## 播放地址 Helper

新增统一 helper，游戏详情页只通过它拿播放地址：

```ts
import type { Game } from "@/data/games";
import { toAbsoluteUrl } from "@/lib/schema";

export function getGameEmbedUrl(game: Game) {
  return toAbsoluteUrl(`/embed/${game.slug}`);
}

export function getPlayableGameSrc(game: Game) {
  if (!game.iframeSrc || game.embedEnabled === false) {
    return null;
  }

  return getGameEmbedUrl(game);
}
```

使用规则：

- `/games/[slug]`、首页游戏播放器、列表跳转入口都使用 `getPlayableGameSrc(game)`。
- `/embed/[slug]/route.ts` 不能使用 `getPlayableGameSrc(game)`，必须直接使用 `game.iframeSrc`。

## 懒加载播放器

新增一个 client component，例如 `LazyGameFrame.tsx`。它先展示封面和按钮，点击后再挂载 iframe。

```tsx
"use client";

import { useState } from "react";

export function LazyGameFrame({
  title,
  iframeSrc,
  coverSrc,
}: {
  title: string;
  iframeSrc: string;
  coverSrc: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl">
        <iframe
          src={iframeSrc}
          title={`${title} Gameplay`}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl bg-black">
      <img
        src={coverSrc}
        alt={title}
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-2xl"
      />
      <button type="button" onClick={() => setIsPlaying(true)}>
        Play Now
      </button>
    </div>
  );
}
```

按钮样式应跟随当前项目主题，不要复制 Scritchy Scratchy 的颜色到所有项目。迁移时按项目设计系统调整：

- 如果网站是霓虹/游戏风，按钮可以用高饱和渐变、发光边框、粗字体。
- 如果网站是轻量休闲风，按钮应更圆润、低阴影、颜色更柔和。
- 如果已有 UI 组件库，优先复用项目现有 Button/Card 样式。

## 游戏详情页接入方式

在 `/games/[slug]` 里：

```tsx
const playableSrc = getPlayableGameSrc(game);
const embedUrl = game.iframeSrc ? toAbsoluteUrl(`/embed/${game.slug}`) : null;

{playableSrc ? (
  <LazyGameFrame
    title={game.title}
    iframeSrc={playableSrc}
    coverSrc={game.img}
  />
) : (
  <FallbackGameHero game={game} />
)}
```

如果要给别人复制嵌入代码，可以在详情页展示：

```html
<iframe
  src="https://example.com/embed/obbyroads-io"
  width="960"
  height="540"
  loading="lazy"
  allowfullscreen
  referrerpolicy="strict-origin-when-cross-origin"
></iframe>
```

注意：给别人用的 snippet 必须是 `/embed/[slug]`，不要暴露原始第三方游戏 URL。

## `/embed/[slug]` 正确实现

必须用 route handler，不要用普通 React page。

文件路径：

```text
src/app/embed/[slug]/route.ts
```

示例：

```ts
import { NextResponse } from "next/server";
import { getGameBySlug } from "@/data/games";

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
```

为什么不用 `page.tsx`：

- `page.tsx` 会被 Next root layout 包住。
- 如果 root layout 有导航、侧边栏、广告、统计脚本，都会进入 iframe。
- 本次就遇到过 `/embed/[slug]` 被网站布局包住，出现 sidebar、重复按钮和 React hydration error。
- route handler 返回纯 HTML，最干净，也最适合被外部站点 iframe。

## CSP 和 Headers

普通页面和 embed 页面要分开配置。

普通页面建议：

```text
frame-ancestors 'self'
X-Frame-Options: SAMEORIGIN
```

`/embed/*` 建议：

```text
frame-ancestors *
```

同时不要给 `/embed/*` 设置 `X-Frame-Options: SAMEORIGIN`，否则别人无法 iframe 你的网站。

Next 配置示例：

```ts
async headers() {
  return [
    {
      source: "/embed/:path*",
      headers: [
        { key: "Content-Security-Policy", value: embedCsp },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Content-Type-Options", value: "nosniff" },
      ],
    },
    {
      source: "/((?!embed/).*)",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Content-Security-Policy", value: siteCsp },
      ],
    },
  ];
}
```

`embedCsp` 里的 `frame-src` 必须允许原始游戏域名。否则 `/embed/[slug]` 页面能打开，但内部游戏 iframe 会被 CSP 拦截。

## 批量替换规则

迁移其他项目时，按这个顺序替换更安全：

1. 保留所有原始游戏地址到 `iframeSrc`。
2. 新增 `/embed/[slug]/route.ts`，让它读取 `iframeSrc`。
3. 新增 `getGameEmbedUrl` 和 `getPlayableGameSrc`。
4. 把游戏详情页、首页播放器、推荐游戏播放器里的 iframe src 改成 `getPlayableGameSrc(game)`。
5. 把给外部复制的 iframe snippet 统一改成 `https://你的域名/embed/[slug]`。
6. 检查全仓库是否还有旧路径，例如 `/hosted-games`、原始 iframe 直出、旧 CDN 环境变量。

可用命令：

```bash
rg -n "hosted-games|selfHosted|NEXT_PUBLIC_GAME_CDN|iframeSrc|/embed/" .
```

## UI 页面优化经验

本次同时优化了 `new-games`、`hot-games`、`popular-games` 等列表页，原则如下：

- 减少左右空白，让内容区更宽，桌面端展示更多卡片。
- 抽出通用 `GameBrowsePage`，避免每个页面重复写布局。
- `GameGridSection` 和 `GameCard` 统一卡片间距、圆角、阴影、hover 状态。
- 每个列表页保留一个主 H1，并补充结构化 H2 区块，避免 SEO 工具提示页面结构单薄。
- 页面 metadata title 控制在更合理长度，不要太短。

这类 UI 优化可以和 iframe 改造分开提交。如果项目风险较高，建议先上 iframe 架构，再单独优化 UI。

## 验证清单

本地验证：

```bash
pnpm build
rg -n "hosted-games|selfHosted|NEXT_PUBLIC_GAME_CDN|r2:upload-games|verify:self-hosted" .
```

部署后验证：

```bash
curl -L -I https://example.com/embed/obbyroads-io
curl -L -s https://example.com/embed/obbyroads-io | head -n 40
```

预期结果：

- HTTP 状态是 `200`。
- 响应开头是 `<!doctype html>`。
- HTML 里只有一个承载游戏的 iframe。
- 不包含网站 header、sidebar、footer、广告布局或 Next root layout 内容。
- 响应头里 `/embed/*` 不应有 `X-Frame-Options: SAMEORIGIN`。
- `Content-Security-Policy` 里 `frame-ancestors` 应允许外部站点 iframe。

浏览器验证：

1. 打开 `/games/obbyroads-io`。
2. 确认初始状态只显示封面和 Play 按钮。
3. 点击 Play。
4. DevTools 里确认 iframe src 是 `/embed/obbyroads-io`。
5. 直接打开 `/embed/obbyroads-io`，确认只显示游戏，不显示网站外壳。
6. 检查 Console 是否有 CSP、X-Frame-Options、mixed content 或 iframe blocked 报错。

## 常见问题

### `/embed/[slug]` 打开后还有网站导航和侧边栏

原因：用了 `page.tsx`，被 root layout 包住。

解决：删除 `src/app/embed/[slug]/page.tsx` 和不必要的 embed layout，改用 `src/app/embed/[slug]/route.ts` 返回纯 HTML。

### 游戏页点击 Play 后无限嵌套

原因：`/embed/[slug]` 内部又用了 `/embed/[slug]`。

解决：游戏详情页使用 `getPlayableGameSrc(game)`，embed route 内部直接使用 `game.iframeSrc`。

### 外部网站无法 iframe `/embed/[slug]`

原因：`X-Frame-Options: SAMEORIGIN` 或 `frame-ancestors 'self'` 作用到了 `/embed/*`。

解决：headers 分流。普通页面保留限制，`/embed/*` 单独设置允许策略。

### `/embed/[slug]` 能打开，但里面的游戏不显示

可能原因：

- 原始游戏站自己禁止被 iframe。
- 本站 CSP 的 `frame-src` 没允许该游戏域名。
- 原始游戏依赖的广告、脚本或子 iframe 被 CSP 拦截。
- 原始 URL 失效或跳转到禁止 iframe 的页面。

解决：

- 优先换成明确支持 iframe 的游戏源。
- 如果是本站 CSP 拦截，补充必要域名到 `frame-src`、`connect-src` 或 `script-src`。
- 如果是对方响应头禁止 iframe，这种方法无法绕过，需要授权托管版本或其他可嵌入来源。

### 部署后首页能玩，其他游戏不能玩

排查顺序：

1. 直接访问对应 `/embed/[slug]`，看是否 404。
2. 检查 `getGameBySlug(slug)` 是否能找到数据。
3. 检查该游戏是否缺少 `iframeSrc`。
4. 检查 `embedEnabled` 是否被设成 `false`。
5. 检查 Cloudflare 部署是否用了最新构建产物。
6. 用 `curl -L -s https://example.com/embed/[slug] | head -n 40` 看返回的是纯 HTML 还是网站布局。

## Cloudflare / OpenNext 部署

部署前确认登录：

```bash
npx wrangler whoami
```

部署：

```bash
npm run deploy
```

如果部署日志卡在上传资源后，不要直接判断失败。可以等待一段时间，或检查 Worker 是否已经更新；必要时单独执行：

```bash
pnpm exec opennextjs-cloudflare deploy
```

部署完成后必须验证线上 `/embed/[slug]`，不能只看首页。

## 推荐提交顺序

1. 数据层：确认每个游戏有 `slug`、`img`、`iframeSrc`。
2. Embed route：新增 `/embed/[slug]/route.ts`。
3. Helper：新增 `getGameEmbedUrl`、`getPlayableGameSrc`。
4. 播放器：新增 `LazyGameFrame`。
5. 页面接入：游戏详情页和首页改用懒加载播放器。
6. 外链分发：详情页增加 embed snippet。
7. Headers：普通页面和 `/embed/*` 分开配置 CSP/X-Frame-Options。
8. 清理旧逻辑：删除不再使用的 `/hosted-games`、R2 上传脚本、自托管环境变量。
9. UI 优化：宽布局、卡片样式、SEO H2。
10. 验证并部署。

## 本次 Scritchy Scratchy 的关键结论

- 不需要把 `scritchy-scratchy` 游戏切成 R2 自托管，最终方案是在原 iframe URL 外面封装 `/embed/[slug]`。
- `/embed/[slug]` 必须是 route handler，否则 Next root layout 会污染 iframe 内容。
- 所有公开播放入口统一为 `/embed/[slug]`，不要再使用 `/hosted-games`。
- 首页可访问不代表所有游戏可访问，必须逐个验证 `/embed/[slug]`。
- UI 和 iframe 架构最好解耦，但本次也顺手完成了 `new-games`、`hot-games`、`popular-games` 宽布局优化。
