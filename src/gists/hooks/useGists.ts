import { useCallback, useState, useEffect } from "react";
import GistProps from "../types/GistProps";
import { getGistsByUser, getAvatarsByGist } from "../service/api";

const useItems = () => {
  const [gists, setGists] = useState<GistProps[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [fetchingError, setFetchingError] = useState<Error>();
  const [username, setUsername] = useState<string>("");
  const [pendingLoadGist, setPendingLoadGist] = useState<GistProps>();

  const onUsernameChange = useCallback(
    (newUsername: string) => {
      setUsername(newUsername);
    },
    [setUsername]
  );
  const loadGistContent = useCallback(
    (gist?: GistProps) => {
      setPendingLoadGist(gist);
    },
    [setPendingLoadGist]
  );

  useEffect(loadEffect, [username, setFetching, setFetchingError, setGists]);
  useEffect(loadGistContentEffect, [
    pendingLoadGist,
    setPendingLoadGist,
    setGists,
  ]);

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
        setFetching(true);
        setFetchingError(undefined);
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
        setFetching(false);
        setGists(gists);
      } catch (fetchingError: any) {
        if (cancelled) {
          return;
        }
        setFetching(false);
        setFetchingError(fetchingError);
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
        const contents = await Promise.all(
          pendingLoadGist?.files.map((file) =>
            fetch(file.url).then((res) => res.text())
          ) as any
        );
        const newGists = gists?.map((gist) => ({
          ...gist,
          ...(pendingLoadGist?.id === gist.id
            ? {
                files: gist.files.map((file, index) => ({
                  ...file,
                  content: contents[index],
                })),
              }
            : {}),
        }));
        if (cancelled) {
          return;
        }
        setPendingLoadGist(undefined);
        setGists(newGists as GistProps[]);
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
