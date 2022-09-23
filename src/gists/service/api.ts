import { Octokit } from "@octokit/core";
import GistProps from "../types/GistProps";
import { compareDesc } from "./utils";

const octokit = new Octokit();

export const getGistsByUser: (
  username: string
) => Promise<GistProps[]> = async (username) => {
  try {
    const res = await octokit.request("GET /users/{username}/gists", {
      username,
    });

    const items = res.data.map((gist) => {
      const languageMap: Record<string, boolean> = {};
      const gistFiles = gist.files;
      Object.keys(gistFiles).forEach((filename) => {
        languageMap[gistFiles[filename].language || "unknown"] = true;
      });

      const files = Object.keys(gistFiles).map((filename) => ({
        filename: filename || "",
        url: gistFiles[filename].raw_url || "",
      }));

      return {
        id: gist.id,
        languages: Object.keys(languageMap),
        files,
      };
    });

    return items;
  } catch (err) {
    throw err;
  }
};

export const getAvatarsByGist: (id: string) => Promise<string[]> = async (
  id
) => {
  try {
    const forks = await octokit.request("GET /gists/{gist_id}/forks", {
      gist_id: id,
    });
    return forks.data
      .sort((a, b) => compareDesc(a.created_at, b.created_at))
      .slice(0, 3)
      .map((fork) => fork.owner?.avatar_url || "");
  } catch (err) {
    throw err;
  }
};
