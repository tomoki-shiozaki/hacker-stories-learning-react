import React from "react";
import useSemiPersistentState from "./useSemiPersistentState";

export const useSearch = (initialKey: string, initialValue: string) => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    initialKey,
    initialValue
  );
  const [query, setQuery] = React.useState(searchTerm);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(searchTerm);
  };

  return { searchTerm, query, handleSearchInput, handleSearchSubmit };
};
