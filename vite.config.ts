import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [
		react(),
		electron({
			main: {
				entry: "electron/main.js",
			},
			preload: {
				input: path.join(__dirname, "electron/preload.js"),
			},
			renderer: process.env.NODE_ENV === "test" ? undefined : {},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@lib": path.resolve(__dirname, "./src/lib"),
		},
	},
});
