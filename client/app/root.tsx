import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration
} from "react-router"

import { ClerkProvider } from '@clerk/clerk-react'
import type { Route } from "./+types/root"
import "./app.css"
import MainLayout from "./layouts/mainlayout"

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import { useEffect, useState } from "react"
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import ToastWrapper from "~/components/toastwrapper"

const queryClient = new QueryClient()

// Clerk Setup
// export async function loader(args: Route.LoaderArgs) {
//   return rootAuthLoader(args)
// }

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export default function App({ loaderData }: Route.ComponentProps) {
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true only after mounting on the client-side
  useEffect(() => {
    setIsClient(true);
  }, [])
  
  return (
    <ClerkProvider
      // loaderData={loaderData}
      signUpFallbackRedirectUrl="/"
      signInFallbackRedirectUrl="/"
      publishableKey={PUBLISHABLE_KEY}
    >
      <QueryClientProvider client={queryClient}>
        <MainLayout />
        {/* <ToastContainer position="bottom-right"/> */}
        <ToastWrapper />
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

// https://x.com/i/grok?conversation=1912289088691962322
