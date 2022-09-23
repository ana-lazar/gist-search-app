import React from "react";
import ListWrapper from "./GistList";
import SearchBar from "./SearchBar";
import useItems from "./useItems";

const FilterableGistList = () => {
  const {
    gists,
    fetching,
    fetchingError,
    username,
    onFilterTextChange,
  } = useItems();

  return (
    <>
      <SearchBar text={username} onFilterTextChange={onFilterTextChange} />
      <ListWrapper
        gists={gists}
        fetching={fetching}
        fetchingError={fetchingError}
      />
    </>
  );
};

export default FilterableGistList;
