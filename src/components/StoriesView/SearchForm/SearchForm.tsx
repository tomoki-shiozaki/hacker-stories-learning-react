import React from "react";
import InputWithLabel from "../../common/InputWithLabel/InputWithLabel";
import common from "../../../styles/common.module.css";
import styles from "./SearchForm.module.css";

type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}: SearchFormProps) => (
  <form
    onSubmit={onSearchSubmit}
    className={styles.searchForm}
    aria-label="Search Form"
  >
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>
    <button
      type="submit"
      disabled={!searchTerm}
      className={`${common.button} ${common.buttonLarge}`}
    >
      Submit
    </button>
  </form>
);

export default SearchForm;
