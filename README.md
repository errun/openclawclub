# OpenClawClub 内容站（Next.js + MDX）

网站域名：`openclawclue.net`

## 本地启动

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## 构建与运行

```bash
npm run build
npm run start
```

## 部署到 Vercel

1. 推送仓库到 GitHub/GitLab。
2. Vercel 新建项目，选择该仓库。
3. Build Command: `npm run build`
4. Output: 使用默认 Next.js 设置即可。

## 内容结构

新增 `.mdx` 文件即可生成页面（部署后域名为 `openclawclue.net`）：

```
content/
  install/
    index.mdx
    windows.mdx
    macos.mdx
    linux.mdx
    docker.mdx
    wsl.mdx
    errors/
      command-not-found.mdx
      permission-denied.mdx
      network-timeout.mdx
      english-ui.mdx
  skills/
    index.mdx
    getting-started.mdx
    templates.mdx
    best-practices.mdx
    use-cases/
      installation.mdx
      automation.mdx
  pitfalls/
    index.mdx
    api-key-safety.mdx
    prompt-injection.mdx
    version-mismatch.mdx
    over-permissions.mdx
    performance.mdx
    update-strategy.mdx
```

每个 MDX 需要包含 frontmatter：

```md
---
title: string
description: string
date: YYYY-MM-DD
tags: [tag1, tag2]
---
```
