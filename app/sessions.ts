import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

type SessionData = {
  theme: string;
};

type SessionFlashData = {
  error: string;
};

export default createCookieSessionStorage<SessionData, SessionFlashData>(
  {
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "session",

      // all of these are optional
      domain: "localhost",
      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
      //
      // expires: new Date(Date.now() + 60_000),
      // httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      // secure: true,
    },
  }
);