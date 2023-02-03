import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: "./dist/web-component",
        lib: {
            entry: "./src/crate-builder/index.wc.js",
            name: "DescriboCrateBuilderWC",
            fileName: "describo-crate-builder-wc",
        },
    },
    plugins: [vue()],
    // plugins: [vue({ customElement: true})],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
