import GistProps from "./GistProps";

interface GistListProps {
  items?: GistProps[];
}

const GistList = ({ items }: GistListProps) => {
  return (
    <>{items && items.map(({ description }) => <div>{description}</div>)}</>
  );
};

export default GistList;
