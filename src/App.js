import React from "react";

import useSemiPersistentState from "./hooks/useSemiPersistentState";
import useFetchStories from "./hooks/useFetchStories";

import List from "./components/List";
import SearchForm from "./components/SearchForm";

import storiesReducer from "./reducers/storiesReducer";
import initialStoriesState from "./reducers/initialStoriesState";

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const [query, setQuery] = React.useState(searchTerm);

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    initialStoriesState
  );

  useFetchStories(query, dispatchStories);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    setQuery(searchTerm);

    event.preventDefault();
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

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
    </div>
  );
};

export default App;
