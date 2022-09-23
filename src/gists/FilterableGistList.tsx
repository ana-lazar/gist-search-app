import React from "react";
import ListWrapper from "./GistList";
import SearchBar from "./SearchBar";
import useItems from "./useItems";

const FilterableGistList = () => {
  const { items, text, onFilterTextChange } = useItems();

  return (
    <>
      <SearchBar text={text} onFilterTextChange={onFilterTextChange} />
      <ListWrapper items={items} text={text} />
    </>
  );
};

export default FilterableGistList;
