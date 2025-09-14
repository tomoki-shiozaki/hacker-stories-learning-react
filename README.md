# Hacker Stories — React & TypeScript 学習プロジェクト

## 概要

Hacker News（技術系ニュース・記事の共有サイト）の API を利用して、ニュース記事を検索・表示・削除できる SPA です。  
React と TypeScript の学習のために作成しました。
教材をベースにしつつ、自分でリファクタリングを行い、学習を深めています。

---

## API

- [Hacker News Algolia API](https://hn.algolia.com/api) を利用

## 使用技術

### フロントエンド

- React（Function Components, Hooks）
- TypeScript（型定義、ユニオン型、ジェネリクス）

### スタイリング

- CSS Modules を使用し、各コンポーネントごとにスタイルを分離・管理
- 一部共通スタイル（ボタン）を `common.module.css` に定義し、再利用性を確保

### 状態管理・ロジック

- React Hooks（`useState`, `useReducer`, `useEffect`, `useRef`, `useCallback`, `useMemo`）を活用
- `React.memo` によるコンポーネントのメモ化で、不要な再レンダリングを防止
- `localStorage` を用いた状態の簡易永続化（初回マウントの判定には `useRef` を使用）
- カスタムフック（`useSearch`, `useStories` など）により、ロジックの分離と再利用性・可読性を向上

---

## 工夫したポイント

- 教材をベースにしつつ、責務ごとにファイルを分割・整理（コンポーネント、カスタムフック、ユーティリティなど）して構成を見直した

---

## 今後の改善予定

- 単体テスト・統合テストの追加
- CRA から Vite への移行

---

## セットアップ方法

```bash
git clone git@github.com:tomoki-shiozaki/hacker-stories-learning-react.git
cd hacker-stories-learning-react
npm install
npm start
```

ブラウザで `http://localhost:3000` にアクセスしてアプリを確認してください。
