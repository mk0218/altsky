import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getOAuthClient, SCOPE } from "$lib/auth/client";
import { getSession } from "$lib/auth/session";
import { asDatetimeString, Client, type BlobRef } from "@atproto/lex";
import { bsky } from "../lexicons/app";
import { atproto } from "../lexicons/com";
import type { AspectRatio } from "../lexicons/app/bsky/embed/defs.defs";
import sharp from "sharp";

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
  },
  post: async ({ request, cookies }) => {
    const session = await getSession(cookies);
    const formData = await request.formData();
    const text = formData.get("text");

    if (!session || typeof text !== "string") return; // TODO: error something

    const images = formData.getAll("images");

    if (!text && images.length === 0) return; // TODO: error handling

    const client = new Client(session);

    const blobs: { alt: string; image: BlobRef; aspectRatio: AspectRatio }[] = [];

    for (const image of images) {
      if (image instanceof File) {
        const arrayBuffer = await image.arrayBuffer();
        const metadata = await sharp(arrayBuffer).metadata();
        const { width, height } = metadata;
        const bytes = await image.bytes();
        const res = await client.call(atproto.repo.uploadBlob, bytes);
        blobs.push({ alt: "", image: res.blob, aspectRatio: { width, height } });
      }
    }

    const result = await client.create(bsky.feed.post, {
      text: text as string,
      embed: {
        $type: "app.bsky.embed.images",
        images: blobs
      },
      createdAt: asDatetimeString(new Date().toISOString())
    });

    return { result };
  }
};
