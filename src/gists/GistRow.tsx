import GistProps from "./GistProps";

interface GistRowProps {
  item: GistProps;
}

const GistRow = ({ item }: GistRowProps) => {
  return (
    <>
      <div>{item.id}</div>
    </>
  );
};

export default GistRow;
