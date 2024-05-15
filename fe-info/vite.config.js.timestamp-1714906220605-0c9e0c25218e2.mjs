// vite.config.js
import { defineConfig } from "file:///C:/Users/hiep/Documents/coding/GS-VIREF-MICRO/fe-info/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/hiep/Documents/coding/GS-VIREF-MICRO/fe-info/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import federation from "file:///C:/Users/hiep/Documents/coding/GS-VIREF-MICRO/fe-info/node_modules/@originjs/vite-plugin-federation/dist/index.mjs";
import topLevelAwait from "file:///C:/Users/hiep/Documents/coding/GS-VIREF-MICRO/fe-info/node_modules/vite-plugin-top-level-await/exports/import.mjs";
var __vite_injected_original_dirname = "C:\\Users\\hiep\\Documents\\coding\\GS-VIREF-MICRO\\fe-info";
var vite_config_default = defineConfig({
  plugins: [
    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: (i) => `__tla_${i}`
    }),
    vue(),
    federation({
      name: "remote-info",
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
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  },
  server: {
    port: 3001
  },
  preview: {
    port: 3001
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxoaWVwXFxcXERvY3VtZW50c1xcXFxjb2RpbmdcXFxcR1MtVklSRUYtTUlDUk9cXFxcZmUtaW5mb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcaGllcFxcXFxEb2N1bWVudHNcXFxcY29kaW5nXFxcXEdTLVZJUkVGLU1JQ1JPXFxcXGZlLWluZm9cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2hpZXAvRG9jdW1lbnRzL2NvZGluZy9HUy1WSVJFRi1NSUNSTy9mZS1pbmZvL3ZpdGUuY29uZmlnLmpzXCI7LyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGZlZGVyYXRpb24gZnJvbSBcIkBvcmlnaW5qcy92aXRlLXBsdWdpbi1mZWRlcmF0aW9uXCI7XG5pbXBvcnQgdG9wTGV2ZWxBd2FpdCBmcm9tIFwidml0ZS1wbHVnaW4tdG9wLWxldmVsLWF3YWl0XCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdG9wTGV2ZWxBd2FpdCh7XG4gICAgICBwcm9taXNlRXhwb3J0TmFtZTogXCJfX3RsYVwiLFxuICAgICAgcHJvbWlzZUltcG9ydE5hbWU6IChpKSA9PiBgX190bGFfJHtpfWBcbiAgICB9KSxcbiAgICB2dWUoKSxcbiAgICBmZWRlcmF0aW9uKHtcbiAgICAgIG5hbWU6IFwicmVtb3RlLWluZm9cIixcbiAgICAgIGZpbGVuYW1lOiBcInJlbW90ZUVudHJ5LmpzXCIsXG4gICAgICBleHBvc2VzOiB7XG4gICAgICAgIFwiLi9hcHBcIjogXCIuL3NyYy9BcHAudnVlXCIsXG4gICAgICAgIFwiLi9zZXR1cFwiOiBcIi4vc3JjL3NldHVwLmpzXCJcbiAgICAgIH0sXG4gICAgICByZW1vdGVzOiB7XG4gICAgICAgIG1hc3Rlcl9hcHA6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2Fzc2V0cy9yZW1vdGVFbnRyeS5qc1wiXG4gICAgICB9LFxuICAgICAgc2hhcmVkOiB7XG4gICAgICAgIHZ1ZToge30sXG4gICAgICAgIHBpbmlhOiB7fVxuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKVxuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMVxuICB9LFxuICBwcmV2aWV3OiB7XG4gICAgcG9ydDogMzAwMVxuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sbUJBQW1CO0FBTDFCLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLGNBQWM7QUFBQSxNQUNaLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQixDQUFDLE1BQU0sU0FBUyxDQUFDO0FBQUEsSUFDdEMsQ0FBQztBQUFBLElBQ0QsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLFFBQ1AsU0FBUztBQUFBLFFBQ1QsV0FBVztBQUFBLE1BQ2I7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLFlBQVk7QUFBQSxNQUNkO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixLQUFLLENBQUM7QUFBQSxRQUNOLE9BQU8sQ0FBQztBQUFBLE1BQ1Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
