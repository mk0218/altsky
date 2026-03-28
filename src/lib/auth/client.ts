import {
  delAuthSession,
  delAuthState,
  getAuthSession,
  getAuthState,
  setAuthSession,
  setAuthState
} from "$lib/database";
import {
  JoseKey,
  NodeOAuthClient,
  buildAtprotoLoopbackClientMetadata
} from "@atproto/oauth-client-node";
import {
  Keyset,
  type NodeSavedSession,
  type NodeSavedState,
  type OAuthClientMetadataInput
} from "@atproto/oauth-client-node";

export const SCOPE = "atproto";

let client: NodeOAuthClient | null = null;

const PUBLIC_URL = process.env.PUBLIC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const getClientMetadata = (): OAuthClientMetadataInput => {
  if (PUBLIC_URL) {
    return {
      client_id: `${PUBLIC_URL}/oauth-client-metadata.json`,
      client_name: "OAuth Tutorial",
      client_uri: PUBLIC_URL,
      redirect_uris: [`${PUBLIC_URL}/oauth/callback`],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      scope: SCOPE,
      token_endpoint_auth_method: "private_key_jwt" as const,
      token_endpoint_auth_signing_alg: "ES256" as const, // must match the alg in scripts/gen-key.ts
      jwks_uri: `${PUBLIC_URL}/.well-known/jwks.json`,
      dpop_bound_access_tokens: true
    };
  } else {
    return buildAtprotoLoopbackClientMetadata({
      scope: SCOPE,
      redirect_uris: ["http://127.0.0.1:5173/oauth/callback"]
    });
  }
};

const getKeyset = async (): Promise<Keyset | undefined> => {
  if (PUBLIC_URL && PRIVATE_KEY) {
    return new Keyset([await JoseKey.fromJWK(JSON.parse(PRIVATE_KEY))]);
  } else {
    return undefined;
  }
};

export async function getOAuthClient(): Promise<NodeOAuthClient> {
  if (client) return client;

  client = new NodeOAuthClient({
    clientMetadata: getClientMetadata(),
    keyset: await getKeyset(),

    stateStore: {
      async get(key: string) {
        const value = await getAuthState(key);
        return JSON.parse(value);
      },
      async set(key: string, value: NodeSavedState) {
        await setAuthState(key, JSON.stringify(value));
      },
      async del(key: string) {
        await delAuthState(key);
      }
    },

    sessionStore: {
      async get(key: string) {
        const value = await getAuthSession(key);
        return JSON.parse(value);
      },
      async set(key: string, value: NodeSavedSession) {
        await setAuthSession(key, JSON.stringify(value));
      },
      async del(key: string) {
        await delAuthSession(key);
      }
    }
  });

  return client;
}
