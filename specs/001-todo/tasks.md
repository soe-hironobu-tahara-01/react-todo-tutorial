# Tasks: 簡単な TODO アプリ

**Input**: Design documents from `/specs/001-todo/`
**Prerequisites**: plan.md (required)

## Execution Flow (main)

```
1. Load plan.md from feature directory
2. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: integration tests (user stories)
   → Core: models, services, UI components
   → Polish: unit tests, performance, docs
3. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
4. Number tasks sequentially (T001, T002...)
5. Create parallel execution examples
6. Validate task completeness
7. Return: SUCCESS (tasks ready for execution)
```

## Phase 3.1: Setup

- [ ] T001 Create `frontend/` directory and initialize Next.js project (TypeScript, App Router enabled)
- [ ] T002 [P] Install dependencies: next, react, @types/react, @types/node, jest, @testing-library/react, playwright, @dnd-kit/core, @dnd-kit/sortable
- [ ] T003 [P] Set up ESLint, Prettier, and TypeScript config in `frontend/`

## Phase 3.2: Tests First (TDD)

- [ ] T004 [P] Integration test: タスク追加・一覧・完了・削除のユーザーストーリーを `frontend/tests/integration/todo.test.tsx` に記述（テストは必ず最初に fail させる）
- [ ] T005 [P] Unit test: タスクモデルのバリデーション（空内容禁止、重複許容/禁止の仕様決定）

## Phase 3.3: Core Implementation

- [ ] T006 [P] タスクモデル（型定義）を `frontend/src/models/todo.ts` に作成
- [ ] T007 [P] タスク管理用のカスタムフック `frontend/src/hooks/useTodos.ts` を作成（ローカルストレージ連携）
- [ ] T008 [P] カンバンボード UI（未着手・進行中・完了の 3 列、ドラッグ&ドロップ対応）を `frontend/src/components/KanbanBoard.tsx` に作成
- [ ] T009 [P] タスク追加・編集 UI を `frontend/src/components/TodoInput.tsx` などに分離
- [ ] T010 Next.js Server Actions/Server Components を活用したページ構成（`frontend/app/page.tsx`、カンバン UI を組み込み）

## Phase 3.4: Integration/Polish

- [ ] T011 [P] E2E テスト（playwright）で主要ユーザーフローを検証
- [ ] T012 [P] パフォーマンステスト（1000 件タスクでの応答性）
- [ ] T013 [P] README/quickstart 作成、実行手順・仕様記載

## Parallel Execution Examples

- T002, T003, T005, T006, T007, T008, T009, T011, T012, T013 は [P]（並列実行可）
- T004→T006/T007/T008/T009（テスト → 実装の順で依存）
- T010 は T006-T009 完了後に着手

## Dependency Notes

- テスト（T004, T005）は必ず実装前に fail で書くこと
- モデル → フック →UI→ ページの順で依存
- E2E/パフォーマンス/ドキュメントは実装後で OK

---

この tasks.md は即実行可能な粒度で分割されています。各タスクはファイルパス・依存関係・並列性を明記し、LLM やエージェントがそのまま着手できます。
