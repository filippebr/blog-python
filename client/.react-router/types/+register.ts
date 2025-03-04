import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/write": {};
  "/login": {};
  "/register": {};
  "/posts": {};
  "/posts/:slug": {
    "slug": string;
  };
};