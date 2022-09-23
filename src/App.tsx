import React from "react";
import "./App.css";
import Header from "./Header";
import FilterableGistList from "./gists/FilterableGistList";

function App() {
  return (
    <>
      <Header text="Welcome to Gist Searcher!" />
      <FilterableGistList />
    </>
  );
}

export default App;
