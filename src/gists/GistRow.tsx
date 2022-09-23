import GistProps from "./GistProps";

interface GistRowProps {
  item: GistProps;
}

const GistRow = ({ item }: GistRowProps) => {
  return (
    <>
      <div>{item.description}</div>
    </>
  );
};

export default GistRow;
