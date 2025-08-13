import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import Checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react(),
    Checker({
      typescript: {
        tsconfigPath: './tsconfig.app.json',
      },
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      shared: '/src/shared',
      core: '/src/core',
      features: '/src/features',
    }
  },
  server: {
    port: 53000,
    https: {
      cert: process.env.SSL_CRT_FILE ? fs.readFileSync(process.env.SSL_CRT_FILE) : undefined,
      key: process.env.SSL_KEY_FILE ? fs.readFileSync(process.env.SSL_KEY_FILE) : undefined,
    },
  },
});
