import React from "react";
import List from "./List/List";
import SearchForm from "./SearchForm/SearchForm";
import styles from "./StoriesView.module.css";
import { getSumComments } from "../../utils/utils";
import { StoriesState, Story } from "../../types/story";

type StoriesViewProps = {
  searchTerm: string;
  onSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  stories: StoriesState;
  onRemoveItem: (item: Story) => void;
};

const StoriesView = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
  stories,
  onRemoveItem,
}: StoriesViewProps) => {
  const sumComments = React.useMemo(() => getSumComments(stories), [stories]);

  return (
    <>
      <h1 className={styles.headlinePrimary}>
        My Hacker Stories with {sumComments} comments.
      </h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={onSearchInput}
        onSearchSubmit={onSearchSubmit}
      />

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={onRemoveItem} />
      )}
    </>
  );
};

export default StoriesView;
