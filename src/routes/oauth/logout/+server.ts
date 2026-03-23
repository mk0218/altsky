import { getOAuthClient } from "$lib/auth/client";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ cookies }) => {
  try {
    const did = cookies.get("did");

    if (did) {
      const client = await getOAuthClient();
      await client.revoke(did);
    }
  } catch (error) {
    console.error("Logout error: ", error);
  }

  cookies.delete("did", { path: "/" });
  return json({ success: true });
};
