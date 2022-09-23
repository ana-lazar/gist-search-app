import { useCallback, useState, useEffect } from "react";
import GistProps from "./GistProps";

interface GistsState {
  items?: GistProps[];
  fetching: boolean;
  fetchingError?: Error | null;
  text: string;
}

const initialState: GistsState = {
  items: undefined,
  fetching: false,
  fetchingError: null,
  text: "",
};

const useItems = () => {
  const [state, setState] = useState(initialState);
  const { items, fetching, fetchingError, text } = state;

  useEffect(loadEffect, [text]);

  const onFilterTextChange = useCallback(
    (newText: string) => {
      setState({ ...state, text: newText });
    },
    [text]
  );

  return {
    items,
    fetching,
    fetchingError,
    text,
    onFilterTextChange,
  };

  function loadEffect() {
    let cancelled = false;

    async function load() {
      try {
        const items = await getItems();
        console.log("loadEffect");
      } catch (fetchingError: any) {}
    }

    load();

    return () => {
      cancelled = true;
    };
  }
};

export default useItems;
