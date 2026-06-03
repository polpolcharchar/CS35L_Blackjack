import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("leaderboard", "routes/leaderboard.tsx"),
  route("search", "routes/search.tsx"),
  route("/auth/login", "routes/login.tsx"),
  route("/auth/register", "routes/register.tsx"),
] satisfies RouteConfig;
