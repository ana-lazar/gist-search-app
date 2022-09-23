import styled from "styled-components";
import GistProps from "../types/GistProps";
import Avatar from "./Avatar";
import Tag from "./Tag";

interface GistItemWrapperProps {
  isSelected: boolean;
}

const GistItemWrapper = styled.div<GistItemWrapperProps>`
  display: flex;
  flex-direction: column;
  background: ${props => props.isSelected ? "grey" : "transparent"};
  border-bottom: 1px solid black;
  cursor: pointer;
  padding: 12px 0 12px 0;
`

const RowWrapper = styled.div`
  margin: 4px 0 4px 0;
`

interface GistItemProps {
  gist: GistProps;
  selectedId?: string;
  setSelectedId: (id: string) => void;
}

const GistItem = ({ gist, selectedId, setSelectedId }: GistItemProps) => {
  return (
    <GistItemWrapper onClick={() => setSelectedId(gist.id)} isSelected={selectedId === gist.id}>
      <RowWrapper>{gist.id}</RowWrapper>
      <RowWrapper>
        {gist.languages?.map(lang => <Tag key={lang} text={lang} />)}
      </RowWrapper>
      <RowWrapper>
        {gist.avatarUrls?.map(url => <Avatar key={url} url={url} />)}
      </RowWrapper>
    </GistItemWrapper>
  );
};

export default GistItem;
