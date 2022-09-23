import React from "react";
import Header from "./Header";
import FilterableGistList from "./gists/FilterableGistList";
import styled from "styled-components";

export const AppWrapper = styled.div``;

function App() {
  return (
    <AppWrapper>
      <Header text="Welcome to Gist Searcher!" />
      <FilterableGistList />
    </AppWrapper>
  );
}

export default App;
