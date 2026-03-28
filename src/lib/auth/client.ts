import {
  delAuthSession,
  delAuthState,
  getAuthSession,
  getAuthState,
  setAuthSession,
  setAuthState
} from "$lib/database";
import { NodeOAuthClient, buildAtprotoLoopbackClientMetadata } from "@atproto/oauth-client-node";
import type { NodeSavedSession, NodeSavedState } from "@atproto/oauth-client-node";

export const SCOPE = "atproto";

let client: NodeOAuthClient | null = null;

export async function getOAuthClient(): Promise<NodeOAuthClient> {
  if (client) return client;

  client = new NodeOAuthClient({
    clientMetadata: buildAtprotoLoopbackClientMetadata({
      scope: SCOPE,
      redirect_uris: ["http://127.0.0.1:5173/oauth/callback"]
    }),

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
