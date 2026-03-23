import { getOAuthClient } from "./client";
import type { OAuthSession } from "@atproto/oauth-client-node";
import type { Cookies } from "@sveltejs/kit";

export async function getSession(cookies: Cookies): Promise<OAuthSession | null> {
  const did = getDid(cookies);
  if (!did) return null;

  try {
    const client = await getOAuthClient();
    return await client.restore(did);
  } catch {
    return null;
  }
}

export function getDid(cookies: Cookies): string | undefined {
  return cookies.get("did");
}
