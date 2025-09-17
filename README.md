
# 簡単な TODO アプリ（Next.js）

## 概要

- Next.js（App Router, Server Components, TypeScript）
- タスクの追加・一覧・完了・削除が可能
- データはローカルストレージに保存
- CDN（Vercel 等）デプロイ前提
- Node 20+

## セットアップ

```bash
cd frontend
npm install
```

## 開発サーバー起動

```bash
npm run dev
```

## テスト

### ユニット・統合テスト

```bash
npm test
```

### E2E テスト（Playwright）

```bash
npx playwright test
```

### パフォーマンステスト

```bash
npm test frontend/tests/performance/todo.performance.test.ts
```

## ディレクトリ構成

- `src/models/` ... タスク型定義
- `src/hooks/` ... タスク管理フック
- `src/components/` ... UI コンポーネント
- `app/page.tsx` ... メインページ
- `tests/` ... 各種テスト

## 仕様・注意

- タスク内容が空の場合は追加不可
- 重複タスクの扱いは今後仕様決定
- 1000 件タスクでも快適な応答性を目指す

---

詳しくは `/specs/001-todo/` の設計ドキュメントを参照してください。
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
