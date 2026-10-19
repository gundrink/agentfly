import { API_ORIGIN } from "./site";

/**
 * Read this site's own public API from server code.
 *
 * In production the site and the API are one Cloudflare Worker, and a Worker cannot fetch
 * its own custom domain: the request failed, the caller caught it, and /versions, the blog
 * and the feed rendered "nothing published" on every live request - only a local build,
 * fetching from outside, ever saw the notes. So the API is called in-process, exactly as
 * the `/v1/*` route calls it. Where that cannot answer - a local build without the database
 * secrets - the public API is fetched over the network instead, which works from outside.
 */
/** A stuck database or a quiet origin must not hold a static page until the build gives up. */
const ANSWER_MS = 8_000;

function within(work: Promise<Response>, ms: number): Promise<Response> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const limit = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("The API did not answer in time")), ms);
  });
  // The loser can still reject later. Nothing is waiting for it then.
  work.catch(() => {});
  return Promise.race([work, limit]).finally(() => {
    if (timer !== undefined) clearTimeout(timer);
  });
}

export async function readApi(path: `/v1/${string}`, revalidate: number): Promise<Response> {
  try {
    const { handleApiRequest } = await import("./apiHandler");
    const response = await within(handleApiRequest(new Request(`${API_ORIGIN}${path}`)), ANSWER_MS);
    if (response.ok) return response;
  } catch {
    // No API in this environment; the public one below answers instead.
  }
  try {
    return await fetch(`${API_ORIGIN}${path}`, {
      next: { revalidate },
      signal: AbortSignal.timeout(ANSWER_MS),
    });
  } catch {
    return new Response(null, { status: 503 });
  }
}
