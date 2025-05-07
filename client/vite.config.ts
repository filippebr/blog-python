// import { reactRouter } from "@react-router/dev/vite"
// import tailwindcss from "@tailwindcss/vite"
// import { defineConfig } from "vite"
// import tsconfigPaths from "vite-tsconfig-paths"

// export default defineConfig({
//   plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
// });

import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import type { ViteDevServer } from "vite"
import { defineConfig, type Plugin } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// Custom plugin to handle /.well-known/ requests
const wellKnownPlugin = (): Plugin => ({
  name: "handle-well-known",
  configureServer(server: ViteDevServer) {
    // Add middleware to handle /.well-known requests
    server.middlewares.use((req, res, next) => {
      if (req.url?.startsWith("/.well-known/")) {
        // Return a 404 for /.well-known requests
        res.statusCode = 404;
        res.end();
        return;
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), wellKnownPlugin()],
  server: {
    // middlewareMode: true,
  },
});

