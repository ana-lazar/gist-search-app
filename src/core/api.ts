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
      res.data.forEach((gist) => {
        const files = gist.files;
        Object.keys(files).forEach((filename) => {
          languageMap[files[filename].language || "unknown"] = true;
        });
      });
      return {
        id: gist.id,
        languages: Object.keys(languageMap),
      };
    });
    return items;
  } catch (err) {
    throw err;
  }
};
