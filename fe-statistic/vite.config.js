/* eslint-disable no-undef */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import federation from "@originjs/vite-plugin-federation";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: (i) => `__tla_${i}`
    }),
    vue(),
    federation({
      name: "remote-product",
      filename: "remoteEntry.js",
      exposes: {
        "./app": "./src/App.vue",
        "./setup": "./src/setup.js"
      },
      remotes: {
        master_app: "http://localhost:3000/assets/remoteEntry.js"
      },
      shared: {
        vue: {},
        pinia: {}
      }
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  server: {
    port: 3005
  },
  preview: {
    port: 3005
  }
});
