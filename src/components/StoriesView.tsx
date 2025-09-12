import React from "react";
import List from "./List";
import SearchForm from "./SearchForm";
import { StyledHeadlinePrimary } from "../App.styles";
import { getSumComments } from "../utils";
import { StoriesState, Story } from "../types";

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
      <StyledHeadlinePrimary>
        My Hacker Stories with {sumComments} comments.
      </StyledHeadlinePrimary>

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
