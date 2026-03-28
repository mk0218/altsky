import { JoseKey } from "@atproto/oauth-client-node";
import { json } from "@sveltejs/kit";

const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const GET = async () => {
  if (!PRIVATE_KEY) {
    return json({ keys: [] });
  }

  const key = await JoseKey.fromJWK(JSON.parse(PRIVATE_KEY));
  return json({
    keys: [key.publicJwk]
  });
};
