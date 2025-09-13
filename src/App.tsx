import React from "react";

import StoriesView from "./components/StoriesView";

import { StyledContainer } from "./App.styles";

import { useSearch } from "./hooks/search/useSearch";
import { useStories } from "./hooks/story/useStories";

const App = () => {
  // 検索ロジック
  const { searchTerm, query, handleSearchInput, handleSearchSubmit } =
    useSearch("search", "React");
  // ストーリー管理ロジック
  const { stories, handleRemoveStory } = useStories(query);

  return (
    <StyledContainer>
      <StoriesView
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        stories={stories}
        onRemoveItem={handleRemoveStory}
      />
    </StyledContainer>
  );
};

export default App;
