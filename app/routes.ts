import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"), 
  // route("postlist", "routes/postlist.tsx"),
  // route("postlist/:slug", "routes/postlist.tsx"),
  route("write", "routes/write.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),

  // Nested Routes
  // route("dashboard", "routes/dashboard.tsx", [
  //   route("finances", "routes/finances.tsx"),
  //   route("personal-info", "routes/personal-info.tsx"),
  // ]),

  // prefix Routes
  ...prefix("postlist", [
    index("routes/postlist.tsx"),
    route(":slug", "routes/singlepost.tsx"),
  ]),
  // route("singlepost", "routes/singlepost.tsx"),
] satisfies RouteConfig;
