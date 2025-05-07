import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Define paths for all possible components
const paths = {
	background: resolve(__dirname, "src/pages/background/index.ts"),
	content: resolve(__dirname, "src/pages/content/index.ts"),
	popup: resolve(__dirname, "src/pages/popup/index.html"),
	options: resolve(__dirname, "src/pages/options/index.html"),
	// Add any other potential pages here
};

// Create input object with only the components that exist
const input = Object.fromEntries(
	Object.entries(paths).filter(([_, path]) => fs.existsSync(path))
);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	build: {
		outDir: "dist",
		emptyOutDir: true,
		rollupOptions: {
			input,
			output: {
				entryFileNames: "assets/[name].js",
				chunkFileNames: "assets/[name].js",
				assetFileNames: "assets/[name].[ext]",
			},
		},
		minify: false,
		sourcemap: true,
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
});
