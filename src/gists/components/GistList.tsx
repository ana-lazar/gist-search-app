import GistProps from "../types/GistProps";

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
    <>
      {fetching && <div>Fetching...</div>}
      {fetchingError && <div>{fetchingError.message || "Fetching error"}</div>}
      {gists &&
        gists.map(({ id, languages, avatarUrls }) => (
          <div key={id} onClick={() => setSelectedId(id)}>
            {selectedId}
            {id}
            {languages}
            {avatarUrls?.length}
          </div>
        ))}
    </>
  );
};

export default GistList;
