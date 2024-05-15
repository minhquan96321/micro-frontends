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
      name: "host-app",
      filename: "remoteEntry.js",
      exposes: {
        "./BackPage": "./src/components/BackPage.vue",
      },
      remotes: {
        remote_app: ""
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
    port: 3000
  },
  preview: {
    port: 3000
  }
  // build: {
  //   port: 3000
  // }
});
