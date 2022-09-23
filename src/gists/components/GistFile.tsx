import styled from "styled-components";
import { FileProps } from "../types/GistProps";

const GistFileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
`;

const StyledName = styled.div`
  font-weight: bold;
  padding: 10px;
  border-bottom: 1px solid black;
`;

const StyledText = styled.div`
  padding: 10px;
`;

interface GistFileProps {
  file: FileProps;
}

const GistFile = ({ file }: GistFileProps) => {
  return (
    <GistFileWrapper>
      <StyledName>{file.filename}</StyledName>
      <StyledText>
        {file.content ? <div>{file.content}</div> : <div>Loading...</div>}
      </StyledText>
    </GistFileWrapper>
  );
};

export default GistFile;
