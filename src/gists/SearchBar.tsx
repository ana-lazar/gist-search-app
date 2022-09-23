import styled from "styled-components";

const StyledSearchBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 1px solid black;
  padding: 10px;
`

const StyledName = styled.div`
  font-weight: bold;
  margin-right: 10px;
`

interface SearchBarProps {
  text: string;
  onFilterTextChange: (value: string) => void;
}

const SearchBar = ({ text, onFilterTextChange }: SearchBarProps) => {
  return (
    <StyledSearchBar>
      <StyledName>Search by username:</StyledName>
      <StyledInput
        type="text"
        placeholder="username"
        onChange={(event) => onFilterTextChange(event.target.value)}
        value={text}
      />
    </StyledSearchBar>
  );
};

export default SearchBar;
