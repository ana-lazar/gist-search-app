import React, { useState } from "react";
import GistContent from "./GistContent";
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
  const [selectedId, setSelectedId] = useState("");

  return (
    <>
      <SearchBar text={username} onFilterTextChange={onFilterTextChange} />
      <ListWrapper
        gists={gists}
        fetching={fetching}
        fetchingError={fetchingError}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      {selectedId && (
        <GistContent gist={gists?.find((g) => g.id === selectedId)} />
      )}
    </>
  );
};

export default FilterableGistList;
