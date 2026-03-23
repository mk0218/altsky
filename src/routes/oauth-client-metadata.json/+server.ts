import { getOAuthClient } from "$lib/auth/client";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const client = await getOAuthClient();
  return json(client.clientMetadata);
};
