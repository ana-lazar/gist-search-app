import { useEffect } from "react";
import styled from "styled-components";
import GistFile from "./components/GistFile";
import GistProps from "./types/GistProps";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 10px;
  width: 50%;
`

interface GistContentProps {
  gist?: GistProps;
  loadGistContent: (gist?: GistProps) => void;
}

const GistContent = ({ gist, loadGistContent }: GistContentProps) => {
  useEffect(() => {
    loadGistContent(gist);
  }, [gist?.id]);

  return (
    <ContentWrapper>
      {gist?.files?.map(file => <GistFile key={file.url} file={file} />)}
    </ContentWrapper>
  );
};

export default GistContent;
