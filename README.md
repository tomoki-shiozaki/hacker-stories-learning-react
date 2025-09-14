# Hacker Stories — React & TypeScript 学習プロジェクト

## 概要

Hacker News（技術系ニュース・記事の共有サイト）の API を利用して、ニュース記事を検索・表示・削除できる SPA です。  
React と TypeScript の学習のために作成しました。
教材をベースにしつつ、自分でリファクタリングを行い、学習を深めています。

---

## 使用技術

### フロントエンド

- React（Function Components, Hooks）
- TypeScript（型定義、ユニオン型、ジェネリクス）

### スタイリング

- CSS Modules

### 状態管理・ロジック

- React Hooks（useState, useReducer, useEffect, useRef）

### その他

- 簡易ユーティリティ関数の実装
- ロギング用のカスタム関数

- React
- TypeScript
- CSS Modules
- React Hooks (`useReducer`, `useEffect`, `useState`)
- 簡易的なユーティリティ関数と Logger

---

## 🧠 工夫したポイント

- 教材をベースに自分で構成を見直し、リファクタリングを行った
- JavaScript から TypeScript に移行し、**全体に型定義を適用**
- **責務ごとにファイル分割・整理**（コンポーネント、フック、ユーティリティなど）
- `ref` と `useEffect` を使った自動フォーカス機能
- `useReducer` による状態管理（Loading / Error / Data）

---

## 🛠 今後の改善予定

- API との通信処理を `fetch` ではなく `axios` に変更
- ユーザーごとのお気に入り機能の追加
- レスポンシブ対応 or デザインの強化（例：Tailwind CSS）
- 単体テスト・統合テストの追加（Jest + Testing Library）

---

## 📦 セットアップ方法

```bash
git clone https://github.com/your-username/story-search-app.git
cd story-search-app
npm install
npm start
```
