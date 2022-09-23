import React from "react";
import ListWrapper from "./GistList";
import GistProps from "./GistProps";
import SearchBar from "./SearchBar";

interface FilterableListProps {
  items?: GistProps[];
}

const FilterableGistList = ({ items }: FilterableListProps) => {
  return (
    <>
      <SearchBar />
      <ListWrapper items={items} />
    </>
  );
};

export default FilterableGistList;
