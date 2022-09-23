import styled from "styled-components";

const StyledTag = styled.span`
  padding: 0 10px 0 10px;
  margin-right: 16px;
  background-color: black;
  color: white;
  border: 1px solid black;
  border-radius: 10px;
`

interface TagProps {
  text: string;
}

const Tag = ({ text }: TagProps) => {
  return (
    <StyledTag>{text}</StyledTag>
  );
};

export default Tag;
