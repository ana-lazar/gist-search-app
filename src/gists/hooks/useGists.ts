import { useCallback, useState, useEffect } from "react";
import GistProps from "../types/GistProps";
import { getGistsByUser, getAvatarsByGist } from "../service/api";

interface GistsState {
  gists?: GistProps[] | null;
  fetching: boolean;
  fetchingError?: Error | null;
  username: string;
}

const initialState: GistsState = {
  gists: null,
  fetching: false,
  fetchingError: null,
  username: "",
};

const useItems = () => {
  const [state, setState] = useState(initialState);
  const { gists, fetching, fetchingError, username } = state;

  const onUsernameChange = useCallback(
    (newUsername: string) => {
      setState({ ...state, username: newUsername });
    },
    [username]
  );

  useEffect(loadEffect, [username]);

  return {
    gists,
    fetching,
    fetchingError,
    username,
    onUsernameChange,
  };

  function loadEffect() {
    if (!username) {
      return;
    }
    let cancelled = false;

    async function load() {
      if (fetching) {
        return;
      }
      try {
        setState({ ...state, fetching: true, fetchingError: null });
        let gists = await getGistsByUser(username);
        const avatars = await Promise.all(
          gists.map((gist) => getAvatarsByGist(gist.id))
        );
        gists = gists.map((gist, index) => ({
          ...gist,
          avatarUrls: avatars[index],
        }));
        if (cancelled) {
          return;
        }
        setState({ ...state, fetching: false, gists });
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
