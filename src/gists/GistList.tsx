import GistProps from "./GistProps";

interface GistListProps {
  items?: GistProps[];
  text: string;
}

const GistList = ({ items, text }: GistListProps) => {
  return (
    <>
      {items &&
        items
          .filter((item) => item.description === text)
          .map(({ description }) => <div>{description}</div>)}
    </>
  );
};

export default GistList;
