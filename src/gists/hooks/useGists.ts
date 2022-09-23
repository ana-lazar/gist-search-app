import { useCallback, useState, useEffect } from "react";
import GistProps from "../types/GistProps";
import { getGistsByUser, getAvatarsByGist } from "../service/api";

interface GistsState {
  gists?: GistProps[] | null;
  fetching: boolean;
  fetchingError?: Error | null;
  pendingLoadGist?: GistProps | null;
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
  const [pendingLoadGist, setPendingLoadGist] = useState<GistProps>();
  const { gists, fetching, fetchingError, username } = state;

  const onUsernameChange = useCallback(
    (newUsername: string) => {
      setState({ ...state, username: newUsername });
    },
    [state, setState]
  );
  const loadGistContent = useCallback(
    (gist?: GistProps) => {
      setPendingLoadGist(gist);
    },
    [setPendingLoadGist]
  );

  useEffect(loadEffect, [username]);
  useEffect(loadGistContentEffect, [setState, pendingLoadGist, setPendingLoadGist]);

  return {
    gists,
    fetching,
    fetchingError,
    username,
    pendingLoadGist,
    onUsernameChange,
    loadGistContent,
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

  function loadGistContentEffect() {
    if (!pendingLoadGist) {
      return;
    }
    let cancelled = false;

    async function load() {
      try {
        const contents = await Promise.all(pendingLoadGist?.files.map(file => fetch(file.url).then(res => res.text())) as any);
        const gists = state.gists?.map((gist) => ({
          ...gist,
          ...(pendingLoadGist?.id === gist.id ? ({files: gist.files.map((file, index) => ({ ...file, content: contents[index]} ))}) : ({}))
        }));
        if (cancelled) {
          return;
        }
        setPendingLoadGist(undefined);
        setState({ ...state, gists });
      } catch (fetchingError: any) {
        setPendingLoadGist(undefined);
        if (cancelled) {
          return;
        }
      }
    }
    load();

    return () => {
      cancelled = true;
    };
  }
};

export default useItems;
