import React, { useMemo, useState } from "react";
import GistContent from "./GistContent";
import GistList from "./components/GistList";
import SearchBar from "./SearchBar";
import useGists from "./hooks/useGists";

const FilterableGistList = () => {
  const {
    gists,
    fetching,
    fetchingError,
    username,
    onUsernameChange,
  } = useGists();
  const [selectedId, setSelectedId] = useState("");
  const gist = useMemo(() => gists?.find((g) => g.id === selectedId), [
    gists,
    selectedId,
  ]);

  return (
    <>
      <SearchBar text={username} onFilterTextChange={onUsernameChange} />
      <GistList
        gists={gists}
        fetching={fetching}
        fetchingError={fetchingError}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      {selectedId && <GistContent gist={gist} />}
    </>
  );
};

export default FilterableGistList;
