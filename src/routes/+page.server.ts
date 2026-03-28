import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getOAuthClient, SCOPE } from "$lib/auth/client";
import { getSession } from "$lib/auth/session";
import { asDatetimeString, Client } from "@atproto/lex";
import { bsky } from "../lexicons/app";

export const load: PageServerLoad = async ({ cookies }) => {
  const session = await getSession(cookies);
  const isAuthed = session !== null;

  return { isAuthed };
};

export const actions: Actions = {
  login: async ({ request }) => {
    let authUrl;

    try {
      const formData = await request.formData();
      const handle = formData.get("handle");

      if (!handle || typeof handle !== "string") {
        return fail(400, { error: "Handle is required" });
      }

      const client = await getOAuthClient();

      authUrl = await client.authorize(handle, { scope: SCOPE });
    } catch (err) {
      return fail(500, { error: err instanceof Error ? err.message : "Failed" });
    }

    if (authUrl) {
      return redirect(303, authUrl);
    } else {
      return fail(500, { error: "Something went wrong.." });
    }
  },
  post: async ({ request, cookies }) => {
    const session = await getSession(cookies);
    const formData = await request.formData();
    const text = formData.get("text");
    if (!session || !text) return; // TODO: error something
    const client = new Client(session);
    const result = await client.create(bsky.feed.post, {
      text: text as string,
      createdAt: asDatetimeString(new Date().toISOString())
    });
    return { result };
  }
};
