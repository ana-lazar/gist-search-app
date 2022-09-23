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
    const items = res.data.map((gist) => ({
      id: gist.id,
    }));
    console.log("user", username);
    console.log("items", items);
    return items;
  } catch (err) {
    throw err;
  }
};
