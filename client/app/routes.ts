import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"), 
  // route("postlist", "routes/postlist.tsx"),
  // route("postlist/:slug", "routes/postlist.tsx"),
  route("write", "routes/write.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),

  // prefix Routes
  ...prefix("posts", [
    index("routes/postlistpage.tsx"),
    route(":slug", "routes/singlepost.tsx"),
  ]),
] satisfies RouteConfig;
