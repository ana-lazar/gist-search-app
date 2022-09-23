import React, { useCallback, useState } from "react";
import ListWrapper from "./GistList";
import GistProps from "./GistProps";
import SearchBar from "./SearchBar";

interface FilterableListProps {
  items?: GistProps[];
}

const FilterableGistList = ({ items }: FilterableListProps) => {
  const [text, setText] = useState("");

  const handleFilterTextChange = useCallback(
    (newText: string) => {
      setText(newText);
    },
    [text]
  );

  return (
    <>
      <SearchBar text={text} handleFilterTextChange={handleFilterTextChange} />
      <ListWrapper items={items} text={text} />
    </>
  );
};

export default FilterableGistList;
