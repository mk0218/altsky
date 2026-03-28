import { DATABASE_URL } from "$env/static/private";
import { neon } from "@neondatabase/serverless";

const sql = neon(DATABASE_URL);

export const getAuthState = async (key: string) => {
  const response = await sql`
    SELECT value FROM auth_state WHERE key = ${key};
  `;
  const { value } = response[0];
  return value as string;
};

export const setAuthState = async (key: string, value: string) => {
  await sql`
    INSERT INTO auth_state (key, value) VALUES (${key}, ${value})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
  `;
};

export const delAuthState = async (key: string) => {
  await sql`DELETE FROM auth_state WHERE key = ${key}`;
};

export const getAuthSession = async (key: string) => {
  const response = await sql`
    SELECT value FROM auth_session WHERE key = ${key};
  `;
  const { value } = response[0];
  return value as string;
};

export const setAuthSession = async (key: string, value: string) => {
  await sql`
    INSERT INTO auth_session (key, value) VALUES (${key}, ${value})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
  `;
};

export const delAuthSession = async (key: string) => {
  await sql`DELETE FROM auth_session WHERE key = ${key}`;
};
