import styled from "styled-components";

export const StyledHeader = styled.h1`
  font-size: 1.5em;
  text-align: center;
  background-color: black;
  color: white;
  border-bottom: 1px solid black;
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
