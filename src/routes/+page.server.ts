import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getOAuthClient, SCOPE } from "$lib/auth/client";
import { getSession } from "$lib/auth/session";

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
  }
};
