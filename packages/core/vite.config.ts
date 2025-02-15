import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import nodeResolve from "@rollup/plugin-node-resolve";

export default defineConfig({
  plugins: [
    dts({
      outDir: "dist/types",
    }),
    nodeResolve(),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "core",
      fileName: (format) => `core.${format}.js`,
    },
  },
});
