import React from "react";

import StoriesView from "./components/StoriesView";

import styles from "./App.module.css";

import { useSearch } from "./hooks/search/useSearch";
import { useStories } from "./hooks/story/useStories";

const App = () => {
  // 検索ロジック
  const { searchTerm, query, handleSearchInput, handleSearchSubmit } =
    useSearch("search", "React");
  // ストーリー管理ロジック
  const { stories, handleRemoveStory } = useStories(query);

  return (
    <div className={styles.container}>
      <StoriesView
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        stories={stories}
        onRemoveItem={handleRemoveStory}
      />
    </div>
  );
};

export default App;
