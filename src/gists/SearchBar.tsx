interface SearchBarProps {
  text: string;
  onFilterTextChange: (value: string) => void;
}

const SearchBar = ({ text, onFilterTextChange }: SearchBarProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder="username"
        onChange={(event) => onFilterTextChange(event.target.value)}
        value={text}
      />
    </div>
  );
};

export default SearchBar;
