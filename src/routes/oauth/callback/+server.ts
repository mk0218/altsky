import { getOAuthClient } from "$lib/auth/client";
import { redirect, type RequestHandler } from "@sveltejs/kit";

const PUBLIC_URL = process.env.PUBLIC_URL || "http://127.0.0.1:5173";

export const GET: RequestHandler = async ({ url, cookies }) => {
  let redirectUrl;
  try {
    const { searchParams } = url;
    const client = await getOAuthClient();

    const { session } = await client.callback(searchParams);

    cookies.set("did", session.did, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/"
    });

    // redirect(303, new URL("/", PUBLIC_URL));
    redirectUrl = new URL("/", PUBLIC_URL);
  } catch (error) {
    console.error("OAuth callback error: ", error);
    // redirect(303, new URL("/?error=login_failed", PUBLIC_URL));
    redirectUrl = new URL("/?error=login_failed", PUBLIC_URL);
  }

  redirect(303, redirectUrl);
};
