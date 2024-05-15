// vite.config.js
import { defineConfig } from "file:///C:/Users/hiep/Documents/coding/GS-VIREF-MICRO/fe-main/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/hiep/Documents/coding/GS-VIREF-MICRO/fe-main/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import federation from "file:///C:/Users/hiep/Documents/coding/GS-VIREF-MICRO/fe-main/node_modules/@originjs/vite-plugin-federation/dist/index.mjs";
import topLevelAwait from "file:///C:/Users/hiep/Documents/coding/GS-VIREF-MICRO/fe-main/node_modules/vite-plugin-top-level-await/exports/import.mjs";
var __vite_injected_original_dirname = "C:\\Users\\hiep\\Documents\\coding\\GS-VIREF-MICRO\\fe-main";
var vite_config_default = defineConfig({
  plugins: [
    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: (i) => `__tla_${i}`
    }),
    vue(),
    federation({
      name: "host-app",
      filename: "remoteEntry.js",
      exposes: {},
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
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  },
  server: {
    port: 3e3
  },
  preview: {
    port: 3e3
  }

  // build: {
  //   port: 3e3
  // }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxoaWVwXFxcXERvY3VtZW50c1xcXFxjb2RpbmdcXFxcR1MtVklSRUYtTUlDUk9cXFxcZmUtbWFpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcaGllcFxcXFxEb2N1bWVudHNcXFxcY29kaW5nXFxcXEdTLVZJUkVGLU1JQ1JPXFxcXGZlLW1haW5cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2hpZXAvRG9jdW1lbnRzL2NvZGluZy9HUy1WSVJFRi1NSUNSTy9mZS1tYWluL3ZpdGUuY29uZmlnLmpzXCI7LyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGZlZGVyYXRpb24gZnJvbSBcIkBvcmlnaW5qcy92aXRlLXBsdWdpbi1mZWRlcmF0aW9uXCI7XG5pbXBvcnQgdG9wTGV2ZWxBd2FpdCBmcm9tIFwidml0ZS1wbHVnaW4tdG9wLWxldmVsLWF3YWl0XCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdG9wTGV2ZWxBd2FpdCh7XG4gICAgICBwcm9taXNlRXhwb3J0TmFtZTogXCJfX3RsYVwiLFxuICAgICAgcHJvbWlzZUltcG9ydE5hbWU6IChpKSA9PiBgX190bGFfJHtpfWBcbiAgICB9KSxcbiAgICB2dWUoKSxcbiAgICBmZWRlcmF0aW9uKHtcbiAgICAgIG5hbWU6IFwiaG9zdC1hcHBcIixcbiAgICAgIGZpbGVuYW1lOiBcInJlbW90ZUVudHJ5LmpzXCIsXG4gICAgICBleHBvc2VzOiB7fSxcbiAgICAgIHJlbW90ZXM6IHtcbiAgICAgICAgcmVtb3RlX2FwcDogXCJcIlxuICAgICAgfSxcbiAgICAgIHNoYXJlZDoge1xuICAgICAgICB2dWU6IHt9LFxuICAgICAgICBwaW5pYToge31cbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIilcbiAgICB9XG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDBcbiAgfSxcbiAgcHJldmlldzoge1xuICAgIHBvcnQ6IDMwMDBcbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLG1CQUFtQjtBQUwxQixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxjQUFjO0FBQUEsTUFDWixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUIsQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUFBLElBQ3RDLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxJQUNKLFdBQVc7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQztBQUFBLE1BQ1YsU0FBUztBQUFBLFFBQ1AsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLEtBQUssQ0FBQztBQUFBLFFBQ04sT0FBTyxDQUFDO0FBQUEsTUFDVjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDL0I7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
