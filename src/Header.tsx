import styled from "styled-components";

export const StyledHeader = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
  border-bottom: 2px solid black;
  padding: 30px;
  margin: 0px;
`;

interface HeaderProps {
  text: string;
}

const Header = ({ text }: HeaderProps) => {
  return <StyledHeader>{text}</StyledHeader>;
};

export default Header;
