import { useCallback, useState, useEffect } from "react";
import GistProps from "./GistProps";
import { listGistsForUser } from "../core/api";

interface GistsState {
  gists?: GistProps[];
  fetching: boolean;
  fetchingError?: Error | null;
  username: string;
}

const initialState: GistsState = {
  gists: undefined,
  fetching: false,
  fetchingError: null,
  username: "",
};

const useItems = () => {
  const [state, setState] = useState(initialState);
  const { gists: items, fetching, fetchingError, username } = state;

  useEffect(loadEffect, [username]);

  const onFilterUsernameChange = useCallback(
    (newUsername: string) => {
      setState({ ...state, username: newUsername });
    },
    [username]
  );

  return {
    gists: items,
    fetching,
    fetchingError,
    username: username,
    onFilterTextChange: onFilterUsernameChange,
  };

  function loadEffect() {
    if (!username) {
      return;
    }
    let cancelled = false;
    console.log("loadEffect");

    async function load() {
      if (fetching) {
        return;
      }
      try {
        setState({ ...state, fetching: true, fetchingError: null });
        const items = await listGistsForUser(username);
        if (cancelled) {
          return;
        }
        setState({ ...state, fetching: false, gists: items });
      } catch (fetchingError: any) {
        console.log(fetchingError);
        if (cancelled) {
          return;
        }
        setState({ ...state, fetching: false, fetchingError });
      }
    }
    load();

    return () => {
      cancelled = true;
    };
  }
};

export default useItems;
