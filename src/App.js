import React from "react";
import useSemiPersistentState from "./hooks/useSemiPersistentState";
import InputWithLabel from "./components/InputWithLabel";
import List from "./components/List";
import { getAsyncStories } from "./api/getStories";
import storiesReducer from "./reducers/storiesReducer";

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  React.useEffect(() => {
    if (!searchTerm) return;

    const fetchData = async () => {
      dispatchStories({ type: "STORIES_FETCH_INIT" });
      try {
        const hits = await getAsyncStories(searchTerm);
        dispatchStories({ type: "STORIES_FETCH_SUCCESS", payload: hits });
      } catch {
        dispatchStories({ type: "STORIES_FETCH_FAILURE" });
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
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
