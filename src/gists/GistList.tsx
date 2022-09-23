import GistProps from "./GistProps";

interface GistListProps {
  gists?: GistProps[];
  fetching: boolean;
  fetchingError?: Error | null;
}

const GistList = ({ gists, fetching, fetchingError }: GistListProps) => {
  return (
    <>
      {fetching && <div>Fetching...</div>}
      {fetchingError && <div>{fetchingError.message || "Fetching error"}</div>}
      {gists &&
        gists.map(({ id, languages }) => (
          <div key={id}>
            {id}
            {languages}
          </div>
        ))}
    </>
  );
};

export default GistList;
