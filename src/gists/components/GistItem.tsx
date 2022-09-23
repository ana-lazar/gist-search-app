import GistProps from "../types/GistProps";

interface GistItemProps {
  item: GistProps;
}

const GistItem = ({ item }: GistItemProps) => {
  return (
    <>
      <div>{item.id}</div>
    </>
  );
};

export default GistItem;
