import GistProps from "./GistProps";

interface GistContentProps {
  gist?: GistProps;
}

const GistContent = ({ gist }: GistContentProps) => {
  return (
    <>
      <div>{gist?.files?.[0]?.filename}</div>
    </>
  );
};

export default GistContent;
