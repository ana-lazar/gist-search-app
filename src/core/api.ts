import { Octokit } from "@octokit/core";
import GistProps from "../gists/GistProps";

const octokit = new Octokit();

export const listGistsForUser: (
  username: string
) => Promise<GistProps[]> = async (username) => {
  try {
    const res = await octokit.request("GET /users/{username}/gists", {
      username,
    });

    const items = res.data.map((gist) => {
      const languageMap: Record<string, boolean> = {};
      const files = gist.files;
      Object.keys(files).forEach((filename) => {
        languageMap[files[filename].language || "unknown"] = true;
      });

      return {
        id: gist.id,
        languages: Object.keys(languageMap),
        avatarUrls: [],
      };
    });

    const forks = await Promise.all(
      items.map((gist) =>
        octokit.request("GET /gists/{gist_id}/forks", {
          gist_id: gist.id,
        })
      )
    );

    return items.map((gist, index) => ({
      ...gist,
      avatarUrls: forks[index].data
        .sort(
          (a, b) =>
            Number(new Date(a.created_at || "")) -
            Number(new Date(b.created_at || ""))
        )
        .slice(0, 3)
        .map((fork) => fork.owner?.avatar_url || ""),
    }));
  } catch (err) {
    throw err;
  }
};
