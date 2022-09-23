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
      {gists && gists.map(({ id }) => <div key={id}>{id}</div>)}
    </>
  );
};

export default GistList;
