import styled from "styled-components";
import GistProps from "../types/GistProps";
import GistItem from "./GistItem";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 50%;
`;

const FetchingWrapper = styled.div`
  align-self: center;
`;

interface GistListProps {
  gists?: GistProps[] | null;
  fetching: boolean;
  fetchingError?: Error | null;
  selectedId?: string;
  setSelectedId: (id: string) => void;
}

const GistList = ({
  gists,
  fetching,
  fetchingError,
  selectedId,
  setSelectedId,
}: GistListProps) => {
  return (
    <ListWrapper>
      {fetching && <FetchingWrapper>Fetching...</FetchingWrapper>}
      {fetchingError && (
        <FetchingWrapper>
          {fetchingError.message || "Fetching error"}
        </FetchingWrapper>
      )}
      {gists &&
        gists.map((gist) => (
          <GistItem
            key={gist.id}
            gist={gist}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ))}
      {!fetchingError && gists?.length === 0 && (
        <FetchingWrapper>This user has no public gists</FetchingWrapper>
      )}
    </ListWrapper>
  );
};

export default GistList;
