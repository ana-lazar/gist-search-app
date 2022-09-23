import React from "react";
import "./App.css";
import Header from "./Header";
import FilterableList from "./gists/FilterableList";

function App() {
  return (
    <>
      <Header text="Welcome!" />
      <FilterableList />
    </>
  );
}

export default App;
