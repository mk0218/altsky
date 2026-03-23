import { getOAuthClient, SCOPE } from "$lib/auth/client";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  console.log("hello from oauth/login");

  try {
    const { handle } = await request.json();

    console.log("handle", handle);

    if (!handle || typeof handle !== "string") {
      error(400, { message: "Handle is required." });
    }

    const client = await getOAuthClient();

    const authUrl = await client.authorize(handle, { scope: SCOPE });

    return json({ redirectUrl: authUrl });
  } catch (err) {
    console.error("OAuth login error: ", err);
    const message = err instanceof Error ? err.message : "Login failed.";
    error(500, { message });
  }
};
