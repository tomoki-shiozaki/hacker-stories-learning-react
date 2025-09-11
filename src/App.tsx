import React from "react";
import useFetchStories from "./hooks/useFetchStories";
import List from "./components/List";
import SearchForm from "./components/SearchForm";
import storiesReducer from "./reducers/storiesReducer";
import initialStoriesState from "./reducers/initialStoriesState";
import { getSumComments } from "./utils";
import { StyledContainer, StyledHeadlinePrimary } from "./App.styles";
import { Story } from "./types";
import { useSearch } from "./hooks/useSearch";

const App = () => {
  const { searchTerm, query, handleSearchInput, handleSearchSubmit } =
    useSearch("search", "React");

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    initialStoriesState
  );

  useFetchStories(query, dispatchStories);

  const sumComments = React.useMemo(() => getSumComments(stories), [stories]);

  const handleRemoveStory = React.useCallback(
    (item: Story) => {
      dispatchStories({
        type: "REMOVE_STORY",
        payload: item,
      });
    },
    [dispatchStories]
  );

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
