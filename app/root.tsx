import type {LinksFunction, LoaderArgs,ActionArgs} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, useLoaderData,
} from "@remix-run/react";
import { json} from '@remix-run/node';
import stylesheet from "./tailwind.css";
import NavMenu from './components/NavMenu';
import sessionStorage from "./sessions";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader({ request }: LoaderArgs) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  return json({ theme: session.get('theme') });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  session.set('theme', values.theme as string);

  return json(true, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export default function App() {
  const { theme } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NavMenu theme={theme} />
        <div className="bg-gray-100 min-h-screen">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
