interface SearchBarProps {
  text: string;
  handleFilterTextChange: (value: string) => void;
}

const SearchBar = ({ text, handleFilterTextChange }: SearchBarProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder="username"
        onChange={(event) => handleFilterTextChange(event.target.value)}
        value={text}
      />
    </div>
  );
};

export default SearchBar;
