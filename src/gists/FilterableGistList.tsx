import { useMemo, useState } from "react";
import styled from "styled-components"
import GistContent from "./GistContent";
import GistList from "./components/GistList";
import SearchBar from "./SearchBar";
import useGists from "./hooks/useGists";

const GistListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const FilterableGistListWrapper = styled.div`
  margin: 20px;
`;

const FilterableGistList = () => {
  const {
    gists,
    fetching,
    fetchingError,
    username,
    onUsernameChange,
    loadGistContent,
  } = useGists();
  const [selectedId, setSelectedId] = useState("");
  const gist = useMemo(() => gists?.find((g) => g.id === selectedId), [
    gists,
    selectedId,
  ]);

  return (
    <FilterableGistListWrapper>
      <SearchBar text={username} onFilterTextChange={onUsernameChange} />
      <GistListWrapper>
        <GistList
          gists={gists}
          fetching={fetching}
          fetchingError={fetchingError}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        {selectedId && <GistContent gist={gist} loadGistContent={loadGistContent} />}
      </GistListWrapper>
    </FilterableGistListWrapper>
  );
};

export default FilterableGistList;
