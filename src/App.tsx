import React from "react";
import "./App.css";
import Header from "./Header";
import FilterableGistList from "./gists/FilterableGistList";

const GISTS = [
  { description: "1st Gist" },
  { description: "2nd Gist" },
  { description: "3rd Gist" },
  { description: "4th Gist" },
  { description: "5th Gist" },
];

function App() {
  return (
    <>
      <Header text="Welcome to Gist Searcher!" />
      <FilterableGistList items={GISTS} />
    </>
  );
}

export default App;
