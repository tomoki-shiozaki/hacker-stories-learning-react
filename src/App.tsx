import React from "react";

import List from "./components/List";
import SearchForm from "./components/SearchForm";

import { getSumComments } from "./utils";

import { StyledContainer, StyledHeadlinePrimary } from "./App.styles";

import { useSearch } from "./hooks/useSearch";
import { useStories } from "./hooks/useStories";

const App = () => {
  // 検索ロジック
  const { searchTerm, query, handleSearchInput, handleSearchSubmit } =
    useSearch("search", "React");
  // ストーリー管理ロジック
  const { stories, handleRemoveStory } = useStories(query);

  const sumComments = React.useMemo(() => getSumComments(stories), [stories]);

  return (
    <StyledContainer>
      <StyledHeadlinePrimary>
        My Hacker Stories with {sumComments} comments.
      </StyledHeadlinePrimary>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </StyledContainer>
  );
};

export default App;
