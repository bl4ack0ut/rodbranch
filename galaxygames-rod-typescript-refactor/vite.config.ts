import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";

export default defineConfig(({ mode }) => {
  return {
    optimizeDeps: {
      esbuildOptions: {
        define: {
          // NOTE: Node.js global to browser globalThis is required
          global: "globalThis",
        },
        plugins: [
          // NOTE: Enable esbuild polyfill plugins, this is required for wallet connect
          NodeGlobalsPolyfillPlugin({ buffer: true }),
        ],
      },
    },
    plugins: [reactRefresh(), tsconfigPaths()],
    build: {
      rollupOptions: {
        plugins: [
          // NOTE: Enable rollup polyfills plugin used during production bundling
          rollupNodePolyFill(),
        ],
      },
    },
    define: {
      "process.env": Object.entries(loadEnv(mode, ".")).reduce((prev, [key, val]) => {
        return {
          ...prev,
          [key]: val,
        };
      }, {}),
    },
  };
});
