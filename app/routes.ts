import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"), 
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("postlist/:slug", "routes/postlist.tsx"),

  // Nested Routes
  // route("dashboard", "routes/dashboard.tsx", [
  //   route("finances", "routes/finances.tsx"),
  //   route("personal-info", "routes/personal-info.tsx"),
  // ]),

  // prefix Routes
  // ...prefix("postlist", [
  //   index("routes/postlist.tsx"),
  //   route(":slug", "routes/slug.tsx"),
  // ]),
  route("singlepost", "routes/singlepost.tsx"),
] satisfies RouteConfig;
